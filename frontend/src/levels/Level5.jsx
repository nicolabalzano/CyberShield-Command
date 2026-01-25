import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate, { useLevel } from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import MissionDebrief from '../components/MissionDebrief';
import Timer from '../components/Timer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

// Componente interno per impostare il ref di setHealth e monitorare game over
const HealthSetter = ({ healthSetterRef, onGameOver }) => {
    const { health, setHealth } = useLevel();

    React.useEffect(() => {
        if (healthSetterRef) {
            healthSetterRef.current = setHealth;
        }
    }, [setHealth, healthSetterRef]);

    React.useEffect(() => {
        if (health <= 0 && onGameOver) {
            onGameOver();
        }
    }, [health, onGameOver]);

    return null;
};

// Wrapper per MissionDebrief con accesso alla salute
const MissionDebriefWrapper = ({ stats, ...props }) => {
    const { health } = useLevel();
    return <MissionDebrief {...props} stats={{ ...stats, health }} />;
};

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
const generateCachePoisoningLogs = (cachePoisoned, headerIdentified, t) => [
    {
        id: 1,
        time: '16:18:30',
        severity: 'low',
        source: '192.168.1.100',
        type: 'INFO',
        message: t.logMessages.cacheMiss,
        threat: false
    },
    {
        id: 2,
        time: '16:19:45',
        severity: cachePoisoned ? 'medium' : 'low',
        source: '203.0.113.66',
        type: cachePoisoned ? 'WARNING' : 'INFO',
        message: cachePoisoned
            ? t.logMessages.suspiciousReq
            : t.logMessages.reqValidated,
        threat: cachePoisoned
    },
    {
        id: 3,
        time: '16:20:45',
        severity: cachePoisoned ? 'high' : 'low',
        source: '203.0.113.66',
        type: cachePoisoned ? 'SECURITY' : 'INFO',
        message: cachePoisoned
            ? t.logMessages.cacheHitPoisoned
            : t.logMessages.cacheConfigured,
        threat: cachePoisoned
    },
    {
        id: 4,
        time: '16:21:10',
        severity: cachePoisoned ? 'critical' : 'low',
        source: '192.168.1.105',
        type: cachePoisoned ? 'ALERT' : 'INFO',
        message: cachePoisoned
            ? t.logMessages.criticalHit
            : t.logMessages.safeContent,
        threat: cachePoisoned
    },
    {
        id: 5,
        time: '16:21:35',
        severity: 'low',
        source: '192.168.1.100',
        type: 'INFO',
        message: t.logMessages.normalBrowsing,
        threat: false
    },
    {
        id: 6,
        time: '16:22:18',
        severity: cachePoisoned ? 'high' : 'low',
        source: '192.168.1.110',
        type: cachePoisoned ? 'SECURITY' : 'INFO',
        message: cachePoisoned
            ? t.logMessages.cachePollution
            : headerIdentified
                ? t.logMessages.varyConfigured
                : t.logMessages.consistentContent,
        threat: cachePoisoned
    },
    {
        id: 7,
        time: '16:23:05',
        severity: cachePoisoned ? 'high' : 'low',
        source: 'cache-server-01',
        type: cachePoisoned ? 'ERROR' : 'INFO',
        message: cachePoisoned
            ? t.logMessages.keyCollision
            : t.logMessages.keyCorrect,
        threat: cachePoisoned
    },
    {
        id: 8,
        time: '16:23:42',
        severity: cachePoisoned ? 'critical' : 'low',
        source: 'cache-server-01',
        type: cachePoisoned ? 'ALERT' : 'INFO',
        message: cachePoisoned
            ? t.logMessages.multipleAffected
            : t.logMessages.normalOps,
        threat: cachePoisoned
    }
];

