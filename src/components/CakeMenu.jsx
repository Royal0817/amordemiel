import React from 'react';
import '../styles/CakeMenu.css'
import img2  from '../images/logo.png'

const CakeMenu = () => {
  return (
    <div id='cake-menu'>
      <div className='menu-logo'>
        <img src={img2} alt="logo" />
      </div>
      <section >
        <h1>Menu</h1>
      </section>

      <section className='menu-items'>
        <h4>Cakes</h4>
          <div className='food-item'>Tres Leches</div>
          <div className='food-item'>Chocolate</div>
          <div className='food-item'>Vanilla</div>
          <div className='food-item'>Strawberry</div>
          <div className='food-item'>flavor</div>
          <div className='food-item'>flavor</div>
          <div className='food-item'>flavor</div>
          <div className='food-item'>flavor</div>

        <h4>Cupcakes</h4>
          <div className='food-item'>flavor</div>
          <div className='food-item'>flavor</div>
          <div className='food-item'>flavor</div>
          <div className='food-item'>flavor</div>
          <div className='food-item'>flavor</div>

          <h4>Cookies</h4>
            <div className='food-item'>flavor</div>
            <div className='food-item'>flavor</div>
            <div className='food-item'>flavor</div>
            <div className='food-item'>flavor</div>
            <div className='food-item'>flavor</div>
            <div className='food-item'>flavor</div>
            <div className='food-item'>flavor</div>
        
        <h4>Food</h4>
          <div className='food-item'>food item</div>
          <div className='food-item'>food item</div>
          <div className='food-item'>food item</div>
          <div className='food-item'>food item</div>
          <div className='food-item'>food item</div>
          <div className='food-item'>food item</div>
          <div className='food-item'>food item</div>

      </section>
    </div>
  );
}

export default CakeMenu;
