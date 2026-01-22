import React, { useState, useEffect } from 'react';
import LevelTemplate from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import LevelCompleted from '../components/LevelCompleted';

/**
 * LEVEL 3: SQL INJECTION DEFENSE
 * 
 * Scenario educativo:
 * - Il giocatore è un application security analyst
 * - Un'applicazione web ha un endpoint vulnerabile a SQL Injection
 * - Il giocatore deve riconoscere l'attacco, analizzare i log e mettere in sicurezza
 * 
 * Obiettivi didattici:
 * - Comprendere cos'è una SQL Injection e come si manifesta
 * - Riconoscere pattern di attacco nei log (es: ' OR 1=1 --)
 * - Imparare tecniche di mitigazione (prepared statements, sanitization, WAF)
 * - Distinguere tra traffico legittimo e malevolo
 * 
 * Sistema stelle (NON obbligatorio):
 * ⭐ 1 stella: Completare il livello (mitigazione base)
 * ⭐ 2 stella: Mitigare senza bloccare traffico legittimo
 * ⭐ 3 stelle: Analisi completa + protezioni multiple
 */

// Endpoint dell'applicazione simulata
const ENDPOINTS = {
    login: { name: '/login', vulnerable: true, fixed: false },
    search: { name: '/search', vulnerable: false, fixed: false },
    profile: { name: '/profile', vulnerable: false, fixed: false }
};

// Database simulato (JSON)
const SIMULATED_DB = {
    users: [
        { id: 1, username: 'admin', email: 'admin@company.com', role: 'administrator' },
        { id: 2, username: 'john.doe', email: 'john@company.com', role: 'user' },
        { id: 3, username: 'jane.smith', email: 'jane@company.com', role: 'user' }
    ],
    orders: [
        { id: 101, user_id: 1, product: 'Enterprise License', amount: 5000 },
        { id: 102, user_id: 2, product: 'Standard License', amount: 500 },
        { id: 103, user_id: 3, product: 'Basic License', amount: 100 }
    ]
};

// Log SIEM che mostrano l'attacco SQL Injection
const generateSQLiLogs = (attackActive, dataExposed) => [
    {
        id: 1,
        time: '15:42:15',
        severity: 'low',
        source: '192.168.1.100',
        type: 'INFO',
        message: 'User login attempt - username: john.doe',
        threat: false
    },
    {
        id: 2,
        time: '15:43:22',
        severity: 'medium',
        source: '203.0.113.55',
        type: 'WARNING',
        message: 'Suspicious input detected - username: admin\' OR \'1\'=\'1',
        threat: true
    },
    {
        id: 3,
        time: '15:43:25',
        severity: attackActive ? 'high' : 'low',
        source: '203.0.113.55',
        type: attackActive ? 'ERROR' : 'INFO',
        message: attackActive 
            ? 'SQL syntax error near \' OR \'1\'=\'1\' -- Query failed'
            : 'Input sanitized - Potential SQLi blocked by WAF',
        threat: attackActive
    },
    {
        id: 4,
        time: '15:43:28',
        severity: dataExposed ? 'critical' : 'low',
        source: '203.0.113.55',
        type: dataExposed ? 'ALERT' : 'INFO',
        message: dataExposed
            ? 'CRITICAL: Unauthorized data access - Full users table exposed via UNION SELECT'
            : 'Query executed safely - No data exposure',
        threat: dataExposed
    },
    {
        id: 5,
        time: '15:44:10',
        severity: 'low',
        source: '192.168.1.105',
        type: 'INFO',
        message: 'Normal search query - keyword: laptop',
        threat: false
    },
    {
        id: 6,
        time: '15:44:35',
        severity: attackActive ? 'high' : 'low',
        source: '203.0.113.55',
        type: attackActive ? 'SECURITY' : 'INFO',
        message: attackActive
            ? 'SQL Injection attempt detected - payload: \' UNION SELECT * FROM users --'
            : 'Prepared statement protection active - Query parameterized',
        threat: attackActive
    },
    {
        id: 7,
        time: '15:45:02',
        severity: 'low',
        source: '192.168.1.100',
        type: 'INFO',
        message: 'Legitimate user activity - profile page accessed',
        threat: false
    },
    {
        id: 8,
        time: '15:45:18',
        severity: attackActive ? 'critical' : 'low',
        source: '203.0.113.55',
        type: attackActive ? 'ALERT' : 'INFO',
        message: attackActive
            ? 'Multiple SQLi attempts from same source - Attack pattern confirmed'
            : 'All queries secure - Application hardened successfully',
        threat: attackActive
    }
];

