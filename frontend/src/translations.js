export const translations = {
  italiano: {
    // Home
    home: {
      title: "CYBERSHIELD\nCOMMAND",
      subtitle: "Interfaccia Avanzata di Difesa Informatica",
      play: "GIOCA",
      options: "OPZIONI"
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
        step1: "Un SIEM raccoglie e analizza log da tutti i sistemi. Cerca il log CRITICO in rosso lampeggiante!",
        step2: "Hai identificato la minaccia! Ora clicca su 'ANALIZZA MINACCIA' per esaminarla in dettaglio.",
        step3: "SQL Injection rilevato! Clicca su 'BLOCCA IP' per bloccare l'indirizzo IP dell'attaccante.",
        step4: "Eccellente lavoro! Hai neutralizzato la minaccia e completato il tutorial SIEM! Clicca su PROSEGUI per continuare."
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
      options: "OPTIONS"
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
        step1: "A SIEM collects and analyzes logs from all systems. Look for the CRITICAL log flashing in red!",
        step2: "You identified the threat! Now click 'ANALYZE THREAT' to examine it in detail.",
        step3: "SQL Injection detected! Click 'BLOCK IP' to block the attacker's IP address.",
        step4: "Excellent work! You neutralized the threat and completed the SIEM tutorial! Click CONTINUE to proceed."
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
      options: "OPTIONS"
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
        step1: "Un SIEM collecte et analyse les logs de tous les systèmes. Cherchez le log CRITIQUE en rouge clignotant!",
        step2: "Vous avez identifié la menace! Cliquez maintenant sur 'ANALYSER LA MENACE' pour l'examiner en détail.",
        step3: "Injection SQL détectée! Cliquez sur 'BLOQUER L'IP' pour bloquer l'adresse IP de l'attaquant.",
        step4: "Excellent travail! Vous avez neutralisé la menace et terminé le tutoriel SIEM! Cliquez sur CONTINUER pour poursuivre."
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
      options: "OPTIONEN"
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
        step1: "Ein SIEM sammelt und analysiert Logs von allen Systemen. Suchen Sie nach dem KRITISCHEN Log in blinkendem Rot!",
        step2: "Sie haben die Bedrohung identifiziert! Klicken Sie jetzt auf 'BEDROHUNG ANALYSIEREN', um sie im Detail zu untersuchen.",
        step3: "SQL-Injection erkannt! Klicken Sie auf 'IP BLOCKIEREN', um die IP-Adresse des Angreifers zu blockieren.",
        step4: "Hervorragende Arbeit! Sie haben die Bedrohung neutralisiert und das SIEM-Tutorial abgeschlossen! Klicken Sie auf WEITER, um fortzufahren."
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
      options: "OPCIONES"
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
        step1: "Un SIEM recopila y analiza logs de todos los sistemas. ¡Busca el log CRÍTICO en rojo parpadeante!",
        step2: "¡Has identificado la amenaza! Ahora haz clic en 'ANALIZAR AMENAZA' para examinarla en detalle.",
        step3: "¡Inyección SQL detectada! Haz clic en 'BLOQUEAR IP' para bloquear la dirección IP del atacante.",
        step4: "¡Excelente trabajo! Has neutralizado la amenaza y completado el tutorial SIEM! Haz clic en CONTINUAR para proceder."
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
