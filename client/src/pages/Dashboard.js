import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import LinkCard from '../components/LinkCard';

function Dashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalLinks: 0, totalClicks: 0 });

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/links/list', {
        headers: { Authorization: `Bearer ${token}` }
      });

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
  }, [token]);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    fetchLinks();
  }, [user, navigate, fetchLinks]);

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        {/* Links Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
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
  );
}

export default Dashboard;
