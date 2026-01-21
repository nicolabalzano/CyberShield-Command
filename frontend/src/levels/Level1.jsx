import React, { useState } from 'react';
import LevelTemplate, { useLevel } from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import MonitorScreen from '../components/MonitorScreen';
import LevelCompleted from '../components/LevelCompleted';

// Configurazione Browser con siti utili per il phishing detection (fuori dal componente per evitare re-creazione)
const browserConfig = {
    availableSites: [
        {
            url: 'https://paypal.com',
            title: 'PayPal Official',
            icon: '💳',
            content: (
                <div className="p-6 bg-blue-50 h-full">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="text-4xl">💳</div>
                            <h1 className="text-2xl font-bold text-blue-900">PayPal</h1>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow">
                            <h2 className="font-semibold mb-2">Sito Ufficiale PayPal</h2>
                            <p className="text-sm text-gray-600">URL corretto: https://paypal.com</p>
                            <p className="text-sm text-gray-600 mt-2">Certificato SSL valido ✅</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            url: 'https://support.google.com/mail/answer/8253',
            title: 'Gmail Anti-Phishing Guide',
            icon: '📧',
            content: (
                <div className="p-6 bg-white h-full">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-2xl font-bold mb-4">Come riconoscere email di phishing</h1>
                        <div className="space-y-4 text-sm">
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                                <h3 className="font-semibold">⚠️ Segnali di pericolo:</h3>
                                <ul className="list-disc ml-4 mt-2 space-y-1">
                                    <li>Mittente sospetto o sconosciuto</li>
                                    <li>Errori ortografici nel dominio</li>
                                    <li>Richieste urgenti di azione</li>
                                    <li>Link che non corrispondono al dominio dichiarato</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 border-l-4 border-green-400 p-3">
                                <h3 className="font-semibold">✅ Verifica sempre:</h3>
                                <ul className="list-disc ml-4 mt-2 space-y-1">
                                    <li>SPF e DKIM negli header</li>
                                    <li>Dominio del mittente</li>
                                    <li>Destinazione dei link</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ]
};

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
        <MonitorScreen 
            onEmailAction={handleEmailAction}
            onHintClick={onToggleHint}
            showHintButton={true}
            browserConfig={browserConfig}
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
