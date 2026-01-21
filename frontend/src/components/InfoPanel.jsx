import React from 'react';
import infoBg from '../assets/info.png';

const InfoPanel = ({ text, className = "" }) => {
  // Modifica w-80 (mobile) o md:w-96 (desktop) per cambiare la larghezza totale
  return (
    <div className={`relative md:w-100 ${className}`}>
        {/* Background Image */}
        <img 
            src={infoBg} 
            alt="Info Background" 
            className="w-full h-auto object-contain drop-shadow-lg"
        />
        {/* Decoration Rectangle behind image - Scaled up */}
        <div className="absolute top-[30%] left-2 w-[98%] h-[66%] bg-info-background rounded-2xl -z-10 transform translate-y-1"></div>

        {/* Text Overlay - Scaled padding */}
        <div className="absolute inset-0 flex items-center justify-start text-left overflow-hidden px-8 pt-[22%]">
             <p className="font-mono text-cyber-green text-sm md:text-base font-bold tracking-wide leading-tight break-words">
                {text}
             </p>
        </div>
    </div>
  );
};

export default InfoPanel;
