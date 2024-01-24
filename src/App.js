import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CakeMenu from './components/CakeMenu';
import CakeGallery from './components/CakeGallery';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import './styles/App.css';
import './styles/nav.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              
              <nav> 
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/cake-menu">Cake Menu</Link></li>
                  <li><Link to="/cake-gallery">Cake Gallery</Link></li>
                  <li><Link to="/about-me">About Me</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </nav>

              <header className="App-header">
                <img src="path/to/your/photo.jpg" alt="Bakery" />
              </header>
            </div>
          }
        />
        <Route path="/cake-menu" element={<CakeMenu />} />
        <Route path="/cake-gallery" element={<CakeGallery />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
