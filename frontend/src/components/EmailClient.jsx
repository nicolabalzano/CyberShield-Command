import React, { useState, useEffect } from 'react';
import Link from './Link';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const defaultFeedbackMessages = {
    success_phishing: '',
    success_safe: '',
    error_phishing: '',
    error_safe: ''
};

const EmailClient = ({ onEmailAction, onEmailRead = () => { }, onHeaderInspect, emails: initialEmails, feedbackMessages, showFeedbackPopup = true }) => {
    const { language } = useLanguage();
    const t = translations[language]?.emailClient || translations['italiano'].emailClient;
    const [emails, setEmails] = useState(initialEmails || []);

    // Se vengono passate nuove props email, aggiorna lo stato
    useEffect(() => {
        if (initialEmails) {
            setEmails(initialEmails);
        }
    }, [initialEmails]);

    const [selectedEmail, setSelectedEmail] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [showInspector, setShowInspector] = useState(false);

    const messages = { ...defaultFeedbackMessages, ...feedbackMessages };

    // Handler per click su link malevoli
    const handleLinkClick = (url) => {
        if (selectedEmail && selectedEmail.isPhishing) {
            // Mostra feedback negativo per link malevolo
            setFeedback({
                correct: false,
                isPhishing: true,
                explanation: selectedEmail.explanation,
                consequence: t.dangerText
            });
            setShowFeedback(true);

            // Notifica il livello del danno
            if (onEmailAction) {
                onEmailAction(selectedEmail, true, false);
            }

            // Blocca l'apertura del browser
            return false;
        }
        // Se non è phishing, il link si apre normalmente nel Browser
        return true;
    };

    // Handler per click su allegati
    const handleAttachmentClick = () => {
        if (selectedEmail && selectedEmail.hasAttachment) {
            if (selectedEmail.isPhishing) {
                // Mostra feedback negativo per allegato malevolo
                setFeedback({
                    correct: false,
                    isPhishing: true,
                    explanation: selectedEmail.explanation,
                    consequence: t.dangerAttachment
                });
                setShowFeedback(true);

                // Notifica il livello del danno
                if (onEmailAction) {
                    onEmailAction(selectedEmail, true, false);
                }
            } else {
                // Allegato sicuro
                setFeedback({
                    correct: true,
                    isPhishing: false,
                    explanation: t.safeAttachmentExpl,
                    consequence: t.safeAttachment
                });
                setShowFeedback(true);
            }
        }
    };

    // Funzione per rendere i link cliccabili nell'email body
    const renderEmailBody = (text, links = []) => {
        if (!links || links.length === 0) {
            return <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>;
        }

        const parts = [];
        let lastIndex = 0;

        // Cerca tutti i link nel testo
        links.forEach((link, idx) => {
            const linkIndex = text.indexOf(link, lastIndex);
            if (linkIndex !== -1) {
                // Aggiungi il testo prima del link
                if (linkIndex > lastIndex) {
                    parts.push(
                        <span key={`text-${idx}`} style={{ whiteSpace: 'pre-wrap' }}>
                            {text.substring(lastIndex, linkIndex)}
                        </span>
                    );
                }

                // Aggiungi il link cliccabile
                parts.push(
                    <Link
                        key={`link-${idx}`}
                        url={link}
                        style="underline"
                        className="font-semibold"
                        onClick={handleLinkClick}
                    >
                        {link}
                    </Link>
                );

                lastIndex = linkIndex + link.length;
            }
        });

        // Aggiungi il testo rimanente dopo l'ultimo link
        if (lastIndex < text.length) {
            parts.push(
                <span key="text-final" style={{ whiteSpace: 'pre-wrap' }}>
                    {text.substring(lastIndex)}
                </span>
            );
        }

        return parts.length > 0 ? <>{parts}</> : <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>;
    };

    const handleEmailClick = (email) => {
        setEmails(emails.map(e =>
            e.id === email.id ? { ...e, read: true } : e
        ));
        setSelectedEmail(email);
        setShowFeedback(false);
        setShowInspector(false);

        // Chiama il callback quando l'email viene letta
        if (onEmailRead) {
            onEmailRead(email);
        }
    };

    const handleFlag = (isPhishing) => {
        if (!selectedEmail || selectedEmail.flagged !== null) return;

        const correct = selectedEmail.isPhishing === isPhishing;
        const updatedEmails = emails.map(e =>
            e.id === selectedEmail.id ? { ...e, flagged: isPhishing } : e
        );
        setEmails(updatedEmails);
        setSelectedEmail({ ...selectedEmail, flagged: isPhishing });

        // Mostra feedback immediato quando si classifica
        setFeedback({
            correct,
            isPhishing: selectedEmail.isPhishing,
            explanation: selectedEmail.explanation,
            consequence: correct
                ? (isPhishing
                    ? t.correctPhishing
                    : t.correctSafe)
                : (isPhishing
                    ? t.errorPhishingWrong
                    : t.errorSafeWrong)
        });

        if (showFeedbackPopup) {
            setShowFeedback(true);
        }

        // Chiama il callback
        if (onEmailAction) {
            onEmailAction(selectedEmail, isPhishing, correct);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white text-xs">
            {/* Progress Bar */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-2 flex items-center justify-between">
                <div className="font-bold">📧 Email Security Training</div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Email List */}
                <div className="w-1/3 border-r border-slate-300 overflow-y-auto">
                    <div className="bg-slate-100 border-b border-slate-300 p-2 font-bold text-slate-700 sticky top-0">
                        Inbox ({emails.filter(e => !e.read).length} {t.inboxLabel})
                    </div>
                    {emails.length === 0 ? (
                        <div className="p-8 text-center text-slate-400">
                            <div className="text-4xl mb-2">📭</div>
                            <div className="font-semibold">{t.noEmailsText}</div>
                            <div className="text-xs mt-1">{t.emptyInboxText}</div>
                        </div>
                    ) : (
                        emails.map(email => (
                            <div
                                key={email.id}
                                onClick={() => handleEmailClick(email)}
                                className={`p-2 border-b border-slate-200 cursor-pointer hover:bg-slate-50 ${selectedEmail?.id === email.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                    } ${!email.read ? 'font-semibold bg-blue-50/30' : ''
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className="text-[11px] truncate flex-1 text-cyan-400">{email.from}</div>
                                    {email.hasAttachment && <span className="text-[10px] mr-1">📎</span>}
                                    {email.flagged !== null && (
                                        <span className={`text-[10px] ${email.flagged === email.isPhishing ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {email.flagged === email.isPhishing ? '✓' : '✗'}
                                        </span>
                                    )}
                                </div>
                                <div className="text-[11px] font-semibold text-slate-800 truncate">
                                    {email.subject}
                                </div>
                                <div className="text-[10px] text-slate-500 truncate">
                                    {email.preview}
                                </div>
                                <div className="text-[9px] text-slate-400 mt-1">{email.timestamp}</div>
                            </div>
                        ))
                    )}
                </div>

                {/* Email Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {selectedEmail ? (
                        <>
                            <div className="flex-1 overflow-y-auto bg-white">
                                {/* Email Header */}
                                <div className="bg-slate-50 border-b border-slate-300 p-3">
                                    <div className="text-sm font-bold text-slate-800 mb-2">
                                        {selectedEmail.subject}
                                    </div>
                                    <div className="text-[11px] text-slate-600 space-y-1 mb-2">
                                        <div>
                                            <span className="font-semibold">{t.fromLabel}</span>
                                            <span className="ml-1 hover:underline cursor-help" title={`Full address: ${selectedEmail.from}`}>
                                                {selectedEmail.from}
                                            </span>
                                        </div>
                                        <div><span className="font-semibold">{t.dateLabel}</span> {selectedEmail.timestamp}</div>
                                        {selectedEmail.hasAttachment && (
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold">{t.attachmentLabel}</span>
                                                <span
                                                    onClick={handleAttachmentClick}
                                                    className={`cursor-pointer hover:underline ${selectedEmail.attachmentName?.endsWith('.exe') ? 'text-red-600 font-bold' : 'text-blue-600'
                                                        }`}
                                                >
                                                    📎 {selectedEmail.attachmentName}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 flex-wrap">
                                        <span
                                            onClick={() => handleFlag(false)}
                                            disabled={selectedEmail.flagged !== null}
                                            className={`px-3 py-1.5 rounded text-[11px] font-semibold transition-all ${selectedEmail.flagged === false
                                                ? 'bg-green-600 text-white'
                                                : selectedEmail.flagged === null
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {t.emailSafeButton}
                                        </span>
                                        <span
                                            onClick={() => handleFlag(true)}
                                            disabled={selectedEmail.flagged !== null}
                                            className={`px-3 py-1.5 rounded text-[11px] font-semibold transition-all ${selectedEmail.flagged === true
                                                ? 'bg-red-600 text-white'
                                                : selectedEmail.flagged === null
                                                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {t.reportPhishingButton}
                                        </span>

                                        <span
                                            onClick={() => {
                                                if (!showInspector && onHeaderInspect) {
                                                    onHeaderInspect();
                                                }
                                                setShowInspector(!showInspector);
                                            }}
                                            className="px-3 py-1.5 text-blue-700 font-semibold transition-all"
                                        >
                                            {showInspector ? t.hideHeaderButton : t.showHeaderButton}
                                        </span>
                                    </div>

                                    {/* Inspector Panel */}
                                    {showInspector && (
                                        <div className="mt-3 p-2 bg-slate-800 text-green-400 font-mono text-[10px] rounded">
                                            <div>Return-Path: &lt;{selectedEmail.from}&gt;</div>
                                            <div>X-Originating-IP: [{selectedEmail.isPhishing ? '185.220.101.47' : '192.168.1.10'}]</div>
                                            <div>Authentication-Results: {selectedEmail.isPhishing ? 'FAIL' : 'PASS'}</div>
                                            <div>SPF: {selectedEmail.isPhishing ? 'fail' : 'pass'}</div>
                                            <div>DKIM: {selectedEmail.isPhishing ? 'none' : 'pass'}</div>
                                        </div>
                                    )}
                                </div>

                                {/* Email Body */}
                                <div className="p-3 bg-white">
                                    <div className="text-[11px] text-slate-700">
                                        {renderEmailBody(selectedEmail.body, selectedEmail.links)}
                                    </div>
                                </div>
                            </div>

                            {/* Feedback Modal */}
                            {showFeedback && feedback && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                                    <div className={`bg-white rounded-lg p-4 max-w-md shadow-2xl border-4 ${feedback.correct ? 'border-green-500' : 'border-red-500'
                                        }`}>
                                        <div className={`text-lg font-bold mb-3 ${feedback.correct ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {feedback.consequence}
                                        </div>
                                        <div className="text-xs text-slate-700 mb-3 bg-slate-100 p-2 rounded">
                                            <div className="font-bold mb-1">{t.explanationLabel}</div>
                                            {feedback.explanation}
                                        </div>
                                        {!feedback.correct && (
                                            <div className="text-[10px] text-orange-600 bg-orange-50 p-2 rounded mb-3">
                                                {t.suggestionText}
                                            </div>
                                        )}
                                        <button
                                            onClick={() => setShowFeedback(false)}
                                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded transition-all"
                                        >
                                            {t.continueButton}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-slate-400">
                            <div className="text-center">
                                <div className="text-4xl mb-2">📧</div>
                                <div>{t.selectEmailText}</div>
                                <div className="text-[10px] mt-2 text-slate-500">
                                    {t.protectText}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailClient;
