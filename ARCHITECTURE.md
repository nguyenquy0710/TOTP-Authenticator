# Kiến Trúc Ứng Dụng - TOTP Authenticator

## Tổng Quan

```
┌──────────────────────────────────────────────────────────────┐
│                    TOTP Authenticator                         │
│                    Desktop Application                        │
└──────────────────────────────────────────────────────────────┘
```

## Cấu Trúc Thư Mục

```
TOTP-Authenticator/
│
├── src/                          # Mã nguồn chính
│   ├── main.js                   # Electron main process
│   ├── preload.js                # IPC bridge (security)
│   ├── index.html                # Giao diện người dùng
│   ├── styles.css                # CSS styling (dark mode)
│   ├── renderer.js               # Frontend logic
│   │
│   ├── utils/                    # Utilities
│   │   ├── database.js           # SQLite operations
│   │   └── crypto.js             # Encryption/Decryption
│   │
│   └── assets/                   # Tài nguyên
│       └── icon.png              # App icon
│
├── package.json                  # Dependencies & scripts
├── package-lock.json             # Dependency lock
│
├── test.js                       # Test suite
│
├── README.md                     # Tài liệu chính
├── INSTALL.md                    # Hướng dẫn cài đặt
├── USAGE.md                      # Hướng dẫn sử dụng
├── SECURITY.md                   # Tài liệu bảo mật
├── ARCHITECTURE.md               # Tài liệu này
│
├── .gitignore                    # Git ignore rules
└── LICENSE                       # MIT License
```

## Luồng Dữ Liệu

```
┌─────────────────┐
│   User Input    │
│  (index.html)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Renderer.js    │  ← Frontend Logic
│  (Validation)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Preload.js    │  ← IPC Bridge (Security Layer)
│ (contextBridge) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Main.js      │  ← Main Process
│  (IPC Handlers) │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌──────┐  ┌──────┐
│Crypto│  │ DB   │  ← Data Layer
└──────┘  └──────┘
    │         │
    └────┬────┘
         ▼
    ┌─────────┐
    │accounts │  ← SQLite Database
    │  .db    │
    └─────────┘
```

## Components Chi Tiết

### 1. Main Process (main.js)

**Chức năng:**
- Khởi tạo Electron app
- Tạo Browser Window
- Khởi tạo Database và Crypto
- Xử lý IPC handlers

**IPC Handlers:**
```javascript
- get-accounts     → Lấy danh sách tài khoản
- add-account      → Thêm tài khoản mới
- update-account   → Cập nhật tài khoản
- delete-account   → Xóa tài khoản
- generate-totp    → Tạo mã TOTP
```

**Dependencies:**
- electron
- utils/database
- utils/crypto
- otplib

### 2. Preload Script (preload.js)

**Chức năng:**
- Security layer giữa renderer và main process
- Expose safe APIs thông qua contextBridge
- Prevent direct Node.js access từ renderer

**Exposed APIs:**
```javascript
window.api = {
  getAccounts()
  addAccount(data)
  updateAccount(data)
  deleteAccount(id)
  generateTOTP(secret)
}
```

**Security:**
- contextIsolation: true
- nodeIntegration: false

### 3. Renderer Process (renderer.js)

**Chức năng:**
- Frontend application logic
- Event handlers
- DOM manipulation
- TOTP display và countdown

**Modules:**
```javascript
- Theme Management    → Dark/Light mode
- Account Management  → CRUD operations
- TOTP Display        → Code generation và timer
- Form Handling       → Validation và submission
- Notification        → Toast messages
```

**State:**
```javascript
{
  accounts: [],           // Danh sách tài khoản
  editingAccountId: null, // ID đang edit
  totpIntervals: {}       // TOTP timers
}
```

### 4. Database Module (utils/database.js)

**Chức năng:**
- SQLite database operations
- CRUD operations cho accounts

**Schema:**
```sql
accounts (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  service_name  TEXT NOT NULL,
  username      TEXT NOT NULL,
  secret_key    TEXT NOT NULL,      -- Encrypted
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

**Methods:**
```javascript
- constructor(dbPath)     → Initialize database
- initDatabase()          → Create tables
- getAllAccounts()        → Get all accounts
- getAccountById(id)      → Get account by ID
- addAccount(data)        → Add new account
- updateAccount(id, data) → Update account
- deleteAccount(id)       → Delete account
- close()                 → Close database
```

### 5. Crypto Module (utils/crypto.js)

**Chức năng:**
- Mã hóa/giải mã secret keys
- Machine-specific encryption

**Encryption:**
```javascript
Algorithm: AES-256-CBC
Key: SHA256(hostname + platform + arch)
IV: Random 16 bytes per encryption
Format: IV:encrypted_data (hex)
```

**Methods:**
```javascript
- constructor()           → Initialize crypto
- encrypt(text)           → Encrypt text
- decrypt(encryptedData)  → Decrypt data
```

### 6. UI Layer (index.html + styles.css)

**Components:**
```
┌──────────────────────────────────────┐
│  Header                               │
│  [TOTP Authenticator]    [Dark Mode] │
├──────────────────────────────────────┤
│  Form Section                         │
│  ┌────────────────────────────────┐  │
│  │ Service Name: [_________]      │  │
│  │ Username:     [_________]      │  │
│  │ Secret Key:   [_________]      │  │
│  │ [Add] [Cancel]                 │  │
│  └────────────────────────────────┘  │
├──────────────────────────────────────┤
│  Accounts List                        │
│  ┌────────────────────────────────┐  │
│  │ Google - user@gmail.com        │  │
│  │ TOTP: 123 456    [Edit] [Del]  │  │
│  │ [████████░░░░░░] 15s remaining │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ GitHub - developer             │  │
│  │ ...                            │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

