const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, error: 'Email and password required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.createUser(email, hashedPassword, function(err) {
    if (err) {
      return res.json({ success: false, error: 'User already exists' });
    }

    // Get the newly created user to get the ID
    db.getUserByEmail(email, (err, user) => {
      if (err || !user) {
        return res.json({ success: false, error: 'Failed to create user' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ success: true, data: { token, email: user.email, id: user.id } });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.getUserByEmail(email, async (err, user) => {
    if (err || !user) {
      return res.json({ success: false, error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, data: { token, email: user.email } });
  });
});

// Profile
router.get('/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.json({ success: false, error: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, data: { email: decoded.email, id: decoded.id } });
  } catch (error) {
    res.json({ success: false, error: 'Invalid token' });
  }
});

module.exports = router;
