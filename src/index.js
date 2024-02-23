import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom';
import CakeMenu from './pages/CakeMenu.jsx';
import Gallery from './pages/Gallery.jsx';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';
import HomePage from './pages/Homepage.jsx'
import './styles/App.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<>
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
</>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
