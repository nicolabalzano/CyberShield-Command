import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [musicVolume, setMusicVolume] = useState(() => {
    const savedVolume = localStorage.getItem('musicVolume');
    return savedVolume ? parseInt(savedVolume) : 10;
  });
  const [sfxVolume, setSfxVolume] = useState(() => {
    const savedVolume = localStorage.getItem('sfxVolume');
    return savedVolume ? parseInt(savedVolume) : 50;
  });
  
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('/background-music.mp3');
  const audioRef = useRef(null);

  useEffect(() => {
    // Salva il volume in localStorage
    localStorage.setItem('musicVolume', musicVolume.toString());
    localStorage.setItem('sfxVolume', sfxVolume.toString());
    
    // Aggiorna il volume dell'audio (musica)
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : musicVolume / 100;
    }
  }, [musicVolume, sfxVolume, isMuted]);

  useEffect(() => {
    // Tenta l'autoplay immediato senza fallback su click
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.log('Audio autoplay blocked by browser.');
        });
    }
  }, [isPlaying, currentTrack]);

  const changeMusicVolume = (newVolume) => {
    setMusicVolume(newVolume);
  };
  
  const changeSfxVolume = (newVolume) => {
    setSfxVolume(newVolume);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Audio play error:', err);
      });
    }
  };

  const changeTrack = (trackSrc) => {
    // Se è già la traccia corrente e sta suonando, non fare nulla
    if (currentTrack === trackSrc && audioRef.current && !audioRef.current.paused) {
      return;
    }
    
    // Se è la stessa traccia ma è in pausa, riprendi la riproduzione senza ricaricare
    if (currentTrack === trackSrc && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log('Resume play error:', err);
        });
      }
      return;
    }
    
    // Altrimenti, cambia traccia
    setCurrentTrack(trackSrc);
    if (audioRef.current) {
      audioRef.current.src = trackSrc;
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Track change error:', err);
      });
    }
  };

  const playSfx = (sfxPath) => {
    console.log(`[AudioContext] Attempting to play SFX: ${sfxPath}`);
    if (!sfxPath) return;
    if (isMuted) {
        console.log('[AudioContext] Audio is muted, skipping SFX.');
        return;
    } 

    try {
        const audio = new Audio(sfxPath);
        audio.volume = sfxVolume / 100;
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log(`[AudioContext] SFX Playing: ${sfxPath}`);
                })
                .catch(error => {
                    console.error(`[AudioContext] SFX Playback failed for ${sfxPath}:`, error);
                });
        }
    } catch (error) {
        console.error("[AudioContext] Error creating Audio object:", error);
    }
  };

  return (
    <AudioContext.Provider value={{ 
        musicVolume, 
        changeMusicVolume, 
        sfxVolume,
        changeSfxVolume,
        isMuted, 
        toggleMute, 
        audioRef, 
        playAudio, 
        isPlaying, 
        changeTrack, 
        playSfx 
    }}>
      <audio 
        ref={audioRef}
        src={currentTrack}
        loop
        preload="auto"
      />
      {children}
    </AudioContext.Provider>
  );
};
