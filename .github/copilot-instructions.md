# Hướng Dẫn Phát Triển - TOTP Authenticator

## Kiến Trúc Tổng Quan

Đây là **ứng dụng desktop Electron** để tạo mã TOTP (Time-based One-Time Password). Ứng dụng sử dụng **kiến trúc 3 tiến trình**:
- **Main Process** (`src/main.js`) - quản lý vòng đời ứng dụng và thao tác database
- **Renderer Process** (`src/renderer.js`) - xử lý UI và logic frontend  
- **Preload Script** (`src/preload.js`) - cầu nối IPC bảo mật giữa main/renderer

Luồng dữ liệu chính: **UI → IPC → Main Process → Database/Crypto → Phản hồi về UI**

## Thành Phần Cốt Lõi & Mẫu Thiết Kế

### Lớp Database (`src/utils/database.js`)
- Sử dụng **NeDB** cho các thao tác database (document-based, giống MongoDB)
- Schema: documents với các trường `_id`, `service_name`, `username`, `secret_key` (mã hóa), `createdAt`, `updatedAt`
- Đường dẫn database: `app.getPath('userData')/accounts.db` (theo user)

### Lớp Bảo Mật (`src/utils/crypto.js`)
- **Mã hóa AES-256-CBC** cho secret keys trước khi lưu database
- Key mã hóa dựa trên máy: `os.hostname() + os.platform() + os.arch()`
- Định dạng: `iv:encryptedData` (IV được đặt trước chuỗi mã hóa)

### Mẫu Giao Tiếp IPC
```javascript
// Preload expose: window.api.methodName()
// Main xử lý: ipcMain.handle('method-name', ...)
// Luôn dùng invoke/handle, không bao giờ dùng send/on
```

## Quy Trình Phát Triển

### Chạy & Kiểm Thử
```bash
npm start                    # Chế độ development (mở DevTools)
npm test                     # Chạy test.js - test chức năng core không có UI
npm run build:win/mac/linux  # Build theo platform
```

### Chiến Lược Kiểm Thử
- **`test.js`** - test headless cho database, crypto, và tạo TOTP
- Không có framework test UI Electron - test trực tiếp các module core
- Luôn dọn dẹp test database (`test-accounts.db`) trước khi chạy

## Quy Ước Riêng Của Dự Án

### Triển Khai TOTP
- Sử dụng thư viện **otplib** để tạo TOTP (chu kỳ 30 giây)
- Secret keys phải ở **định dạng Base32** (chỉ A-Z, 2-7)
- UI hiển thị đồng hồ đếm ngược và tự động làm mới mã

### Hệ Thống Theme
- **CSS custom properties** cho dark/light mode (thuộc tính `data-theme`)
- Lưu theme qua `localStorage.theme`
- Icon toggle chuyển đổi giữa 🌙/☀️

### Mẫu Xử Lý Lỗi
```javascript
// Luôn wrap các thao tác crypto trong try-catch
// Hiển thị thông báo thân thiện qua showNotification()
// Log lỗi chi tiết ra console để debug
```

## Điểm Tích Hợp

### Mô Hình Bảo Mật Electron
- Bắt buộc `contextIsolation: true` và `nodeIntegration: false`
- Mọi truy cập Node.js qua API surface của preload script
- Không có lệnh gọi require() trực tiếp trong renderer process

### Vị Trí File
- Dữ liệu app: `app.getPath('userData')` (thư mục user theo platform)
- Icons: thư mục `src/assets/`
- Build output: thư mục `dist/` (đã gitignore)

## Ghi Chú Phát Triển

- **Comments/docs tiếng Việt** xuyên suốt codebase - điều này có chủ ý
- Cấu hình build dùng **electron-builder** với NSIS cho Windows
- DevTools tự động mở chỉ trong development mode
- Schema database dùng NeDB với timestamps `createdAt`/`updatedAt` tự động

## Tác Vụ Thường Gặp

Khi **thêm tính năng mới**: Cập nhật cả API surface của preload và các handler ipcMain tương ứng
Khi **sửa đổi mã hóa**: Đảm bảo tương thích ngược với dữ liệu đã mã hóa
Khi **cập nhật UI**: Kiểm tra tương thích cả light/dark theme trong `styles.css`

## Mẹo Hiệu Quả

- Secret key validation: dùng regex `/^[A-Z2-7]+=*$/` cho Base32
- Theme toggle: event listener duy nhất, state lưu localStorage
- Database operations: NeDB dùng promises, các truy vấn không cần prepared statements
- TOTP refresh: setInterval 1 giây, tính toán thời gian còn lại từ epoch
- Error notifications: timeout 3 giây, class CSS `notification-error/success`