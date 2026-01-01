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
    const preferred = source.find((item) =>
      (item.id || '').toLowerCase().includes('img_9732') ||
      (item.src || '').toString().includes('IMG_9732')
    );
    const remaining = source.filter((item) => item !== preferred);
    const shuffled = remaining
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
    const ordered = preferred ? [preferred, ...shuffled] : shuffled;
    return ordered.map((item) => ({ src: item.src, alt: item.alt }));
  }, [galleryItems]);

  const instagramTiles = useMemo(() => {
    const valid = (galleryItems || []).filter((item) => item && item.src);
    const source = valid.length ? valid : gallerySeed;
    return source.slice(0, 6);
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

      <section className="instagram-tease">
        <div className="insta-copy">
          <p className="section-eyebrow">Follow the atelier</p>
          <h2 className="section-title">Behind the scenes at @_amordemiel</h2>
          <p>Swipe through new buttercream sculptures, seasonal flavors, and studio moments.</p>
          <a className="cta-secondary insta-link" href="https://www.instagram.com/_amordemiel/?hl=en" target="_blank" rel="noreferrer">
            Visit Instagram
          </a>
        </div>
        <div className="insta-grid">
          {instagramTiles.map((item, index) => (
            <a
              key={item.id || index}
              className={`insta-tile tile-${index % 3}`}
              href="https://www.instagram.com/_amordemiel/?hl=en"
              target="_blank"
              rel="noreferrer"
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
              <span className="insta-overlay">Tap to explore</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Amor de Miel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
