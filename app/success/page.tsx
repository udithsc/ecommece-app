'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import useCartStore from '../../stores/cartStore';
import { runFireworks } from '../../lib/utils';

const Success = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    localStorage.clear();
    clearCart();
    runFireworks();
  }, [clearCart]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn" style={{ width: '300px' }}>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
