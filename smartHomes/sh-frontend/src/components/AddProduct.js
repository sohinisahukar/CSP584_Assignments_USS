import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_path: '',
    retailer_discount: '',
    manufacturer_rebate: '',
    manufacturer_name: '',
    stock: ''
  });

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  // List of predefined categories
  const categories = [
    'Lightbulbs',
    'Doorlocks',
    'Thermostats',
    'Doorbells',
    'Speakers'
  ];

  if (!user || user.userRole !== 'StoreManager') {
    return <p>Access denied. Only Store Managers can add products.</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Product added successfully');
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          image_path: '',
          retailer_discount: '',
          manufacturer_rebate: '',
          manufacturer_name: '',
          stock: ''
        });
        navigate('/');
      } else {
        const errorData = await res.json();
        console.error('Error:', errorData.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        /><br />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={formData.price}
          onChange={handleChange}
          required
        /><br />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select><br />

        <input
          type="text"
          name="image_path"
          placeholder="Image Path"
          value={formData.image_path}
          onChange={handleChange}
          required
        /><br />

<input
          type="number"
          name="retailer_discount"
          placeholder="Retailer Discount"
          value={formData.retailer_discount}
          onChange={handleChange}
        /><br />

        <input
          type="number"
          name="manufacturer_rebate"
          placeholder="Manufacturer Rebate"
          value={formData.manufacturer_rebate}
          onChange={handleChange}
        /><br />

        <input
          type="text"
          name="manufacturer_name"
          placeholder="Manufacturer Name"
          value={formData.manufacturer_name}
          onChange={handleChange}
          required
        /><br />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
