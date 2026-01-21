import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AudioProvider } from './contexts/AudioContext';
import { SaveProvider } from './contexts/SaveContext';
import Home from './pages/Home';
import LevelMap from './pages/LevelMap';
import LevelTutorial from './levels/LevelTutorial.jsx';
import Level1 from './levels/Level1.jsx';
import Level2 from './levels/Level2.jsx';
import Level3 from './levels/Level3.jsx';
import Level4 from './levels/Level4.jsx';
import Level5 from './levels/Level5.jsx';
import Level6 from './levels/Level6.jsx';
import Level7 from './levels/Level7.jsx';
import Level8 from './levels/Level8.jsx';
import Level9 from './levels/Level9.jsx';
import Options from './pages/Options';
import './App.css';

function App() {
  return (
    <SaveProvider>
      <LanguageProvider>
        <AudioProvider>
          <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<LevelMap />} />
            <Route path="/tutorial" element={<LevelTutorial />} />
            <Route path="/level1" element={<Level1 />} />
            <Route path="/level2" element={<Level2 />} />
            <Route path="/level3" element={<Level3 />} />
            <Route path="/level4" element={<Level4 />} />
            <Route path="/level5" element={<Level5 />} />
            <Route path="/level6" element={<Level6 />} />
            <Route path="/level7" element={<Level7 />} />
            <Route path="/level8" element={<Level8 />} />
            <Route path="/level9" element={<Level9 />} />
            <Route path="/options" element={<Options />} />
          </Routes>
          </Router>
        </AudioProvider>
      </LanguageProvider>
    </SaveProvider>
  );
}

export default App;
