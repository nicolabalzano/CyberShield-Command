import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';
import MonitorScreen from '../components/MonitorScreen';
import Level1Content from '../levels/Level1Content';

// Assets imports - Assumes .png extensions. Change to .jpg if needed.
// These files must be in src/assets/
import backgroundNight from '../assets/background_night.png';
import whiteHatStar from '../assets/white_hat_star.png';
import keyboard from '../assets/keyboard.png';

function Level1() {
  const navigate = useNavigate();
  const { changeTrack } = useAudio();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Cambia la musica quando entra nel livello
    changeTrack('/level-music.mp3');
    
    // Example of fetching from backend (this will be used later)
    // fetch('/api/progress') 
    //   .then(res => res.json())
    //   .then(data => console.log(data));
  }, [changeTrack]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Background Image - Full Screen */}
      <img 
        src={backgroundNight} 
        alt="Background Office Night" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Main Game Area Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pointer-events-none">
        
        {/* Top Header / HUD */}
        <div className="w-full flex justify-end p-6 pointer-events-auto">
          {/* White Hat Star - Top Right */}
          <div className="relative group cursor-pointer" onClick={() => alert("Reputation Score")}>
             <img 
                src={whiteHatStar} 
                alt="Rank" 
                className="w-20 h-20 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:scale-110 transition-transform duration-300"
             />
          </div>
          <div className="relative group cursor-pointer" onClick={() => alert("Reputation Score")}>
             <img 
                src={whiteHatStar} 
                alt="Rank" 
                className="w-20 h-20 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:scale-110 transition-transform duration-300"
             />
          </div>
          <div className="relative group cursor-pointer" onClick={() => alert("Reputation Score")}>
             <img 
                src={whiteHatStar} 
                alt="Rank" 
                className="w-20 h-20 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:scale-110 transition-transform duration-300"
             />
          </div>
        </div>

        {/* Center - Real Monitor */}
        {/* Increased size (scale-125 = 1.25x or similar, doing manual scale for 20%) and moved UP (translate-y negative) */}
        <div className="flex-1 flex items-center justify-center pointer-events-auto w-full max-w-6xl px-4 transform scale-[1.2] translate-y-[-7%] z-50">
            <MonitorScreen>
                {/* Content inside the "iframe" of the monitor is now loaded from a separate file */}
                <Level1Content />
            </MonitorScreen>
        </div>

        {/* Bottom - Keyboard & Hands (First Person View) */}
        {/* Usa 'bottom-0' per attaccarla al fondo. Cambia px/rem/percentuale per spostarla su o giù. */}
        <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-full flex justify-center pointer-events-none z-10">
           <img 
              src={keyboard} 
              alt="Keyboard and Hands" 
              className="w-full max-w-4xl object-contain drop-shadow-2xl"
           />
        </div>

      </div>
    </div>
  );
}

export default Level1;
