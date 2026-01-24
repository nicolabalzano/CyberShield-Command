import React, { useState, useEffect } from 'react';
import LevelTemplate, { useLevel } from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import MonitorScreen from '../components/MonitorScreen';
import MissionDebrief from '../components/MissionDebrief';
import Link from '../components/Link';

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

// Componente interno per gestire il danno usando useLevel
const DamageHandler = ({ errorTrigger, damageAmount }) => {
    const { damage } = useLevel();
    const lastProcessedRef = React.useRef(null);
    
    React.useEffect(() => {
        console.log('DamageHandler useEffect:', { errorTrigger, damageAmount, lastProcessed: lastProcessedRef.current });
        // Applica il danno solo se errorTrigger è cambiato e non è null
        if (errorTrigger !== null && errorTrigger !== lastProcessedRef.current) {
            console.log('Applying damage:', damageAmount);
            damage(damageAmount);
            lastProcessedRef.current = errorTrigger;
        }
    }, [errorTrigger, damageAmount, damage]);
    
    return null;
};

// Componente wrapper con logica interna che usa useLevel
const Level1Content = ({ 
    stars,
    currentStep,
    showHint,
    completed,
    finalStats,
    completionTime,
    emailsChecked,
    totalEmails,
    damagePerError,
    lastErrorTrigger,
    visibleHint,
    browserConfig,
    emailConfig,
    onEmailAction
}) => {
    return (
        <>
            {/* Status Bar - mostrato sopra tutto */}
            <div className="fixed top-[71%] left-[69%] -translate-x-1/2 z-[15]">
                <div className="text-cyber-green text-lg font-mono flex items-center gap-3">
                    <span className="font-bold">EMAILS CHECKED:</span>
                    <span className="text-2xl font-bold text-white ml-2">{emailsChecked} / {totalEmails}</span>
                </div>
            </div>

            <LevelTemplate 
                stars={stars}
                hint={showHint && visibleHint ? <InfoPanel text={visibleHint} /> : null}
                browserConfig={browserConfig}
                emailConfig={emailConfig}
                onEmailAction={onEmailAction}
            >                
                {/* Componente che gestisce il danno */}
                <DamageHandler 
                    key={lastErrorTrigger} 
                    errorTrigger={lastErrorTrigger} 
                    damageAmount={damagePerError} 
                />
                
                {completed && (
                    <MissionDebrief
                        success={true}
                        stats={{ stars, health: 100 }}
                        recapText={`PHISHING DETECTION ANALYSIS\n\n` +
                            `Email classificate: ${finalStats.total}/6\n` +
                            `Identificazioni corrette: ${finalStats.correct}/${finalStats.total}\n` +
                            `Precisione: ${Math.round((finalStats.correct / finalStats.total) * 100)}%\n` +
                            `Tempo completamento: ${completionTime}s\n\n` +
                            `${finalStats.correct === finalStats.total 
                                ? 'RISULTATO: ECCELLENTE - Perfetta identificazione di tutti gli email di phishing!' 
                                : finalStats.correct >= 5 
                                ? 'RISULTATO: BUONO - Hai identificato correttamente quasi tutti i phishing.' 
                                : 'RISULTATO: ACCETTABILE - Hai completato il livello ma con alcuni errori.'}`}
                        onExit={() => window.location.href = '/'}
                    />
                )}
            </LevelTemplate>
        </>
    );
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
    const { stars, earnStar } = useReputation('level1', 0);
    const [currentStep, setCurrentStep] = useState(0);
    const [showHint, setShowHint] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [finalStats, setFinalStats] = useState({ correct: 0, total: 6 });
    const [startTime] = useState(Date.now());
    const [completionTime, setCompletionTime] = useState(0);
    const [emailsChecked, setEmailsChecked] = useState(0);
    const [correctIdentifications, setCorrectIdentifications] = useState(0);
    const [lastErrorTrigger, setLastErrorTrigger] = useState(null);
    const [hintIndex, setHintIndex] = useState(0);
    const [visibleHint, setVisibleHint] = useState(null);
    const [headerInspected, setHeaderInspected] = useState(false);
    const [instructionsRead, setInstructionsRead] = useState(false);

    // Reset hint index quando cambia step
    useEffect(() => {
        setHintIndex(0);
    }, [currentStep]);

    // Timer che incrementa hint index ogni 15 secondi per step con hint multipli
    useEffect(() => {
        if (currentStep === 3) {
            const timer = setInterval(() => {
                setHintIndex(prev => prev + 1);
            }, 15000);
            return () => clearInterval(timer);
        }
    }, [currentStep]);

    // Transizione smooth del testo hint
    useEffect(() => {
        const text = getHintText();
        if (text !== visibleHint) {
            setVisibleHint(null);
            const timeout = setTimeout(() => {
                setVisibleHint(text);
            }, 400);
            return () => clearTimeout(timeout);
        }
    }, [currentStep, hintIndex]);

    // Sistema di assegnazione stelle:
    // Stella 1: Tutte le 6 email controllate
    // Stella 2: Almeno un header ispezionato
    // Stella 3: Istruzioni lette (CyberNav)
    useEffect(() => {
        if (!completed) return;
        
        // Stella 1: Tutte le email controllate
        if (emailsChecked === LEVEL1_EMAILS.length && stars === 0) {
            earnStar();
        }
        // Stella 2: Almeno un header ispezionato
        else if (headerInspected && stars === 1) {
            earnStar();
        }
        // Stella 3: Istruzioni lette
        else if (instructionsRead && stars === 2) {
            earnStar();
        }
    }, [completed, emailsChecked, headerInspected, instructionsRead, stars, earnStar]);

    // Calcola il danno in base al numero totale di email
    const totalEmails = LEVEL1_EMAILS.length;
    const damagePerError = Math.round(100 / totalEmails);

    const handleEmailAction = (email, markedAsPhishing, isCorrect) => {
        console.log('handleEmailAction chiamato:', { email: email.id, markedAsPhishing, isCorrect });
        const newChecked = emailsChecked + 1;
        let finalCorrect = correctIdentifications;
        
        setEmailsChecked(newChecked);

        if (isCorrect) {
            finalCorrect = correctIdentifications + 1;
            setCorrectIdentifications(finalCorrect);
        } else {
            // Trigger per il danno
            console.log('Triggering damage:', damagePerError);
            setLastErrorTrigger(Date.now());
        }
        
        // Completa quando tutte le 6 email sono state controllate
        if (newChecked === totalEmails) {
            setFinalStats({ correct: finalCorrect, total: newChecked });
            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
            setTimeout(() => {
                setCompleted(true);
            }, 1500);
        }
    };

    const emailConfig = {
        emails: LEVEL1_EMAILS,
        showFeedbackPopup: true,
        onHeaderInspect: () => {
            setHeaderInspected(true);
        }
    };

    // Configurazione browser con callback per tracciare istruzioni lette
    const dynamicBrowserConfig = {
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
        ],
        onNavigate: () => {
            setInstructionsRead(true);
        }
    };

    const getHintText = () => {
        switch(currentStep) {
            case 0:
                return 'Apri ogni email e controlla il mittente. Clicca sull\'indirizzo per vedere il dominio completo. Cerca errori come "paypa1.com" invece di "paypal.com".';
            case 1:
                return 'Usa il pulsante "Ispeziona Header" per vedere i dettagli tecnici. SPF e DKIM in "FAIL" indicano che l\'email non è autentica!';
            case 2:
                return 'Leggi attentamente il contenuto. Attento a: richieste urgenti, errori grammaticali, richieste di denaro/password, tono sospetto.';
            case 3: {
                const hints = [
                    '✅ Continua! Classifica ogni email con "Email Sicura" o "Segnala Phishing". Riceverai feedback immediato dopo ogni scelta.',
                    'Attenzione agli allegati! File .exe è un grande segnale di pericolo. Controlla sempre il dominio del mittente.',
                    'Stai facendo bene! Ricorda: quando hai dubbi, meglio marcare come phishing che rischiare. Mancano poche email!'
                ];
                return hints[Math.min(hintIndex, hints.length - 1)];
            }
            default:
                return '✅ Continua! Classifica ogni email con "Email Sicura" o "Segnala Phishing". Riceverai feedback immediato dopo ogni scelta. Attenzione agli allegati .exe!';
        }
    };

    return (
        <Level1Content
            stars={stars}
            currentStep={currentStep}
            showHint={showHint}
            completed={completed}
            finalStats={finalStats}
            completionTime={completionTime}
            emailsChecked={emailsChecked}
            totalEmails={totalEmails}
            damagePerError={damagePerError}
            lastErrorTrigger={lastErrorTrigger}
            visibleHint={visibleHint}
            browserConfig={dynamicBrowserConfig}
            emailConfig={emailConfig}
            onEmailAction={handleEmailAction}
        />
    );
};

export default Level1;
