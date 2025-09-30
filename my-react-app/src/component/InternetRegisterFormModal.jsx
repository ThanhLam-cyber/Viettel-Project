import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
function RegisterFormModal({ onClose, pkg }) {
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
        const payload = {
            ...formData,
            packageName: pkg.name,
            packageType: pkg.type || "DoanhNghiep", // fallback nếu không có type
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
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
                >
                    ×
                </button>

                <h2 className="text-xl font-bold text-[#c9101f] mb-2">
                    Đăng ký gói: {pkg.name}
                </h2>

                {submitted ? (
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
                                Cảm ơn bạn đã quan tâm. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể qua
                                số điện thoại đã cung cấp.
                            </p>
                        </div>
                    </div>


                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-sm text-gray-800">
                        <div>
                            <label className="block font-medium">Họ và tên</label>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c9101f]"
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
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c9101f]"
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
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c9101f]"
                                placeholder="Nhập địa chỉ"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#ed1b2f] hover:bg-[#c9101f] text-white font-semibold py-2 rounded-lg transition duration-200"
                        >
                            {isSubmitting ? "Đang gửi..." : "Gửi đăng ký"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default RegisterFormModal;
