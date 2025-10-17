const Datastore = require('nedb');
const path = require('path');

class DatabaseManager {
  constructor(dbPath) {
    this.dbPath = dbPath;
    this.db = new Datastore({
      filename: dbPath,
      autoload: true,
      timestampData: true
    });
  }

  initDatabase() {
    return new Promise((resolve, reject) => {
      // NeDB doesn't require schema creation, just resolve immediately
      resolve();
    });
  }

  getAllAccounts() {
    return new Promise((resolve, reject) => {
      this.db.find({}).sort({ createdAt: -1 }).exec((err, docs) => {
        if (err) return reject(err);
        // Map NeDB documents to match SQLite format (using _id as id)
        const accounts = docs.map(doc => ({
          id: doc._id,
          service_name: doc.service_name,
          username: doc.username,
          secret_key: doc.secret_key,
          created_at: doc.createdAt,
          updated_at: doc.updatedAt
        }));
        resolve(accounts);
      });
    });
  }

  getAccountById(id) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ _id: id }, (err, doc) => {
        if (err) return reject(err);
        if (!doc) {
          resolve(null);
        } else {
          // Map NeDB document to match SQLite format
          resolve({
            id: doc._id,
            service_name: doc.service_name,
            username: doc.username,
            secret_key: doc.secret_key,
            created_at: doc.createdAt,
            updated_at: doc.updatedAt
          });
        }
      });
    });
  }

  addAccount({ service_name, username, secret_key }) {
    return new Promise((resolve, reject) => {
      const newAccount = {
        service_name,
        username,
        secret_key
      };
      
      this.db.insert(newAccount, (err, doc) => {
        if (err) return reject(err);
        resolve({ id: doc._id, lastInsertRowid: doc._id });
      });
    });
  }

  updateAccount(id, { service_name, username, secret_key }) {
    return new Promise((resolve, reject) => {
      const updateData = {
        service_name,
        username,
        secret_key
      };
      
      this.db.update({ _id: id }, { $set: updateData }, {}, (err, numReplaced) => {
        if (err) return reject(err);
        resolve({ changes: numReplaced });
      });
    });
  }

  deleteAccount(id) {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) return reject(err);
        resolve({ changes: numRemoved });
      });
    });
  }

  close() {
    return new Promise((resolve) => {
      // NeDB doesn't need explicit close, but we keep the method for compatibility
      resolve();
    });
  }
}

module.exports = DatabaseManager;
