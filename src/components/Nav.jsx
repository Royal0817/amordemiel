// Nav.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/nav.css';
import imgDesktop from '../images/logo-cropped.png';
import imgMobile from '../images/logo-cropped.png';

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

  const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm10.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z" />
    </svg>
  );

  const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M15.5 3a6.2 6.2 0 0 0 3.7 2.1v3.1a9.3 9.3 0 0 1-3.7-1.3v6.4a5.9 5.9 0 1 1-5.9-5.9c.3 0 .7 0 1 .1v3.2a2.7 2.7 0 1 0 2.1 2.6V3h2.8z" />
    </svg>
  );

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
          <a
            className="nav-ig-link"
            href="https://www.instagram.com/_amordemiel/?hl=en"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Amor de Miel on Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            className="nav-ig-link"
            href="https://www.tiktok.com/@amordemiel?_r=1&_t=ZT-92iEQAz1OS7"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Amor de Miel on TikTok"
          >
            <TikTokIcon />
          </a>
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
        <div className='nav-panel'>
          <div className='nav-mobile-header'>
            <span className='nav-mobile-eyebrow'>Sweet navigation</span>
            <h2>Find your next celebration</h2>
          </div>
          <div className='nav-menu'>
            <NavLinks onClick={closeMenu} />
            <div className='nav-item'>
              <Link to="/contact" onClick={closeMenu} className='cta nav-mobile-cta'>
                Start Inquiry
              </Link>
            </div>
          </div>
          <div className="nav-mobile-footer">
            <a
              className='nav-ig'
              href='https://www.instagram.com/_amordemiel/?hl=en'
              target='_blank'
              rel='noreferrer'
              aria-label='Visit Amor de Miel on Instagram'
            >
              <span className="nav-ig-icon">
                <InstagramIcon />
              </span>
              <span className="sr-only">Instagram</span>
            </a>
            <a
              className='nav-ig'
              href='https://www.tiktok.com/@amordemiel?_r=1&_t=ZT-92iEQAz1OS7'
              target='_blank'
              rel='noreferrer'
              aria-label='Visit Amor de Miel on TikTok'
            >
              <span className="nav-ig-icon">
                <TikTokIcon />
              </span>
              <span className="sr-only">TikTok</span>
            </a>
          </div>
        </div>
      </div>
      {isOpen && <div className="backdrop" aria-hidden onClick={closeMenu} />}
    </header>
  );
};

export default Nav;
