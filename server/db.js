const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'shortener.db');
const db = new sqlite3.Database(DB_PATH);

const database = {
  init: () => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        long_url TEXT,
        short_code TEXT UNIQUE,
        click_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS clicks (
        id INTEGER PRIMARY KEY,
        link_id INTEGER,
        ip TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (link_id) REFERENCES links(id)
      )
    `);
  },

  // User methods
  createUser: (email, hashedPassword, callback) => {
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], callback);
  },

  getUserByEmail: (email, callback) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  getUserById: (id, callback) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], callback);
  },

  // Link methods
  createLink: (userId, longUrl, shortCode, callback) => {
    db.run('INSERT INTO links (user_id, long_url, short_code) VALUES (?, ?, ?)', [userId, longUrl, shortCode], callback);
  },

  getLinkByShortCode: (shortCode, callback) => {
    db.get('SELECT * FROM links WHERE short_code = ?', [shortCode], callback);
  },

  getUserLinks: (userId, callback) => {
    db.all('SELECT * FROM links WHERE user_id = ? ORDER BY created_at DESC', [userId], callback);
  },

  // Click tracking
  logClick: (linkId, ip, callback) => {
    db.run('INSERT INTO clicks (link_id, ip) VALUES (?, ?)', [linkId, ip], callback);
    db.run('UPDATE links SET click_count = click_count + 1 WHERE id = ?', [linkId]);
  },

  getClicksForLink: (linkId, callback) => {
    db.all('SELECT * FROM clicks WHERE link_id = ? ORDER BY timestamp DESC', [linkId], callback);
  },

  // Admin methods
  getAllUsers: (callback) => {
    db.all('SELECT id, email, created_at FROM users ORDER BY created_at DESC', callback);
  },

  getAllLinks: (callback) => {
    db.all(`
      SELECT l.id, l.user_id, l.long_url, l.short_code, l.click_count, l.created_at, u.email 
      FROM links l 
      JOIN users u ON l.user_id = u.id 
      ORDER BY l.created_at DESC
    `, callback);
  },

  getTotalClicks: (callback) => {
    db.get('SELECT SUM(click_count) as total FROM links', (err, result) => {
      callback(err, result?.total || 0);
    });
  }
};

module.exports = database;
