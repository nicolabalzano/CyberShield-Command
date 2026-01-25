import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate, { useLevel } from '../components/LevelTemplate';
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
                        ? `VULNERABILITÀ CORRETTA: DES con Chiavi Deboli

Il DES (Data Encryption Standard) è un algoritmo di crittografia obsoleto con chiavi a 56 bit, facilmente violabile con attacchi brute-force moderni.

Le "Weak Keys" del DES sono 4 chiavi speciali (come 0x0101010101010101) che producono sottochavi identiche durante il processo di cifratura. Questo significa che:
• Cifrare due volte equivale a decifrare
• Gli attaccanti possono predire pattern crittografici
• Gli attacchi Man-in-the-Middle diventano banali

Hai sostituito DES con AES-256, un algoritmo moderno con chiavi a 256 bit, rendendo il sistema sicuro contro questi attacchi.`
                        : "Missione Fallita. La vulnerabilità crittografica non è stata corretta in tempo. Gli attaccanti hanno sfruttato le chiavi deboli del DES per intercettare e decifrare le comunicazioni del server email."
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

    const [levelState, setLevelState] = useState('playing');
    const [gamePhase, setGamePhase] = useState('email_arrived'); // email_arrived -> siem_check -> code_review -> fix_code -> terminal_build -> victory
    const [startTime] = useState(Date.now());
    const [stars, setStars] = useState(0);

    // Timer State (5 minutes)
    const MAX_TIME = 300;
    const [secondsRemaining, setSecondsRemaining] = useState(MAX_TIME);

    // Hint system
    const [currentHint, setCurrentHint] = useState("Hai ricevuto una nuova email dall'HR. Controlla la tua casella di posta elettronica.");

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
        intro: "Hai ricevuto una nuova email dall'HR. Sembra urgente... Apri la tua casella Email per leggerla.",
        suspicious_email: "Questa email sembra sospetta! Il reparto HR non chiederebbe mai di disabilitare i firewall. Potrebbe essere un tentativo di social engineering. Controlla il SIEM per verificare eventuali attività anomale.",
        mitm_detected: "ALLARME! Il SIEM ha rilevato un attacco Man-in-the-Middle (MITM)! Qualcuno sta intercettando le comunicazioni. Questo potrebbe essere collegato alla richiesta sospetta nell'email. Dovremmo controllare il codice del server email.",
        crypto_explanation: "Il DES (Data Encryption Standard) è un algoritmo obsoleto e vulnerabile. Le 'weak keys' del DES producono chiavi identiche dopo il processo di generazione, rendendo la crittografia prevedibile. Apri il Code Editor per esaminare e correggere il codice.",
        fix_instructions: "Nel Code Editor, sostituisci l'algoritmo DES con AES-256. Cambia anche la chiave debole con una chiave sicura generata casualmente, puoi usare get_random_bytes(). Dopo vai nel Terminal per fare il build e aggiornare il server.",
        //terminal_instructions: "Nel Terminal, esegui i seguenti comandi:\n1. build mail_server\n2. update mail_server\n\nQuesto ricompilerà il server email con la nuova crittografia sicura.",
        victory_message: "SISTEMA AGGIORNATO! Hai corretto con successo la vulnerabilità crittografica. Il server email ora utilizza AES-256, un algoritmo molto più sicuro del DES obsoleto."
    };

    // -------------------------------------------------------------------------
    // MOCK DATA
    // -------------------------------------------------------------------------

    const mockEmails = [
        {
            id: 1,
            from: "hr@cybershield-corp.com",
            timestamp: "10:15 AM",
            subject: "URGENTE: Disabilitare tutti i Firewall",
            preview: "Per manutenzione programmata, si richiede di disabilitare tutti i firewall...",
            isPhishing: false, // Non è phishing classico, è social engineering
            body: `Gentile Team IT,

Per manutenzione programmata del sistema, si richiede di disabilitare IMMEDIATAMENTE tutti i firewall aziendali.

Questa operazione è necessaria per permettere l'aggiornamento dei server principali. Una volta completata la manutenzione (circa 2 ore), potrete riattivare le protezioni.

ISTRUZIONI:
1. Accedere al pannello di controllo del firewall
2. Disabilitare tutte le regole di blocco
3. Confermare via email l'avvenuta disabilitazione

Questa richiesta proviene direttamente dalla Direzione.

Cordiali saluti,
HR Department
CyberShield Corp`,
            hasAttachment: false,
            explanation: "Email sospetta: l'HR non dovrebbe mai richiedere la disabilitazione dei firewall.",
            read: false,
            flagged: null
        },
        {
            id: 2,
            from: "security-alerts@cybershield-corp.com",
            timestamp: "09:30 AM",
            subject: "Report Settimanale Sicurezza",
            preview: "Riepilogo delle attività di sicurezza della settimana...",
            isPhishing: false,
            body: `Report Settimanale Sicurezza - CyberShield Corp

Riepilogo attività:
- 0 minacce rilevate
- 15 tentativi di accesso bloccati
- Sistema operativo al 100%

Prossimo report: Lunedì prossimo.`,
            hasAttachment: false,
            explanation: "Email legittima di routine.",
            read: true,
            flagged: null
        }
    ];

    const [siemLogs, setSiemLogs] = useState([
        { id: 1, time: '09:00:00', type: 'INFO', source: 'Firewall', message: 'Sistema avviato correttamente', severity: 'low', threat: false, protocol: 'SYSTEM', bytes: 128 },
        { id: 2, time: '09:15:22', type: 'INFO', source: 'AuthServer', message: 'Autenticazione utente riuscita: admin@cybershield', severity: 'low', threat: false, protocol: 'HTTPS', bytes: 256 },
        { id: 3, time: '09:45:10', type: 'WARNING', source: 'EmailServer', message: 'Connessione inusuale rilevata su porta 25', severity: 'medium', threat: false, protocol: 'SMTP', bytes: 512 },
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
            content: `# CyberShield Mail Server - Encryption Module
# Version: 2.1.3
# Last Updated: 2024-01-15

from Crypto.Cipher import DES
import base64

# Configurazione crittografia
ENCRYPTION_ALGORITHM = "DES"

# Chiave di crittografia per le comunicazioni
ENCRYPTION_KEY = b"\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01"

def encrypt_message(message):
    """
    Cripta i messaggi email per la trasmissione sicura.
    Utilizza DES per compatibilità con sistemi legacy.
    """
    cipher = DES.new(ENCRYPTION_KEY, DES.MODE_ECB)
    
    # Padding del messaggio a multipli di 8 byte
    padded_message = message + (8 - len(message) % 8) * ' '
    
    encrypted = cipher.encrypt(padded_message.encode())
    return base64.b64encode(encrypted).decode()

def decrypt_message(encrypted_message):
    """
    Decripta i messaggi email ricevuti.
    """
    cipher = DES.new(ENCRYPTION_KEY, DES.MODE_ECB)
    
    decoded = base64.b64decode(encrypted_message)
    decrypted = cipher.decrypt(decoded)
    
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
    print("Chiave configurata: [REDACTED]")
`
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
                    message: '🚨 ATTACCO MITM RILEVATO! Intercettazione comunicazioni su canale SMTP. IP sospetto: 198.51.100.42',
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
            setCurrentHint("Ottimo! Hai sostituito DES con AES. Ora vai nel Terminal ed esegui: build mail_server e poi update mail_server");

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
                setCurrentHint("Il codice non è ancora corretto. Devi sostituire tutte le occorrenze di DES con AES.");
            } else if (!noDESAnywhere) {
                setCurrentHint("Quasi! Ci sono ancora occorrenze di DES nel codice. Sostituiscile tutte con AES.");
            }

            // Small damage for wrong attempt = lose time
            if (healthSetterRef.current) {
                setSecondsRemaining(t => Math.max(0, t - 15)); // Damage = Lose 15 seconds
            }
        }
    };

    // Terminal command handler
    const terminalCommands = {
        help: () => "Comandi disponibili: help, build, update, status, clear",

        status: () => {
            if (levelState === 'victory') {
                // Award third star for checking status after victory
                if (stars < 3) {
                    setStars(3);
                }
                return "✅ Mail Server: ONLINE (AES-256)\n   Stato: Sicuro\n   Vulnerabilità: 0\n\n🏆 Complimenti! Sistema completamente sicuro!";
            } else if (buildCompleted) {
                return "✅ Mail Server: ONLINE (AES-256)\n   Stato: Sicuro\n   Vulnerabilità: 0";
            } else if (codeFixed) {
                return "⚠️ Mail Server: ONLINE (DES - VULNERABILE)\n   Stato: Richiede rebuild\n   Vulnerabilità: 1 CRITICA";
            } else {
                return "🔴 Mail Server: ONLINE (DES - VULNERABILE)\n   Stato: A rischio\n   Vulnerabilità: 1 CRITICA";
            }
        },

        build: (args) => {
            if (args[0] === 'mail_server') {
                if (!codeFixed) {
                    return "❌ Errore: Correggere prima le vulnerabilità nel codice sorgente.\n   Usa il Code Editor per modificare mail_server.py";
                }

                // Simulate build process
                setTimeout(() => {
                    setBuildCompleted(true);
                    setCurrentHint("✅ Build completato! Ora esegui l'update per applicare le modifiche.");
                }, 1000);

                return "🔨 Compilazione mail_server in corso...\n   [====================================] 100%\n✅ Build completato con successo!\n   Output: mail_server_v2.2.0.bin\n   \nEsegui 'update mail_server' per applicare le modifiche.";
            }
            return "Uso: build <nome_servizio>\nEsempio: build mail_server";
        },

        update: (args) => {
            if (args[0] === 'mail_server') {
                if (!buildCompleted) {
                    return "❌ Errore: Eseguire prima 'build mail_server'";
                }

                // Victory! (third star will be awarded on 'status' command)
                setLevelState('victory');
                setCurrentHint("Sistema aggiornato! Esegui 'status' per verificare lo stato finale del server.");

                return `🔄 Aggiornamento mail_server in corso...
   Arresto servizio...          [OK]
   Backup configurazione...     [OK]
   Installazione nuova versione [OK]
   Verifica integrità...        [OK]
   Riavvio servizio...          [OK]

✅ AGGIORNAMENTO COMPLETATO!
   Versione: 2.2.0
   Crittografia: AES-256
   Stato: SICURO

🛡️ La vulnerabilità è stata corretta con successo!`;
            }
            return "Uso: update <nome_servizio>\nEsempio: update mail_server";
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
        initialHistory: [
            '$ CyberShield Security Terminal v3.2.1',
            '$ Digita "help" per la lista dei comandi disponibili',
            '$ Digita "status" per verificare lo stato dei servizi',
            ''
        ],
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
