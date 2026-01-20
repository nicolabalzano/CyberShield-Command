import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import '../palette.css';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language].home;

  const handlePlayClick = () => {
    navigate('/map');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">{t.title}</h1>
        <p className="home-subtitle">{t.subtitle}</p>
        
        <div className="home-buttons">
          <button className="home-btn play-btn" onClick={handlePlayClick}>
            <span className="play-icon">▶</span> {t.play}
          </button>
          <button className="home-btn options-btn" onClick={() => navigate('/options')}>
            <span className="options-icon">⚙</span> {t.options}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
