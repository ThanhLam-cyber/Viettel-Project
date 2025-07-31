import React, { useState } from "react";
 const API_URL = import.meta.env.VITE_API_URL;
function PackageRegisterFormModal({ onClose, pkg }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Wait for reCAPTCHA to be ready
      await new Promise((resolve) => {
        grecaptcha.enterprise.ready(resolve);
      });

      const token = await grecaptcha.enterprise.execute(
        '6Lfvx5QrAAAAAAmyx2SngvEd7s5NS2GGpkTra96v',
        { action: 'submit' }
      );

      // Prepare payload with package details
      const payload = {
        ...formData,
        packageName: pkg.name,
        packageType: pkg.type || "sim", // Default to 'sim' if type is undefined
        token,
      };

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
      alert("Có lỗi xảy ra.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 relative shadow-xl animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#ED1C24] mb-4">
          Đăng ký gói: {pkg.name}
        </h2>

        {submitted ? (
          <div className="mt-6 p-6 sm:p-8 text-center bg-white border border-green-200 rounded-xl shadow-md">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-green-100 text-green-600 rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
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
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Đăng ký thành công!
              </h3>
              <p className="text-base sm:text-lg text-gray-600">
                Cảm ơn bạn đã quan tâm. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể qua số điện thoại đã cung cấp.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-4 text-base sm:text-lg text-gray-800">
            <div>
              <label className="block font-medium">Họ và tên</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#ED1C24]"
                placeholder="Nhập họ tên"
              />
            </div>

            <div>
              <label className="block font-medium">Số điện thoại</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#ED1C24]"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div>
              <label className="block font-medium">Địa chỉ lắp đặt</label>
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#ED1C24]"
                placeholder="Nhập địa chỉ"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#ED1C24] hover:bg-[#C9101F] text-white font-bold py-2.5 sm:py-3 rounded-lg transition duration-200 text-lg sm:text-xl"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi đăng ký"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PackageRegisterFormModal;   