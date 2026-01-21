import React, { useState, useEffect } from 'react';

export const DEFAULT_EMAILS = [
    {
        id: 1,
        from: 'admin@company.com',
        timestamp: 'Today 09:15',
        subject: 'Weekly Security Update',
        preview: 'This week\'s security report is now available...',
        isPhishing: false,
        body: 'Dear Team,\n\nThis week\'s security report shows all systems are operating normally. Please review the attached compliance document.\n\nBest regards,\nIT Security Team\n\n---\nCyber Security Department\nCompany Inc.\nPhone: +1 555-0100',
        hasAttachment: true,
        attachmentName: 'security_report.pdf',
        explanation: 'Email legittima dal dominio aziendale ufficiale con firma professionale completa.',
        read: false,
        flagged: null
    },
    {
        id: 2,
        from: 'paypa1-security@paypa1-verify.com',
        timestamp: 'Today 11:42',
        subject: 'URGENT: Verify Your Account Now!',
        preview: 'Your account will be suspended unless you verify...',
        isPhishing: true,
        body: 'Dear Valued Customer,\n\nYour PayPal account has been limited due to suspicious activity. Click here immediately to verify your identity or your account will be permanently suspended within 24 hours!\n\nVerify Now: http://paypa1-verify.com/login\n\nPayPal Security Team',
        hasAttachment: false,
        explanation: 'PHISHING: Dominio falso (paypa1 invece di paypal), richiesta urgente, link sospetto, mancanza di firma ufficiale.',
        links: ['http://paypa1-verify.com/login'],
        read: false,
        flagged: null
    },
    {
        id: 3,
        from: 'hr@company.com',
        timestamp: 'Today 10:30',
        subject: 'Updated Employee Handbook',
        preview: 'Please review the updated company policies...',
        isPhishing: false,
        body: 'Hello,\n\nWe have updated our employee handbook with new policies effective January 2026. Please review it at your earliest convenience through the company portal.\n\nAccess the handbook: https://portal.company.com/hr/handbook\n\nThank you,\nHuman Resources Department\n\n---\nHR Team | Company Inc.\nhr@company.com',
        hasAttachment: false,
        explanation: 'Email legittima dal dominio aziendale con link al portale ufficiale e firma completa.',
        links: ['https://portal.company.com/hr/handbook'],
        read: false,
        flagged: null
    },
    {
        id: 4,
        from: 'ceo@comp4ny-urgent.com',
        timestamp: 'Today 14:55',
        subject: 'RE: URGENT - Wire Transfer Needed',
        preview: 'I need you to process this wire transfer immediately...',
        isPhishing: true,
        body: 'Hi,\n\nI\'m in a meeting and need you to process an urgent wire transfer to our new vendor. Please send $15,000 to account 8837465829 at routing number 938475629.\n\nThis is time sensitive - do it now and I\'ll explain later.\n\nCEO',
        hasAttachment: false,
        explanation: 'PHISHING (CEO Fraud): Dominio falso (comp4ny invece di company), richiesta urgente di denaro, pressione temporale, tono informale.',
        read: false,
        flagged: null
    },
    {
        id: 5,
        from: 'notifications@github.com',
        timestamp: 'Today 08:22',
        subject: 'New pull request in CyberShield-Command',
        preview: 'A new pull request has been opened...',
        isPhishing: false,
        body: 'Hi there,\n\nA new pull request #47 has been opened in your repository CyberShield-Command.\n\nView pull request: https://github.com/yourname/CyberShield-Command/pull/47\n\n---\nYou\'re receiving this because you\'re watching this repository.\nGitHub, Inc.\nUnsubscribe from these emails',
        hasAttachment: false,
        explanation: 'Email legittima da GitHub con link corretto e opzioni di unsubscribe standard.',
        links: ['https://github.com/yourname/CyberShield-Command/pull/47'],
        read: false,
        flagged: null
    },
    {
        id: 6,
        from: 'support@micros0ft-security.com',
        timestamp: 'Today 15:18',
        subject: 'Windows Defender Alert - Action Required',
        preview: 'Multiple viruses detected on your system...',
        isPhishing: true,
        body: 'CRITICAL SECURITY ALERT\n\nOur scans have detected 37 viruses on your computer! Your personal data is at risk.\n\nDownload our security tool immediately: http://micros0ft-security.com/fix.exe\n\nFailing to act will result in complete data loss!!!\n\nWindows Security Center',
        hasAttachment: true,
        attachmentName: 'security_fix.exe',
        explanation: 'PHISHING: Dominio falso (micros0ft con zero), tono allarmistico, allegato .exe sospetto, errori grammaticali.',
        links: ['http://micros0ft-security.com/fix.exe'],
        read: false,
        flagged: null
    }
];

const defaultFeedbackMessages = {
    success_phishing: '✓ Ottimo lavoro! Hai evitato una minaccia cyber!',
    success_safe: '✓ Corretto! Questa email è sicura.',
    error_phishing: '✗ Attenzione! Hai appena cliccato su un link malevolo. Sistema compromesso!',
    error_safe: '✗ Errore! Hai segnalato un\'email legittima come phishing.'
};

