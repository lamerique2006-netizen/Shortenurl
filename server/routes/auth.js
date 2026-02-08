const express = require('express');
const { auth, db } = require('../firebase-config');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, error: 'Email and password required' });
  }

  try {
    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
    });

    // Store user info in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email,
      createdAt: new Date(),
      uid: userRecord.uid,
    });

    // Create custom token for frontend
    const customToken = await auth.createCustomToken(userRecord.uid);

    res.json({ 
      success: true, 
      data: { 
        token: customToken, 
        email, 
        uid: userRecord.uid 
      } 
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Login (frontend should use Firebase SDK, but we'll support it here too)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, error: 'Email and password required' });
  }

  try {
    // Find user by email (Firebase Admin SDK doesn't have direct password auth)
    // Frontend should use Firebase SDK instead, but this is a backup
    const userRecord = await auth.getUserByEmail(email);
    
    // Create custom token
    const customToken = await auth.createCustomToken(userRecord.uid);

    res.json({ 
      success: true, 
      data: { 
        token: customToken, 
        email: userRecord.email,
        uid: userRecord.uid
      } 
    });
  } catch (error) {
    res.json({ success: false, error: 'Invalid email or password' });
  }
});

// Get profile (verify token)
router.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.json({ success: false, error: 'No token' });
  }

  try {
    // Verify the token
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Get user from Firestore
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.json({ success: false, error: 'User not found' });
    }

    res.json({ 
      success: true, 
      data: { 
        email: userDoc.data().email,
        uid,
      } 
    });
  } catch (error) {
    res.json({ success: false, error: 'Invalid token' });
  }
});

module.exports = router;
