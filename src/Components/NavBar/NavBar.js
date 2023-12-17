import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import CSS file for styling
import CartCounterBadge from '../CartCounterBadge';

const NavBar = ({cartItems}) => {
  const itemCount = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0):0;
  return (
    <nav className="navbar">
      <div className="logo">
        <img src='/icons/logo.png' alt='logo img' style={{ maxWidth: '150px', maxHeight: '100px' }}></img>
        
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
<div className='main-container'>
  <CartCounterBadge itemCount={itemCount} />
      <div className="cart">
        {/* Shopping cart button */}
        <Link to="/cart" className="cart-button">
          <img style={{ width: '50px' }} src='./icons/Shopping-cart 1.png' alt=''></img>
          
        </Link>
      </div>
      </div>
    </nav>
  );
};

export default NavBar;
