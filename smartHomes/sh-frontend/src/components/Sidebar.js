import { Link } from 'react-router-dom';
import './Sidebar.css'; // Create custom CSS for sidebar

const Sidebar = () => {
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
      </ul>
    </div>
  );
};

export default Sidebar;
