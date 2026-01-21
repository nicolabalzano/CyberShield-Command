import React, { useState } from 'react';

const OSInterface = ({ children }) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [windows, setWindows] = useState([]);
    const [nextWindowId, setNextWindowId] = useState(1);

    // Aggiorna l'ora ogni secondo
    React.useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const openWindow = (title, content, size = { width: 600, height: 400 }) => {
        // Limita l'offset per evitare che le finestre vadano fuori schermo
        const offset = ((nextWindowId - 1) % 10) * 30;
        const newWindow = {
            id: nextWindowId,
            title,
            content,
            size,
            position: { x: 50 + offset, y: 50 + offset },
            isMinimized: false,
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
                    <div className="flex gap-2">
                        <button className="px-2 py-0.5 text-[10px] text-slate-300 hover:bg-slate-600 transition-colors rounded">
                            File
                        </button>
                        <button className="px-2 py-0.5 text-[10px] text-slate-300 hover:bg-slate-600 transition-colors rounded">
                            Edit
                        </button>
                        <button className="px-2 py-0.5 text-[10px] text-slate-300 hover:bg-slate-600 transition-colors rounded">
                            View
                        </button>
                    </div>
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
                        icon="📁" 
                        label="Files" 
                        onClick={() => openWindow('File Manager', <FileManager />)}
                    />
                    <DesktopIcon 
                        icon="💻" 
                        label="Terminal" 
                        onClick={() => openWindow('Terminal', <Terminal />, { width: 700, height: 500 })}
                    />
                    <DesktopIcon 
                        icon="🌐" 
                        label="CyberNav" 
                        onClick={() => openWindow('CyberNav Browser', <Browser />, { width: 600, height: 400 })}
                    />
                    <DesktopIcon 
                        icon="🛡️" 
                        label="Security" 
                        onClick={() => openWindow('Security Center', <SecurityCenter />)}
                    />
                    <DesktopIcon 
                        icon="📊" 
                        label="Monitor" 
                        onClick={() => openWindow('System Monitor', <SystemMonitor />)}
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
                            onFocus={() => bringToFront(window.id)}
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
const Window = ({ window: windowData, onClose, onMinimize, onFocus }) => {
    const [position, setPosition] = useState(windowData.position);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
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

    return (
        <div
            className="absolute bg-slate-800 border border-slate-600 rounded-lg shadow-2xl"
            style={{
                left: position.x,
                top: position.y,
                width: windowData.size.width,
                height: windowData.size.height,
                zIndex: windowData.zIndex
            }}
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
                {windowData.content}
            </div>
        </div>
    );
};

// File Manager Component
const FileManager = () => (
    <div className="text-white font-mono text-xs">
        <div className="mb-2 text-cyan-400">📁 /home/user/</div>
        <div className="space-y-1">
            <div className="hover:bg-slate-700 p-1 cursor-pointer">📄 document.txt</div>
            <div className="hover:bg-slate-700 p-1 cursor-pointer">📁 Downloads</div>
            <div className="hover:bg-slate-700 p-1 cursor-pointer">📁 Projects</div>
            <div className="hover:bg-slate-700 p-1 cursor-pointer">📄 notes.md</div>
        </div>
    </div>
);

// Terminal Component
const Terminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        '$ Welcome to CYBER OS Terminal',
        '$ Type "help" for available commands',
    ]);
    const inputRef = React.useRef(null);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const newHistory = [...history, `$ ${input}`, `Command not found: ${input}`];
            setHistory(newHistory);
            setInput('');
        }
    };

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div 
            className="bg-black text-green-400 font-mono text-xs p-2 h-full overflow-auto cursor-text"
            onClick={focusInput}
        >
            {history.map((line, i) => (
                <div key={i}>{line}</div>
            ))}
            <div className="flex items-center">
                <span className="mr-2">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent outline-none flex-1 text-green-400"
                    autoFocus
                />
                <span className="animate-pulse">_</span>
            </div>
        </div>
    );
};

// Security Center Component
const SecurityCenter = () => (
    <div className="text-white text-xs space-y-3">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span>System Status: <span className="text-green-400 font-bold">SECURE</span></span>
        </div>
        <div className="border border-slate-600 rounded p-2 space-y-1">
            <div className="text-cyan-400 font-bold mb-2">🛡️ Active Protection</div>
            <div className="flex justify-between">
                <span>Firewall</span>
                <span className="text-green-400">✓ ON</span>
            </div>
            <div className="flex justify-between">
                <span>Antivirus</span>
                <span className="text-green-400">✓ ON</span>
            </div>
            <div className="flex justify-between">
                <span>Intrusion Detection</span>
                <span className="text-green-400">✓ ON</span>
            </div>
        </div>
    </div>
);

// System Monitor Component
const SystemMonitor = () => (
    <div className="text-white text-xs space-y-3">
        <div className="border border-slate-600 rounded p-2">
            <div className="text-cyan-400 font-bold mb-2">CPU Usage</div>
            <div className="bg-slate-700 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full" style={{ width: '45%' }}></div>
            </div>
            <div className="text-right text-[10px] mt-1">45%</div>
        </div>
        <div className="border border-slate-600 rounded p-2">
            <div className="text-cyan-400 font-bold mb-2">Memory</div>
            <div className="bg-slate-700 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full" style={{ width: '62%' }}></div>
            </div>
            <div className="text-right text-[10px] mt-1">62%</div>
        </div>
        <div className="border border-slate-600 rounded p-2">
            <div className="text-cyan-400 font-bold mb-2">Network</div>
            <div className="flex justify-between text-[10px]">
                <span>↓ 2.4 MB/s</span>
                <span>↑ 0.8 MB/s</span>
            </div>
        </div>
    </div>
);

// Browser Component
const Browser = () => {
    const [url, setUrl] = useState('https://www.google.com');
    const [search, setSearch] = useState('');

    const handleUrlKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('Navigating to:', url);
        }
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('Searching for:', search);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Address Bar */}
            <div className="bg-slate-100 border-b border-slate-300 p-2">
                <div className="flex items-center bg-white border border-slate-300 rounded-full px-3 py-1.5">
                    <span className="text-green-600 text-xs mr-2">🔒</span>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyPress={handleUrlKeyPress}
                        className="flex-1 outline-none text-xs text-slate-700"
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white flex flex-col items-center justify-center p-4">
                <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🌐</div>
                    <div className="text-lg font-bold text-slate-700">CyberNav</div>
                </div>
                
                {/* Search Bar */}
                <div className="w-full max-w-md">
                    <div className="flex items-center bg-white border border-slate-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-slate-400 text-sm mr-2">🔍</span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                            placeholder="Search or enter URL"
                            className="flex-1 outline-none text-sm text-slate-700"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OSInterface;
