import React, { useEffect, useState} from 'react';
import './ProductsPage.css'
import ProductGrid from './ProductGrid';


const SpeakersPage = () => {

  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products for the "Smart Lightbulbs" category
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/category/Speakers');
        if (!response.ok) {
          throw new Error('Failed to fetch Speakers');
        }
        const data = await response.json();
        setSpeakers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []); // Run once when the component mounts

  if (loading) {
    return <p>Loading Speakers...</p>;
  }

  if (error) {
    return <p>Error loading Speakers: {error}</p>;
  }

  return (
    <div>
      <div className="products-layout">
        <div className="products-page">
          <h1>Smart Speakers</h1>
          <ProductGrid products={speakers} />
        </div>
      </div>
    </div>
  );
};

export default SpeakersPage;
