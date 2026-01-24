import React, { useState } from 'react';

const RansomwareOverlay = ({ 
    isActive, 
    onPasswordSubmit,
    secondsRemaining 
}) => {
    const [password, setPassword] = useState('');

    // Format fake count down
    const formatTime = (secs) => {
        // Handle undefined just in case
        if (!secs && secs !== 0) return "--:--";
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (!isActive) return null;

    return (
        <div className="bg-red-900/90 flex flex-col items-center justify-center text-white font-mono p-4 animate-pulse-slow overflow-auto">
            <div className="bg-black border-4 border-red-600 p-8 rounded-lg shadow-[0_0_20px_rgba(255,0,0,0.5)] max-w-3xl w-full text-center relative">
                
                {/* Skull or Scary Icon */}
                <div className="text-3xl mb-2 animate-bounce">💀</div>
                
                <h1 className="text-sm font-bold text-red-600 mb-2 uppercase tracking-widest glitch-text">
                    YOUR FILES ARE ENCRYPTED
                </h1>
                
                <p className="mb-4 text-[10px] leading-tight">
                    Many of your documents, photos, videos, databases and other files are no longer accessible because they have been encrypted. Maybe you are busy looking for a way to recover your files, but do not waste your time. Nobody can recover your files without our decryption service.
                </p>

                <div className="bg-red-950 p-2 border border-red-500 mb-4 rounded">
                    <p className="text-yellow-400 font-bold text-xs mb-1">PAYMENT REQUIRED</p>
                    <p className="text-[10px] mb-1">Send $500,000 USD in Bitcoin to this address:</p>
                    <code className="bg-black px-2 py-1 block text-xs select-all cursor-pointer hover:bg-gray-900 border border-gray-700">
                        1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                    </code>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="text-lg font-bold text-red-500">
                        TIME REMAINING: {formatTime(secondsRemaining)}
                    </div>
                    
                    <div className="w-full max-w-sm mt-2">
                        <label className="block text-left mb-1 text-[10px] text-gray-400">Enter Decryption Key:</label>
                        <div className="flex gap-1">
                             <input 
                                type="password" 
                                className="flex-1 bg-gray-900 border border-red-500 p-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-600"
                                placeholder="Paste key here..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter') onPasswordSubmit(password);
                                }}
                            />
                            <button 
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 text-xs font-bold uppercase transition-colors"
                                onClick={() => onPasswordSubmit(password)}
                            >
                                DECRYPT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Overlay noise or scanlines could go here */}
            {/* <div className="absolute inset-0 pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-5 mix-blend-overlay"></div> */}
        </div>
    );
};

export default RansomwareOverlay;
