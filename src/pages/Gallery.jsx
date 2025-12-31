import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo1  from '../images/logo.png';
import '../styles/Gallery.css';
import { useGallery } from '../context/GalleryContext.jsx';

const Gallery = () => {
  const { galleryItems } = useGallery();
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const openLightbox = (image) => {
    setEnlargedImage(image);
  };

  const closeLightbox = () => {
    setEnlargedImage(null);
  };

  return (
    <div id='gallery'>
      <section className='gallery-hero'>
        <div className='hero-copy'>
          <p className='eyebrow'>Portfolio</p>
          <h1>Cake installations inspired by romance, whimsy, and bold palettes.</h1>
          <p className='lede'>Hover through recent commissions across weddings, editorials, and milestone celebrations. Each tier is hand-finished with sculpted buttercream, wafer florals, and edible gold leaf.</p>

          <div className='hero-cta'>
            <Link className='cta-primary' to='/contact'>
              Plan Your Event
            </Link>
            <div className='hero-stats'>
              <div>
                <strong>150+</strong>
                <span>Bespoke cakes</span>
              </div>
              <div>
                <strong>12</strong>
                <span>Flavors curated each season</span>
              </div>
            </div>
          </div>
        </div>

        <div className='hero-logo-card'>
          <img className='menu-logo' src={logo1} alt="Amor de Miel logo" />
          <p>Buttercream atelier based in San Antonio, Texas.</p>
        </div>
      </section>

      {enlargedImage && (
        <div className="overlay" onClick={closeLightbox}>
          <div className="enlarged-image-container" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeLightbox}>&times;</span>
            <img src={enlargedImage.src} alt={enlargedImage.alt} className="enlarged-image" />
            <p className='lightbox-tag'>{enlargedImage.tag}</p>
          </div>
        </div>
      )}

      <section className="grid-container">
        {galleryItems.map((image, index) => {
          const key = image.id || index;
          const isLoaded = loadedImages[key];
          return (
          <button
            type='button'
            className={`grid-item ${image.variant}`}
            key={key}
            onClick={() => openLightbox(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className={`gallery-image ${isLoaded ? 'is-loaded' : ''}`}
              onLoad={() =>
                setLoadedImages((prev) => ({
                  ...prev,
                  [key]: true,
                }))
              }
            />
            <span className='grid-tag'>{image.tag}</span>
          </button>
        )})}
      </section>
    </div>
  );
};


export default Gallery;
