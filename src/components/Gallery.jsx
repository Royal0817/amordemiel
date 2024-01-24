import React from 'react';
import Carousel from './carousel.jsx';

const images = [
  'https://placekitten.com/800/400',
  'https://placekitten.com/801/400',
  'https://placekitten.com/802/400',
  'https://placekitten.com/803/400',
];

const Gallery = () => {
  return (
    <div className='scrollable-container'>
      <h1>Scrollable Container with Carousel</h1>
      <Carousel images={images} />
    </div>
  );
};

export default Gallery;
