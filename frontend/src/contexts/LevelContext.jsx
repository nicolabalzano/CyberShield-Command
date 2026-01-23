import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAudio } from './AudioContext';

const LevelContext = createContext();

export const useLevel = () => {
    const context = useContext(LevelContext);
    if (!context) {
        throw new Error('useLevel must be used within a LevelProvider');
    }
    return context;
};

export const LevelProvider = ({ children, initialHealth = 100, enableHealthDecay = false, decayInterval = 8000, decayAmount = 5 }) => {
  const [health, setHealth] = useState(initialHealth);
  const [isPaused, setIsPaused] = useState(false);
  const { playSfx } = useAudio();
  const timerRef = useRef(null);

  // Timer automatico per decremento vita
  useEffect(() => {
    if (!enableHealthDecay || isPaused) {
      return;
    }

    timerRef.current = setInterval(() => {
      setHealth((prev) => {
        const newHealth = Math.max(0, prev - decayAmount);
        if (newHealth > 0) {
          playSfx('/sfx/damage.mp3');
        }
        return newHealth;
      });
    }, decayInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [enableHealthDecay, isPaused, decayInterval, decayAmount, playSfx]);

  const damage = (amount) => {
    setHealth((prev) => Math.max(0, prev - amount));
    playSfx('/sfx/damage.mp3');
  };

  const heal = (amount) => {
    setHealth((prev) => Math.min(100, prev + amount));
    playSfx('/sfx/heal.mp3');
  };

  const pauseDecay = () => setIsPaused(true);
  const resumeDecay = () => setIsPaused(false);

  return (
    <LevelContext.Provider value={{ health, setHealth, damage, heal, pauseDecay, resumeDecay }}>
      {children}
    </LevelContext.Provider>
  );
};
