import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './SalesReport.css';

const SalesReport = () => {
  const [productSales, setProductSales] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext); // Get user context for authentication
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.userRole !== 'StoreManager') {
      // If user is not logged in or not a StoreManager, redirect to login or home page
      navigate('/login');
      return;
    }

    const fetchSalesData = async () => {
      try {
        // Fetch product sales data
        const productSalesResponse = await fetch('http://localhost:5000/api/products/salesReport/products', {
          headers: {
            'Authorization': `Bearer ${user.token}` // Attach the token for authentication
          }
        });

        if (productSalesResponse.ok) {
          const productData = await productSalesResponse.json();
          setProductSales(productData);
        } else {
          throw new Error('Error fetching product sales data');
        }

        // Fetch daily sales data
        const dailySalesResponse = await fetch('http://localhost:5000/api/products/salesReport/daily', {
          headers: {
            'Authorization': `Bearer ${user.token}` // Attach the token for authentication
          }
        });

        if (dailySalesResponse.ok) {
          const dailyData = await dailySalesResponse.json();
          setDailySales(dailyData);
        } else {
          throw new Error('Error fetching daily sales data');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching sales data:', err);
        setError('Error fetching sales data. Please try again later.');
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [user, navigate]);

  if (loading) return <p>Loading sales data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="sales-report">
      <h2>Sales Report</h2>

      {/* Table for product sales */}
      <h3>Products Sold</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Items Sold</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {productSales.map((product, index) => (
            <tr key={index}>
              <td>{product.productName}</td>
              <td>${Number(product.productPrice).toFixed(2)}</td>
              <td>{product.itemsSold}</td>
              <td>${Number(product.totalSales).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bar Chart for total sales per product */}
      <h3>Total Sales per Product</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={productSales}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalSales" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Table for daily sales */}
      <h3>Daily Sales Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {dailySales.map((sale, index) => (
            <tr key={index}>
              <td>{sale.saleDate}</td>
              <td>${Number(sale.totalSales).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
