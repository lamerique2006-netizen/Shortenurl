const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// You'll add the service account key here
const serviceAccount = process.env.FIREBASE_ADMIN_SDK ? 
  JSON.parse(process.env.FIREBASE_ADMIN_SDK) : 
  require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = { admin, auth, db };
