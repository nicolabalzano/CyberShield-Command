import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LevelMap from './pages/LevelMap';
import Level1 from './pages/Level1';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<LevelMap />} />
        <Route path="/level1" element={<Level1 />} />
      </Routes>
    </Router>
  );
}

export default App;
