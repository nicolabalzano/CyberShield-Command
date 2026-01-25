import React, { useState, useEffect } from 'react';
import LevelTemplate, { useLevel } from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import MissionDebrief from '../components/MissionDebrief';
import HealthBar from '../components/HealthBar';
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
 * LEVEL 2: DDoS ATTACK MITIGATION
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

const Level2 = () => {
    // Sistema di reputazione (stelle)
    const { stars, earnStar } = useReputation('level2', 0);
    const { language } = useLanguage();
    const t = translations[language]?.level2 || translations['italiano'].level2;

    // Genera log SIEM che mostrano l'attacco DDoS in corso
    const generateDDoSLogs = () => [
        {
            id: 1,
            time: '14:30:01',
            severity: 'critical',
            source: '203.0.113.42',
            type: 'ALERT',
            message: t.logs.flood,
            threat: true
        },
        {
            id: 2,
            time: '14:30:05',
            severity: 'critical',
            source: '203.0.113.87',
            type: 'ALERT',
            message: 'HTTP flood detected - 480 requests/sec from single source', // Keep variant for realism or add to translations if strictly needed exact match? Let's use generic flood if variation is not critical, or static text for variety. actually let's use the translation flood string for critical ones to ensure understanding.
            message: t.logs.flood.replace('500', '480'),
            threat: true
        },
        {
            id: 3,
            time: '14:30:08',
            severity: 'critical',
            source: '198.51.100.15',
            type: 'ALERT',
            message: t.logs.abnormal,
            threat: true
        },
        {
            id: 4,
            time: '14:30:12',
            severity: 'low',
            source: '192.168.1.100',
            type: 'INFO',
            message: t.logs.normal,
            threat: false
        },
        {
            id: 5,
            time: '14:30:15',
            severity: 'critical',
            source: '198.51.100.99',
            type: 'ALERT',
            message: t.logs.flood.replace('500', '520'),
            threat: true
        },
        {
            id: 6,
            time: '14:30:18',
            severity: 'high',
            source: '192.0.2.200',
            type: 'SECURITY',
            message: t.logs.distributed,
            threat: true
        },
        {
            id: 7,
            time: '14:30:22',
            severity: 'low',
            source: '192.168.1.105',
            type: 'INFO',
            message: t.logs.normal.replace('Page load successful', 'API request completed'), // Partial match, fallback to hardcoded if not in trans? Or just use normal log. Let's use t.logs.normal for simplicity or variations if defined.
            message: t.logs.normal,
            threat: false
        },
        {
            id: 8,
            time: '14:30:25',
            severity: 'critical',
            source: '203.0.113.42',
            type: 'ALERT',
            message: t.logs.resource,
            threat: true
        }
    ];

    const [attackActive, setAttackActive] = useState(true); // Attacco in corso
    const [trafficLevel, setTrafficLevel] = useState(95); // Traffico anomalo (0-100)
    const [blockedIPs, setBlockedIPs] = useState([]); // IP bloccati dal giocatore
    const [firewallEnabled, setFirewallEnabled] = useState(false); // Firewall attivo
    const [rateLimitEnabled, setRateLimitEnabled] = useState(false); // Rate limiting attivo
    const [analyzeUsed, setAnalyzeUsed] = useState(false); // Comando analyze usato
    const [falsePositives, setFalsePositives] = useState(0); // IP legittimi bloccati per errore
    const [correctBlocks, setCorrectBlocks] = useState(0); // IP malevoli bloccati correttamente

    // Health bar: calcolata in base al tempo e traffico
    const [missionEnd, setMissionEnd] = useState(false);
    const [missionSuccess, setMissionSuccess] = useState(false);

    // UI State
    const [completed, setCompleted] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [completionTime, setCompletionTime] = useState(0);
    const [terminalOutput, setTerminalOutput] = useState([]);
    const [hintIndex, setHintIndex] = useState(0);
    const [visibleHint, setVisibleHint] = useState(null);

    // Timer State (5 minutes)
    const MAX_TIME = 300;
    const [secondsRemaining, setSecondsRemaining] = useState(MAX_TIME);

    // Ref per accedere a setHealth da Level2Content
    const healthSetterRef = React.useRef(null);

    // Timer logic - countdown every second
    useEffect(() => {
        if (missionEnd || completed) return; // Don't count down after mission end or completion

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
    }, [missionEnd, completed]);

    // Update health based on remaining time (linear decrease)
    useEffect(() => {
        if (missionEnd || completed) return;

        // Calculate health based on remaining time (linear decrease)
        // 300s = 100%, 0s = 0%
        const healthPercentage = Math.floor((secondsRemaining / MAX_TIME) * 100);
        if (healthSetterRef.current) {
            healthSetterRef.current(Math.max(0, healthPercentage));
        }
    }, [secondsRemaining, missionEnd, completed]);

    // Reset hint index quando cambia step
    useEffect(() => {
        setHintIndex(0);
    }, [currentStep]);

    // Timer che incrementa hint index ogni 15 secondi per step con hint multipli
    useEffect(() => {
        if (currentStep === 3) {
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
    }, [currentStep, hintIndex, language]);

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
        // VITTORIA: Bloccare TUTTI gli IP malevoli (5/5)
        if (correctBlocks >= MALICIOUS_IPS.length && attackActive) {
            setAttackActive(false);
            setCompleted(true);
            setMissionEnd(true);
            setMissionSuccess(true);
            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));

            // Assegna stella per il completamento
            earnStar();
        }
    }, [blockedIPs, firewallEnabled, rateLimitEnabled, correctBlocks, attackActive, startTime, earnStar]);

    const browserConfig = {
        availableSites: [
            {
                url: 'https://company-website.com',
                title: t.browser.company.title,
                icon: '🏢',
                content: attackActive ? (
                    // Sito down durante l'attacco
                    <div className="p-6 bg-red-50 h-full flex flex-col items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h1 className="text-4xl font-bold text-red-600 mb-4">{t.browser.company.errorTitle}</h1>
                            <h2 className="text-xl font-semibold text-red-800 mb-2">{t.browser.company.errorDesc}</h2>
                            <p className="text-gray-700 mb-4">{t.browser.company.errorDesc}</p>
                            <div className="bg-red-100 border border-red-300 rounded p-4 mt-4">
                                <p className="text-sm text-red-800 font-mono">
                                    {t.browser.company.errorDetails.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
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
                                <h1 className="text-3xl font-bold text-blue-900">{t.browser.company.title}</h1>
                                <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    {t.browser.company.online}
                                </div>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h2 className="font-semibold text-lg mb-2">{t.browser.company.restoredTitle}</h2>
                                <p className="text-gray-700">{t.browser.company.restoredDesc.split('\n')[0]}</p>
                                <p className="text-gray-700 mt-2">{t.browser.company.restoredDesc.split('\n')[1]}</p>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'https://owasp.org/www-community/attacks/Denial_of_Service',
                title: t.browser.owasp.title,
                icon: '📚',
                content: (
                    <div className="p-6 bg-gray-900 h-full text-white overflow-y-auto">
                        <div className="max-w-2xl mx-auto">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-4xl">🛡️</div>
                                <h1 className="text-2xl font-bold">{t.browser.owasp.title.split(' - ')[1]}</h1>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div className="bg-blue-900/30 border-l-4 border-blue-500 p-3">
                                    <h3 className="font-semibold text-lg mb-2">{t.browser.owasp.introTitle}</h3>
                                    <p className="text-gray-300">
                                        {t.browser.owasp.introText}
                                    </p>
                                </div>
                                <div className="bg-red-900/30 border-l-4 border-red-500 p-3">
                                    <h3 className="font-semibold mb-2">{t.browser.owasp.indicatorsTitle}</h3>
                                    <ul className="list-disc ml-4 space-y-1 text-gray-300">
                                        {t.browser.owasp.indicatorsList.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-green-900/30 border-l-4 border-green-500 p-3">
                                    <h3 className="font-semibold mb-2">{t.browser.owasp.mitigationTitle}</h3>
                                    <ul className="list-disc ml-4 space-y-1 text-gray-300">
                                        {t.browser.owasp.mitigationList.map((item, i) => (
                                            <li key={i.toString() + item.substring(0, 5)} dangerouslySetInnerHTML={{ __html: item.replace(':', ':</strong>').replace(/^/, '<strong>') }} />
                                        ))}
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
            t.terminal.header,
            `$ ${t.terminal.help.split('\n')[0].replace('Usage', 'Type "help"')}`, // Simplified for initial history
            `$ ⚠️  WARNING: High traffic detected on web server!`,
        ],
        commands: {
            'block': (args) => {
                if (!args[0]) {
                    return t.terminal.help;
                }

                const ip = args[0];

                // IP già bloccato
                if (blockedIPs.includes(ip)) {
                    return t.terminal.alreadyBlocked.replace('IP', `IP ${ip}`);
                }

                // Blocca l'IP
                setBlockedIPs(prev => [...prev, ip]);

                // Verifica se è un IP malevolo o legittimo
                if (MALICIOUS_IPS.includes(ip)) {
                    setCorrectBlocks(prev => prev + 1);
                    return t.terminal.maliciousBlocked.replace('IP', `IP ${ip}`);
                } else if (LEGITIMATE_IPS.includes(ip)) {
                    setFalsePositives(prev => prev + 1);
                    return t.terminal.legitimateBlocked.replace('User', `User ${ip}`);
                } else {
                    return t.terminal.ipBlocked.replace('IP', `IP ${ip}`);
                }
            },

            'enable-firewall': () => {
                if (firewallEnabled) {
                    return t.terminal.firewallAlready;
                }
                setFirewallEnabled(true);
                earnStar();
                return t.terminal.firewallEnabled;
            },

            'rate-limit': () => {
                if (rateLimitEnabled) {
                    return t.terminal.rateLimitAlready;
                }
                setRateLimitEnabled(true);
                earnStar();
                return t.terminal.rateLimitEnabled;
            },

            'status': () => {
                return `${t.terminal.status.header}
${t.terminal.status.header.replace('=== ', '').replace(' ===', '')}: ${attackActive ? t.terminal.status.attackActive : t.terminal.status.attackMitigated}
${t.terminal.status.traffic}: ${trafficLevel}%
${t.terminal.status.firewall}: ${firewallEnabled ? t.terminal.status.enabled : t.terminal.status.disabled}
${t.terminal.status.rateLimit}: ${rateLimitEnabled ? t.terminal.status.enabled : t.terminal.status.disabled}
${t.terminal.status.blocked}: ${blockedIPs.length}
${t.terminal.status.correct}: ${correctBlocks}
${t.terminal.status.falsePos}: ${falsePositives}`;
            },

            'analyze': () => {
                if (!analyzeUsed) {
                    setAnalyzeUsed(true);
                    // earnStar(); // Rimosso: la stella viene assegnata al completamento
                }
                return `${t.terminal.analyze.header}
${t.terminal.analyze.requests}
${t.terminal.analyze.protocol}
${t.terminal.analyze.pattern}
${t.terminal.analyze.sources.replace('sources', `${MALICIOUS_IPS.length} sources`)}
${t.terminal.analyze.rec}`;
            },

            'list-ips': () => {
                return `${t.terminal.listIps.header}
${t.terminal.listIps.highVolume}
- 203.0.113.42 (500 req/s) 🔴
- 203.0.113.87 (480 req/s) 🔴
- 198.51.100.15 (450 req/s) 🔴
- 198.51.100.99 (520 req/s) 🔴
- 192.0.2.200 (400 req/s) 🔴

${t.terminal.listIps.normalUsers}
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

        switch (currentStep) {
            case 0:
                return t.hints.step0;
            case 1:
            case 2:
            case 3: {
                const hints = [
                    t.hints.step1,
                    t.hints.step2,
                    t.hints.step3
                ];
                return hints[Math.min(hintIndex, hints.length - 1)];
            }
            default:
                return t.hints.default;
        }
    };

    // Avanzamento step basato sul tempo (ogni 25 secondi)
    useEffect(() => {
        if (completed || missionEnd) return;

        const stepTimer = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < 3) return prev + 1;
                return prev;
            });
        }, 25000); // 25 secondi

        return () => clearInterval(stepTimer);
    }, [completed, missionEnd]);

    // === STATISTICHE FINALI ===
    const additionalStats = [
        {
            label: t.debrief.stats.mitigated,
            value: `${95 - trafficLevel}%`,
            color: trafficLevel < 40 ? 'text-cyber-green' : 'text-yellow-400'
        },
        {
            label: t.debrief.stats.blocked,
            value: `${correctBlocks}/${MALICIOUS_IPS.length}`,
            color: correctBlocks >= 4 ? 'text-cyber-green' : 'text-yellow-400'
        },
        {
            label: t.debrief.stats.falsePositives,
            value: falsePositives,
            color: falsePositives === 0 ? 'text-cyber-green' : 'text-red-500'
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
                        setMissionEnd(true);
                        setMissionSuccess(false);
                        setCompleted(true);
                    }}
                />
                {/* TIMER */}
                <div className="absolute top-[22%] left-[16.5%] z-[100] pointer-events-none transform scale-90">
                    <Timer secondsRemaining={secondsRemaining} />
                </div>
                {/* Schermata di fine livello: successo o sconfitta */}
                {missionEnd && (
                    <MissionDebriefWrapper
                        success={missionSuccess}
                        levelId="level2"
                        stats={{ stars }}
                        maxStars={3}
                        recapText={missionSuccess
                            ? `${t.debrief.success.title}\n\n` +
                            `${t.debrief.success.message}\n\n` +
                            `${t.debrief.success.techniquesTitle}\n` +
                            t.debrief.success.techniques.map(tech => `• ${tech}`).join('\n') + '\n\n' +
                            `${t.debrief.success.conclusion}`
                            : `${t.debrief.failure.message}`.replace('IPs: ', `IPs: ${blockedIPs.length}/${MALICIOUS_IPS.length}`)
                        }
                        onRetry={() => {
                            // Reset stato livello
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
                            setMissionEnd(false);
                            window.location.reload(); // Reload per resettare anche timer e salute
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