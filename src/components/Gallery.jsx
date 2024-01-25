import React from 'react';
import Carousel from './carousel.jsx';
import '../styles/carousel.css'

const images = [
  'https://placekitten.com/800/400',
  'https://placekitten.com/801/400',
  'https://placekitten.com/802/400',
  'https://placekitten.com/803/400',
  'https://placekitten.com/800/400',
  'https://placekitten.com/801/400',
  'https://placekitten.com/802/400',
  'https://placekitten.com/803/400',
];

const Gallery = () => {
  return (
  <div id='gallery'>
    <Carousel images={images}/>
  </div>
  );
};

export default Gallery;
