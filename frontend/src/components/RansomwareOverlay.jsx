import React, { useState } from 'react';

const RansomwareOverlay = ({ 
    isActive, 
    onPasswordSubmit,
    secondsRemaining 
}) => {
    const [password, setPassword] = useState('');

    const formatTime = (secs) => {
        if (!secs && secs !== 0) return "--:--";
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (!isActive) return null;

    return (
        // 1. Contenitore esterno: Aggiunto z-50, w-full, h-full per coprire tutto lo schermo
        <div className="absolute top-0 left-0 w-full h-full z-50 bg-red-900/90 flex flex-col items-center justify-center text-white font-mono p-4 animate-pulse-slow backdrop-blur-sm">
            
            {/* Stile per la scrollbar personalizzata (Tema Hacker) */}
            <style>{`
                .hacker-scroll::-webkit-scrollbar {
                    width: 10px;
                }
                .hacker-scroll::-webkit-scrollbar-track {
                    background: #1a0000; 
                    border: 1px solid #ef4444;
                }
                .hacker-scroll::-webkit-scrollbar-thumb {
                    background: #26dc44ff; 
                    border-radius: 2px;
                }
                .hacker-scroll::-webkit-scrollbar-thumb:hover {
                    background: #5eef44ff; 
                }
            `}</style>

            {/* 2. Contenitore Interno (La finestra):
               - max-h-[90vh]: Altezza massima 90% della viewport
               - overflow-y-auto: Abilita lo scroll verticale se il contenuto eccede
               - hacker-scroll: Classe per la scrollbar custom definita sopra
            */}
            <div className="animate-pulse-slow backdrop-blur-sm bg-black border-4 border-red-600 p-8 rounded-lg shadow-[0_0_50px_rgba(255,0,0,0.6)] max-w-3xl w-full text-center relative max-h-[90vh] overflow-y-auto hacker-scroll">
                
                {/* Skull or Scary Icon */}
                <div className="text-4xl mb-4 animate-bounce">💀</div>
                
                <h1 className="text-2xl font-bold text-red-600 mb-4 uppercase tracking-widest glitch-text border-b border-red-800 pb-2">
                    YOUR FILES ARE ENCRYPTED
                </h1>
                
                <p className="mb-6 text-sm leading-relaxed text-gray-300">
                    Many of your documents, photos, videos, databases and other files are no longer accessible because they have been encrypted. Maybe you are busy looking for a way to recover your files, but do not waste your time. Nobody can recover your files without our decryption service.
                </p>

                {/* Esempio di testo lungo per testare lo scroll (puoi rimuoverlo) */}
                <p className="mb-6 text-xs text-red-400 italic">
                    WARNING: Any attempt to close this window or shut down the system will result in permanent data loss. Our algorithm uses RSA-4096 encryption which is impossible to break without the private key.
                </p>

                <div className="bg-red-950/50 p-4 border border-red-500 mb-6 rounded shadow-inner">
                    <p className="text-yellow-400 font-bold text-sm mb-2">PAYMENT REQUIRED</p>
                    <p className="text-xs mb-2">Send $500,000 USD in Bitcoin to this address:</p>
                    <code className="bg-black px-4 py-2 block text-sm select-all cursor-pointer hover:bg-gray-900 border border-gray-700 text-red-500 font-bold tracking-wider">
                        1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                    </code>
                </div>

                <div className="flex flex-col items-center gap-4 border-t border-red-900 pt-4">
                    <div className="text-xl font-bold text-red-500 animate-pulse">
                        TIME REMAINING: {formatTime(secondsRemaining)}
                    </div>
                    
                    <div className="w-full max-w-md mt-2">
                        <label className="block text-left mb-2 text-xs text-red-300 uppercase">Enter Decryption Key:</label>
                        <div className="flex gap-2">
                             <input 
                                type="password" 
                                className="flex-1 bg-gray-900 border border-red-500 p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-red-900/50"
                                placeholder="Paste key here..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter') onPasswordSubmit(password);
                                }}
                            />
                            <button 
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm font-bold uppercase transition-all shadow-[0_0_10px_rgba(220,38,38,0.5)] hover:shadow-[0_0_20px_rgba(220,38,38,0.8)]"
                                onClick={() => onPasswordSubmit(password)}
                            >
                                DECRYPT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Scanlines Effect (Opzionale) */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[60] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
        </div>
    );
};

export default RansomwareOverlay;