import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CakeMenu from './components/CakeMenu';
import Gallery from './components/Gallery';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import HomePage from './components/Homepage.jsx'
import './styles/App.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<CakeMenu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
  );
}

export default App;
