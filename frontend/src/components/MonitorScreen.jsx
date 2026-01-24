import React, { useState } from 'react';
import monitorReal from '../assets/monitor_real.png';
import EmailClient from './EmailClient';
import Terminal from './Terminal';
import Browser from './Browser';
import SIEMSystem from './SIEMSystem';
import ReverseEngineeringViewer from './ReverseEngineeringViewer';
import CodeEditor from './CodeEditor';
import PacketAnalyzer from './PacketAnalyzer';
import RansomwareOverlay from './RansomwareOverlay';
import DecryptionTool from './DecryptionTool';
import { BrowserProvider } from '../contexts/BrowserContext';

/**
 * A reusable component that frames content inside a monitor image.
 * Shows a complete OS interface (desktop with windows) inside the monitor screen.
 */
const MonitorScreen = ({ 
  onEmailAction, 
  onHintClick, 
  showHintButton = false, 
  terminalConfig = {},
  siemConfig = {},
  emailConfig = {},
  browserConfig = {},
  revEngConfig = null,
  codeEditorConfig = null,
  packetAnalyzerConfig = null,
  ransomwareOverlayConfig = null,
  decryptionToolConfig = null,
  statusText = null,
  className = "",
  children
}) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const [windows, setWindows] = useState([]);
  const [nextWindowId, setNextWindowId] = useState(1);
  const [hasTriggeredRansomware, setHasTriggeredRansomware] = useState(false);
  const [hasTriggeredDecryption, setHasTriggeredDecryption] = useState(false);

  // Aggiorna l'ora ogni secondo
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (title, contentType, size = { width: 600, height: 400 }, extraData = {}) => {
    const offset = ((nextWindowId - 1) % 5) * 20;
    const newWindow = {
      id: nextWindowId,
      title,
      contentType,
      size,
      position: { x: 20 + offset, y: 20 + offset },
      isMinimized: false,
      isMaximized: true, // MODIFICATO: ora le app si aprono direttamente a tutto schermo
      zIndex: nextWindowId,
      extraData 
    };
    setWindows(prevWindows => [...prevWindows, newWindow]);
    setNextWindowId(prevId => prevId + 1);
  };

  // Effect to automatically open Ransomware window when active
  React.useEffect(() => {
    if (ransomwareOverlayConfig?.isActive && !hasTriggeredRansomware) {
      openWindow('⚠️ CRITICAL SYSTEM ALERT ⚠️', 'ransomware', { width: 800, height: 600 });
      setHasTriggeredRansomware(true);
    }
  }, [ransomwareOverlayConfig?.isActive, hasTriggeredRansomware]);

  // Effect to automatically open Decryption Tool when available
  React.useEffect(() => {
    if (decryptionToolConfig && !hasTriggeredDecryption) {
      openWindow('Decryption Tool', 'decryption-tool', { width: 500, height: 400 });
      setHasTriggeredDecryption(true);
    }
  }, [decryptionToolConfig, hasTriggeredDecryption]);

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
    <BrowserProvider openWindow={openWindow}>
      {children}
      
      <div className={`relative w-full max-w-5xl aspect-video bg-transparent ${className}`}>
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src={monitorReal} 
            alt="Monitor" 
            className="relative z-50 w-auto h-full max-h-[80vh] object-contain drop-shadow-2xl"
        />
        
        <div className="absolute z-[60] overflow-hidden w-[70%] h-[70%] top-[4%] right-[15%]">
          <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">

            <div className="absolute -top-0 left-0 right-0 bottom-10 p-4">
              <div className="grid grid-cols-8 gap-4 h-full content-start">
                <DesktopIcon 
                  icon="📧" 
                  label="Email" 
                  onClick={() => openWindow('Email Client', 'email')}
                />

                <DesktopIcon 
                  icon="💻" 
                  label="Terminal" 
                  onClick={() => openWindow('Terminal', 'terminal')}
                />
                <DesktopIcon 
                  icon="🌐" 
                  label="CyberNav" 
                  onClick={() => openWindow('CyberNav Browser', 'browser')}
                />
                <DesktopIcon 
                  icon="🛡️" 
                  label="SIEM" 
                  onClick={() => openWindow('SIEM System', 'siem')}
                />
                
                {revEngConfig && (
                  <DesktopIcon 
                    icon="🐞" 
                    label="RE Tool" 
                    onClick={() => openWindow('Reverse Engineering Tool', 'reveng')} 
                  />
                )}
                
                {codeEditorConfig && (
                  <DesktopIcon 
                    icon="📝" 
                    label="Code Editor" 
                    onClick={() => openWindow('Code Editor', 'code-editor')} 
                  />
                )}

                {packetAnalyzerConfig && (
                  <DesktopIcon 
                    icon="📡" 
                    label="Packet Sniffer" 
                    onClick={() => openWindow('Packet Analyzer', 'packet-analyzer')} 
                  />
                )}

                {decryptionToolConfig && (
                   <DesktopIcon 
                    icon="🔐" 
                    label="Decryptor" 
                    onClick={() => openWindow('Decryption Tool', 'decryption-tool')} 
                  />
                )}
              </div>


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
                    revEngConfig={revEngConfig}
                    codeEditorConfig={codeEditorConfig}
                    packetAnalyzerConfig={packetAnalyzerConfig}
                    ransomwareOverlayConfig={ransomwareOverlayConfig}
                    decryptionToolConfig={decryptionToolConfig}
                  />
                )
              ))}

              {ransomwareOverlayConfig && ransomwareOverlayConfig.isActive && (
                 <RansomwareOverlay {...ransomwareOverlayConfig} />
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-slate-800 to-slate-700 border-t border-slate-600 flex items-center px-3 gap-2 z-50">
             <div className="text-cyan-400 font-bold text-xs">◈ CYBER OS</div>
              <div className="flex gap-1 flex-1 overflow-x-auto no-scrollbar items-center">
                {windows.map(window => (
                  <span
                    key={window.id}
                    onClick={() => minimizeWindow(window.id)}
                    className={`px-3 py-1 text-xs rounded transition-all cursor-pointer whitespace-nowrap ${
                      window.isMinimized 
                        ? 'bg-slate-600 text-slate-300' 
                        : 'bg-slate-500 text-white'
                    }`}
                  >
                    {window.title}
                  </span>
                ))}
              </div>

              <div className="flex items-center px-2 border-l border-slate-600 ml-2">
                <div className="text-[10px] text-cyan-400 font-mono">{time}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </BrowserProvider>
  );
};

