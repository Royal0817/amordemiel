// App.js
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import CakeMenu from './pages/CakeMenu.jsx';
import Gallery from './pages/Gallery.jsx';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';
import HomePage from './pages/Homepage.jsx';
import Admin from './pages/Admin.jsx';
import Nav from './components/Nav.jsx';
import { SubmissionsProvider } from './context/SubmissionsContext.jsx';
import { GalleryProvider } from './context/GalleryContext.jsx';
import './styles/App.css';

function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

function App() {
  return (
    <GalleryProvider>
      <SubmissionsProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" replace />} />

          <Route element={<Layout />}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/menu" element={<CakeMenu />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<div style={{ padding: 32 }}>Page not found</div>} />
          </Route>
        </Routes>
      </SubmissionsProvider>
    </GalleryProvider>
  );
}

export default App;
