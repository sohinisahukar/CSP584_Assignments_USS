import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchAutoComplete.css'; // Ensure you have the required styles

const SearchAutoComplete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Debounce the API call to avoid making too many requests
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchSuggestions(searchTerm);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/search?q=${query}`);
      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } else {
        console.error('Received non-JSON response:', contentType);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (productId) => {
    navigate(`/products/productId/${productId}`);
    setShowSuggestions(false);
  };

  return (
    <div className="search-auto-complete">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search for products..."
        className="search-input"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((product, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(product.product_id)}
              className="suggestion-item"
            >
              <div className="suggestion-content">
                <img src={product.image_path} alt={product.name} className="suggestion-image" />
                <div className="suggestion-details">
                  <span className="suggestion-name">{product.name}</span>
                  <span className="suggestion-price">${product.price}</span>
                  <span className="suggestion-manufacturer">Manufacturer: {product.manufacturer_name}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchAutoComplete;
