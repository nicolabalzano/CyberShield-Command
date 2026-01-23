import React, { useEffect, useRef, useState } from 'react';
import infoBg from '../assets/info.png';
import noiseTexture from '../assets/noise.jpg'; 
import { useAudio } from '../contexts/AudioContext';

const InfoPanel = ({ text, className = "" }) => {
  const { playSfx } = useAudio();
  const hasPlayedRef = useRef(false);
  
  // Stato per il testo visualizzato progressivamente
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Effetto Audio (solo al primo montaggio)
  useEffect(() => {
    if (!hasPlayedRef.current) {
      playSfx('/sfx/hint.mp3');
      hasPlayedRef.current = true;
    }
  }, [playSfx]);

  // Effetto Animazione Testo
  useEffect(() => {
    let i = 0;
    setDisplayedText(""); // Reset del testo quando cambia la prop 'text'
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (i < text.length) {
        // Usiamo la versione funzionale di setState per evitare problemi di closure
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30); // Velocità: 30ms per carattere. Aumenta per rallentare.

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <div className={`relative md:w-100 ${className}`}>
        {/* Background Image principale */}
        <img src={infoBg} alt="Info Background" className="w-full h-auto object-contain drop-shadow-lg" />
        
        {/* Texture Noise con Blend Modes */}
        <div 
            style={{ backgroundImage: `url(${noiseTexture})` }}
            className="
                absolute top-[30%] left-2 w-[98%] h-[66%] 
                rounded-2xl -z-10 transform translate-y-1 
                bg-info-background
                bg-repeat
                bg-blend-overlay
                opacity-80
            "
        ></div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-start text-left overflow-hidden px-5 pt-[25%]">
            <p className="font-mono text-cyber-green text-[16px] font-bold tracking-tight leading-tight break-words">
                {displayedText}
                {/* Cursore lampeggiante opzionale mentre scrive */}
                {isTyping && <span className="animate-pulse ml-1">_</span>}
            </p>
        </div>
    </div>
  );
};

export default InfoPanel;