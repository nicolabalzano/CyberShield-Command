import React, { useState } from 'react';
import whiteHatStar from '../assets/white_hat_star.png';
import { useAudio } from '../contexts/AudioContext';

export const useReputation = (initialStars = 0) => {
    const [stars, setStars] = useState(initialStars);
    const { playSfx } = useAudio();

    // Funzione per assegnare una stella (max 3)
    const earnStar = () => {
        setStars(prev => {
            const newStars = Math.min(prev + 1, 3);
            if (newStars > prev) {
                playSfx('/sfx/star.mp3');
            }
            return newStars;
        });
    };

    return { stars, earnStar };
};

const ReputationStars = ({ stars = 0, maxStars = 3 }) => {
  return (
    <div className="flex gap-4">
      {[...Array(maxStars)].map((_, i) => (
        <div key={i} className="relative group cursor-pointer">
          <img 
              src={whiteHatStar} 
              alt={`Rank ${i+1}`} 
              className={`w-20 h-20 transition-all duration-500 ${
                  i < stars 
                  ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:scale-110 filter-none" 
                  : "brightness-0 opacity-40 hover:opacity-60 grayscale"
              }`}
          />
        </div>
      ))}
    </div>
  );
};

export default ReputationStars;
