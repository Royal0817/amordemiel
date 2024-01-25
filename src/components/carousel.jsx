import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
//-------------------------------!!!!!!!indicators not rendering come back to fix!!!!!!!!!!---------------------

const CarouselIndicators = ({ images, activeIndex, onClick }) => (
  <div className="carousel_indicators">
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
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
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
        className="carousel__img"
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
