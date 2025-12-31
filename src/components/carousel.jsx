import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../styles/carousel.css'


const CarouselIndicators = ({ images, activeIndex, onClick }) => (
  <div className="menu-carousel-indicators">

    {images.map((_, index) => (
      <span
        key={index}
        className={`menu-carousel-indicator ${index === activeIndex ? 'active' : ''}`}
        onClick={() => onClick(index)}
      />
    ))}
  </div>
);


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
    <div className="menu-carousel">
      <button onClick={prevSlide} className="carousel-btn carousel-btn-prev" aria-label="Previous Slide">
        &lt;
      </button>
      <img
        src={images[activeIndex]}
        alt={`Slide ${activeIndex}`}
        className="carousel-img"
        />
      <button onClick={nextSlide} className="carousel-btn carousel-btn-next" aria-label="Next Slide">
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

CarouselIndicators.propTypes = {
  images: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Carousel;
