import React, { useState, useEffect } from 'react';
import whiteHatStar from '../assets/white_hat_star.png';
import { useAudio } from '../contexts/AudioContext';
import { useSave } from '../contexts/SaveContext';

export const useReputation = (levelId, initialStars = 0) => {
  const { getStars, updateStars } = useSave();
  const [stars, setStars] = useState(() => {
    // Carica le stelle salvate per questo livello
    return getStars(levelId) || initialStars;
  });
  const { playSfx } = useAudio();

  // Funzione per assegnare una stella (max 3)
  const earnStar = () => {
    setStars(prev => {
      const newStars = Math.min(prev + 1, 3);
      if (newStars > prev) {
        playSfx('/sfx/star.mp3');
        // Non salviamo più qui, salviamo solo nel MissionDebrief
      }
      return newStars;
    });
  };

  return { stars, earnStar };
};

const ReputationStars = ({ stars = 0, maxStars = 3 }) => {
  const { playSfx } = useAudio();
  const prevStarsRef = React.useRef(stars);

  // Play sound when stars increase
  useEffect(() => {
    if (stars > prevStarsRef.current) {
      playSfx('/sfx/star.mp3');
    }
    prevStarsRef.current = stars;
  }, [stars, playSfx]);

  return (
    <div className="flex gap-4">
      {[...Array(maxStars)].map((_, i) => (
        <div key={i} className="relative group cursor-pointer">
          <img
            src={whiteHatStar}
            alt={`Rank ${i + 1}`}
            className={`w-20 h-20 transition-all duration-500 ${i < stars
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
