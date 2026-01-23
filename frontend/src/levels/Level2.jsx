import React, { useState, useEffect } from 'react';
import LevelTemplate from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import MissionDebrief from '../components/MissionDebrief';
import HealthBar from '../components/HealthBar';

/**
 * LEVEL 2: DDoS ATTACK MITIGATION
 * 
 * Scenario educativo:
 * - Il giocatore è un analista SOC
 * - Un sito aziendale sta subendo un attacco DDoS (HTTP Flood)
 * - Il traffico aumenta rapidamente, il sito va in timeout
 * - Il giocatore deve analizzare i log SIEM e mitigare l'attacco
 * 
 * Obiettivi didattici:
 * - Riconoscere i segnali di un attacco DDoS
 * - Comprendere l'importanza del rate limiting
 * - Imparare a bloccare IP malevoli senza falsi positivi
 * - Usare strumenti di analisi del traffico di rete
 * 
 * Sistema stelle (NON obbligatorio):
 * ⭐ 1 stella: Completare il livello (mitigazione base)
 * ⭐ 2 stelle: Mitigare senza bloccare IP legittimi
 * ⭐ 3 stelle: Mitigazione completa + analisi avanzata
 */

// IP malevoli che stanno effettuando l'attacco DDoS
const MALICIOUS_IPS = [
    '203.0.113.42',
    '203.0.113.87',
    '198.51.100.15',
    '198.51.100.99',
    '192.0.2.200'
];

// IP legittimi da NON bloccare (falsi positivi)
const LEGITIMATE_IPS = [
    '192.168.1.100',
    '192.168.1.105',
    '10.0.0.50'
];

// Genera log SIEM che mostrano l'attacco DDoS in corso
const generateDDoSLogs = () => [
    {
        id: 1,
        time: '14:30:01',
        severity: 'critical',
        source: '203.0.113.42',
        type: 'ALERT',
        message: 'HTTP flood detected - 500 requests/sec from single source',
        threat: true
    },
    {
        id: 2,
        time: '14:30:05',
        severity: 'critical',
        source: '203.0.113.87',
        type: 'ALERT',
        message: 'HTTP flood detected - 480 requests/sec from single source',
        threat: true
    },
    {
        id: 3,
        time: '14:30:08',
        severity: 'critical',
        source: '198.51.100.15',
        type: 'ALERT',
        message: 'Abnormal traffic pattern - Repeated GET requests to homepage',
        threat: true
    },
    {
        id: 4,
        time: '14:30:12',
        severity: 'low',
        source: '192.168.1.100',
        type: 'INFO',
        message: 'Normal user activity - Page load successful',
        threat: false
    },
    {
        id: 5,
        time: '14:30:15',
        severity: 'critical',
        source: '198.51.100.99',
        type: 'ALERT',
        message: 'HTTP flood detected - 520 requests/sec from single source',
        threat: true
    },
    {
        id: 6,
        time: '14:30:18',
        severity: 'high',
        source: '192.0.2.200',
        type: 'SECURITY',
        message: 'Distributed attack pattern detected - Multiple IPs with similar behavior',
        threat: true
    },
    {
        id: 7,
        time: '14:30:22',
        severity: 'low',
        source: '192.168.1.105',
        type: 'INFO',
        message: 'Normal user activity - API request completed',
        threat: false
    },
    {
        id: 8,
        time: '14:30:25',
        severity: 'critical',
        source: '203.0.113.42',
        type: 'ALERT',
        message: 'Server resource exhaustion - CPU at 98%, Memory at 95%',
        threat: true
    }
];