const DesktopIcon = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded transition-colors group"
  >
    <div className="text-4xl group-hover:scale-110 transition-transform">{icon}</div>
    <div className="text-[10px] text-white font-medium text-center">
      {label}
    </div>
  </button>
);

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
  browserConfig,
  revEngConfig,
  codeEditorConfig,
  packetAnalyzerConfig,
  ransomwareOverlayConfig,
  decryptionToolConfig
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
        top: 0,
        width: '100%',
        height: '100%',
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

      <div className="h-[calc(100%-2rem)] overflow-auto">
        {windowData.contentType === 'email' && <EmailClient onEmailAction={onEmailAction} {...emailConfig} />}
        {windowData.contentType === 'terminal' && <Terminal {...terminalConfig} />}
        {windowData.contentType === 'browser' && (
          <Browser 
            {...browserConfig} 
            initialUrl={windowData.extraData?.initialUrl || browserConfig.initialUrl}
          />
        )}
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
        {windowData.contentType === 'reveng' && <ReverseEngineeringViewer {...revEngConfig} />}
        {windowData.contentType === 'code-editor' && <CodeEditor {...codeEditorConfig} />}
        {windowData.contentType === 'packet-analyzer' && <PacketAnalyzer {...packetAnalyzerConfig} />}
        {windowData.contentType === 'ransomware' && <RansomwareOverlay {...ransomwareOverlayConfig} />}
        {windowData.contentType === 'decryption-tool' && <DecryptionTool {...decryptionToolConfig} />}
      </div>
    </div>
  );
};

export default MonitorScreen;