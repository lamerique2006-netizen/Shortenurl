import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Modal from './Modal';

function Navbar({ darkMode, setDarkMode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Short.ly
            </Link>

            {/* Middle - Features (Desktop Only) */}
            <div className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300">
              <Link to="/features" className="hover:text-indigo-600 transition">Features</Link>
              <Link to="/pricing" className="hover:text-indigo-600 transition">Pricing</Link>
            </div>

            {/* Right - Auth / User Menu */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {darkMode ? '☀️' : '🌙'}
              </motion.button>

              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  >
                    Dashboard
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    }}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Sign Up
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && <Modal mode={authMode} onClose={() => setShowAuthModal(false)} />}
    </>
  );
}

export default Navbar;
