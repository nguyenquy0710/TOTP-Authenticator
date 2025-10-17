const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  // Get all accounts
  getAccounts: () => ipcRenderer.invoke('get-accounts'),
  
  // Add new account
  addAccount: (accountData) => ipcRenderer.invoke('add-account', accountData),
  
  // Update existing account
  updateAccount: (accountData) => ipcRenderer.invoke('update-account', accountData),
  
  // Delete account
  deleteAccount: (id) => ipcRenderer.invoke('delete-account', id),
  
  // Generate TOTP code
  generateTOTP: (secret) => ipcRenderer.invoke('generate-totp', secret)
});
