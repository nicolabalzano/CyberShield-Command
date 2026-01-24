import React, { useState, useEffect } from 'react';
import LevelTemplate, { useLevel as useLevelFromTemplate } from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import { useLevel } from '../contexts/LevelContext';
import InfoPanel from '../components/InfoPanel';
import MissionDebrief from '../components/MissionDebrief';

// Componente interno per monitorare la salute e gestire il game over
const HealthMonitor = ({ completed, onGameOver }) => {
    const { health } = useLevel();
    
    useEffect(() => {
        if (health <= 0 && !completed) {
            onGameOver();
        }
    }, [health, completed, onGameOver]);
    
    return null;
};

/**
 * LEVEL 6: CSRF (CROSS-SITE REQUEST FORGERY) DEFENSE
 * 
 * Scenario educativo:
 * - Il giocatore è un web security specialist dell'azienda
 * - Il portale finanziario aziendale ha vulnerabilità CSRF
 * - Un attaccante esterno sta inducendo dipendenti a eseguire azioni non autorizzate
 * - Il giocatore deve riconoscere l'attacco e proteggere il sistema aziendale
 * 
 * Obiettivi didattici:
 * - Comprendere cos'è un attacco CSRF e come funziona
 * - Riconoscere richieste CSRF malevole nei log
 * - Imparare tecniche di mitigazione (CSRF tokens, SameSite cookies, Origin validation)
 * - Distinguere tra richieste legittime e CSRF
 * 
 * Sistema stelle (NON obbligatorio):
 * ⭐ 1 stella: Completare il livello (mitigazione base)
 * ⭐ 2 stelle: Mitigare senza bloccare operazioni legittime
 * ⭐ 3 stelle: Analisi completa + protezioni multiple (tokens + SameSite)
 */

// Transazioni bancarie simulate
const INITIAL_TRANSACTIONS = [
    {
        id: 1,
        time: '14:20:15',
        user: 'john.doe',
        action: 'View Balance',
        amount: null,
        destination: null,
        csrf: false,
        status: 'completed'
    },
    {
        id: 2,
        time: '14:22:30',
        user: 'john.doe',
        action: 'Transfer Money',
        amount: 5000,
        destination: 'attacker@evil.com',
        csrf: true,
        status: 'pending',
        origin: 'http://evil-site.com'
    },
    {
        id: 3,
        time: '14:25:10',
        user: 'alice.smith',
        action: 'Update Email',
        newEmail: 'hacker@evil.com',
        csrf: true,
        status: 'pending',
        origin: 'http://phishing-site.com'
    },
    {
        id: 4,
        time: '14:28:45',
        user: 'bob.johnson',
        action: 'View Statements',
        amount: null,
        destination: null,
        csrf: false,
        status: 'completed'
    },
    {
        id: 5,
        time: '14:30:20',
        user: 'john.doe',
        action: 'Change Password',
        csrf: true,
        status: 'pending',
        origin: 'http://malicious-domain.com'
    }
];

// Account utente simulato
const USER_ACCOUNT = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    balance: 15000,
    accountNumber: '****1234'
};