**Themes:**
- Light Mode (default)
- Dark Mode (persisted in localStorage)

## Security Architecture

```
┌──────────────────────────────────────┐
│         Security Layers               │
├──────────────────────────────────────┤
│ 1. Context Isolation                 │
│    - No direct Node.js access        │
│    - Preload script bridge           │
├──────────────────────────────────────┤
│ 2. IPC Security                      │
│    - Controlled API exposure         │
│    - Input validation                │
├──────────────────────────────────────┤
│ 3. Data Encryption                   │
│    - AES-256-CBC                     │
│    - Machine-specific key            │
├──────────────────────────────────────┤
│ 4. Database Security                 │
│    - Prepared statements             │
│    - User-only file access           │
├──────────────────────────────────────┤
│ 5. XSS Prevention                    │
│    - HTML escaping                   │
│    - No eval or innerHTML with user  │
└──────────────────────────────────────┘
```

## Data Flow Examples

### Thêm Tài Khoản

```
User fills form
     ↓
Renderer validates input
     ↓
renderer.js → handleFormSubmit()
     ↓
window.api.addAccount(data)
     ↓
preload.js → ipcRenderer.invoke('add-account', data)
     ↓
main.js → ipcMain.handle('add-account')
     ↓
crypto.encrypt(secret_key)
     ↓
db.addAccount(encrypted_data)
     ↓
SQLite INSERT
     ↓
Return success
     ↓
Reload accounts
     ↓
Display updated list
```

### Hiển Thị TOTP

```
Load accounts
     ↓
For each account
     ↓
window.api.generateTOTP(secret)
     ↓
preload.js → ipcRenderer.invoke('generate-totp')
     ↓
main.js → authenticator.generate(secret)
     ↓
Return { token, timeRemaining }
     ↓
Display formatted code
     ↓
Update timer bar
     ↓
Refresh every second
```

## Technology Stack

### Core
- **Electron** ^27.0.0 - Desktop app framework
- **Node.js** 20.x - Runtime environment

### Database
- **better-sqlite3** ^9.0.0 - SQLite database

### Security
- **crypto** (built-in) - Encryption/Decryption

### TOTP
- **otplib** ^12.0.1 - TOTP generation

### Build
- **electron-builder** ^24.6.4 - App packaging

## Build Process

```
Source Code (src/)
     ↓
npm install
     ↓
electron-builder
     ↓
┌────────────────┐
│ Platform Build │
├────────────────┤
│ Windows: .exe  │
│ macOS:   .dmg  │
│ Linux:   .AppImage
└────────────────┘
     ↓
dist/
```

## Performance Considerations

### Database
- ✓ Synchronous operations (better-sqlite3)
- ✓ In-memory operations are fast
- ✓ Prepared statements for repeated queries

### TOTP Generation
- ✓ Cached in memory
- ✓ Updated only when needed (every 1s)
- ✓ Efficient timer management

### UI
- ✓ CSS animations with GPU acceleration
- ✓ Minimal re-renders
- ✓ Event delegation where possible

### Memory
- ✓ Clear intervals on component unmount
- ✓ Limit stored data in memory
- ✓ Efficient DOM updates

## Testing

```
test.js
  ├─ Database Tests
  │   ├─ Create accounts
  │   ├─ Read accounts
  │   ├─ Update accounts
  │   └─ Delete accounts
  │
  ├─ Crypto Tests
  │   ├─ Encryption
  │   ├─ Decryption
  │   └─ Round-trip validation
  │
  └─ TOTP Tests
      ├─ Code generation
      ├─ Time remaining
      └─ Validation
```

## Future Enhancements

### Planned Features
- [ ] Import from Google Authenticator
- [ ] Export accounts (encrypted)
- [ ] Backup/Restore functionality
- [ ] Search/Filter accounts
- [ ] Categories/Tags
- [ ] QR code scanner
- [ ] Auto-sync (optional)

### Security Improvements
- [ ] Master password option
- [ ] Biometric authentication
- [ ] Auto-lock after inactivity
- [ ] Secure clipboard clearing

### UI/UX
- [ ] More themes
- [ ] Custom hotkeys
- [ ] System tray integration
- [ ] Notifications
- [ ] Multi-language support

## Resources

### Documentation
- [Electron Documentation](https://www.electronjs.org/docs)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [TOTP RFC 6238](https://tools.ietf.org/html/rfc6238)

### Dependencies
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- [otplib](https://github.com/yeojz/otplib)
- [electron-builder](https://www.electron.build/)

## Maintenance

### Update Dependencies
```bash
npm update
npm audit fix
```

### Version Bumps
```bash
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
```

### Release Process
1. Update version in package.json
2. Update CHANGELOG.md
3. Run tests: `npm test`
4. Build: `npm run build`
5. Test built app
6. Create git tag
7. Push to repository
8. Create GitHub release

## Support

- **Issues**: [GitHub Issues](https://github.com/nguyenquy0710/TOTP-Authenticator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nguyenquy0710/TOTP-Authenticator/discussions)
- **Documentation**: See README.md, INSTALL.md, USAGE.md, SECURITY.md
