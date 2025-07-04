'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineEnvironment,
  AiOutlineLogout,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineSearch,
} from 'react-icons/ai';

type TabType = 'dashboard' | 'track' | 'address' | 'details' | 'logout';

interface OrderTrackData {
  orderId: string;
  email: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface MenuItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const AccountDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [orderTrackData, setOrderTrackData] = useState<OrderTrackData>({
    orderId: '',
    email: '',
  });
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = (): void => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
    setLoginData({ email: '', password: '' });
  };

  const handleOrderTrack = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle order tracking logic here
    console.log('Track order:', orderTrackData);
  };

  const handleOrderTrackChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOrderTrackData({
      ...orderTrackData,
      [e.target.name]: e.target.value,
    });
  };

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: AiOutlineUser },
    { id: 'track', label: 'Order Track', icon: AiOutlineSearch },
    { id: 'address', label: 'My Address', icon: AiOutlineEnvironment },
    { id: 'details', label: 'Account Details', icon: AiOutlineUser },
    { id: 'logout', label: 'Log Out', icon: AiOutlineLogout },
  ];

  const OrderTrackContent: React.FC = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Track</h2>
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-gray-600 mb-6">
          To track your order please enter your Order ID in the box below and press the
          &quot;Track&quot; button. This was given to you on your receipt and in the confirmation
          email you should have received.
        </p>

        <form onSubmit={handleOrderTrack} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
              <input
                type="text"
                name="orderId"
                value={orderTrackData.orderId}
                onChange={handleOrderTrackChange}
                placeholder="Found in your order confirmation email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Billing Email</label>
              <input
                type="email"
                name="email"
                value={orderTrackData.email}
                onChange={handleOrderTrackChange}
                placeholder="Email you used during checkout"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
          >
            Track
          </button>
        </form>
      </div>
    </div>
  );

  const DashboardContent: React.FC = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-gray-600">
          Welcome to your account dashboard. From here you can view your recent orders, manage your
          shipping addresses, and edit your account details.
        </p>
      </div>
    </div>
  );

  const AddressContent: React.FC = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Address</h2>
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-gray-600">
          The following addresses will be used on the checkout page by default.
        </p>
        <div className="mt-6 space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-900 mb-2">Billing Address</h3>
            <p className="text-gray-600 text-sm">
              Helena Garcia
              <br />
              115302, Moscow
              <br />
              ul. Varshavskaya, 15-2-178
              <br />
              Random Federation
            </p>
            <button className="text-primary hover:text-green-700 text-sm font-medium mt-2">
              Edit
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
            <p className="text-gray-600 text-sm">
              Helena Garcia
              <br />
              115302, Moscow
              <br />
              ul. Varshavskaya, 15-2-178
              <br />
              Random Federation
            </p>
            <button className="text-primary hover:text-green-700 text-sm font-medium mt-2">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AccountDetailsContent: React.FC = () => {
    const handleAccountSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      // Handle account details update
    };

    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h2>
        <form onSubmit={handleAccountSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input
                type="text"
                defaultValue="Helena"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                defaultValue="Garcia"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              defaultValue="stroyka@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password (leave blank to leave unchanged)
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password (leave blank to leave unchanged)
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="New password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    );
  };

  const LoginForm: React.FC = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
        <p className="text-gray-600">Sign in to your account to access your dashboard</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="w-5 h-5 text-gray-400" />
              ) : (
                <AiOutlineEye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="text-primary focus:ring-primary" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-sm text-primary hover:text-green-700">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:text-green-700 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );

  const renderContent = (): React.ReactNode => {
    if (!isLoggedIn) {
      return <LoginForm />;
    }

    switch (activeTab) {
      case 'track':
        return <OrderTrackContent />;
      case 'address':
        return <AddressContent />;
      case 'details':
        return <AccountDetailsContent />;
      case 'dashboard':
      default:
        return <DashboardContent />;
    }
  };

  const handleMenuClick = (itemId: TabType): void => {
    if (itemId === 'logout') {
      handleLogout();
    } else {
      setActiveTab(itemId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Account</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
              {renderContent()}
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 bg-primary">
                  <h3 className="font-semibold text-white">My Account</h3>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => handleMenuClick(item.id)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                              activeTab === item.id
                                ? 'bg-green-100 text-primary font-medium'
                                : item.id === 'logout'
                                  ? 'text-red-600 hover:bg-red-50'
                                  : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">{renderContent()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDashboard;