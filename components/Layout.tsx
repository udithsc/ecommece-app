'use client';

import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';
import PWAInstaller from './PWAInstaller';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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