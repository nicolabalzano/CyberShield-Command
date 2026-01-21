import React, { useState } from 'react';
import LevelTemplate, { useLevel } from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import MonitorScreen from '../components/MonitorScreen';
import LevelCompleted from '../components/LevelCompleted';

const LEVEL1_EMAILS = [
    {
        id: 1,
        from: 'security@paypa1.com',
        timestamp: 'Oggi 09:15',
        subject: 'URGENTE: Il tuo account è stato bloccato',
        preview: 'Abbiamo rilevato attività sospette sul tuo account...',
        isPhishing: true,
        body: 'Gentile Cliente,\n\nAbbiamo rilevato un accesso non autorizzato al tuo conto PayPal. Per la tua sicurezza, il conto è stato temporaneamente bloccato.\n\nClicca qui per verificare la tua identità e sbloccare il conto: http://paypa1-verify.com/login\n\nSe non agisci entro 24 ore, il conto verrà chiuso permanentemente.\n\nSupporto PayPal',
        hasAttachment: false,
        explanation: 'PHISHING: Dominio del mittente contraffatto ("paypa1" invece di "paypal"), senso di urgenza ("bloccato", "24 ore"), link verso un dominio non ufficiale.',
        links: ['http://paypa1-verify.com/login'],
        read: false,
        flagged: null
    },
    {
        id: 2,
        from: 'hr@yourcompany.com',
        timestamp: 'Oggi 10:30',
        subject: 'Aggiornamento policy aziendale',
        preview: 'Si prega di prendere visione del nuovo documento...',
        isPhishing: false,
        body: 'Ciao,\n\nIn allegato trovi il documento aggiornato relativo alle nuove policy di smart working, in vigore dal prossimo mese.\n\nPer qualsiasi dubbio contattare l\'ufficio HR.\n\nCordiali saluti,\nHR Team\nYourCompany Inc.',
        hasAttachment: true,
        attachmentName: 'smart_working_policy_v2.pdf',
        explanation: 'LEGITTIMA: Email interna dal dominio aziendale corretto, tono professionale, allegato PDF (formato sicuro per documenti).',
        read: false,
        flagged: null
    },
    {
        id: 3,
        from: 'ceo.urgent123@gmail.com',
        timestamp: 'Oggi 14:55',
        subject: 'Bonifico Urgente',
        preview: 'Ho bisogno che tu effettui questo pagamento immediat...',
        isPhishing: true,
        body: 'Ciao,\n\nSono in riunione e non posso parlare al telefono. Ho bisogno che tu disponga subito un bonifico urgente per un nuovo fornitore. È vitale per chiudere l\'accordo oggi.\n\nTi invio i dettagli a breve. Rispondimi appena leggi.\n\nSent from my iPhone',
        hasAttachment: false,
        explanation: 'PHISHING (CEO Fraud): Il mittente usa un indirizzo Gmail generico invece di quello aziendale, crea forte urgenza e pressione psicologica per bypassare le procedure.',
        read: false,
        flagged: null
    },
    {
        id: 4,
        from: 'support@microsoft.com',
        timestamp: 'Oggi 15:20',
        subject: 'Il tuo abbonamento Microsoft 365',
        preview: 'Ricevuta di rinnovo automatico...',
        isPhishing: false,
        body: 'Gentile Utente,\n\nIl tuo abbonamento a Microsoft 365 è stato rinnovato automaticamente come previsto. Trovi la ricevuta nel tuo account.\n\nSe hai domande, visita support.microsoft.com\n\nMicrosoft Team',
        hasAttachment: false,
        explanation: 'LEGITTIMA: Indirizzo mittente ufficiale di Microsoft, nessuna richiesta di dati sensibili o link strani, tono informativo.',
        links: ['https://support.microsoft.com'],
        read: false,
        flagged: null
    },
    {
        id: 5,
        from: 'vincitore@lotteria-premio.xyz',
        timestamp: 'Oggi 16:45',
        subject: 'HAI VINTO UN IPHONE 15!!!',
        preview: 'Congratulazioni! Sei il visitatore numero 1.000.000...',
        isPhishing: true,
        body: 'CONGRATULAZIONI!!!\n\nSei stato estratto come vincitore del nostro premio mensile. Hai vinto un nuovissimo iPhone 15 Pro Max!\n\nScarica il modulo allegato per reclamare il tuo premio entro 1 ora!\n\nClicca qui: http://claim-prize-now.xyz/win',
        hasAttachment: true,
        attachmentName: 'modulo_vincita.exe',
        explanation: 'PHISHING: L\'offerta è troppo bella per essere vera, il dominio è sospetto (.xyz), l\'allegato è un file eseguibile (.exe) che probabilmente contiene malware.',
        links: ['http://claim-prize-now.xyz/win'],
        read: false,
        flagged: null
    },
    {
        id: 6,
        from: 'newsletter@tech-news.com',
        timestamp: 'Ieri 18:30',
        subject: 'Le novità tech della settimana',
        preview: 'Ecco cosa è successo nel mondo della tecnologia...',
        isPhishing: false,
        body: 'Ciao,\n\nEcco il riassunto settimanale delle notizie tech più importanti:\n\n1. Nuovi processori quantistici annunciati\n2. AI Act approvato in EU\n3. Avanzamenti nella cybersecurity\n\nLeggi tutto sul nostro sito.\n\nTech News Team\nUnsubscribe',
        hasAttachment: false,
        explanation: 'LEGITTIMA: Tipica newsletter informativa, link coerenti con il brand, nessuna richiesta strana.',
        links: ['https://tech-news.com/weekly'],
        read: false,
        flagged: null
    }
];

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

