# Quick Start Guide - TOTP Authenticator

## 🚀 5-Minute Quick Start

### Installation (1 minute)

```bash
# Clone the repository
git clone https://github.com/nguyenquy0710/TOTP-Authenticator.git

# Navigate to the directory
cd TOTP-Authenticator

# Install dependencies (this will take ~1 minute)
npm install
```

### Running the App (30 seconds)

```bash
# Start the application
npm start
```

The TOTP Authenticator window will open automatically!

### First Steps (2 minutes)

#### 1. Add Your First Account

1. In the form at the top, enter:
   - **Service Name**: `Google`
   - **Username**: `your.email@gmail.com`
   - **Secret Key**: Your Google 2FA secret key (e.g., `JBSWY3DPEHPK3PXP`)

2. Click **"➕ Thêm Tài Khoản"** (Add Account)

#### 2. View Your TOTP Code

- Your 6-digit TOTP code appears below the account
- The code refreshes automatically every 30 seconds
- A progress bar shows time remaining

#### 3. Copy and Use the Code

1. Click **"📋 Copy"** button
2. Paste the code into the 2FA field on the service
3. Complete your login!

### Where to Get Secret Keys?

#### Google Account
1. Go to https://myaccount.google.com/security
2. Select "2-Step Verification"
3. Choose "Authenticator app"
4. Click "Set up" → "Can't scan QR code?"
5. Copy the secret key shown

#### GitHub
1. Go to Settings → Password and authentication
2. Two-factor authentication → Set up using an app
3. Click "enter this text code"
4. Copy the secret key

#### Facebook
1. Settings & Privacy → Settings → Security and Login
2. Two-factor authentication → Authenticator app
3. Choose "Can't scan?" to see secret key

## 🎨 Interface Overview

```
┌─────────────────────────────────────────┐
│  🔐 TOTP Authenticator         🌙       │
├─────────────────────────────────────────┤
│  Add New Account Form                   │
│  ┌──────────────────────────────────┐   │
│  │ Service Name: [Google        ]   │   │
│  │ Username:     [user@gmail.com]   │   │
│  │ Secret Key:   [JBSWY3DPEHPK3]   │   │
│  │                                  │   │
│  │ [➕ Add Account]  [❌ Cancel]    │   │
│  └──────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  Accounts List                          │
│  ┌──────────────────────────────────┐   │
│  │ Google                           │   │
│  │ user@gmail.com                   │   │
│  │                                  │   │
│  │ TOTP: 123 456  [📋 Copy]        │   │
│  │ [████████████░░] 18s             │   │
│  │                                  │   │
│  │ [✏️ Edit]  [🗑️ Delete]          │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## ⌨️ Quick Actions

- **Toggle Dark Mode**: Click moon/sun icon (top right)
- **Add Account**: Fill form → Press Enter
- **Edit Account**: Click "✏️ Edit" button
- **Delete Account**: Click "🗑️ Delete" button → Confirm
- **Copy Code**: Click "📋 Copy" button

## 🧪 Verify Installation

Run the test suite to ensure everything works:

```bash
npm test
```

Expected output:
```
=================================
✓ All tests passed successfully!
=================================
```

## 📦 Building the Application

### Windows (.exe)
```bash
npm run build:win
```
File created: `dist/TOTP Authenticator Setup X.X.X.exe`

### macOS (.dmg)
```bash
npm run build:mac
```
File created: `dist/TOTP Authenticator-X.X.X.dmg`

### Linux (.AppImage)
```bash
npm run build:linux
```
File created: `dist/TOTP Authenticator-X.X.X.AppImage`

## 🔒 Security Tips

- ✅ Secret keys are encrypted before storage
- ✅ Database is machine-specific (cannot be copied to another PC)
- ✅ Application works completely offline
- ⚠️ Keep your secret keys safe
- ⚠️ Backup your database regularly

### Database Location

**Windows:**
```
C:\Users\{Username}\AppData\Roaming\totp-authenticator\accounts.db
```

**macOS:**
```
~/Library/Application Support/totp-authenticator/accounts.db
```

**Linux:**
```
~/.config/totp-authenticator/accounts.db
```

## 🆘 Troubleshooting

### App won't start?
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### TOTP code shows "ERROR"?
- Check if secret key is correct
- Secret key must be Base32 format (A-Z and 2-7 only)
- Delete and re-add the account

### Code doesn't work on the service?
- Make sure system time is correct
- Wait for a new code to generate
- Verify you copied the complete code

## 📚 Documentation

- **[README.md](README.md)** - Overview and features
- **[INSTALL.md](INSTALL.md)** - Detailed installation guide
- **[USAGE.md](USAGE.md)** - Complete user guide
- **[SECURITY.md](SECURITY.md)** - Security information
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

## ⭐ Features at a Glance

| Feature | Description |
|---------|-------------|
| 🔐 TOTP Generation | Automatic 6-digit code generation |
| 💾 Local Storage | SQLite database |
| 🔒 Encryption | AES-256-CBC encryption |
| 🌙 Dark Mode | Eye-friendly dark theme |
| ⏱️ Auto-Refresh | Codes refresh every 30s |
| 📋 Quick Copy | One-click code copying |
| ✏️ Edit Accounts | Update account information |
| 🗑️ Delete Accounts | Remove unwanted accounts |
| 🔄 Real-time Timer | Visual countdown for codes |
| 💻 Cross-Platform | Windows, macOS, Linux |

## 🎯 Next Steps

1. ✅ Add your most important accounts
2. ✅ Test TOTP codes work on services
3. ✅ Enable dark mode if you prefer
4. ✅ Backup your database
5. ✅ Read the full documentation

## 💡 Pro Tips

- **Organize accounts**: Use clear service names
- **Test before removing**: Verify new TOTP works before removing old 2FA
- **Backup regularly**: Copy database file to safe location
- **Keep secrets safe**: Never share secret keys
- **Update service info**: Update username if you change email

## 🤝 Need Help?

- 📖 Read the documentation
- 🐛 [Report bugs](https://github.com/nguyenquy0710/TOTP-Authenticator/issues)
- 💬 [Ask questions](https://github.com/nguyenquy0710/TOTP-Authenticator/discussions)
- ⭐ Star the project if you like it!

## 📄 License

MIT License - Free to use and modify!

---

**Ready to secure your accounts? Run `npm start` and get started!** 🚀
