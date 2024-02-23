import React from 'react';
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom';
import CakeMenu from './pages/CakeMenu.jsx';
import Gallery from './pages/Gallery.jsx';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';
import HomePage from './pages/Homepage.jsx'
import './styles/App.css';

function App() {
  return (
  <BrowserRouter basename='/homepage'>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/menu" element={<CakeMenu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
