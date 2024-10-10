import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import './Sidebar.css';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {

  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <li>
          <Link to="/deals">Deals</Link>
        </li>
        <li>
          <Link to="/trending">Trending</Link>
        </li>
        <li>
          <Link to="/accessories">Accessories</Link>
        </li>
        {user && user.userRole === 'StoreManager' && (
          <>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
          <li>
          <Link to="/sales-report">Sales Report</Link>
          </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
