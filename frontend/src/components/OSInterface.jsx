import React, { useState } from 'react';
import EmailClient from './EmailClient';
import Terminal from './Terminal';
import Browser from './Browser';
import FileManager from './FileManager';
import SIEMSystem from './SIEMSystem';

const OSInterface = ({ children, onEmailAction, onHintClick, showHintButton = false }) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [windows, setWindows] = useState([]);
    const [nextWindowId, setNextWindowId] = useState(1);
    
    // Dati SIEM di esempio (come nel tutorial)
    const [siemLogs] = useState([
        { id: 1, time: '10:23:45', type: 'INFO', source: 'WebServer-01', message: 'User login successful: admin@company.com', severity: 'low', threat: false, protocol: 'HTTPS', bytes: 1024 },
        { id: 2, time: '10:24:12', type: 'WARNING', source: 'Firewall-01', message: 'Multiple connection attempts from 192.168.1.105', severity: 'medium', threat: false, protocol: 'SSH', bytes: 512 },
        { id: 3, time: '10:24:58', type: 'ERROR', source: 'Database-01', message: 'Failed login attempt from 203.0.113.42', severity: 'high', threat: false, protocol: 'HTTP', bytes: 2048 },
        { id: 4, time: '10:25:33', type: 'CRITICAL', source: 'IDS-Scanner', message: 'SQL Injection attempt detected from 203.0.113.42', severity: 'critical', threat: true, protocol: 'HTTP', bytes: 4096 }
    ]);
    const [siemTrafficHistory] = useState([
        { time: 0, incoming: 3.5, outgoing: 1.2 },
        { time: 1, incoming: 3.8, outgoing: 1.3 },
        { time: 2, incoming: 4.1, outgoing: 1.4 },
        { time: 3, incoming: 4.3, outgoing: 1.5 },
        { time: 4, incoming: 4.8, outgoing: 1.6 }
    ]);
    const [siemNetworkTraffic] = useState({ incoming: 4.8, outgoing: 1.6 });
    const [siemProtocols] = useState({ http: 2, https: 1, ssh: 1, ftp: 0 });

    // Aggiorna l'ora ogni secondo
    React.useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const openWindow = (title, contentType, size = { width: 600, height: 400 }) => {
        // Posiziona la finestra in alto a sinistra con un piccolo offset per finestre multiple
        const offset = ((nextWindowId - 1) % 5) * 20;
        const newWindow = {
            id: nextWindowId,
            title,
            contentType,
            size,
            position: { x: 20 + offset, y: 20 + offset },
            isMinimized: false,
            isMaximized: false,
            zIndex: nextWindowId
        };
        setWindows([...windows, newWindow]);
        setNextWindowId(nextWindowId + 1);
    };

    const closeWindow = (id) => {
        setWindows(windows.filter(w => w.id !== id));
    };

    const minimizeWindow = (id) => {
        setWindows(windows.map(w => 
            w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
        ));
    };

    const maximizeWindow = (id) => {
        setWindows(windows.map(w => 
            w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
        ));
    };

    const bringToFront = (id) => {
        const maxZ = Math.max(...windows.map(w => w.zIndex), 0);
        setWindows(windows.map(w => 
            w.id === id ? { ...w, zIndex: maxZ + 1 } : w
        ));
    };

    return (
        <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 flex items-center px-3 z-50">
                <div className="flex items-center gap-3 flex-1">
                    <div className="text-cyan-400 font-bold text-xs">◈ CYBER OS</div>
                    {showHintButton && (
                        <button 
                            onClick={onHintClick}
                            className="px-3 py-1 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue/20 text-xs rounded transition-all"
                        >
                            [ HINT ]
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-[10px] text-slate-400">🔒 Secure</div>
                    <div className="text-[10px] text-cyan-400 font-mono">{time}</div>
                </div>
            </div>

            {/* Desktop Area */}
            <div className="absolute top-8 left-0 right-0 bottom-10 p-4">
                {/* Desktop Icons */}
                <div className="grid grid-cols-8 gap-4 h-full content-start">
                    <DesktopIcon 
                        icon="📧" 
                        label="Email" 
                        onClick={() => openWindow('Email Client', 'email', { width: 600, height: 400 })}
                    />
                    <DesktopIcon 
                        icon="📁" 
                        label="Files" 
                        onClick={() => openWindow('File Manager', 'files', { width: 400, height: 300 })}
                    />
                    <DesktopIcon 
                        icon="💻" 
                        label="Terminal" 
                        onClick={() => openWindow('Terminal', 'terminal', { width: 500, height: 350 })}
                    />
                    <DesktopIcon 
                        icon="🌐" 
                        label="CyberNav" 
                        onClick={() => openWindow('CyberNav Browser', 'browser', { width: 500, height: 350 })}
                    />
                    <DesktopIcon 
                        icon="🛡️" 
                        label="SIEM" 
                        onClick={() => openWindow('SIEM System', 'siem', { width: 700, height: 500 })}
                    />
                </div>

                {/* Custom Content Area */}
                {children}

                {/* Windows */}
                {windows.map(window => (
                    !window.isMinimized && (
                        <Window
                            key={window.id}
                            window={window}
                            onClose={() => closeWindow(window.id)}
                            onMinimize={() => minimizeWindow(window.id)}
                            onMaximize={() => maximizeWindow(window.id)}
                            onFocus={() => bringToFront(window.id)}
                            onEmailAction={onEmailAction}
                            siemLogs={siemLogs}
                            siemTrafficHistory={siemTrafficHistory}
                            siemNetworkTraffic={siemNetworkTraffic}
                            siemProtocols={siemProtocols}
                        />
                    )
                ))}
            </div>

            {/* Taskbar */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-slate-800 to-slate-700 border-t border-slate-600 flex items-center px-3 gap-2 z-50">
                <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded transition-colors">
                    ⚡ Start
                </button>
                
                {/* Open Windows */}
                <div className="flex gap-1 flex-1">
                    {windows.map(window => (
                        <button
                            key={window.id}
                            onClick={() => minimizeWindow(window.id)}
                            className={`px-3 py-1 text-xs rounded transition-all ${
                                window.isMinimized 
                                    ? 'bg-slate-600 text-slate-300' 
                                    : 'bg-slate-500 text-white border-t-2 border-cyan-400'
                            }`}
                        >
                            {window.title}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-300">
                    <span>🔊</span>
                    <span>📶</span>
                    <span>🔋</span>
                </div>
            </div>
        </div>
    );
};

// Desktop Icon Component
const DesktopIcon = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded transition-colors group"
    >
        <div className="text-4xl group-hover:scale-110 transition-transform">{icon}</div>
        <div className="text-[10px] text-white font-medium text-center bg-black/40 px-2 py-0.5 rounded">
            {label}
        </div>
    </button>
);

// Window Component
const Window = ({ window: windowData, onClose, onMinimize, onMaximize, onFocus, onEmailAction, siemLogs, siemTrafficHistory, siemNetworkTraffic, siemProtocols }) => {
    const [position, setPosition] = useState(windowData.position);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        if (windowData.isMaximized) return; // Non permettere drag se maximized
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
        onFocus();
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging]);

    // Calcola posizione e dimensione in base allo stato maximized
    const windowStyle = windowData.isMaximized
        ? {
            left: 0,
            top: 32, // Altezza top bar
            width: '100%',
            height: 'calc(100% - 72px)', // 32px top bar + 40px taskbar
            zIndex: windowData.zIndex
        }
        : {
            left: position.x + 'px',
            top: position.y + 'px',
            width: windowData.size.width + 'px',
            height: windowData.size.height + 'px',
            zIndex: windowData.zIndex
        };

    return (
        <div
            className="absolute bg-slate-800 border border-slate-600 rounded-lg shadow-2xl"
            style={windowStyle}
            onClick={onFocus}
        >
            {/* Title Bar */}
            <div
                className="h-8 bg-gradient-to-r from-slate-700 to-slate-600 border-b border-slate-500 flex items-center justify-between px-3 cursor-move rounded-t-lg"
                onMouseDown={handleMouseDown}
            >
                <span className="text-xs font-semibold text-white">{windowData.title}</span>
                <div className="flex gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onMaximize(); }}
                        className="w-6 h-6 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    >
                        {windowData.isMaximized ? '▼' : '□'}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                        className="w-6 h-6 bg-yellow-500 hover:bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    >
                        −
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="w-6 h-6 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    >
                        ×
                    </button>
                </div>
            </div>

            {/* Window Content */}
            <div className="h-[calc(100%-2rem)] overflow-auto p-3">
                {windowData.contentType === 'email' && <EmailClient onEmailAction={onEmailAction} />}
                {windowData.contentType === 'files' && <FileManager />}
                {windowData.contentType === 'terminal' && <Terminal />}
                {windowData.contentType === 'browser' && <Browser />}
                {windowData.contentType === 'siem' && (
                    <SIEMSystem 
                        logs={siemLogs || []}
                        blockedIPs={1}
                        currentStep={0}
                        trafficHistory={siemTrafficHistory || []}
                        networkTraffic={siemNetworkTraffic || { incoming: 0, outgoing: 0 }}
                        protocols={siemProtocols || { http: 0, https: 0, ssh: 0, ftp: 0 }}
                        selectedLog={null}
                        onLogClick={() => {}}
                    />
                )}
            </div>
        </div>
    );
};

export default OSInterface;
