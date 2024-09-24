import React, { useState, useEffect } from 'react';
import './Accessories.css'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Accessories = ({ category }) => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        let url = 'http://localhost:5000/accessories';
        if (category) {
          // If a category is provided, fetch accessories for that category
          url = `http://localhost:5000/accessories/category/${category}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch accessories');
        }

        const data = await response.json();
        setAccessories(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAccessories();
  }, [category]); // Re-fetch if category changes

  if (loading) return <p>Loading accessories...</p>;
  if (error) return <p>Error loading accessories: {error}</p>;

  return (
    <div className="accessories-carousel">
      <h2>Related Accessories</h2>
      <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} showStatus={false} showIndicators={false}>
        {accessories.map((accessory) => (
          <div key={accessory.accessory_id} className="accessory-card">
            <img src={accessory.image_path} alt={accessory.name} className="accessory-image" />
            <h3>{accessory.name}</h3>
            <p>{accessory.description}</p>
            <p>Price: ${accessory.price.toFixed(2)}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Accessories;
