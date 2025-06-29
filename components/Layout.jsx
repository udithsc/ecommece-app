'use client';

import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';
import PWAInstaller from './PWAInstaller';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
      <PWAInstaller />
    </div>
  );
};

export default Layout;
