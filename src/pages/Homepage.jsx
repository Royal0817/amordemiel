import Nav from '../components/Nav'
import React, { useState, useEffect } from 'react';
import '../styles/Homepage.css'
import imgDesktop from '../images/logo.png'
import imgMobile from '../images/white-logo.png'
// import Carousel from ''

const Homepage = () => {
  const [logoSrc, setLogoSrc] = useState(imgDesktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        setLogoSrc(imgDesktop);
      } else {
        setLogoSrc(imgMobile);
      }
    };

    // Initial setup
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id='homepage'>
          <div>
            <header className="header">
              <Nav />
              {/* <div className='logo'>
                <img src={logoSrc} alt="logo" />
              </div> */}
            </header>

            <section className="hero">
              <div className="heroContent">
                <div className='logo'>
               <img src={logoSrc} alt="logo" />
                <p className='bakery'>Bakery</p>
                <button className="button">Get Started</button>
              </div>
              </div>
            </section>

            <section className="content">
              <h2>Our Features</h2>

              <div className="cardsContainer">
                  <div className="card">
                    <img src="https://via.placeholder.com/300x200" alt="Feature 1" className="cardImage" />
                    <h3>Feature 1</h3>
                    <p>Short description of feature 1.</p>
                  </div>
                  <div className="card">
                    <img src="https://via.placeholder.com/300x200" alt="Feature 2" className="cardImage" />
                    <h3>Feature 2</h3>
                    <p>Short description of feature 2.</p>
                  </div>
                  <div className="card">
                    <img src="https://via.placeholder.com/300x200" alt="Feature 3" className="cardImage" />
                    <h3>Feature 3</h3>
                    <p>Short description of feature 3.</p>
                  </div>
              </div>
            </section>

            <footer className="footer">
              <p>&copy; 2025 Amor de Miel. All rights reserved. </p>
            </footer>
        </div>

      </div>
  )
}; export default Homepage;
