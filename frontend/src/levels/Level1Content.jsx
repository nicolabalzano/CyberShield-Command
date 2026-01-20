import React from 'react';
import { useNavigate } from 'react-router-dom';

const Level1Content = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full font-mono text-green-500">
            <p>$ establishing secure connection...</p>
            <p className="animate-pulse">$ _</p>
            
            <button 
                onClick={() => navigate('/map')}
                className="mt-8 self-start px-4 py-1 border border-red-500/50 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-all"
            >
                [ ABORT ]
            </button>
        </div>
    );
};

export default Level1Content;
