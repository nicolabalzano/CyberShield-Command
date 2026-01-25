import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReputationStars from './ReputationStars';
import { useSave } from '../contexts/SaveContext';

const MissionDebrief = ({
    success,
    stats = { stars: 0, health: 0 },
    recapText = "",
    levelId = null, // ID del livello per il salvataggio (es: 'level1', 'level2', ecc.)
    onRetry,
    onExit
}) => {
    const navigate = useNavigate();
    const { updateStars, getStars } = useSave();

    // Salva il progresso quando il debrief viene mostrato (solo se vittoria)
    // Logica High Score: salva solo se il punteggio attuale migliora quello salvato
    useEffect(() => {
        if (success && levelId && stats.stars > 0) {
            const currentStars = getStars(levelId) || 0;
            if (stats.stars > currentStars) {
                updateStars(levelId, stats.stars);
            }
        }
    }, [success, levelId, stats.stars, updateStars, getStars]);

    const handleExit = () => {
        if (onExit) onExit();
        else navigate('/map');
    };

    const handleRetry = () => {
        if (onRetry) onRetry();
        else window.location.reload();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className={`
                relative w-full max-w-xl p-1
                bg-gradient-to-b from-gray-800 to-black 
                border-2 ${success ? 'border-green-500' : 'border-red-500'}
                rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]
                ${success ? 'shadow-green-500/20' : 'shadow-red-500/20'}
            `}>
                {/* Header Line */}
                <div className={`h-2 w-full ${success ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />

                <div className="p-6 flex flex-col items-center text-center">
                    {/* Title */}
                    <h1 className={`
                        text-3xl md:text-4xl font-black tracking-widest mb-1
                        ${success ? 'text-green-500' : 'text-red-500'}
                        font-mono uppercase
                    `}>
                        {success ? 'MISSION ACCOMPLISHED' : 'MISSION FAILED'}
                    </h1>

                    {/* Subtitle / Status */}
                    <h2 className="text-white/70 font-mono text-sm mb-4">
                        {success ? 'SYSTEM SECURED & PATCHED' : 'CONNECTION TERMINATED'}
                    </h2>

                    {/* Stats (Win Only) */}
                    {success && (
                        <div className="flex gap-6 mb-4 bg-white/5 p-3 rounded-lg border border-white/10 text-sm">
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-gray-400 font-mono mb-1">REPUTATION</span>
                                <ReputationStars stars={stats.stars} />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-gray-400 font-mono mb-1">SYSTEM HEALTH</span>
                                <div className="text-lg font-bold text-cyan-400">{stats.health}%</div>
                            </div>
                        </div>
                    )}

                    {/* Security Tip for partial success */}
                    {success && stats.stars > 0 && stats.stars < 3 && (
                        <div className="w-full mb-4 px-4 py-3 bg-yellow-900/40 border border-yellow-700/50 rounded text-yellow-100 text-xs font-mono text-left flex items-start gap-3">
                            <span className="text-xl">💡</span>
                            <div>
                                <span className="font-bold text-yellow-400 block mb-1">SECURITY TIP:</span>
                                Per ottenere la massima sicurezza è "ottimale" completare tutte le azioni richieste e le mitigazioni avanzate.
                            </div>
                        </div>
                    )}

                    {/* Recap / Message Box */}
                    {recapText && (
                        <div className="w-full bg-black/40 border border-gray-700 p-4 rounded mb-4 text-left max-h-[120px] overflow-y-auto">
                            <h3 className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-1">
                                {success ? 'VULNERABILITY REPORT' : 'EVALUATION'}
                            </h3>
                            <p className="text-gray-300 font-mono text-xs leading-relaxed whitespace-pre-line">
                                {recapText}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 w-full justify-center">
                        {!success && (
                            <button
                                onClick={handleRetry}
                                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded font-mono transition-all border border-red-400 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]"
                            >
                                RETRY LEVEL
                            </button>
                        )}

                        <button
                            onClick={handleExit}
                            className={`
                                px-6 py-2 font-bold text-sm rounded font-mono transition-all 
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
                <div className="absolute bottom-1 right-3 text-[9px] text-gray-600 font-mono">
                    SEC_LEVEL // {new Date().toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default MissionDebrief;
