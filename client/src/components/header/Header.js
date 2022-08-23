import React, { useEffect } from 'react';
import './header.css';
import {Link} from 'react-router-dom';
import gsap from 'gsap';

function Header() {


  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("verifiedToken");
    window.location.href = "/login";
  }

  return (
    <div className='header-container'>
       <div className='header-align' >
          <Link to="/"><h2>FakeShop</h2></Link>
          <div className='header-left'>
              <Link to="/cart"><button className='button-59'>Cart</button></Link>
              <button className='button-59' onClick={logOut}>Logout</button>
          </div>
       </div>
    </div>
  )
}

export default Header