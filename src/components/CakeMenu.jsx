import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CakeMenu.css'
import img2  from '../images/logo.png'

const CakeMenu = () => {
  return (
    <div id='cake-menu'>
      <div className='nav-item'>
        <Link to="/">Homepage</Link>
      </div>
      <div className='nav-item'>
        <Link to="/gallery">Gallery</Link>
      </div>
      
      <div className='menu-logo'>
        <img src={img2} alt="logo" />
      </div>

      <section className='menu-items'>
        <h1>Menu</h1>
        <h4>Cakes</h4>
          <div className='food-item'>Tres Leches</div>
          <div className='food-item'>Cafe & Tres Leches</div>
          <div className='food-item'>Chocolate</div>
          <div className='food-item'>Vanilla</div>
          <div className='food-item'>Strawberry</div>
          <div className='food-item'>Carrot Cake</div>
          <div className='food-item'>Coconut</div>
          <div className='food-item'>Lemon</div>

        <h4>Cupcakes</h4>
          <div className='food-item'>Strawberry</div>
          <div className='food-item'>Red Velvet</div>
          <div className='food-item'>Chocolate</div>
          <div className='food-item'>Vanilla</div>
          <div className='food-item'>Lemon</div>
          <div className='food-item'>Oreo</div>
          <div className='food-item'>Tres Leches</div>
          <div className='food-item'>Cafe & Tres Leches</div>


          <h4>Cookies</h4>
            <div className='food-item'>Chocolate Chip</div>
            <div className='food-item'>Snickerdoodle</div>
            <div className='food-item'>Oatmeal Raisin</div>
            <div className='food-item'>Sugar Cookie</div>
      
      </section>
    </div>
  );
}

export default CakeMenu;