const EmailClient = ({ onEmailAction, emails: initialEmails, feedbackMessages, showFeedbackPopup = true }) => {
    // Usa DEFAULT_EMAILS se initialEmails non è fornito
    const [emails, setEmails] = useState(initialEmails || DEFAULT_EMAILS);

    // Se vengono passate nuove props email (ad esempio cambiando livello), aggiorna lo stato
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

    const handleEmailClick = (email) => {
        setEmails(emails.map(e => 
            e.id === email.id ? { ...e, read: true } : e
        ));
        setSelectedEmail(email);
        setShowFeedback(false);
        setShowInspector(false);
    };

    const handleFlag = (isPhishing) => {
        if (!selectedEmail || selectedEmail.flagged !== null) return;

        const correct = selectedEmail.isPhishing === isPhishing;
        const updatedEmails = emails.map(e =>
            e.id === selectedEmail.id ? { ...e, flagged: isPhishing } : e
        );
        setEmails(updatedEmails);
        setSelectedEmail({ ...selectedEmail, flagged: isPhishing });

        // Mostra feedback solo se abilitato
        setFeedback({
            correct,
            isPhishing: selectedEmail.isPhishing,
            explanation: selectedEmail.explanation,
            consequence: correct
                ? (isPhishing 
                    ? messages.success_phishing 
                    : messages.success_safe)
                : (isPhishing
                    ? messages.error_phishing
                    : messages.error_safe)
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
                        Inbox ({emails.filter(e => !e.read).length} non lette)
                    </div>
                    {emails.map(email => (
                        <div
                            key={email.id}
                            onClick={() => handleEmailClick(email)}
                            className={`p-2 border-b border-slate-200 cursor-pointer hover:bg-slate-50 ${
                                selectedEmail?.id === email.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                            } ${
                                !email.read ? 'font-semibold bg-blue-50/30' : ''
                            }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <div className="text-[11px] truncate flex-1 text-cyan-400">{email.from}</div>
                                {email.hasAttachment && <span className="text-[10px] mr-1">📎</span>}
                                {email.flagged !== null && (
                                    <span className={`text-[10px] ${
                                        email.flagged === email.isPhishing ? 'text-green-600' : 'text-red-600'
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
                    ))}
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
                                            <span className="font-semibold">From:</span> 
                                            <span className="ml-1 hover:underline cursor-help" title={`Full address: ${selectedEmail.from}`}>
                                                {selectedEmail.from}
                                            </span>
                                        </div>
                                        <div><span className="font-semibold">Date:</span> {selectedEmail.timestamp}</div>
                                        {selectedEmail.hasAttachment && (
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold">Attachment:</span>
                                                <span className={`${
                                                    selectedEmail.attachmentName?.endsWith('.exe') ? 'text-red-600 font-bold' : 'text-blue-600'
                                                }`}>
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
                                            className={`px-3 py-1.5 rounded text-[11px] font-semibold transition-all ${
                                                selectedEmail.flagged === false
                                                    ? 'bg-green-600 text-white'
                                                    : selectedEmail.flagged === null
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                            }`}
                                        >
                                            ✓ Email Safe
                                        </span>
                                        <span
                                            onClick={() => handleFlag(true)}
                                            disabled={selectedEmail.flagged !== null}
                                            className={`px-3 py-1.5 rounded text-[11px] font-semibold transition-all ${
                                                selectedEmail.flagged === true
                                                    ? 'bg-red-600 text-white'
                                                    : selectedEmail.flagged === null
                                                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                            }`}
                                        >
                                            ⚠️ Report Phishing
                                        </span>

                                        <span
                                            onClick={() => setShowInspector(!showInspector)}
                                            className="px-3 py-1.5 text-blue-700 font-semibold transition-all"
                                        >
                                            {showInspector ? 'Hide Header' : 'Show Header'}
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
                                    <div className="text-[11px] text-slate-700 whitespace-pre-wrap">
                                        {selectedEmail.body}
                                    </div>
                                </div>
                            </div>

                            {/* Feedback Modal */}
                            {showFeedback && feedback && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                                    <div className={`bg-white rounded-lg p-4 max-w-md shadow-2xl border-4 ${
                                        feedback.correct ? 'border-green-500' : 'border-red-500'
                                    }`}>
                                        <div className={`text-lg font-bold mb-3 ${
                                            feedback.correct ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {feedback.consequence}
                                        </div>
                                        <div className="text-xs text-slate-700 mb-3 bg-slate-100 p-2 rounded">
                                            <div className="font-bold mb-1">📚 Spiegazione:</div>
                                            {feedback.explanation}
                                        </div>
                                        {!feedback.correct && (
                                            <div className="text-[10px] text-orange-600 bg-orange-50 p-2 rounded mb-3">
                                                💡 Suggerimento: Controlla sempre il dominio del mittente, il tono del messaggio e la presenza di richieste urgenti!
                                            </div>
                                        )}
                                        <button
                                            onClick={() => setShowFeedback(false)}
                                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded transition-all"
                                        >
                                            CONTINUA
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-slate-400">
                            <div className="text-center">
                                <div className="text-4xl mb-2">📧</div>
                                <div>Seleziona un'email per leggerla</div>
                                <div className="text-[10px] mt-2 text-slate-500">
                                    Identifica le email di phishing per proteggere l'azienda!
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
