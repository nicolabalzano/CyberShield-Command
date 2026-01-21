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
    const [isAnalyzing, setIsAnalyzing] = useState(false);
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
            setShowAnalysisModal(false); // Chiudi il modal principale
            setIsAnalyzing(true);
            setTimeout(() => {
                setCurrentStep(2);
                earnStar();
                setTimeout(() => {
                    setIsAnalyzing(false);
                    setShowAnalysisModal(true); // Riapri il modal principale
                }, 2000); // Mostra il messaggio di completamento per 2 secondi
            }, 3000); // 3 secondi di caricamento
        }
    };

    const handleBlock = () => {
        if (selectedLog && selectedLog.threat && currentStep === 2) {
            setCurrentStep(3);
            earnStar();
            setBlockedIPs(1);
            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
            setCompleted(true);
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
            <div className="relative flex flex-col h-full w-full p-2">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-cyber-green/30 pb-2 mb-2">
                    <h2 className="text-xl font-bold text-cyber-green">{t.title}</h2>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setShowHint(!showHint)}
                            className="px-3 py-1 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue/20 text-xs rounded transition-all"
                        >
                            [ HINT ]
                        </button>
                        <button 
                            onClick={() => navigate('/map')}
                            className="px-3 py-1 border border-cyber-red text-cyber-red hover:bg-cyber-red/20 text-xs rounded transition-all"
                        >
                            [ ABORT ]
                        </button>
                    </div>
                </div>

                {/* SIEM Dashboard */}
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
                        <div className="bg-gradient-to-br from-cyber-black to-cyber-deep-blue border border-cyber-blue rounded p-1.5 max-w-md w-full mx-4 shadow-2xl shadow-cyber-blue/30" onClick={e => e.stopPropagation()}>
                            {/* Modal Header */}
                            <div className="flex justify-between items-start mb-1 pb-1 border-b border-cyber-blue/30">
                                <div>
                                    <h3 className="text-xs font-bold text-cyber-blue flex items-center gap-1">
                                        <span>🔍</span> EVENT ANALYSIS
                                    </h3>
                                </div>
                                <button 
                                    onClick={() => setShowAnalysisModal(false)}
                                    className="text-cyber-red hover:text-red-400 text-sm font-bold transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            {/* Modal Content */}
                            <div className="space-y-1.5">
                                {/* Event Details Grid */}
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="bg-cyber-black/40 border border-cyan-500/30 rounded p-1">
                                        <div className="text-[6px] text-cyan-400/70">TIMESTAMP</div>
                                        <div className="text-[9px] text-cyan-300 font-bold">{selectedLog.time}</div>
                                    </div>
                                    <div className="bg-cyber-black/40 border border-purple-500/30 rounded p-1">
                                        <div className="text-[6px] text-purple-400/70">TYPE</div>
                                        <div className="text-[9px] text-purple-300 font-bold">{selectedLog.type}</div>
                                    </div>
                                    <div className="bg-cyber-black/40 border border-yellow-500/30 rounded p-1">
                                        <div className="text-[6px] text-yellow-400/70">SOURCE</div>
                                        <div className="text-[9px] text-yellow-300 font-bold">{selectedLog.source}</div>
                                    </div>
                                    <div className="bg-cyber-black/40 border border-orange-500/30 rounded p-1">
                                        <div className="text-[6px] text-orange-400/70">SEVERITY</div>
                                        <div className={`text-[9px] font-bold ${getSeverityColor(selectedLog.severity)}`}>{selectedLog.severity.toUpperCase()}</div>
                                    </div>
                                </div>
                                
                                {/* Threat Assessment */}
                                <div className={`border rounded p-1 ${selectedLog.threat ? 'bg-red-900/20 border-red-500/50' : 'bg-green-900/20 border-green-500/50'}`}>
                                    <div className={`text-[7px] font-bold flex items-center gap-1 ${selectedLog.threat ? 'text-red-400' : 'text-green-400'}`}>
                                        {selectedLog.threat ? <span>⚠️ THREAT DETECTED</span> : <span>✅ NO THREAT</span>}
                                    </div>
                                </div>
                                
                                {/* Event Message */}
                                <div className="bg-cyber-black/60 border border-cyber-green/30 rounded p-1">
                                    <div className="text-[6px] text-cyber-green/70 font-bold">MESSAGE</div>
                                    <div className="text-[8px] text-cyber-green font-mono leading-snug">{selectedLog.message}</div>
                                </div>
                                
                                {/* Educational Info */}
                                {selectedLog.threat && (
                                    <div className="bg-yellow-900/20 border border-yellow-500/50 rounded p-1">
                                        <div className="text-[7px] font-bold text-yellow-400 flex items-center gap-1">
                                            <span>💡</span> SQL INJECTION
                                        </div>
                                        <div className="text-[7px] text-yellow-300/90 leading-tight mt-0.5">
                                            {language === 'italiano' 
                                                ? 'Attacco che sfrutta vulnerabilità SQL per accedere/modificare il database inserendo codice malevolo.'
                                                : language === 'francais'
                                                ? 'Attaque exploitant des vulnérabilités SQL pour accéder/modifier la base de données.'
                                                : language === 'deutsch'
                                                ? 'Angriff der SQL-Schwachstellen ausnutzt um auf die Datenbank zuzugreifen.'
                                                : language === 'espanol'
                                                ? 'Ataque que explota vulnerabilidades SQL para acceder/modificar la base de datos.'
                                                : 'Attack exploiting SQL vulnerabilities to access/modify the database.'}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-1 pt-1">
                                    <button 
                                        onClick={handleAnalyze}
                                        disabled={currentStep < 1 || currentStep > 1 || !selectedLog?.threat || isAnalyzing}
                                        className={`px-2 py-1 border text-[9px] font-bold transition-all rounded ${
                                            currentStep > 1 || isAnalyzing
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
                                        disabled={currentStep < 2 || currentStep > 2 || !selectedLog?.threat || isAnalyzing}
                                        className={`px-2 py-1 border text-[9px] font-bold transition-all rounded ${
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

                {/* Analysis Loading Modal */}
                {isAnalyzing && (
                    <div className="absolute inset-0 bg-cyber-black/90 backdrop-blur-md flex items-center justify-center z-[150]">
                        <div className="bg-gradient-to-br from-cyber-black to-cyber-deep-blue border-2 border-cyber-blue rounded-lg p-6 max-w-lg w-full mx-4 shadow-2xl shadow-cyber-blue/50">
                            {currentStep < 2 ? (
                                // Fase di caricamento
                                <div className="text-center">
                                    <div className="text-4xl mb-4 animate-spin inline-block">⚙️</div>
                                    <h3 className="text-lg font-bold text-cyber-blue mb-4">
                                        {language === 'italiano' ? 'ANALISI IN CORSO...' : 
                                         language === 'francais' ? 'ANALYSE EN COURS...' :
                                         language === 'deutsch' ? 'ANALYSE LÄUFT...' :
                                         language === 'espanol' ? 'ANÁLISIS EN CURSO...' : 'ANALYZING THREAT...'}
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="text-left">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-cyber-blue">
                                                    {language === 'italiano' ? 'Scansione pattern di attacco' : 
                                                     language === 'francais' ? 'Analyse des motifs d\'attaque' :
                                                     language === 'deutsch' ? 'Angriffsmuster scannen' :
                                                     language === 'espanol' ? 'Escaneando patrones de ataque' : 'Scanning attack patterns'}
                                                </span>
                                                <span className="text-xs text-cyber-blue/70">33%</span>
                                            </div>
                                            <div className="bg-cyber-black/50 h-2 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-cyber-blue to-cyan-400 animate-pulse" style={{width: '33%'}}></div>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-cyan-400">
                                                    {language === 'italiano' ? 'Correlazione eventi di sicurezza' : 
                                                     language === 'francais' ? 'Corrélation des événements' :
                                                     language === 'deutsch' ? 'Ereignisse korrelieren' :
                                                     language === 'espanol' ? 'Correlacionando eventos' : 'Correlating security events'}
                                                </span>
                                                <span className="text-xs text-cyan-400/70">66%</span>
                                            </div>
                                            <div className="bg-cyber-black/50 h-2 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse" style={{width: '66%', animationDelay: '0.3s'}}></div>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-green-400">
                                                    {language === 'italiano' ? 'Generazione report di sicurezza' : 
                                                     language === 'francais' ? 'Génération du rapport' :
                                                     language === 'deutsch' ? 'Bericht erstellen' :
                                                     language === 'espanol' ? 'Generando informe' : 'Generating security report'}
                                                </span>
                                                <span className="text-xs text-green-400/70">90%</span>
                                            </div>
                                            <div className="bg-cyber-black/50 h-2 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 animate-pulse" style={{width: '90%', animationDelay: '0.6s'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Analisi completata
                                <div className="text-center">
                                    <div className="text-5xl mb-4 text-green-400">✓</div>
                                    <h3 className="text-xl font-bold text-green-400 mb-2">
                                        {language === 'italiano' ? 'ANALISI COMPLETATA' : 
                                         language === 'francais' ? 'ANALYSE TERMINÉE' :
                                         language === 'deutsch' ? 'ANALYSE ABGESCHLOSSEN' :
                                         language === 'espanol' ? 'ANÁLISIS COMPLETADO' : 'ANALYSIS COMPLETE'}
                                    </h3>
                                    <p className="text-sm text-cyber-green/70">
                                        {language === 'italiano' ? 'Minaccia SQL Injection confermata. Procedere con il blocco dell\'IP.' : 
                                         language === 'francais' ? 'Menace d\'injection SQL confirmée. Procéder au blocage de l\'IP.' :
                                         language === 'deutsch' ? 'SQL-Injection-Bedrohung bestätigt. Fahren Sie mit der IP-Sperrung fort.' :
                                         language === 'espanol' ? 'Amenaza de inyección SQL confirmada. Proceder con el bloqueo de IP.' : 'SQL Injection threat confirmed. Proceed with IP blocking.'}
                                    </p>
                                </div>
                            )}
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
                            
                            {/* Continue Button */}
                            <button 
                                onClick={() => navigate('/map')}
                                className="mt-4 px-6 py-2 border-2 border-cyber-green bg-cyber-green/10 hover:bg-cyber-green/30 text-cyber-green font-bold text-sm rounded transition-all shadow-lg shadow-cyber-green/20"
                            >
                                {language === 'italiano' ? 'PROSEGUI' : 
                                 language === 'francais' ? 'CONTINUER' :
                                 language === 'deutsch' ? 'WEITER' :
                                 language === 'espanol' ? 'CONTINUAR' : 'CONTINUE'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </LevelTemplate>
    );
};

export default LevelTutorial;
