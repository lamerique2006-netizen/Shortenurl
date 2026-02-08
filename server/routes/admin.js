const express = require('express');
const db = require('../db');

const router = express.Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Middleware: verify admin password
const verifyAdmin = (req, res, next) => {
  const password = req.headers['x-admin-password'];
  if (password !== ADMIN_PASSWORD) {
    return res.json({ success: false, error: 'Unauthorized' });
  }
  next();
};

// Get dashboard stats
router.get('/stats', verifyAdmin, (req, res) => {
  // Get all users
  db.getAllUsers((err, users) => {
    if (err) return res.json({ success: false, error: err.message });

    // Get all links
    db.getAllLinks((err, links) => {
      if (err) return res.json({ success: false, error: err.message });

      // Get total clicks
      db.getTotalClicks((err, totalClicks) => {
        if (err) return res.json({ success: false, error: err.message });

        res.json({
          success: true,
          data: {
            totalUsers: users?.length || 0,
            totalLinks: links?.length || 0,
            totalClicks: totalClicks || 0,
            users: users || [],
            links: links || []
          }
        });
      });
    });
  });
});

module.exports = router;
