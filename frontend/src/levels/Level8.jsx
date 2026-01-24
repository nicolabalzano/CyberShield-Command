import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate, { useLevel } from '../components/LevelTemplate';
import Timer from '../components/Timer';
import PacketAnalyzer from '../components/PacketAnalyzer';
import RansomwareOverlay from '../components/RansomwareOverlay';
import InfoPanel from '../components/InfoPanel';
import MissionDebrief from '../components/MissionDebrief';

const Level8 = () => {
    // -------------------------------------------------------------------------
    // LEVEL CONFIGURATION & STATE
    // -------------------------------------------------------------------------
    const navigate = useNavigate();
    
    // Level State: 'briefing', 'infected', 'emergency_mode', 'decrypted', 'victory'
    const [levelState, setLevelState] = useState('briefing');
    const [ransomwareActive, setRansomwareActive] = useState(false);
    const [ransomwareVisible, setRansomwareVisible] = useState(true); // Toggle visibility
    const [killSwitchActivated, setKillSwitchActivated] = useState(false); // Show button only after Ctrl+Alt+K
    const [passwordFound, setPasswordFound] = useState(false);
    const [attempts, setAttempts] = useState(0); // for precision star
    const [startTime] = useState(Date.now());
    const [endTime, setEndTime] = useState(null);

    // Consolidated Timer State (5 minutes)
    const MAX_TIME = 300;
    const [secondsRemaining, setSecondsRemaining] = useState(MAX_TIME);
    const [lastDecreaseTime, setLastDecreaseTime] = useState(0);

    // Initial Hint
    const [currentHint, setCurrentHint] = useState("Posta in arrivo: Rapporto attività sospette. Controlla la tua email per i Protocolli di Emergenza.");

    // Ref per accedere a setHealth da fuori Level8Content
    const healthSetterRef = React.useRef(null);

    // -------------------------------------------------------------------------
    // DATA MOCKS
    // -------------------------------------------------------------------------
    
    // Mock Packets
    const mockPackets = [
        { id: 1, time: '10:00:01', source: '192.168.1.50', destination: '8.8.8.8', protocol: 'UDP', info: 'Query standard 0x1234 A www.google.com', payload: '', payloadHex: '' },
        { id: 2, time: '10:00:02', source: '192.168.1.50', destination: '172.217.16.196', protocol: 'TCP', info: '443 -> 49152 [ACK] Seq=1 Ack=1 Win=65535 Len=0', payload: '', payloadHex: '' },
        { id: 3, time: '10:01:15', source: '145.2.33.11', destination: '192.168.1.105', protocol: 'HTTP', info: 'GET /downloads/cryptolocker_v2.exe HTTP/1.1', payload: 'GET /downloads/cryptolocker_v2.exe HTTP/1.1\r\nHost: malicious-server.com\r\nUser-Agent: Mozilla/5.0\r\n\r\n', payloadHex: '47 45 54 20 2F 64 6F 77 ...' },
        { id: 4, time: '10:01:16', source: '192.168.1.105', destination: '145.2.33.11', protocol: 'HTTP', info: '200 OK (application/x-msdownload)', payload: 'MZ......................@.............................................!..L.!This program cannot be run in DOS mode....', payloadHex: '4D 5A 90 00 03 00 00 00 ...' },
        { id: 5, time: '10:02:00', source: '192.168.1.105', destination: '192.168.1.255', protocol: 'UDP', info: 'Porta sorgente: 137  Porta destinazione: 137', payload: '', payloadHex: '' },
    ];

    // Mock SIEM Logs
    const mockLogs = [
        { id: 1, timestamp: '10:00:01', severity: 'low', source: 'Firewall', message: 'Connessione in uscita consentita TCP 443' },
        { id: 2, timestamp: '10:01:15', severity: 'critical', source: 'IDS', message: 'Rilevato download di file sospetto da 145.2.33.11' },
        { id: 3, timestamp: '10:01:16', severity: 'high', source: 'Antivirus', message: 'Scansione firma saltata per cryptolocker_v2.exe (Override Policy)' },
    ];
    
    // Mock Emails
    const mockEmails = [
        {
            id: 101,
            from: "ciso@cybershield.com",
            timestamp: "09:45 AM",
            subject: "URGENTE: Aggiornamento Protocolli Risposta Incidenti",
            preview: "Stiamo notando un aumento dell'attività ransomware...",
            isPhishing: false,
            body: `Gentile Team,\n\nStiamo notando un aumento dell'attività ransomware verso il nostro settore.\nSiete pregati di rivedere immediatamente il Manuale di Risposta agli Incidenti.\n\nPROCEDURA DI EMERGENZA PER RANSOMWARE:\n1. NON spegnere la macchina (la crittografia potrebbe corrompere i file).\n2. Se lo schermo è bloccato, utilizzare la sequenza di interruzione hardware: Ctrl + Alt + K.\n3. Isolare il segmento di rete.\n4. Identificare il vettore e la chiave di decrittazione.\n\nRestate vigili.`,
            hasAttachment: false,
            explanation: "Avviso di sicurezza legittimo dal CISO.",
            read: false,
            flagged: null
        },
        {
            id: 102,
            from: "hr@cybershield.com",
            timestamp: "09:30 AM",
            subject: "Revisioni Trimestrali delle Performance",
            preview: "Solo un promemoria che le revisioni inizieranno...",
            isPhishing: false,
            body: "Solo un promemoria che le revisioni inizieranno la prossima settimana. Per favore preparate la vostra autovalutazione.",
            hasAttachment: false,
            explanation: "Email HR di routine.",
            read: false,
            flagged: null
        }
    ];

    // Mock Files for Terminal & RE

    const mockFiles = {
        'cryptolocker_v2.exe': {
            name: 'cryptolocker_v2.exe',
            c: `
// Codice decompilato per cryptolocker_v2.exe
// ...headers omessi...

void main() {
    char* target_dir = "C:\\Documents";
    encrypt_files(target_dir);
}

void encrypt_files(char* dir) {
    // Logica di Crittografia
    // Utilizzo AES-256
    char* key = generate_key();
    // ...
}

bool check_unlock_code(char* input) {
    // Backdoor nascosta per test dev
    char* master_key = "N0Ransom4U!"; 
    if (strcmp(input, master_key) == 0) {
        decrypt_all();
        return true;
    }
    return false;
}
            `,
            asm: `
00401000  PUSH EBP
00401001  MOV EBP, ESP
...
00401050  MOV EAX, [EBP+8] ; input
00401054  MOV ECX, 00403000 ; "N0Ransom4U!"
00401059  CALL 00401200 ; strcmp
0040105E  TEST EAX, EAX
00401060  JZ 00401080 ; jump if equal
...
            `
        }
    };

    // -------------------------------------------------------------------------
    // EVENT HANDLERS
    // -------------------------------------------------------------------------

    const handlePasswordSubmit = (inputPassword) => {
        if (inputPassword === "N0Ransom4U!") {
            setLevelState('victory');
            setRansomwareActive(false);
        } else {
            setAttempts(prev => prev + 1);
            // Penalità: -30 secondi e danno proporzionale alla salute (10% = 30s/300s)
            setSecondsRemaining(t => Math.max(0, t - 30));
            if (healthSetterRef.current) {
                healthSetterRef.current(h => Math.max(0, h - 10));
            }
        }
    };

    // KILL SWITCH HANDLER (Ctrl+Alt+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.altKey && (e.key === 'k' || e.key === 'K')) {
                if (levelState === 'infected') {
                    setLevelState('emergency_mode');
                    setRansomwareActive(true); // Keep overlay active but allow hiding
                    setRansomwareVisible(false); // Hide it initially after kill switch
                    setKillSwitchActivated(true); // Enable taskbar button
                    setCurrentHint("Ottimo! Processo Terminato. Ora indaga sui log (SIEM) per trovare l'IP sorgente.");
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [levelState]);

    // RANSOMWARE TRIGGER (30s Timer)
    useEffect(() => {
        if (levelState === 'briefing') {
            const timer = setTimeout(() => {
                setLevelState('infected');
                setRansomwareActive(true);
                setCurrentHint("SISTEMA COMPROMESSO! Trova l'override manuale! (Suggerimento: Il Manuale di Emergenza dice Ctrl+Alt+K per disabilitare l'interfaccia di rete e avviare l'indagine.)");
            }, 30000); // 30 seconds
            return () => clearTimeout(timer);
        }
    }, [levelState]);

    // -------------------------------------------------------------------------
    // RENDER CONTENT
    // -------------------------------------------------------------------------

    const Level8Content = () => {
        const { health, setHealth } = useLevel();
        const [showDebrief, setShowDebrief] = useState(false);
        const [isWin, setIsWin] = useState(false);
        const [finalStats, setFinalStats] = useState({ stars: 0, health: 0 });
        
        // Assegno setHealth al ref per renderlo accessibile fuori
        React.useEffect(() => {
            healthSetterRef.current = setHealth;
        }, [setHealth]);
        
        // This useEffect handles the shared timer logic
        useEffect(() => {
            if (levelState === 'victory' || levelState === 'briefing') return; // Don't count down during briefing or after win

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
        }, [levelState, setHealth]);

        // Separate effect to update health based on time remaining
        useEffect(() => {
            if (levelState === 'victory' || levelState === 'briefing') return;
            
            // Calculate health based on remaining time (linear decrease)
            // 300s = 100%, 0s = 0%
            const healthPercentage = Math.floor((secondsRemaining / MAX_TIME) * 100);
            setHealth(Math.max(0, healthPercentage));
        }, [secondsRemaining, levelState, setHealth]);

        // HANDLE WIN/LOSS
        useEffect(() => {
            // LOSS Condition
            if (health <= 0 && !showDebrief && levelState !== 'victory') {
                setIsWin(false);
                setFinalStats({ stars: 0, health: 0 });
                setShowDebrief(true);
            }
            
            // WIN Condition
            if (levelState === 'victory' && !showDebrief) {
                 const duration = (Date.now() - startTime) / 1000;
                 let stars = 1; 
                 if (duration < 150) stars++; // Speed run
                 if (attempts === 0) stars++; // Precision
                 
                 setIsWin(true);
                 setFinalStats({ stars, health });
                 setShowDebrief(true);
            }
        }, [health, levelState, showDebrief]);

        return (
            <>
                {showDebrief && (
                    <MissionDebrief 
                        success={isWin}
                        stats={finalStats}
                        recapText={isWin 
                            ? "Ottimo lavoro. Hai intercettato con successo l'attacco ransomware, identificato la sorgente tramite l'analisi dei pacchetti e recuperato la chiave di decrittazione."
                            : "Missione Fallita. Il ransomware ha crittografato i sistemi critici prima che tu potessi implementare la contromisura."
                        }
                        onRetry={() => window.location.reload()}
                        onExit={() => navigate('/')}
                    />
                )}
                {/* TIMER & HUD */}
                <div className="absolute top-[22%] left-[16.5%] z-[100] pointer-events-none transform scale-90">
                     <Timer secondsRemaining={secondsRemaining} />
                </div>
            </>
        );
    };

    // -------------------------------------------------------------------------
    // APP CONFIGURATIONS
    // -------------------------------------------------------------------------

    const siemConfig = {
        logs: mockLogs
    };

    const emailConfig = {
        emails: mockEmails
    };

    // File system structure
    const fileSystem = {
        'home': {
            'user': {
                'downloads': {
                    'cryptolocker_v2.exe': { type: 'file', content: '(Binary content - executable file)' }
                },
                'documents': {
                    'secret_plans.txt': { type: 'file', content: 'Nothing here.' },
                    'README_DECRYPT.txt': { type: 'file', content: 'YOUR FILES HAVE BEEN ENCRYPTED!\nTo recover your data, you must enter the decryption key.\nContact: darkweb@anonymous.onion' }
                },
                'desktop': {
                    'URGENT_READ_ME.txt': { type: 'file', content: '⚠️ RANSOMWARE ALERT ⚠️\nAll your files are encrypted.\nFollow instructions in documents/README_DECRYPT.txt' }
                },
                '.malware': {
                    'persistence.sh': { type: 'file', content: '#!/bin/bash\n# Auto-start script\n/home/user/downloads/cryptolocker_v2.exe &' }
                }
            }
        }
    };

    const terminalConfig = {
        currentDir: '/',
        commands: {
            cd: (args, fullCommand, context) => {
                if (!args[0]) {
                    context.currentDir = '/';
                    return null;
                }
                
                const target = args[0];
                const fs = fileSystem;
                
                // Handle absolute paths
                if (target.startsWith('/')) {
                    const parts = target.split('/').filter(p => p);
                    let current = fs;
                    let validPath = true;
                    
                    for (const part of parts) {
                        if (current[part] && current[part].type !== 'file') {
                            current = current[part];
                        } else if (current[part] && current[part].type === 'file') {
                            return `cd: ${target}: Not a directory`;
                        } else {
                            validPath = false;
                            break;
                        }
                    }
                    
                    if (validPath) {
                        context.currentDir = target;
                        return null;
                    } else {
                        return `cd: ${target}: No such file or directory`;
                    }
                }
                
                // Handle relative paths
                const currentParts = context.currentDir.split('/').filter(p => p);
                
                if (target === '..') {
                    if (currentParts.length > 0) {
                        currentParts.pop();
                        context.currentDir = '/' + currentParts.join('/');
                        if (context.currentDir === '/') context.currentDir = '/';
                    }
                    return null;
                } else if (target === '.') {
                    return null;
                }
                
                // Handle multi-level relative paths (e.g., home/user)
                const targetParts = target.split('/').filter(p => p);
                
                // Navigate from current directory
                let current = fs;
                if (context.currentDir !== '/') {
                    for (const part of currentParts) {
                        if (current[part]) current = current[part];
                    }
                }
                
                // Try to navigate through target parts
                const newPath = [...currentParts];
                for (const part of targetParts) {
                    if (current[part] && current[part].type !== 'file') {
                        current = current[part];
                        newPath.push(part);
                    } else if (current[part] && current[part].type === 'file') {
                        return `cd: ${target}: Not a directory`;
                    } else {
                        return `cd: ${target}: No such file or directory`;
                    }
                }
                
                context.currentDir = '/' + newPath.join('/');
                return null;
            },
            ls: (args, fullCommand, context) => {
                const path = args[0] || '.';
                const fs = fileSystem;
                const currentDir = context.currentDir || '/';
                
                // Helper function to get current location
                const getCurrentLocation = () => {
                    if (currentDir === '/') {
                        return fs;
                    }
                    const parts = currentDir.split('/').filter(p => p);
                    let current = fs;
                    for (const part of parts) {
                        if (current[part]) current = current[part];
                    }
                    return current;
                };
                
                let targetPath;
                
                if (path === '.' || path === './') {
                    targetPath = getCurrentLocation();
                } else if (path.startsWith('/')) {
                    // Absolute path
                    if (path === '/') {
                        targetPath = fs;
                    } else {
                        const parts = path.split('/').filter(p => p);
                        targetPath = fs;
                        for (const part of parts) {
                            if (targetPath[part]) {
                                targetPath = targetPath[part];
                            } else {
                                return `ls: cannot access '${path}': No such file or directory`;
                            }
                        }
                    }
                } else {
                    // Relative path
                    const current = getCurrentLocation();
                    if (current[path]) {
                        targetPath = current[path];
                    } else {
                        return `ls: cannot access '${path}': No such file or directory`;
                    }
                }
                
                if (!targetPath) {
                    return `ls: cannot access '${path}': No such file or directory`;
                }
                
                // List contents
                const items = Object.keys(targetPath).map(key => {
                    const item = targetPath[key];
                    if (item.type === 'file') {
                        return key;
                    } else {
                        return key + '/';
                    }
                });
                
                return items.length > 0 ? items.join('  ') : '';
            },
            cat: (args, fullCommand, context) => {
                if (!args[0]) {
                    return 'cat: missing file operand';
                }
                
                const fileName = args[0];
                const fs = fileSystem;
                const currentDir = context.currentDir || '/';
                
                // Get current location
                let current = fs;
                if (currentDir !== '/') {
                    const parts = currentDir.split('/').filter(p => p);
                    for (const part of parts) {
                        if (current[part]) current = current[part];
                    }
                }
                
                // Check in current directory first
                if (current[fileName] && current[fileName].type === 'file') {
                    return current[fileName].content;
                }
                
                // Search in subdirectories if not found
                const searchInDir = (dir) => {
                    for (const key in dir) {
                        if (key === fileName && dir[key].type === 'file') {
                            return dir[key].content;
                        }
                        if (dir[key].type !== 'file') {
                            const result = searchInDir(dir[key]);
                            if (result) return result;
                        }
                    }
                    return null;
                };
                
                const result = searchInDir(current);
                if (result) return result;
                
                return `cat: ${fileName}: No such file or directory`;
            },
            pwd: (args, fullCommand, context) => {
                return context.currentDir || '/';
            }
        }
    };

    const packetAnalyzerConfig = {
        packets: mockPackets
    };

    const ransomwareOverlayConfig = {
        isActive: ransomwareActive,
        isVisible: ransomwareVisible,
        killSwitchActivated: killSwitchActivated,
        onPasswordSubmit: handlePasswordSubmit,
        secondsRemaining: secondsRemaining,
        onToggleVisibility: () => setRansomwareVisible(!ransomwareVisible)
    };

    return (
        <LevelTemplate 
            initialHealth={100} 
            hint={<InfoPanel text={currentHint} />}
            siemConfig={siemConfig}
            emailConfig={emailConfig}
            terminalConfig={terminalConfig}
            revEngConfig={{ files: mockFiles }}
            // Packet Analyzer available only in emergency mode (after kill switch) or simply always available but user needs to open it
            packetAnalyzerConfig={levelState === 'emergency_mode' || levelState === 'decrypted' ? packetAnalyzerConfig : null}
            ransomwareOverlayConfig={ransomwareOverlayConfig}
        >
            <Level8Content />
        </LevelTemplate>
    );
};

export default Level8;