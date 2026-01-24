import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import LevelCompleted from '../components/LevelCompleted';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

/**
 * TUTORIAL LEVEL: INTRODUZIONE AL SOC (Security Operations Center)
 * 
 * Scenario educativo:
 * - Il giocatore è un nuovo analista SOC nel suo primo giorno
 * - Deve familiarizzare con i tool principali: Browser, Terminal, SIEM
 * - Un semplice attacco simulato verrà presentato per imparare il workflow base
 * - Il giocatore impara passo-passo come identificare e mitigare una minaccia
 * 
 * Obiettivi didattici:
 * - Imparare a navigare nel Browser per cercare informazioni
 * - Capire come usare i comandi Terminal
 * - Leggere e interpretare i log del SIEM
 * - Completare un'azione di sicurezza base (bloccare un IP)
 */

// Log SIEM tutorial - semplici e guidati
const generateTutorialLogs = (threatBlocked) => [
    {
        id: 1,
        time: '10:00:12',
        severity: 'low',
        source: '192.168.1.100',
        type: 'INFO',
        message: 'User login successful - Normal activity',
        threat: false
    },
    {
        id: 2,
        time: '10:05:33',
        severity: 'low',
        source: '192.168.1.105',
        type: 'INFO',
        message: 'File uploaded to server - Document approved',
        threat: false
    },
    {
        id: 3,
        time: '10:10:45',
        severity: threatBlocked ? 'medium' : 'critical',
        source: '203.0.113.42',
        type: threatBlocked ? 'WARNING' : 'ALERT',
        message: threatBlocked
            ? 'Suspicious IP blocked - SQL Injection attempt prevented'
            : 'CRITICAL: SQL Injection attempt from external source - Pattern: \' OR 1=1 --',
        threat: !threatBlocked
    },
    {
        id: 4,
        time: '10:12:18',
        severity: 'low',
        source: '192.168.1.102',
        type: 'INFO',
        message: 'Database query executed - Response time: 45ms',
        threat: false
    }
];

