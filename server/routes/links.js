const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware: verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.json({ success: false, error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.json({ success: false, error: 'Invalid token' });
  }
};

// Generate short code
const generateShortCode = () => {
  return Math.random().toString(36).substring(2, 8);
};

// Create short link
router.post('/create', verifyToken, (req, res) => {
  const { long_url } = req.body;

  if (!long_url) {
    return res.json({ success: false, error: 'URL required' });
  }

  const shortCode = generateShortCode();

  db.createLink(req.userId, long_url, shortCode, (err) => {
    if (err) {
      return res.json({ success: false, error: 'Failed to create link' });
    }

    res.json({ success: true, data: { short_url: `/${shortCode}`, short_code: shortCode, long_url } });
  });
});

// Get user's links
router.get('/list', verifyToken, (req, res) => {
  db.getUserLinks(req.userId, (err, links) => {
    if (err) {
      return res.json({ success: false, error: 'Failed to fetch links' });
    }

    res.json({ success: true, data: links || [] });
  });
});

// Get analytics for a link
router.get('/:shortCode/analytics', verifyToken, (req, res) => {
  const { shortCode } = req.params;

  db.getLinkByShortCode(shortCode, (err, link) => {
    if (err || !link) {
      return res.json({ success: false, error: 'Link not found' });
    }

    if (link.user_id !== req.userId) {
      return res.json({ success: false, error: 'Unauthorized' });
    }

    db.getClicksForLink(link.id, (err, clicks) => {
      if (err) {
        return res.json({ success: false, error: 'Failed to fetch analytics' });
      }

      res.json({ success: true, data: { link, clicks: clicks || [] } });
    });
  });
});

module.exports = router;
