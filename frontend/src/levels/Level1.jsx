import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelTemplate, { useLevel } from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import InfoPanel from '../components/InfoPanel';
import MonitorScreen from '../components/MonitorScreen';
import MissionDebrief from '../components/MissionDebrief';
import Link from '../components/Link';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

// Componente interno per gestire il danno usando useLevel
const DamageHandler = ({ errorTrigger, damageAmount, onGameOver }) => {
    const { damage, health } = useLevel();
    const lastProcessedRef = React.useRef(null);

    React.useEffect(() => {
        // Applica il danno solo se errorTrigger è cambiato e non è null
        if (errorTrigger !== null && errorTrigger !== lastProcessedRef.current) {
            damage(damageAmount);
            lastProcessedRef.current = errorTrigger;
        }
    }, [errorTrigger, damageAmount, damage]);

    // Monitora il game over quando health <= 0
    React.useEffect(() => {
        if (health <= 0 && onGameOver) {
            onGameOver();
        }
    }, [health, onGameOver]);

    return null;
};

// Wrapper per MissionDebrief con accesso alla salute
const MissionDebriefWrapper = ({ stats, ...props }) => {
    const { health } = useLevel();
    return <MissionDebrief {...props} stats={{ ...stats, health }} />;
};

// Componente wrapper con logica interna che usa useLevel
const Level1Content = ({
    stars,
    currentStep,
    showHint,
    completed,
    failed,
    setFailed,
    finalStats,
    completionTime,
    navigate,
    emailsChecked,
    totalEmails,
    damagePerError,
    lastErrorTrigger,
    visibleHint,
    browserConfig,
    emailConfig,
    onEmailAction,
    t
}) => {
    return (
        <>
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
                    onGameOver={() => setFailed(true)}
                />

                {(completed || failed) && (
                    <MissionDebriefWrapper
                        success={completed && !failed}
                        levelId="level1"
                        stats={{ stars }}
                        recapText={completed && !failed
                            ? `${t.debrief.success.title}\n\n` +
                            `${t.debrief.success.classified} ${finalStats.total}/${totalEmails}\n` +
                            `${t.debrief.success.correct} ${finalStats.correct}/${finalStats.total}\n` +
                            `${t.debrief.success.precision} ${Math.round((finalStats.correct / finalStats.total) * 100)}%\n` +
                            `${t.debrief.success.time} ${completionTime}s\n\n` +
                            `${finalStats.correct === finalStats.total
                                ? t.debrief.success.resultExcellent
                                : finalStats.correct >= 5
                                    ? t.debrief.success.resultGood
                                    : t.debrief.success.resultAcceptable}`
                            : `${t.debrief.failure.title}\n\n${t.debrief.failure.message}`
                        }
                        onRetry={() => window.location.reload()}
                        onExit={() => navigate('/map')}
                    />
                )}
            </LevelTemplate>
        </>
    );
};

