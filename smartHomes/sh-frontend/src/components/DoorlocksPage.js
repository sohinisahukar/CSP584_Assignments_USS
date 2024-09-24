import React, { useEffect, useState} from 'react';
import './ProductsPage.css'
import ProductGrid from './ProductGrid';


const DoorlocksPage = () => {

  const [doorlocks, setDoorlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products for the "Smart Lightbulbs" category
  useEffect(() => {
    const fetchDoorlocks = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/category/Doorlocks');
        if (!response.ok) {
          throw new Error('Failed to fetch Doorlocks');
        }
        const data = await response.json();
        setDoorlocks(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDoorlocks();
  }, []); // Run once when the component mounts

  if (loading) {
    return <p>Loading Doorlocks...</p>;
  }

  if (error) {
    return <p>Error loading Doorlocks: {error}</p>;
  }

  return (
    <div>
      <div className="products-layout">
        <div className="products-page">
          <h1>Smart Doorlocks</h1>
          <ProductGrid products={doorlocks} />
        </div>
      </div>
    </div>
  );
};

export default DoorlocksPage;
