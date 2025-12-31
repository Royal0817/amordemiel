// Nav.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/nav.css';
import imgDesktop from '../images/logo.png';
import imgMobile from '../images/white-logo.png';

const NAV_LINKS = [
  { to: '/homepage', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about-me', label: 'About' },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState(imgDesktop);
  const location = useLocation();
  const menuRef = useRef(null);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((o) => !o);

  useEffect(() => {
    const handleResize = () => {
      setLogoSrc(window.innerWidth >= 600 ? imgDesktop : imgMobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Close on ESC / click outside
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeMenu();
    const onClick = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [isOpen]);

  const currentPath = location.pathname === '/' ? '/homepage' : location.pathname;

  const NavLinks = ({ onClick }) => (
    <>
      {NAV_LINKS.map((link) => (
        <div
          key={link.href || link.to}
          className={`nav-item ${!link.external && currentPath === link.to ? 'active' : ''}`}
        >
          <Link to={link.to} onClick={onClick}>{link.label}</Link>
        </div>
      ))}
    </>
  );

  return (
    <header className="site-nav" aria-label="Primary navigation">
      <div className="nav-inner">
        <div className="nav-left">
          <Link to="/homepage" className="logo" aria-label="Amor de Miel homepage">
            <img src={logoSrc} alt="Amor de Miel logo" />
          </Link>
        </div>

        <div className='desktop-nav'>
          <NavLinks />
        </div>

        <div className="nav-right">
          <Link className="cta" to="/contact">
            Start Inquiry
          </Link>
          <button
            className='hamburger'
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            {/* Unicode burger for simplicity; replace with icon if desired */}
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-nav ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className='nav-menu'>
          <NavLinks onClick={closeMenu} />
          <div className='nav-item'>
            <Link to="/contact" onClick={closeMenu} className='cta'>
              Start Inquiry
            </Link>
          </div>
        </div>
      </div>
      {isOpen && <div className="backdrop" aria-hidden onClick={closeMenu} />}
    </header>
  );
};

export default Nav;