// Log SIEM che mostrano l'attacco CSRF
const generateCSRFLogs = (attackActive, tokensEnabled) => [
    {
        id: 1,
        time: '14:20:18',
        severity: 'low',
        source: '192.168.1.100',
        type: 'INFO',
        message: 'User john.doe logged in - Session created',
        threat: false
    },
    {
        id: 2,
        time: '14:22:32',
        severity: attackActive ? 'critical' : 'medium',
        source: '203.0.113.88',
        type: attackActive ? 'ALERT' : 'WARNING',
        message: attackActive 
            ? 'CSRF Attack: Unauthorized transfer request from external origin http://evil-site.com'
            : 'CSRF attempt blocked: Missing or invalid CSRF token',
        threat: attackActive
    },
    {
        id: 3,
        time: '14:22:35',
        severity: attackActive ? 'critical' : 'low',
        source: '203.0.113.88',
        type: attackActive ? 'SECURITY' : 'INFO',
        message: attackActive
            ? 'CRITICAL: Money transfer executed without user consent - $5000 to attacker@evil.com'
            : 'Request rejected: Origin validation failed - Expected: bank.com, Got: evil-site.com',
        threat: attackActive
    },
    {
        id: 4,
        time: '14:25:12',
        severity: attackActive ? 'high' : 'medium',
        source: '198.51.100.44',
        type: attackActive ? 'ALERT' : 'WARNING',
        message: attackActive
            ? 'CSRF: Email change request from suspicious origin - User session hijacked'
            : 'SameSite cookie policy active - Cross-site request blocked',
        threat: attackActive
    },
    {
        id: 5,
        time: '14:28:47',
        severity: 'low',
        source: '192.168.1.105',
        type: 'INFO',
        message: 'Normal user activity - GET request with valid session',
        threat: false
    },
    {
        id: 6,
        time: '14:30:22',
        severity: attackActive ? 'critical' : 'low',
        source: '203.0.113.77',
        type: attackActive ? 'ALERT' : 'INFO',
        message: attackActive
            ? 'Password change executed via CSRF - User credentials compromised'
            : 'CSRF token validation: PASSED - Request authenticated',
        threat: attackActive
    },
    {
        id: 7,
        time: '14:32:15',
        severity: attackActive ? 'high' : 'low',
        source: '203.0.113.88',
        type: attackActive ? 'SECURITY' : 'INFO',
        message: attackActive
            ? 'Multiple CSRF attempts detected - Attack pattern: Forged state-changing requests'
            : 'All state-changing requests validated - CSRF protection active',
        threat: attackActive
    },
    {
        id: 8,
        time: '14:35:00',
        severity: attackActive ? 'critical' : 'low',
        source: '203.0.113.88',
        type: attackActive ? 'ALERT' : 'INFO',
        message: attackActive
            ? 'CSRF attack vector confirmed - Embedded malicious forms on external sites'
            : 'Double-submit cookie pattern enforced - All requests secure',
        threat: attackActive
    }
];

