const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DatabaseManager {
  constructor(dbPath) {
    this.dbPath = dbPath;
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Failed to connect to database:', err);
      } else {
        this.initDatabase();
      }
    });
  }

  initDatabase() {
    return new Promise((resolve, reject) => {
      const createTableSQL = `
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service_name TEXT NOT NULL,
        username TEXT NOT NULL,
        secret_key TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
      this.db.run(createTableSQL, (err) => {
        if (err) {
          console.error('Failed to initialize database:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  getAllAccounts() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM accounts ORDER BY created_at DESC';
      this.db.all(query, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  getAccountById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM accounts WHERE id = ?';
      this.db.get(query, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  addAccount({ service_name, username, secret_key }) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO accounts (service_name, username, secret_key)
        VALUES (?, ?, ?)
      `;
      this.db.run(query, [service_name, username, secret_key], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID });
      });
    });
  }

  updateAccount(id, { service_name, username, secret_key }) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE accounts 
        SET service_name = ?, 
            username = ?, 
            secret_key = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      this.db.run(query, [service_name, username, secret_key, id], function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }

  deleteAccount(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM accounts WHERE id = ?';
      this.db.run(query, [id], function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = DatabaseManager;
