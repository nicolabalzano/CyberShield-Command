import React from 'react';

const SIEMSystem = ({ 
    logs, 
    blockedIPs, 
    currentStep, 
    trafficHistory, 
    networkTraffic, 
    protocols, 
    selectedLog, 
    onLogClick 
}) => {

    const getSeverityBreakdown = () => {
        const breakdown = { low: 0, medium: 0, high: 0, critical: 0 };
        logs.forEach(log => {
            if (breakdown[log.severity] !== undefined) {
                breakdown[log.severity]++;
            }
        });
        return breakdown;
    };

    const getTopSources = () => {
        const sources = {};
        logs.forEach(log => {
            sources[log.source] = (sources[log.source] || 0) + 1;
        });
        return Object.entries(sources)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4);
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

    return (
        <div className="flex-1 overflow-hidden grid grid-cols-3 gap-2">
            {/* Left Column - Main Stats & Graphs */}
            <div className="col-span-2 flex flex-col gap-2 overflow-y-auto">
                {/* Top Stats Row */}
                <div className="grid grid-cols-5 gap-2">
                    <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded p-2 text-center">
                        <div className="text-xl mb-1">📊</div>
                        <div className="text-blue-400 font-bold text-lg">{logs.length}</div>
                        <div className="text-[8px] text-blue-300/70">Total Events</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 border border-red-500/30 rounded p-2 text-center">
                        <div className="text-xl mb-1">⚠️</div>
                        <div className="text-red-400 font-bold text-lg">{logs.filter(l => l.threat).length}</div>
                        <div className="text-[8px] text-red-300/70">Threats</div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 border border-yellow-500/30 rounded p-2 text-center">
                        <div className="text-xl mb-1">🚫</div>
                        <div className="text-yellow-400 font-bold text-lg">{blockedIPs}</div>
                        <div className="text-[8px] text-yellow-300/70">Blocked IPs</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-500/30 rounded p-2 text-center">
                        <div className="text-xl mb-1">🔒</div>
                        <div className="text-green-400 font-bold text-lg">{logs.filter(l => !l.threat).length}</div>
                        <div className="text-[8px] text-green-300/70">Safe Events</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/30 rounded p-2 text-center">
                        <div className="text-xl mb-1">👁️</div>
                        <div className="text-purple-400 font-bold text-lg">{currentStep}</div>
                        <div className="text-[8px] text-purple-300/70">Steps Done</div>
                    </div>
                </div>
                
                {/* Graphs Row */}
                <div className="grid grid-cols-2 gap-2">
                    {/* Event Timeline */}
                    <div className="bg-cyber-black/60 border border-cyan-500/30 rounded p-2">
                        <div className="text-[9px] text-cyan-400 mb-2 font-bold flex items-center gap-1">
                            <span>📈</span> EVENT TIMELINE
                        </div>
                        <div className="h-24 relative">
                            <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="eventGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(34, 211, 238, 0.6)" />
                                        <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d={`M 0,50 ${logs.map((_, i) => 
                                        `L ${(i + 1) * (100 / Math.max(logs.length, 1))},${50 - (i + 1) * 8}`
                                    ).join(' ')} L 100,60 L 0,60 Z`}
                                    fill="url(#eventGradient)"
                                />
                                <polyline
                                    points={logs.map((_, i) => 
                                        `${(i + 1) * (100 / Math.max(logs.length, 1))},${50 - (i + 1) * 8}`
                                    ).join(' ')}
                                    fill="none"
                                    stroke="rgb(34, 211, 238)"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </div>
                        <div className="text-[7px] text-cyan-300/60 text-center mt-1">Events over time</div>
                    </div>
                    
                    {/* Severity Breakdown */}
                    <div className="bg-cyber-black/60 border border-purple-500/30 rounded p-2">
                        <div className="text-[9px] text-purple-400 mb-2 font-bold flex items-center gap-1">
                            <span>🎯</span> SEVERITY LEVELS
                        </div>
                        <div className="flex items-center justify-around h-24">
                            <div className="relative w-16 h-16">
                            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                                {(() => {
                                    const severity = getSeverityBreakdown();
                                    const total = logs.length || 1;
                                    const colors = {
                                        critical: '#ef4444',
                                        high: '#fb923c',
                                        medium: '#facc15',
                                        low: '#4ade80'
                                    };
                                    let offset = 0;
                                    return Object.entries(severity).reverse().map(([level, count]) => {
                                        const percentage = (count / total) * 100;
                                        const strokeDasharray = `${percentage} ${100 - percentage}`;
                                        const dashOffset = -(100 - percentage) + offset; // Approximate calculation
                                        // A simpler approach for donuts in SVG is using stroke-dasharray and stroke-dashoffset
                                        
                                        const circle = count > 0 ? (
                                            <circle
                                                key={level}
                                                cx="18"
                                                cy="18"
                                                r="15.91549430918954"
                                                fill="transparent"
                                                stroke={colors[level]}
                                                strokeWidth="5"
                                                strokeDasharray={[percentage, 100 - percentage].join(" ")}
                                                strokeDashoffset={-offset}
                                            />
                                        ) : null;
                                        offset += percentage;
                                        return circle;
                                    });
                                })()}
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                     <div className="w-[22px] h-[22px] bg-[#0a0e17] rounded-full flex items-center justify-center">
                                         <span className="text-[6px] fill-purple-400 text-purple-400 font-bold">{logs.length}</span>
                                     </div>
                                </div>
                            </div>

                            <div className="space-y-0.5 text-[7px]">
                                {Object.entries(getSeverityBreakdown()).reverse().map(([level, count]) => (
                                    <div key={level} className="flex items-center gap-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${
                                            level === 'critical' ? 'bg-red-500' :
                                            level === 'high' ? 'bg-orange-400' :
                                            level === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                                        }`} />
                                        <span className="text-cyber-green/70 capitalize w-10">{level}</span>
                                        <span className="text-cyber-green font-bold">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Network & Protocol Row */}
                <div className="grid grid-cols-2 gap-2">
                    {/* Network Traffic */}
                    <div className="bg-cyber-black/60 border border-green-500/30 rounded p-2">
                        <div className="text-[9px] text-green-400 mb-1 font-bold flex items-center gap-1">
                            <span>🌐</span> NETWORK TRAFFIC (MB/s)
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[9px] mb-2">
                            <div className="bg-green-900/20 rounded p-1">
                                <div className="text-green-300/70">↓ In</div>
                                <div className="text-green-400 font-bold text-sm">{networkTraffic.incoming}</div>
                            </div>
                            <div className="bg-cyan-900/20 rounded p-1">
                                <div className="text-cyan-300/70">↑ Out</div>
                                <div className="text-cyan-400 font-bold text-sm">{networkTraffic.outgoing}</div>
                            </div>
                        </div>
                        <div className="h-16">
                            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="inGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(74, 222, 128, 0.5)" />
                                        <stop offset="100%" stopColor="rgba(74, 222, 128, 0)" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d={`M 0,${40 - (trafficHistory[0]?.incoming || 0) * 5} ${trafficHistory.map((d, i) => 
                                        `L ${i * (100 / Math.max(trafficHistory.length - 1, 1))},${40 - d.incoming * 5}`
                                    ).join(' ')} L 100,40 L 0,40 Z`}
                                    fill="url(#inGrad)"
                                />
                                <polyline
                                    points={trafficHistory.map((d, i) => 
                                        `${i * (100 / Math.max(trafficHistory.length - 1, 1))},${40 - d.incoming * 5}`
                                    ).join(' ')}
                                    fill="none"
                                    stroke="rgb(74, 222, 128)"
                                    strokeWidth="1.5"
                                />
                                <polyline
                                    points={trafficHistory.map((d, i) => 
                                        `${i * (100 / Math.max(trafficHistory.length - 1, 1))},${40 - d.outgoing * 8}`
                                    ).join(' ')}
                                    fill="none"
                                    stroke="rgb(34, 211, 238)"
                                    strokeWidth="1.5"
                                    strokeDasharray="2,2"
                                />
                            </svg>
                        </div>
                    </div>
                    
                    {/* Protocol Distribution */}
                    <div className="bg-cyber-black/60 border border-orange-500/30 rounded p-2">
                        <div className="text-[9px] text-orange-400 mb-2 font-bold flex items-center gap-1">
                            <span>🔌</span> PROTOCOL DISTRIBUTION
                        </div>
                        <div className="space-y-1.5">
                            {Object.entries(protocols).map(([protocol, count]) => {
                                const maxCount = Math.max(...Object.values(protocols), 1);
                                const percentage = (count / maxCount) * 100;
                                const colors = {
                                    http: 'bg-orange-400',
                                    https: 'bg-green-400',
                                    ssh: 'bg-cyan-400',
                                    ftp: 'bg-yellow-400'
                                };
                                return (
                                    <div key={protocol}>
                                        <div className="flex justify-between text-[7px] mb-0.5">
                                            <span className="text-cyber-green/70 uppercase font-bold">{protocol}</span>
                                            <span className="text-cyber-green">{count}</span>
                                        </div>
                                        <div className="h-2 bg-cyber-black/70 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${colors[protocol] || 'bg-cyber-blue'} transition-all duration-500 shadow-lg`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                
                {/* Top Sources */}
                <div className="bg-cyber-black/60 border border-yellow-500/30 rounded p-2">
                    <div className="text-[9px] text-yellow-400 mb-2 font-bold flex items-center gap-1">
                        <span>🖥️</span> TOP EVENT SOURCES
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {getTopSources().map(([source, count], idx) => (
                            <div key={source} className="flex items-center gap-2 bg-yellow-900/10 rounded p-1.5">
                                <div className="text-yellow-400 font-bold text-xs">#{idx + 1}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[8px] text-yellow-300 truncate">{source}</div>
                                    <div className="text-[7px] text-yellow-400/60">{count} events</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Right Column - Log Stream */}
            <div className="flex flex-col gap-2 overflow-hidden">
                <div className="bg-cyber-black/60 border border-cyber-blue/30 rounded p-2 flex flex-col flex-1 overflow-hidden">
                    <div className="text-[9px] font-bold text-cyber-blue mb-2 flex items-center gap-1">
                        <span>📄</span> LIVE EVENT STREAM
                    </div>
                    <div className="space-y-1 overflow-y-auto flex-1 pr-1">
                    {logs.map(log => {
                        const isCorrelated = selectedLog && 
                            log.message.includes('203.0.113.42') && 
                            selectedLog.message.includes('203.0.113.42') &&
                            log.id !== selectedLog.id;
                        
                        return (
                        <div 
                            key={log.id}
                            onClick={() => onLogClick(log)}
                            className={`text-[8px] p-1.5 border rounded cursor-pointer transition-all hover:scale-[1.02] ${
                                selectedLog?.id === log.id 
                                    ? 'border-cyber-blue bg-cyber-blue/30 shadow-lg shadow-cyber-blue/20' 
                                    : isCorrelated
                                        ? 'border-yellow-500/50 bg-yellow-500/10'
                                        : 'border-cyber-green/20 hover:border-cyber-green/50 hover:bg-cyber-green/5'
                            } ${getSeverityColor(log.severity)} ${
                                log.severity === 'critical' ? 'ring-1 ring-red-500/70 shadow-md shadow-red-500/30 animate-pulse' : ''
                            }`}
                        >
                            <div className="flex justify-between items-center mb-0.5">
                                <span className="font-bold opacity-80">{log.time}</span>
                                <span className="uppercase text-[6px] border border-current px-1 rounded">{log.type}</span>
                            </div>
                            <div className="font-bold mb-0.5 truncate">{log.source}</div>
                            <div className="opacity-90 break-words leading-tight">{log.message}</div>
                        </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SIEMSystem;
