import React, { useState } from 'react';
import LevelTemplate from '../components/LevelTemplate';
import { useReputation } from '../components/ReputationStars';
import MonitorScreen from '../components/MonitorScreen';

const Level3 = () => {
    const { stars } = useReputation('level3', 0);
    const [testResults, setTestResults] = useState([]);

    const handleEmailAction = (email, markedAsPhishing, isCorrect) => {
        console.log('✅ Email component working:', { email, markedAsPhishing, isCorrect });
        setTestResults(prev => [...prev, 'Email ✅']);
    };

    // Configurazione Browser per test
    const browserConfig = {
        availableSites: [
            {
                url: 'https://example.com',
                title: 'Example Site',
                icon: '🌐',
                content: (
                    <div className="p-6 bg-white h-full">
                        <h1 className="text-3xl font-bold mb-4">Example Domain</h1>
                        <p className="text-gray-700">This domain is for use in illustrative examples in documents.</p>
                        <p className="text-gray-700 mt-2">You may use this domain in literature without prior coordination or asking for permission.</p>
                    </div>
                )
            },
            {
                url: 'https://test-site.com',
                title: 'Test Site',
                icon: '🧪',
                content: (
                    <div className="p-6 bg-blue-50 h-full">
                        <h1 className="text-3xl font-bold mb-4 text-blue-900">Test Site</h1>
                        <div className="bg-white rounded-lg p-4 shadow">
                            <h2 className="font-semibold text-lg mb-2">Browser Test</h2>
                            <p className="text-sm text-gray-600">✅ Navigazione funzionante</p>
                            <p className="text-sm text-gray-600">✅ Ricerca funzionante</p>
                            <p className="text-sm text-gray-600">✅ Rendering contenuti OK</p>
                        </div>
                    </div>
                )
            }
        ]
    };

    // Configurazione Terminal per test
    const terminalConfig = {
        initialHistory: [
            'Terminal Test Environment v1.0',
            'Type "help" for available commands'
        ],
        commands: {
            test: () => '✅ Terminal is working correctly!',
            scan: () => 'Scanning system...\n[OK] All systems operational',
            status: () => 'Status: ONLINE\nComponents: Browser, Email, SIEM\nAll services running',
            ping: (args) => args[0] 
                ? `Pinging ${args[0]}...\n64 bytes from ${args[0]}: icmp_seq=1 ttl=64 time=0.5 ms` 
                : 'Usage: ping <host>'
        },
        prompt: 'test@system:~$',
        helpCommand: true
    };

    // Configurazione SIEM per test
    const siemConfig = {
        logs: [
            { id: 1, timestamp: '2026-01-21 10:30:15', source: '192.168.1.100', type: 'INFO', message: 'User login successful' },
            { id: 2, timestamp: '2026-01-21 10:31:22', source: '192.168.1.105', type: 'WARNING', message: 'Multiple failed login attempts' },
            { id: 3, timestamp: '2026-01-21 10:32:45', source: '10.0.0.50', type: 'ERROR', message: 'Unauthorized access attempt detected' },
            { id: 4, timestamp: '2026-01-21 10:33:10', source: '192.168.1.100', type: 'INFO', message: 'File downloaded: report.pdf' }
        ],
        blockedIPs: 3,
        currentStep: 0,
        trafficHistory: [
            { time: '10:00', value: 45 },
            { time: '10:15', value: 62 },
            { time: '10:30', value: 78 },
            { time: '10:45', value: 55 }
        ],
        networkTraffic: { incoming: 1250, outgoing: 890 },
        protocols: { http: 450, https: 650, ssh: 100, ftp: 50 },
        selectedLog: null,
        onLogClick: (log) => console.log('Log clicked:', log)
    };

    console.log('=== Level3 configs ===');
    console.log('browserConfig:', browserConfig);
    console.log('terminalConfig:', terminalConfig);
    console.log('siemConfig:', siemConfig);

    // Email di test
    const emailConfig = {};

    return (
        <LevelTemplate 
            stars={stars}
            browserConfig={browserConfig}
            terminalConfig={terminalConfig}
            siemConfig={siemConfig}
            emailConfig={emailConfig}
            onEmailAction={handleEmailAction}
        >
            <div className="bg-slate-900 p-4 border-b border-cyan-500">
                <h1 className="text-2xl font-bold text-cyan-400 mb-2">Level 3 - Component Testing</h1>
                <p className="text-sm text-slate-300">Test tutti i componenti dinamici: Browser, Terminal, SIEM, Email</p>
                <div className="mt-2 text-xs text-cyan-300">
                    <p>📧 Email: Apri e classifica email</p>
                    <p>🌐 Browser: Cerca "test" o "example"</p>
                    <p>💻 Terminal: Prova comandi: test, scan, status, ping</p>
                    <p>🛡️ SIEM: Visualizza log di sistema</p>
                </div>
            </div>
        </LevelTemplate>
    );
};

export default Level3;
