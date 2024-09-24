// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
        const existingItem = prevItems.find(item => item.product_id === product.product_id);
  
        if (existingItem) {
          // If the product already exists in the cart, update the quantity
          return prevItems.map(item =>
            item.product_id === product.product_id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // If the product is not in the cart, add it as a new item
          return [...prevItems, { ...product, quantity }];
        }
      });
  };

  const removeItemFromCart = (productId) => {
    setCartItems((prevItems) => {
        const existingItem = prevItems.find(item => item.product_id === productId);
  
        if (existingItem && existingItem.quantity > 1) {
          // If the item exists and its quantity is greater than 1, decrease quantity
          return prevItems.map(item =>
            item.product_id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          // If the item has a quantity of 1, remove it from the cart
          return prevItems.filter(item => item.product_id !== productId);
        }
      });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total items in cart
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const discountPrice = item.price - (item.retailer_discount || 0) - (item.manufacturer_rebate || 0);
      return total + (discountPrice * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart, cartItemCount, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};
