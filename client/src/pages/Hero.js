import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';

function Hero() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, token } = useAuth();

  const handleShorten = async (e) => {
    e.preventDefault();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!longUrl) {
      alert('Please enter a URL');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/api/links/create', { long_url: longUrl });

      if (response.data.success) {
        setShortUrl(response.data.data);
        setLongUrl('');
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      alert('Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}${shortUrl.short_url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Shorten links.{' '}
              <span className="text-indigo-600 dark:text-indigo-400">
                Track clicks.
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              The fastest and smartest URL shortener for creators and businesses.
            </p>
          </motion.div>

          {/* URL Shortener Form */}
          {!shortUrl ? (
            <motion.form
              onSubmit={handleShorten}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <motion.input
                  type="url"
                  placeholder="Paste your long URL here..."
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Shortening...' : 'Shorten'}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your shortened link:</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 break-all">
                    {window.location.origin}{shortUrl.short_url}
                  </p>
                </div>
                <motion.button
                  onClick={handleCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 font-bold rounded-xl transition ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {copied ? '✓ Copied!' : 'Copy Link'}
                </motion.button>
              </div>

              {/* Create Another */}
              <motion.button
                onClick={() => {
                  setShortUrl(null);
                  setLongUrl('');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                Shorten Another Link
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && <Modal mode="signup" onClose={() => setShowAuthModal(false)} />}
    </>
  );
}

export default Hero;
