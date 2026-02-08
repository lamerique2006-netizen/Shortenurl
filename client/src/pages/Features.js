import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Features() {
  const features = [
    {
      title: 'Lightning Fast Shortening',
      description: 'Create shortened URLs in milliseconds. No waiting, no delays.',
      image: 'https://images.unsplash.com/photo-1518050108714-f1bbb23e7ee7?w=800&q=80',
      icon: '⚡'
    },
    {
      title: 'Real-Time Analytics',
      description: 'Track clicks, locations, and device info in real-time dashboards.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      icon: '📊'
    },
    {
      title: 'Custom Domains',
      description: 'Brand your short links with your own custom domain. (Growth plan +)',
      image: 'https://images.unsplash.com/photo-1563775305-87b14b221e8c?w=800&q=80',
      icon: '🔗'
    },
    {
      title: 'Team Collaboration',
      description: 'Manage links with your team. Share, organize, and track together.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      icon: '👥'
    },
    {
      title: 'Advanced Security',
      description: 'Password-protected links, malware scanning, and fraud detection.',
      image: 'https://images.unsplash.com/photo-1563903114016-5c7900149a20?w=800&q=80',
      icon: '🔒'
    },
    {
      title: 'API Access',
      description: 'Integrate with your apps. Full REST API for developers. (Pro plan)',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      icon: '🔌'
    }
  ];

  const highlights = [
    { number: '1M+', label: 'Links Created' },
    { number: '99.9%', label: 'Uptime' },
    { number: '50+', label: 'Countries' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 px-4 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-900"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Link Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Everything you need to shorten, track, and optimize your links.
          </p>
        </div>
      </motion.section>

      {/* Stats */}
      <section className="py-16 px-4 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {item.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12"
          >
            Feature Comparison
          </motion.h2>

          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-bold">Feature</th>
                  <th className="px-6 py-4 text-center text-gray-900 dark:text-white font-bold">Free</th>
                  <th className="px-6 py-4 text-center text-gray-900 dark:text-white font-bold">Growth</th>
                  <th className="px-6 py-4 text-center text-gray-900 dark:text-white font-bold">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Short Links/Month', free: '3', growth: '100', pro: '1000+' },
                  { name: 'Analytics', free: 'Basic', growth: 'Advanced', pro: 'Real-time' },
                  { name: 'Custom Domains', free: '❌', growth: '✅', pro: '✅' },
                  { name: 'Team Collaboration', free: '❌', growth: '✅', pro: '✅' },
                  { name: 'API Access', free: '❌', growth: '❌', pro: '✅' },
                  { name: 'Priority Support', free: '❌', growth: 'Email', pro: '24/7' }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">
                      {row.free}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">
                      {row.growth}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">
                      {row.pro}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of creators and businesses using Short.ly to grow their audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition"
            >
              View Pricing
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Features;
