# Hướng Dẫn Sử Dụng - TOTP Authenticator

## Giới Thiệu

TOTP Authenticator là ứng dụng desktop giúp bạn tạo và quản lý mã xác thực hai yếu tố (2FA) cho các dịch vụ trực tuyến.

## Khởi Động Ứng Dụng

1. Mở ứng dụng "TOTP Authenticator"
2. Giao diện chính sẽ hiển thị với form thêm tài khoản và danh sách tài khoản

## Thêm Tài Khoản Mới

### Bước 1: Mở Form Thêm Tài Khoản

Form thêm tài khoản luôn hiển thị ở phần trên cùng của giao diện.

### Bước 2: Lấy Secret Key

**Từ Dịch Vụ Online:**

1. Đăng nhập vào dịch vụ muốn bảo mật (Google, Facebook, GitHub, v.v.)
2. Vào phần cài đặt bảo mật (Security Settings)
3. Tìm tùy chọn "Two-Factor Authentication" hoặc "2FA"
4. Chọn "Authenticator App"
5. Dịch vụ sẽ hiển thị:
   - QR Code
   - Secret Key (chuỗi ký tự dạng: JBSWY3DPEHPK3PXP)

**Lưu ý:** Nếu chỉ có QR Code, tìm tùy chọn "Can't scan? Enter manually" để xem Secret Key.

### Bước 3: Nhập Thông Tin

1. **Tên Dịch Vụ**: Nhập tên dịch vụ (VD: Google, GitHub, Facebook)
2. **Tên Người Dùng**: Nhập email hoặc username của bạn
3. **Secret Key**: Nhập secret key từ dịch vụ
   - Chỉ chấp nhận ký tự A-Z và 2-7
   - Không phân biệt hoa thường
   - Có thể có hoặc không có khoảng trắng

### Bước 4: Lưu Tài Khoản

Click nút "➕ Thêm Tài Khoản"

Thông báo thành công sẽ hiển thị ở góc trên bên phải.

## Sử Dụng Mã TOTP

### Xem Mã TOTP

Sau khi thêm tài khoản, mã TOTP sẽ tự động được tạo và hiển thị:
- Mã gồm 6 chữ số, hiển thị dạng: `XXX XXX`
- Mã tự động làm mới sau mỗi 30 giây
- Thanh tiến trình màu xanh cho biết thời gian còn lại

### Sao Chép Mã

1. Click nút "📋 Copy" bên cạnh mã TOTP
2. Mã sẽ được sao chép vào clipboard
3. Dán (Ctrl+V / Cmd+V) vào ô xác thực của dịch vụ

### Sử Dụng Mã

1. Đăng nhập vào dịch vụ
2. Khi được yêu cầu mã xác thực:
   - Mở TOTP Authenticator
   - Tìm tài khoản tương ứng
   - Copy mã TOTP
   - Dán vào ô xác thực
3. Click xác nhận

**Lưu ý:** Mỗi mã chỉ có hiệu lực trong 30 giây.

## Quản Lý Tài Khoản

### Sửa Tài Khoản

1. Click nút "✏️ Sửa" trên tài khoản muốn chỉnh sửa
2. Form sẽ được điền sẵn thông tin hiện tại
3. Chỉnh sửa thông tin cần thiết
4. Click "💾 Cập Nhật" để lưu
5. Hoặc click "❌ Hủy" để hủy thay đổi

**Chú ý:** Nếu thay đổi Secret Key, mã TOTP cũ sẽ không còn hoạt động.

### Xóa Tài Khoản

1. Click nút "🗑️ Xóa" trên tài khoản muốn xóa
2. Xác nhận xóa trong hộp thoại
3. Tài khoản sẽ bị xóa vĩnh viễn

**Cảnh báo:** Không thể khôi phục sau khi xóa!

## Chế Độ Tối (Dark Mode)

### Bật/Tắt Dark Mode

