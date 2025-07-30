import React from "react";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
function CameraService() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Đang gửi...");

    try {
      const res = await fetch(`${API_URL}/register-camera`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("Gửi thành công!");
        setFormData({ name: "", phone: "", address: "" });
        setTimeout(() => setShowForm(false), 2000);
      } else {
        setStatus("Gửi thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      setStatus("Lỗi kết nối server.");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-20 py-10">
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Dịch vụ Camera An Ninh Viettel
        </h2>
        <div className="mt-8 sm:mt-12 max-w-5xl text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Giám sát an ninh thông minh 24/7</h3>
            <p>
              Hệ thống <strong>Camera An Ninh Viettel</strong> là giải pháp toàn diện giúp bạn giám sát tài sản, gia đình hoặc cơ sở kinh doanh mọi lúc, mọi nơi. Hình ảnh rõ nét chuẩn <strong>Full HD</strong> kết hợp với công nghệ <strong>hồng ngoại ban đêm</strong> giúp quan sát tốt cả trong điều kiện thiếu sáng.
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Lưu trữ đám mây bảo mật</h3>
            <p>
              Mọi video được ghi lại và lưu trữ an toàn trên nền tảng <strong>cloud server đạt chuẩn bảo mật</strong>, hỗ trợ xem lại từ <strong>7–30 ngày</strong>. Bạn có thể truy cập video mọi lúc thông qua ứng dụng di động tương thích với cả iOS và Android.
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Lắp đặt linh hoạt – hoạt động ổn định</h3>
            <p>
              Thiết bị được thiết kế tối ưu để <strong>lắp đặt trong nhà hoặc ngoài trời</strong>, với khả năng <strong>chống nước, chống bụi</strong> theo tiêu chuẩn IP cao. Viettel hỗ trợ khảo sát, tư vấn và thi công lắp đặt tận nơi nhanh chóng, chuyên nghiệp.
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Ưu đãi khi kết hợp với gói Internet</h3>
            <p>
              Khi đăng ký đồng thời dịch vụ <strong>Internet + Camera</strong>, khách hàng sẽ được <strong>miễn phí lắp đặt</strong>, <strong>bảo hành chính hãng 12 tháng</strong> và <strong>hỗ trợ kỹ thuật tận nơi</strong>. Giải pháp lý tưởng cho gia đình, văn phòng, cửa hàng, nhà xưởng và hơn thế nữa.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Layout: Video dọc + 4 ảnh */}
      <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-2 mx-auto gap-4 max-w-7xl md:max-w-3xl">
        {/* 🎥 Video dọc - chiếm 2 hàng bên trái */}
        <div className="col-span-1 row-span-2 md:row-span-1.5">
          <video
            src="/camera_video.mp4"
            controls
            autoPlay
            muted
            loop
            className="w-full h-full object-cover rounded-lg shadow"
          />
        </div>

        {/* 🖼 3 ảnh vuông */}
        <img
          src="camera_image(2).jpg"
          alt="Ảnh vuông 1"
          className="w-full aspect-square object-cover rounded-lg shadow"
        />
        <img
          src="camera_image(3).jpg"
          alt="Ảnh vuông 2"
          className="w-full aspect-square object-cover rounded-lg shadow"
        />
      </div>

      <div className="pt-10 text-center">
        <button
          className="bg-[#ed1b2f] hover:bg-[#c9101f] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 text-base sm:text-lg"
          onClick={() => setShowForm(true)}
        >
          Đăng ký lắp đặt Camera
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold focus:outline-none transition-colors duration-200"
              aria-label="Close"
            >
              ×
            </button>

            {/* Title */}
            <h3 className="text-xl font-bold text-center text-[#c9101f] mb-2">
              Đăng ký lắp đặt Camera
            </h3>

            {status === "Gửi thành công!" ? (
              <div className="mt-6 p-6 text-center bg-white border border-green-200 rounded-xl shadow-md">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-green-100 text-green-600 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Đăng ký thành công!
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cảm ơn bạn đã quan tâm. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể qua số điện thoại đã cung cấp.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 mt-4 text-sm text-gray-800">
                {/* Họ và tên */}
                <div>
                  <label htmlFor="name" className="block font-medium">
                    Họ và tên
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nhập họ tên"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c9101f] transition-all duration-200"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label htmlFor="phone" className="block font-medium">
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c9101f] transition-all duration-200"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Địa chỉ */}
                <div>
                  <label htmlFor="address" className="block font-medium">
                    Địa chỉ lắp đặt
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Nhập địa chỉ"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c9101f] transition-all duration-200"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`w-full bg-[#ed1b2f] hover:bg-[#c9101f] text-white font-semibold py-2 rounded-lg transition duration-200 ${
                    status === "Đang gửi..." ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={status === "Đang gửi..."}
                >
                  {status === "Đang gửi..." ? "Đang gửi..." : "Gửi đăng ký"}
                </button>
              </div>
            )}

            {/* Trạng thái lỗi */}
            {status && status !== "Gửi thành công!" && status !== "Đang gửi..." && (
              <div className="mt-4 text-center text-sm font-medium text-red-600 bg-red-100 py-2 rounded-lg">
                {status}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraService;