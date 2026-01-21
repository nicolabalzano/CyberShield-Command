import React, { createContext, useContext, useState } from 'react';
import { useAudio } from './AudioContext';

const LevelContext = createContext();

export const useLevel = () => {
    const context = useContext(LevelContext);
    if (!context) {
        throw new Error('useLevel must be used within a LevelProvider');
    }
    return context;
};

export const LevelProvider = ({ children, initialHealth = 100 }) => {
  const [health, setHealth] = useState(initialHealth);
  const { playSfx } = useAudio();

  const damage = (amount) => {
    setHealth((prev) => Math.max(0, prev - amount));
    playSfx('/sfx/damage.mp3');
  };

  const heal = (amount) => {
    setHealth((prev) => Math.min(100, prev + amount));
    playSfx('/sfx/heal.mp3');
  };

  return (
    <LevelContext.Provider value={{ health, setHealth, damage, heal }}>
      {children}
    </LevelContext.Provider>
  );
};