const Level1Inner = ({ onStepChange, onToggleHint, onComplete, emailsChecked, correctIdentifications }) => {
    const { damage } = useLevel();
    const { earnStar } = useReputation('level1', 0);

    const handleEmailAction = (email, markedAsPhishing, isCorrect) => {
        const newChecked = emailsChecked + 1;
        let finalCorrect = correctIdentifications;
        
        onComplete(newChecked, isCorrect ? correctIdentifications + 1 : correctIdentifications);

        if (isCorrect) {
            finalCorrect = correctIdentifications + 1;
            
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
    };

    return null; // Componente logico senza rendering
};

const Level1 = () => {
    const { stars } = useReputation('level1', 0);
    const [currentStep, setCurrentStep] = useState(0);
    const [showHint, setShowHint] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [finalStats, setFinalStats] = useState({ correct: 0, total: 6 });
    const [startTime] = useState(Date.now());
    const [completionTime, setCompletionTime] = useState(0);
    const [emailsChecked, setEmailsChecked] = useState(0);
    const [correctIdentifications, setCorrectIdentifications] = useState(0);

    const handleEmailAction = (email, markedAsPhishing, isCorrect) => {
        const newChecked = emailsChecked + 1;
        let finalCorrect = correctIdentifications;
        
        setEmailsChecked(newChecked);

        if (isCorrect) {
            finalCorrect = correctIdentifications + 1;
            setCorrectIdentifications(finalCorrect);
            
            // Cambia step ogni 2 email corrette
            if (finalCorrect % 2 === 0 && finalCorrect < 6) {
                setCurrentStep(Math.floor(finalCorrect / 2));
            }
        }
        
        // Completa quando tutte le 6 email sono state controllate
        if (newChecked === 6) {
            setFinalStats({ correct: finalCorrect, total: newChecked });
            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
            setTimeout(() => {
                setCompleted(true);
            }, 1500);
        }
    };

    const emailConfig = {
        emails: LEVEL1_EMAILS,
        showFeedbackPopup: true
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
        <div>
            {/* Status Bar - mostrato sopra tutto */}
            <div className="fixed top-18 left-1/2 -translate-x-1/2 z-[15]">
                <div className="text-cyan-400 text-lg font-mono flex items-center gap-3">
                    <span className="font-bold">EMAILS CHECKED:</span>
                    <span className="text-2xl font-bold text-white ml-2">{emailsChecked} / 6</span>
                </div>
            </div>

            <LevelTemplate 
                stars={stars}
                hint={showHint ? <InfoPanel text={getHintText()} /> : null}
                browserConfig={browserConfig}
                emailConfig={emailConfig}
                onEmailAction={handleEmailAction}
            >                
                
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
        </div>
    );
};

export default Level1;