const Level2 = () => {
    // Sistema di reputazione (stelle)
    const { stars } = useReputation('level2', 0);
    const { earnStar } = useReputation('level2', 0);

    const [attackActive, setAttackActive] = useState(true); // Attacco in corso
    const [trafficLevel, setTrafficLevel] = useState(95); // Traffico anomalo (0-100)
    const [blockedIPs, setBlockedIPs] = useState([]); // IP bloccati dal giocatore
    const [firewallEnabled, setFirewallEnabled] = useState(false); // Firewall attivo
    const [rateLimitEnabled, setRateLimitEnabled] = useState(false); // Rate limiting attivo
    const [falsePositives, setFalsePositives] = useState(0); // IP legittimi bloccati per errore
    const [correctBlocks, setCorrectBlocks] = useState(0); // IP malevoli bloccati correttamente

    // Health bar: calcolata in base al tempo e traffico
    const [missionEnd, setMissionEnd] = useState(false);
    const [missionSuccess, setMissionSuccess] = useState(false);
    const [startHealthTime, setStartHealthTime] = useState(Date.now());
    const [healthAtStart, setHealthAtStart] = useState(100);

    // Stato salute dinamica
    const [health, setHealth] = useState(100);

    // Aggiorna la salute ogni secondo in base al tempo e traffico
    useEffect(() => {
        if (!attackActive || missionEnd) return;
        const interval = setInterval(() => {
            setHealth(prev => {
                let decrement = 0;
                if (trafficLevel > 80) decrement = 2;
                else if (trafficLevel > 50) decrement = 1;
                else if (trafficLevel > 30) decrement = 1;
                else decrement = 1;
                // Ogni 6 secondi scende di decrement
                return Math.max(0, prev - (decrement / 6));
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [attackActive, missionEnd, trafficLevel]);

    // Quando cambia il traffico o reset, aggiorna la salute di partenza
    useEffect(() => {
        if (!attackActive || missionEnd) return;
        setHealth(healthAtStart);
    }, [trafficLevel, firewallEnabled, rateLimitEnabled, blockedIPs, attackActive, missionEnd, healthAtStart]);

    // Quando cambia il traffico (o protezioni), aggiorna il punto di partenza della salute
    useEffect(() => {
        if (!attackActive || missionEnd) return;
        setHealthAtStart(health);
        setStartHealthTime(Date.now());
    }, [trafficLevel, firewallEnabled, rateLimitEnabled, blockedIPs, attackActive, missionEnd]);

    // UI State
    const [completed, setCompleted] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [completionTime, setCompletionTime] = useState(0);
    const [terminalOutput, setTerminalOutput] = useState([]);

    // Quando il giocatore blocca IP o attiva protezioni, il traffico diminuisce
    useEffect(() => {
        let newTraffic = 95;
        // Rate limiting riduce il traffico del 30%
        if (rateLimitEnabled) newTraffic -= 30;
        // Firewall riduce il traffico del 20%
        if (firewallEnabled) newTraffic -= 20;
        // Ogni IP malevolo bloccato riduce il traffico del 10%
        newTraffic -= (correctBlocks * 10);
        // Il traffico non può scendere sotto 5 (traffico normale)
        newTraffic = Math.max(5, newTraffic);
        setTrafficLevel(newTraffic);
        // L'attacco è mitigato se il traffico scende sotto 40%
        if (newTraffic < 40 && attackActive) {
            setAttackActive(false);
            setCompleted(true);
            setMissionEnd(true);
            setMissionSuccess(true);
            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
            // Assegna stelle in modo progressivo
            if (stars < 1) earnStar(); // 1 stella: completamento
            if (falsePositives === 0 && stars < 2) earnStar(); // 2 stelle: nessun falso positivo
            if (correctBlocks === MALICIOUS_IPS.length && stars < 3) earnStar(); // 3 stelle: tutti i malevoli bloccati
        }
    }, [blockedIPs, firewallEnabled, rateLimitEnabled, correctBlocks, attackActive, stars, earnStar, falsePositives, startTime]);

    // === HEALTH BAR TIMER ===
    useEffect(() => {
        if (missionEnd || !attackActive) return;
        if (health <= 0) {
            setMissionEnd(true);
            setMissionSuccess(false);
            setAttackActive(false);
            setCompleted(true);
            return;
        }
        const interval = setInterval(() => {
            // Forza il re-render per aggiornare la barra salute
            // (usando un dummy state, oppure setStartHealthTime per triggerare)
            setStartHealthTime(t => t);
        }, 1000);
        return () => clearInterval(interval);
    }, [attackActive, missionEnd, health]);

    const browserConfig = {
        availableSites: [
            {
                url: 'https://company-website.com',
                title: 'Company Website',
                icon: '🏢',
                content: attackActive ? (
                    // Sito down durante l'attacco
                    <div className="p-6 bg-red-50 h-full flex flex-col items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h1 className="text-4xl font-bold text-red-600 mb-4">503</h1>
                            <h2 className="text-xl font-semibold text-red-800 mb-2">Service Unavailable</h2>
                            <p className="text-gray-700 mb-4">Il server non può gestire la richiesta al momento.</p>
                            <div className="bg-red-100 border border-red-300 rounded p-4 mt-4">
                                <p className="text-sm text-red-800 font-mono">
                                    Error: Connection timeout<br/>
                                    Too many requests to server<br/>
                                    Retry-After: unknown
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Sito funzionante dopo la mitigazione
                    <div className="p-6 bg-white h-full">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-4xl">🏢</div>
                                <h1 className="text-3xl font-bold text-blue-900">Company Website</h1>
                                <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    ✓ ONLINE
                                </div>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h2 className="font-semibold text-lg mb-2">🎉 Sito ripristinato!</h2>
                                <p className="text-gray-700">L'attacco DDoS è stato mitigato con successo.</p>
                                <p className="text-gray-700 mt-2">Il traffico è tornato alla normalità.</p>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'https://owasp.org/www-community/attacks/Denial_of_Service',
                title: 'OWASP - DDoS Attacks',
                icon: '📚',
                content: (
                    <div className="p-6 bg-gray-900 h-full text-white overflow-y-auto">
                        <div className="max-w-2xl mx-auto">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-4xl">🛡️</div>
                                <h1 className="text-2xl font-bold">DDoS Attack Guide</h1>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div className="bg-blue-900/30 border-l-4 border-blue-500 p-3">
                                    <h3 className="font-semibold text-lg mb-2">🎯 Cos'è un attacco DDoS?</h3>
                                    <p className="text-gray-300">
                                        Distributed Denial of Service: attacco che rende un servizio 
                                        inutilizzabile sovraccaricandolo con traffico da fonti multiple.
                                    </p>
                                </div>
                                <div className="bg-red-900/30 border-l-4 border-red-500 p-3">
                                    <h3 className="font-semibold mb-2">⚠️ Indicatori di DDoS:</h3>
                                    <ul className="list-disc ml-4 space-y-1 text-gray-300">
                                        <li>Traffico di rete improvvisamente elevato</li>
                                        <li>Molte richieste da IP diversi ma pattern simile</li>
                                        <li>Server lento o irraggiungibile</li>
                                        <li>CPU/RAM al massimo</li>
                                    </ul>
                                </div>
                                <div className="bg-green-900/30 border-l-4 border-green-500 p-3">
                                    <h3 className="font-semibold mb-2">✅ Tecniche di mitigazione:</h3>
                                    <ul className="list-disc ml-4 space-y-1 text-gray-300">
                                        <li><strong>Rate Limiting:</strong> Limita richieste per IP</li>
                                        <li><strong>Firewall:</strong> Blocca traffico sospetto</li>
                                        <li><strong>IP Blocking:</strong> Blocca sorgenti malevole</li>
                                        <li><strong>Traffic Analysis:</strong> Identifica pattern anomali</li>
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
    // Comandi disponibili per mitigare l'attacco
    const terminalConfig = {
        initialHistory: [
            '$ CyberShield Security Terminal - DDoS Mitigation Module',
            '$ Type "help" for available commands',
            '$ ⚠️  WARNING: High traffic detected on web server!',
        ],
        commands: {
            'block': (args) => {
                if (!args[0]) {
                    return 'Usage: block <ip>\nExample: block 203.0.113.42';
                }
                
                const ip = args[0];
                
                // IP già bloccato
                if (blockedIPs.includes(ip)) {
                    return `[!] IP ${ip} is already blocked`;
                }
                
                // Blocca l'IP
                setBlockedIPs(prev => [...prev, ip]);
                
                // Verifica se è un IP malevolo o legittimo
                if (MALICIOUS_IPS.includes(ip)) {
                    setCorrectBlocks(prev => prev + 1);
                    return `[✓] Malicious IP ${ip} blocked successfully!\n[+] DDoS traffic reduced`;
                } else if (LEGITIMATE_IPS.includes(ip)) {
                    setFalsePositives(prev => prev + 1);
                    return `[✗] WARNING: ${ip} is a legitimate user!\n[!] False positive detected - User access denied`;
                } else {
                    return `[✓] IP ${ip} blocked`;
                }
            },
            
            'enable-firewall': () => {
                if (firewallEnabled) {
                    return '[!] Firewall is already enabled';
                }
                setFirewallEnabled(true);
                return '[✓] Advanced firewall rules enabled\n[+] Suspicious traffic patterns will be filtered';
            },
            
            'rate-limit': () => {
                if (rateLimitEnabled) {
                    return '[!] Rate limiting is already active';
                }
                setRateLimitEnabled(true);
                setCurrentStep(1);
                return '[✓] HTTP rate limiting enabled\n[+] Maximum 100 requests/minute per IP\n[+] This significantly reduces flood attacks!';
            },
            
            'status': () => {
                return `=== SECURITY STATUS ===
Attack Status: ${attackActive ? '🔴 ACTIVE' : '🟢 MITIGATED'}
Traffic Level: ${trafficLevel}%
Firewall: ${firewallEnabled ? '✓ Enabled' : '✗ Disabled'}
Rate Limiting: ${rateLimitEnabled ? '✓ Enabled' : '✗ Disabled'}
Blocked IPs: ${blockedIPs.length}
Correct Blocks: ${correctBlocks}
False Positives: ${falsePositives}`;
            },
            
            'analyze': () => {
                return `=== TRAFFIC ANALYSIS ===
Total Requests: 12,450/sec (CRITICAL)
Protocol: 98% HTTP GET requests
Pattern: Repeated requests to same endpoint
Source IPs: ${MALICIOUS_IPS.length} high-volume sources detected
Recommendation: Block malicious IPs and enable rate-limit`;
            },
            
            'list-ips': () => {
                return `=== SUSPICIOUS IP ADDRESSES ===
High-volume sources:
- 203.0.113.42 (500 req/s) 🔴
- 203.0.113.87 (480 req/s) 🔴
- 198.51.100.15 (450 req/s) 🔴
- 198.51.100.99 (520 req/s) 🔴
- 192.0.2.200 (400 req/s) 🔴

Normal users:
- 192.168.1.100 (2 req/s) 🟢
- 192.168.1.105 (3 req/s) 🟢`;
            }
        },
        prompt: 'soc@ddos-defense:~$',
        helpCommand: true
    };

    // === CONFIGURAZIONE SIEM ===
    // Mostra log dell'attacco e statistiche del traffico
    const siemConfig = {
        logs: generateDDoSLogs(),
        blockedIPs: blockedIPs.length,
        currentStep: currentStep,
        trafficHistory: [
            { time: '14:25', value: 10 },
            { time: '14:26', value: 15 },
            { time: '14:27', value: 20 },
            { time: '14:28', value: 45 },
            { time: '14:29', value: 75 },
            { time: '14:30', value: trafficLevel }
        ],
        networkTraffic: { 
            incoming: attackActive ? 8500 : 350, 
            outgoing: attackActive ? 2200 : 450 
        },
        protocols: { 
            http: attackActive ? 8200 : 450,  // HTTP flood
            https: 250, 
            ssh: 50, 
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
                return 'Analizza i log SIEM. Noti molte richieste HTTP ripetute? Prova a limitare il traffico.';
            case 1:
                return 'Usa il comando per vedere gli IP sospetti e blocca quelli malevoli.';
            case 2:
                return 'Abilita il firewall per filtrare automaticamente pattern sospetti.';
            default:
                return 'Continua a mitigare l\'attacco!';
        }
    };

    // Avanzamento step
    useEffect(() => {
        if (correctBlocks >= 2 && currentStep === 1) {
            setCurrentStep(2);
        }
        if (firewallEnabled && currentStep === 2) {
            setCurrentStep(3);
        }
    }, [correctBlocks, firewallEnabled, currentStep]);

    // === STATISTICHE FINALI ===
    const additionalStats = [
        {
            label: 'Traffico mitigato',
            value: `${95 - trafficLevel}%`,
            color: trafficLevel < 40 ? 'text-cyber-green' : 'text-yellow-400'
        },
        {
            label: 'IP malevoli bloccati',
            value: `${correctBlocks}/${MALICIOUS_IPS.length}`,
            color: correctBlocks >= 4 ? 'text-cyber-green' : 'text-yellow-400'
        },
        {
            label: 'Falsi positivi',
            value: falsePositives,
            color: falsePositives === 0 ? 'text-cyber-green' : 'text-red-500'
        }
    ];

    return (
        <div>
            <LevelTemplate 
                stars={stars}
                hint={showHint ? <InfoPanel text={getHintText()} /> : null}
                browserConfig={browserConfig}
                terminalConfig={terminalConfig}
                siemConfig={siemConfig}
                enableHealthDecay={true}
                decayInterval={8000}
                decayAmount={5}
            >
                {/* Schermata di fine livello: successo o sconfitta */}
                {missionEnd && (
                    <MissionDebrief
                        success={missionSuccess}
                        stats={{ stars, health }}
                        maxStars={3}
                        recapText={missionSuccess
                            ? `Hai mitigato con successo l'attacco DDoS!\n\n- IP malevoli bloccati: ${correctBlocks}/${MALICIOUS_IPS.length}\n- Falsi positivi: ${falsePositives}\n- Traffico residuo: ${trafficLevel}%\n\nOttimo lavoro, il sito è tornato online.`
                            : `Il sistema è stato sopraffatto dall'attacco DDoS.\n\n- Salute sistema: 0%\n- IP bloccati: ${blockedIPs.length}\n- Falsi positivi: ${falsePositives}\n\nRiprova a mitigare l'attacco analizzando meglio i log e bloccando solo gli IP malevoli.`
                        }
                        onRetry={() => {
                            // Reset stato livello e salute
                            setHealthAtStart(100);
                            setStartHealthTime(Date.now());
                            setAttackActive(true);
                            setTrafficLevel(95);
                            setBlockedIPs([]);
                            setFirewallEnabled(false);
                            setRateLimitEnabled(false);
                            setFalsePositives(0);
                            setCorrectBlocks(0);
                            setCompleted(false);
                            setShowHint(true);
                            setCurrentStep(0);
                            setStartTime(Date.now());
                            setMissionEnd(false);
                        }}
                        onExit={() => {
                            // Torna alla mappa livelli
                            window.location.href = '/map';
                        }}
                    />
                )}
            </LevelTemplate>
        </div>
    );
};

export default Level2;