import React, { useState } from 'react';
import LevelTemplate, { useLevel } from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import OSInterface from '../components/OSInterface';
import LevelCompleted from '../components/LevelCompleted';

const Level1Inner = ({ onStepChange, onToggleHint, onComplete }) => {
    const { damage } = useLevel();
    const { earnStar } = useReputation('level1', 0);
    const [emailsChecked, setEmailsChecked] = useState(0);
    const [correctIdentifications, setCorrectIdentifications] = useState(0);

    const handleEmailAction = (email, markedAsPhishing, isCorrect) => {
        const newChecked = emailsChecked + 1;
        let finalCorrect = correctIdentifications;
        
        setEmailsChecked(newChecked);

        if (isCorrect) {
            finalCorrect = correctIdentifications + 1;
            setCorrectIdentifications(finalCorrect);
            
            // Guadagna stella ogni 2 identificazioni corrette
            if (finalCorrect % 2 === 0) {
                earnStar();
            }
            // Cambia step ogni 2 email corrette
            if (finalCorrect % 2 === 0 && finalCorrect < 6) {
                onStepChange(Math.floor(finalCorrect / 2));
            }
        } else {
            // Perde vita se sbaglia
            damage(10);
        }
        
        // Completa quando tutte le 6 email sono state controllate
        if (newChecked === 6) {
            setTimeout(() => onComplete(finalCorrect, newChecked), 1000);
        }
    };

    return (
        <OSInterface 
            onEmailAction={handleEmailAction}
            onHintClick={onToggleHint}
            showHintButton={true}
        />
    );
};

const Level1 = () => {
    const { stars } = useReputation('level1', 0);
    const [currentStep, setCurrentStep] = useState(0);
    const [showHint, setShowHint] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [finalStats, setFinalStats] = useState({ correct: 0, total: 6 });
    const [startTime] = useState(Date.now());
    const [completionTime, setCompletionTime] = useState(0);

    const handleComplete = (correctCount, totalChecked) => {
        setFinalStats({ correct: correctCount, total: totalChecked });
        setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
        setTimeout(() => {
            setCompleted(true);
        }, 1500);
    };

    const getHintText = () => {
        switch(currentStep) {
            case 0:
                return 'STEP 1: Controlla il mittente. Passa il mouse sull\'indirizzo per vedere il dominio completo. Cerca errori come "paypa1.com" invece di "paypal.com".';
            case 1:
                return 'STEP 2: Usa "Ispeziona Header" per vedere dettagli tecnici. SPF e DKIM in "FAIL" indicano email sospette!';
            case 2:
                return 'STEP 3: Leggi il messaggio. Cerca richieste urgenti, errori grammaticali, richieste di denaro o password.';
            case 3:
                return 'STEP 4: Verifica allegati e link. Allegati .exe sono sempre pericolosi! Controlla i domini dei link.';
            default:
                return 'Classifica tutte le 6 email come "Email Sicura" o "Segnala Phishing". Riceverai feedback dopo ogni scelta!';
        }
    };

    const additionalStats = [
        {
            label: 'Email identificate correttamente',
            value: `${finalStats.correct}/${finalStats.total}`,
            color: finalStats.correct === finalStats.total ? 'text-cyber-green' : 'text-yellow-400'
        },
        {
            label: 'Precisione',
            value: `${Math.round((finalStats.correct / finalStats.total) * 100)}%`,
            color: finalStats.correct >= 5 ? 'text-cyber-green' : finalStats.correct >= 3 ? 'text-yellow-400' : 'text-red-500'
        }
    ];

    return (
        <LevelTemplate 
            stars={stars}
            hint={showHint ? <InfoPanel text={getHintText()} /> : null}
        >
            <Level1Inner 
                onStepChange={setCurrentStep} 
                onToggleHint={() => setShowHint(!showHint)}
                onComplete={handleComplete}
            />
            
            {completed && (
                console.log('=== RENDERING LevelCompleted ==='),
                <LevelCompleted
                    stars={stars}
                    maxStars={3}
                    completionTime={completionTime}
                    levelTitle="il livello di Phishing Detection"
                />
            )}
        </LevelTemplate>
    );
};

export default Level1;
