import React, { useState, useEffect } from 'react';
import LevelTemplate from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import MissionDebrief from '../components/MissionDebrief';

/**
 * LEVEL 5: CACHE POISONING DEFENSE
 * 
 * Scenario educativo:
 * - Il giocatore è un security engineer
 * - Un reverse proxy/CDN cachea risposte HTTP in modo errato
 * - Contenuto malevolo viene "avvelenato" nella cache
 * - Utenti legittimi ricevono risposte compromesse dalla cache condivisa
 * 
 * Obiettivi didattici:
 * - Comprendere come funziona il caching HTTP
 * - Riconoscere sintomi di cache poisoning (cache HIT con contenuti anomali)
 * - Analizzare header HTTP (Cache-Control, Vary, X-Cache)
 * - Imparare a configurare correttamente la cache
 * - Comprendere l'importanza della cache key
 * 
 * Sistema stelle (NON obbligatorio):
 * ⭐ 1 stella: Cache ripulita (completamento base)
 * ⭐ 2 stelle: Cache configurata correttamente + nessun contenuto dinamico cacheato
 * ⭐ 3 stelle: Header responsabile identificato + cache key corretta + prevenzione
 */

// Header HTTP per richieste cachate (cache poisoning attivo)
const POISONED_HEADERS = {
    'Cache-Control': 'public, max-age=3600',
    'X-Cache': 'HIT from cache-server-01',
    'Vary': '', // Mancante! Problema principale
    'X-Forwarded-Host': 'evil.com' // Header usato per poisoning
};

// Header HTTP corretti (dopo fix)
const SAFE_HEADERS = {
    'Cache-Control': 'no-store, must-revalidate',
    'X-Cache': 'MISS from cache-server-01',
    'Vary': 'Host, X-Forwarded-Host, Cookie',
    'X-Forwarded-Host': ''
};

// Cache simulata (contiene risposte)
const INITIAL_CACHE = {
    '/': {
        content: 'POISONED',
        headers: POISONED_HEADERS,
        timestamp: '16:20:45',
        hits: 234
    },
    '/profile': {
        content: 'POISONED',
        headers: POISONED_HEADERS,
        timestamp: '16:21:12',
        hits: 89
    }
};

// Log SIEM che mostrano il cache poisoning
const generateCachePoisoningLogs = (cachePoisoned, headerIdentified) => [
    {
        id: 1,
        time: '16:18:30',
        severity: 'low',
        source: '192.168.1.100',
        type: 'INFO',
        message: 'Cache MISS - Fresh content served from origin',
        threat: false
    },
    {
        id: 2,
        time: '16:19:45',
        severity: cachePoisoned ? 'medium' : 'low',
        source: '203.0.113.66',
        type: cachePoisoned ? 'WARNING' : 'INFO',
        message: cachePoisoned
            ? 'Suspicious request detected - X-Forwarded-Host: evil.com'
            : 'Request validated - No suspicious headers detected',
        threat: cachePoisoned
    },
    {
        id: 3,
        time: '16:20:45',
        severity: cachePoisoned ? 'high' : 'low',
        source: '203.0.113.66',
        type: cachePoisoned ? 'SECURITY' : 'INFO',
        message: cachePoisoned
            ? 'Cache HIT - Response cached with malicious X-Forwarded-Host header'
            : 'Cache configured correctly - Dynamic content not cached',
        threat: cachePoisoned
    },
    {
        id: 4,
        time: '16:21:10',
        severity: cachePoisoned ? 'critical' : 'low',
        source: '192.168.1.105',
        type: cachePoisoned ? 'ALERT' : 'INFO',
        message: cachePoisoned
            ? 'CRITICAL: Legitimate user received poisoned content from cache (Cache HIT)'
            : 'User received fresh, safe content from origin server',
        threat: cachePoisoned
    },
    {
        id: 5,
        time: '16:21:35',
        severity: 'low',
        source: '192.168.1.100',
        type: 'INFO',
        message: 'Normal page request - User browsing website',
        threat: false
    },
    {
        id: 6,
        time: '16:22:18',
        severity: cachePoisoned ? 'high' : 'low',
        source: '192.168.1.110',
        type: cachePoisoned ? 'SECURITY' : 'INFO',
        message: cachePoisoned
            ? 'Cache pollution detected - Same cache key serving different content'
            : headerIdentified 
                ? 'Vary header configured - Proper cache key includes all sensitive headers'
                : 'Cache serving consistent content',
        threat: cachePoisoned
    },
    {
        id: 7,
        time: '16:23:05',
        severity: cachePoisoned ? 'high' : 'low',
        source: 'cache-server-01',
        type: cachePoisoned ? 'ERROR' : 'INFO',
        message: cachePoisoned
            ? 'Cache key collision - Multiple requests mapped to same cache entry'
            : 'Cache key properly includes Host and X-Forwarded-Host headers',
        threat: cachePoisoned
    },
    {
        id: 8,
        time: '16:23:42',
        severity: cachePoisoned ? 'critical' : 'low',
        source: 'cache-server-01',
        type: cachePoisoned ? 'ALERT' : 'INFO',
        message: cachePoisoned
            ? 'Multiple users affected - Poisoned cache entry served 234 times'
            : 'Cache operating normally - No poisoning detected',
        threat: cachePoisoned
    }
];

