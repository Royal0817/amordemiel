// Carousel.js

import React, { useRef, useState } from 'react';
import '../styles/carousel.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    scrollCarousel();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    scrollCarousel();
  };

  const scrollCarousel = () => {
    if (carouselRef.current) {
      const scrollPosition = currentIndex * carouselRef.current.offsetWidth;
      carouselRef.current.scrollLeft = scrollPosition;
    }
  };

  return (
    <div className="scrollable-container">
      <div ref={carouselRef} className="carousel">
        {images.map((image, index) => (
          <div key={index} className="carousel_slide">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel__navigation">
        <button className="carousel__prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="carousel__next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
