import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

function LinkCard({ link, index }) {
  const [copied, setCopied] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${link.short_code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const response = await api.get(`/api/links/${link.short_code}/analytics`);
      if (response.data.success) {
        setAnalytics(response.data.data);
        setShowAnalytics(true);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition cursor-pointer"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Short URL */}
        <div className="md:col-span-1">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Short URL</p>
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 break-all">
            {window.location.origin}/{link.short_code}
          </p>
        </div>

        {/* Long URL */}
        <div className="md:col-span-1">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Original URL</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 truncate hover:text-clip">
            {link.long_url}
          </p>
        </div>

        {/* Clicks */}
        <div className="md:col-span-1">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Clicks</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {link.click_count || 0}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2 justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            copied
              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAnalytics}
          disabled={loadingAnalytics}
          className="px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800 font-semibold transition disabled:opacity-50"
        >
          {loadingAnalytics ? '⏳' : '📊 Analytics'}
        </motion.button>
      </div>

      {/* Analytics Modal */}
      {showAnalytics && analytics && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAnalytics(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Analytics: {link.short_code}
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Clicks</p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
                  {analytics.link?.click_count || 0}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Created</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {new Date(analytics.link?.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Click History</h4>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto">
              {analytics.clicks?.length > 0 ? (
                <div className="space-y-2">
                  {analytics.clicks.map((click, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-gray-700 dark:text-gray-300 pb-2 border-b border-gray-200 dark:border-gray-600">
                      <span>{click.ip || 'Unknown IP'}</span>
                      <span>{new Date(click.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No clicks yet</p>
              )}
            </div>
            <button
              onClick={() => setShowAnalytics(false)}
              className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default LinkCard;