const Level3 = () => {
    // Sistema di reputazione (stelle)
    const { stars } = useReputation('level3', 0);
    const { earnStar } = useReputation('level3', 0);

    // === STATO DEL LIVELLO ===
    const [attackActive, setAttackActive] = useState(true); // SQL Injection attiva
    const [dataExposed, setDataExposed] = useState(true); // Dati esposti
    const [vulnerableEndpoint, setVulnerableEndpoint] = useState('/login'); // Endpoint vulnerabile
    const [protectionsEnabled, setProtectionsEnabled] = useState({
        preparedStatements: false,
        inputSanitization: false,
        wafRules: false
    });
    const [endpointFixed, setEndpointFixed] = useState(false); // Endpoint messo in sicurezza
    const [dbStatus, setDbStatus] = useState('EXPOSED'); // EXPOSED, VULNERABLE, SECURE
    const [legitimateBlocked, setLegitimateBlocked] = useState(false); // Traffico legittimo bloccato
    const [sqlInjectionType, setSqlInjectionType] = useState(''); // Tipo identificato
    
    // UI State
    const [completed, setCompleted] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [startTime] = useState(Date.now());
    const [completionTime, setCompletionTime] = useState(0);
    const [appRestarted, setAppRestarted] = useState(false);

    // === LOGICA DI MITIGAZIONE ===
    // Quando il giocatore attiva protezioni, l'attacco viene bloccato
    useEffect(() => {
        // Prepared statements proteggono completamente da SQLi
        if (protectionsEnabled.preparedStatements) {
            setAttackActive(false);
            setDataExposed(false);
            setDbStatus('SECURE');
        }
        // Input sanitization + WAF riducono il rischio
        else if (protectionsEnabled.inputSanitization && protectionsEnabled.wafRules) {
            setAttackActive(false);
            setDataExposed(false);
            setDbStatus('SECURE');
        }
        // Solo input sanitization: vulnerabile ma ridotto
        else if (protectionsEnabled.inputSanitization) {
            setDataExposed(false);
            setDbStatus('VULNERABLE');
        }
        // Solo WAF: filtra alcuni attacchi ma non tutti
        else if (protectionsEnabled.wafRules) {
            setDataExposed(false);
            setDbStatus('VULNERABLE');
        }
    }, [protectionsEnabled]);

    // === CONDIZIONE DI COMPLETAMENTO ===
    useEffect(() => {
        // Livello completato quando l'attacco è mitigato
        if (!attackActive && !dataExposed && appRestarted && !completed) {
            // Stella 1: completamento base
            if (stars === 0) {
                earnStar();
            }
            
            // Stella 2: nessun falso positivo
            if (!legitimateBlocked && stars === 1) {
                earnStar();
            }
            
            // Stella 3: analisi completa + protezioni multiple
            const multipleProtections = Object.values(protectionsEnabled).filter(Boolean).length >= 2;
            if (multipleProtections && sqlInjectionType && stars === 2) {
                earnStar();
            }
            
            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
            setTimeout(() => {
                setCompleted(true);
            }, 2000);
        }
    }, [attackActive, dataExposed, appRestarted, completed, legitimateBlocked, protectionsEnabled, sqlInjectionType, stars, earnStar, startTime]);

    // === CONFIGURAZIONE BROWSER ===
    const browserConfig = {
        availableSites: [
            {
                url: 'http://localhost:3000/login',
                title: 'App Login',
                icon: '🔐',
                content: attackActive ? (
                    // Login vulnerabile durante attacco
                    <div className="p-6 bg-red-50 h-full">
                        <div className="max-w-md mx-auto">
                            <h1 className="text-2xl font-bold text-gray-800 mb-6">🔐 Company Portal Login</h1>
                            <div className="bg-white rounded-lg shadow p-6 mb-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Username</label>
                                    <input 
                                        type="text" 
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        placeholder="admin' OR '1'='1"
                                        disabled
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Password</label>
                                    <input 
                                        type="password" 
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="bg-red-100 border-l-4 border-red-500 p-4">
                                <p className="text-sm font-mono text-red-800">
                                    <strong>ERROR:</strong> SQL syntax error<br/>
                                    Query: SELECT * FROM users WHERE username='admin' OR '1'='1' AND password='...'<br/>
                                    <span className="text-red-600 font-bold">⚠️ SQL INJECTION DETECTED</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Login sicuro dopo mitigazione
                    <div className="p-6 bg-green-50 h-full">
                        <div className="max-w-md mx-auto">
                            <h1 className="text-2xl font-bold text-gray-800 mb-6">🔐 Company Portal Login</h1>
                            <div className="bg-white rounded-lg shadow p-6 mb-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Username</label>
                                    <input 
                                        type="text" 
                                        className="w-full border border-green-300 rounded px-3 py-2"
                                        placeholder="Enter username"
                                        disabled
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Password</label>
                                    <input 
                                        type="password" 
                                        className="w-full border border-green-300 rounded px-3 py-2"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="bg-green-100 border-l-4 border-green-500 p-4">
                                <p className="text-sm text-green-800">
                                    ✅ <strong>SECURE:</strong> Input validation active<br/>
                                    ✅ Prepared statements enabled<br/>
                                    ✅ SQL Injection protection ON
                                </p>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'http://localhost:3000/db',
                title: 'Database Status',
                icon: '💾',
                content: (
                    <div className="p-6 bg-gray-900 text-white h-full overflow-y-auto">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold">💾 Database Diagnostics</h1>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                                    dbStatus === 'SECURE' ? 'bg-green-500' :
                                    dbStatus === 'VULNERABLE' ? 'bg-yellow-500' :
                                    'bg-red-500 animate-pulse'
                                }`}>
                                    {dbStatus}
                                </div>
                            </div>
                            
                            {/* Tabella Users */}
                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                <h2 className="font-semibold mb-3 flex items-center gap-2">
                                    <span>👤</span> Table: USERS
                                    {dataExposed && <span className="text-red-400 text-sm animate-pulse">(EXPOSED)</span>}
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="border-b border-gray-600">
                                            <tr>
                                                <th className="text-left py-2">ID</th>
                                                <th className="text-left py-2">Username</th>
                                                <th className="text-left py-2">Email</th>
                                                <th className="text-left py-2">Role</th>
                                            </tr>
                                        </thead>
                                        <tbody className={dataExposed ? 'text-red-300' : 'text-gray-400'}>
                                            {SIMULATED_DB.users.map(user => (
                                                <tr key={user.id} className="border-b border-gray-700">
                                                    <td className="py-2">{user.id}</td>
                                                    <td className="py-2">{user.username}</td>
                                                    <td className="py-2">{user.email}</td>
                                                    <td className="py-2">{user.role}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Query Log */}
                            <div className="bg-gray-800 rounded-lg p-4">
                                <h2 className="font-semibold mb-3">📝 Recent Queries</h2>
                                <div className="space-y-2 text-xs font-mono">
                                    <div className={attackActive ? 'text-red-400' : 'text-green-400'}>
                                        {attackActive ? (
                                            <>
                                                <div>⚠️ SELECT * FROM users WHERE username='admin' OR '1'='1' --</div>
                                                <div className="text-red-300 ml-4">→ Returned ALL users (SQL Injection)</div>
                                            </>
                                        ) : (
                                            <>
                                                <div>✓ SELECT * FROM users WHERE username=? AND password=?</div>
                                                <div className="text-green-300 ml-4">→ Parameterized query (SAFE)</div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'https://owasp.org/www-community/attacks/SQL_Injection',
                title: 'OWASP - SQL Injection',
                icon: '📚',
                content: (
                    <div className="p-6 bg-gray-900 text-white h-full overflow-y-auto">
                        <div className="max-w-2xl mx-auto">
                            <h1 className="text-2xl font-bold mb-4">🛡️ SQL Injection - OWASP Guide</h1>
                            <div className="space-y-4 text-sm">
                                <div className="bg-blue-900/30 border-l-4 border-blue-500 p-3">
                                    <h3 className="font-semibold mb-2">🎯 Cos'è SQL Injection?</h3>
                                    <p className="text-gray-300">
                                        Inserimento di codice SQL malevolo in campi di input per manipolare 
                                        o estrarre dati dal database. Uno degli attacchi più pericolosi.
                                    </p>
                                </div>
                                <div className="bg-red-900/30 border-l-4 border-red-500 p-3">
                                    <h3 className="font-semibold mb-2">⚠️ Tipi comuni:</h3>
                                    <ul className="list-disc ml-4 space-y-1 text-gray-300">
                                        <li><strong>Tautology:</strong> ' OR '1'='1 (sempre vero)</li>
                                        <li><strong>UNION-based:</strong> UNION SELECT * FROM users</li>
                                        <li><strong>Blind SQLi:</strong> Inferire dati da risposte</li>
                                        <li><strong>Time-based:</strong> SLEEP(5) per test</li>
                                    </ul>
                                </div>
                                <div className="bg-green-900/30 border-l-4 border-green-500 p-3">
                                    <h3 className="font-semibold mb-2">✅ Prevenzione:</h3>
                                    <ul className="list-disc ml-4 space-y-1 text-gray-300">
                                        <li><strong>Prepared Statements:</strong> Query parametrizzate</li>
                                        <li><strong>Input Sanitization:</strong> Validare e filtrare input</li>
                                        <li><strong>WAF:</strong> Web Application Firewall</li>
                                        <li><strong>Least Privilege:</strong> Permessi DB minimi</li>
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
            '$ Application Security Terminal v3.0',
            '$ Type "help" for available commands',
            '$ ⚠️  WARNING: SQL errors detected in application logs!',
        ],
        commands: {
            'show-endpoints': () => {
                return `=== APPLICATION ENDPOINTS ===
/login      [${ENDPOINTS.login.vulnerable ? '🔴 VULNERABLE' : '🟢 SECURE'}]
/search     [🟢 SECURE]
/profile    [🟢 SECURE]

Vulnerable endpoint: ${vulnerableEndpoint}
Status: ${endpointFixed ? 'PATCHED' : 'EXPLOITABLE'}`;
            },

            'inspect': (args) => {
                const endpoint = args[0];
                if (!endpoint) return 'Usage: inspect <endpoint>\nExample: inspect /login';
                
                if (endpoint === '/login') {
                    return `=== ENDPOINT ANALYSIS: /login ===
Method: POST
Parameters: username, password
Current protection: ${protectionsEnabled.preparedStatements ? 'Prepared Statements ✓' : 'String Concatenation ✗'}
Vulnerability: ${attackActive ? 'SQL INJECTION DETECTED' : 'SECURE'}

Sample vulnerable code:
  query = "SELECT * FROM users WHERE username='" + input + "'"
  
Attack vector:
  username: admin' OR '1'='1 --
  → Bypasses authentication!`;
                }
                return `Endpoint ${endpoint} analysis not available`;
            },

            'identify-attack': () => {
                setSqlInjectionType('TAUTOLOGY');
                setCurrentStep(1);
                return `=== SQL INJECTION TYPE ANALYSIS ===
Attack pattern detected: TAUTOLOGY
Payload: ' OR '1'='1
Description: Injects always-true condition
Impact: Authentication bypass, data exposure

✓ Attack type identified successfully!`;
            },

            'enable-prepared-statements': () => {
                if (protectionsEnabled.preparedStatements) {
                    return '[!] Prepared statements are already enabled';
                }
                setProtectionsEnabled(prev => ({ ...prev, preparedStatements: true }));
                setCurrentStep(2);
                return `[✓] Prepared statements enabled
[+] Queries now use parameterized statements
[+] Example: SELECT * FROM users WHERE username=? AND password=?
[+] SQL Injection risk: ELIMINATED`;
            },

            'enable-input-sanitization': () => {
                if (protectionsEnabled.inputSanitization) {
                    return '[!] Input sanitization is already enabled';
                }
                setProtectionsEnabled(prev => ({ ...prev, inputSanitization: true }));
                return `[✓] Input sanitization enabled
[+] Special characters escaped: ' " ; --
[+] SQL Injection risk: REDUCED`;
            },

            'add-waf-rule': (args) => {
                if (args[0] !== 'sql-injection') {
                    return 'Usage: add-waf-rule sql-injection';
                }
                if (protectionsEnabled.wafRules) {
                    return '[!] WAF rules already active';
                }
                setProtectionsEnabled(prev => ({ ...prev, wafRules: true }));
                return `[✓] WAF rule added: SQL Injection detection
[+] Blocking patterns: OR 1=1, UNION SELECT, ' --, etc.
[+] SQL Injection risk: REDUCED`;
            },

            'restart-app': () => {
                if (!protectionsEnabled.preparedStatements && !protectionsEnabled.inputSanitization) {
                    return '[!] No security changes detected. Apply mitigations first.';
                }
                setAppRestarted(true);
                return `[✓] Application restarted
[✓] New security configurations applied
[✓] Database status: ${dbStatus}
${!attackActive ? '[✓] SQL Injection mitigated successfully!' : '[!] System still vulnerable'}`;
            },

            'show-db-status': () => {
                return `=== DATABASE STATUS ===
Status: ${dbStatus}
Data Exposure: ${dataExposed ? '🔴 YES (CRITICAL)' : '🟢 NO'}
Active Protections:
- Prepared Statements: ${protectionsEnabled.preparedStatements ? '✓' : '✗'}
- Input Sanitization: ${protectionsEnabled.inputSanitization ? '✓' : '✗'}
- WAF Rules: ${protectionsEnabled.wafRules ? '✓' : '✗'}`;
            },

            'status': () => {
                return `=== SECURITY STATUS ===
Attack Active: ${attackActive ? '🔴 YES' : '🟢 NO'}
Data Exposed: ${dataExposed ? '🔴 YES' : '🟢 NO'}
Vulnerable Endpoint: ${vulnerableEndpoint}
App Status: ${appRestarted ? 'RESTARTED' : 'RUNNING'}
SQLi Type Identified: ${sqlInjectionType || 'NOT YET'}`;
            }
        },
        prompt: 'appsec@sql-defense:~$',
        helpCommand: true
    };

    // === CONFIGURAZIONE SIEM ===
    const siemConfig = {
        logs: generateSQLiLogs(attackActive, dataExposed),
        blockedIPs: protectionsEnabled.wafRules ? 1 : 0,
        currentStep: currentStep,
        trafficHistory: [
            { time: '15:40', value: 15 },
            { time: '15:41', value: 20 },
            { time: '15:42', value: 25 },
            { time: '15:43', value: attackActive ? 65 : 30 },
            { time: '15:44', value: attackActive ? 75 : 25 },
            { time: '15:45', value: attackActive ? 80 : 20 }
        ],
        networkTraffic: { 
            incoming: attackActive ? 450 : 280, 
            outgoing: attackActive ? 850 : 320 
        },
        protocols: { 
            http: attackActive ? 750 : 400,
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
                return '🔍 STEP 1: Analizza i log SIEM. Vedi input con caratteri strani tipo \' OR? Usa "inspect /login" per dettagli.';
            case 1:
                return '🛡️ STEP 2: Hai identificato il tipo di attacco! Usa "enable-prepared-statements" per la protezione più efficace.';
            case 2:
                return '🔄 STEP 3: Riavvia l\'app con "restart-app" per applicare le modifiche di sicurezza.';
            default:
                return '✅ Controlla lo stato con "status" e verifica il DB nel browser!';
        }
    };

    // === STATISTICHE FINALI ===
    const additionalStats = [
        {
            label: 'Protezioni attivate',
            value: Object.values(protectionsEnabled).filter(Boolean).length,
            color: Object.values(protectionsEnabled).filter(Boolean).length >= 2 ? 'text-cyber-green' : 'text-yellow-400'
        },
        {
            label: 'Data exposure',
            value: dataExposed ? 'SI' : 'NO',
            color: !dataExposed ? 'text-cyber-green' : 'text-red-500'
        },
        {
            label: 'Tipo SQLi identificato',
            value: sqlInjectionType || 'Non identificato',
            color: sqlInjectionType ? 'text-cyber-green' : 'text-yellow-400'
        }
    ];

    return (
        <div>
            {/* Status Bar */}
            <div className="fixed top-18 left-1/2 -translate-x-1/2 z-[15]">
                <div className="text-cyan-400 text-lg font-mono flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-bold">DATABASE:</span>
                        <span className={`text-xl font-bold ${
                            dbStatus === 'SECURE' ? 'text-green-500' :
                            dbStatus === 'VULNERABLE' ? 'text-yellow-500' :
                            'text-red-500 animate-pulse'
                        }`}>
                            {dbStatus}
                        </span>
                    </div>
                    <div className="text-sm">
                        {dataExposed ? (
                            <span className="text-red-500 font-bold animate-pulse">🔓 DATI ESPOSTI</span>
                        ) : attackActive ? (
                            <span className="text-yellow-500 font-bold">⚠️ VULNERABILE</span>
                        ) : (
                            <span className="text-green-500 font-bold">🔒 PROTETTO</span>
                        )}
                    </div>
                </div>
            </div>

            <LevelTemplate 
                stars={stars}
                hint={showHint ? <InfoPanel text={getHintText()} /> : null}
                browserConfig={browserConfig}
                terminalConfig={terminalConfig}
                siemConfig={siemConfig}
            >                
                {completed && (
                    <LevelCompleted
                        stars={stars}
                        maxStars={3}
                        completionTime={completionTime}
                        levelTitle="SQL Injection Defense"
                        additionalStats={additionalStats}
                    />
                )}
            </LevelTemplate>
        </div>
    );
};

export default Level3;
