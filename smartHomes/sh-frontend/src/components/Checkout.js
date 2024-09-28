import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart, calculateRawTotal, calculateShippingCost, calculateTotalWithShipping } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    addressId: '', // To link existing or new address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    name: '', // Optional: Name of the address, like 'Home' or 'Office'
    creditCard: '',
    deliveryOption: 'home-delivery',
    storeId: ''
  });

  const [stores, setStores] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [useExistingAddress, setUseExistingAddress] = useState(false); // For toggling between new and existing addresses

  // Fetch stores and saved addresses for the user
  useEffect(() => {
      const fetchStoresAndAddresses = async () => {
        try {
          const [storeRes, addressRes] = await Promise.all([
            fetch('http://localhost:5000/stores'), // Fetch stores
            fetch(`http://localhost:5000/api/addresses/${user.userId}`) // Fetch user's saved addresses
          ]);
    
          if (addressRes.ok) {
            const storesData = await storeRes.json();
            const addressesData = await addressRes.json();
            setStores(storesData);
            setAddresses(addressesData);
          } else {
            console.error('Failed to fetch addresses');
          }
        } catch (err) {
          console.error('Error fetching stores or addresses:', err);
        }
    };
    fetchStoresAndAddresses();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExistingAddressChange = (e) => {
    const selectedAddressId = e.target.value;
    setUseExistingAddress(true);
    setFormData({
      ...formData,
      addressId: selectedAddressId,
      street: '',
      city: '',
      state: '',
      zipCode: ''
    });
  };

  const handleNewAddressChange = (e) => {
    setUseExistingAddress(false);
    setFormData({
      ...formData,
      addressId: '',
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let addressId = formData.addressId;

    if (!useExistingAddress && formData.street) {
      // Insert new address and get the addressId
      const addressRes = await fetch('http://localhost:5000/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.userId,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          name: user.username
        })
      });
      const addressData = await addressRes.json();
      addressId = addressData.addressId;
    }

    let totalSales = 0;
    let shippingCost = 0;
    if(formData.deliveryOption === 'home-delivery') {
      shippingCost = Number(0.00);
      totalSales = Number(calculateRawTotal().toFixed(2));
    } else {
      shippingCost = Number(calculateShippingCost().toFixed(2));
      totalSales = Number(calculateTotalWithShipping().toFixed(2));
    }

    const orderData = {
      userId: Number(user.userId),
      addressId, // Reference to customer address
      creditCard: formData.creditCard,
      totalSales: totalSales,
      shippingCost: shippingCost,
      deliveryOption: formData.deliveryOption,
      storeId: formData.deliveryOption === 'pickup' ? formData.storeId : null,
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

        {/* {formData.deliveryOption === 'home-delivery' && ( */}
          <>
            <div>
              <label>Choose Existing Address</label>
              <select name="addressId" onChange={handleExistingAddressChange}>
                <option value="">--Select Address--</option>
                {addresses.map((address) => (
                  <option key={address.addressId} value={address.addressId}>
                    {address.street}, {address.city}, {address.state}, {address.zipCode}
                  </option>
                ))}
              </select>
            </div>
            {!useExistingAddress && (
              <>
                <div>
                  <label>Enter New Address</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleNewAddressChange}
                    placeholder="Street"
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleNewAddressChange}
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleNewAddressChange}
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleNewAddressChange}
                    placeholder="ZIP Code"
                  />
                </div>
              </>
            )}
          </>
        {/* )}  */}
        
        {formData.deliveryOption === 'pickup' && (
          <div>
            <p>The cost of shipping per item is $0.99.</p>
            <p>Your total shipping cost is {Number(calculateShippingCost().toFixed(2))}</p>
            <label>Select Store</label>
            <select name="storeId" onChange={handleChange}>
              <option value="">--Select Store--</option>
              {stores.map((store) => (
                <option key={store.storeId} value={store.storeId}>
                  {store.street}, {store.city}, {store.state}, {store.zipCode}
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