1. Click biểu tượng mặt trăng/mặt trời ở góc trên bên phải
2. Giao diện sẽ chuyển đổi giữa chế độ sáng và tối
3. Cài đặt sẽ được lưu tự động

**Mẹo:** Chế độ tối giúp giảm mỏi mắt khi sử dụng lâu.

## Bảo Mật

### Bảo Vệ Tài Khoản

- Secret keys được mã hóa trước khi lưu vào database
- Database được lưu trữ cục bộ trên máy tính
- Không chia sẻ secret key với bất kỳ ai
- Không gửi secret key qua email hoặc tin nhắn

### Backup Dữ Liệu

**Khuyến nghị:**
1. Backup file database thường xuyên
2. Lưu trữ backup ở nơi an toàn
3. Backup trước khi:
   - Cài đặt lại hệ điều hành
   - Nâng cấp máy tính
   - Thay đổi cấu hình hệ thống

**Xem hướng dẫn backup trong INSTALL.md**

### Lưu Ý Quan Trọng

⚠️ **Database được mã hóa theo máy tính:**
- Không thể sử dụng database từ máy khác
- Không thể restore database vào máy khác
- Giữ secret keys gốc để thiết lập lại nếu cần

## Khắc Phục Sự Cố

### Mã TOTP Không Đúng

**Nguyên nhân:**
1. Thời gian hệ thống không chính xác
2. Secret key nhập sai
3. Đã hết thời gian hiệu lực của mã

**Giải pháp:**
1. Kiểm tra và đồng bộ thời gian hệ thống
2. Xác nhận lại secret key
3. Đợi mã mới được tạo

### Không Thể Thêm Tài Khoản

**Kiểm tra:**
- Tất cả trường đã được điền
- Secret key đúng định dạng (A-Z, 2-7)
- Không có ký tự đặc biệt trong secret key

### Mã Hiển Thị "ERROR"

**Nguyên nhân:**
- Secret key không hợp lệ
- Lỗi giải mã

**Giải pháp:**
1. Xóa tài khoản có lỗi
2. Thêm lại với secret key mới từ dịch vụ

## Mẹo Sử Dụng

### Tổ Chức Tài Khoản

- Đặt tên dịch vụ rõ ràng
- Thêm prefix nếu có nhiều tài khoản cùng dịch vụ
  - VD: "Google - Work", "Google - Personal"

### Tối Ưu Workflow

1. Sắp xếp tài khoản theo thứ tự sử dụng
2. Xóa tài khoản không còn dùng
3. Cập nhật thông tin khi đổi email/username

### Shortcuts

- **Ctrl/Cmd + C**: Copy mã sau khi click vào
- **Tab**: Di chuyển giữa các trường trong form
- **Enter**: Submit form

## Câu Hỏi Thường Gặp

### Q: Tôi có thể sử dụng trên nhiều máy tính không?

A: Có, nhưng phải thiết lập lại tài khoản trên mỗi máy. Database không thể chuyển giữa các máy.

### Q: Tôi mất secret key gốc, làm sao?

A: Liên hệ dịch vụ để reset 2FA và lấy secret key mới.

### Q: Ứng dụng có yêu cầu internet không?

A: Không. Ứng dụng hoạt động hoàn toàn offline.

### Q: Mã TOTP có giống Google Authenticator không?

A: Có, cùng chuẩn TOTP (RFC 6238).

### Q: Tôi có thể import từ Google Authenticator không?

A: Hiện tại chưa hỗ trợ. Bạn cần thêm tài khoản thủ công.

### Q: Database có được đồng bộ không?

A: Không. Database chỉ lưu trữ cục bộ.

## Hỗ Trợ

Cần trợ giúp thêm?
- Đọc [README.md](README.md) để biết thêm chi tiết
- Xem [INSTALL.md](INSTALL.md) về cài đặt
- Tạo issue trên GitHub: https://github.com/nguyenquy0710/TOTP-Authenticator/issues
