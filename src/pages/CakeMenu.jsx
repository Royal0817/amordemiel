import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CakeMenu.css'
import Carousel from '../components/carousel'
import test from '../images/menu-background.png'
import test2 from '../images/test2.png'
import test3 from '../images/test3.png'
import test4 from '../images/test4.png'


const media = [
  test,test2,test3,test4
]

const CakeMenu = () => {
  return (
    <div id='cake-menu'>
      <div className="menu-nav">
        <div className='menu-item-nav'>
          <Link to="/">Homepage</Link>
        </div>
        <div className='menu-item-nav'>
          <Link to="/gallery">Gallery</Link>
        </div>
      </div>

      <div className='carousel-conatiner'>
        <div className="carousel-left-top">
          <Carousel images={media}/>
        </div>
        <div className="carousel-right-bottom">
          Celebrate with Amor de Miel!
        </div>
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
          <div className='food-item'>Red velvet</div>
          <div className='food-item'>Coconut</div>
          <div className='food-item'>Lemon</div>

        <h4>Cake Fillings</h4>
          <div className='food-item'>Strawberry mouse</div>
          <div className='food-item'>Chocolate</div>
          <div className='food-item'>Vanilla</div>
          <div className='food-item'>Cream Cheese</div>
          <div className='food-item'>Lemon curd</div>
          <div className='food-item'>fruits vanilla(change later)</div>
          <div className='food-item'>Roasted coconut & vanilla</div>
          <div className='food-item'>strawberries and cream</div>

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
