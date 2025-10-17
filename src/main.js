const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Database = require('./utils/database');
const Crypto = require('./utils/crypto');

let mainWindow;
let db;
let crypto;

console.log('User Data Path: ', app.getPath('userData'));
console.log('App Data Path: ', app.getPath('appData'));
console.log('Home Path: ', app.getPath('home'));
console.log('Temp Path: ', app.getPath('temp'));

const customPath = path.join(app.getPath('home'), 'totp-authenticator');
console.log("QuyNH: customPath", customPath)
// app.setPath('userData', customPath);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets', 'icon.png')
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Initialize database and crypto
app.on('ready', () => {
  const dbPath = path.join(app.getPath('userData'), 'accounts.db');
  console.log('Database path:', dbPath);
  db = new Database(dbPath);
  crypto = new Crypto();

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers for database operations

// Get all accounts
ipcMain.handle('get-accounts', async () => {
  try {
    const accounts = await db.getAllAccounts();
    // Decrypt secret keys for display
    return accounts.map(account => ({
      ...account,
      secret_key: crypto.decrypt(account.secret_key)
    }));
  } catch (error) {
    console.error('Error getting accounts:', error);
    throw error;
  }
});

// Add new account
ipcMain.handle('add-account', async (event, accountData) => {
  try {
    const { service_name, username, secret_key } = accountData;

    // Encrypt secret key before storing
    const encryptedKey = crypto.encrypt(secret_key);

    const result = await db.addAccount({
      service_name,
      username,
      secret_key: encryptedKey
    });

    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    console.error('Error adding account:', error);
    throw error;
  }
});

// Update account
ipcMain.handle('update-account', async (event, accountData) => {
  try {
    const { id, service_name, username, secret_key } = accountData;

    // Encrypt secret key before storing
    const encryptedKey = crypto.encrypt(secret_key);

    await db.updateAccount(id, {
      service_name,
      username,
      secret_key: encryptedKey
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
});

// Delete account
ipcMain.handle('delete-account', async (event, id) => {
  try {
    await db.deleteAccount(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
});

// Generate TOTP code
ipcMain.handle('generate-totp', async (event, secret) => {
  try {
    const { authenticator } = require('otplib');
    const token = authenticator.generate(secret);
    const timeRemaining = authenticator.timeRemaining();
    return { token, timeRemaining };
  } catch (error) {
    console.error('Error generating TOTP:', error);
    throw error;
  }
});
