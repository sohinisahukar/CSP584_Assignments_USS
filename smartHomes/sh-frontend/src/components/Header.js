import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css'; // Add custom styles here
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import SearchAutoComplete from './SearchAutoComplete';

const Header = () => {

  const navigate = useNavigate();

  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const { cartItemCount } = useContext(CartContext);

  const [hasOrders, setHasOrders] = useState(false);

  useEffect(() => {
    // Fetch orders for the logged-in user
    const fetchOrders = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch(`http://localhost:5000/api/orders/userOrders`, {
            headers: {
              'Authorization': `Bearer ${user.token}` // Use JWT if applicable
            }
          });

          const data = await response.json();
          if (data.length > 0) {
            setHasOrders(true); // Set to true if orders exist
          } else {
            setHasOrders(false); // Set to false if no orders
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, [isLoggedIn, user]);

  const handleLogout = () => {
    logout();  // Clear session and update AuthContext
    navigate('/');  // Redirect to home page after logout
  };

  // console.log(cartItemCount);

  return (
    <header className="header">
      <div className="header-left">
        <nav>
          <ul className="nav-links">
            <li><Link to="/" className="logo">Home</Link></li>
            <li><Link to="/products/category/Lightbulbs">Smart Lightbulbs</Link></li>
            <li><Link to="/products/category/Doorlocks">Smart Doorlocks</Link></li>
            <li><Link to="/products/category/Thermostats">Smart Thermoststs</Link></li>
            <li><Link to="/products/category/Doorbells">Smart Doorbells</Link></li>
            <li><Link to="/products/category/Speakers">Smart Speakers</Link></li>
            {user && user.userRole === 'StoreManager' && (
            <>
              <li><Link to="/products/add">Add Product</Link></li>
              {/* <li><Link to="/products/update">Update Product</Link></li>
              <li><Link to="/products/manage">Delete Product</Link></li> */}
            </>
          )}
          </ul>
        </nav>
      </div>

      <div className="header-center">
        <SearchAutoComplete />
      </div>
      
      <div className="header-right">
        {isLoggedIn ? (
          <>
            <span>Welcome, {user.username}!</span>
            <Link to="/cart" className="cart-button">
              <FontAwesomeIcon icon={faCartShopping} size="lg" color="#007bff" />
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </Link>
            {/* View Orders Button (only if user has orders) */}
            {hasOrders && (
              <button onClick={() => navigate('/orders')} className="header-button">View Orders</button>
            )}
            <button onClick={handleLogout} className="header-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-button">Log In</Link>
            <Link to="/signup" className="header-button">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
