# Hướng dẫn cấu hình Supabase

## Lỗi hiện tại
Ứng dụng đang bị lỗi kết nối đến Supabase với domain không tồn tại:
`hnzjinaurvzmhvkhsekp.supabase.co`

## Cách khắc phục

### Bước 1: Tạo project Supabase
1. Truy cập [Supabase Dashboard](https://supabase.com/dashboard)
2. Đăng nhập hoặc tạo tài khoản mới
3. Tạo project mới

### Bước 2: Lấy thông tin API
1. Sau khi tạo project, vào **Settings → API**
2. Copy các giá trị:
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **anon/public key**: Bắt đầu với `sb_publishable_` hoặc `eyJ...`

### Bước 3: Cập nhật file .env.local
Mở file `.env.local` và thay thế bằng giá trị thực:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### Bước 4: Khởi động lại server
```bash
npm run dev
```

### Bước 5: Kiểm tra kết nối
Truy cập http://localhost:3000 và kiểm tra xem lỗi đã biến mất chưa

## Lưu ý quan trọng
- Không chia sẻ file `.env.local` chứa API key thực
- API key phải bắt đầu bằng `sb_publishable_` hoặc `eyJ` (JWT token)
- Project URL phải là domain Supabase thực của bạn

## Nếu cần hỗ trợ thêm
Hãy cung cấp:
1. Bạn đã có project Supabase chưa?
2. Bạn có thể truy cập Supabase Dashboard không?