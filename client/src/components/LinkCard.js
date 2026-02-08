import React, { useState } from 'react';
import { motion } from 'framer-motion';

function LinkCard({ link, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${link.short_code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold transition"
        >
          Analytics
        </motion.button>
      </div>
    </motion.div>
  );
}

export default LinkCard;
