import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import ProductsPage from './components/ProductsPage';
import ProductDetails from './components/ProductDetails';
import ProductGrid from './components/ProductGrid';
import Accessories from './components/Accessories';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrdersPage from './components/OrdersPage';
// import ProtectedRoute from './components/ProtectedRoute';


function App() {

  // const [category, setCategory] = useState(null);

  return (
    <AuthProvider>
      <CartProvider>
    <Router>
      <Header />  {/* Always render the header */}
      <div className="app-layout">
        <Sidebar />  {/* Always render the sidebar */}
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/category/:category" element={<ProductGrid />} />
            <Route path="/products/productId/:id" element={<ProductDetails />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/products/accessories/category/:category" element={<Accessories />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={ <OrdersPage />} />
          </Routes>
        </div>
      </div>
      <Footer />  {/* Always render the footer */}
    </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
