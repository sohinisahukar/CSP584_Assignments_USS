import React, { useEffect, useState} from 'react';
import './ProductsPage.css'
import ProductGrid from './ProductGrid';
// import ProductDetails from './ProductDetails';

// const lightbulbs = [
//   { id: 1, name: 'Philips Hue', price: 29.99, image: '/images/light1.jpg' },
//   { id: 2, name: 'GE Lighting', price: 19.99, image: '/images/light2.jpg' },
//   { id: 3, name: 'LIFX', price: 24.99, image: '/images/light3.jpg' }
// ];



const LightbulbsPage = () => {

  const [lightbulbs, setLightbulbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products for the "Smart Lightbulbs" category
  useEffect(() => {
    const fetchLightbulbs = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/category/Lightbulbs');
        if (!response.ok) {
          throw new Error('Failed to fetch Lightbulbs');
        }
        const data = await response.json();
        setLightbulbs(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLightbulbs();
  }, []); // Run once when the component mounts

  //  // Function to handle viewing a product
  //  const handleViewProduct = async (productId) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/products/productId/${productId}`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch product details');
  //     }
  //     const data = await response.json();
  //     setSelectedProduct(data); // Set the selected product to display its details
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  if (loading) {
    return <p>Loading Lightbulbs...</p>;
  }

  if (error) {
    return <p>Error loading Lightbulbs: {error}</p>;
  }

  return (
    <div>
      <div className="products-layout">
        <div className="products-page">
          <h1>Smart Lightbulbs</h1>
          <ProductGrid products={lightbulbs} />
        </div>
      </div>
    </div>
  );
};

export default LightbulbsPage;
