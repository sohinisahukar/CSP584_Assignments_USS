import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart, calculateTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    customerAddress: '',
    creditCard: '',
    deliveryOption: 'home-delivery',
    storeId: null
  });

  const [stores, setStores] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch stores for pickup
  useEffect(() => {
    const fetchStores = async () => {
      const res = await fetch('http://localhost:5000/stores'); // Endpoint to get store locations
      const data = await res.json();
      setStores(data);
    };
    fetchStores();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      userId: Number(user.userId),
      totalSales: Number(calculateTotal().toFixed(2)),
      cartItems
    };

    const res = await fetch('http://localhost:5000/api/orders/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    const result = await res.json();
    if (res.ok) {
      setSuccessMessage(`Order placed! Your confirmation number is: ${result.orderId}. Estimated pickup/delivery: ${result.shipDate}`);
      clearCart();
      setTimeout(() => navigate('/'), 10000);
    } else {
      alert(result.error || 'Checkout failed.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Credit Card</label>
          <input
            type="text"
            name="creditCard"
            value={formData.creditCard}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Delivery Option</label>
          <select
            name="deliveryOption"
            value={formData.deliveryOption}
            onChange={handleChange}
          >
            <option value="home-delivery">Home Delivery</option>
            <option value="pickup">Store Pickup</option>
          </select>
        </div>
        {formData.deliveryOption === 'pickup' && (
          <div>
            <label>Select Store</label>
            <select name="storeId" onChange={handleChange}>
              <option value="">--Select Store--</option>
              {stores.map(store => (
                <option key={store.storeId} value={store.storeId}>
                  {store.street}, {store.city}, {store.state} {store.zipCode}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit">Place Order</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Checkout;
