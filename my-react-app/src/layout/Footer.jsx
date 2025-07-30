import React from "react";
// import LogoViettel from "../assets/logos/LogoViettel.png";
export default function Footer() {
  return (
<footer className="bg-[#f9f9f9] text-black py-10 px-4 sm:px-6 lg:px-20">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">

    {/* Logo + mô tả */}
    <div>
      <img src={LogoViettel} alt="Viettel" className="h-10 mb-4" />
      <p className="text-gray-600 leading-relaxed">
        <span className="text-[#ed1b2f] font-semibold">Viettel</span> – tiên phong trong chuyển đổi số, cung cấp giải pháp viễn thông, công nghệ và dịch vụ tiện ích số toàn diện.
      </p>
    </div>

    {/* Liên kết nhanh */}
    <div>
      <h3 className="text-[#ed1b2f] font-semibold mb-3">Liên kết nhanh</h3>
      <ul className="space-y-2">
        <li><a href="/" className="hover:text-[#ed1b2f] font-medium">Trang chủ</a></li>
        <li><a href="/goi-cuoc" className="hover:text-[#ed1b2f] font-medium">Gói cước</a></li>
        <li><a href="/internet" className="hover:text-[#ed1b2f] font-medium">Internet/TV</a></li>
        <li><a href="/camera" className="hover:text-[#ed1b2f] font-medium">Camera</a></li>
      </ul>
    </div>

    {/* Hỗ trợ khách hàng */}
    <div>
      <h3 className="text-[#ed1b2f] font-semibold mb-3">Hỗ trợ</h3>
      <ul className="space-y-2">
        <li>
          Hotline: <a href="tel:18008098" className="text-[#ed1b2f] font-semibold underline">1800 8098</a>
        </li>
        <li>
          Email: <a href="mailto:support@viettel.com.vn" className="hover:text-[#ed1b2f] font-medium">support@viettel.com.vn</a>
        </li>
        <li><a href="/faqs" className="hover:text-[#ed1b2f] font-medium">Câu hỏi thường gặp</a></li>
        <li><a href="/lien-he" className="hover:text-[#ed1b2f] font-medium">Liên hệ</a></li>
      </ul>
    </div>

    {/* Chính sách */}
    <div>
      <h3 className="text-[#ed1b2f] font-semibold mb-3">Chính sách</h3>
      <ul className="space-y-2">
        <li><a href="/bao-mat" className="hover:text-[#ed1b2f] font-medium">Chính sách bảo mật</a></li>
        <li><a href="/dieu-khoan" className="hover:text-[#ed1b2f] font-medium">Điều khoản sử dụng</a></li>
        <li><a href="/quyen-loi" className="hover:text-[#ed1b2f] font-medium">Quyền lợi khách hàng</a></li>
      </ul>
    </div>
  </div>

  {/* Copyright */}
  <div className="border-t border-gray-300 mt-10 pt-6 text-center text-xs text-gray-500">
    © {new Date().getFullYear()} <span className="text-[#ed1b2f] font-medium">Viettel</span>. Đã đăng ký bản quyền.
  </div>
</footer>

  );
}