const Level5 = () => {
    // Sistema di reputazione (stelle)
    const { stars } = useReputation('level5', 0);
    const { earnStar } = useReputation('level5', 0);

    // === STATO DEL LIVELLO ===
    const [cachePoisoned, setCachePoisoned] = useState(true); // Cache contiene contenuto avvelenato
    const [cacheEntries, setCacheEntries] = useState(INITIAL_CACHE); // Contenuti in cache
    const [cacheCleared, setCacheCleared] = useState(false); // Cache svuotata
    const [headersFixed, setHeadersFixed] = useState(false); // Header HTTP corretti
    const [cacheKeyFixed, setCacheKeyFixed] = useState(false); // Cache key configurata correttamente
    const [varyHeaderEnabled, setVaryHeaderEnabled] = useState(false); // Header Vary abilitato
    const [noCacheDynamic, setNoCacheDynamic] = useState(false); // Contenuto dinamico non cacheato
    const [headerIdentified, setHeaderIdentified] = useState(false); // Header responsabile identificato
    const [proxyRestarted, setProxyRestarted] = useState(false); // Proxy riavviato
    
    // UI State
    const [completed, setCompleted] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [startTime] = useState(Date.now());
    const [completionTime, setCompletionTime] = useState(0);
    const [hintIndex, setHintIndex] = useState(0);
    const [visibleHint, setVisibleHint] = useState(null);

    // Reset hint index quando cambia step
    useEffect(() => {
        setHintIndex(0);
    }, [currentStep]);

    // Timer che incrementa hint index ogni 15 secondi per step con hint multipli
    useEffect(() => {
        if (currentStep === 4) {
            const timer = setInterval(() => {
                setHintIndex(prev => prev + 1);
            }, 15000);
            return () => clearInterval(timer);
        }
    }, [currentStep]);

    // Transizione smooth del testo hint
    useEffect(() => {
        const text = getHintText();
        if (text !== visibleHint) {
            setVisibleHint(null);
            const timeout = setTimeout(() => {
                setVisibleHint(text);
            }, 400);
            return () => clearTimeout(timeout);
        }
    }, [currentStep, hintIndex]);

    // === LOGICA DI MITIGAZIONE ===
    // Cache è sicura quando è svuotata E configurata correttamente
    useEffect(() => {
        if (cacheCleared && (headersFixed || (varyHeaderEnabled && noCacheDynamic))) {
            setCachePoisoned(false);
        }
    }, [cacheCleared, headersFixed, varyHeaderEnabled, noCacheDynamic]);

    // === CONDIZIONE DI COMPLETAMENTO ===
    useEffect(() => {
        if (!cachePoisoned && proxyRestarted && !completed) {
            // Stella 1: completamento base (cache ripulita)
            if (stars === 0) {
                earnStar();
            }
            
            // Stella 2: cache configurata correttamente + no cache per contenuto dinamico
            if (headersFixed && noCacheDynamic && stars === 1) {
                earnStar();
            }
            
            // Stella 3: header identificato + cache key corretta + Vary header
            if (headerIdentified && cacheKeyFixed && varyHeaderEnabled && stars === 2) {
                earnStar();
            }
            
            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
            setTimeout(() => {
                setCompleted(true);
            }, 2000);
        }
    }, [cachePoisoned, proxyRestarted, completed, headersFixed, noCacheDynamic, headerIdentified, cacheKeyFixed, varyHeaderEnabled, stars, earnStar, startTime]);

    // === CONFIGURAZIONE BROWSER ===
    const browserConfig = {
        availableSites: [
            {
                url: 'http://localhost:3000/',
                title: 'Company Website',
                icon: '🏢',
                content: cachePoisoned ? (
                    // Contenuto avvelenato dalla cache
                    <div className="p-6 bg-red-50 h-full">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-red-600 text-white px-4 py-2 mb-4 animate-pulse">
                                ⚠️ ALERT: Injected malicious content from cache!
                            </div>
                            <h1 className="text-3xl font-bold mb-4">Company Website</h1>
                            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
                                <p className="font-mono text-sm text-red-800">
                                    &lt;script&gt;alert('Cache Poisoned!')&lt;/script&gt;
                                </p>
                                <p className="text-sm text-red-700 mt-2">
                                    This content was served from cache with malicious modifications
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow mt-4">
                                <h3 className="font-semibold mb-2">HTTP Response Headers:</h3>
                                <div className="font-mono text-xs space-y-1 text-gray-700">
                                    {Object.entries(cacheEntries['/']?.headers || POISONED_HEADERS).map(([key, value]) => (
                                        <div key={key}>
                                            <span className="text-blue-600">{key}:</span> {value || '<empty>'}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-red-600 mt-2">
                                    ⚠️ Cache HIT - Served from cache (234 times)
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Contenuto sicuro dopo fix
                    <div className="p-6 bg-white h-full">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-3xl font-bold text-gray-800">Company Website</h1>
                                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                                    ✓ SECURE
                                </div>
                            </div>
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                                <p className="text-green-800">
                                    ✅ Cache has been purged and reconfigured<br/>
                                    ✅ Fresh content served from origin server
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow border">
                                <h3 className="font-semibold mb-2">HTTP Response Headers:</h3>
                                <div className="font-mono text-xs space-y-1 text-gray-700">
                                    {Object.entries(SAFE_HEADERS).map(([key, value]) => (
                                        <div key={key}>
                                            <span className="text-blue-600">{key}:</span> {value || '<empty>'}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-green-600 mt-2">
                                    ✓ Cache MISS - Fresh content from origin
                                </p>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'http://localhost:3000/profile',
                title: 'User Profile',
                icon: '👤',
                content: cachePoisoned ? (
                    <div className="p-6 bg-red-50 h-full">
                        <div className="max-w-2xl mx-auto">
                            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                            <div className="bg-red-600 text-white p-3 rounded mb-4">
                                ⚠️ Warning: This personalized content is being served from shared cache!
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow">
                                <p className="text-sm text-red-700">
                                    ⚠️ Cache HIT - Private user data served from public cache (89 hits)
                                </p>
                                <p className="text-xs text-gray-600 mt-2 font-mono">
                                    Cache-Control: public, max-age=3600 ❌ (Should be private or no-store!)
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 bg-white h-full">
                        <div className="max-w-2xl mx-auto">
                            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                            <div className="bg-green-100 p-3 rounded mb-4">
                                ✅ Personalized content served fresh from origin server
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow border">
                                <p className="text-sm text-green-700">
                                    ✓ Cache MISS - Dynamic content not cached
                                </p>
                                <p className="text-xs text-gray-600 mt-2 font-mono">
                                    Cache-Control: no-store, must-revalidate ✅
                                </p>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'https://owasp.org/www-community/attacks/Cache_Poisoning',
                title: 'OWASP - Cache Poisoning',
                icon: '📚',
                content: (
                    <div className="p-6 bg-gray-900 text-white h-full overflow-y-auto">
                        <div className="max-w-2xl mx-auto">
                            <h1 className="text-2xl font-bold mb-4">🛡️ Cache Poisoning - OWASP Guide</h1>
                            <div className="space-y-4 text-sm">
                                <div className="bg-blue-900/30 border-l-4 border-blue-500 p-3">
                                    <h3 className="font-semibold mb-2">🎯 Cos'è Cache Poisoning?</h3>
                                    <p className="text-gray-300">
                                        Attacco che inserisce contenuto malevolo nella cache HTTP condivisa.
                                        Il contenuto avvelenato viene servito a tutti gli utenti che accedono 
                                        alla risorsa cacheata.
                                    </p>
                                </div>
                                <div className="bg-red-900/30 border-l-4 border-red-500 p-3">
                                    <h3 className="font-semibold mb-2">⚠️ Come funziona:</h3>
                                    <ul className="list-disc ml-4 space-y-1 text-gray-300">
                                        <li>Attaccante invia richiesta con header modificati (es: X-Forwarded-Host)</li>
                                        <li>Server risponde includendo header nella risposta</li>
                                        <li>Risposta viene cacheata con cache key inadeguata</li>
                                        <li>Utenti legittimi ricevono la risposta avvelenata dalla cache</li>
                                    </ul>
                                </div>
                                <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-3">
                                    <h3 className="font-semibold mb-2">🔑 Cache Key:</h3>
                                    <p className="text-gray-300">
                                        La cache key determina quale risposta viene servita.
                                        Se non include header sensibili (Host, Cookie, ecc.), risposte 
                                        diverse possono essere servite dalla stessa entry in cache.
                                    </p>
                                </div>
                                <div className="bg-green-900/30 border-l-4 border-green-500 p-3">
                                    <h3 className="font-semibold mb-2">✅ Prevenzione:</h3>
                                    <ul className="list-disc ml-4 space-y-1 text-gray-300">
                                        <li><strong>Vary header:</strong> Include header sensibili nella cache key</li>
                                        <li><strong>Cache-Control:</strong> no-store per contenuti dinamici</li>
                                        <li><strong>Validazione input:</strong> Non fidarsi di header client</li>
                                        <li><strong>Cache key corretta:</strong> Include Host, Cookie, etc.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        ]
    };

    // === CONFIGURAZIONE TERMINAL ===
    const terminalConfig = {
        initialHistory: [
            '$ Reverse Proxy Management Terminal v1.0',
            '$ Type "help" for available commands',
            '$ ⚠️  WARNING: Cache poisoning detected - Malicious content in cache!',
        ],
        commands: {
            'show-cache': () => {
                const entries = Object.entries(cacheEntries);
                if (entries.length === 0) {
                    return '[✓] Cache is empty';
                }
                
                let output = '=== CACHE ENTRIES ===\n';
                entries.forEach(([path, data]) => {
                    output += `\nPath: ${path}\n`;
                    output += `  Status: ${data.content}\n`;
                    output += `  Cache Hits: ${data.hits}\n`;
                    output += `  Cached at: ${data.timestamp}\n`;
                    output += `  X-Cache: ${data.headers['X-Cache']}\n`;
                });
                return output;
            },

            'purge-cache': () => {
                if (Object.keys(cacheEntries).length === 0) {
                    return '[!] Cache is already empty';
                }
                setCacheEntries({});
                setCacheCleared(true);
                setCurrentStep(1);
                return `[✓] Cache purged successfully
[+] All cached entries removed
[+] Next requests will fetch fresh content from origin
[!] Remember to fix cache configuration to prevent re-poisoning!`;
            },

            'show-headers': () => {
                return `=== HTTP RESPONSE HEADERS ===
Current configuration:

Cache-Control: ${cachePoisoned ? 'public, max-age=3600 ❌' : 'no-store, must-revalidate ✅'}
  Problem: ${cachePoisoned ? 'Dynamic content is being cached publicly' : 'Correctly prevents caching of dynamic content'}

Vary: ${cachePoisoned ? '<not set> ❌' : 'Host, X-Forwarded-Host, Cookie ✅'}
  Problem: ${cachePoisoned ? 'Cache key does not include sensitive headers' : 'Cache key properly includes sensitive headers'}

X-Forwarded-Host: ${cachePoisoned ? 'evil.com ❌' : '<sanitized> ✅'}
  Problem: ${cachePoisoned ? 'Untrusted header used in cache key' : 'Header properly validated'}`;
            },

            'identify-header': () => {
                setHeaderIdentified(true);
                setCurrentStep(2);
                return `=== HEADER ANALYSIS ===
Poisoning vector identified: X-Forwarded-Host

How it works:
1. Attacker sends: X-Forwarded-Host: evil.com
2. Server uses this header to generate response
3. Response gets cached with incorrect cache key
4. All users receive the poisoned response

Root cause: Cache key does not include X-Forwarded-Host
Solution: Add "Vary: X-Forwarded-Host" header

✓ Attack vector identified successfully!`;
            },

            'fix-cache-key': () => {
                if (cacheKeyFixed) {
                    return '[!] Cache key is already configured correctly';
                }
                setCacheKeyFixed(true);
                return `[✓] Cache key configuration updated
[+] Cache key now includes: URL + Host + X-Forwarded-Host + Cookie
[+] Prevents cache collisions from different requests
[+] Each unique request gets its own cache entry`;
            },

            'set-cache-control': (args) => {
                if (args[0] !== 'no-store') {
                    return 'Usage: set-cache-control no-store';
                }
                if (noCacheDynamic) {
                    return '[!] Cache-Control is already set to no-store';
                }
                setNoCacheDynamic(true);
                return `[✓] Cache-Control header updated
[+] Set to: no-store, must-revalidate
[+] Dynamic/personalized content will not be cached
[+] Only static assets will be cached`;
            },

            'enable-vary-header': () => {
                if (varyHeaderEnabled) {
                    return '[!] Vary header is already enabled';
                }
                setVaryHeaderEnabled(true);
                setCurrentStep(3);
                return `[✓] Vary header enabled
[+] Set to: Vary: Host, X-Forwarded-Host, Cookie
[+] Cache key now includes these headers
[+] Prevents cache poisoning via header manipulation`;
            },

            'restart-proxy': () => {
                if (!cacheCleared) {
                    return '[!] Please purge cache first before restarting';
                }
                if (!varyHeaderEnabled && !headersFixed) {
                    return '[!] Please fix headers configuration before restarting';
                }
                setProxyRestarted(true);
                setHeadersFixed(true);
                return `[✓] Reverse proxy restarted
[✓] New configuration applied
[✓] Cache: ${Object.keys(cacheEntries).length === 0 ? 'CLEAN' : 'NEEDS PURGE'}
[✓] Headers: ${varyHeaderEnabled ? 'SECURE' : 'CHECK CONFIG'}
${!cachePoisoned ? '[✓] Cache poisoning mitigated successfully!' : '[!] System still vulnerable'}`;
            },

            'status': () => {
                return `=== CACHE SECURITY STATUS ===
Cache Poisoned: ${cachePoisoned ? '🔴 YES' : '🟢 NO'}
Cache Entries: ${Object.keys(cacheEntries).length}
Cache Cleared: ${cacheCleared ? '✓' : '✗'}
Headers Fixed: ${headersFixed ? '✓' : '✗'}
Vary Header: ${varyHeaderEnabled ? '✓' : '✗'}
Cache Key Fixed: ${cacheKeyFixed ? '✓' : '✗'}
No-Cache Dynamic: ${noCacheDynamic ? '✓' : '✗'}
Header Identified: ${headerIdentified ? '✓' : '✗'}
Proxy Restarted: ${proxyRestarted ? '✓' : '✗'}`;
            }
        },
        prompt: 'proxy@cache-defense:~$',
        helpCommand: true
    };

    // === CONFIGURAZIONE SIEM ===
    const siemConfig = {
        logs: generateCachePoisoningLogs(cachePoisoned, headerIdentified),
        blockedIPs: 0,
        currentStep: currentStep,
        trafficHistory: [
            { time: '16:15', value: 20 },
            { time: '16:16', value: 25 },
            { time: '16:17', value: 30 },
            { time: '16:18', value: 35 },
            { time: '16:19', value: cachePoisoned ? 55 : 30 },
            { time: '16:20', value: cachePoisoned ? 75 : 25 }
        ],
        networkTraffic: { 
            incoming: cachePoisoned ? 650 : 320, 
            outgoing: cachePoisoned ? 420 : 280 
        },
        protocols: { 
            http: cachePoisoned ? 750 : 400,
            https: 250, 
            ssh: 0, 
            ftp: 0 
        },
        selectedLog: null,
        onLogClick: (log) => console.log('Log analizzato:', log)
    };

    // === HINT PROGRESSIVI ===
    const getHintText = () => {
        if (completed) return '';
        
        switch(currentStep) {
            case 0:
                return '🔍 STEP 1: Analizza i log SIEM. Vedi "Cache HIT" con contenuti anomali? Usa "show-cache" per vedere cosa è memorizzato.';
            case 1:
                return '🔑 STEP 2: Cache svuotata! Ora identifica l\'header responsabile con "identify-header" e correggi la configurazione.';
            case 2:
                return '🛡️ STEP 3: Abilita "Vary" header con "enable-vary-header" e imposta "set-cache-control no-store" per contenuti dinamici.';
            case 3:
                return '🔄 STEP 4: Riavvia il proxy con "restart-proxy" per applicare tutte le modifiche di sicurezza.';
            case 4: {
                const hints = [
                    '✅ Stai quasi terminando! Verifica che tutte le protezioni siano attive.',
                    'Ricorda: il Vary header deve includere Host e X-Forwarded-Host.',
                    'Ultimo passo! Assicurati che il proxy sia riavviato e la cache sia pulita.'
                ];
                return hints[Math.min(hintIndex, hints.length - 1)];
            }
            default:
                return '✅ Usa "status" per verificare che tutte le protezioni siano attive!';
        }
    };

    // === STATISTICHE FINALI ===
    const additionalStats = [
        {
            label: 'Cache entries rimosse',
            value: cacheCleared ? 'SI' : 'NO',
            color: cacheCleared ? 'text-cyber-green' : 'text-red-500'
        },
        {
            label: 'Header identificato',
            value: headerIdentified ? 'X-Forwarded-Host' : 'Non identificato',
            color: headerIdentified ? 'text-cyber-green' : 'text-yellow-400'
        },
        {
            label: 'Protezioni attive',
            value: [varyHeaderEnabled, cacheKeyFixed, noCacheDynamic].filter(Boolean).length,
            color: [varyHeaderEnabled, cacheKeyFixed, noCacheDynamic].filter(Boolean).length >= 2 ? 'text-cyber-green' : 'text-yellow-400'
        }
    ];

    return (
        <div>
            <LevelTemplate 
                stars={stars}
                hint={showHint && visibleHint ? <InfoPanel text={visibleHint} /> : null}
                browserConfig={browserConfig}
                terminalConfig={terminalConfig}
                siemConfig={siemConfig}
            >                
                {completed && (
                    <MissionDebrief
                        success={true}
                        stats={{ stars, health: 100 }}
                        recapText={`CACHE POISONING DEFENSE ANALYSIS\n\n` +
                            `Cache cleared: ${cacheCleared ? 'YES' : 'NO'}\n` +
                            `Headers fixed: ${headersFixed ? 'YES' : 'NO'}\n` +
                            `Vary header enabled: ${varyHeaderEnabled ? 'YES' : 'NO'}\n` +
                            `Tempo completamento: ${completionTime}s\n\n` +
                            `${!cachePoisoned && proxyRestarted ? 'RISULTATO: Cache poisoning threat neutralized!' : 'RISULTATO: Completato.'}`}
                        onExit={() => window.location.href = '/'}
                    />
                )}
            </LevelTemplate>
        </div>
    );
};

export default Level5;
