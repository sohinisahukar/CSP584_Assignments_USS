import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchAutoComplete.css'; // Add a CSS file for styling

const SearchAutoComplete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

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
    // Navigate to the product's view page using its product ID
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
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchAutoComplete;
