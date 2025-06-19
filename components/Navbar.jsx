import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai';
import Image from 'next/image';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <div className="navbar-inner">
        <div className="navbar-left">
          <Link href="/">
            <a className="logo-image-link">
              <Image
                src="/udt-store-logo.png"
                alt="UDT Store Logo"
                width={100}
                height={60}
                className="logo-image"
              />
            </a>
          </Link>
        </div>
        <nav className="navbar-center">
          <Link href="/">
            <a className="menu-item">Mac</a>
          </Link>
          <Link href="/">
            <a className="menu-item">iPad</a>
          </Link>
          <Link href="/">
            <a className="menu-item">iPhone</a>
          </Link>
          <Link href="/">
            <a className="menu-item">Watch</a>
          </Link>
          <Link href="/">
            <a className="menu-item">AirPods</a>
          </Link>
          <Link href="/">
            <a className="menu-item">TV & Home</a>
          </Link>
          <Link href="/">
            <a className="menu-item">Accessories</a>
          </Link>
          <Link href="/">
            <a className="menu-item">Offer</a>
          </Link>
        </nav>
        <div className="navbar-right">
          <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
            <AiOutlineShopping />
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
          <AiOutlineUser className="user-icon" />
        </div>
      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
