import React, { useState, useEffect } from 'react';
import { LevelTemplateContent } from '../components/LevelTemplate';
import { LevelProvider, useLevel } from '../contexts/LevelContext';
import InfoPanel from '../components/InfoPanel';
import MissionDebrief from '../components/MissionDebrief';
import { useNavigate } from 'react-router-dom';

/**
 * LEVEL 3: SQL INJECTION DEFENSE
 * 
 * Scenario educativo:
 * - Il giocatore è un application security analyst
 * - Un'applicazione web ha un endpoint vulnerabile a SQL Injection
 * - Il giocatore deve riconoscere l'attacco, analizzare il codice e mettere in sicurezza
 * 
 * Obiettivi didattici:
 * - Comprendere cos'è una SQL Injection e come si manifesta
 * - Riconoscere pattern di attacco nei log (es: ' OR 1=1 --)
 * - Imparare tecniche di mitigazione (prepared statements, sanitization)
 * - Modificare codice vulnerabile per renderlo sicuro
 */

const Level3Content = () => {
    const { health, damage: takeDamage, heal } = useLevel();
    const [stars, setStars] = useState(0);
    const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
    const navigate = useNavigate();
    
    const addStar = () => setStars(prev => Math.min(prev + 1, 3));

    const [phase, setPhase] = useState(0);
    const [hintIndex, setHintIndex] = useState(0);
    const [visibleHint, setVisibleHint] = useState(null);

    // Codice vulnerabile
    const [files, setFiles] = useState({
        'login.php': {
            name: 'login.php',
            size: '2.4 KB',
            content: `<?php
// Vulnerable Login Endpoint
// TODO: Fix SQL injection vulnerability before production!

function authenticate_user($username, $password) {
    $db = connect_database();
    
    // WARNING: String concatenation makes this vulnerable to SQLi
    $query = "SELECT * FROM users WHERE username='" . $username . "' AND password='" . $password . "'";
    
    $result = mysqli_query($db, $query);
    
    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        create_session($user);
        return true;
    }
    
    return false;
}

// Main login handler
if ($_POST['action'] == 'login') {
    $user = $_POST['username'];
    $pass = $_POST['password'];
    
    if (authenticate_user($user, $pass)) {
        echo json_encode(['status' => 'success', 'redirect' => '/dashboard']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
    }
}
?>`,
            modified: false
        }
    });

    // Log SIEM
    const [logs, setLogs] = useState([
        { id: 1, timestamp: '15:42:15', source: '192.168.1.100', severity: 'low', message: 'User login attempt - username: john.doe', threat: false },
        { id: 2, timestamp: '15:43:18', source: '192.168.1.105', severity: 'low', message: 'Normal search query - keyword: laptop', threat: false },
    ]);

    const [terminalHistory, setTerminalHistory] = useState([
        '$ Application Security Terminal v3.0',
        '$ Monitoring web application...'
    ]);
    // Gestione hint progressivi
    useEffect(() => {
        setHintIndex(0);
    }, [phase]);

    useEffect(() => {
        if (phase === 1) {
            const timer = setInterval(() => {
                setHintIndex(prev => prev + 1);
            }, 15000);
            return () => clearInterval(timer);
        }
    }, [phase]);

    const getHintText = () => {
        switch(phase) {
            case 0: 
                return "Monitora il SIEM. Attendi un alert di sicurezza SQL Injection. Presta attenzione ai log che indicano tentativi di accesso sospetti.";
            case 1:
                const hints = [
                    "Abbiamo rilevato SQL Injection nel login! Apri il CODE VIEWER (icona 📝) e analizza 'login.php' per vedere il codice vulnerabile.",
                    "Il problema è nella funzione 'authenticate_user'. La query concatena direttamente l'input utente senza validazione. Nel TERMINALE usa 'show-vulnerability' per vedere il payload.",
                    "Un attaccante può inserire: admin' OR '1'='1 per bypassare l'autenticazione. Usa il CODE VIEWER per modificare il codice e usare prepared statements.",
                    "Modifica il codice usando prepared statements con bind_param. Nel TERMINALE usa 'compile-code' per compilare il codice corretto e testarlo."
                ];
                return hints[Math.min(hintIndex, hints.length - 1)];
            case 2:
                return "Codice modificato! Nel TERMINALE usa il comando 'test-login' per verificare che la vulnerabilità sia stata risolta. Poi usa 'compile-code' per finalizzare.";
            default:
                return null;
        }
    };

    useEffect(() => {
        const text = getHintText();
        if (text !== visibleHint) {
            setVisibleHint(null);
            const timeout = setTimeout(() => {
                setVisibleHint(text);
            }, 400);
            return () => clearTimeout(timeout);
        }
    }, [phase, hintIndex]);

    // Alert SQL injection dopo 5 secondi
    useEffect(() => {
        if (phase === 0) {
            const timer = setTimeout(() => {
                const newLog = {
                    id: 3,
                    timestamp: '15:43:22',
                    source: '203.0.113.55',
                    severity: 'critical',
                    message: "SQL Injection detected! Payload: admin' OR '1'='1 -- Access granted to unauthorized user.",
                    threat: true
                };
                setLogs(prev => [...prev, newLog]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    const handleLogClick = (log) => {
        if (log.threat && phase === 0) {
            setTerminalHistory(prev => [...prev, 
                '$ ALERT: SQL Injection vulnerability detected in login.php',
                '$ ACTION REQUIRED: Fix the query to use prepared statements.'
            ]);
            setPhase(1);
        }
    };

    const handleCodeSave = (newCode, fileKey) => {
        setFiles(prev => ({
            ...prev,
            [fileKey]: {
                ...prev[fileKey],
                content: newCode,
                modified: true
            }
        }));

        if (phase === 1 && fileKey === 'login.php') {
            setTerminalHistory(prev => [...prev, '$ login.php modified. Ready to test.']);
            setPhase(2);
        }
    };

    const runTerminalCommand = (args, fullCommand) => {
        const cmd = fullCommand.split(' ')[0];

        if (cmd === 'test-login' && phase === 2) {
            const currentCode = files['login.php'].content;
            
            // Verifica se usa prepared statements
            const usesPreparedStatements = currentCode.includes('prepare(') && currentCode.includes('bind_param');
            const stillVulnerable = currentCode.includes('"SELECT * FROM users WHERE username=\'" . $username');

            if (usesPreparedStatements && !stillVulnerable) {
                heal(20);
                addStar();
                setTerminalHistory(prev => [...prev,
                    '> Testing login with SQLi payload...',
                    "> Input: username=admin' OR '1'='1",
                    '[SUCCESS] Input rejected - Prepared statement protected the query.',
                    '[SUCCESS] Authentication bypass PREVENTED.',
                    '$ MISSION ACCOMPLISHED! SQL Injection vulnerability patched.'
                ]);
                setTimeout(() => {
                    setPhase(3);
                    setGameState('won');
                }, 1500);
                return null;
            } else {
                takeDamage(15);
                return [
                    '> Testing login with SQLi payload...',
                    "> Input: username=admin' OR '1'='1",
                    '[FAIL] Unauthorized access granted! Query still vulnerable.',
                    '$ ERROR: You must use prepared statements with parameter binding.'
                ];
            }
        }

        if (cmd === 'analyze-code') {
            return `=== CODE ANALYSIS: login.php ===
Vulnerability: SQL INJECTION (High Severity)
Location: authenticate_user() function
Issue: Direct string concatenation in SQL query
Attack Vector: ' OR '1'='1 --

Recommendation: Use prepared statements with mysqli_prepare()`;
        }

        if (cmd === 'show-logs') {
            return logs.map(log => 
                `[${log.timestamp}] ${log.severity.toUpperCase()} - ${log.source}\n${log.message}`
            ).join('\n\n');
        }

        return `Command not found: ${cmd}`;
    };

    // Win/Loss logic
    useEffect(() => {
        if (health <= 0 && gameState === 'playing') {
            setGameState('lost');
        }
    }, [health, gameState]);

    if (gameState !== 'playing') {
        const winRecap = `VULNERABILITÀ IDENTIFICATA: SQL Injection via String Concatenation.

Hai dimostrato come query SQL costruite tramite concatenazione di stringhe sono vulnerabili all'injection.

LEZIONE APPRESA: Usa sempre prepared statements e parametri vincolati per proteggere il database da input malevoli.`;

        const lossRecap = `MISSIONE FALLITA. Il database è stato compromesso o troppi errori commessi.`;

        return (
            <MissionDebrief
                success={gameState === 'won'}
                stats={{ stars, health }}
                recapText={gameState === 'won' ? winRecap : lossRecap}
                onRetry={() => window.location.reload()}
                onExit={() => navigate('/map')}
            />
        );
    }

    return (
        <LevelTemplateContent
            stars={stars}
            hint={visibleHint ? <InfoPanel text={visibleHint} /> : null}
            siemConfig={{
                logs: logs,
                blockedIPs: phase >= 3 ? 1 : 0,
                currentStep: phase,
                onLogClick: handleLogClick
            }}
            terminalConfig={{
                initialHistory: terminalHistory,
                commands: {
                    'test-login': (args) => runTerminalCommand(args, 'test-login'),
                    'analyze-code': (args) => runTerminalCommand(args, 'analyze-code'),
                    'show-logs': (args) => runTerminalCommand(args, 'show-logs'),
                    'help': () => "Available: analyze-code, test-login, show-logs"
                }
            }}
            codeEditorConfig={{
                files: files,
                onSave: handleCodeSave,
                language: 'php'
            }}
        />
    );
};

const Level3 = () => (
    <LevelProvider initialHealth={100}>
        <Level3Content />
    </LevelProvider>
);

export default Level3;