const Level6 = () => {
    // Sistema di reputazione (stelle)
    const { stars } = useReputation('level6', 0);
    const { earnStar } = useReputation('level6', 0);

    // === STATO DEL LIVELLO ===
    const [attackActive, setAttackActive] = useState(true); // CSRF attivo
    const [unauthorizedActions, setUnauthorizedActions] = useState(true); // Azioni non autorizzate eseguite
    const [protectionsEnabled, setProtectionsEnabled] = useState({
        csrfTokens: false,
        sameSiteCookies: false,
        originValidation: false,
        doubleSubmitCookie: false
    });
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
    const [appRestarted, setAppRestarted] = useState(false);
    const [csrfType, setCsrfType] = useState(''); // Tipo identificato
    const [legitimateBlocked, setLegitimateBlocked] = useState(false);
    const [accountBalance, setAccountBalance] = useState(USER_ACCOUNT.balance);
    
    // UI State
    const [completed, setCompleted] = useState(false);
    const [failed, setFailed] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [startTime] = useState(Date.now());
    const [completionTime, setCompletionTime] = useState(0);
    const [hintIndex, setHintIndex] = useState(0);
    const [visibleHint, setVisibleHint] = useState(null);
    const [missionSuccess, setMissionSuccess] = useState(true);

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
    }, [currentStep, hintIndex]);

    // === LOGICA DI MITIGAZIONE ===
    useEffect(() => {
        // CSRF Tokens + SameSite = protezione forte
        if (protectionsEnabled.csrfTokens && protectionsEnabled.sameSiteCookies) {
            setAttackActive(false);
            setUnauthorizedActions(false);
        }
        // CSRF Tokens + Origin Validation = protezione completa
        else if (protectionsEnabled.csrfTokens && protectionsEnabled.originValidation) {
            setAttackActive(false);
            setUnauthorizedActions(false);
        }
        // Solo CSRF tokens: protezione forte ma non completa
        else if (protectionsEnabled.csrfTokens) {
            setUnauthorizedActions(false);
        }
        // Solo SameSite cookies: riduce rischio
        else if (protectionsEnabled.sameSiteCookies) {
            setUnauthorizedActions(false);
        }
        // Double Submit Cookie: protezione media
        else if (protectionsEnabled.doubleSubmitCookie) {
            setUnauthorizedActions(false);
        }
    }, [protectionsEnabled]);

    // Blocca transazioni CSRF quando le protezioni sono attive
    useEffect(() => {
        if (protectionsEnabled.csrfTokens || protectionsEnabled.sameSiteCookies || protectionsEnabled.originValidation) {
            setTransactions(prevTransactions => 
                prevTransactions.map(transaction => {
                    if (transaction.csrf && transaction.status === 'pending') {
                        return {
                            ...transaction,
                            status: 'blocked',
                            blockReason: 'CSRF protection active'
                        };
                    }
                    return transaction;
                })
            );
            // Ripristina il balance se le transazioni CSRF vengono bloccate
            setAccountBalance(USER_ACCOUNT.balance);
        } else {
            // Se nessuna protezione, le transazioni CSRF vanno a buon fine
            setTransactions(prevTransactions => 
                prevTransactions.map(transaction => {
                    if (transaction.csrf && transaction.status === 'pending') {
                        return {
                            ...transaction,
                            status: 'completed'
                        };
                    }
                    return transaction;
                })
            );
            // Sottrai il denaro rubato
            const stolenAmount = INITIAL_TRANSACTIONS
                .filter(t => t.csrf && t.amount)
                .reduce((sum, t) => sum + t.amount, 0);
            setAccountBalance(USER_ACCOUNT.balance - stolenAmount);
        }
    }, [protectionsEnabled.csrfTokens, protectionsEnabled.sameSiteCookies, protectionsEnabled.originValidation]);

    // === CONDIZIONE DI COMPLETAMENTO ===
    useEffect(() => {
        if (!attackActive && !unauthorizedActions && appRestarted && !completed) {
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
            if (multipleProtections && csrfType && stars === 2) {
                earnStar();
            }
            
            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
            setTimeout(() => {
                setCompleted(true);
            }, 2000);
        }
    }, [attackActive, unauthorizedActions, appRestarted, completed, legitimateBlocked, protectionsEnabled, csrfType, stars, earnStar, startTime]);

    // === CONFIGURAZIONE BROWSER ===
    const browserConfig = {
        availableSites: [
            {
                url: 'http://company-finance.internal/dashboard',
                title: 'Finance Portal',
                icon: '🏦',
                content: (
                    <div className={`p-6 h-full overflow-y-auto ${attackActive ? 'bg-red-50' : 'bg-green-50'}`}>
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold text-gray-800">🏦 Company Finance Portal</h1>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                                    attackActive ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500 text-white'
                                }`}>
                                    {attackActive ? '⚠️ VULNERABLE' : '✅ SECURE'}
                                </div>
                            </div>

                            {/* Security Alert */}
                            <div className={`mb-6 p-4 rounded-lg border-l-4 ${
                                attackActive 
                                    ? 'bg-red-100 border-red-500'
                                    : 'bg-green-100 border-green-500'
                            }`}>
                                {attackActive ? (
                                    <div className="text-red-800">
                                        <p className="font-bold mb-1">⚠️ SECURITY ALERT</p>
                                        <p className="text-sm">CSRF vulnerabilities detected! Requests not validated.</p>
                                        <p className="text-xs mt-1">Risk: Unauthorized transfers, account takeover, data modification</p>
                                    </div>
                                ) : (
                                    <div className="text-green-800">
                                        <p className="font-bold mb-1">✅ SECURE MODE</p>
                                        <p className="text-sm">CSRF protection active. All requests validated.</p>
                                        <p className="text-xs mt-1">Protection: CSRF tokens, SameSite cookies, Origin validation</p>
                                    </div>
                                )}
                            </div>

                            {/* Account Summary */}
                            <div className="bg-white rounded-lg shadow p-6 mb-6">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Account Summary</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Account Holder</p>
                                        <p className="text-lg font-semibold">{USER_ACCOUNT.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Account Number</p>
                                        <p className="text-lg font-semibold">{USER_ACCOUNT.accountNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Current Balance</p>
                                        <p className={`text-2xl font-bold ${
                                            accountBalance < USER_ACCOUNT.balance ? 'text-red-600 animate-pulse' : 'text-green-600'
                                        }`}>
                                            ${accountBalance.toLocaleString()}
                                        </p>
                                        {accountBalance < USER_ACCOUNT.balance && (
                                            <p className="text-xs text-red-600 mt-1">
                                                ⚠️ Unauthorized transfer detected!
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="text-lg font-semibold">{USER_ACCOUNT.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Transactions */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
                                <div className="space-y-3">
                                    {transactions.map(transaction => (
                                        <div 
                                            key={transaction.id}
                                            className={`p-3 rounded border ${
                                                transaction.csrf && attackActive
                                                    ? 'border-red-400 bg-red-50'
                                                    : transaction.csrf && transaction.status === 'blocked'
                                                    ? 'border-yellow-400 bg-yellow-50'
                                                    : 'border-gray-200 bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-semibold text-sm text-gray-800">
                                                            {transaction.action}
                                                        </p>
                                                        {transaction.csrf && (
                                                            <span className={`text-xs px-2 py-0.5 rounded ${
                                                                transaction.status === 'blocked'
                                                                    ? 'bg-yellow-500 text-white'
                                                                    : 'bg-red-500 text-white animate-pulse'
                                                            }`}>
                                                                {transaction.status === 'blocked' ? '🛡️ BLOCKED' : '🚨 CSRF'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        {transaction.time} - User: {transaction.user}
                                                    </p>
                                                    {transaction.amount && (
                                                        <p className="text-sm font-semibold text-red-600 mt-1">
                                                            Amount: ${transaction.amount.toLocaleString()} → {transaction.destination}
                                                        </p>
                                                    )}
                                                    {transaction.newEmail && (
                                                        <p className="text-sm text-gray-700 mt-1">
                                                            New email: {transaction.newEmail}
                                                        </p>
                                                    )}
                                                    {transaction.origin && (
                                                        <p className="text-xs font-mono text-red-600 mt-1">
                                                            Origin: {transaction.origin}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                                                        transaction.status === 'completed' && !transaction.csrf
                                                            ? 'bg-green-100 text-green-800'
                                                            : transaction.status === 'blocked'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : transaction.status === 'completed' && transaction.csrf
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {transaction.status.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                            {transaction.csrf && transaction.status !== 'blocked' && attackActive && (
                                                <div className="mt-2 text-xs text-red-600 font-mono bg-red-50 p-2 rounded">
                                                    ⚠️ This request was forged by an external site!
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'http://company-finance.internal/security',
                title: 'Security Settings',
                icon: '🔒',
                content: (
                    <div className="p-6 bg-gray-900 text-white h-full overflow-y-auto">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-2xl font-bold mb-6">🔒 CSRF Protection Dashboard</h1>

                            {/* Protection Status */}
                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                <h2 className="font-semibold mb-3 flex items-center gap-2">
                                    <span>🛡️</span> Active Protections
                                </h2>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                        <span className="text-sm">CSRF Tokens (Synchronizer Pattern)</span>
                                        <span className={`text-sm font-bold ${
                                            protectionsEnabled.csrfTokens ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                            {protectionsEnabled.csrfTokens ? '✅ ENABLED' : '❌ DISABLED'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                        <span className="text-sm">SameSite Cookies</span>
                                        <span className={`text-sm font-bold ${
                                            protectionsEnabled.sameSiteCookies ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                            {protectionsEnabled.sameSiteCookies ? '✅ ENABLED' : '❌ DISABLED'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                        <span className="text-sm">Origin/Referer Validation</span>
                                        <span className={`text-sm font-bold ${
                                            protectionsEnabled.originValidation ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                            {protectionsEnabled.originValidation ? '✅ ENABLED' : '❌ DISABLED'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm">Double Submit Cookie</span>
                                        <span className={`text-sm font-bold ${
                                            protectionsEnabled.doubleSubmitCookie ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                            {protectionsEnabled.doubleSubmitCookie ? '✅ ENABLED' : '❌ DISABLED'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CSRF Risk Analysis */}
                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                <h2 className="font-semibold mb-3 flex items-center gap-2">
                                    <span>📊</span> CSRF Risk Analysis
                                </h2>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Overall Risk Level</span>
                                            <span className={`font-bold ${
                                                attackActive ? 'text-red-400' : 'text-green-400'
                                            }`}>
                                                {attackActive ? 'CRITICAL' : 'LOW'}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full transition-all ${
                                                    attackActive ? 'bg-red-500 w-full' : 'bg-green-500 w-1/4'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        <p className="mb-1">
                                            <strong>CSRF Requests Detected:</strong> {
                                                attackActive 
                                                    ? INITIAL_TRANSACTIONS.filter(t => t.csrf).length
                                                    : 0
                                            }
                                        </p>
                                        <p className="mb-1">
                                            <strong>Unauthorized Actions:</strong> {unauthorizedActions ? 'EXECUTED ⚠️' : 'BLOCKED ✅'}
                                        </p>
                                        <p>
                                            <strong>Financial Loss:</strong> {
                                                attackActive 
                                                    ? `$${(USER_ACCOUNT.balance - accountBalance).toLocaleString()}`
                                                    : '$0'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Attack Vectors */}
                            <div className="bg-gray-800 rounded-lg p-4">
                                <h2 className="font-semibold mb-3 flex items-center gap-2">
                                    <span>🎯</span> Known CSRF Attack Vectors
                                </h2>
                                <div className="space-y-2 text-xs">
                                    <div className="p-2 bg-gray-900 rounded">
                                        <p className="font-semibold text-yellow-400">1. Malicious Form Submission</p>
                                        <p className="text-gray-400 mt-1">Attacker hosts hidden form that auto-submits to victim site</p>
                                    </div>
                                    <div className="p-2 bg-gray-900 rounded">
                                        <p className="font-semibold text-yellow-400">2. Image Tag Exploit</p>
                                        <p className="text-gray-400 mt-1">&lt;img src=&quot;bank.com/transfer?amount=5000&quot;&gt;</p>
                                    </div>
                                    <div className="p-2 bg-gray-900 rounded">
                                        <p className="font-semibold text-yellow-400">3. XMLHttpRequest/Fetch</p>
                                        <p className="text-gray-400 mt-1">JavaScript making authenticated requests to victim site</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'http://evil-site.com',
                title: 'Malicious Site',
                icon: '☠️',
                content: (
                    <div className="p-6 bg-black text-red-500 h-full overflow-y-auto">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-2xl font-bold mb-6 animate-pulse">☠️ Attacker&apos;s Site</h1>
                            
                            <div className="bg-gray-900 border border-red-500 rounded-lg p-4 mb-4">
                                <p className="text-sm text-gray-400 mb-3">This malicious page contains hidden CSRF attacks:</p>
                                
                                <div className="font-mono text-xs bg-black p-3 rounded border border-red-700">
                                    <p className="text-green-400">&lt;!-- Hidden malicious form --&gt;</p>
                                    <p className="text-white">&lt;form action=&quot;http://company-finance.internal/transfer&quot; method=&quot;POST&quot;&gt;</p>
                                    <p className="text-white ml-4">&lt;input type=&quot;hidden&quot; name=&quot;amount&quot; value=&quot;5000&quot; /&gt;</p>
                                    <p className="text-white ml-4">&lt;input type=&quot;hidden&quot; name=&quot;to&quot; value=&quot;attacker@evil.com&quot; /&gt;</p>
                                    <p className="text-white">&lt;/form&gt;</p>
                                    <p className="text-yellow-400 mt-2">&lt;script&gt;</p>
                                    <p className="text-yellow-400 ml-4">document.forms[0].submit(); // Auto-submit!</p>
                                    <p className="text-yellow-400">&lt;/script&gt;</p>
                                </div>
                            </div>

                            <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-4">
                                <p className="font-bold mb-2">🎯 How CSRF Works:</p>
                                <ol className="text-sm space-y-1 list-decimal list-inside text-gray-300">
                                    <li>Employee logs into company-finance.internal (session cookie set)</li>
                                    <li>Employee visits attacker&apos;s site (this page)</li>
                                    <li>Hidden form auto-submits to company-finance.internal</li>
                                    <li>Browser includes session cookie automatically</li>
                                    <li>Finance portal executes request as if employee made it</li>
                                    <li>Company funds transferred without authorization!</li>
                                </ol>
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
            '$ CSRF Defense Terminal v6.0',
            '$ Type "help" for available commands',
            '$ ⚠️  WARNING: CSRF attacks detected on company finance portal!',
        ],
        commands: {
            'analyze-requests': () => {
                const csrfRequests = transactions.filter(t => t.csrf);
                return `=== REQUEST ANALYSIS ===
Total requests: ${transactions.length}
Legitimate requests: ${transactions.filter(t => !t.csrf).length}
CSRF requests: ${csrfRequests.length}

Suspicious patterns detected:
${csrfRequests.map((t, i) => `${i + 1}. ${t.action} from ${t.origin || 'unknown origin'} - Status: ${t.status}`).join('\n')}

⚠️ Action required: Enable CSRF protection!`;
            },

            'show-transaction': (args) => {
                const id = parseInt(args[0]);
                const transaction = transactions.find(t => t.id === id);
                
                if (!transaction) {
                    return 'Usage: show-transaction <id>\nExample: show-transaction 2';
                }
                
                return `=== TRANSACTION DETAILS ===
ID: ${transaction.id}
Time: ${transaction.time}
User: ${transaction.user}
Action: ${transaction.action}
${transaction.amount ? `Amount: $${transaction.amount}` : ''}
${transaction.destination ? `Destination: ${transaction.destination}` : ''}
${transaction.origin ? `Origin: ${transaction.origin}` : 'Origin: bank.com'}
Status: ${transaction.status}
CSRF: ${transaction.csrf ? 'YES ⚠️' : 'NO ✓'}

${transaction.csrf && attackActive ? 'Risk: CRITICAL - Forged request executed!' : 'Status: Safe'}`;
            },

            'identify-csrf': () => {
                setCsrfType('CLASSIC_CSRF');
                setCurrentStep(1);
                return `=== CSRF ATTACK IDENTIFICATION ===
Type: CLASSIC CSRF (Cross-Site Request Forgery)
Description: Unauthorized state-changing requests
Attack Vector: External sites submitting authenticated requests
Impact: Unauthorized transfers, account changes, data theft

Attack Characteristics:
- Requests from unexpected origins
- Missing CSRF tokens
- Auto-submitted forms from malicious sites
- Session cookies sent automatically

✓ CSRF attack type identified successfully!`;
            },

            'enable-csrf-tokens': () => {
                if (protectionsEnabled.csrfTokens) {
                    return '[!] CSRF tokens are already enabled';
                }
                setProtectionsEnabled(prev => ({ ...prev, csrfTokens: true }));
                setCurrentStep(2);
                return `[✓] CSRF tokens enabled (Synchronizer Token Pattern)
[+] Unique token generated per session
[+] Token required in all state-changing requests
[+] Server validates token before processing
[+] CSRF risk: SIGNIFICANTLY REDUCED`;
            },

            'enable-samesite': () => {
                if (protectionsEnabled.sameSiteCookies) {
                    return '[!] SameSite cookies are already enabled';
                }
                setProtectionsEnabled(prev => ({ ...prev, sameSiteCookies: true }));
                return `[✓] SameSite cookie attribute enabled
[+] Cookies not sent with cross-site requests
[+] Policy: SameSite=Strict
[+] Prevents automatic cookie inclusion
[+] CSRF risk: REDUCED`;
            },

            'enable-origin-check': () => {
                if (protectionsEnabled.originValidation) {
                    return '[!] Origin validation is already enabled';
                }
                setProtectionsEnabled(prev => ({ ...prev, originValidation: true }));
                return `[✓] Origin/Referer validation enabled
[+] Checking Origin header on requests
[+] Blocking requests from external domains
[+] Expected origin: company-finance.internal
[+] CSRF risk: REDUCED`;
            },

            'enable-double-submit': () => {
                if (protectionsEnabled.doubleSubmitCookie) {
                    return '[!] Double Submit Cookie is already enabled';
                }
                setProtectionsEnabled(prev => ({ ...prev, doubleSubmitCookie: true }));
                return `[✓] Double Submit Cookie pattern enabled
[+] CSRF token stored in cookie AND request parameter
[+] Server compares both values
[+] Attacker cannot read cookie due to SOP
[+] CSRF risk: REDUCED`;
            },

            'restart-app': () => {
                if (!protectionsEnabled.csrfTokens && !protectionsEnabled.sameSiteCookies) {
                    return '[!] No security changes detected. Apply protections first.';
                }
                setAppRestarted(true);
                return `[✓] Company finance portal restarted
[✓] New security configurations applied
[✓] CSRF protection status: ${!attackActive ? 'ACTIVE' : 'PARTIAL'}
${!attackActive ? '[✓] CSRF attack mitigated successfully!' : '[!] Additional protections recommended'}`;
            },

            'check-balance': () => {
                return `=== ACCOUNT STATUS ===
Current Balance: $${accountBalance.toLocaleString()}
Original Balance: $${USER_ACCOUNT.balance.toLocaleString()}
${accountBalance < USER_ACCOUNT.balance ? `Loss: $${(USER_ACCOUNT.balance - accountBalance).toLocaleString()} ⚠️` : 'Status: Secure ✓'}

${accountBalance < USER_ACCOUNT.balance ? 'WARNING: Unauthorized transfer detected!' : 'No unauthorized transactions'}`;
            },

            'scan-vulnerabilities': () => {
                const vulns = [];
                if (!protectionsEnabled.csrfTokens) vulns.push('- Missing CSRF tokens');
                if (!protectionsEnabled.sameSiteCookies) vulns.push('- SameSite cookies not configured');
                if (!protectionsEnabled.originValidation) vulns.push('- No Origin/Referer validation');
                if (!protectionsEnabled.doubleSubmitCookie) vulns.push('- Double Submit Cookie not implemented');
                
                return `=== CSRF VULNERABILITY SCAN ===
${vulns.length > 0 ? 'VULNERABILITIES FOUND:\n' + vulns.join('\n') : '✓ No critical vulnerabilities detected'}

Recommendations:
1. Implement CSRF tokens (CRITICAL)
2. Enable SameSite cookies (HIGH)
3. Validate Origin/Referer headers (HIGH)
4. Consider Double Submit Cookie pattern (MEDIUM)`;
            },

            'status': () => {
                return `=== SECURITY STATUS ===
CSRF Attack Active: ${attackActive ? '🔴 YES' : '🟢 NO'}
Unauthorized Actions: ${unauthorizedActions ? '🔴 YES' : '🟢 NO'}
App Status: ${appRestarted ? 'RESTARTED' : 'RUNNING'}
CSRF Type Identified: ${csrfType || 'NOT YET'}
Account Balance: $${accountBalance.toLocaleString()}

Active Protections:
- CSRF Tokens: ${protectionsEnabled.csrfTokens ? '✓' : '✗'}
- SameSite Cookies: ${protectionsEnabled.sameSiteCookies ? '✓' : '✗'}
- Origin Validation: ${protectionsEnabled.originValidation ? '✓' : '✗'}
- Double Submit: ${protectionsEnabled.doubleSubmitCookie ? '✓' : '✗'}`;
            }
        },
        prompt: 'csrf-defense@bank:~$',
        helpCommand: true
    };

    // === CONFIGURAZIONE SIEM ===
    const siemConfig = {
        logs: generateCSRFLogs(attackActive, protectionsEnabled.csrfTokens),
        blockedIPs: 0,
        currentStep: currentStep,
        trafficHistory: [
            { time: '14:18', value: 15 },
            { time: '14:20', value: 18 },
            { time: '14:22', value: attackActive ? 40 : 22 },
            { time: '14:25', value: attackActive ? 48 : 20 },
            { time: '14:30', value: attackActive ? 55 : 19 },
            { time: '14:35', value: attackActive ? 60 : 17 }
        ],
        networkTraffic: { 
            incoming: attackActive ? 320 : 180, 
            outgoing: attackActive ? 450 : 220 
        },
        protocols: { 
            http: attackActive ? 550 : 280,
            https: 180, 
            ssh: 20, 
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
                return 'Analizza le transazioni. Vedi richieste da origini esterne (evil-site.com)? Usa "analyze-requests".';
            case 1:
                return 'Hai identificato CSRF! Usa "enable-csrf-tokens" per proteggere le richieste state-changing.';
            case 2:
                return 'Aggiungi "enable-samesite" per protezione extra, poi riavvia con "restart-app".';
            case 3: {
                const hints = [
                    '✅ Bene! Le protezioni CSRF sono attive. Controlla il balance nel browser.',
                    'Ricorda: CSRF tokens e SameSite cookies proteggono dalle richieste non autorizzate.',
                    'Stai per completare il livello! Verifica che i fondi siano protetti.'
                ];
                return hints[Math.min(hintIndex, hints.length - 1)];
            }
            default:
                return '✅ Controlla lo stato con "status" e verifica il balance nel browser!';
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
            label: 'Fondi protetti',
            value: `$${accountBalance.toLocaleString()}`,
            color: accountBalance === USER_ACCOUNT.balance ? 'text-cyber-green' : 'text-red-500'
        },
        {
            label: 'Tipo CSRF identificato',
            value: csrfType || 'Non identificato',
            color: csrfType ? 'text-cyber-green' : 'text-yellow-400'
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
                enableHealthDecay={true}
                decayInterval={8000}
                decayAmount={5}
            >                
                <HealthMonitor 
                    completed={completed} 
                    onGameOver={() => {
                        setMissionSuccess(false);
                        setFailed(true);
                        setCompleted(true);
                    }} 
                />
                
                {completed && (
                    <MissionDebrief
                        success={missionSuccess}
                        stats={{ stars, health: 100 }}
                        recapText={missionSuccess ? 
                            `CSRF DEFENSE ANALYSIS\n\n` +
                            `Protezioni attivate: ${Object.values(protectionsEnabled).filter(Boolean).length}/4\n` +
                            `Unauthorized actions: ${unauthorizedActions ? 'ACTIVE' : 'BLOCKED'}\n` +
                            `Account balance: $${accountBalance.toLocaleString()}\n` +
                            `Tempo completamento: ${completionTime}s\n\n` +
                            `${!attackActive && !unauthorizedActions ? 'RISULTATO: CSRF attack successfully mitigated!' : 'RISULTATO: Completato.'}`
                            : 'Account funds were stolen through successful CSRF attacks.\n\nActivate CSRF tokens and SameSite cookie protection before restarting.'}
                        onRetry={() => window.location.reload()}
                        onExit={() => window.location.href = '/'}
                    />
                )}
            </LevelTemplate>
        </div>
    );
};

export default Level6;
