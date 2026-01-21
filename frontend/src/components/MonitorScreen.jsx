import React, { useState } from 'react';
import monitorReal from '../assets/monitor_real.png';
import EmailClient from './EmailClient';
import Terminal from './Terminal';
import Browser from './Browser';
import FileManager from './FileManager';
import SIEMSystem from './SIEMSystem';

/**
 * A reusable component that frames content inside a monitor image.
 * Shows a complete OS interface (desktop with windows) inside the monitor screen.
 * 
 * @param {Object} props
 * @param {Function} [props.onEmailAction] - Callback for email actions.
 * @param {Function} [props.onHintClick] - Callback for hint button click.
 * @param {boolean} [props.showHintButton] - Whether to show the hint button.
 * @param {Object} [props.terminalConfig] - Configuration for Terminal component.
 * @param {Object} [props.siemConfig] - Configuration for SIEM component.
 * @param {Object} [props.emailConfig] - Configuration for Email component.
 * @param {Object} [props.browserConfig] - Configuration for Browser component.
 * @param {string} [props.className] - Additional classes for the outer container.
 */
const MonitorScreen = ({ 
  onEmailAction, 
  onHintClick, 
  showHintButton = false, 
  terminalConfig = {},
  siemConfig = {},
  emailConfig = {},
  browserConfig = {},
  className = ""
}) => {
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

  const openWindow = (title, contentType, size = { width: 600, height: 400 }) => {
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
    <div className={`relative w-full max-w-5xl aspect-video bg-transparent ${className}`}>
      {/* This image acts as the monitor frame */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
            src={monitorReal} 
            alt="Monitor" 
            className="relative z-50 w-auto h-full max-h-[80vh] object-contain drop-shadow-2xl"
        />
        
        {/* Screen Content Overlay with OS Interface */}
        <div className="absolute z-[60] overflow-hidden w-[70%] h-[70%] top-[4%] right-[15%]">
          <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 flex items-center px-3 z-50">
              <div className="flex items-center gap-3 flex-1">
                <div className="text-cyan-400 font-bold text-xs">◈ CYBER OS</div>
                {showHintButton && (
                  <button 
                    onClick={onHintClick}
                    className="px-3 py-1 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 text-xs rounded transition-all"
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
                    terminalConfig={terminalConfig}
                    siemConfig={siemConfig}
                    emailConfig={emailConfig}
                    browserConfig={browserConfig}
                  />
                )
              ))}
            </div>

            {/* Taskbar */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-slate-800 to-slate-700 border-t border-slate-600 flex items-center px-3 gap-2 z-50">
             
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
const Window = ({ 
  window: windowData, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus, 
  onEmailAction, 
  terminalConfig,
  siemConfig,
  emailConfig,
  browserConfig
}) => {
  const [position, setPosition] = useState(windowData.position);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (windowData.isMaximized) return;
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

  const windowStyle = windowData.isMaximized
    ? {
        left: 0,
        top: 32,
        width: '100%',
        height: 'calc(100% - 72px)',
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
        {windowData.contentType === 'email' && <EmailClient onEmailAction={onEmailAction} {...emailConfig} />}
        {windowData.contentType === 'files' && <FileManager />}
        {windowData.contentType === 'terminal' && <Terminal {...terminalConfig} />}
        {windowData.contentType === 'browser' && <Browser {...browserConfig} />}
        {windowData.contentType === 'siem' && (
          <SIEMSystem 
            logs={siemConfig.logs || []}
            blockedIPs={siemConfig.blockedIPs || 0}
            currentStep={siemConfig.currentStep || 0}
            trafficHistory={siemConfig.trafficHistory || []}
            networkTraffic={siemConfig.networkTraffic || { incoming: 0, outgoing: 0 }}
            protocols={siemConfig.protocols || { http: 0, https: 0, ssh: 0, ftp: 0 }}
            selectedLog={siemConfig.selectedLog || null}
            onLogClick={siemConfig.onLogClick || (() => {})}
          />
        )}
      </div>
    </div>
  );
};

export default MonitorScreen;
