import React from 'react';
import { useNavigate } from 'react-router-dom';

function LevelMap() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Mappa dei Livelli</h1>
      <div style={{ marginTop: '30px' }}>
        <button onClick={() => navigate('/level1')} style={{ padding: '20px', fontSize: '18px' }}>
          Livello 1
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/')}>
          Torna alla Home
        </button>
      </div>
    </div>
  );
}

export default LevelMap;
