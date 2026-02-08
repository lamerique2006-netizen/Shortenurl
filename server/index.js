const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');
const authRoutes = require('./routes/auth');
const linksRoutes = require('./routes/links');
const adminRoutes = require('./routes/admin');

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

// Initialize DB
db.init();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running ✅', timestamp: new Date() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linksRoutes);
app.use('/api/admin', adminRoutes);

// Redirect short link
app.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;
  const ip = req.ip || req.connection.remoteAddress;

  db.getLinkByShortCode(shortCode, (err, link) => {
    if (err || !link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    // Log click
    db.logClick(link.id, ip);

    // Redirect
    res.redirect(link.long_url);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
