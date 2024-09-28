import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductGrid.css'

const ProductGrid = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products (all products or by category)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://localhost:5000/products';  // Default: fetch all products
        if (category) {
          url = `http://localhost:5000/products/category/${category}`;  // Fetch by category if provided
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Function to navigate to product details page
  const handleViewProduct = (productId) => {
    navigate(`/products/productId/${productId}`);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.product_id} className="product-card">
          <img src={product.image_path} alt={product.name} className="product-image" />
          <h2>{product.name}</h2>
          <p className="price">${product.price.toFixed(2)}</p>
          <button className="view-button" onClick={() => handleViewProduct(product.product_id)}>
            View
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
