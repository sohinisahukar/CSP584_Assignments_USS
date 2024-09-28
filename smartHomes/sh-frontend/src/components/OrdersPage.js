import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './OrdersPage.css'; // You can style the page with CSS as needed

const OrdersPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/userOrders`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/cancel/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      // Update the orders list by removing the canceled order
      setOrders(orders.filter(order => order.orderId !== orderId));

      alert('Order canceled successfully');
      navigate('/orders');
    } catch (err) {
      alert('Error canceling order: ' + err.message);
    }
  };

  const canCancelOrder = (shipDate) => {
    const fiveBusinessDaysBeforeShip = new Date(shipDate);
    fiveBusinessDaysBeforeShip.setDate(fiveBusinessDaysBeforeShip.getDate() - 5);

    const today = new Date();
    return today < fiveBusinessDaysBeforeShip;
  };

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p>Error loading orders: {error}</p>;

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order">
              <h3>Order ID: {order.orderId}</h3>
              <p>Purchase Date: {new Date(order.purchaseDate).toLocaleDateString()}</p>
              <p>Ship/Delivery Date: {new Date(order.shipDate).toLocaleDateString()}</p>
              <p>Total Sales: ${order.totalSales.toFixed(2)}</p>
              <p>Shipping Cost: ${order.shippingCost.toFixed(2)}</p>
              {/* <p>Order Status: {order.status || 'Processing'}</p> */}

              <h4>Items in Order:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item.productId}>
                    {item.quantity} x {item.product.name} (${item.price.toFixed(2)})
                  </li>
                ))}
              </ul>

              {/* Display store address if storeId exists (store pickup) */}
              {order.store && (
                <div>
                  <h4>Store Pickup Address:</h4>
                  <p>
                    {order.store.street}, {order.store.city}, {order.store.state} {order.store.zipCode}
                  </p>
                </div>
              )}

              {/* Display shippingAddress (billing address) */}
              {order.shippingAddress && (
                <div>
                  <h4>Billing Address:</h4>
                  <p>
                    {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                </div>
              )}

              {/* Show Cancel Button if within 5 business days before delivery */}
              {canCancelOrder(order.shipDate) && order.status !== 'Canceled' && (
                <button 
                  onClick={() => handleCancelOrder(order.orderId)} 
                  className="cancel-button"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
