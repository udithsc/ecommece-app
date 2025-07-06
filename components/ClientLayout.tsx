'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PWAInstaller from './PWAInstaller';
import ChunkLoadMonitor from './ChunkLoadMonitor';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <ChunkLoadMonitor />
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

export default ClientLayout;