// Component để hiển thị trạng thái kết nối Supabase
'use client';

import { useEffect, useState } from 'react';

export default function SupabaseStatus() {
  const [status, setStatus] = useState<'checking' | 'configured' | 'not-configured'>('checking');

  useEffect(() => {
    // Kiểm tra xem environment variables có được cấu hình đúng không
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const isConfigured = url && key && 
      !url.includes('your-project-ref') && 
      !url.includes('hnzjinaurvzmhvkhsekp') &&
      !key.includes('your-anon-key-here');

    setStatus(isConfigured ? 'configured' : 'not-configured');
  }, []);

  if (status === 'checking') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-blue-700">🔄 Đang kiểm tra cấu hình Supabase...</p>
      </div>
    );
  }

  if (status === 'not-configured') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">
          ⚠️ Supabase chưa được cấu hình
        </h3>
        
        <p className="text-amber-700 mb-4">
          Ứng dụng đang sử dụng giá trị mẫu không hợp lệ. Đây là nguyên nhân gây ra lỗi kết nối.
        </p>
        
        <div className="bg-white rounded p-4 font-mono text-sm mb-4">
          <div>NEXT_PUBLIC_SUPABASE_URL = {process.env.NEXT_PUBLIC_SUPABASE_URL}</div>
          <div>NEXT_PUBLIC_SUPABASE_ANON_KEY = {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 10)}...</div>
        </div>
        
        <p className="text-sm text-amber-600 mb-4">
          Vui lòng làm theo hướng dẫn trong file <strong>HƯỚNG_DẪN_CẤU_HÌNH_SUPABASE.md</strong>
        </p>
        
        <div className="bg-gray-100 rounded p-3 text-sm">
          <div className="font-semibold mb-2">Các bước cần làm:</div>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Tạo project trên <a href="https://supabase.com/dashboard" className="text-blue-600 hover:underline">Supabase Dashboard</a></li>
            <li>Lấy URL và API key từ Settings → API</li>
            <li>Cập nhật file <code className="bg-white px-1 rounded">.env.local</code></li>
            <li>Khởi động lại server với <code className="bg-white px-1 rounded">npm run dev</code></li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
      <p className="text-green-700">✅ Supabase đã được cấu hình đúng!</p>
      <p className="text-sm text-green-600 mt-1">
        URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
      </p>
    </div>
  );
}