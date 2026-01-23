import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReputationStars from './ReputationStars';

const MissionDebrief = ({ 
    success, 
    stats = { stars: 0, health: 0 },
    recapText = "",
    onRetry,
    onExit
}) => {
    const navigate = useNavigate();

    const handleExit = () => {
        if (onExit) onExit();
        else navigate('/');
    };

    const handleRetry = () => {
        if (onRetry) onRetry();
        else window.location.reload();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className={`
                relative w-full max-w-2xl p-1
                bg-gradient-to-b from-gray-800 to-black 
                border-2 ${success ? 'border-green-500' : 'border-red-500'}
                rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]
                ${success ? 'shadow-green-500/20' : 'shadow-red-500/20'}
            `}>
                {/* Header Line */}
                <div className={`h-2 w-full ${success ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />

                <div className="p-8 flex flex-col items-center text-center">
                    {/* Title */}
                    <h1 className={`
                        text-4xl md:text-5xl font-black tracking-widest mb-2
                        ${success ? 'text-green-500' : 'text-red-500'}
                        font-mono uppercase
                    `}>
                        {success ? 'MISSION ACCOMPLISHED' : 'MISSION FAILED'}
                    </h1>

                    {/* Subtitle / Status */}
                    <h2 className="text-white/80 font-mono text-xl mb-8">
                        {success ? 'SYSTEM SECURED & PATCHED' : 'CONNECTION TERMINATED'}
                    </h2>

                    {/* Stats (Win Only) */}
                    {success && (
                        <div className="flex gap-8 mb-8 bg-white/5 p-4 rounded-lg border border-white/10">
                            <div className="flex flex-col items-center">
                                <span className="text-sm text-gray-400 font-mono">REPUTATION</span>
                                <ReputationStars stars={stats.stars} />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-sm text-gray-400 font-mono">SYSTEM HEALTH</span>
                                <div className="text-2xl font-bold text-cyan-400">{stats.health}%</div>
                            </div>
                        </div>
                    )}

                    {/* Recap / Message Box */}
                    <div className="w-full bg-black/40 border border-gray-700 p-6 rounded mb-8 text-left">
                        <h3 className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">
                            {success ? 'VULNERABILITY REPORT' : 'EVALUATION'}
                        </h3>
                        <p className="text-gray-200 font-mono leading-relaxed whitespace-pre-line">
                            {recapText}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 w-full justify-center">
                        {!success && (
                            <button 
                                onClick={handleRetry}
                                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded font-mono transition-all border border-red-400 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]"
                            >
                                RETRY LEVEL
                            </button>
                        )}
                        
                        <button 
                            onClick={handleExit}
                            className={`
                                px-8 py-3 font-bold rounded font-mono transition-all 
                                border 
                                ${success 
                                    ? 'bg-green-600 hover:bg-green-700 text-white border-green-400 hover:shadow-[0_0_15px_rgba(22,163,74,0.6)]' 
                                    : 'bg-transparent hover:bg-white/10 text-white border-white/30'
                                }
                            `}
                        >
                            {success ? 'CONTINUE' : 'RETURN TO MAP'}
                        </button>
                    </div>
                </div>

                {/* Footer Deco */}
                <div className="absolute bottom-2 right-4 text-[10px] text-gray-600 font-mono">
                    SEC_LEVEL_07 // {new Date().toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default MissionDebrief;
