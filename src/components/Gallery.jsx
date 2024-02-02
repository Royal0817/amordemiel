import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Gallery.css'
// ------------modal needs to disapear for mobile----------
import img1 from '../images/gallery/img1.jpeg'
import img2 from '../images/gallery/img2.jpeg'
import img3 from '../images/gallery/img3.png'
import img4 from '../images/gallery/img4.jpeg'
import img5 from '../images/gallery/img5.jpeg'
import img6 from '../images/gallery/img6.jpeg'
import img7 from '../images/gallery/img7.jpeg'
import img8 from '../images/gallery/img8.jpeg'
import img9 from '../images/gallery/img9.jpeg'
import img10 from '../images/gallery/img10.jpeg'
import img11 from '../images/gallery/img11.jpeg'
import img12 from '../images/gallery/img12.jpeg'
import img13 from '../images/gallery/img13.jpeg'
import img14 from '../images/gallery/img14.jpeg'
import img15 from '../images/gallery/img15.jpeg'
import img16 from '../images/gallery/img16.jpeg'
import img17 from '../images/gallery/img17.jpeg'
import img18 from '../images/gallery/img18.jpeg'
import img19 from '../images/gallery/img19.jpeg'
import img20 from '../images/gallery/img20.jpeg'
import img21 from '../images/gallery/img21.jpeg'
import img22 from '../images/gallery/img22.jpeg'
import img23 from '../images/gallery/img23.jpeg'
import img24 from '../images/gallery/img24.jpeg'
import img25 from '../images/gallery/img25.jpeg'
import img26 from '../images/gallery/img26.jpeg'
import img27 from '../images/gallery/img27.jpeg'
import img28 from '../images/gallery/img28.jpeg'
import img29 from '../images/gallery/img29.jpeg'
import img30 from '../images/gallery/img30.jpeg'


const images = [
  img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,
  img11,img12,img13,img14,img15,img16,img17,img18,img19,img20,
  img21,img22,img23,img24,img25,img26,img27,img28,img29,img30
]

const media = [
  img1,img2,img3
]

const Gallery = () => {
  const [enlargedImage, setEnlargedImage] = useState(null);

  const openLightbox = (image) => {
    setEnlargedImage(image);
  };

  const closeLightbox = () => {
    setEnlargedImage(null);
  };

  return (
    <div id='gallery'>
      <div className="gallery-nav-container">
        <div className='gallery-nav-item'>
           <Link to="/">Homepage</Link>
        </div>
        <div className='gallery-nav-item'>
            <Link to="/menu">Menu</Link>
        </div>
      </div>

      {/* Overlay for the lightbox */}
      {enlargedImage && (
        <div className="overlay" onClick={closeLightbox}>
          {/* Enlarged image container */}
          <div className="enlarged-image-container" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <span className="close-button" onClick={closeLightbox}>&times;</span>
            {/* Enlarged image */}
            <img src={enlargedImage} alt="Enlarged" className="enlarged-image" />
          </div>
        </div>
      )}

        {/* Grid of images */}
      <div className="grid-container">
        {images.map((image, index) => (
          <div className="grid-item" key={index} onClick={() => openLightbox(image)}>
            <img src={image} alt={`cake display ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default Gallery;
