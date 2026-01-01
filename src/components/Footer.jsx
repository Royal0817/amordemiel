import React from 'react';
import '../styles/Footer.css';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm10.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M15.5 3a6.2 6.2 0 0 0 3.7 2.1v3.1a9.3 9.3 0 0 1-3.7-1.3v6.4a5.9 5.9 0 1 1-5.9-5.9c.3 0 .7 0 1 .1v3.2a2.7 2.7 0 1 0 2.1 2.6V3h2.8z" />
  </svg>
);

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-socials">
      <a
        href="https://www.instagram.com/_amordemiel/?hl=en"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Amor de Miel on Instagram"
      >
        <InstagramIcon />
      </a>
      <a
        href="https://www.tiktok.com/@amordemiel?_r=1&_t=ZT-92iEQAz1OS7"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Amor de Miel on TikTok"
      >
        <TikTokIcon />
      </a>
    </div>
    <p>&copy; 2026 Amor de Miel. All rights reserved.</p>
  </footer>
);

export default Footer;
