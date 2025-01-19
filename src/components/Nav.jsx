// Nav.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';



const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };




  return (
    <>
      <nav>
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


            </div>
          )}

        </div>
      </nav>
      <div className='nav-item'>
        <Link to="/contact" onClick={toggleMenu}>
          Order Now
        </Link>
      </div>
    </>
  );
};

export default Nav;