const LevelTutorial = () => {
    const navigate = useNavigate();
    const { stars, earnStar } = useReputation('tutorial', 0);
    const [showHint, setShowHint] = useState(true);
    const { language } = useLanguage();
    const t = translations[language].tutorial;
    
    const [currentStep, setCurrentStep] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [startTime] = useState(Date.now());
    const [completionTime, setCompletionTime] = useState(0);
    const [threatBlocked, setThreatBlocked] = useState(false);
    const [emailRead, setEmailRead] = useState(false);
    const [siemLogClicked, setSiemLogClicked] = useState(false);
    const [browserVisited, setBrowserVisited] = useState(false);
    const [commandUsed, setCommandUsed] = useState(false);
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
    
    // === CONFIGURAZIONE EMAIL ===
    const emailConfig = {
        emails: [
            {
                id: 1,
                from: 'security-team@company.com',
                timestamp: 'Oggi 10:00',
                subject: 'Benvenuto nel SOC Team!',
                preview: 'Benvenuto nel team! Ecco una guida introduttiva...',
                isPhishing: false,
                body: 'Benvenuto nel Security Operations Center!\n\nCome nuovo analista SOC, il tuo ruolo è fondamentale per proteggere l\'azienda dalle minacce cyber.\n\nStrumenti a tua disposizione:\n- Email Client: Ricevi alert e comunicazioni\n- Browser: Cerca informazioni su minacce\n- Terminal: Esegui comandi di sicurezza\n- SIEM Dashboard: Monitora i log in tempo reale\n\nBuon lavoro!\n\nSOC Team Lead',
                hasAttachment: false,
                read: false,
                flagged: null
            },
            {
                id: 2,
                from: 'siem-alerts@company.com',
                timestamp: 'Oggi 10:11',
                subject: '🚨 ALERT: Suspicious Activity Detected',
                preview: 'SQL Injection attempt from 203.0.113.42...',
                isPhishing: false,
                body: '⚠️ SECURITY ALERT\n\nTipo: SQL Injection Attempt\nIP Sorgente: 203.0.113.42\nTarget: Database Server\nSeverità: CRITICAL\n\nDettagli:\nÈ stato rilevato un tentativo di SQL Injection proveniente dall\'IP 203.0.113.42. Il pattern di attacco corrisponde a una classica query malevola (OR 1=1).\n\nAzioni raccomandate:\n1. Verifica i log nel SIEM Dashboard\n2. Analizza l\'IP nel Browser (threat intel)\n3. Blocca l\'IP usando il Terminal\n\nTempo di risposta raccomandato: IMMEDIATO',
                hasAttachment: false,
                read: false,
                flagged: null,
                explanation: 'Questa è un\'email di alert automatica dal sistema SIEM. Quando ricevi alert di sicurezza, devi agire rapidamente per proteggere i sistemi.'
            }
        ],
        showFeedbackPopup: false,
        onEmailRead: (email) => {
            if (!emailRead && email.id === 2 && currentStep === 0) {
                setEmailRead(true);
                setCurrentStep(1);
                earnStar();
            }
        }
    };

    // === CONFIGURAZIONE BROWSER ===
    const browserConfig = {
        availableSites: [
            {
                url: 'https://company-wiki.internal/soc-guide',
                title: 'SOC Operations Guide',
                icon: '📚',
                content: (
                    <div className="p-6 bg-blue-50 h-full overflow-y-auto">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">📚 Welcome to the SOC!</h1>
                            
                            <div className="bg-white rounded-lg shadow p-4 mb-4">
                                <h2 className="text-lg font-semibold mb-2 text-blue-900">Your Mission</h2>
                                <p className="text-sm text-gray-700">
                                    As a Security Operations Center (SOC) analyst, your job is to monitor, detect, and respond to security threats in real-time.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg shadow p-4 mb-4">
                                <h2 className="text-lg font-semibold mb-2 text-blue-900">🛠️ Available Tools</h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-start gap-2">
                                        <span className="text-xl">📧</span>
                                        <div>
                                            <p className="font-semibold">Email Client</p>
                                            <p className="text-gray-600">Receive security alerts and team communications</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-xl">📊</span>
                                        <div>
                                            <p className="font-semibold">SIEM Dashboard</p>
                                            <p className="text-gray-600">Monitor security logs in real-time - Click on logs to analyze them!</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-xl">🌐</span>
                                        <div>
                                            <p className="font-semibold">Browser</p>
                                            <p className="text-gray-600">Search for threat intelligence and security documentation</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-xl">💻</span>
                                        <div>
                                            <p className="font-semibold">Terminal</p>
                                            <p className="text-gray-600">Execute commands to investigate and block threats</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                <p className="text-sm font-semibold text-yellow-800 mb-1">💡 Workflow Tip</p>
                                <p className="text-sm text-yellow-700">
                                    1. Check Email for alerts<br/>
                                    2. Analyze SIEM logs (click on them!)<br/>
                                    3. Research threats in Browser<br/>
                                    4. Take action with Terminal
                                </p>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'https://threat-intel.internal/sql-injection',
                title: 'SQL Injection Info',
                icon: '🔍',
                content: (
                    <div className="p-6 bg-gray-900 text-white h-full overflow-y-auto">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-2xl font-bold mb-4">🔍 SQL Injection Attacks</h1>
                            
                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                <h2 className="text-lg font-semibold mb-2 text-red-400">What is it?</h2>
                                <p className="text-sm text-gray-300">
                                    SQL Injection is a code injection technique that exploits vulnerabilities in an application's database layer. 
                                    Attackers insert malicious SQL code into input fields to manipulate database queries.
                                </p>
                            </div>

                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                <h2 className="text-lg font-semibold mb-2 text-yellow-400">Common Patterns</h2>
                                <div className="font-mono text-xs bg-black p-3 rounded">
                                    <p className="text-red-400">' OR 1=1 --</p>
                                    <p className="text-red-400">' UNION SELECT * FROM users --</p>
                                    <p className="text-red-400">admin'--</p>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg p-4">
                                <h2 className="text-lg font-semibold mb-2 text-green-400">How to Block</h2>
                                <p className="text-sm text-gray-300 mb-2">
                                    Use the Terminal command: <code className="bg-black px-2 py-1 rounded text-green-400">block-ip &lt;address&gt;</code>
                                </p>
                                <p className="text-xs text-gray-400">
                                    This will add the malicious IP to the firewall blocklist.
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        ],
        onNavigate: (url) => {
            if (!browserVisited && currentStep === 2) {
                setBrowserVisited(true);
                setCurrentStep(3);
                earnStar();
            }
        }
    };

    // === CONFIGURAZIONE TERMINAL ===
    const terminalConfig = {
        initialHistory: [
            '$ SOC Analyst Workstation v1.0',
            '$ Type "help" for available commands',
            '$ Welcome to your first day! Let\'s learn the basics.',
        ],
        commands: {
            'show-logs': () => {
                const logs = generateTutorialLogs(threatBlocked);
                const threatLog = logs.find(log => log.threat);
                
                if (!commandUsed && currentStep === 3) {
                    setCommandUsed(true);
                    setCurrentStep(4);
                }
                
                return `=== RECENT SECURITY LOGS ===
${logs.map(log => `[${log.time}] ${log.severity.toUpperCase()} - ${log.source}\n${log.message}`).join('\n\n')}

${threatLog ? '\n⚠️ ALERT: Suspicious activity detected from IP: 203.0.113.42' : '✓ All threats mitigated'}`;
            },

            'block-ip': (args) => {
                const ip = args[0];
                if (!ip) {
                    return 'Usage: block-ip <ip-address>\nExample: block-ip 203.0.113.42';
                }
                
                if (ip === '203.0.113.42') {
                    if (threatBlocked) {
                        return '[!] IP 203.0.113.42 is already blocked';
                    }
                    
                    setThreatBlocked(true);
                    setCurrentStep(5);
                    earnStar();
                    setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
                    
                    setTimeout(() => {
                        setCompleted(true);
                    }, 1500);
                    
                    return `[✓] IP address 203.0.113.42 blocked successfully
[✓] Firewall rule added
[✓] SQL Injection threat neutralized
[+] Network secured!`;
                }
                
                return `[!] IP ${ip} not found in threat list. Check 'show-logs' for suspicious IPs.`;
            },

            'status': () => {
                return `=== SECURITY STATUS ===
Threats Detected: ${threatBlocked ? 0 : 1}
Blocked IPs: ${threatBlocked ? 1 : 0}
Network Status: ${threatBlocked ? '🟢 SECURE' : '🔴 VULNERABLE'}

${threatBlocked ? '✓ All systems operational' : '⚠️ Action required: Block malicious IP'}`;
            }
        },
        prompt: 'soc-analyst@tutorial:~$',
        helpCommand: true
    };

    // === CONFIGURAZIONE SIEM ===
    const siemConfig = {
        logs: generateTutorialLogs(threatBlocked),
        blockedIPs: threatBlocked ? 1 : 0,
        currentStep: currentStep,
        trafficHistory: [
            { time: '10:00', value: 15 },
            { time: '10:05', value: 18 },
            { time: '10:10', value: threatBlocked ? 20 : 35 },
            { time: '10:15', value: threatBlocked ? 17 : 38 }
        ],
        networkTraffic: { 
            incoming: threatBlocked ? 180 : 280, 
            outgoing: threatBlocked ? 150 : 220 
        },
        protocols: { 
            http: threatBlocked ? 250 : 380,
            https: 120, 
            ssh: 30, 
            ftp: 0 
        },
        selectedLog: null,
        onLogClick: (log) => {
            console.log('Log clicked:', log);
            if (!siemLogClicked && log.threat && currentStep === 1) {
                setSiemLogClicked(true);
                setCurrentStep(2);
            }
        }
    };

    // === HINT PROGRESSIVI ===
    const getHintText = () => {
        switch(currentStep) {
            case 0:
                return 'Inizia controllando le Email! Clicca sull\'icona Email e leggi l\'alert di sicurezza. È da lì che parte tutto!';
            case 1:
                return 'Ottimo! Ora guarda il SIEM Dashboard (pannello in basso). CLICCA sul log rosso CRITICAL per analizzarlo in dettaglio!';
            case 2:
                return 'Perfetto! Ora usa il Browser per cercare info. Visita "SQL Injection Info" per capire come funziona questo attacco.';
            case 3:
                return 'Bene! Apri il Terminal e digita "show-logs" per vedere tutti i log. Troverai l\'IP sospetto!';
            case 4: {
                const hints = [
                    'Hai trovato l\'IP malevolo (203.0.113.42)! Usa il Terminal per bloccarlo.',
                    'Ricorda il comando: "block-ip 203.0.113.42" - questo aggiungerà l\'IP alla lista nera del firewall.',
                    'Una volta bloccato, il sistema sarà completamente protetto e avrai completato il tutorial!'
                ];
                return hints[Math.min(hintIndex, hints.length - 1)];
            }
            default:
                return 'Ottimo lavoro! Hai imparato il workflow completo del SOC. Sei pronto per le missioni vere!';
        }
    };

    return (
        <>

            <LevelTemplate 
                stars={stars}
                hint={showHint && visibleHint ? <InfoPanel text={visibleHint} /> : null}
                browserConfig={browserConfig}
                terminalConfig={terminalConfig}
                siemConfig={siemConfig}
                emailConfig={emailConfig}
            >                
                {completed && (
                    <LevelCompleted
                        stars={stars}
                        maxStars={3}
                        completionTime={completionTime}
                        levelTitle="Tutorial - SOC Basics"
                        additionalStats={[
                            {
                                label: 'Email lette',
                                value: emailRead ? 'SÌ' : 'NO',
                                color: emailRead ? 'text-cyber-green' : 'text-yellow-400'
                            },
                            {
                                label: 'SIEM log analizzati',
                                value: siemLogClicked ? 'SÌ' : 'NO',
                                color: siemLogClicked ? 'text-cyber-green' : 'text-yellow-400'
                            },
                            {
                                label: 'Browser esplorato',
                                value: browserVisited ? 'SÌ' : 'NO',
                                color: browserVisited ? 'text-cyber-green' : 'text-yellow-400'
                            },
                            {
                                label: 'Comandi terminal usati',
                                value: commandUsed ? 'SÌ' : 'NO',
                                color: commandUsed ? 'text-cyber-green' : 'text-yellow-400'
                            },
                            {
                                label: 'Minaccia bloccata',
                                value: threatBlocked ? 'SÌ' : 'NO',
                                color: threatBlocked ? 'text-cyber-green' : 'text-red-500'
                            }
                        ]}
                    />
                )}
            </LevelTemplate>
        </>
    );
};

export default LevelTutorial;
