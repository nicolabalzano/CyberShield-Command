import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAudio } from '../contexts/AudioContext';
import { useSave } from '../contexts/SaveContext';
import { translations } from '../translations';
import './Options.css';

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
    <div className="options-container">
      <button
        className="fixed top-6 left-6 px-6 py-3 text-lg font-bold text-cyan-400 border-2 border-cyan-400 bg-transparent rounded-lg hover:bg-cyan-400/20 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all duration-300 cursor-pointer"
        onClick={() => navigate('/')}
      >
        ← {t.back}
      </button>

      <div className="flex flex-col items-center min-h-[calc(100vh-60px)] animate-[fadeIn_0.8s_ease-in]">
        <h1 className="text-6xl font-black tracking-[3px] text-cyan-400 mb-12 [text-shadow:0_0_20px_rgb(0,243,255),0_0_40px_rgba(0,243,255,0.5)]">
          {t.title}
        </h1>

        <div className="options-tabs">
          <button
            className={`tab-btn ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveSection('settings')}
          >
            {t.settings}
          </button>
          <button
            className={`tab-btn ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => setActiveSection('about')}
          >
            {t.about}
          </button>
          <button
            className={`tab-btn ${activeSection === 'credits' ? 'active' : ''}`}
            onClick={() => setActiveSection('credits')}
          >
            {t.credits}
          </button>
        </div>

        <div className="options-panel">
          {activeSection === 'settings' && (
            <div className="flex flex-col">
              {/* Language Selection */}
              <div className="flex flex-col gap-5">
                <h3 className="text-2xl font-bold text-[#00ff41] [text-shadow:0_0_10px_rgba(0,255,65,0.5)] m-0 tracking-wider">
                  {t.language}
                </h3>
                <div className="language-grid">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`language-btn ${language === lang.code ? 'active' : ''}`}
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      <span className="flag">{lang.flag}</span>
                      <span className="lang-name">{lang.name}</span>
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
                    className="volume-slider"
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
                    className="volume-slider"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex flex-col gap-4 mt-8 text-center">
                <button
                  className="save-settings-btn"
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

                <div className="">
                  <h3 className="text-xl text-cyan-400 [text-shadow:0_0_10px_rgba(0,243,255,0.5)] mb-4 tracking-wider">{t.creditsContent.tech}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-4">
                    {/* React */}
                    <div className="flex flex-col items-center justify-center p-0 bg-cyan-400/5 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 group">
                      <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg" alt="React" className="w-16 h-16 object-contain mb-2" style={{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(0.9)' }} />
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-[#00ff41]">React</p>
                    </div>
                    {/* Vite */}
                    <div className="flex flex-col items-center justify-center p-4 bg-cyan-400/5 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 group">
                      <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vite.svg" alt="Vite" className="w-16 h-16 object-contain mb-2" style={{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(0.9)' }} />
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-[#00ff41]">Vite</p>
                    </div>
                    {/* Python */}
                    <div className="flex flex-col items-center justify-center p-4 bg-cyan-400/5 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 group">
                      <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/python.svg" alt="Python" className="w-16 h-16 object-contain mb-2" style={{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(0.9)' }} />
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-[#00ff41]">Python</p>
                    </div>
                    {/* Flask */}
                    <div className="flex flex-col items-center justify-center p-4 bg-cyan-400/5 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 group">
                      <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/flask.svg" alt="Flask" className="w-16 h-16 object-contain mb-2" style={{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(0.9)' }} />
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-[#00ff41]">Flask</p>
                    </div>
                    {/* Docker */}
                    <div className="flex flex-col items-center justify-center p-4 bg-cyan-400/5 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 group">
                      <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docker.svg" alt="Docker" className="w-16 h-16 object-contain mb-2" style={{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(0.9)' }} />
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-[#00ff41]">Docker</p>
                    </div>
                    {/* Tailwind */}
                    <div className="flex flex-col items-center justify-center p-4 bg-cyan-400/5 border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 group">
                      <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tailwindcss.svg" alt="Tailwind" className="w-16 h-16 object-contain mb-2" style={{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(0.9)' }} />
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
