# Hướng Dẫn Cài Đặt Chi Tiết - TOTP Authenticator

## Yêu Cầu Hệ Thống

### Phần Mềm Cần Thiết
- **Node.js**: Phiên bản 16.x hoặc cao hơn (khuyến nghị 18.x hoặc 20.x)
- **npm**: Phiên bản 8.x hoặc cao hơn (đi kèm với Node.js)
- **Git**: Để clone repository

### Hệ Điều Hành
- Windows 10/11 (64-bit)
- macOS 10.13 hoặc cao hơn
- Linux (Ubuntu 18.04+, Fedora 28+, Debian 9+)

## Các Bước Cài Đặt

### 1. Cài Đặt Node.js

#### Windows
1. Tải Node.js từ [nodejs.org](https://nodejs.org/)
2. Chạy file cài đặt `.msi`
3. Làm theo hướng dẫn trên màn hình
4. Kiểm tra cài đặt:
   ```bash
   node --version
   npm --version
   ```

#### macOS
Sử dụng Homebrew:
```bash
brew install node
```

Hoặc tải trực tiếp từ [nodejs.org](https://nodejs.org/)

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Clone Repository

```bash
# Clone repository
git clone https://github.com/nguyenquy0710/TOTP-Authenticator.git

# Di chuyển vào thư mục dự án
cd TOTP-Authenticator
```

### 3. Cài Đặt Dependencies

```bash
npm install
```

Quá trình này sẽ cài đặt tất cả các package cần thiết:
- electron: Framework Electron
- better-sqlite3: Database SQLite
- otplib: Thư viện tạo mã TOTP
- electron-builder: Công cụ build ứng dụng

### 4. Chạy Ứng Dụng

#### Development Mode
```bash
npm start
```

#### Chạy Test
```bash
npm test
```

## Build Ứng Dụng

### Build cho Windows (.exe)
```bash
npm run build:win
```

Kết quả: `dist/TOTP Authenticator Setup X.X.X.exe`

### Build cho macOS (.dmg)
```bash
npm run build:mac
```

Kết quả: `dist/TOTP Authenticator-X.X.X.dmg`

### Build cho Linux (.AppImage)
```bash
npm run build:linux
```

Kết quả: `dist/TOTP Authenticator-X.X.X.AppImage`

### Build cho tất cả platform
```bash
npm run build
```

## Xử Lý Sự Cố

### Lỗi: "node-gyp rebuild failed"

**Windows:**
```bash
npm install --global --production windows-build-tools
npm install
```

**Linux:**
```bash
sudo apt-get install build-essential python3
npm install
```

**macOS:**
```bash
xcode-select --install
npm install
```

### Lỗi: "electron not found"

```bash
# Xóa node_modules và cài đặt lại
rm -rf node_modules package-lock.json
npm install
```

### Lỗi build: "Cannot find module 'electron'"

```bash
npm install electron --save-dev
```

### Ứng dụng không khởi động

1. Kiểm tra phiên bản Node.js:
   ```bash
   node --version  # Should be 16.x or higher
   ```

2. Xóa cache và cài đặt lại:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Kiểm tra log lỗi trong console

## Cấu Hình Nâng Cao

### Thay Đổi Cổng Development

Mặc định, Electron sẽ mở ứng dụng trực tiếp. Không cần cấu hình cổng.

### Tùy Chỉnh Icon

1. Chuẩn bị icon PNG (256x256 hoặc 512x512)
2. Đặt file vào `src/assets/icon.png`
3. Build lại ứng dụng

### Thay Đổi Vị Trí Database

Mặc định: `{userData}/accounts.db`

Để thay đổi, sửa file `src/main.js`:
```javascript
const dbPath = path.join(app.getPath('userData'), 'accounts.db');
// Thay bằng:
const dbPath = '/custom/path/to/accounts.db';
```

## Vị Trí File Database

### Windows
```
C:\Users\{Username}\AppData\Roaming\totp-authenticator\accounts.db
```

### macOS
```
~/Library/Application Support/totp-authenticator/accounts.db
```

### Linux
```
~/.config/totp-authenticator/accounts.db
```

## Backup và Restore

### Backup Database

1. Đóng ứng dụng
2. Copy file `accounts.db` từ vị trí trên
3. Lưu trữ file backup an toàn

### Restore Database

1. Đóng ứng dụng
2. Copy file backup vào vị trí database
3. Khởi động lại ứng dụng

**Lưu ý:** Database được mã hóa theo máy tính. Không thể restore database từ máy khác.

## Gỡ Cài Đặt

### Windows
1. Mở "Add or Remove Programs"
2. Tìm "TOTP Authenticator"
3. Click "Uninstall"

### macOS
1. Mở Finder
2. Di chuyển "TOTP Authenticator.app" vào Trash
3. Empty Trash

### Linux
Xóa file AppImage:
```bash
rm /path/to/TOTP\ Authenticator-X.X.X.AppImage
```

### Xóa Dữ Liệu

Sau khi gỡ cài đặt, xóa thư mục dữ liệu:

**Windows:**
```
C:\Users\{Username}\AppData\Roaming\totp-authenticator
```

**macOS:**
```
~/Library/Application Support/totp-authenticator
```

**Linux:**
```
~/.config/totp-authenticator
```

## Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra phần "Xử Lý Sự Cố" ở trên
2. Xem các issue trên GitHub
3. Tạo issue mới với thông tin chi tiết về lỗi
