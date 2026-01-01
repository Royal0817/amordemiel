import React from 'react';
import '../styles/AboutMe.css';

const AboutMe = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-card">
          <p className="about-eyebrow">About the Studio</p>
          <h1>Amor De Miel</h1>
          <p className="about-intro">
            A kitchen-born story of resilience, family, and sweetness.
          </p>
          <div className="about-body">
            <p>
              Amor De Miel was created from an idea rooted in hope, moving forward,
              and love. It was inspired by my nieces and nephew, who remind me every
              day of joy, resilience, and new beginnings.
            </p>
            <p>
              In my family, the kitchen has always been where we come together, share
              stories, and create memories. That deep connection to family and
              togetherness shaped my passion for the kitchen and the heart of this
              brand.
            </p>
            <p>
              Each creation is made with intention, care, and warmth, reflecting the
              comfort of home. Amor De Miel represents perseverance, family, and the
              sweetness found in meaningful moments. Everything is crafted with love.
            </p>
          </div>
          <div className="about-signature">
            <span>Perseverance</span>
            <span>Family</span>
            <span>Sweetness</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
