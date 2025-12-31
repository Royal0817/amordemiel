import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Homepage.css';
import Hcarousel from '../components/HCarousel';
import { useGallery } from '../context/GalleryContext.jsx';
import gallerySeed from '../data/gallerySeed';

const Homepage = () => {
  const { galleryItems } = useGallery();
  const heroImages = useMemo(() => {
    const valid = (galleryItems || []).filter((item) => item && item.src);
    const source = valid.length ? valid : gallerySeed;
    return source.map((item) => ({ src: item.src, alt: item.alt }));
  }, [galleryItems]);

  return (
    <div id='homepage'>
      <section className="hero-grid">
        <div className="hero-copy">
          <p className='eyebrow'>Boutique Cake Studio</p>
          <h1>Celebrate every chapter with handcrafted sweetness.</h1>
          <p className='lede'>From intimate gatherings to grand weddings, Amor de Miel layers flavor, artistry, and a touch of magic into every bite.</p>

          <div className='cta-group'>
            <Link className='cta-primary' to='/contact'>
              Start Inquiry
            </Link>
            <Link className='cta-secondary' to='/gallery'>View Gallery</Link>
          </div>
        </div>

        <div className='hero-media'>
          <div className='carousel-shell'>
            <Hcarousel interval={4000} images={heroImages} />
          </div>
          <div className='floating-card'>
            <p className='floating-title'>Signature pairings</p>
            <ul>
              <li>Honey tres leches &amp; berries</li>
              <li>Lavender vanilla bean</li>
              <li>Dark cacao &amp; espresso</li>
            </ul>
          </div>
        </div>
      </section>

      <section className='features'>
        <p className='section-eyebrow'>What we create</p>
        <h2 className='section-title'>Fluid designs made for your moment</h2>

        <div className='feature-grid'>
          <article className='feature-card'>
            <h3>Custom cakes</h3>
            <p>Layered works of art with sculpted buttercream, sugar florals, and flavor profiles tailored to your story.</p>
          </article>
          <article className='feature-card'>
            <h3>Dessert tables</h3>
            <p>Curated spreads featuring mini cakes, macarons, and seasonal bites that keep guests mesmerized.</p>
          </article>
          <article className='feature-card'>
            <h3>Celebration boxes</h3>
            <p>Limited-run pastry boxes for gifting or indulging—featuring rotating flavors, edible blooms, and keepsake menus.</p>
          </article>
        </div>
      </section>

      <section className='ribbon'>
        <div className='ribbon-card'>
          <p>Ready to dream up your centerpiece?</p>
          <Link className='cta-primary light' to='/contact'>
            Book a tasting
          </Link>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Amor de Miel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
