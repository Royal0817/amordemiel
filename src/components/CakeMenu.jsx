import React from 'react';
import '../styles/CakeMenu.css'
import img2  from '../images/logo.png'

const CakeMenu = () => {
  return (
    <div id='cake-menu'>
      <div className='menu-logo'>
        <img src={img2} alt="logo" />
      </div>
      <section className='menu-headers'>
      <h1>Menu</h1>
      </section>

      <section className='menu-items'>
        <h4>Cakes</h4>
          <div>Tres Leches</div>
          <div>Chocolate</div>
          <div>Vanilla</div>
          <div>Strawberry</div>
          <div>flavor</div>
          <div>flavor</div>
          <div>flavor</div>
          <div>flavor</div>

        <h4>Cupcakes</h4>
          <div>flavor</div>
          <div>flavor</div>
          <div>flavor</div>
          <div>flavor</div>
          <div>flavor</div>

          <h4>Cookies</h4>
            <div>flavor</div>
            <div>flavor</div>
            <div>flavor</div>
            <div>flavor</div>
            <div>flavor</div>
            <div>flavor</div>
            <div>flavor</div>
        
        <h4>Food</h4>
          <div>food item</div>
          <div>food item</div>
          <div>food item</div>
          <div>food item</div>
          <div>food item</div>
          <div>food item</div>
          <div>food item</div>

      </section>
    </div>
  );
}

export default CakeMenu;
