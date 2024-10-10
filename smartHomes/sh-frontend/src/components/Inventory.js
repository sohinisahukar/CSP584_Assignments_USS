import React, { useEffect, useState, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext for user token
import './Inventory.css';

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [onSaleData, setOnSaleData] = useState([]);
  const [rebatesData, setRebatesData] = useState([]);
  const { user } = useContext(AuthContext); // Get user from AuthContext

  useEffect(() => {
    const fetchInventoryData = async () => {
      if (!user || !user.token) {
        console.error('User is not authenticated');
        return;
      }

      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Attach the token to the request
        };

        const [inventoryRes, onSaleRes, rebatesRes] = await Promise.all([
          fetch('http://localhost:5000/api/products/inventory', { headers }),
          fetch('http://localhost:5000/api/products/onSale', { headers }),
          fetch('http://localhost:5000/api/products/manufacturerRebates', { headers })
        ]);

        if (inventoryRes.ok) {
          const inventoryData = await inventoryRes.json();
          setInventoryData(inventoryData);
        } else {
          console.error('Failed to fetch inventory data:', inventoryRes.statusText);
        }

        if (onSaleRes.ok) {
          const onSaleData = await onSaleRes.json();
          setOnSaleData(onSaleData);
        } else {
          console.error('Failed to fetch on-sale products:', onSaleRes.statusText);
        }

        if (rebatesRes.ok) {
          const rebatesData = await rebatesRes.json();
          setRebatesData(rebatesData);
        } else {
          console.error('Failed to fetch manufacturer rebates:', rebatesRes.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInventoryData();
  }, [user]);

  return (
    <div className="inventory-container">
      <h2 className="inventory-title">Inventory</h2>

      <h3 className="section-heading">All Products</h3>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Available Stock</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((product) => (
            <tr key={product.product_id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Stock Overview</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={inventoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h3 className="section-heading">Products on Sale</h3>
      <table className="sale-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {onSaleData.map((product) => (
            <tr key={product.product_id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.retailer_discount}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="section-heading">Products with Manufacturer Rebates</h3>
      <table className="rebates-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Manufacturer Rebate</th>
          </tr>
        </thead>
        <tbody>
          {rebatesData.map((product) => (
            <tr key={product.product_id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>${product.manufacturer_rebate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
