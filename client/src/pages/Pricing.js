import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'Forever',
      description: 'Perfect for trying us out',
      features: [
        '3 short links/month',
        'Basic analytics',
        'No custom domains',
        'Community support'
      ],
      cta: 'Get Started',
      popular: false,
      color: 'gray'
    },
    {
      name: 'Growth',
      price: '$29',
      period: 'per month',
      description: 'For growing businesses',
      features: [
        '100 short links/month',
        'Advanced analytics',
        'Custom domains',
        'Email support',
        'Team collaboration'
      ],
      cta: 'Start Free Trial',
      popular: true,
      color: 'indigo'
    },
    {
      name: 'Pro',
      price: '$99',
      period: 'per month',
      description: 'For enterprises',
      features: [
        '1000+ short links/month',
        'Real-time analytics',
        'Unlimited domains',
        'Priority support',
        'API access',
        'Advanced security'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'blue'
    }
  ];

  const handleCTA = (plan) => {
    if (!user) {
      navigate('/');
      return;
    }
    // TODO: Integrate Stripe checkout
    alert(`Upgrade to ${plan} plan coming soon!`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Choose the perfect plan for your needs. Always flexible to scale.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-2xl overflow-hidden transition ${
              plan.popular
                ? 'ring-2 ring-indigo-600 transform md:scale-105'
                : 'border border-gray-200 dark:border-gray-700'
            }`}
          >
            {/* Card Background */}
            <div className={`p-8 ${
              plan.popular
                ? 'bg-gradient-to-br from-indigo-600 to-indigo-700'
                : 'bg-white dark:bg-gray-800'
            }`}>
              {/* Popular Badge */}
              {plan.popular && (
                <div className="mb-4 inline-block bg-white text-indigo-600 px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`text-3xl font-bold mb-2 ${
                plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'
              }`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className={`text-5xl font-bold ${
                  plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}>
                  {plan.price}
                </span>
                <span className={`ml-2 ${
                  plan.popular ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p className={`mb-8 ${
                plan.popular ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {plan.description}
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCTA(plan.name)}
                className={`w-full py-3 px-6 rounded-lg font-bold mb-8 transition ${
                  plan.popular
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {plan.cta}
              </motion.button>
            </div>

            {/* Features */}
            <div className="p-8 bg-gray-50 dark:bg-gray-700/50">
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            {
              q: 'Can I upgrade or downgrade my plan anytime?',
              a: 'Yes! You can change your plan at any time. Changes take effect immediately.'
            },
            {
              q: 'Do you offer refunds?',
              a: 'We offer a 30-day money-back guarantee if you\'re not satisfied.'
            },
            {
              q: 'What happens when I reach my monthly limit?',
              a: 'Your account will stop creating new short links until your plan renews or you upgrade.'
            },
            {
              q: 'Do you offer team plans?',
              a: 'Team features are included in Growth and Pro plans. Contact us for enterprise solutions.'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {item.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Pricing;
