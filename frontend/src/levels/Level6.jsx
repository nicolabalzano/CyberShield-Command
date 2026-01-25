import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate, { useLevel as useLevelFromTemplate } from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import { useLevel } from '../contexts/LevelContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import InfoPanel from '../components/InfoPanel';
import MissionDebrief from '../components/MissionDebrief';
import Timer from '../components/Timer';

// Componente interno per monitorare la salute e gestire il game over
const HealthMonitor = ({ completed, onGameOver, healthSetterRef }) => {
    const { health, setHealth } = useLevel();

    // Assegna setHealth al ref
    React.useEffect(() => {
        if (healthSetterRef) {
            healthSetterRef.current = setHealth;
        }
    }, [setHealth, healthSetterRef]);

    useEffect(() => {
        if (health <= 0 && !completed) {
            onGameOver();
        }
    }, [health, completed, onGameOver]);

    return null;
};

// Wrapper per MissionDebrief con accesso alla salute
const MissionDebriefWrapper = ({ stats, ...props }) => {
    const { health } = useLevel();
    return <MissionDebrief {...props} stats={{ ...stats, health }} />;
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


const Level6 = () => {
    const navigate = useNavigate();
    // Sistema di reputazione (stelle)
    const { stars, earnStar } = useReputation('level6', 0);
    const { language } = useLanguage();
    const t = translations[language]?.level6 || translations['italiano'].level6;

    const generateCSRFLogs = (attackActive, tokensEnabled) => [
        {
            id: 1,
            time: '14:20:18',
            severity: 'low',
            source: '192.168.1.100',
            type: 'INFO',
            message: t.logMessages.sessionCreated,
            threat: false
        },
        {
            id: 2,
            time: '14:22:32',
            severity: attackActive ? 'critical' : 'medium',
            source: '203.0.113.88',
            type: attackActive ? 'ALERT' : 'WARNING',
            message: attackActive
                ? `${t.logMessages.attackDetected} http://evil-site.com`
                : t.logMessages.blocked,
            threat: attackActive
        },
        {
            id: 3,
            time: '14:22:35',
            severity: attackActive ? 'critical' : 'low',
            source: '203.0.113.88',
            type: attackActive ? 'SECURITY' : 'INFO',
            message: attackActive
                ? `${t.logMessages.execution} - $5000 to attacker@evil.com`
                : `${t.logMessages.rejected} - Expected: bank.com, Got: evil-site.com`,
            threat: attackActive
        },
        {
            id: 4,
            time: '14:25:12',
            severity: attackActive ? 'high' : 'medium',
            source: '198.51.100.44',
            type: attackActive ? 'ALERT' : 'WARNING',
            message: attackActive
                ? t.logMessages.sessionHijacked
                : t.logMessages.sameSiteBlocked,
            threat: attackActive
        },
        {
            id: 5,
            time: '14:28:47',
            severity: 'low',
            source: '192.168.1.105',
            type: 'INFO',
            message: t.logMessages.normal,
            threat: false
        },
        {
            id: 6,
            time: '14:30:22',
            severity: attackActive ? 'critical' : 'low',
            source: '203.0.113.77',
            type: attackActive ? 'ALERT' : 'INFO',
            message: attackActive
                ? t.logMessages.passwordChange
                : t.logMessages.tokenPassed,
            threat: attackActive
        },
        {
            id: 7,
            time: '14:32:15',
            severity: attackActive ? 'high' : 'low',
            source: '203.0.113.88',
            type: attackActive ? 'SECURITY' : 'INFO',
            message: attackActive
                ? t.logMessages.multipleAttempts
                : t.logMessages.validated,
            threat: attackActive
        },
        {
            id: 8,
            time: '14:35:00',
            severity: attackActive ? 'critical' : 'low',
            source: '203.0.113.88',
            type: attackActive ? 'ALERT' : 'INFO',
            message: attackActive
                ? t.logMessages.vectorConfirmed
                : t.logMessages.doubleEnforced,
            threat: attackActive
        }
    ];

    // === STATO DEL LIVELLO ===
    const [attackActive, setAttackActive] = useState(true); // CSRF attivo
    const [unauthorizedActions, setUnauthorizedActions] = useState(true); // Azioni non autorizzate eseguite

    // Timer State (5 minutes)
    const MAX_TIME = 300;
    const [secondsRemaining, setSecondsRemaining] = useState(MAX_TIME);

    // Ref per accedere a setHealth da Level6Content
    const healthSetterRef = React.useRef(null);

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

    const [analysisStarAwarded, setAnalysisStarAwarded] = useState(false);

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

    // ASSEGNAZIONE STELLE IN TEMPO REALE

    // Stella 3: analisi completa + protezioni multiple
    useEffect(() => {
        const multipleProtections = Object.values(protectionsEnabled).filter(Boolean).length >= 2;
        if (!analysisStarAwarded && multipleProtections && csrfType) {
            earnStar();
            setAnalysisStarAwarded(true);
        }
    }, [protectionsEnabled, csrfType, analysisStarAwarded, earnStar]);

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
            if (!legitimateBlocked && stars <= 1) { // Check <= 1 because they might have gained potential for star 3 but not star 2 yet? No, order matters.
                // Wait, logic in original was:
                // if (!legitimateBlocked && stars === 1) earnStar()
                // The issue is if they earned Star 3 (analysis) BEFORE completion?
                // Let's rely on earnStar handles max 3.
                // But we want to ensure they get the points they deserve.

                // If they have 0 stars -> Earn completion (1).
                // If no false positives -> Earn another (2).
                // If they already have analysis star (so stars is already 1 or more before completion).

                // Safe logic using local flags if we had them or just trusting earnStar increment.
                // But earnStar only increments by 1.
                // We need to call it multiple times if we need to award multiple stars at once.

                // Let's refine:
                // We know if we are here, we are completing.
                // Completion star is ALWAYS awarded if we are here and somehow don't have enough stars?
                // Actually star 1 is for completion.

                // Scenario A: No analysis star.
                // Stars = 0.
                // Completion -> Stars = 1.
                // No false pos -> Stars = 2.

                // Scenario B: Analysis star awarded during game.
                // Stars = 1.
                // Completion -> Stars = 2.
                // No false pos -> Stars = 3.

                // So we just need to check conditions and call earnStar.
                // However, we must ensure we don't double award if effect runs twice (it shouldn't due to !completed check).

                earnStar(); // For completion

                if (!legitimateBlocked) {
                    setTimeout(() => earnStar(), 500); // Small delay to separate sounds/animations if possible, or just call it.
                    // Actually react state updates might batch.
                    // But wait, earnStar uses prev state.
                    // It should be fine to call twice?
                    // No, state updates in same cycle might conflict if not functional?
                    // useReputation hooks uses functional update: setStars(prev => ...)
                    // So calling twice works.
                    earnStar();
                }
            } else {
                // Logic for when we might already have stars?
                // Current logic:
                // if (stars === 0) earnStar();
                // if (!legitimateBlocked && stars === 1) earnStar();

                // If I have analysis star (1 star).
                // Completion -> earnStar() -> 2 stars.
                // No false pos -> earnStar() -> 3 stars.

                // If I don't have analysis star (0 stars).
                // Completion -> earnStar() -> 1 star.
                // No false pos -> earnStar() -> 2 stars.

                // This seems correct regardless of starting stars, assuming we want to award +1 for completion and +1 for no false positives.

                // Wait, original code was:
                // if (stars === 0) earnStar();
                // if (!legitimateBlocked && stars === 1) earnStar();
                // if (multipleProtections... && stars === 2) earnStar();

                // It enforced an order. Now we decoupled analysis star.
                // So we just award for completion and false positives.

                earnStar(); // Award completion star
                if (!legitimateBlocked) {
                    earnStar(); // Award no-false-positives star
                }
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
                title: t.browser.portal.title,
                icon: '🏦',
                content: (
                    <div className={`p-6 h-full overflow-y-auto ${attackActive ? 'bg-red-50' : 'bg-green-50'}`}>
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold text-gray-800">🏦 {t.browser.portal.header}</h1>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${attackActive ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500 text-white'
                                    }`}>
                                    {attackActive ? t.browser.portal.vulnerable : t.browser.portal.secure}
                                </div>
                            </div>

                            {/* Security Alert */}
                            <div className={`mb-6 p-4 rounded-lg border-l-4 ${attackActive
                                ? 'bg-red-100 border-red-500'
                                : 'bg-green-100 border-green-500'
                                }`}>
                                {attackActive ? (
                                    <div className="text-red-800">
                                        <p className="font-bold mb-1">{t.browser.portal.warningTitle}</p>
                                        <p className="text-sm">{t.browser.portal.warningText}</p>
                                        <p className="text-xs mt-1">{t.browser.portal.warningRisk}</p>
                                    </div>
                                ) : (
                                    <div className="text-green-800">
                                        <p className="font-bold mb-1">{t.browser.portal.secureTitle}</p>
                                        <p className="text-sm">{t.browser.portal.secureText}</p>
                                        <p className="text-xs mt-1">{t.browser.portal.secureProt}</p>
                                    </div>
                                )}
                            </div>

                            {/* Account Summary */}
                            <div className="bg-white rounded-lg shadow p-6 mb-6">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.browser.portal.account.title}</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">{t.browser.portal.account.holder}</p>
                                        <p className="text-lg font-semibold">{USER_ACCOUNT.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">{t.browser.portal.account.number}</p>
                                        <p className="text-lg font-semibold">{USER_ACCOUNT.accountNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">{t.browser.portal.account.balance}</p>
                                        <p className={`text-2xl font-bold ${accountBalance < USER_ACCOUNT.balance ? 'text-red-600 animate-pulse' : 'text-green-600'
                                            }`}>
                                            ${accountBalance.toLocaleString()}
                                        </p>
                                        {accountBalance < USER_ACCOUNT.balance && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {t.browser.portal.account.unauthorized}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">{t.browser.portal.account.email}</p>
                                        <p className="text-lg font-semibold">{USER_ACCOUNT.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Transactions */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.browser.portal.activity.title}</h2>
                                <div className="space-y-3">
                                    {transactions.map(transaction => (
                                        <div
                                            key={transaction.id}
                                            className={`p-3 rounded border ${transaction.csrf && attackActive
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
                                                            <span className={`text-xs px-2 py-0.5 rounded ${transaction.status === 'blocked'
                                                                ? 'bg-yellow-500 text-white'
                                                                : 'bg-red-500 text-white animate-pulse'
                                                                }`}>
                                                                {transaction.status === 'blocked' ? t.browser.portal.activity.blockedLabel : t.browser.portal.activity.csrfLabel}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        {transaction.time} - User: {transaction.user}
                                                    </p>
                                                    {transaction.amount && (
                                                        <p className="text-sm font-semibold text-red-600 mt-1">
                                                            {t.browser.portal.activity.amount} ${transaction.amount.toLocaleString()} → {transaction.destination}
                                                        </p>
                                                    )}
                                                    {transaction.newEmail && (
                                                        <p className="text-sm text-gray-700 mt-1">
                                                            {t.browser.portal.activity.newEmail} {transaction.newEmail}
                                                        </p>
                                                    )}
                                                    {transaction.origin && (
                                                        <p className="text-xs font-mono text-red-600 mt-1">
                                                            {t.browser.portal.activity.origin} {transaction.origin}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded ${transaction.status === 'completed' && !transaction.csrf
                                                        ? 'bg-green-100 text-green-800'
                                                        : transaction.status === 'blocked'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : transaction.status === 'completed' && transaction.csrf
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {transaction.status === 'completed' ? t.browser.portal.activity.completed : t.browser.portal.activity.blocked}
                                                    </span>
                                                </div>
                                            </div>
                                            {transaction.csrf && transaction.status !== 'blocked' && attackActive && (
                                                <div className="mt-2 text-xs text-red-600 font-mono bg-red-50 p-2 rounded">
                                                    {t.browser.portal.activity.forged}
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
                title: t.browser.dashboard.title,
                icon: '🔒',
                content: (
                    <div className="p-6 bg-gray-900 text-white h-full overflow-y-auto">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-2xl font-bold mb-6">🔒 {t.browser.dashboard.title}</h1>

                            {/* Protection Status */}
                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                <h2 className="font-semibold mb-3 flex items-center gap-2">
                                    <span>🛡️</span> {t.browser.dashboard.protections.title}
                                </h2>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                        <span className="text-sm">{t.browser.dashboard.protections.tokens}</span>
                                        <span className={`text-sm font-bold ${protectionsEnabled.csrfTokens ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {protectionsEnabled.csrfTokens ? t.browser.dashboard.protections.enabled : t.browser.dashboard.protections.disabled}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                        <span className="text-sm">{t.browser.dashboard.protections.sameSite}</span>
                                        <span className={`text-sm font-bold ${protectionsEnabled.sameSiteCookies ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {protectionsEnabled.sameSiteCookies ? t.browser.dashboard.protections.enabled : t.browser.dashboard.protections.disabled}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                        <span className="text-sm">{t.browser.dashboard.protections.origin}</span>
                                        <span className={`text-sm font-bold ${protectionsEnabled.originValidation ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {protectionsEnabled.originValidation ? t.browser.dashboard.protections.enabled : t.browser.dashboard.protections.disabled}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm">{t.browser.dashboard.protections.double}</span>
                                        <span className={`text-sm font-bold ${protectionsEnabled.doubleSubmitCookie ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {protectionsEnabled.doubleSubmitCookie ? t.browser.dashboard.protections.enabled : t.browser.dashboard.protections.disabled}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CSRF Risk Analysis */}
                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                <h2 className="font-semibold mb-3 flex items-center gap-2">
                                    <span>📊</span> {t.browser.dashboard.risk.title}
                                </h2>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{t.browser.dashboard.risk.level}</span>
                                            <span className={`font-bold ${attackActive ? 'text-red-400' : 'text-green-400'
                                                }`}>
                                                {attackActive ? t.browser.dashboard.risk.critical : t.browser.dashboard.risk.low}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all ${attackActive ? 'bg-red-500 w-full' : 'bg-green-500 w-1/4'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        <p className="mb-1">
                                            <strong>{t.browser.dashboard.risk.detected}</strong> {
                                                attackActive
                                                    ? INITIAL_TRANSACTIONS.filter(t => t.csrf).length
                                                    : 0
                                            }
                                        </p>
                                        <p className="mb-1">
                                            <strong>{t.browser.dashboard.risk.unauthorized}</strong> {unauthorizedActions ? t.browser.dashboard.risk.executed : t.browser.dashboard.risk.blocked}
                                        </p>
                                        <p>
                                            <strong>{t.browser.dashboard.risk.loss}</strong> {
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
                                    <span>🎯</span> {t.browser.dashboard.vectors.title}
                                </h2>
                                <div className="space-y-2 text-xs">
                                    <div className="p-2 bg-gray-900 rounded">
                                        <p className="font-semibold text-yellow-400">{t.browser.dashboard.vectors.form.title}</p>
                                        <p className="text-gray-400 mt-1">{t.browser.dashboard.vectors.form.desc}</p>
                                    </div>
                                    <div className="p-2 bg-gray-900 rounded">
                                        <p className="font-semibold text-yellow-400">{t.browser.dashboard.vectors.img.title}</p>
                                        <p className="text-gray-400 mt-1">{t.browser.dashboard.vectors.img.desc}</p>
                                    </div>
                                    <div className="p-2 bg-gray-900 rounded">
                                        <p className="font-semibold text-yellow-400">{t.browser.dashboard.vectors.xhr.title}</p>
                                        <p className="text-gray-400 mt-1">{t.browser.dashboard.vectors.xhr.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'http://evil-site.com',
                title: t.browser.malicious.title,
                icon: '☠️',
                content: (
                    <div className="p-6 bg-black text-red-500 h-full overflow-y-auto">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-2xl font-bold mb-6 animate-pulse">{t.browser.malicious.header}</h1>

                            <div className="bg-gray-900 border border-red-500 rounded-lg p-4 mb-4">
                                <p className="text-sm text-gray-400 mb-3">{t.browser.malicious.desc}</p>

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
                                <p className="font-bold mb-2">{t.browser.malicious.how.title}</p>
                                <ol className="text-sm space-y-1 list-decimal list-inside text-gray-300">
                                    {t.browser.malicious.how.list.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
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
            t.terminal.initial[0],
            t.terminal.initial[1],
            t.terminal.initial[2],
        ],
        commands: {
            'analyze-requests': () => {
                const csrfRequests = transactions.filter(t => t.csrf);
                return `${t.terminal.analyze.title}
${t.terminal.analyze.total} ${transactions.length}
${t.terminal.analyze.legitimate} ${transactions.filter(t => !t.csrf).length}
${t.terminal.analyze.csrf} ${csrfRequests.length}

${t.terminal.analyze.suspicious}
${csrfRequests.map((tr, i) => `${i + 1}. ${tr.action} ${t.browser.portal.activity.origin} ${tr.origin || 'unknown origin'} - ${t.browser.portal.activity.status}: ${tr.status}`).join('\n')}

${t.terminal.analyze.action}`;
            },

            'show-transaction': (args) => {
                const id = parseInt(args[0]);
                const transaction = transactions.find(t => t.id === id);

                if (!transaction) {
                    return t.terminal.transaction.usage;
                }

                return `${t.terminal.transaction.title}
${t.terminal.transaction.id}: ${transaction.id}
${t.terminal.transaction.time}: ${transaction.time}
${t.terminal.transaction.user}: ${transaction.user}
${t.terminal.transaction.action}: ${transaction.action}
${transaction.amount ? `${t.terminal.transaction.amount}: $${transaction.amount}` : ''}
${transaction.destination ? `${t.terminal.transaction.destination}: ${transaction.destination}` : ''}
${transaction.origin ? `${t.terminal.transaction.origin}: ${transaction.origin}` : `${t.terminal.transaction.origin}: ${t.terminal.transaction.fields.originDefault}`}
${t.terminal.transaction.status}: ${transaction.status}
${t.terminal.transaction.csrfField}: ${transaction.csrf ? t.terminal.transaction.yes : t.terminal.transaction.no}

${transaction.csrf && attackActive ? t.terminal.transaction.risk : t.terminal.transaction.safe}`;
            },

            'identify-csrf': () => {
                setCsrfType('CLASSIC_CSRF');
                setCurrentStep(1);
                return `${t.terminal.identify.title}
${t.terminal.identify.type}: CLASSIC CSRF (Cross-Site Request Forgery)
${t.terminal.identify.desc}
${t.terminal.identify.vector}
${t.terminal.identify.impact}

${t.terminal.identify.chars.title}
${t.terminal.identify.chars.list[0]}
${t.terminal.identify.chars.list[1]}
${t.terminal.identify.chars.list[2]}
${t.terminal.identify.chars.list[3]}

${t.terminal.identify.success}`;
            },

            'enable-csrf-tokens': () => {
                if (protectionsEnabled.csrfTokens) {
                    return t.terminal.enableTokens.already;
                }
                setProtectionsEnabled(prev => ({ ...prev, csrfTokens: true }));
                setCurrentStep(2);
                return `${t.terminal.enableTokens.success}
${t.terminal.enableTokens.details[0]}
${t.terminal.enableTokens.details[1]}
${t.terminal.enableTokens.details[2]}
${t.terminal.enableTokens.details[3]}`;
            },

            'enable-samesite': () => {
                if (protectionsEnabled.sameSiteCookies) {
                    return t.terminal.enableSameSite.already;
                }
                setProtectionsEnabled(prev => ({ ...prev, sameSiteCookies: true }));
                return `${t.terminal.enableSameSite.success}
${t.terminal.enableSameSite.details[0]}
${t.terminal.enableSameSite.details[1]}
${t.terminal.enableSameSite.details[2]}
${t.terminal.enableSameSite.details[3]}`;
            },

            'enable-origin-check': () => {
                if (protectionsEnabled.originValidation) {
                    return t.terminal.enableOrigin.already;
                }
                setProtectionsEnabled(prev => ({ ...prev, originValidation: true }));
                return `${t.terminal.enableOrigin.success}
${t.terminal.enableOrigin.details[0]}
${t.terminal.enableOrigin.details[1]}
${t.terminal.enableOrigin.details[2]}
${t.terminal.enableOrigin.details[3]}`;
            },

            'enable-double-submit': () => {
                if (protectionsEnabled.doubleSubmitCookie) {
                    return t.terminal.enableDouble.already;
                }
                setProtectionsEnabled(prev => ({ ...prev, doubleSubmitCookie: true }));
                return `${t.terminal.enableDouble.success}
${t.terminal.enableDouble.details[0]}
${t.terminal.enableDouble.details[1]}
${t.terminal.enableDouble.details[2]}
${t.terminal.enableDouble.details[3]}`;
            },

            'restart-app': () => {
                if (!protectionsEnabled.csrfTokens && !protectionsEnabled.sameSiteCookies) {
                    return t.terminal.restart.noChanges;
                }
                setAppRestarted(true);
                return `${t.terminal.restart.success[0]}
${t.terminal.restart.success[1]}
${t.terminal.restart.protectionStatus}: ${!attackActive ? 'ACTIVE' : 'PARTIAL'}
${!attackActive ? t.terminal.restart.mitigated : t.terminal.restart.recommended}`;
            },

            'check-balance': () => {
                return `${t.terminal.checkBalance.title}
${t.terminal.checkBalance.current}: $${accountBalance.toLocaleString()}
${t.terminal.checkBalance.original}: $${USER_ACCOUNT.balance.toLocaleString()}
${accountBalance < USER_ACCOUNT.balance ? `${t.terminal.checkBalance.loss}: $${(USER_ACCOUNT.balance - accountBalance).toLocaleString()} ⚠️` : `${t.terminal.checkBalance.secure} ✓`}

${accountBalance < USER_ACCOUNT.balance ? t.terminal.checkBalance.warning : t.terminal.checkBalance.noUnauthorized}`;
            },

            'scan-vulnerabilities': () => {
                const vulns = [];
                if (!protectionsEnabled.csrfTokens) vulns.push(t.terminal.scan.missingTokens);
                if (!protectionsEnabled.sameSiteCookies) vulns.push(t.terminal.scan.sameSite);
                if (!protectionsEnabled.originValidation) vulns.push(t.terminal.scan.origin);
                if (!protectionsEnabled.doubleSubmitCookie) vulns.push(t.terminal.scan.double);

                return `${t.terminal.scan.title}
${vulns.length > 0 ? `${t.terminal.scan.found}\n` + vulns.join('\n') : t.terminal.scan.noVulns}

${t.terminal.scan.recommendationsTitle}
${t.terminal.scan.recsList[0]}
${t.terminal.scan.recsList[1]}
${t.terminal.scan.recsList[2]}
${t.terminal.scan.recsList[3]}`;
            },

            'status': () => {
                return `${t.terminal.status.title}
${t.terminal.status.attackActive}: ${attackActive ? '🔴 YES' : '🟢 NO'}
${t.terminal.status.unauthorized}: ${unauthorizedActions ? '🔴 YES' : '🟢 NO'}
${t.terminal.status.appStatus}: ${appRestarted ? 'RESTARTED' : 'RUNNING'}
${t.terminal.status.typeIdentified}: ${csrfType || 'NOT YET'}
${t.browser.portal.account.balance}: $${accountBalance.toLocaleString()}

${t.browser.dashboard.protections.title}
- ${t.browser.dashboard.protections.tokens}: ${protectionsEnabled.csrfTokens ? '✓' : '✗'}
- ${t.browser.dashboard.protections.sameSite}: ${protectionsEnabled.sameSiteCookies ? '✓' : '✗'}
- ${t.browser.dashboard.protections.origin}: ${protectionsEnabled.originValidation ? '✓' : '✗'}
- ${t.browser.dashboard.protections.double}: ${protectionsEnabled.doubleSubmitCookie ? '✓' : '✗'}`;
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

        switch (currentStep) {
            case 0:
                return t.hints.step0;
            case 1:
                return t.hints.step1;
            case 2:
                return t.hints.step2;
            case 3: {
                const hints = t.hints.step3;
                return hints[Math.min(hintIndex, hints.length - 1)];
            }
            default:
                return t.hints.default;
        }
    };

    // === STATISTICHE FINALI ===
    const additionalStats = [
        {
            label: t.debrief.protections,
            value: Object.values(protectionsEnabled).filter(Boolean).length,
            color: Object.values(protectionsEnabled).filter(Boolean).length >= 2 ? 'text-cyber-green' : 'text-yellow-400'
        },
        {
            label: t.debrief.balance,
            value: `$${accountBalance.toLocaleString()}`,
            color: accountBalance === USER_ACCOUNT.balance ? 'text-cyber-green' : 'text-red-500'
        },
        {
            label: t.terminal.status.type,
            value: csrfType || t.terminal.status.notYet,
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
            >
                <HealthMonitor
                    completed={completed}
                    healthSetterRef={healthSetterRef}
                    onGameOver={() => {
                        setMissionSuccess(false);
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
                        success={missionSuccess}
                        levelId="level6"
                        stats={{ stars }}
                        recapText={missionSuccess ?
                            `CSRF DEFENSE ANALYSIS\n\n` +
                            `${t.browser.dashboard.protections.title}: ${Object.values(protectionsEnabled).filter(Boolean).length}/4\n` +
                            `${t.browser.dashboard.risk.unauthorized}: ${unauthorizedActions ? 'ACTIVE' : 'BLOCKED'}\n` +
                            `${t.browser.portal.account.balance}: $${accountBalance.toLocaleString()}\n` +
                            `${t.debrief.time}: ${completionTime}s\n\n` +
                            `${!attackActive && !unauthorizedActions ? t.debrief.success : t.debrief.completed}`
                            : t.debrief.fail}
                        onRetry={() => window.location.reload()}
                        onExit={() => navigate('/map')}
                    />
                )}
            </LevelTemplate>
        </div>
    );
};

export default Level6;
