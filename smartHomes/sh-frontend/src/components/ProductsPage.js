import React, { useState, useEffect } from 'react';
import './ProductsPage.css';  // Add your custom styles here
import ProductGrid from './ProductGrid'

// const products = [
//   { id: 1, name: 'Smart Lightbulb', price: 29.99, image: '/images/light1.jpg' },
//   { id: 2, name: 'Smart Door Lock', price: 199.99, image: '/images/lock1.jpg' },
//   { id: 3, name: 'Smart Thermostat', price: 129.99, image: '/images/th1.jpg' },
//   { id: 4, name: 'Smart Doorbell', price: 149.99, image: '/images/bell1.jpg' },
//   { id: 5, name: 'Smart Speaker', price: 89.99, image: '/images/sp1.jpg' },
// ];

const ProductsPage = () => {

  const [products, setProducts] = useState([]); // State to hold product data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null);     // State for error status

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    fetch('http://localhost:5000/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON from the response
      })
      .then(data => {
        setProducts(data); // Set the products data in state
        setLoading(false); // Stop the loading state
      })
      .catch(error => {
        setError(error); // Set any errors that occur
        setLoading(false); // Stop the loading state
      });
  }, []); // The empty array ensures this effect runs once when the component mounts

  if (loading) return <p>Loading products...</p>; // Show loading message while fetching
  if (error) return <p>Error loading products: {error.message}</p>; // Show error if it occurs

    return (
      <div>
  
        {/* Main content for products, include sidebar */}
        <div className="products-layout">
          
          <div className="products-page">
            <h1>Available Smart Home Products</h1>
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    );
  };

export default ProductsPage;
