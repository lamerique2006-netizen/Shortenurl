const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
let serviceAccount;

if (process.env.FIREBASE_ADMIN_SDK) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);
  } catch (error) {
    console.error('Failed to parse FIREBASE_ADMIN_SDK:', error.message);
    process.exit(1);
  }
} else if (process.env.NODE_ENV === 'development') {
  // Only try local file in development
  try {
    serviceAccount = require('./serviceAccountKey.json');
  } catch (error) {
    console.error('Firebase credentials not found. Set FIREBASE_ADMIN_SDK env var.');
    process.exit(1);
  }
} else {
  console.error('FIREBASE_ADMIN_SDK environment variable not set');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = { admin, auth, db };
