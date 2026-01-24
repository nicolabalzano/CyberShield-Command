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
    const [currentHint, setCurrentHint] = useState("Incoming Mail: Suspicious activity report. Check your email for Emergency Protocols.");

    // Ref per accedere a setHealth da fuori Level8Content
    const healthSetterRef = React.useRef(null);

    // -------------------------------------------------------------------------
    // DATA MOCKS
    // -------------------------------------------------------------------------
    
    // Mock Packets
    const mockPackets = [
        { id: 1, time: '10:00:01', source: '192.168.1.50', destination: '8.8.8.8', protocol: 'UDP', info: 'Standard query 0x1234 A www.google.com', payload: '', payloadHex: '' },
        { id: 2, time: '10:00:02', source: '192.168.1.50', destination: '172.217.16.196', protocol: 'TCP', info: '443 -> 49152 [ACK] Seq=1 Ack=1 Win=65535 Len=0', payload: '', payloadHex: '' },
        { id: 3, time: '10:01:15', source: '145.2.33.11', destination: '192.168.1.105', protocol: 'HTTP', info: 'GET /downloads/cryptolocker_v2.exe HTTP/1.1', payload: 'GET /downloads/cryptolocker_v2.exe HTTP/1.1\r\nHost: malicious-server.com\r\nUser-Agent: Mozilla/5.0\r\n\r\n', payloadHex: '47 45 54 20 2F 64 6F 77 ...' },
        { id: 4, time: '10:01:16', source: '192.168.1.105', destination: '145.2.33.11', protocol: 'HTTP', info: '200 OK (application/x-msdownload)', payload: 'MZ......................@.............................................!..L.!This program cannot be run in DOS mode....', payloadHex: '4D 5A 90 00 03 00 00 00 ...' },
        { id: 5, time: '10:02:00', source: '192.168.1.105', destination: '192.168.1.255', protocol: 'UDP', info: 'Source port: 137  Destination port: 137', payload: '', payloadHex: '' },
    ];

    // Mock SIEM Logs
    const mockLogs = [
        { id: 1, timestamp: '10:00:01', severity: 'low', source: 'Firewall', message: 'Allowed outbound connection TCP 443' },
        { id: 2, timestamp: '10:01:15', severity: 'critical', source: 'IDS', message: 'Suspicious file download detected from 145.2.33.11' },
        { id: 3, timestamp: '10:01:16', severity: 'high', source: 'Antivirus', message: 'Signature scan skipped for cryptolocker_v2.exe (Policy Override)' },
    ];
    
    // Mock Emails
    const mockEmails = [
        {
            id: 101,
            from: "ciso@cybershield.com",
            timestamp: "09:45 AM",
            subject: "URGENT: Emergency Response Protocols Updated",
            preview: "We are seeing an uptick in ransomware activity...",
            isPhishing: false,
            body: `Dear Team,\n\nWe are seeing an uptick in ransomware activity targeting our sector.\nPlease review the updated Incident Response Manual immediately.\n\nEMERGENCY PROCEDURE FOR RANSOMWARE:\n1. Do NOT power off the machine (encryption may corrupt files).\n2. If your screen is locked, use the hardware interrupt sequence: Ctrl + Alt + K.\n3. Isolate the network segment.\n4. Identify the vector and the decryption key.\n\nStay vigilant.`,
            hasAttachment: false,
            explanation: "Legitimate security alert from CISO.",
            read: false,
            flagged: null
        },
        {
            id: 102,
            from: "hr@cybershield.com",
            timestamp: "09:30 AM",
            subject: "Quarterly Performance Reviews",
            preview: "Just a reminder that reviews are starting...",
            isPhishing: false,
            body: "Just a reminder that reviews are starting next week. Please prepare your self-assessment.",
            hasAttachment: false,
            explanation: "Routine HR email.",
            read: false,
            flagged: null
        }
    ];

    // Mock Files for Terminal & RE

    const mockFiles = {
        'cryptolocker_v2.exe': {
            name: 'cryptolocker_v2.exe',
            c: `
// Decompiled code for cryptolocker_v2.exe
// ...headers omitted...

void main() {
    char* target_dir = "C:\\Documents";
    encrypt_files(target_dir);
}

void encrypt_files(char* dir) {
    // Encryption Logic
    // Using AES-256
    char* key = generate_key();
    // ...
}

bool check_unlock_code(char* input) {
    // Hidden Backdoor for dev testing
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
                    setCurrentHint("Great! Process Killed. Now investigate the logs (SIEM) to find the source IP.");
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
                setCurrentHint("SYSTEM COMPROMISED! Find manual override! (Hint: Emergency Manual says Ctrl+Alt+K to disable network interface and start investigation.)");
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
                    const elapsed = MAX_TIME - newVal;
                    
                    // Decrease health every 30 seconds (10% per tick)
                    if (Math.floor(elapsed / 30) > lastDecreaseTime) {
                        setLastDecreaseTime(Math.floor(elapsed / 30));
                        setHealth(h => Math.max(0, h - 10));
                    }

                    if (newVal <= 0) {
                        setHealth(0); // Game Over
                        clearInterval(interval);
                        return 0;
                    }
                    return newVal;
                });
            }, 1000);

            return () => clearInterval(interval);
        }, [lastDecreaseTime, setHealth]);

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
                            ? "Excellent work. You successfully intercepted the ransomware attack, identified the source via packet analysis, and retrieved the decryption key."
                            : "Mission Failed. The ransomware encrypted critical systems before you could deploy the countermeasure."
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

    const terminalConfig = {
        fileSystem: {
            'home': {
                'user': {
                    'downloads': {
                        'cryptolocker_v2.exe': { type: 'file', content: '(Binary content)' }
                    },
                    'documents': {
                        'secret_plans.txt': { type: 'file', content: 'Nothing here.' }
                    }
                }
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
