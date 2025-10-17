const Database = require('better-sqlite3');

class DatabaseManager {
  constructor(dbPath) {
    this.db = new Database(dbPath);
    this.initDatabase();
  }

  initDatabase() {
    // Create accounts table if it doesn't exist
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
    
    this.db.exec(createTableSQL);
  }

  getAllAccounts() {
    const stmt = this.db.prepare('SELECT * FROM accounts ORDER BY created_at DESC');
    return stmt.all();
  }

  getAccountById(id) {
    const stmt = this.db.prepare('SELECT * FROM accounts WHERE id = ?');
    return stmt.get(id);
  }

  addAccount(accountData) {
    const { service_name, username, secret_key } = accountData;
    const stmt = this.db.prepare(`
      INSERT INTO accounts (service_name, username, secret_key)
      VALUES (?, ?, ?)
    `);
    return stmt.run(service_name, username, secret_key);
  }

  updateAccount(id, accountData) {
    const { service_name, username, secret_key } = accountData;
    const stmt = this.db.prepare(`
      UPDATE accounts 
      SET service_name = ?, 
          username = ?, 
          secret_key = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    return stmt.run(service_name, username, secret_key, id);
  }

  deleteAccount(id) {
    const stmt = this.db.prepare('DELETE FROM accounts WHERE id = ?');
    return stmt.run(id);
  }

  close() {
    this.db.close();
  }
}

module.exports = DatabaseManager;
