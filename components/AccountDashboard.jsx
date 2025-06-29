'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineSetting, AiOutlineLogout, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsBox } from 'react-icons/bs';

const AccountDashboard = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', loginData);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register:', registerData);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('login');
    setLoginData({ email: '', password: '' });
    setRegisterData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: AiOutlineUser },
    { id: 'orders', label: 'Order History', icon: AiOutlineShoppingCart },
    { id: 'details', label: 'Order Details', icon: BsBox },
    { id: 'addresses', label: 'Addresses', icon: AiOutlineSetting },
    { id: 'profile', label: 'Edit Profile', icon: AiOutlineUser },
    { id: 'password', label: 'Password', icon: AiOutlineSetting },
    { id: 'logout', label: 'Logout', icon: AiOutlineLogout },
  ];

  const mockOrders = [
    {
      id: '#8132',
      date: '02 April, 2019',
      status: 'Pending',
      total: '$2,719.00',
      items: 5
    },
    {
      id: '#7592',
      date: '28 March, 2019',
      status: 'Pending',
      total: '$374.00',
      items: 3
    },
    {
      id: '#7192',
      date: '15 March, 2019',
      status: 'Shipped',
      total: '$791.00',
      items: 4
    }
  ];

  const DashboardContent = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <AiOutlineUser className="w-10 h-10 text-gray-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Helena Garcia</h2>
            <p className="text-gray-600">stroyka@example.com</p>
          </div>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          DEFAULT ADDRESS
        </span>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium">Address:</p>
            <p>Random Federation<br />115302, Moscow<br />ul. Varshavskaya, 15-2-178</p>
          </div>
          <div>
            <p className="font-medium">Phone Number:</p>
            <p>38 972 588-42-36</p>
            <p className="font-medium mt-2">Email Address:</p>
            <p>stroyka@example.com</p>
          </div>
        </div>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium mt-4">
          Edit Address
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 font-medium text-gray-700">ORDER</th>
                <th className="text-left py-4 font-medium text-gray-700">DATE</th>
                <th className="text-left py-4 font-medium text-gray-700">STATUS</th>
                <th className="text-left py-4 font-medium text-gray-700">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-4">
                    <span className="text-green-600 font-medium">{order.id}</span>
                  </td>
                  <td className="py-4 text-gray-600">{order.date}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 font-medium">
                    {order.total} for {order.items} item(s)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const OrderHistoryContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                <p className="text-gray-600">{order.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {order.status}
                </span>
                <span className="font-semibold text-gray-900">{order.total}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{order.items} items</p>
            <button className="text-green-600 hover:text-green-700 font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileContent = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
      <form className="max-w-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input 
              type="text" 
              defaultValue="Helena"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input 
              type="text" 
              defaultValue="Garcia"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input 
            type="email" 
            defaultValue="stroyka@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input 
            type="tel" 
            defaultValue="38 972 588-42-36"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea 
            rows={3}
            defaultValue="Random Federation, 115302, Moscow, ul. Varshavskaya, 15-2-178"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
          />
        </div>
        
        <button 
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );

  const LoginForm = () => (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent pr-10"
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
            <input type="checkbox" className="text-primary focus:ring-[#629D23]" />
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
          <button
            onClick={() => setActiveTab('register')}
            className="text-primary hover:text-green-700 font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );

  const RegisterForm = () => (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Account</h2>
      <form onSubmit={handleRegister} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={registerData.firstName}
              onChange={handleRegisterChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={registerData.lastName}
              onChange={handleRegisterChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleRegisterChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              type={showRegisterPassword ? "text" : "password"}
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent pr-10"
              placeholder="Create password"
            />
            <button
              type="button"
              onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showRegisterPassword ? (
                <AiOutlineEyeInvisible className="w-5 h-5 text-gray-400" />
              ) : (
                <AiOutlineEye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password *
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:border-transparent"
            placeholder="Confirm password"
          />
        </div>

        <div className="flex items-start">
          <input type="checkbox" required className="text-primary focus:ring-[#629D23] mt-1" />
          <span className="ml-2 text-sm text-gray-600">
            I agree to the{' '}
            <Link href="/terms" className="text-primary hover:text-green-700">
              Terms & Conditions
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:text-green-700">
              Privacy Policy
            </Link>
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
        >
          Create Account
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => setActiveTab('login')}
            className="text-primary hover:text-green-700 font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    if (!isLoggedIn) {
      switch (activeTab) {
        case 'register':
          return <RegisterForm />;
        case 'login':
        default:
          return <LoginForm />;
      }
    }

    switch (activeTab) {
      case 'orders':
        return <OrderHistoryContent />;
      case 'profile':
        return <ProfileContent />;
      case 'dashboard':
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Account</span>
          </nav>
        </div>
      </div>

      {!isLoggedIn ? (
        // Login/Register Forms
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              {/* Tab Switcher */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors font-medium ${
                    activeTab === 'login' 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors font-medium ${
                    activeTab === 'register' 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Dashboard Content
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 bg-gray-50 border-b">
                  <h3 className="font-semibold text-gray-900">Navigation</h3>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                              activeTab === item.id 
                                ? 'bg-green-100 text-primary font-medium' 
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
              <div className="bg-white rounded-lg shadow-sm p-6">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDashboard;