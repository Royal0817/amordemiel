import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from './carousel.jsx';
import '../styles/carousel.css'
import img1 from '../images/gallery/IMG_0321.jpeg'
import img2 from '../images/gallery/IMG_0321.jpeg'
import img3 from '../images/gallery/IMG_0999.jpeg'
import img4 from '../images/gallery/IMG_8315.jpeg'

const images = [
  img1,img2,img3,img4
];

const Gallery = () => {
  return (
  <div id='gallery'>
    <div className='nav-item'>
        <Link to="/">Homepage</Link>
    </div>
    <div className='nav-item'>
        <Link to="/menu">Menu</Link>
    </div>
    <h1>Gallery</h1>
    <Carousel images={images}/>
  </div>
  );
};

export default Gallery;
