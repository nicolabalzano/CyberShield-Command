import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
};

export const AudioProvider = ({ children }) => {
  const [musicVolume, setMusicVolume] = useState(() => Number(localStorage.getItem('musicVolume')) || 10);
  const [sfxVolume, setSfxVolume] = useState(() => Number(localStorage.getItem('sfxVolume')) || 50);
  
  // FACCIAMO PARTIRE IL GIOCO "MUTATO" PER AGGIRARE IL BLOCCO BROWSER
  const [isMuted, setIsMuted] = useState(true); 
  
  // PERCORSO CORRETTO
  const [currentTrack, setCurrentTrack] = useState('/level-music.mp3');
  const audioRef = useRef(null);
  
  // Riferimenti per la tastiera
  const keyboardAudioRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Inizializziamo l'audio tastiera
  useEffect(() => {
    keyboardAudioRef.current = new Audio('/sfx/keyboard.mp3');
    keyboardAudioRef.current.loop = true; 
    keyboardAudioRef.current.preload = 'auto'; 
  }, []);

  // Helper per gli effetti sonori
  const playSfx = (sfxPath) => {
    if (isMuted || !sfxPath) return;
    const audio = new Audio(sfxPath);
    audio.volume = sfxVolume / 100;
    audio.play().catch(() => {});
  };

  // 1. Tenta l'autoplay immediato
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.play().catch(err => {
        console.log("Autoplay ancora bloccato dal browser:", err);
      });
    }
  }, [currentTrack]);

  // 2. Sblocca l'audio al primo click
  useEffect(() => {
    const handleFirstInteraction = () => {
      setIsMuted(false); 
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play();
      }
      // "Svegliamo" l'audio tastiera per renderlo pronto
      if (keyboardAudioRef.current) {
        keyboardAudioRef.current.load();
      }
      console.log("Audio sbloccato dall'interazione utente");
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, []);

  // 3. Riproduci mouse.mp3 ad ogni click
  useEffect(() => {
    const handleGlobalClick = () => {
      playSfx('/sfx/mouse.mp3');
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [sfxVolume, isMuted]);

  // 4. --- GESTIONE TASTIERA FIXED ---
  useEffect(() => {
    const kbd = keyboardAudioRef.current;

    if (kbd) {
      kbd.volume = sfxVolume / 100;
      if (isMuted) kbd.pause();
    }

    const handleKeyDown = () => {
      if (isMuted || !kbd) return;

      // 1. Annulla IMMEDIATAMENTE il timer di stop.
      // Questo mantiene l'audio vivo mentre scrivi.
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // 2. Se l'audio è in pausa, fallo partire.
      // IMPORTANTE: Non resettiamo currentTime = 0 qui. 
      // Lasciamolo scorrere fluido. Se lo resettiamo sempre, si sente solo silenzio.
      if (kbd.paused) {
        const playPromise = kbd.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }

      // 3. Imposta il timer per fermare l'audio DOPO che hai smesso di scrivere
      typingTimeoutRef.current = setTimeout(() => {
        kbd.pause();
      }, 300);
    };

    // Usiamo capture: true per intercettare tutto
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (kbd) kbd.pause();
    };
  }, [sfxVolume, isMuted]);

  // Aggiornamento volumi musica di sottofondo
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume / 100;
      audioRef.current.muted = isMuted;
    }
  }, [musicVolume, isMuted]);

  const changeTrack = (trackSrc) => {
    if (currentTrack === trackSrc) return;
    setCurrentTrack(trackSrc);
    if (audioRef.current) {
      audioRef.current.src = trackSrc;
      audioRef.current.load();
    }
  };

  return (
    <AudioContext.Provider value={{ 
        musicVolume, setMusicVolume, 
        sfxVolume, setSfxVolume,
        isMuted, toggleMute: () => setIsMuted(!isMuted), 
        audioRef, 
        changeTrack, 
        playSfx 
    }}>
      <audio 
        ref={audioRef} 
        src={currentTrack} 
        loop 
        autoPlay 
        muted={isMuted}
        preload="auto" 
      />
      {children}
    </AudioContext.Provider>
  );
};