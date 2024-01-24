import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';

const Nav = () => {
  return     <>
  <div className="nav">            
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
  </>     
};
export default Nav;
