import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './ProductDetails.css';
import Accessories from './Accessories';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { user } = useContext(AuthContext); // Get the logged-in user
  const navigate = useNavigate(); // For redirection

  const { addItemToCart } = useContext(CartContext);

  const [isEditing, setIsEditing] = useState(false);

  const [quantity, setQuantity] = useState(1);

  // New state for checking if the user has purchased the product
  const [hasPurchased, setHasPurchased] = useState(false);

  // Fetch product details when component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/productId/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Fetch whether the user has purchased the product
  useEffect(() => {
    const checkIfUserPurchased = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/hasPurchased/${user.userId}/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        setHasPurchased(data.purchased); // Set if the user has purchased the product
      } catch (err) {
        console.error('Error checking purchase status:', err);
      }
    };
    if (user) {
      checkIfUserPurchased();
    }
  }, [user, id]);

  // Handle Update Product
  const handleUpdate = async () => {
    try {
      const updatedProduct = {
        ...product,
        price: Number(product.price),
        retailer_discount: Number(product.retailer_discount),
        manufacturer_rebate: Number(product.manufacturer_rebate)
      };
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`  // Assuming you're using JWT for authentication
        },
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      alert('Product updated successfully');
      setIsEditing(false); // Exit edit mode
      navigate(`/products/productId/${id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle Delete Product
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`  // Assuming you're using JWT for authentication
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        alert('Product deleted successfully');
        navigate('/'); // Redirect to home or product listing page after deletion
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleAddToCart = () => {
    addItemToCart(product, quantity);
    setSuccessMessage(`Added ${quantity} of ${product.name} to the cart`);
    setTimeout(() => setSuccessMessage(null), 3000);  // Clear message after 3 seconds
  };

  const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));

  const formatPrice = (price) => {
    const numPrice = Number(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error loading product details: {error}</p>;

  if (!product) {
    return null; // Don't render anything if the product doesn't exist
  }

  return (
    <div>
      <div className="product-details">
        <h2>
          {isEditing ? (
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          ) : (
            product.name
          )}
        </h2>
        <p>
          {isEditing ? (
            <textarea
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
          ) : (
            product.description
          )}
        </p>
        <p>
          Price: {isEditing ? (
            <input
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />
          ) : (
            `$${formatPrice(product.price)}`
          )}
        </p>
        <p>Category: {product.category}</p>
        {/* <p>Retailer Discount: ${product.retailer_discount.toFixed(2)}</p> */}
        <p>Retailer Discount: 
        {isEditing ? (
            <input
              type="number"
              value={product.retailer_discount}
              onChange={(e) => setProduct({ ...product, retailer_discount: e.target.value })}
            />
          ) : (
            `$${formatPrice(product.retailer_discount)}`
          )}
        </p>
        {/* <p>Manufacturer Rebate: ${product.manufacturer_rebate.toFixed(2)}</p> */}
        <p>Manufacturer Rebate: 
        {isEditing ? (
            <input
              type="number"
              value={product.manufacturer_rebate}
              onChange={(e) => setProduct({ ...product, manufacturer_rebate: e.target.value })}
            />
          ) : (
            `$${formatPrice(product.manufacturer_rebate)}`
          )}
        </p>
        <img src={product.image_path} alt={product.name} className="product-image" />

        {successMessage && <p className="success-message">{successMessage}</p>}  {/* Display success message */}

        {/* Select quantity */}
        {user && user.userRole === 'Customer' && (
          <div>
          <label>Quantity:</label>
          <button onClick={decreaseQuantity}>-</button>
          <input type="number" value={quantity} readOnly />
          <button onClick={increaseQuantity}>+</button>
          <button onClick={handleAddToCart} className="add-to-cart" disabled={quantity < 1}>Add to Cart</button>
        </div>
        )}

        {/* Display the review button if the user has purchased the product */}
        {hasPurchased && (
          <button onClick={() => navigate(`/products/${id}/review`)} className="add-to-cart">
            Write a Review
          </button>
        )}

        {user && user.userRole === 'StoreManager' && (
          <div>
            {isEditing ? (
              <button onClick={handleUpdate} className="save-button">Save</button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
            )}
            <button onClick={handleDelete} className="delete-button">Delete</button>
          </div>
        )}
      </div>
      <div>
        <Accessories category={product.category} />
      </div>
    </div>
  );

};

export default ProductDetails;
