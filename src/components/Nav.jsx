import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import logo from '../images/logo.png'
const Nav = () => {
  return (
    <>
        <nav>           
              <div className='logo nav-item'>
                <img src={logo} alt="Amor de Miel logo" />
              </div>
              <div className='nav-item'> <Link to="/menu">Menu</Link> </div>
              <div className='nav-item'> <Link to="/gallery">Gallery</Link> </div>
              <div className='nav-item'> <Link to="/about-me">About Me</Link> </div>
              <div className='nav-item'> <Link to="/contact">Contact</Link> </div>
        </nav>
    </>     
  )
};
export default Nav;
