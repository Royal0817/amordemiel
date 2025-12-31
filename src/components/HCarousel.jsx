import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import '../styles/Hcarousel.css';
import fallback1 from '../images/test.png';
import fallback2 from '../images/test2.png';
import fallback3 from '../images/test3.png';

/**
 * HCarousel – accessible, swipeable, and controllable carousel
 * Props (all optional):
 *  - autoPlay: boolean (default: true)
 *  - interval: number ms (default: 3000)
 *  - pauseOnHover: boolean (default: true)
 *  - showIndicators: boolean (default: true)
 *  - showArrows: boolean (default: true)
 *  - onSlideChange: (index:number)=>void
 */
const defaultSlides = [
  { src: fallback1, alt: 'Signature cake 1' },
  { src: fallback2, alt: 'Signature cake 2' },
  { src: fallback3, alt: 'Signature cake 3' },
];

const normalizeImages = (images) => {
  const source = images && images.length ? images : defaultSlides;
  return source.map((image, index) =>
    typeof image === 'string'
      ? { src: image, alt: `Featured cake ${index + 1}` }
      : { src: image.src, alt: image.alt || `Featured cake ${index + 1}` }
  );
};

const Hcarousel = ({
  autoPlay = true,
  interval = 3000,
  pauseOnHover = true,
  showIndicators = true,
  images: externalImages,
  onSlideChange,
}) => {
  const slides = useMemo(() => normalizeImages(externalImages), [externalImages]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const startXRef = useRef(null);
  const startYRef = useRef(null);
  const isTouchingRef = useRef(false);
  const autoplayRef = useRef(null);

  const goTo = useCallback(
    (newIndex) => {
      const n = slides.length;
      const next = ((newIndex % n) + n) % n; // safe modulo
      setCurrentIndex(next);
      if (onSlideChange) onSlideChange(next);
    },
    [slides.length, onSlideChange]
  );

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || isPaused || slides.length <= 1) return;
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((i) => {
        const nextIndex = (i + 1) % slides.length;
        if (onSlideChange) onSlideChange(nextIndex);
        return nextIndex;
      });
    }, interval);
    return () => clearInterval(autoplayRef.current);
  }, [autoPlay, interval, isPaused, slides.length, onSlideChange]);

  // Preload neighbors for snappier transitions
  useEffect(() => {
    if (!slides.length) return;
    const preload = (src) => {
      const img = new Image();
      img.src = src;
    };
    preload(slides[(currentIndex + 1) % slides.length].src);
    preload(slides[(currentIndex - 1 + slides.length) % slides.length].src);
  }, [currentIndex, slides]);

  // Keyboard support
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === ' ' || e.key === 'Spacebar') setIsPaused((p) => !p);
  };

  // Touch/drag swipe for mobile
  const handleTouchStart = (e) => {
    isTouchingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e) => {
    if (!isTouchingRef.current || startXRef.current == null) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    const deltaY = e.touches[0].clientY - startYRef.current;
    // threshold swipe distance in px
    const SWIPE = 45;
    const VERTICAL_TOLERANCE = 10;
    if (Math.abs(deltaX) <= Math.abs(deltaY) + VERTICAL_TOLERANCE) return;
    if (deltaX > SWIPE) {
      isTouchingRef.current = false;
      prev();
    } else if (deltaX < -SWIPE) {
      isTouchingRef.current = false;
      next();
    }
  };
  const handleTouchEnd = () => {
    isTouchingRef.current = false;
    startXRef.current = null;
    startYRef.current = null;
  };
  const handleTouchCancel = () => {
    isTouchingRef.current = false;
    startXRef.current = null;
    startYRef.current = null;
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [slides.length]);

  const hasCondensedIndicators = slides.length > 3;
  const prevIndex = useMemo(
    () => (slides.length ? (currentIndex - 1 + slides.length) % slides.length : 0),
    [slides.length, currentIndex]
  );
  const nextIndex = useMemo(
    () => (slides.length ? (currentIndex + 1) % slides.length : 0),
    [slides.length, currentIndex]
  );

  return (
    <div
      className="hcarousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured bakery items"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <div className="slides">
        {slides.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            role="group"
            aria-label={`Slide ${index + 1} of ${slides.length}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="carouselImage"
              loading={index === currentIndex ? 'eager' : 'lazy'}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {showIndicators && slides.length > 1 && (
        <div className="carousel-indicators" role="tablist" aria-label="Slides">
          {hasCondensedIndicators ? (
            <>
              <button
                type="button"
                role="tab"
                aria-selected={false}
                aria-controls={`carousel-panel-${prevIndex}`}
                className="dot"
                onClick={() => goTo(prevIndex)}
              >
                <span className="sr-only">Go to previous slide</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected
                aria-controls={`carousel-panel-${currentIndex}`}
                className="dot active"
                onClick={() => goTo(currentIndex)}
              >
                <span className="sr-only">Go to slide {currentIndex + 1}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={false}
                aria-controls={`carousel-panel-${nextIndex}`}
                className="dot"
                onClick={() => goTo(nextIndex)}
              >
                <span className="sr-only">Go to next slide</span>
              </button>
            </>
          ) : (
            slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === currentIndex}
                aria-controls={`carousel-panel-${i}`}
                className={`dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => goTo(i)}
              >
                <span className="sr-only">Go to slide {i + 1}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Hcarousel;
