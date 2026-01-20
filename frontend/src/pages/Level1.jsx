import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Level1() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Example of fetching from backend (this will be used later)
    // fetch('/api/progress') 
    //   .then(res => res.json())
    //   .then(data => console.log(data));
  }, []);

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
