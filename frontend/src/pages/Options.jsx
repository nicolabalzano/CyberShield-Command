import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAudio } from '../contexts/AudioContext';
import { useSave } from '../contexts/SaveContext';
import { translations } from '../translations';

function Options() {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const { musicVolume, setMusicVolume, sfxVolume, setSfxVolume } = useAudio();
  const { save, saveData } = useSave();
  const t = translations[language].options;

  const [activeSection, setActiveSection] = useState('settings');
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const languages = [
    { code: 'italiano', flag: '🇮🇹', name: 'Italiano' },
    { code: 'english', flag: '🇬🇧', name: 'English' },
    { code: 'francais', flag: '🇫🇷', name: 'Français' },
    { code: 'deutsch', flag: '🇩🇪', name: 'Deutsch' },
    { code: 'espanol', flag: '🇪🇸', name: 'Español' },
  ];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
  };

  const handleSaveSettings = async () => {
    const updatedData = {
      ...saveData,
      settings: {
        language: language,
        musicVolume: musicVolume,
        sfxVolume: sfxVolume,
      },
    };
    
    const success = await save(updatedData);
    
    if (success) {
      setShowSaveConfirm(true);
      setTimeout(() => setShowSaveConfirm(false), 2000);
    }
  };

  return (
    <div className="w-screen h-screen m-0 p-8 bg-gradient-to-br from-[#0a0e1a] to-[#0d1b2a] relative box-border overflow-y-auto">
      <button 
        className="fixed top-6 left-6 px-6 py-3 text-lg font-bold text-cyan-400 border-2 border-cyan-400 bg-transparent rounded-lg hover:bg-cyan-400/20 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all duration-300 cursor-pointer"
        onClick={() => navigate('/')}
      >
        ← {t.back}
      </button>

      <div className="flex flex-col items-center min-h-[calc(100vh-60px)] pt-10 animate-[fadeIn_0.8s_ease-in]">
        <h1 className="text-6xl font-black tracking-[3px] text-cyan-400 mb-12 [text-shadow:0_0_20px_rgb(0,243,255),0_0_40px_rgba(0,243,255,0.5)]">
          {t.title}
        </h1>

        <div className="flex gap-5 mb-10">
          <button 
            className={`px-8 py-3 text-lg font-bold tracking-wider border-2 rounded-lg transition-all duration-300 uppercase ${
              activeSection === 'settings'
                ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.5)]'
                : 'border-gray-400 bg-transparent text-gray-400 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]'
            }`}
            onClick={() => setActiveSection('settings')}
          >
            {t.settings}
          </button>
          <button 
            className={`px-8 py-3 text-lg font-bold tracking-wider border-2 rounded-lg transition-all duration-300 uppercase ${
              activeSection === 'about'
                ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.5)]'
                : 'border-gray-400 bg-transparent text-gray-400 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]'
            }`}
            onClick={() => setActiveSection('about')}
          >
            {t.about}
          </button>
          <button 
            className={`px-8 py-3 text-lg font-bold tracking-wider border-2 rounded-lg transition-all duration-300 uppercase ${
              activeSection === 'credits'
                ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.5)]'
                : 'border-gray-400 bg-transparent text-gray-400 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]'
            }`}
            onClick={() => setActiveSection('credits')}
          >
            {t.credits}
          </button>
        </div>

        <div className="w-full max-w-[800px] bg-[rgba(17,24,39,0.6)] border-2 border-cyan-400 rounded-xl p-10 shadow-[0_0_30px_rgba(0,243,255,0.3)]">
          {activeSection === 'settings' && (
            <div className="flex flex-col gap-10">
              {/* Language Selection */}
              <div className="flex flex-col gap-5">
                <h3 className="text-2xl font-bold text-[#00ff41] [text-shadow:0_0_10px_rgba(0,255,65,0.5)] m-0 tracking-wider">
                  {t.language}
                </h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 ${
                        language === lang.code
                          ? 'bg-[rgba(0,255,65,0.2)] border-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.5)]'
                          : 'bg-cyan-400/10 border-cyan-400 hover:bg-cyan-400/20 hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:-translate-y-1'
                      }`}
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      <span className="text-3xl">{lang.flag}</span>
                      <span className="text-base font-semibold tracking-wide text-gray-200">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Settings */}
              <div className="flex flex-col gap-5">
                <h3 className="text-2xl font-bold text-[#00ff41] [text-shadow:0_0_10px_rgba(0,255,65,0.5)] m-0 tracking-wider">
                  {t.audio}
                </h3>
                
                {/* Music Volume */}
                <div className="flex flex-col gap-3 w-full mb-6">
                  <label className="flex items-center justify-between text-lg text-gray-200 font-semibold gap-3">
                    <span className="flex items-center gap-2">
                      <span className="text-xl">🎵</span>
                      {t.musicVolume}
                    </span>
                    <span className="text-cyan-400 font-bold min-w-[50px] text-right">{musicVolume}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={musicVolume}
                    onChange={(e) => setMusicVolume(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg bg-gray-700 outline-none cursor-pointer appearance-none
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgb(0,243,255)] [&::-webkit-slider-thumb]:hover:bg-[#00ff41] [&::-webkit-slider-thumb]:hover:shadow-[0_0_20px_rgb(0,255,65)] [&::-webkit-slider-thumb]:active:bg-[#00ff41]
                      [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cyan-400 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-[0_0_15px_rgb(0,243,255)] [&::-moz-range-thumb]:hover:bg-[#00ff41] [&::-moz-range-thumb]:hover:shadow-[0_0_20px_rgb(0,255,65)] [&::-moz-range-thumb]:active:bg-[#00ff41]"
                  />
                </div>

                {/* SFX Volume */}
                <div className="flex flex-col gap-3 w-full">
                  <label className="flex items-center justify-between text-lg text-gray-200 font-semibold gap-3">
                    <span className="flex items-center gap-2">
                      <span className="text-xl">🔊</span>
                      {t.sfxVolume || "SFX Volume"}
                    </span>
                    <span className="text-cyan-400 font-bold min-w-[50px] text-right">{sfxVolume}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sfxVolume}
                    onChange={(e) => setSfxVolume(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg bg-gray-700 outline-none cursor-pointer appearance-none
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgb(0,243,255)] [&::-webkit-slider-thumb]:hover:bg-[#00ff41] [&::-webkit-slider-thumb]:hover:shadow-[0_0_20px_rgb(0,255,65)] [&::-webkit-slider-thumb]:active:bg-[#00ff41]
                      [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cyan-400 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-[0_0_15px_rgb(0,243,255)] [&::-moz-range-thumb]:hover:bg-[#00ff41] [&::-moz-range-thumb]:hover:shadow-[0_0_20px_rgb(0,255,65)] [&::-moz-range-thumb]:active:bg-[#00ff41]"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex flex-col gap-4 mt-8 text-center">
                <button 
                  className="px-10 py-4 text-xl font-bold tracking-wider border-2 border-cyan-400 bg-gradient-to-br from-cyan-400/10 to-cyan-400/20 text-cyan-400 rounded-lg transition-all duration-300 uppercase shadow-[0_0_10px_rgba(0,243,255,0.3)] hover:from-cyan-400/20 hover:to-cyan-400/30 hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] hover:-translate-y-0.5 active:translate-y-0"
                  onClick={handleSaveSettings}
                >
                  💾 {t.saveSettings || 'Salva Impostazioni'}
                </button>
                {showSaveConfirm && (
                  <p className="mt-4 text-[#00ff41] text-lg font-semibold [text-shadow:0_0_10px_rgb(0,255,65)] animate-[fadeInScale_0.5s_ease-out]">
                    {t.saveConfirm || 'Impostazioni salvate!'}
                  </p>
                )}
                {saveData.lastSaved && (
                  <p className="mt-2 text-gray-400 text-sm opacity-70">
                    {t.lastSaved || 'Ultimo salvataggio:'} {new Date(saveData.lastSaved).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          )}

          {activeSection === 'about' && (
            <div className="animate-[slideIn_0.3s_ease-out]">
              <h2 className="text-3xl font-bold text-[#00ff41] [text-shadow:0_0_15px_rgba(0,255,65,0.5)] mb-8 tracking-wider">
                {t.aboutTitle}
              </h2>
              <div className="text-gray-200 leading-relaxed text-lg space-y-5">
                <p>{t.aboutContent.p1}</p>
                <p>{t.aboutContent.p2}</p>
                <p>
                  <strong className="text-cyan-400 font-bold">{t.aboutContent.p3Objective}</strong> {t.aboutContent.p3}
                </p>
                <p>
                  <strong className="text-cyan-400 font-bold">{t.aboutContent.version}</strong> 1.0.0<br />
                  <strong className="text-cyan-400 font-bold">{t.aboutContent.projectType}</strong> {t.aboutContent.projectTypeValue}<br />
                  <strong className="text-cyan-400 font-bold">{t.aboutContent.year}</strong> 2026
                </p>
              </div>
            </div>
          )}

          {activeSection === 'credits' && (
            <div className="animate-[slideIn_0.3s_ease-out]">
              <h2 className="text-3xl font-bold text-[#00ff41] [text-shadow:0_0_15px_rgba(0,255,65,0.5)] mb-8 tracking-wider">
                {t.creditsTitle}
              </h2>
              <div className="text-gray-200 leading-relaxed text-lg flex flex-col gap-8">
                <div className="pb-5 border-b border-cyan-400/20">
                  <h3 className="text-xl text-cyan-400 [text-shadow:0_0_10px_rgba(0,243,255,0.5)] mb-4 tracking-wider">{t.creditsContent.devTeam}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {t.creditsContent.teamMembers && t.creditsContent.teamMembers.map((member, index) => (
                      <div key={index} className="p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 text-center">
                        <p className="text-[#00ff41] font-semibold">{member.name}</p>
                      </div>
                    ))}
                  </div>
                  <p className="my-1 text-[#00ff41] font-semibold">{t.creditsContent.magistrale}</p>
                </div>

                <div className="pb-5">
                  <h3 className="text-xl text-cyan-400 [text-shadow:0_0_10px_rgba(0,243,255,0.5)] mb-4 tracking-wider">{t.creditsContent.tech}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                    {/* React */}
                    <div className="flex flex-col items-center justify-center p-4 bg-cyan-400/5 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 group">
                      <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg" alt="React" className="w-16 h-16 object-contain mb-2" style={{filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(0.9)'}} />
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-[#00ff41]">React</p>
                    </div>
                    {/* Vite */}
                    <div className="flex flex-col items-center justify-center p-4 bg-cyan-400/5 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 group">
                      <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vite.svg" alt="Vite" className="w-16 h-16 object-contain mb-2" style={{filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(0.9)'}} />
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-[#00ff41]">Vite</p>
                    </div>
                    {/* Python */}
                    <div className="flex flex-col items-center justify-center p-4 bg-cyan-400/5 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 group">
                      <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/python.svg" alt="Python" className="w-16 h-16 object-contain mb-2" style={{filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(0.9)'}} />
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-[#00ff41]">Python</p>
                    </div>
                    {/* Flask */}
                    <div className="flex flex-col items-center justify-center p-4 bg-cyan-400/5 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 group">
                      <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/flask.svg" alt="Flask" className="w-16 h-16 object-contain mb-2" style={{filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(0.9)'}} />
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-[#00ff41]">Flask</p>
                    </div>
                    {/* Docker */}
                    <div className="flex flex-col items-center justify-center p-4 bg-cyan-400/5 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 group">
                      <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docker.svg" alt="Docker" className="w-16 h-16 object-contain mb-2" style={{filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(0.9)'}} />
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-[#00ff41]">Docker</p>
                    </div>
                    {/* Tailwind */}
                    <div className="flex flex-col items-center justify-center p-4 bg-cyan-400/5 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 group">
                      <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tailwindcss.svg" alt="Tailwind" className="w-16 h-16 object-contain mb-2" style={{filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(0.9)'}} />
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-[#00ff41]">Tailwind</p>
                    </div>
                  </div>
                </div>

                {t.creditsContent.copyright && (
                  <p className="text-center text-sm text-gray-400 mt-8 pt-5 border-t border-cyan-400/20">{t.creditsContent.copyright}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Options;
