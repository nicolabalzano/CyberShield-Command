import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate, { useLevel } from '../components/LevelTemplate';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import InfoPanel from '../components/InfoPanel';
import MissionDebrief from '../components/MissionDebrief';
import Timer from '../components/Timer';

// -------------------------------------------------------------------------
// LEVEL 9: CRYPTOGRAPHY VULNERABILITY - DES Weak Keys
// -------------------------------------------------------------------------

const Level9Content = ({
    levelState,
    gamePhase,
    startTime,
    stars,
    navigate,
    healthSetterRef,
    secondsRemaining,
    setSecondsRemaining
}) => {
    const { health, setHealth, damage, heal } = useLevel();
    const { language } = useLanguage();
    const t = translations[language]?.level9 || translations['italiano'].level9;
    const [showDebrief, setShowDebrief] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [finalStats, setFinalStats] = useState({ stars: 0, health: 0 });

    // Assegno setHealth al ref del genitore
    React.useEffect(() => {
        if (healthSetterRef) {
            healthSetterRef.current = setHealth;
        }
    }, [setHealth, healthSetterRef]);

    // Timer Logic (Conteggio alla rovescia)
    useEffect(() => {
        if (levelState === 'victory' || showDebrief) return;

        const interval = setInterval(() => {
            setSecondsRemaining(prev => {
                const newVal = prev - 1;

                if (newVal <= 0) {
                    setHealth(0); // Game Over
                    clearInterval(interval);
                    return 0;
                }
                return newVal;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [levelState, showDebrief, setSecondsRemaining, setHealth]);

    // Apply Health Decay based on Time Remaining
    useEffect(() => {
        if (levelState === 'victory' || showDebrief) return;

        // 300s = 100%, 0s = 0%
        const MAX_TIME = 300;
        const healthPercentage = Math.floor((secondsRemaining / MAX_TIME) * 100);
        setHealth(Math.max(0, healthPercentage));

    }, [secondsRemaining, levelState, showDebrief, setHealth]);


    // WIN/LOSS Condition Logic
    useEffect(() => {
        // LOSS Condition
        if (health <= 0 && !showDebrief && levelState !== 'victory') {
            setIsWin(false);
            setFinalStats({ stars: 0, health: 0 });
            setShowDebrief(true);
        }

        // WIN Condition
        if (levelState === 'victory' && !showDebrief) {
            setIsWin(true);
            setFinalStats({ stars, health });
            setShowDebrief(true);
        }
    }, [health, levelState, showDebrief, startTime, stars]);

    return (
        <>
            {showDebrief && (
                <MissionDebrief
                    success={isWin}
                    levelId="level9"
                    stats={finalStats}
                    recapText={isWin
                        ? t.debrief.win
                        : t.debrief.loss
                    }
                    onRetry={() => window.location.reload()}
                    onExit={() => navigate('/map')}
                />
            )}

            {/* TIMER & HUD */}
            <div className="absolute top-[22%] left-[16.5%] z-[100] pointer-events-none transform scale-90">
                <Timer secondsRemaining={secondsRemaining} />
            </div>
        </>
    );
};

const Level9 = () => {
    // -------------------------------------------------------------------------
    // LEVEL CONFIGURATION & STATE
    // -------------------------------------------------------------------------
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language]?.level9 || translations['italiano'].level9;

    const [levelState, setLevelState] = useState('playing');
    const [gamePhase, setGamePhase] = useState('email_arrived'); // email_arrived -> siem_check -> code_review -> fix_code -> terminal_build -> victory
    const [startTime] = useState(Date.now());
    const [stars, setStars] = useState(0);

    // Timer State (5 minutes)
    const MAX_TIME = 300;
    const [secondsRemaining, setSecondsRemaining] = useState(MAX_TIME);

    // Hint system
    const [currentHint, setCurrentHint] = useState(t.hints.intro);

    // Track player progress for stars
    const [emailRead, setEmailRead] = useState(false);
    const [siemChecked, setSiemChecked] = useState(false);
    const [codeFixed, setCodeFixed] = useState(false);
    const [buildCompleted, setBuildCompleted] = useState(false);

    // InfoPanel visibility
    const [showInfoPanel, setShowInfoPanel] = useState(true);
    const [infoPanelQueue, setInfoPanelQueue] = useState([]);
    const [currentInfoIndex, setCurrentInfoIndex] = useState(0);

    // Ref per accedere a setHealth da fuori Level9Content
    const healthSetterRef = React.useRef(null);

    // -------------------------------------------------------------------------
    // INFO PANELS - Story & Hints
    // -------------------------------------------------------------------------
    const infoPanels = {
        intro: t.hints.intro,
        suspicious_email: t.hints.suspicious,
        mitm_detected: t.hints.mitm,
        crypto_explanation: t.hints.crypto,
        fix_instructions: t.hints.fix,
        victory_message: t.hints.victory
    };

    // -------------------------------------------------------------------------
    // MOCK DATA
    // -------------------------------------------------------------------------

    const mockEmails = [
        {
            id: 1,
            from: "hr@cybershield-corp.com",
            timestamp: "10:15 AM",
            subject: t.emails.hr.subject,
            preview: t.emails.hr.preview,
            isPhishing: false, // Non è phishing classico, è social engineering
            body: t.emails.hr.body,
            hasAttachment: false,
            explanation: t.emails.hr.explanation,
            read: false,
            flagged: null
        },
        {
            id: 2,
            from: "security-alerts@cybershield-corp.com",
            timestamp: "09:30 AM",
            subject: t.emails.security.subject,
            preview: t.emails.security.preview,
            isPhishing: false,
            body: t.emails.security.body,
            hasAttachment: false,
            explanation: t.emails.security.explanation,
            read: true,
            flagged: null
        }
    ];

    const [siemLogs, setSiemLogs] = useState([
        { id: 1, time: '09:00:00', type: 'INFO', source: 'Firewall', message: t.logs.system, severity: 'low', threat: false, protocol: 'SYSTEM', bytes: 128 },
        { id: 2, time: '09:15:22', type: 'INFO', source: 'AuthServer', message: t.logs.auth, severity: 'low', threat: false, protocol: 'HTTPS', bytes: 256 },
        { id: 3, time: '09:45:10', type: 'WARNING', source: 'EmailServer', message: t.logs.email, severity: 'medium', threat: false, protocol: 'SMTP', bytes: 512 },
    ]);

    const [networkTraffic, setNetworkTraffic] = useState({ incoming: 12.5, outgoing: 8.2 });
    const [protocols, setProtocols] = useState({ http: 45, https: 120, ssh: 12, smtp: 35 });
    const [trafficHistory, setTrafficHistory] = useState([
        { time: 0, incoming: 10.5, outgoing: 7.2 },
        { time: 1, incoming: 11.8, outgoing: 7.8 },
        { time: 2, incoming: 12.5, outgoing: 8.2 }
    ]);
    const [selectedLog, setSelectedLog] = useState(null);
    const [blockedIPs, setBlockedIPs] = useState(0);

    // Code Editor state
    const [codeFiles, setCodeFiles] = useState({
        'mail_server.py': {
            name: 'mail_server.py',
            size: '2.4 KB',
            content: t.files.mail_server
        }
    });

    const [expectedFixedCode] = useState(`# CyberShield Mail Server - Encryption Module
# Version: 2.2.0
# Last Updated: 2024-01-25

from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import base64

# ✅ SICURO: Configurazione crittografia aggiornata
ENCRYPTION_ALGORITHM = "AES-256"

# Chiave di crittografia sicura (256 bit)
ENCRYPTION_KEY = get_random_bytes(32)

def encrypt_message(message):
    """
    Cripta i messaggi email per la trasmissione sicura.
    Utilizza AES-256 per massima sicurezza.
    """
    cipher = AES.new(ENCRYPTION_KEY, AES.MODE_GCM)
    
    # Padding del messaggio a multipli di 16 byte
    padded_message = message + (16 - len(message) % 16) * ' '
    
    ciphertext, tag = cipher.encrypt_and_digest(padded_message.encode())
    return base64.b64encode(cipher.nonce + tag + ciphertext).decode()

def decrypt_message(encrypted_message):
    """
    Decripta i messaggi email ricevuti.
    """
    decoded = base64.b64decode(encrypted_message)
    nonce = decoded[:16]
    tag = decoded[16:32]
    ciphertext = decoded[32:]
    
    cipher = AES.new(ENCRYPTION_KEY, AES.MODE_GCM, nonce=nonce)
    decrypted = cipher.decrypt_and_verify(ciphertext, tag)
    
    return decrypted.decode().strip()

def send_secure_email(recipient, subject, body):
    """
    Invia un'email crittografata.
    """
    encrypted_body = encrypt_message(body)
    # ... resto della logica di invio
    pass

# Server initialization
if __name__ == "__main__":
    print("Mail Server avviato con crittografia", ENCRYPTION_ALGORITHM)
    print("Chiave configurata: [SECURE - 256 bit]")
`);

    // -------------------------------------------------------------------------
    // EVENT HANDLERS
    // -------------------------------------------------------------------------

    // Email read handler
    const handleEmailRead = (email) => {
        if (email.id === 1 && !emailRead) {
            setEmailRead(true);
            setGamePhase('suspicious_email');
            setCurrentHint(infoPanels.suspicious_email);

            // Add MITM attack warning to SIEM after a delay
            setTimeout(() => {
                setSiemLogs(prev => [...prev, {
                    id: prev.length + 1,
                    time: new Date().toLocaleTimeString('it-IT'),
                    type: 'CRITICAL',
                    source: 'IDS-Core',
                    message: t.logs.mitm,
                    severity: 'critical',
                    threat: true,
                    protocol: 'SMTP',
                    bytes: 8192
                }]);
                setNetworkTraffic({ incoming: 45.8, outgoing: 2.5 });
            }, 3000);
        }
    };

    // SIEM log click handler
    const handleLogClick = (log) => {
        setSelectedLog(log);

        if (log.threat && log.severity === 'critical' && !siemChecked) {
            setSiemChecked(true);
            setGamePhase('mitm_detected');
            setCurrentHint(infoPanels.mitm_detected);

            // Award star for detecting the threat
            setStars(prev => Math.min(3, prev + 1));

            // Show crypto explanation after delay (25 seconds to let player read MITM alert)
            setTimeout(() => {
                setGamePhase('code_review');
                setCurrentHint(infoPanels.crypto_explanation);
            }, 25000);

            // Show fix instructions after crypto explanation (40 seconds total)
            setTimeout(() => {
                setCurrentHint(infoPanels.fix_instructions);
            }, 40000);
        }
    };

    // Code save handler
    const handleCodeSave = (code, fileKey) => {
        // Check if ALL occurrences of DES have been replaced with AES
        const noDESAnywhere = !code.includes('DES');
        const hasAES = code.includes('AES');

        if (noDESAnywhere && hasAES) {
            setCodeFixed(true);
            setGamePhase('terminal_build');

            // Award second star for replacing all DES with AES
            setStars(prev => Math.min(3, prev + 1));
            setCurrentHint(t.hints.success);

            // Apply damage reduction for fixing vulnerability (restore some health)
            if (healthSetterRef.current) {
                // Restore 10% health but respect max time constraint logic
                // Actually, if we just add 10, the next timer tick will overwrite it?
                // No, timer check runs often but only sets health based on time.
                // Wait, if I set health here based on +10, and then the next second the timer effect runs, it will reset health to time-based value.
                // In Level 8, time-based health is authoritative.
                // So healing is effectively increasing remaining TIME.
                setSecondsRemaining(t => Math.min(MAX_TIME, t + 30)); // Heal = Add 30 seconds
            }
        } else {
            // Provide feedback about what's missing
            if (!hasAES) {
                setCurrentHint(t.hints.failAES);
            } else if (!noDESAnywhere) {
                setCurrentHint(t.hints.failDES);
            }

            // Small damage for wrong attempt = lose time
            if (healthSetterRef.current) {
                setSecondsRemaining(t => Math.max(0, t - 15)); // Damage = Lose 15 seconds
            }
        }
    };

    // Terminal command handler
    const terminalCommands = {
        help: () => t.terminal.help,

        status: () => {
            if (levelState === 'victory') {
                // Award third star for checking status after victory
                if (stars < 3) {
                    setStars(3);
                }
                return t.terminal.status.win;
            } else if (buildCompleted) {
                return t.terminal.status.built;
            } else if (codeFixed) {
                return t.terminal.status.fixed;
            } else {
                return t.terminal.status.vuln;
            }
        },

        build: (args) => {
            if (args[0] === 'mail_server') {
                if (!codeFixed) {
                    return t.terminal.build.error;
                }

                // Simulate build process
                setTimeout(() => {
                    setBuildCompleted(true);
                    setCurrentHint(t.terminal.build.hint);
                }, 1000);

                return t.terminal.build.success;
            }
            return t.terminal.build.usage;
        },

        update: (args) => {
            if (args[0] === 'mail_server') {
                if (!buildCompleted) {
                    return t.terminal.update.error;
                }

                // Victory! (third star will be awarded on 'status' command)
                setLevelState('victory');
                setCurrentHint(t.terminal.update.successHint);

                return t.terminal.update.output;
            }
            return t.terminal.update.usage;
        },

        clear: () => null,
    };

    // -------------------------------------------------------------------------
    // EFFECTS
    // -------------------------------------------------------------------------

    // Removed manual damage over time effect (now handled by timer health synchronization)

    // Traffic simulation
    useEffect(() => {
        const trafficInterval = setInterval(() => {
            setNetworkTraffic(prev => {
                const newIncoming = parseFloat((parseFloat(prev.incoming) + Math.random() * 2 - 1).toFixed(1));
                const newOutgoing = parseFloat((parseFloat(prev.outgoing) + Math.random() * 1).toFixed(1));

                setTrafficHistory(history => {
                    const newHistory = [...history, {
                        time: history.length,
                        incoming: newIncoming,
                        outgoing: newOutgoing
                    }];
                    return newHistory.slice(-10);
                });

                return {
                    incoming: Math.max(0, newIncoming),
                    outgoing: Math.max(0, newOutgoing)
                };
            });
        }, 2000);

        return () => clearInterval(trafficInterval);
    }, []);

    // -------------------------------------------------------------------------
    // RENDER
    // -------------------------------------------------------------------------

    const emailConfig = {
        emails: mockEmails,
        showFeedbackPopup: false
    };

    const siemConfig = {
        logs: siemLogs,
        blockedIPs,
        currentStep: gamePhase === 'email_arrived' ? 0 : gamePhase === 'suspicious_email' ? 1 : gamePhase === 'mitm_detected' ? 2 : 3,
        trafficHistory,
        networkTraffic,
        protocols,
        selectedLog,
        onLogClick: handleLogClick
    };

    const codeEditorConfig = {
        files: codeFiles,
        onSave: handleCodeSave,
        language: 'python'
    };

    const terminalConfig = {
        initialHistory: t.terminal.initialHistory,
        commands: terminalCommands,
        currentDir: '/var/cybershield'
    };

    return (
        <LevelTemplate
            initialHealth={100}
            enableHealthDecay={false}
            stars={stars}
            hint={<InfoPanel text={currentHint} />}
            siemConfig={siemConfig}
            emailConfig={emailConfig}
            terminalConfig={terminalConfig}
            codeEditorConfig={codeEditorConfig}
            onEmailRead={handleEmailRead}
        >
            <Level9Content
                levelState={levelState}
                gamePhase={gamePhase}
                startTime={startTime}
                stars={stars}
                navigate={navigate}
                healthSetterRef={healthSetterRef}
                secondsRemaining={secondsRemaining}
                setSecondsRemaining={setSecondsRemaining}
            />
        </LevelTemplate>
    );
};

export default Level9;
