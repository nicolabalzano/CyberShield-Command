import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';

const Level1 = () => {
    const navigate = useNavigate();
    const { stars, earnStar } = useReputation(0);
    const [showHint, setShowHint] = useState(false);

    return (
        <LevelTemplate 
            stars={stars} 
            hint={showHint ? <InfoPanel text="Controlla i log del server per trovare l'indirizzo IP sospetto." /> : null}
        >
            <div className="relative flex flex-col h-full font-mono text-cyber-green">
                <p>$ establishing secure connection...</p>
                <p className="animate-pulse">$ _</p>
                
                {/* Esempio di utilizzo della funzione */}
                <button 
                    onClick={earnStar}
                    className="mt-4 self-start px-4 py-1 border border-cyber-green/50 hover:bg-cyber-green/20 text-cyber-green text-xs font-bold transition-all"
                >
                    [ DEBUG: EARN STAR ]
                </button>

                <button 
                    onClick={() => setShowHint(!showHint)}
                    className="mt-4 self-start px-4 py-1 border border-cyber-blue/50 hover:bg-cyber-blue/20 text-cyber-blue text-xs font-bold transition-all"
                >
                    [ HELP ]
                </button>

                <button 
                    onClick={() => navigate('/map')}
                    className="mt-4 self-start px-4 py-1 border border-cyber-red/50 hover:bg-cyber-red/20 text-cyber-red text-xs font-bold transition-all"
                >
                    [ ABORT ]
                </button>
            </div>
        </LevelTemplate>
    );
};

export default Level1;
