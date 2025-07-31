import React, { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

fetch(`${API_URL}/sim-data`)
  .then(res => res.json())
  .then(data => console.log(data));

function BuisinessPackageRegisterForm({ onClose, pkg }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await new Promise((resolve) => {
                grecaptcha.enterprise.ready(resolve);
            });

            const token = await grecaptcha.enterprise.execute(
                '6LcVEZUrAAAAAP-OdIHzIR932u0fJKjRAJ-YITot',
                { action: 'submit' }
            );

            const payload = {
                ...formData,
                packageName: pkg.name,
                packageType: pkg.type || "DoanhNghiep",
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
                setError("Đăng ký thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi gửi dữ liệu:", error);
            setError("Có lỗi xảy ra. Vui lòng thử lại.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Tự động đóng modal sau 3 giây khi đăng ký thành công
    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submitted, onClose]);

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4 sm:px-6 font-roboto">
            <div className="bg-white border-t-4 border-[#D70026] rounded-lg w-full max-w-lg p-6 relative shadow-lg animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-[#333333] hover:text-[#D70026] text-xl font-bold transition-colors duration-200"
                >
                    ×
                </button>


                <h2 className="text-lg font-bold text-[#333333] mb-4 text-center">
                    Đăng Ký Gói: {pkg.name}
                </h2>

                {submitted ? (
                    <div className="mt-4 p-4 text-center bg-white border border-[#D70026] rounded-lg shadow-sm animate-pulse-once">
                        <div className="flex flex-col items-center gap-3">
                            <div className="bg-[#D70026] text-white rounded-full p-2 animate-bounce">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
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
                            <h3 className="text-base font-semibold text-[#333333]">
                                Đăng Ký Thành Công!
                            </h3>
                            <p className="text-sm text-[#666666]">
                                Viettel sẽ liên hệ bạn sớm qua số điện thoại đã đăng ký.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-4 bg-[#D70026] hover:bg-[#b80020] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-[#333333]">
                        <div>
                            <label className="block font-medium text-sm">Họ và Tên</label>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D70026] transition-colors duration-200"
                                placeholder="Nhập họ tên"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-sm">Số Điện Thoại</label>
                            <input
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D70026] transition-colors duration-200"
                                placeholder="Nhập số điện thoại"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-sm">Địa Chỉ Lắp Đặt</label>
                            <input
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D70026] transition-colors duration-200"
                                placeholder="Nhập địa chỉ"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-[#D70026] mt-2">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-[#D70026] to-[#b80020] hover:from-[#b80020] hover:to-[#a0001b] text-white font-semibold py-2 rounded-lg transition-all duration-300 text-sm disabled:opacity-50"
                        >
                            {isSubmitting ? "Đang Gửi..." : "GỬI ĐĂNG KÝ"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default BuisinessPackageRegisterForm;