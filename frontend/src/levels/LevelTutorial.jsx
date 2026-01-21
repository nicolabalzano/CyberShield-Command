import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import SIEMSystem from '../components/SIEMSystem';

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
    const [networkTraffic, setNetworkTraffic] = useState({ incoming: 0, outgoing: 0 });
    const [protocols, setProtocols] = useState({ http: 0, https: 0, ssh: 0, ftp: 0 });
    const [showAnalysisModal, setShowAnalysisModal] = useState(false);
    const [trafficHistory, setTrafficHistory] = useState([
        { time: 0, incoming: 3.5, outgoing: 1.2 },
        { time: 1, incoming: 3.8, outgoing: 1.3 },
        { time: 2, incoming: 4.1, outgoing: 1.4 }
    ]);
    
    // Simula l'arrivo di nuovi log SIEM
    useEffect(() => {
        const initialLogs = [
            { id: 1, time: '10:23:45', type: 'INFO', source: 'WebServer-01', message: 'User login successful: admin@company.com', severity: 'low', threat: false, protocol: 'HTTPS', bytes: 1024 },
            { id: 2, time: '10:24:12', type: 'WARNING', source: 'Firewall-01', message: 'Multiple connection attempts from 192.168.1.105', severity: 'medium', threat: false, protocol: 'SSH', bytes: 512 },
            { id: 3, time: '10:24:58', type: 'ERROR', source: 'Database-01', message: 'Failed login attempt from 203.0.113.42', severity: 'high', threat: false, protocol: 'HTTP', bytes: 2048 },
        ];
        
        setLogs(initialLogs);
        setNetworkTraffic({ incoming: 3.5, outgoing: 1.2 });
        setProtocols({ http: 1, https: 1, ssh: 1, ftp: 0 });
        
        // Aggiungi log pericoloso dopo 2 secondi
        const timer = setTimeout(() => {
            setLogs(prev => [...prev, {
                id: 4,
                time: '10:25:33',
                type: 'CRITICAL',
                source: 'IDS-Scanner',
                message: 'SQL Injection attempt detected from 203.0.113.42',
                severity: 'critical',
                threat: true,
                protocol: 'HTTP',
                bytes: 4096
            }]);
            setNetworkTraffic({ incoming: 4.8, outgoing: 1.5 });
            setProtocols(prev => ({ ...prev, http: prev.http + 1 }));
        }, 2000);
        
        // Simula traffico di rete continuo
        const trafficInterval = setInterval(() => {
            setNetworkTraffic(prev => {
                const newIncoming = parseFloat((parseFloat(prev.incoming) + Math.random() * 0.5).toFixed(1));
                const newOutgoing = parseFloat((parseFloat(prev.outgoing) + Math.random() * 0.3).toFixed(1));
                
                // Aggiorna la storia del traffico per il grafico
                setTrafficHistory(history => {
                    const newHistory = [...history, {
                        time: history.length,
                        incoming: newIncoming,
                        outgoing: newOutgoing
                    }];
                    // Mantieni solo gli ultimi 10 punti
                    return newHistory.slice(-10);
                });
                
                return {
                    incoming: newIncoming,
                    outgoing: newOutgoing
                };
            });
        }, 3000);
        
        return () => {
            clearTimeout(timer);
            clearInterval(trafficInterval);
        };
    }, []);

    const handleLogClick = (log) => {
        setSelectedLog(log);
        setShowAnalysisModal(true);
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
            <div className="relative flex flex-col h-full font-mono text-cyber-green p-2">
                {/* Header */}
                <div className="border-b border-cyber-green/30 pb-1 mb-2">
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

                {/* SIEM Dashboard - Modern Layout */}
                <SIEMSystem 
                    logs={logs}
                    blockedIPs={blockedIPs}
                    currentStep={currentStep}
                    trafficHistory={trafficHistory}
                    networkTraffic={networkTraffic}
                    protocols={protocols}
                    selectedLog={selectedLog}
                    onLogClick={handleLogClick}
                />
                
                {/* Analysis Modal */}
                {showAnalysisModal && selectedLog && (
                    <div className="absolute inset-0 bg-cyber-black/80 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setShowAnalysisModal(false)}>
                        <div className="bg-gradient-to-br from-cyber-black to-cyber-deep-blue border-2 border-cyber-blue rounded-lg p-4 max-w-2xl w-full mx-4 shadow-2xl shadow-cyber-blue/30" onClick={e => e.stopPropagation()}>
                            {/* Modal Header */}
                            <div className="flex justify-between items-start mb-3 pb-2 border-b border-cyber-blue/30">
                                <div>
                                    <h3 className="text-lg font-bold text-cyber-blue flex items-center gap-2">
                                        <span>🔍</span> EVENT ANALYSIS
                                    </h3>
                                    <p className="text-[9px] text-cyber-green/70 mt-0.5">Detailed threat intelligence report</p>
                                </div>
                                <button 
                                    onClick={() => setShowAnalysisModal(false)}
                                    className="text-cyber-red hover:text-red-400 text-xl font-bold transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            {/* Modal Content */}
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                {/* Event Details Grid */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-cyber-black/40 border border-cyan-500/30 rounded p-2">
                                        <div className="text-[8px] text-cyan-400/70 mb-1">TIMESTAMP</div>
                                        <div className="text-sm text-cyan-300 font-bold">{selectedLog.time}</div>
                                    </div>
                                    <div className="bg-cyber-black/40 border border-purple-500/30 rounded p-2">
                                        <div className="text-[8px] text-purple-400/70 mb-1">EVENT TYPE</div>
                                        <div className="text-sm text-purple-300 font-bold">{selectedLog.type}</div>
                                    </div>
                                    <div className="bg-cyber-black/40 border border-yellow-500/30 rounded p-2">
                                        <div className="text-[8px] text-yellow-400/70 mb-1">SOURCE SYSTEM</div>
                                        <div className="text-sm text-yellow-300 font-bold">{selectedLog.source}</div>
                                    </div>
                                    <div className="bg-cyber-black/40 border border-orange-500/30 rounded p-2">
                                        <div className="text-[8px] text-orange-400/70 mb-1">SEVERITY LEVEL</div>
                                        <div className={`text-sm font-bold ${getSeverityColor(selectedLog.severity)}`}>{selectedLog.severity.toUpperCase()}</div>
                                    </div>
                                </div>
                                
                                {/* Threat Assessment */}
                                <div className={`border rounded p-3 ${selectedLog.threat ? 'bg-red-900/20 border-red-500/50' : 'bg-green-900/20 border-green-500/50'}`}>
                                    <div className="text-[9px] font-bold mb-2 flex items-center gap-1">
                                        {selectedLog.threat ? <span>⚠️ THREAT DETECTED</span> : <span>✅ NO THREAT DETECTED</span>}
                                    </div>
                                    <div className={`text-xs ${selectedLog.threat ? 'text-red-300' : 'text-green-300'}`}>
                                        {selectedLog.threat ? 'This event has been flagged as a security threat. Immediate action required.' : 'This event appears to be benign. Continue monitoring for unusual patterns.'}
                                    </div>
                                </div>
                                
                                {/* Event Message */}
                                <div className="bg-cyber-black/60 border border-cyber-green/30 rounded p-2">
                                    <div className="text-[8px] text-cyber-green/70 mb-1 font-bold">EVENT MESSAGE</div>
                                    <div className="text-[10px] text-cyber-green font-mono leading-relaxed">{selectedLog.message}</div>
                                </div>
                                
                                {/* Educational Info */}
                                {selectedLog.threat && (
                                    <div className="bg-yellow-900/20 border border-yellow-500/50 rounded p-3">
                                        <div className="text-[9px] font-bold text-yellow-400 mb-2 flex items-center gap-1">
                                            <span>💡</span> THREAT INTELLIGENCE: SQL INJECTION
                                        </div>
                                        <div className="text-[9px] text-yellow-300/90 leading-relaxed">
                                            {language === 'italiano' 
                                                ? 'Un attacco SQL Injection sfrutta vulnerabilità nelle query SQL per accedere o modificare il database. L\'attaccante inserisce codice SQL malevolo attraverso input non validati. Questi attacchi possono portare a furto di dati, modifica non autorizzata o cancellazione completa del database.'
                                                : language === 'francais'
                                                ? 'Une attaque par injection SQL exploite les vulnérabilités des requêtes SQL pour accéder ou modifier la base de données. L\'attaquant insère du code SQL malveillant via des entrées non validées. Ces attaques peuvent conduire au vol de données, à des modifications non autorisées ou à la suppression complète de la base de données.'
                                                : language === 'deutsch'
                                                ? 'Ein SQL-Injection-Angriff nutzt Schwachstellen in SQL-Abfragen aus, um auf die Datenbank zuzugreifen oder sie zu ändern. Der Angreifer fügt bösartigen SQL-Code über nicht validierte Eingaben ein. Diese Angriffe können zu Datendiebstahl, unbefugten Änderungen oder vollständiger Löschung der Datenbank führen.'
                                                : language === 'espanol'
                                                ? 'Un ataque de inyección SQL explota vulnerabilidades en consultas SQL para acceder o modificar la base de datos. El atacante inserta código SQL malicioso a través de entradas no validadas. Estos ataques pueden llevar al robo de datos, modificaciones no autorizadas o eliminación completa de la base de datos.'
                                                : 'An SQL Injection attack exploits vulnerabilities in SQL queries to access or modify the database. The attacker inserts malicious SQL code through unvalidated inputs. These attacks can lead to data theft, unauthorized modifications, or complete database deletion.'}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <button 
                                        onClick={handleAnalyze}
                                        disabled={currentStep < 1 || currentStep > 1 || !selectedLog?.threat}
                                        className={`px-4 py-2 border text-xs font-bold transition-all rounded ${
                                            currentStep > 1 
                                                ? 'border-cyber-green/20 text-cyber-green/30 cursor-not-allowed bg-cyber-black/20'
                                                : currentStep === 1 && selectedLog?.threat
                                                    ? 'border-cyber-blue hover:bg-cyber-blue/30 text-cyber-blue shadow-lg shadow-cyber-blue/20'
                                                    : 'border-cyber-green/20 text-cyber-green/40 cursor-not-allowed bg-cyber-black/20'
                                        }`}
                                    >
                                        🔬 {t.analyzeBtn || 'ANALYZE THREAT'}
                                    </button>
                                    <button 
                                        onClick={handleBlock}
                                        disabled={currentStep < 2 || currentStep > 2 || !selectedLog?.threat}
                                        className={`px-4 py-2 border text-xs font-bold transition-all rounded ${
                                            currentStep > 2 
                                                ? 'border-cyber-green/20 text-cyber-green/30 cursor-not-allowed bg-cyber-black/20'
                                                : currentStep === 2 && selectedLog?.threat
                                                    ? 'border-red-500 hover:bg-red-500/30 text-red-400 shadow-lg shadow-red-500/20'
                                                    : 'border-cyber-green/20 text-cyber-green/40 cursor-not-allowed bg-cyber-black/20'
                                        }`}
                                    >
                                        🚫 {t.blockBtn || 'BLOCK IP'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                        onClick={() => {
                            setShowHint(!showHint);
                        }}
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
