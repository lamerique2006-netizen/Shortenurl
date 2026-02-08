import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

function Sidebar({ mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: '📊', label: 'Overview' },
    { icon: '🔗', label: 'My Links' },
    { icon: '📈', label: 'Analytics' },
    { icon: '⚙️', label: 'Settings' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: mobileOpen ? 0 : -250 }}
        className={`fixed left-0 top-16 md:top-0 h-screen bg-gray-900 text-white border-r border-gray-800 w-64 md:sticky md:translate-x-0 z-40 md:z-0`}
      >
        {/* Header (Desktop only) */}
        <div className="hidden md:block p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-indigo-400">Short.ly</h2>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition group"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="group-hover:text-indigo-400 transition">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-4 space-y-3">
          <div>
            <p className="text-xs text-gray-400">Logged in as</p>
            <p className="text-sm font-semibold truncate">{user?.email}</p>
          </div>
          <button
            onClick={() => {
              logout();
              setMobileOpen(false);
            }}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default Sidebar;