const Level5 = () => {
    const navigate = useNavigate();
    // Sistema di reputazione (stelle)
    const { stars, earnStar } = useReputation('level5', 0);
    const { language } = useLanguage();
    const t = translations[language]?.level5 || translations['italiano'].level5;

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
    const [failed, setFailed] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [startTime] = useState(Date.now());
    const [completionTime, setCompletionTime] = useState(0);
    const [hintIndex, setHintIndex] = useState(0);
    const [visibleHint, setVisibleHint] = useState(null);

    // Timer State (5 minutes)
    const MAX_TIME = 300;
    const [secondsRemaining, setSecondsRemaining] = useState(MAX_TIME);

    // Ref per accedere a setHealth da Level5Content
    const healthSetterRef = React.useRef(null);

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

    // Timer logic - countdown every second
    useEffect(() => {
        if (completed || failed) return; // Don't count down after completion or failure

        const interval = setInterval(() => {
            setSecondsRemaining(prev => {
                const newVal = prev - 1;

                if (newVal <= 0) {
                    if (healthSetterRef.current) {
                        healthSetterRef.current(0); // Game Over
                    }
                    clearInterval(interval);
                    return 0;
                }
                return newVal;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [completed, failed]);

    // Update health based on remaining time (linear decrease)
    useEffect(() => {
        if (completed || failed) return;

        // Calculate health based on remaining time (linear decrease)
        // 300s = 100%, 0s = 0%
        const healthPercentage = Math.floor((secondsRemaining / MAX_TIME) * 100);
        if (healthSetterRef.current) {
            healthSetterRef.current(Math.max(0, healthPercentage));
        }
    }, [secondsRemaining, completed, failed]);

    const [configStarAwarded, setConfigStarAwarded] = useState(false);
    const [analysisStarAwarded, setAnalysisStarAwarded] = useState(false);

    // === LOGICA DI MITIGAZIONE ===
    // Cache è sicura quando è svuotata E configurata correttamente
    useEffect(() => {
        if (cacheCleared && (headersFixed || (varyHeaderEnabled && noCacheDynamic))) {
            setCachePoisoned(false);
        }
    }, [cacheCleared, headersFixed, varyHeaderEnabled, noCacheDynamic]);

    // ASSEGNAZIONE STELLE IN TEMPO REALE

    // Stella 2: cache configurata correttamente + no cache per contenuto dinamico
    useEffect(() => {
        if (!configStarAwarded && headersFixed && noCacheDynamic) {
            earnStar();
            setConfigStarAwarded(true);
        }
    }, [headersFixed, noCacheDynamic, configStarAwarded, earnStar]);

    // Stella 3: header identificato + cache key corretta + Vary header
    useEffect(() => {
        if (!analysisStarAwarded && headerIdentified && cacheKeyFixed && varyHeaderEnabled) {
            earnStar();
            setAnalysisStarAwarded(true);
        }
    }, [headerIdentified, cacheKeyFixed, varyHeaderEnabled, analysisStarAwarded, earnStar]);

    // === CONDIZIONE DI COMPLETAMENTO ===
    useEffect(() => {
        if (!cachePoisoned && proxyRestarted && !completed) {
            // Stella 1: completamento base (se non ancora presa, la prende ora)
            if (stars === 0) {
                earnStar();
            } else if (stars === 1 && configStarAwarded) {
                // Caso limite: ha preso la stella config ma non quella base ancora (improbabile ma safe)
                // earnStar incrementa comunque
            }

            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
            setTimeout(() => {
                setCompleted(true);
            }, 2000);
        }
    }, [cachePoisoned, proxyRestarted, completed, stars, earnStar, startTime, configStarAwarded]);

    // === CONFIGURAZIONE BROWSER ===
    const browserConfig = {
        availableSites: [
            {
                url: 'http://localhost:3000/',
                title: t.browser.site.title,
                icon: '🏢',
                content: cachePoisoned ? (
                    // Contenuto avvelenato dalla cache
                    <div className="p-6 bg-red-50 h-full">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-red-600 text-white px-4 py-2 mb-4 animate-pulse">
                                {t.browser.site.alert}
                            </div>
                            <h1 className="text-3xl font-bold mb-4">{t.browser.site.title}</h1>
                            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
                                <p className="font-mono text-sm text-red-800">
                                    &lt;script&gt;alert('Cache Poisoned!')&lt;/script&gt;
                                </p>
                                <p className="text-sm text-red-700 mt-2">
                                    {t.browser.site.malicious}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow mt-4">
                                <h3 className="font-semibold mb-2">{t.browser.site.headers}</h3>
                                <div className="font-mono text-xs space-y-1 text-gray-700">
                                    {Object.entries(cacheEntries['/']?.headers || POISONED_HEADERS).map(([key, value]) => (
                                        <div key={key}>
                                            <span className="text-blue-600">{key}:</span> {value || '<empty>'}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-red-600 mt-2">
                                    {t.browser.site.hitWarning}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Contenuto sicuro dopo fix
                    <div className="p-6 bg-white h-full">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-3xl font-bold text-gray-800">{t.browser.site.title}</h1>
                                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                                    {t.browser.site.secure}
                                </div>
                            </div>
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                                <p className="text-green-800 whitespace-pre-wrap">
                                    {t.browser.site.purged}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow border">
                                <h3 className="font-semibold mb-2">{t.browser.site.headers}</h3>
                                <div className="font-mono text-xs space-y-1 text-gray-700">
                                    {Object.entries(SAFE_HEADERS).map(([key, value]) => (
                                        <div key={key}>
                                            <span className="text-blue-600">{key}:</span> {value || '<empty>'}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-green-600 mt-2">
                                    {t.browser.site.missSuccess}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'http://localhost:3000/profile',
                title: t.browser.profile.title,
                icon: '👤',
                content: cachePoisoned ? (
                    <div className="p-6 bg-red-50 h-full">
                        <div className="max-w-2xl mx-auto">
                            <h1 className="text-2xl font-bold mb-4">{t.browser.profile.title}</h1>
                            <div className="bg-red-600 text-white p-3 rounded mb-4">
                                {t.browser.profile.warning}
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow">
                                <p className="text-sm text-red-700">
                                    {t.browser.profile.hitWarning}
                                </p>
                                <p className="text-xs text-gray-600 mt-2 font-mono">
                                    {t.browser.profile.headerError}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 bg-white h-full">
                        <div className="max-w-2xl mx-auto">
                            <h1 className="text-2xl font-bold mb-4">{t.browser.profile.title}</h1>
                            <div className="bg-green-100 p-3 rounded mb-4">
                                {t.browser.profile.freshSuccess}
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow border">
                                <p className="text-sm text-green-700">
                                    {t.browser.profile.missSuccess}
                                </p>
                                <p className="text-xs text-gray-600 mt-2 font-mono">
                                    {t.browser.profile.headerSuccess}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'https://owasp.org/www-community/attacks/Cache_Poisoning',
                title: t.browser.owasp.title,
                icon: '📚',
                content: (
                    <div className="p-6 bg-gray-900 text-white h-full overflow-y-auto">
                        <div className="max-w-2xl mx-auto">
                            <h1 className="text-2xl font-bold mb-4">{t.browser.owasp.title}</h1>
                            <div className="space-y-4 text-sm">
                                <div className="bg-blue-900/30 border-l-4 border-blue-500 p-3">
                                    <h3 className="font-semibold mb-2">{t.browser.owasp.whatTitle}</h3>
                                    <p className="text-gray-300">
                                        {t.browser.owasp.whatText}
                                    </p>
                                </div>
                                <div className="bg-red-900/30 border-l-4 border-red-500 p-4 rounded-r-lg">
                                    <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
                                        <span>⚙️</span> {t.browser.owasp.howTitle}
                                    </h3>
                                    <div className="grid gap-2">
                                        {t.browser.owasp.howList.map((item, i) => (
                                            <div key={i} className="bg-red-950/40 p-2 rounded flex items-center gap-3 border border-red-500/20">
                                                <span className="text-red-500 font-mono text-xs">0{i + 1}</span>
                                                <span className="text-gray-300 text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                                    <h3 className="font-semibold mb-2 text-lg text-yellow-400">
                                        {t.browser.owasp.keyTitle}
                                    </h3>
                                    <p className="text-gray-300 text-sm bg-yellow-950/40 p-3 rounded border border-yellow-500/20">
                                        {t.browser.owasp.keyText}
                                    </p>
                                </div>
                                <div className="bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg">
                                    <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
                                        <span>🛡️</span> {t.browser.owasp.prevTitle}
                                    </h3>
                                    <div className="grid gap-2">
                                        {t.browser.owasp.prevList.map((item, i) => (
                                            <div key={i} className="bg-green-950/40 p-2 rounded border border-green-500/20 flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: item }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        ]
    };

    // === CONFIGURAZIONE TERMINAL ===
    // === CONFIGURAZIONE TERMINAL ===
    const terminalConfig = {
        initialHistory: t.terminal.initial,
        commands: {
            'show-cache': () => {
                const entries = Object.entries(cacheEntries);
                if (entries.length === 0) {
                    return t.terminal.showCache.empty;
                }

                let output = `${t.terminal.showCache.header}\n`;
                entries.forEach(([path, data]) => {
                    output += `\n${t.terminal.showCache.path} ${path}\n`;
                    output += `  ${t.terminal.showCache.status} ${data.content}\n`;
                    output += `  ${t.terminal.showCache.hits} ${data.hits}\n`;
                    output += `  ${t.terminal.showCache.cachedAt} ${data.timestamp}\n`;
                    output += `  ${t.terminal.showCache.xCache} ${data.headers['X-Cache']}\n`;
                });
                return output;
            },

            'purge-cache': () => {
                if (Object.keys(cacheEntries).length === 0) {
                    return t.terminal.purgeCache.alreadyEmpty;
                }
                setCacheEntries({});
                setCacheCleared(true);
                setCurrentStep(1);
                return t.terminal.purgeCache.success;
            },

            'show-headers': () => {
                return `${t.terminal.showHeaders.header}
${t.terminal.showHeaders.current}

Cache-Control: ${cachePoisoned ? t.terminal.showHeaders.ccPublic : t.terminal.showHeaders.ccPrivate}
  Problem: ${cachePoisoned ? t.terminal.showHeaders.probPublic : t.terminal.showHeaders.probPrivate}

Vary: ${cachePoisoned ? t.terminal.showHeaders.varyMissing : t.terminal.showHeaders.varySet}
  Problem: ${cachePoisoned ? t.terminal.showHeaders.probVaryMissing : t.terminal.showHeaders.probVarySet}

X-Forwarded-Host: ${cachePoisoned ? t.terminal.showHeaders.xfhEvil : t.terminal.showHeaders.xfhSanitized}
  Problem: ${cachePoisoned ? t.terminal.showHeaders.probXfhEvil : t.terminal.showHeaders.probXfhSanitized}`;
            },

            'identify-header': () => {
                setHeaderIdentified(true);
                setCurrentStep(2);
                return t.terminal.identifyHeader.success;
            },

            'fix-cache-key': () => {
                if (cacheKeyFixed) {
                    return t.terminal.fixCacheKey.already;
                }
                setCacheKeyFixed(true);
                return t.terminal.fixCacheKey.success;
            },

            'set-cache-control': (args) => {
                if (args[0] !== 'no-store') {
                    return t.terminal.setCacheControl.usage;
                }
                if (noCacheDynamic) {
                    return t.terminal.setCacheControl.already;
                }
                setNoCacheDynamic(true);
                return t.terminal.setCacheControl.success;
            },

            'enable-vary-header': () => {
                if (varyHeaderEnabled) {
                    return t.terminal.enableVaryHeader.already;
                }
                setVaryHeaderEnabled(true);
                setCurrentStep(3);
                return t.terminal.enableVaryHeader.success;
            },

            'restart-proxy': () => {
                if (!cacheCleared) {
                    return t.terminal.restartProxy.reqPurge;
                }
                if (!varyHeaderEnabled && !headersFixed) {
                    return t.terminal.restartProxy.reqFix;
                }
                setProxyRestarted(true);
                setHeadersFixed(true);
                return `${t.terminal.restartProxy.success}
[✓] Cache: ${Object.keys(cacheEntries).length === 0 ? t.terminal.restartProxy.cacheClean : t.terminal.restartProxy.cacheDirty}
[✓] Headers: ${varyHeaderEnabled ? t.terminal.restartProxy.headersSecure : t.terminal.restartProxy.headersCheck}
${!cachePoisoned ? t.terminal.restartProxy.mitigated : t.terminal.restartProxy.vulnerable}`;
            },

            'status': () => {
                return `${t.terminal.status.header}
${t.terminal.status.poisoned} ${cachePoisoned ? t.terminal.status.yes : t.terminal.status.no}
${t.terminal.status.entries} ${Object.keys(cacheEntries).length}
${t.terminal.status.cleared} ${cacheCleared ? '✓' : '✗'}
${t.terminal.status.headersFixed} ${headersFixed ? '✓' : '✗'}
${t.terminal.status.vary} ${varyHeaderEnabled ? '✓' : '✗'}
${t.terminal.status.keyFixed} ${cacheKeyFixed ? '✓' : '✗'}
${t.terminal.status.noCache} ${noCacheDynamic ? '✓' : '✗'}
${t.terminal.status.identified} ${headerIdentified ? '✓' : '✗'}
${t.terminal.status.restarted} ${proxyRestarted ? '✓' : '✗'}`;
            },

            'help': () => t.terminal.help
        },
        prompt: 'proxy@cache-defense:~$',
        helpCommand: false,
        notFoundMessage: t.terminal.notFound
    };
    // === CONFIGURAZIONE SIEM ===
    const siemConfig = {
        logs: generateCachePoisoningLogs(cachePoisoned, headerIdentified, t),
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

        switch (currentStep) {
            case 0:
                return t.hints.step0;
            case 1:
                return t.hints.step1;
            case 2:
                return t.hints.step2;
            case 3:
                return t.hints.step3;
            case 4: {
                const hints = [
                    t.hints.step4.a,
                    t.hints.step4.b,
                    t.hints.step4.c
                ];
                return hints[Math.min(hintIndex, hints.length - 1)];
            }
            default:
                return t.hints.default;
        }
    };

    // === STATISTICHE FINALI ===
    const additionalStats = [
        {
            label: t.debrief.cleared,
            value: cacheCleared ? t.terminal.status.yes : t.terminal.status.no,
            color: cacheCleared ? 'text-cyber-green' : 'text-red-500'
        },
        {
            label: t.terminal.status.identified.replace(':', ''),
            value: headerIdentified ? 'X-Forwarded-Host' : t.terminal.status.no,
            color: headerIdentified ? 'text-cyber-green' : 'text-yellow-400'
        },
        {
            label: t.debrief.vary,
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
                <HealthSetter
                    healthSetterRef={healthSetterRef}
                    onGameOver={() => {
                        setFailed(true);
                        setCompleted(true);
                    }}
                />
                {/* TIMER */}
                <div className="absolute top-[22%] left-[16.5%] z-[100] pointer-events-none transform scale-90">
                    <Timer secondsRemaining={secondsRemaining} />
                </div>
                {completed && (
                    <MissionDebriefWrapper
                        success={!failed}
                        levelId="level5"
                        stats={{ stars }}
                        recapText={!failed ?
                            `${t.debrief.title}\n\n` +
                            `${t.debrief.cleared} ${cacheCleared ? t.terminal.status.yes : t.terminal.status.no}\n` +
                            `${t.debrief.fixed} ${headersFixed ? t.terminal.status.yes : t.terminal.status.no}\n` +
                            `${t.debrief.vary} ${varyHeaderEnabled ? t.terminal.status.yes : t.terminal.status.no}\n` +
                            `${t.debrief.time} ${completionTime}s\n\n` +
                            `${!cachePoisoned && proxyRestarted ? t.debrief.success : t.debrief.completed}`
                            : t.debrief.fail}
                        onRetry={() => window.location.reload()}
                        onExit={() => navigate('/map')}
                    />
                )}
            </LevelTemplate>
        </div>
    );
};

export default Level5;
