import React, { useState, useEffect } from 'react';
import { LevelTemplateContent } from '../components/LevelTemplate';
import { LevelProvider, useLevel } from '../contexts/LevelContext';
import InfoPanel from '../components/InfoPanel';
import MissionDebrief from '../components/MissionDebrief';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

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
    const { language } = useLanguage();
    const t = translations[language]?.level3 || translations['italiano'].level3;

    const addStar = () => setStars(prev => Math.min(prev + 1, 3));

    const [phase, setPhase] = useState(0);
    const [hintIndex, setHintIndex] = useState(0);
    const [visibleHint, setVisibleHint] = useState(null);

    // Traccia azioni bonus per stelle opzionali
    const [analyzedLog, setAnalyzedLog] = useState(false); // Stella per click su log SIEM
    const [usedAnalyzeCode, setUsedAnalyzeCode] = useState(false); // Stella per comando analyze-code

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
        { id: 1, timestamp: '15:42:15', source: '192.168.1.100', severity: 'low', message: t.logMessages.loginAttempt, threat: false },
        { id: 2, timestamp: '15:43:18', source: '192.168.1.105', severity: 'low', message: t.logMessages.searchQuery, threat: false },
    ]);

    // Update logs when language changes
    useEffect(() => {
        setLogs(prevLogs => prevLogs.map(log => {
            if (log.id === 1) return { ...log, message: t.logMessages.loginAttempt };
            if (log.id === 2) return { ...log, message: t.logMessages.searchQuery };
            if (log.id === 3) return { ...log, message: t.logMessages.sqliDetected };
            return log;
        }));
    }, [language, t]);

    const [terminalHistory, setTerminalHistory] = useState(t.terminal.initial);

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
        switch (phase) {
            case 0:
                return t.hints.step0;
            case 1:
                const hints = [
                    t.hints.step1,
                    t.hints.step2,
                    t.hints.step3,
                    t.hints.stepCode,
                ];
                return hints[Math.min(hintIndex, hints.length - 1)];
            case 2:
                return t.hints.step4;
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
    }, [phase, hintIndex, language]);

    // Alert SQL injection dopo 5 secondi
    useEffect(() => {
        if (phase === 0) {
            const timer = setTimeout(() => {
                const newLog = {
                    id: 3,
                    timestamp: '15:43:22',
                    source: '203.0.113.55',
                    severity: 'critical',
                    message: t.logMessages.sqliDetected,
                    threat: true
                };
                setLogs(prev => {
                    if (prev.find(l => l.id === 3)) return prev;
                    return [...prev, newLog];
                });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [phase, t.logMessages.sqliDetected]);

    const handleLogClick = (log) => {
        if (log.threat && phase === 0) {
            // Stella bonus per aver analizzato il log SIEM
            if (!analyzedLog) {
                setAnalyzedLog(true);
                addStar();
            }
            setTerminalHistory(prev => [...prev, ...t.terminal.alert]);
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
            setTerminalHistory(prev => [...prev, t.terminal.modified]);
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
                // Success messages
                const successMsgs = [
                    t.terminal.testLogin.testing,
                    t.terminal.testLogin.input,
                    ...t.terminal.testLogin.success
                ];
                setTerminalHistory(prev => [...prev, ...successMsgs]);

                setTimeout(() => {
                    setPhase(3);
                    setGameState('won');
                }, 1500);
                return null;
            } else {
                takeDamage(15);
                return [
                    t.terminal.testLogin.testing,
                    t.terminal.testLogin.input,
                    ...t.terminal.testLogin.fail
                ];
            }
        }

        if (cmd === 'analyze-code') {
            // Stella bonus per aver usato analyze-code
            if (!usedAnalyzeCode) {
                setUsedAnalyzeCode(true);
                addStar();
            }
            return `${t.terminal.analyzeCode.header}
${t.terminal.analyzeCode.vuln}
${t.terminal.analyzeCode.loc}
${t.terminal.analyzeCode.issue}
${t.terminal.analyzeCode.vector}

${t.terminal.analyzeCode.rec}`;
        }

        if (cmd === 'show-logs') {
            return logs.map(log =>
                `[${log.timestamp}] ${log.severity.toUpperCase()} - ${log.source}\n${log.message}`
            ).join('\n\n');
        }

        return `${t.terminal.notFound} ${cmd}`;
    };

    // Win/Loss logic
    useEffect(() => {
        if (health <= 0 && gameState === 'playing') {
            setGameState('lost');
        }
    }, [health, gameState]);

    if (gameState !== 'playing') {
        return (
            <MissionDebrief
                success={gameState === 'won'}
                levelId="level3"
                stats={{ stars, health }}
                recapText={gameState === 'won'
                    ? `${t.debrief.winTitle}\n\n${t.debrief.winBody}\n\n${t.debrief.lesson}`
                    : t.debrief.loss}
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
                    'help': () => t.terminal.help
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
