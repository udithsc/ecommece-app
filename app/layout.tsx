import { Metadata } from 'next';
import { StateContext } from '../context/StateContext';
import { WishlistProvider } from '../context/WishlistContext';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'UDT STORE - Complete E-commerce Solution',
  description: 'Modern e-commerce store with tools, electronics, and more',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StateContext>
          <WishlistProvider>{children}</WishlistProvider>
        </StateContext>
      </body>
    </html>
  );
}
