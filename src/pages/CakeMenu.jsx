import React from 'react';
import '../styles/CakeMenu.css';
import Carousel from '../components/carousel';
import test from '../images/menu-background.png';
import test2 from '../images/test2.png';
import test3 from '../images/test3.png';
import test4 from '../images/test4.png';

const media = [test, test2, test3, test4];

const menuSections = [
  {
    title: 'Signature Cakes',
    description: 'Three-layer showpieces finished with buttercream textures, sugar florals, and metallic accents.',
    items: [
      'Tres Leches',
      'Cafe & Tres Leches',
      'Chocolate',
      'Vanilla Bean',
      'Strawberry Cream',
      'Carrot Spice',
      'Red Velvet',
      'Coconut Dream',
      'Honey Citrus',
    ],
  },
  {
    title: 'Fillings & Mousses',
    description: 'Layer flavors to match your palette. Mix + match for tastings or tiered cakes.',
    items: [
      'Strawberry Mousse',
      'Chocolate Ganache',
      'Vanilla Bean Crème',
      'Cream Cheese',
      'Lemon Curd',
      'Roasted Coconut & Vanilla',
      'Berries & Chantilly',
      'Salted Dulce de Leche',
    ],
  },
  {
    title: 'Cupcakes & Minis',
    description: 'Perfect for showers, dessert tables, or favors. Minimum order of two dozen.',
    items: [
      'Strawberry',
      'Red Velvet',
      'Chocolate Fudge',
      'Vanilla Confetti',
      'Meyer Lemon',
      'Oreo Crunch',
      'Tres Leches',
      'Cafe Mocha',
    ],
  },
  {
    title: 'Cookies & Treats',
    description: 'Hand-piped royal icing or soft-centered classics available individually wrapped.',
    items: [
      'Chocolate Chip with Sea Salt',
      'Snickerdoodle',
      'Oatmeal Raisin',
      'Sugar Cookie Florals',
      'Painted Shortbread Tiles',
    ],
  },
];

const CakeMenu = () => {
  return (
    <div id='cake-menu'>
      <section className='menu-hero'>
        <div className='menu-hero-media'>
          <Carousel images={media} />
          <span className='menu-hero-label'>Seasonal wedding tastings available</span>
        </div>
        <div className='menu-hero-copy'>
          <p className='eyebrow'>Offerings</p>
          <h1>Couture cake tables for every celebration.</h1>
          <p>
            Layer flavors, textures, and colors to mirror your event story. We handcraft every petal and brushstroke,
            sourcing organic dairy, fruit curds, and single-origin chocolates.
          </p>
          <ul>
            <li>Complimentary tasting for wedding cakes over 100 servings</li>
            <li>Custom palettes inspired by florals, stationery, or attire</li>
            <li>Delivery across San Antonio & Hill Country</li>
          </ul>
        </div>
      </section>

      <section className='menu-grid'>
        {menuSections.map((section) => (
          <article key={section.title} className='menu-card'>
            <div className='menu-card-header'>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}

export default CakeMenu;
