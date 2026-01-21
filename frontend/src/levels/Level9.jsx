import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import SIEMSystem from '../components/SIEMSystem';

const Level9 = () => {
    const navigate = useNavigate();
    const { stars, earnStar } = useReputation(0);
    const [showHint, setShowHint] = useState(false);
    
    // SIEM State
    const [logs, setLogs] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);
    const [blockedIPs, setBlockedIPs] = useState(0);
    const [networkTraffic, setNetworkTraffic] = useState({ incoming: 0, outgoing: 0 });
    const [protocols, setProtocols] = useState({ http: 0, https: 0, ssh: 0, ftp: 0 });
    const [trafficHistory, setTrafficHistory] = useState([
        { time: 0, incoming: 3.5, outgoing: 1.2 },
        { time: 1, incoming: 3.8, outgoing: 1.3 },
        { time: 2, incoming: 4.1, outgoing: 1.4 }
    ]);
    const [currentStep, setCurrentStep] = useState(0); // For progression tracking

    // Simulation Effect
    useEffect(() => {
        const initialLogs = [
            { id: 1, time: '14:23:45', type: 'INFO', source: 'AuthServer-01', message: 'User verification pending', severity: 'low', threat: false, protocol: 'HTTPS', bytes: 1024 },
            { id: 2, time: '14:24:12', type: 'WARNING', source: 'Firewall-Outer', message: 'Port scan detected from 45.33.22.11', severity: 'medium', threat: false, protocol: 'TCP', bytes: 512 },
            { id: 3, time: '14:24:58', type: 'INFO', source: 'Database-Cluster', message: 'Backup started', severity: 'low', threat: false, protocol: 'SQL', bytes: 2048 },
        ];
        
        setLogs(initialLogs);
        setNetworkTraffic({ incoming: 12.5, outgoing: 8.2 });
        setProtocols({ http: 45, https: 120, ssh: 12, ftp: 5 });
        
        // Add threat after delay
        const timer = setTimeout(() => {
            setLogs(prev => [...prev, {
                id: 4,
                time: '14:25:33',
                type: 'CRITICAL',
                source: 'IDS-Core',
                message: 'Malicious payload detected in packet stream. IP: 198.51.100.23',
                severity: 'critical',
                threat: true,
                protocol: 'HTTP',
                bytes: 8192
            }]);
            setNetworkTraffic({ incoming: 45.8, outgoing: 2.5 });
            setProtocols(prev => ({ ...prev, http: prev.http + 50 }));
        }, 3000);
        
        // Traffic simulation
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
                    return newHistory.slice(-10); // Keep last 10
                });
                
                return {
                    incoming: Math.max(0, newIncoming),
                    outgoing: Math.max(0, newOutgoing)
                };
            });
        }, 2000);
        
        return () => {
            clearTimeout(timer);
            clearInterval(trafficInterval);
        };
    }, []);

    const toggleHint = () => {
        setShowHint(!showHint);
    };

    const handleLogClick = (log) => {
        setSelectedLog(log);
        if (log.threat) {
             // Logic when clicking a threat
             if (currentStep === 0) {
                 earnStar();
                 setCurrentStep(1);
             }
        }
    };

    return (
        <LevelTemplate 
            stars={stars} 
            hint={showHint ? <InfoPanel text="Analizza il traffico di rete ed identifica le anomalie nel SIEM." /> : null}
        >
            <div className="flex flex-col h-full w-full p-2">
                <div className="flex justify-between items-center border-b border-cyber-green/30 pb-2 mb-2">
                    <h2 className="text-xl font-bold text-cyber-green">LEVEL 9: ADVANCED THREATS</h2>
                    <div className="flex gap-2">
                         <button 
                            onClick={toggleHint}
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
            </div>
        </LevelTemplate>
    );
};

export default Level9;
