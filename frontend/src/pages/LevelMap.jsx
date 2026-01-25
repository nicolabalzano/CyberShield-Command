import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAudio } from '../contexts/AudioContext';
import { useSave } from '../contexts/SaveContext';
import { translations } from '../translations';
import whiteHatStar from '../assets/white_hat_star.png';
import '../palette.css';
import './LevelMap.css';

function LevelMap() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { changeTrack } = useAudio();
  const { saveData, getTotalStars } = useSave();
  const t = translations[language].levelMap;

  useEffect(() => {
    // Torna sempre alla musica di background quando si apre la mappa
    changeTrack('/level-music.mp3');
  }, [changeTrack]);

  const [selectedLevel, setSelectedLevel] = useState(null);

  // Usa le stelle dal contesto di salvataggio
  const stars = saveData.stars;
  const totalStars = getTotalStars();

  const levels = [
    { id: 'tutorial', number: 0, unlocked: true, starsEarned: stars.tutorial, position: 2, isTutorial: true },
    { id: 'level1', number: 1, unlocked: true, starsEarned: stars.level1, position: 12 },
    { id: 'level2', number: 2, unlocked: true, starsEarned: stars.level2, position: 22 },
    { id: 'level3', number: 3, unlocked: true, starsEarned: stars.level3, position: 32 },
    { id: 'level4', number: 4, unlocked: true, starsEarned: stars.level4, position: 42 },
    { id: 'level5', number: 5, unlocked: true, starsEarned: stars.level5, position: 52 },
    { id: 'level6', number: 6, unlocked: true, starsEarned: stars.level6, position: 62 },
    { id: 'level7', number: 7, unlocked: true, starsEarned: stars.level7, position: 72 },
    { id: 'level8', number: 8, unlocked: true, starsEarned: stars.level8, position: 82 },
    { id: 'level9', number: 9, unlocked: true, starsEarned: stars.level9, position: 92 },
  ];

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  const handleCloseModal = () => {
    setSelectedLevel(null);
  };

  const handlePlayLevel = () => {
    if (selectedLevel) {
      navigate(`/${selectedLevel.id}`);
    }
  };

  const renderStars = (count) => {
    return (
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
        {[...Array(3)].map((_, index) => (
          <img
            key={index}
            src={whiteHatStar}
            alt="star"
            style={{
              width: '20px',
              height: '20px',
              opacity: index < count ? 1 : 0.3,
              filter: index < count ? 'drop-shadow(0 0 5px rgba(255,255,255,0.7))' : 'none'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="levelmap-container">
      <button className="home-btn-back" onClick={() => navigate('/')}>
        ← {t.back}
      </button>

      <div className="stars-counter-top">
        <img
          src={whiteHatStar}
          alt="star"
          style={{
            width: '30px',
            height: '30px',
            filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.7))'
          }}
        />
        <span className="stars-text">{totalStars} / 30</span>
      </div>

      <div className="levelmap-content">
        <h1 className="levelmap-title">{t.title}</h1>

        <div className="path-scroll-wrapper">
          <div className="path-container">
            <svg className="path-svg" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0, 243, 255, 0.6)" />
                  <stop offset="50%" stopColor="rgba(0, 243, 255, 0.8)" />
                  <stop offset="100%" stopColor="rgba(0, 243, 255, 0.6)" />
                </linearGradient>
              </defs>
              <path
                d="M 4 15 Q 7 12, 12 15 Q 17 18, 22 15 Q 27 12, 32 15 Q 37 18, 42 15 Q 47 12, 52 15 Q 57 18, 62 15 Q 67 12, 72 15 Q 77 18, 82 15 Q 87 12, 92 15"
                stroke="url(#pathGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <div className="levels-container">
              {levels.map((level) => (
                <button
                  key={level.id}
                  className={`level-node ${!level.unlocked ? 'locked' : ''} ${level.isTutorial ? 'tutorial' : ''}`}
                  style={{
                    left: `${level.position}%`
                  }}
                  onClick={() => level.unlocked && handleLevelClick(level)}
                  disabled={!level.unlocked}
                >
                  <div className="level-number">{level.isTutorial ? 'TUTORIAL' : level.number}</div>
                  {!level.unlocked ? (
                    <div className="lock-icon">🔒</div>
                  ) : (
                    <div className="level-stars">{renderStars(level.starsEarned)}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedLevel && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>
              ✕
            </button>

            <h2 className="modal-title">{selectedLevel.isTutorial ? 'Tutorial' : `Level ${selectedLevel.number}`}</h2>
            <h3 className="modal-name">{t.levelInfo[selectedLevel.id].name}</h3>

            <p className="modal-description">{t.levelInfo[selectedLevel.id].description}</p>

            <div className="modal-stars">
              {renderStars(selectedLevel.starsEarned)}
            </div>

            <button className="modal-play-btn" onClick={handlePlayLevel}>
              ▶ {t.play}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LevelMap;
