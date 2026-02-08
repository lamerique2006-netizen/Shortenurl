import React from 'react';
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

  const handleMenuClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop (always visible) */}
      <div className="hidden md:flex md:fixed md:flex-col left-0 top-0 h-screen bg-gray-900 text-white border-r border-gray-800 w-64 z-40">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-indigo-400">Short.ly</h2>
        </div>

        {/* Menu - Scrollable */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition group"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="group-hover:text-indigo-400 transition">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Info - Always at bottom */}
        <div className="border-t border-gray-800 p-4 space-y-3">
          <div>
            <p className="text-xs text-gray-400">Logged in as</p>
            <p className="text-sm font-semibold truncate">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar - Mobile (overlay only when open) */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: mobileOpen ? 0 : -250 }}
        className="md:hidden fixed left-0 top-16 h-[calc(100vh-64px)] bg-gray-900 text-white border-r border-gray-800 w-64 z-40 flex flex-col"
      >
        {/* Menu - Scrollable */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={handleMenuClick}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition group"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="group-hover:text-indigo-400 transition">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Info - Always at bottom */}
        <div className="border-t border-gray-800 p-4 space-y-3">
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
