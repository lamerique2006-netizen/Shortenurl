import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import LinkCard from '../components/LinkCard';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalLinks: 0, totalClicks: 0 });
  const [longUrl, setLongUrl] = useState('');
  const [creating, setCreating] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [message, setMessage] = useState('');

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/links/list'); // token handled by api interceptor

      if (response.data.success) {
        const fetchedLinks = response.data.data || [];
        setLinks(fetchedLinks);
        setStats({
          totalLinks: fetchedLinks.length,
          totalClicks: fetchedLinks.reduce((sum, link) => sum + (link.click_count || 0), 0)
        });
      }
    } catch (error) {
      console.error('Failed to fetch links:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateLink = async (e) => {
    e.preventDefault();
    if (!longUrl) {
      alert('Please enter a URL');
      return;
    }

    setCreating(true);
    setMessage('');
    try {
      const response = await api.post('/api/links/create', { long_url: longUrl });
      if (response.data.success) {
        setLongUrl('');
        if (response.data.data.isExisting) {
          setMessage('✅ This URL already exists in your links!');
        } else {
          setMessage('✅ New link created successfully!');
        }
        fetchLinks(); // Refresh the list
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`❌ ${response.data.error || 'Failed to create link'}`);
      }
    } catch (error) {
      setMessage(`❌ Error creating link: ${error.message}`);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    fetchLinks();

    // Auto-refresh links every 10 seconds to show latest click counts
    const interval = setInterval(fetchLinks, 10000);
    return () => clearInterval(interval);
  }, [user, navigate, fetchLinks]);

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      {/* Mobile hamburger - only on small screens */}
      <div className="md:hidden sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 z-20">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Main content */}
      <div className="md:ml-64">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.email}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Links</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.totalLinks}
                </p>
              </div>
              <div className="text-4xl">🔗</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Clicks</p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">
                  {stats.totalClicks}
                </p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </motion.div>
        </div>

        {/* Create Link Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Create New Short Link
          </h2>
          <form onSubmit={handleCreateLink} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="url"
                placeholder="Paste your long URL here..."
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition"
              />
              <motion.button
                type="submit"
                disabled={creating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? 'Creating...' : 'Shorten'}
              </motion.button>
            </div>
            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-4 rounded-lg ${
                  message.includes('✅')
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200'
                }`}
              >
                {message}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Links Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Links
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="text-4xl"
              >
                ⏳
              </motion.div>
            </div>
          ) : links.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No links yet. Create your first short link! 🚀
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {links.map((link, index) => (
                <LinkCard key={link.id} link={link} index={index} />
              ))}
            </div>
          )}
        </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
