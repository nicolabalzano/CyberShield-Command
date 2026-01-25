import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useSave } from '../contexts/SaveContext';
import { translations } from '../translations';
import '../palette.css';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { getStars, resetSave } = useSave();
  const t = translations[language].home;
  const [totalStars, setTotalStars] = useState(0);

  useEffect(() => {
    let stars = 0;
    const levelIds = ['tutorial', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8', 'level9'];
    for (const levelId of levelIds) {
      const levelStars = getStars(levelId) || 0;
      stars += levelStars;
    }
    setTotalStars(stars);
  }, [getStars]);

  const handleContinueClick = () => {
    navigate('/map');
  };

  const handleNewGameClick = async () => {
    await resetSave();
    setTotalStars(0);
    navigate('/map');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">{t.title}</h1>
        <p className="home-subtitle">{t.subtitle}</p>
        
        <div className="home-buttons">
          {totalStars >= 1 && (
            <button className="home-btn continua-btn" onClick={handleContinueClick}>
              <span className="continua-icon">▶</span> {t.continua}
            </button>
          )}
          <button className="home-btn newgame-btn" onClick={handleNewGameClick}>
            <span className="newgame-icon">▶</span> {t.newGame}
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
