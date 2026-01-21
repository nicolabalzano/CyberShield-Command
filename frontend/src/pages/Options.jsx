import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAudio } from '../contexts/AudioContext';
import { translations } from '../translations';
import '../palette.css';
import './Options.css';

function Options() {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const { musicVolume, changeMusicVolume, sfxVolume, changeSfxVolume } = useAudio();
  const t = translations[language].options;

  const [activeSection, setActiveSection] = useState('settings');

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

  return (
    <div className="options-container">
      <button className="home-btn-back" onClick={() => navigate('/')}>
        ← {t.back}
      </button>

      <div className="options-content">
        <h1 className="options-title">{t.title}</h1>

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
            <div className="settings-section">
              {/* Language Selection */}
              <div className="setting-group">
                <h3 className="setting-title">{t.language}</h3>
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
              <div className="setting-group">
                <h3 className="setting-title">{t.audio}</h3>
                
                {/* Music Volume */}
                <div className="volume-control" style={{ marginBottom: '1.5rem' }}>
                  <label className="volume-label">
                    <span className="volume-icon">🎵</span>
                    {t.musicVolume}
                    <span className="volume-value">{musicVolume}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={musicVolume}
                    onChange={(e) => changeMusicVolume(parseInt(e.target.value))}
                    className="volume-slider"
                  />
                </div>

                {/* SFX Volume */}
                <div className="volume-control">
                  <label className="volume-label">
                    <span className="volume-icon">🔊</span>
                    {t.sfxVolume || "SFX Volume"}
                    <span className="volume-value">{sfxVolume}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sfxVolume}
                    onChange={(e) => changeSfxVolume(parseInt(e.target.value))}
                    className="volume-slider"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'about' && (
            <div className="info-section">
              <h2 className="info-title">{t.aboutTitle}</h2>
              <div className="info-content">
                <p>{t.aboutContent.p1}</p>
                <p>{t.aboutContent.p2}</p>
                <p>
                  <strong>{t.aboutContent.p3Objective}</strong> {t.aboutContent.p3}
                </p>
                <p>
                  <strong>{t.aboutContent.version}</strong> 1.0.0<br />
                  <strong>{t.aboutContent.projectType}</strong> {t.aboutContent.projectTypeValue}<br />
                  <strong>{t.aboutContent.year}</strong> 2026
                </p>
              </div>
            </div>
          )}

          {activeSection === 'credits' && (
            <div className="info-section">
              <h2 className="info-title">{t.creditsTitle}</h2>
              <div className="info-content credits-list">
                <div className="credit-group">
                  <h3>{t.creditsContent.devTeam}</h3>
                  <p>{t.creditsContent.gameDesign}</p>
                  <p className="credit-name">{t.creditsContent.magistrale}</p>
                </div>

                <div className="credit-group">
                  <h3>{t.creditsContent.specialThanks}</h3>
                  <p>{t.creditsContent.advisors}</p>
                  <p>{t.creditsContent.experts}</p>
                  <p>{t.creditsContent.testers}</p>
                </div>

                <div className="credit-group">
                  <h3>{t.creditsContent.tech}</h3>
                  <p>React.js • Vite • Docker</p>
                  <p>Flask • Python</p>
                </div>

                <div className="credit-group">
                  <h3>{t.creditsContent.assets}</h3>
                  <p>{t.creditsContent.icons}</p>
                  <p>{t.creditsContent.palette}</p>
                </div>

                <p className="copyright">{t.creditsContent.copyright}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Options;
