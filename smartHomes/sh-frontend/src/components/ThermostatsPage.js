import React, { useEffect, useState} from 'react';
import './ProductsPage.css'
import ProductGrid from './ProductGrid';


const ThermostatsPage = () => {

  const [thermostats, setThermostats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products for the "Smart Lightbulbs" category
  useEffect(() => {
    const fetchThermostats = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/category/Thermostats');
        if (!response.ok) {
          throw new Error('Failed to fetch Thermostats');
        }
        const data = await response.json();
        setThermostats(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchThermostats();
  }, []); // Run once when the component mounts

  if (loading) {
    return <p>Loading Thermostats...</p>;
  }

  if (error) {
    return <p>Error loading Thermostats: {error}</p>;
  }

  return (
    <div>
      <div className="products-layout">
        <div className="products-page">
          <h1>Smart Thermostats</h1>
          <ProductGrid products={thermostats} />
        </div>
      </div>
    </div>
  );
};

export default ThermostatsPage;
