import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const LevelTutorial = () => {
    const navigate = useNavigate();
    const { stars, earnStar } = useReputation(0);
    const [showHint, setShowHint] = useState(true);
    const { language } = useLanguage();
    const t = translations[language].tutorial;
    
    const [currentStep, setCurrentStep] = useState(0);
    const [logs, setLogs] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [blockedIPs, setBlockedIPs] = useState(0);
    const [startTime] = useState(Date.now());
    const [completionTime, setCompletionTime] = useState(0);

    // Simula l'arrivo di nuovi log SIEM
    useEffect(() => {
        const initialLogs = [
            { id: 1, time: '10:23:45', type: 'INFO', source: 'WebServer-01', message: 'User login successful: admin@company.com', severity: 'low', threat: false },
            { id: 2, time: '10:24:12', type: 'WARNING', source: 'Firewall-01', message: 'Multiple connection attempts from 192.168.1.105', severity: 'medium', threat: false },
            { id: 3, time: '10:24:58', type: 'ERROR', source: 'Database-01', message: 'Failed login attempt from 203.0.113.42', severity: 'high', threat: false },
        ];
        
        setLogs(initialLogs);
        
        // Aggiungi log pericoloso dopo 2 secondi
        const timer = setTimeout(() => {
            setLogs(prev => [...prev, {
                id: 4,
                time: '10:25:33',
                type: 'CRITICAL',
                source: 'IDS-Scanner',
                message: 'SQL Injection attempt detected from 203.0.113.42',
                severity: 'critical',
                threat: true
            }]);
        }, 2000);
        
        return () => clearTimeout(timer);
    }, []);

    const handleLogClick = (log) => {
        setSelectedLog(log);
        // Passa allo step 1 quando selezioniamo il log critico
        if (currentStep === 0 && log.threat) {
            setCurrentStep(1);
            earnStar();
        }
    };

    const handleAnalyze = () => {
        if (selectedLog && selectedLog.threat && currentStep === 1) {
            setCurrentStep(2);
            earnStar();
        }
    };

    const handleBlock = () => {
        if (selectedLog && selectedLog.threat && currentStep === 2) {
            setCurrentStep(3);
            earnStar();
            setBlockedIPs(1);
            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
            setCompleted(true);
            setTimeout(() => {
                navigate('/map');
            }, 5000);
        }
    };

    const getSeverityColor = (severity) => {
        switch(severity) {
            case 'low': return 'text-green-400';
            case 'medium': return 'text-yellow-400';
            case 'high': return 'text-orange-400';
            case 'critical': return 'text-red-500 animate-pulse';
            default: return 'text-cyber-green';
        }
    };

    const getHintText = () => {
        switch(currentStep) {
            case 0:
                return t.hints.step1;
            case 1:
                return t.hints.step2;
            case 2:
                return t.hints.step3;
            case 3:
                return t.hints.step4;
            default:
                return t.hints.step1;
        }
    };

    return (
        <LevelTemplate 
            stars={stars} 
            hint={showHint ? <InfoPanel text={getHintText()} /> : null}
            musicTrack="/background-music.mp3"
        >
            <div className="relative flex flex-col h-full font-mono text-cyber-green p-4">
                {/* Header */}
                <div className="border-b border-cyber-green/30 pb-2 mb-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-cyber-blue">{t.title}</h2>
                            <p className="text-xs text-cyber-green/70">{t.subtitle}</p>
                        </div>
                        {/* Progress Indicator */}
                        <div className="flex items-center gap-2">
                            <div className="text-xs text-cyber-blue font-bold">Step {Math.min(currentStep + 1, 3)}/3</div>
                            <div className="flex gap-1">
                                {[0, 1, 2].map(step => (
                                    <div 
                                        key={step}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            step <= currentStep ? 'bg-cyber-blue' : 'bg-cyber-green/30'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SIEM Dashboard */}
                <div className="flex-1 overflow-hidden flex gap-3">
                    {/* Log Stream Panel */}
                    <div className="flex-1 border border-cyber-green/30 rounded p-2 overflow-hidden flex flex-col">
                        {/* Statistics Panel */}
                        <div className="mb-2 p-2 bg-cyber-black/30 rounded border border-cyber-blue/30">
                            <div className="grid grid-cols-3 gap-2 text-[10px]">
                                <div className="text-center">
                                    <div className="text-cyber-green/70">Events</div>
                                    <div className="text-cyber-blue font-bold text-sm">{logs.length}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-cyber-green/70">Threats</div>
                                    <div className="text-red-500 font-bold text-sm">{logs.filter(l => l.threat).length}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-cyber-green/70">Blocked IPs</div>
                                    <div className="text-yellow-400 font-bold text-sm">{blockedIPs}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-xs font-bold text-cyber-blue mb-2">{t.logStream}</div>
                        <div className="space-y-1 overflow-y-auto flex-1">
                            {logs.map(log => {
                                const isCorrelated = selectedLog && 
                                    log.message.includes('203.0.113.42') && 
                                    selectedLog.message.includes('203.0.113.42') &&
                                    log.id !== selectedLog.id;
                                
                                return (
                                <div 
                                    key={log.id}
                                    onClick={() => handleLogClick(log)}
                                    className={`text-xs p-2 border rounded cursor-pointer transition-all ${
                                        selectedLog?.id === log.id 
                                            ? 'border-cyber-blue bg-cyber-blue/20' 
                                            : isCorrelated
                                                ? 'border-yellow-500/50 bg-yellow-500/10'
                                                : 'border-cyber-green/20 hover:border-cyber-green/50 hover:bg-cyber-green/10'
                                    } ${getSeverityColor(log.severity)} ${
                                        log.severity === 'critical' ? 'ring-2 ring-red-500/50 shadow-lg shadow-red-500/30' : ''
                                    }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="font-bold">[{log.time}]</span>
                                        <div className="flex gap-1 items-center">
                                            {isCorrelated && <span className="text-[9px] text-yellow-400">🔗</span>}
                                            <span className="text-[10px] px-1 border border-current rounded">{log.type}</span>
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-cyber-green/70 mt-1">{log.source}</div>
                                    <div className="mt-1">{log.message}</div>
                                </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Analysis Panel */}
                    <div className="w-2/5 border border-cyber-green/30 rounded p-2 flex flex-col overflow-hidden">
                        <div className="text-xs font-bold text-cyber-blue mb-2">{t.analysis}</div>
                        {selectedLog ? (
                            <div className="flex-1 flex flex-col overflow-y-auto">
                                <div className="text-xs space-y-2">
                                    <div>
                                        <span className="text-cyber-green/70">{t.source}:</span> {selectedLog.source}
                                    </div>
                                    <div>
                                        <span className="text-cyber-green/70">{t.severity}:</span> <span className={getSeverityColor(selectedLog.severity)}>{selectedLog.severity.toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <span className="text-cyber-green/70">{t.threat}:</span> {selectedLog.threat ? <span className="text-red-500 font-bold">{t.yes}</span> : <span className="text-green-400">{t.no}</span>}
                                    </div>
                                    <div className="pt-2 border-t border-cyber-green/30">
                                        <span className="text-cyber-green/70">{t.message}:</span>
                                        <div className="mt-1 text-[10px] bg-cyber-black/50 p-2 rounded">
                                            {selectedLog.message}
                                        </div>
                                    </div>
                                    
                                    {/* Educational Info Box */}
                                    {selectedLog.threat && currentStep >= 2 && (
                                        <div className="mt-3 p-2 border border-yellow-500/50 bg-yellow-500/10 rounded">
                                            <div className="text-[10px] font-bold text-yellow-400 mb-1">ℹ️ SQL Injection</div>
                                            <div className="text-[9px] text-yellow-300/80">
                                                {language === 'italiano' 
                                                    ? 'Un attacco SQL Injection sfrutta vulnerabilità nelle query SQL per accedere o modificare il database. L\'attaccante inserisce codice SQL malevolo attraverso input non validati.'
                                                    : language === 'francais'
                                                    ? 'Une attaque par injection SQL exploite les vulnérabilités des requêtes SQL pour accéder ou modifier la base de données. L\'attaquant insère du code SQL malveillant via des entrées non validées.'
                                                    : language === 'deutsch'
                                                    ? 'Ein SQL-Injection-Angriff nutzt Schwachstellen in SQL-Abfragen aus, um auf die Datenbank zuzugreifen oder sie zu ändern. Der Angreifer fügt bösartigen SQL-Code über nicht validierte Eingaben ein.'
                                                    : language === 'espanol'
                                                    ? 'Un ataque de inyección SQL explota vulnerabilidades en consultas SQL para acceder o modificar la base de datos. El atacante inserta código SQL malicioso a través de entradas no validadas.'
                                                    : 'An SQL Injection attack exploits vulnerabilities in SQL queries to access or modify the database. The attacker inserts malicious SQL code through unvalidated inputs.'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="space-y-2 mt-3">
                                    <button 
                                        onClick={handleAnalyze}
                                        disabled={currentStep < 1 || currentStep > 1 || !selectedLog?.threat}
                                        className={`w-full px-3 py-2 border text-xs font-bold transition-all ${
                                            currentStep > 1 
                                                ? 'border-cyber-green/30 text-cyber-green/30 cursor-not-allowed'
                                                : currentStep === 1 && selectedLog?.threat
                                                    ? 'border-cyber-blue/50 hover:bg-cyber-blue/20 text-cyber-blue'
                                                    : 'border-cyber-green/20 text-cyber-green/40 cursor-not-allowed'
                                        }`}
                                    >
                                        {t.analyzeBtn}
                                    </button>
                                    <button 
                                        onClick={handleBlock}
                                        disabled={currentStep < 2 || currentStep > 2 || !selectedLog?.threat}
                                        className={`w-full px-3 py-2 border text-xs font-bold transition-all ${
                                            currentStep > 2 
                                                ? 'border-cyber-green/30 text-cyber-green/30 cursor-not-allowed'
                                                : currentStep === 2 && selectedLog?.threat
                                                    ? 'border-cyber-red/50 hover:bg-cyber-red/20 text-cyber-red'
                                                    : 'border-cyber-green/20 text-cyber-green/40 cursor-not-allowed'
                                        }`}
                                    >
                                        {t.blockBtn}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-xs text-cyber-green/50">
                                {t.selectLog}
                            </div>
                        )}
                    </div>
                </div>

                {/* Success Message - Detailed Report */}
                {completed && (
                    <div className="absolute inset-0 bg-cyber-black/90 flex items-center justify-center z-50">
                        <div className="text-center p-6 border border-cyber-green rounded-lg bg-cyber-black max-w-md">
                            <div className="text-3xl font-bold text-cyber-green mb-3">✓ {t.success}</div>
                            <div className="text-sm text-cyber-green/70 mb-4">{t.successMsg}</div>
                            
                            {/* Detailed Report */}
                            <div className="border-t border-cyber-green/30 pt-4 text-left space-y-2">
                                <div className="text-xs font-bold text-cyber-blue mb-2">
                                    {language === 'italiano' ? 'RAPPORTO MISSIONE' : 
                                     language === 'francais' ? 'RAPPORT DE MISSION' :
                                     language === 'deutsch' ? 'MISSIONSBERICHT' :
                                     language === 'espanol' ? 'INFORME DE MISIÓN' : 'MISSION REPORT'}
                                </div>
                                
                                <div className="space-y-1 text-[10px]">
                                    <div className="flex justify-between">
                                        <span className="text-cyber-green/70">
                                            {language === 'italiano' ? 'Tempo impiegato:' : 
                                             language === 'francais' ? 'Temps écoulé:' :
                                             language === 'deutsch' ? 'Benötigte Zeit:' :
                                             language === 'espanol' ? 'Tiempo empleado:' : 'Time elapsed:'}
                                        </span>
                                        <span className="text-cyber-blue font-bold">{completionTime}s</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-cyber-green/70">
                                            {language === 'italiano' ? 'Minaccia identificata:' : 
                                             language === 'francais' ? 'Menace identifiée:' :
                                             language === 'deutsch' ? 'Bedrohung identifiziert:' :
                                             language === 'espanol' ? 'Amenaza identificada:' : 'Threat identified:'}
                                        </span>
                                        <span className="text-red-500 font-bold">SQL Injection</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-cyber-green/70">
                                            {language === 'italiano' ? 'IP bloccato:' : 
                                             language === 'francais' ? 'IP bloqué:' :
                                             language === 'deutsch' ? 'IP gesperrt:' :
                                             language === 'espanol' ? 'IP bloqueada:' : 'IP blocked:'}
                                        </span>
                                        <span className="text-yellow-400 font-bold">203.0.113.42</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-cyber-green/70">
                                            {language === 'italiano' ? 'Stelle guadagnate:' : 
                                             language === 'francais' ? 'Étoiles gagnées:' :
                                             language === 'deutsch' ? 'Sterne verdient:' :
                                             language === 'espanol' ? 'Estrellas ganadas:' : 'Stars earned:'}
                                        </span>
                                        <span className="text-cyber-green font-bold">{stars}/3</span>
                                    </div>
                                </div>
                                
                                <div className="mt-3 pt-3 border-t border-cyber-green/30">
                                    <div className="text-[9px] text-cyber-green/60 italic">
                                        {language === 'italiano' ? '✅ Sistema protetto con successo! I log correlati hanno rivelato un pattern di attacco.' : 
                                         language === 'francais' ? '✅ Système protégé avec succès! Les logs corrélés ont révélé un schéma d\'attaque.' :
                                         language === 'deutsch' ? '✅ System erfolgreich geschützt! Korrelierte Logs zeigten ein Angriffsmuster.' :
                                         language === 'espanol' ? '✅ ¡Sistema protegido con éxito! Los logs correlacionados revelaron un patrón de ataque.' : '✅ System successfully protected! Correlated logs revealed an attack pattern.'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Control Buttons */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-cyber-green/30">
                    <button 
                        onClick={() => setShowHint(!showHint)}
                        className="px-3 py-1 border border-cyber-blue/50 hover:bg-cyber-blue/20 text-cyber-blue text-xs font-bold transition-all"
                    >
                        {showHint ? t.hideHelp : t.showHelp}
                    </button>
                    <button 
                        onClick={() => navigate('/map')}
                        className="px-3 py-1 border border-cyber-red/50 hover:bg-cyber-red/20 text-cyber-red text-xs font-bold transition-all"
                    >
                        {t.exit}
                    </button>
                </div>
            </div>
        </LevelTemplate>
    );
};

export default LevelTutorial;
