import React from 'react';
import './header.css';
import {Link} from 'react-router-dom'

function Header() {
  return (
    <div className='header-container'>
      <h2>Header</h2>
      <Link to="/cart"><button>Cart</button></Link>
    </div>
  )
}

export default Header