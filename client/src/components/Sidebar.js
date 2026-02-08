import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: '📊', label: 'Overview', href: '#overview' },
    { icon: '🔗', label: 'My Links', href: '#links' },
    { icon: '📈', label: 'Analytics', href: '#analytics' },
    { icon: '⚙️', label: 'Settings', href: '#settings' }
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-0 h-screen bg-gray-900 text-white border-r border-gray-800 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } z-40`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        {!collapsed && <h2 className="text-xl font-bold text-indigo-400">Short.ly</h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-800 rounded-lg transition"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition group"
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="group-hover:text-indigo-400 transition">{item.label}</span>}
          </a>
        ))}
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-4">
        {!collapsed && (
          <div className="mb-4">
            <p className="text-xs text-gray-400">Logged in as</p>
            <p className="text-sm font-semibold truncate">{user?.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-semibold"
        >
          {collapsed ? '🚪' : 'Logout'}
        </button>
      </div>
    </motion.div>
  );
}

export default Sidebar;
