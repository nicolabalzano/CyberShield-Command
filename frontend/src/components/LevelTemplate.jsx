import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';
import { LevelProvider, useLevel } from '../contexts/LevelContext';
import MonitorScreen from './MonitorScreen';
import ReputationStars from './ReputationStars';
import HealthBar from './HealthBar';

// Assets
import backgroundNight from '../assets/background_night.png';
import keyboard from '../assets/keyboard.png';

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
    revEngConfig = null,
    codeEditorConfig = null,
    packetAnalyzerConfig = null,
    ransomwareOverlayConfig = null,
    decryptionToolConfig = null,
    onEmailAction,
    onEmailRead = () => {}
}) {
  const navigate = useNavigate();
  const { changeTrack } = useAudio();
  const { health } = useLevel();
  const [data, setData] = useState(null);

  useEffect(() => {
    changeTrack(musicTrack);
    if (onFetchData) {
        onFetchData().then(setData);
    }
  }, [changeTrack, musicTrack, onFetchData]);

  return (
    /* 1. Container Principale: occupa sempre tutto lo schermo */
    <div className="relative w-full h-screen overflow-hidden bg-black text-cyber-text flex items-center justify-center">
      
      {/* Background: Sotto tutto, riempie lo schermo */}
      <img  
        src={backgroundNight} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* 2. THE STAGE: Questo container mantiene le proporzioni 16:9 
          Tutto ciò che è dentro rimarrà nella stessa posizione relativa */}
      <div className="relative aspect-video h-full w-full max-h-screen max-w-full z-10 flex flex-col items-center">
        
        {/* HUD: Posizionato in alto con padding percentuale per essere fluido */}
        <div className="w-full flex justify-between items-center pt-[3%] pointer-events-auto z-20">
          <HealthBar health={health} />
          <ReputationStars stars={stars} />
        </div>

        {/* 3. MONITOR: Usiamo larghezza percentuale invece dello scale fisso.
            Lo scale può causare sfocatura e problemi di overflow su schermi piccoli. */}
        <div className="absolute top-[47%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] z-50 flex items-center justify-center pointer-events-auto z-30 transform scale-[1.5]">
            <MonitorScreen 
                terminalConfig={terminalConfig}
                siemConfig={siemConfig}
                emailConfig={emailConfig}
                browserConfig={browserConfig}
                revEngConfig={revEngConfig}
                codeEditorConfig={codeEditorConfig}
                packetAnalyzerConfig={packetAnalyzerConfig}
                ransomwareOverlayConfig={ransomwareOverlayConfig}
                decryptionToolConfig={decryptionToolConfig}
                onEmailAction={onEmailAction}
                onEmailRead={onEmailRead}
            >
                {children}
            </MonitorScreen>
        </div>

        {/* 4. TASTIERA: Ancorata al fondo del container 16:9 con bottom negativo percentuale */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[70%] max-w-[1000px] pointer-events-none z-40">
           <img 
              src={keyboard} 
              alt="Keyboard" 
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
           />
        </div>

        {/* Overlay Layers (Hints) */}
        {hint && (
            <div className="absolute bottom-[3%] right-[2%] z-[60] pointer-events-auto animate-bounce-in">
                {hint}
            </div>
        )}
      </div>

      {/* Vignette effect opzionale per dare profondità */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] z-50"></div>
    </div>
  );
}

function LevelTemplate({ initialHealth = 100, enableHealthDecay = false, decayInterval = 12000, decayAmount = 5, ...props }) {
  return (
    <LevelProvider 
      initialHealth={initialHealth}
      enableHealthDecay={enableHealthDecay}
      decayInterval={decayInterval}
      decayAmount={decayAmount}
    >
      <LevelTemplateContent {...props} />
    </LevelProvider>
  );
}

export { useLevel, LevelTemplateContent };
export default LevelTemplate;