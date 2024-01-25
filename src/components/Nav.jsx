// Nav.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import imgDesktop from '../images/logo.png'
import imgMobile from '../images/white-logo.png'


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState(imgDesktop);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        setLogoSrc(imgDesktop);
      } else {
        setLogoSrc(imgMobile);
      }
    };

    // Initial setup
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav>
        <div className='logo'>
          <img src={logoSrc} alt="logo" />
        </div>

        {/* Desktop navigation */}
        <div className='desktop-nav'>
          <div className='nav-item'>
            <Link to="/menu">Menu</Link>
          </div>
          <div className='nav-item'>
            <Link to="/gallery">Gallery</Link>
          </div>
          <div className='nav-item'>
            <Link to="/about-me">About Me</Link>
          </div>
          <div className='nav-item'>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className='mobile-nav'>
          <div className='hamburger' onClick={toggleMenu}>
            &#9776;
          </div>
          {isOpen && (
            <div className='nav-menu'>
              <div className='nav-item'>
                <Link to="/menu" onClick={toggleMenu}>
                  Menu
                </Link>
              </div>
              <div className='nav-item'>
                <Link to="/gallery" onClick={toggleMenu}>
                  Gallery
                </Link>
              </div>
              <div className='nav-item'>
                <Link to="/about-me" onClick={toggleMenu}>
                  About Me
                </Link>
              </div>
              <div className='nav-item'>
                <Link to="/contact" onClick={toggleMenu}>
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
