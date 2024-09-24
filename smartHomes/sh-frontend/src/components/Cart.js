import './Cart.css'
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeItemFromCart, addItemToCart, calculateTotal } = useContext(CartContext);

  const navigate = useNavigate()

  // Handle checkout button click
  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to checkout page
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map(item => (
          <div key={item.product_id} className="cart-item">
            <p>{item.name}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Retailer Discount: ${item.retailer_discount ? item.retailer_discount.toFixed(2) : 0}</p>
            <p>Manufacturer Rebate: ${item.manufacturer_rebate ? item.manufacturer_rebate.toFixed(2) : 0}</p>

            {/* Quantity controls */}
            <div className="quantity-controls">
              <button onClick={() => removeItemFromCart(item.product_id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addItemToCart(item, 1)}>+</button>
            </div>

            <button onClick={() => removeItemFromCart(item.product_id)}>Remove</button>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <>
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          {/* Checkout button */}
          <button onClick={handleCheckout} className="checkout-button">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
