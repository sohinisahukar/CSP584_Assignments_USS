import React, { useEffect, useState} from 'react';
import './ProductsPage.css'
import ProductGrid from './ProductGrid';


const DoorbellsPage = () => {

  const [doorbells, setDoorbells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products for the "Smart Lightbulbs" category
  useEffect(() => {
    const fetchDoorbells = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/category/Doorbells');
        if (!response.ok) {
          throw new Error('Failed to fetch Doorbells');
        }
        const data = await response.json();
        setDoorbells(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDoorbells();
  }, []); // Run once when the component mounts

  if (loading) {
    return <p>Loading Doorbells...</p>;
  }

  if (error) {
    return <p>Error loading Doorbells: {error}</p>;
  }

  return (
    <div>
      <div className="products-layout">
        <div className="products-page">
          <h1>Smart Doorbells</h1>
          <ProductGrid products={doorbells} />
        </div>
      </div>
    </div>
  );
};

export default DoorbellsPage;
