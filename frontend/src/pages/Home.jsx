import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 className="text-3xl font-bold underline">Cybersecurity Serious Game</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <button onClick={() => alert("Impostazioni clicked")}>
          Impostazioni
        </button>
        <button onClick={() => navigate('/map')}>
          Mappa dei Livelli
        </button>
      </div>
    </div>
  );
}

export default Home;
