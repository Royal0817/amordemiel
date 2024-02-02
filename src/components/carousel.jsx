import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../styles/carousel.css'
import img4  from '../images/logo.png'

const CarouselIndicators = ({ images, activeIndex, onClick }) => (
  <div className="carousel_indicators">
    <img src={img4} alt="logo" />
    {images.map((_, index) => (
      <span
        key={index}
        className={`carousel_indicator ${index === activeIndex ? 'active' : ''}`}
        onClick={() => onClick(index)}
      />
    ))}
  </div>
);

CarouselIndicators.propTypes = {
  images: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Carousel = ({ images, interval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const autoPlayInterval = setInterval(nextSlide, interval);

    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [interval, nextSlide]);

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="carousel__btn carousel__btn--prev" aria-label="Previous Slide">
        &lt;
      </button>
      <img
        src={images[activeIndex]}
        alt={`Slide ${activeIndex}`}
        className="carousel-img"
      />
      <button onClick={nextSlide} className="carousel__btn carousel__btn--next" aria-label="Next Slide">
        &gt;
      </button>
      <CarouselIndicators
        images={images}
        activeIndex={activeIndex}
        onClick={goToSlide}
      />
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  interval: PropTypes.number,
};

export default Carousel;
