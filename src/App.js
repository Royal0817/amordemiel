import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CakeMenu from './components/CakeMenu';
import CakeGallery from './components/CakeGallery';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import HomePage from './components/Homepage.jsx'
import './styles/App.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cake-menu" element={<CakeMenu />} />
        <Route path="/cake-gallery" element={<CakeGallery />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
  );
}

export default App;
