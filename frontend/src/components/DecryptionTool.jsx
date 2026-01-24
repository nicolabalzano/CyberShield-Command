import React, { useState } from 'react';

const DecryptionTool = ({ onPasswordSubmit }) => {
    const [key, setKey] = useState('');

    return (
        <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-black border border-green-500 p-6 rounded shadow-[0_0_15px_rgba(0,255,0,0.3)]">
                <div className="flex items-center gap-2 mb-4 border-b border-green-500/30 pb-2">
                     <span className="text-2xl">🔐</span>
                     <h3 className="text-green-500 text-lg font-bold tracking-wider">DECRYPTION TOOL v1.0</h3>
                </div>
               
                <div className="space-y-4">
                    <div>
                        <label className="block text-green-700 text-xs uppercase mb-1">Status</label>
                        <div className="text-green-400 text-sm font-mono animate-pulse">WAITING FOR KEY INPUT...</div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-xs mb-1">Enter Master Decryption Key:</label>
                        <input 
                            type="text" 
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            placeholder="Type key here..." 
                            className="w-full bg-gray-900 border border-green-900 text-green-400 px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono"
                            onKeyDown={(e) => {
                                if(e.key === 'Enter') onPasswordSubmit(key);
                            }}
                        />
                    </div>

                    <button 
                        className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-2 rounded transition-colors uppercase tracking-widest text-sm"
                        onClick={() => onPasswordSubmit(key)}
                    >
                        INITIALIZE DECRYPTION
                    </button>
                    
                    <div className="text-[10px] text-gray-600 text-center pt-2">
                        Authorized Personnel Only • CyberShield Security Systems
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DecryptionTool;