const Level1 = () => {
    const navigate = useNavigate();
    const { stars, earnStar } = useReputation('level1', 0);
    const { language } = useLanguage();
    // Fallback safely if translation missing
    const t = translations[language]?.level1 || translations['italiano'].level1;

    // Emails from translations
    const levelEmails = t.emails || [];

    const [currentStep, setCurrentStep] = useState(0);
    const [showHint, setShowHint] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [failed, setFailed] = useState(false);
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

    // Track awarded stars to prevent duplicates and allow random order
    const [awarded, setAwarded] = useState({
        emails: false,
        header: false,
        instructions: false
    });

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
    }, [currentStep, hintIndex, language]);

    // Sistema di assegnazione stelle:
    // Stella 1: Tutte le 6 email controllate
    // Stella 2: Almeno un header ispezionato (solo se non già assegnata)
    // Stella 3: Istruzioni lette (solo se non già assegnata)
    useEffect(() => {
        // Stella: Tutte le email controllate
        if (emailsChecked === levelEmails.length && !awarded.emails) {
            earnStar();
            setAwarded(prev => ({ ...prev, emails: true }));
        }

        // Stella: Almeno un header ispezionato
        if (headerInspected && !awarded.header) {
            earnStar();
            setAwarded(prev => ({ ...prev, header: true }));
        }

        // Stella: Istruzioni lette
        if (instructionsRead && !awarded.instructions) {
            earnStar();
            setAwarded(prev => ({ ...prev, instructions: true }));
        }
    }, [emailsChecked, headerInspected, instructionsRead, levelEmails.length, awarded, earnStar]);

    // Calcola il danno in base al numero totale di email
    const totalEmails = levelEmails.length;
    const damagePerError = Math.round(100 / (totalEmails || 1));

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

        // Completa quando tutte le email sono state controllate
        if (newChecked === totalEmails) {
            setFinalStats({ correct: finalCorrect, total: newChecked });
            setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
            setTimeout(() => {
                setCompleted(true);
            }, 1500);
        }
    };

    // Memoize CONFIGURATIONS to prevent child re-renders erasing state
    const emailConfig = useMemo(() => ({
        emails: levelEmails.map(e => ({
            ...e,
            isPhishing: [1, 3, 5].includes(e.id), // Hardcoding logic based on ID to keep it consistent across langs
            flagged: null, // Explicitly set flagged to null to enable buttons
            read: false, // Explicitly set read to false
            hasAttachment: !!e.attachmentName
        })),
        showFeedbackPopup: true,
        onHeaderInspect: () => {
            setHeaderInspected(true);
        }
    }), [levelEmails]);

    // Configurazione browser con callback per tracciare istruzioni lette
    const dynamicBrowserConfig = useMemo(() => ({
        availableSites: [
            {
                url: 'https://paypal.com',
                title: t.browser.paypal.title,
                icon: '💳',
                content: (
                    <div className="p-6 bg-blue-50 h-full">
                        <div className="max-w-2xl mx-auto">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-4xl">💳</div>
                                <h1 className="text-2xl font-bold text-blue-900">PayPal</h1>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow">
                                <h2 className="font-semibold mb-2">{t.browser.paypal.title}</h2>
                                <p className="text-sm text-gray-600">{t.browser.paypal.urlInfo}</p>
                                <p className="text-sm text-gray-600 mt-2">{t.browser.paypal.ssl}</p>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                url: 'https://support.google.com/mail/answer/8253',
                title: t.browser.google.pageTitle,
                icon: '📧',
                content: (
                    <div className="p-6 bg-gray-900 text-white h-full overflow-y-auto">
                        <div className="max-w-2xl mx-auto">
                            <h1 className="text-2xl font-bold mb-6 text-center">{t.browser.google.title}</h1>
                            <div className="space-y-6 text-sm">
                                <div className="bg-red-900/30 border-l-4 border-red-500 p-4 rounded-r-lg">
                                    <h3 className="font-semibold text-white text-lg mb-3 flex items-center gap-2">
                                        <span className="text-xl">⚠️</span> {t.browser.google.dangerTitle}
                                    </h3>
                                    <div className="grid gap-3">
                                        {t.browser.google.dangerList.map((item, i) => (
                                            <div key={i} className="bg-red-950/40 p-3 rounded border border-red-500/30 flex items-start gap-3">
                                                <span className="text-red-400 font-bold">✗</span>
                                                <span className="text-gray-300">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg">
                                    <h3 className="font-semibold text-white text-lg mb-3 flex items-center gap-2">
                                        <span className="text-xl">🛡️</span> {t.browser.google.safeTitle}
                                    </h3>
                                    <div className="grid gap-3">
                                        {t.browser.google.safeList.map((item, i) => (
                                            <div key={i} className="bg-green-950/40 p-3 rounded border border-green-500/30 flex items-start gap-3">
                                                <span className="text-green-400 font-bold">✓</span>
                                                <span className="text-gray-300">{item}</span>
                                            </div>
                                        ))}
                                    </div>
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
    }), [t]);

    const getHintText = () => {
        switch (currentStep) {
            case 0:
                return t.hints.step0;
            case 1:
                return t.hints.step1;
            case 2:
                return t.hints.step2;
            case 3: {
                const hints = [
                    t.hints.step3a,
                    t.hints.step3b,
                    t.hints.step3c
                ];
                return hints[Math.min(hintIndex, hints.length - 1)];
            }
            default:
                return t.hints.default;
        }
    };

    return (
        <Level1Content
            stars={stars}
            currentStep={currentStep}
            showHint={showHint}
            completed={completed}
            failed={failed}
            setFailed={setFailed}
            finalStats={finalStats}
            completionTime={completionTime}
            navigate={navigate}
            emailsChecked={emailsChecked}
            totalEmails={totalEmails}
            damagePerError={damagePerError}
            lastErrorTrigger={lastErrorTrigger}
            visibleHint={visibleHint}
            browserConfig={dynamicBrowserConfig}
            emailConfig={emailConfig}
            onEmailAction={handleEmailAction}
            t={t}
        />
    );
};

export default Level1;
