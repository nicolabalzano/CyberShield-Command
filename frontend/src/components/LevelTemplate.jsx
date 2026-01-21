import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';
import { LevelProvider, useLevel } from '../contexts/LevelContext';
import MonitorScreen from './MonitorScreen';
import ReputationStars from './ReputationStars';

// Assets imports - Assumes .png extensions. Change to .jpg if needed.
// These files must be in src/assets/
import backgroundNight from '../assets/background_night.png';
import keyboard from '../assets/keyboard.png';
import HealthBar from './HealthBar';

function LevelTemplateContent({ 
    children, 
    musicTrack = '/level-music.mp3', 
    onFetchData, 
    stars = 0, 
    hint = null,
    browserConfig = {},
    terminalConfig = {},
    siemConfig = {},
    emailConfig = {},
    onEmailAction
}) {
  const navigate = useNavigate();
  const { changeTrack } = useAudio();
  const { health } = useLevel();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Cambia la musica quando entra nel livello
    changeTrack(musicTrack);
    
    // Generic fetch or callback
    if (onFetchData) {
        onFetchData().then(setData);
    }
  }, [changeTrack, musicTrack, onFetchData]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-cyber-black text-cyber-text">
      {/* Background Image - Full Screen */}
      <img  
        src={backgroundNight} 
        alt="Background Office Night" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      

      {/* Main Game Area Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pointer-events-none">
        
        {/* Top Header / HUD */}
        <div className="w-full flex justify-between items-center pt-6 -translate-x-5 pointer-events-auto">
          {/* Health Bar Section */}
          <HealthBar health={health} />

          <ReputationStars stars={stars} />
        </div>

        {/* Center - Real Monitor */}
        {/* Increased size (scale-125 = 1.25x or similar, doing manual scale for 20%) and moved UP (translate-y negative) */}
        <div className="flex-1 flex items-center justify-center pointer-events-auto w-full max-w-6xl px-4 transform scale-[1.3] translate-y-[-12%] z-50">
            <MonitorScreen
                browserConfig={browserConfig}
                terminalConfig={terminalConfig}
                siemConfig={siemConfig}
                emailConfig={emailConfig}
                onEmailAction={onEmailAction}
            >
                {/* Content injected here */}
                {children}
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

        {/* Overlay Layers (Hints, etc.) - Positioned relative to screen */}
        {hint && (
            <div className="absolute bottom-10 right-10 z-[60] pointer-events-auto transition-all animate-bounce-in">
                {hint}
            </div>
        )}

      </div>
    </div>
  );
}

function LevelTemplate({ initialHealth = 100, ...props }) {
  return (
    <LevelProvider initialHealth={initialHealth}>
      <LevelTemplateContent {...props} />
    </LevelProvider>
  );
}

export { useLevel };
export default LevelTemplate;
