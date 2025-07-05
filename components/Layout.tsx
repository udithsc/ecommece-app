import React from 'react';
import ClientLayout from './ClientLayout';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
};

export default Layout;