import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AudioProvider } from './contexts/AudioContext';
import Home from './pages/Home';
import LevelMap from './pages/LevelMap';
import Level1 from './pages/Level1';
import Options from './pages/Options';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AudioProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<LevelMap />} />
            <Route path="/level1" element={<Level1 />} />
            <Route path="/options" element={<Options />} />
          </Routes>
        </Router>
      </AudioProvider>
    </LanguageProvider>
  );
}

export default App;
