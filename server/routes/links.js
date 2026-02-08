const express = require('express');
const { auth, db } = require('../firebase-config');

const router = express.Router();

// Middleware: verify token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.json({ success: false, error: 'Unauthorized' });

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.uid = decodedToken.uid;
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
router.post('/create', verifyToken, async (req, res) => {
  const { long_url } = req.body;

  if (!long_url) {
    return res.json({ success: false, error: 'URL required' });
  }

  try {
    const shortCode = generateShortCode();

    // Store in Firestore
    const linkRef = db.collection('links').doc(shortCode);
    await linkRef.set({
      uid: req.uid,
      long_url,
      short_code: shortCode,
      click_count: 0,
      createdAt: new Date(),
    });

    res.json({ 
      success: true, 
      data: { 
        short_url: `/${shortCode}`, 
        short_code: shortCode, 
        long_url 
      } 
    });
  } catch (error) {
    res.json({ success: false, error: 'Failed to create link' });
  }
});

// Get user's links
router.get('/list', verifyToken, async (req, res) => {
  try {
    const snapshot = await db.collection('links')
      .where('uid', '==', req.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const links = [];
    snapshot.forEach(doc => {
      links.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({ success: true, data: links });
  } catch (error) {
    res.json({ success: false, error: 'Failed to fetch links' });
  }
});

// Get analytics for a link
router.get('/:shortCode/analytics', verifyToken, async (req, res) => {
  const { shortCode } = req.params;

  try {
    const linkDoc = await db.collection('links').doc(shortCode).get();

    if (!linkDoc.exists) {
      return res.json({ success: false, error: 'Link not found' });
    }

    const linkData = linkDoc.data();

    if (linkData.uid !== req.uid) {
      return res.json({ success: false, error: 'Unauthorized' });
    }

    // Get clicks for this link
    const clicksSnapshot = await db.collection('clicks')
      .where('linkId', '==', shortCode)
      .orderBy('timestamp', 'desc')
      .get();

    const clicks = [];
    clicksSnapshot.forEach(doc => {
      clicks.push(doc.data());
    });

    res.json({ 
      success: true, 
      data: { 
        link: { id: shortCode, ...linkData }, 
        clicks 
      } 
    });
  } catch (error) {
    res.json({ success: false, error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
