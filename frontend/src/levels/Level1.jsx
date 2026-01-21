import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import OSInterface from '../components/OSInterface';

const Level1 = () => {
    const navigate = useNavigate();
    const { stars, earnStar } = useReputation('level1', 0);
    const [showHint, setShowHint] = useState(false);

    return (
        <LevelTemplate 
            stars={stars} 
            hint={showHint ? <InfoPanel text="Controlla i log del server per trovare l'indirizzo IP sospetto." /> : null}
        >
            <OSInterface />
        </LevelTemplate>
    );
};

export default Level1;
