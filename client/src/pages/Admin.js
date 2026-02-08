import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function Admin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || ''}/api/admin/stats`,
        {
          headers: { 'x-admin-password': password }
        }
      );
      if (response.data.success) {
        setAuthenticated(true);
        setData(response.data.data);
      } else {
        alert('Invalid password');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Admin Panel
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-600"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <button
            onClick={() => {
              setAuthenticated(false);
              setData(null);
              setPassword('');
            }}
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            Logout
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Users', value: data?.totalUsers || 0, icon: '👥' },
            { label: 'Total Links', value: data?.totalLinks || 0, icon: '🔗' },
            { label: 'Total Clicks', value: data?.totalClicks || 0, icon: '📊' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-4 py-3 text-gray-700 dark:text-gray-300 font-bold">Email</th>
                  <th className="text-left px-4 py-3 text-gray-700 dark:text-gray-300 font-bold">Signup Date</th>
                  <th className="text-right px-4 py-3 text-gray-700 dark:text-gray-300 font-bold">Links Created</th>
                </tr>
              </thead>
              <tbody>
                {data?.users?.map((user, i) => {
                  const userLinks = data.links?.filter(l => l.user_id === user.id) || [];
                  return (
                    <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 text-gray-900 dark:text-white">{user.email}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-indigo-600 dark:text-indigo-400">
                        {userLinks.length}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Links Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Links</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-4 py-3 text-gray-700 dark:text-gray-300 font-bold">User</th>
                  <th className="text-left px-4 py-3 text-gray-700 dark:text-gray-300 font-bold">Short Code</th>
                  <th className="text-left px-4 py-3 text-gray-700 dark:text-gray-300 font-bold">Original URL</th>
                  <th className="text-right px-4 py-3 text-gray-700 dark:text-gray-300 font-bold">Clicks</th>
                  <th className="text-left px-4 py-3 text-gray-700 dark:text-gray-300 font-bold">Created</th>
                </tr>
              </thead>
              <tbody>
                {data?.links?.map((link, i) => (
                  <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 text-gray-900 dark:text-white text-xs">{link.email}</td>
                    <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                      {link.short_code}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 truncate text-xs max-w-xs">
                      {link.long_url}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">{link.click_count}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">
                      {new Date(link.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Admin;
