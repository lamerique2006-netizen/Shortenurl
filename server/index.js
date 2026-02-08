const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { db } = require('./firebase-config');
const authRoutes = require('./routes/auth');
const linksRoutes = require('./routes/links');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());

// Test Panel (for debugging)
app.get('/test', (req, res) => {
  const testPath = path.join(__dirname, 'test.html');
  res.sendFile(testPath);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linksRoutes);

// Redirect short link
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const ip = req.ip || req.connection.remoteAddress;

  try {
    const linkDoc = await db.collection('links').doc(shortCode).get();

    if (!linkDoc.exists) {
      return res.status(404).json({ error: 'Link not found' });
    }

    const linkData = linkDoc.data();

    // Log click
    await db.collection('clicks').add({
      linkId: shortCode,
      ip,
      timestamp: new Date(),
    });

    // Update click count
    await linkDoc.ref.update({
      click_count: (linkData.click_count || 0) + 1
    });

    // Redirect
    res.redirect(linkData.long_url);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
