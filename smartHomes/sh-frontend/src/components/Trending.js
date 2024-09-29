import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF3333'];

const Trending = () => {
  const [topZips, setTopZips] = useState([]);
  const [topSoldProducts, setTopSoldProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);  // New state for top-rated products

  useEffect(() => {
    const fetchTopZipsAndSoldProductsAndRatedProducts = async () => {
        try {
            const [topZipsRes, topSOldProductsRes, topRatedProductsRes] = await Promise.all([
                fetch('http://localhost:5000/topProducts/zipcode'),
                fetch('http://localhost:5000/topProducts/mostSold'),
                fetch('http://localhost:5000/api/reviews/topProductsByRating') // Fetch top-rated products
            ]);

            if (topZipsRes.ok) {
                const topZipsData = await topZipsRes.json();
                setTopZips(topZipsData);
            }

            if (topSOldProductsRes.ok) {
                const topSoldProductsData = await topSOldProductsRes.json();
                setTopSoldProducts(topSoldProductsData);
            }

            if (topRatedProductsRes.ok) {
                const topRatedProductsData = await topRatedProductsRes.json();
                setTopRatedProducts(topRatedProductsData);  // Set the top-rated products data
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };
    fetchTopZipsAndSoldProductsAndRatedProducts();
  }, []);

  const pieData = topSoldProducts.map((product) => ({
    name: product.name,
    value: parseInt(product.total_sold, 10),
  }));

  // Data for Bar Chart - Top Rated Products
  const topRatedData = topRatedProducts.map((product) => ({
    name: product._id,  // Grouped by product model name from MongoDB
    value: parseFloat(product.avgRating),
  }));

  return (
    <div>
      <h2>Top Products by Zip Code</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topZips}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="zipCode" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_products_sold" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Top 5 Most Sold Products</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <PieTooltip />
        </PieChart>
      </ResponsiveContainer>

      <h2>Top 5 Rated Products</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topRatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 5]} /> {/* Rating out of 5 */}
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Trending;
