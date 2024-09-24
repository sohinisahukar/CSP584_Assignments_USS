import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';  // Custom styling for your landing page

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faLightbulb, faLock, faHouseSignal, faBell, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const LandingPage = () => {

  const featured_products = [
    { id: 1, name: 'Smart Lightbulb', price: 29.99, image: '/images/light1.jpg' },
    { id: 2, name: 'Smart Door Lock', price: 199.99, image: '/images/lock1.jpg' },
    { id: 3, name: 'Smart Thermostat', price: 129.99, image: '/images/th1.jpg' },
    { id: 4, name: 'Smart Doorbell', price: 149.99, image: '/images/bell1.jpg' },
    { id: 5, name: 'Smart Speaker', price: 89.99, image: '/images/sp1.jpg' },
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Smart Homes Store</h1>
          <p>Discover the latest in smart home technology and make your home smarter today!</p>
          <Link to="/products">
            <button className="cta-button">Shop Now</button>
          </Link>
        </div>
        <div className="hero">
          <FontAwesomeIcon icon={faHouseSignal} size="9x" color="#007bff" />
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category">
            <FontAwesomeIcon icon={faLightbulb} size="3x" color="#007bff" />
            <h3>Smart Lighting</h3>
          </div>
          <div className="category">
            <FontAwesomeIcon icon={faLock} size="3x" color="#007bff" />
            <h3>Smart Security</h3>
          </div>
          <div className="category">
            <FontAwesomeIcon icon={faSnowflake} size="3x" color="#007bff" />
            <h3>Smart Thermostats</h3>
          </div>
          <div className="category">
            <FontAwesomeIcon icon={faBell} size="3x" color="#007bff" />
            <h3>Smart Doorbells</h3>
          </div>
          <div className="category">
            <FontAwesomeIcon icon={faVolumeUp} size="3x" color="#007bff" />
            <h3>Smart Speakers</h3>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <div className="featured-products">
        <h2>Featured Products</h2>
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} showStatus={false} showIndicators={false}>
          {featured_products.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button className="buy-button">Buy Now</button>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Special Offers Section */}
      <section className="special-offers">
        <h2>Special Offers</h2>
        <div className="offer">
          <p>Get 20% off on your first order! Use code: SMART20 at checkout.</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
