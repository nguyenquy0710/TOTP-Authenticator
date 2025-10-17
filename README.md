# TOTP Authenticator

Ứng dụng desktop TOTP Authenticator được xây dựng bằng Electron, NeDB, và Node.js với giao diện thân thiện và hỗ trợ chế độ tối (dark mode).

## ✨ Tính Năng

- 🔐 Tạo mã TOTP (Time-based One-Time Password) tự động
- 💾 Lưu trữ tài khoản an toàn với NeDB (MongoDB Lite)
- 🔒 Mã hóa secret key trước khi lưu trữ
- ➕ Thêm, sửa, xóa tài khoản dễ dàng
- 📋 Sao chép mã TOTP nhanh chóng
- 🌙 Hỗ trợ chế độ tối (Dark Mode)
- 🎨 Giao diện đẹp và thân thiện
- ⏱️ Hiển thị thời gian còn lại của mã TOTP

## 🚀 Cài Đặt

### Yêu Cầu Hệ Thống

- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn

### Cài Đặt Dependencies

```bash
# Clone repository
git clone https://github.com/nguyenquy0710/TOTP-Authenticator.git
cd TOTP-Authenticator

# Cài đặt các package cần thiết
npm install
```

## 🎯 Chạy Ứng Dụng

### Chế Độ Development

```bash
npm start
```

### Build Ứng Dụng

#### Windows (.exe)
```bash
npm run build:win
```

#### macOS (.dmg)
```bash
npm run build:mac
```

#### Linux (.AppImage)
```bash
npm run build:linux
```

File build sẽ được tạo trong thư mục `dist/`

## 📖 Hướng Dẫn Sử Dụng

### 1. Thêm Tài Khoản Mới

1. Mở ứng dụng TOTP Authenticator
2. Điền thông tin vào form:
   - **Tên Dịch Vụ**: Tên dịch vụ (VD: Google, Facebook, GitHub)
   - **Tên Người Dùng**: Email hoặc username của bạn
   - **Secret Key**: Mã bí mật từ dịch vụ (định dạng Base32: A-Z và 2-7)
3. Click nút "Thêm Tài Khoản"

### 2. Sử Dụng Mã TOTP

- Mã TOTP sẽ tự động được tạo và hiển thị cho mỗi tài khoản
- Mã sẽ tự động làm mới sau mỗi 30 giây
- Click nút "Copy" để sao chép mã vào clipboard
- Thanh tiến trình hiển thị thời gian còn lại của mã

### 3. Sửa Tài Khoản

1. Click nút "Sửa" trên tài khoản muốn chỉnh sửa
2. Cập nhật thông tin trong form
3. Click "Cập Nhật" để lưu thay đổi

### 4. Xóa Tài Khoản

1. Click nút "Xóa" trên tài khoản muốn xóa
2. Xác nhận xóa trong dialog

### 5. Chuyển Đổi Dark Mode

- Click nút biểu tượng mặt trăng/mặt trời ở góc trên bên phải
- Theme sẽ được lưu tự động cho lần sử dụng sau

## 🏗️ Cấu Trúc Dự Án

```
TOTP-Authenticator/
├── src/
│   ├── assets/          # Icon và tài nguyên
│   ├── utils/           # Các module tiện ích
│   │   ├── database.js  # Quản lý NeDB database
│   │   └── crypto.js    # Mã hóa/giải mã dữ liệu
│   ├── main.js          # Electron main process
│   ├── preload.js       # Preload script (IPC bridge)
│   ├── index.html       # Giao diện người dùng
│   ├── styles.css       # CSS styling
│   └── renderer.js      # Frontend logic
├── package.json         # Dependencies và scripts
└── README.md           # Tài liệu
```

## 🔧 Công Nghệ Sử Dụng

- **Electron**: Framework để xây dựng ứng dụng desktop đa nền tảng
- **NeDB**: Nhúng database (MongoDB Lite) cho Node.js & Electron
- **otplib**: Thư viện tạo mã TOTP
- **crypto**: Module mã hóa của Node.js
- **electron-builder**: Đóng gói ứng dụng

## 🔒 Bảo Mật

- Secret keys được mã hóa bằng AES-256-CBC trước khi lưu vào database
- Key mã hóa được tạo từ thông tin máy tính (machine-specific)
- Context isolation được bật trong Electron
- IPC communication được bảo vệ thông qua preload script
- Database được lưu trong user data directory

## 📝 Database Schema

NeDB sử dụng schema document-based (giống MongoDB):
```javascript
{
  _id: "unique_id",              // Tự động tạo bởi NeDB
  service_name: "Google",        // Tên dịch vụ
  username: "user@gmail.com",    // Tên người dùng
  secret_key: "encrypted_key",   // Secret key đã mã hóa
  createdAt: Date,               // Tự động tạo
  updatedAt: Date                // Tự động cập nhật
}
```

## 🤝 Đóng Góp

Mọi đóng góp đều được chào đón! Hãy tạo pull request hoặc mở issue để thảo luận.

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## ⚠️ Lưu Ý

- Đảm bảo giữ secret keys an toàn
- Không chia sẻ file database với người khác
- Backup database thường xuyên (file `accounts.db` trong user data directory)
- Secret key phải ở định dạng Base32 (chỉ chứa A-Z và 2-7)

## 📞 Hỗ Trợ

Nếu gặp vấn đề, vui lòng tạo issue trên GitHub repository.