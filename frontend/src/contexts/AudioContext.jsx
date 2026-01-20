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
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('musicVolume');
    return savedVolume ? parseInt(savedVolume) : 10;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('/background-music.mp3');
  const audioRef = useRef(null);

  useEffect(() => {
    // Salva il volume in localStorage
    localStorage.setItem('musicVolume', volume.toString());
    
    // Aggiorna il volume dell'audio
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    // Avvia l'audio al primo click dell'utente
    const startAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log('Audio autoplay prevented:', err);
        });
      }
    };

    document.addEventListener('click', startAudio, { once: true });
    document.addEventListener('keydown', startAudio, { once: true });

    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('keydown', startAudio);
    };
  }, [isPlaying]);

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
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

  return (
    <AudioContext.Provider value={{ volume, changeVolume, isMuted, toggleMute, audioRef, playAudio, isPlaying, changeTrack }}>
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
