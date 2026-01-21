import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate, { useLevel } from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import { useAudio } from '../contexts/AudioContext';

const Level9Content = ({ earnStar, toggleHint, showHint }) => {
    const navigate = useNavigate();
    const { damage, heal, health } = useLevel();
    
    return (
        <div className="relative flex flex-col h-full font-mono text-cyber-green">
            <p>$ establishing secure connection...</p>
            <p>$ Current Health Integrity: {health}%</p>
            <p className="animate-pulse">$ _</p>
            
            <div className="flex gap-2 mt-4">
                <button 
                    onClick={() => damage(10)}
                    className="px-4 py-1 border border-cyber-red hover:bg-cyber-red/20 text-cyber-red text-xs font-bold transition-all"
                >
                    [ DAMAGE sample ]
                </button>
                <button 
                     onClick={() => heal(10)}
                    className="px-4 py-1 border border-cyber-green hover:bg-cyber-green/20 text-cyber-green text-xs font-bold transition-all"
                >
                    [ HEAL sample ]
                </button>
            </div>

            {/* Esempio di utilizzo della funzione */}
            <button 
                onClick={earnStar}
                className="mt-4 self-start px-4 py-1 border border-cyber-green/50 hover:bg-cyber-green/20 text-cyber-green text-xs font-bold transition-all"
            >
                [ DEBUG: EARN STAR ]
            </button>

            <button 
                onClick={toggleHint}
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
    );
};

const Level9 = () => {
    const { stars, earnStar } = useReputation(0);
    const [showHint, setShowHint] = useState(false);
    const { playSfx } = useAudio();

    const toggleHint = () => {
        if (!showHint) {
            playSfx('/sfx/hint.mp3');
        }
        setShowHint(!showHint);
    };

    return (
        <LevelTemplate 
            stars={stars} 
            hint={showHint ? <InfoPanel text="Controlla i log del server per trovare l'indirizzo IP sospetto." /> : null}
        >
           <Level9Content 
                earnStar={earnStar} 
                toggleHint={toggleHint} 
                showHint={showHint} 
           />
        </LevelTemplate>
    );
};


export default Level9;
