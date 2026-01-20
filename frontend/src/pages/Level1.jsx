import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';

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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Livello 1: Introduzione</h1>
      <p>Benvenuto nel primo livello di training.</p>
      <div style={{ marginTop: '30px' }}>
        <p>Qui ci sarà il contenuto del gioco.</p>
        <button onClick={() => navigate('/map')}>
          Torna alla Mappa
        </button>
      </div>
    </div>
  );
}

export default Level1;
