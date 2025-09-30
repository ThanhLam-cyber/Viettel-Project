import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import BuisinessPackageRegisterForm from "../component/BuisinessPackageRegisterForm";
const API_URL = import.meta.env.VITE_API_URL;
function BuisinessPackage() {
    const [packages, setPackages] = useState([]);
    const [note, setNote] = useState("");
    const [showNote, setShowNote] = useState(true);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/business_package`)
            .then((res) => res.json())
            .then((data) => {
               setPackages(data.business_package);
                setNote(data.metadataNote);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi tải gói cước:", err);
                setError("Không thể tải dữ liệu gói cước. Vui lòng thử lại sau.");
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-white py-6 px-4 md:px-12 lg:px-24 font-roboto">
            <div className="max-w-7xl mx-auto">
                {/* Header with Logo */}
            
                <h2 >
                    GÓI CƯỚC INTERNET DOANH NGHIỆP
                </h2>
                <p className="text-center text-[#666666] mb-6 text-sm">
                    Tốc độ cao - Ổn định - Phù hợp mọi nhu cầu doanh nghiệp
                </p>

                {/* Error Message */}
                {error && (
                    <div className="text-center text-[#D70026] text-sm mb-4">{error}</div>
                )}

                {/* Loading Spinner */}
                {isLoading ? (
                    <div className="text-center py-4">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#D70026] border-t-transparent"></div>
                    </div>
                ) : (
                    <>
                        {/* Packages Table */}
                        <div className="overflow-x-auto rounded-lg">
                            <table className="w-full border-collapse bg-white shadow-md  border-l-2 rounded-lg border-[#D70026]">
                                <thead>
                                    <tr className="bg-[#D70026] text-white">
                                        <th className="py-2 px-3 text-left font-semibold text-xs">Gói Cước</th>
                                        <th className="py-2 px-3 text-left font-semibold text-xs">Băng Thông Trong Nước</th>
                                        <th className="py-2 px-3 text-left font-semibold text-xs">Băng Thông Quốc Tế</th>
                                        <th className="py-2 px-3 text-left font-semibold text-xs">Giá (VNĐ/Tháng)</th>
                                        <th className="py-2 px-3 text-left font-semibold text-xs">Hành Động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packages?.map((pkg, index) => (
                                        <tr
                                            key={index}
                                            className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                                        >
                                            <td className="py-2 px-3 text-[#333333] font-medium text-xs">{pkg.name}</td>
                                            <td className="py-2 px-3 text-[#666666] text-xs">{pkg.domesticBandwidth}</td>
                                            <td className="py-2 px-3 text-[#666666] text-xs">{pkg.internationalBandwidth}</td>
                                            <td className="py-2 px-3 text-[#666666] text-xs font-bold ">
                                                {pkg.price.toLocaleString()+'đ '}
                                            </td>
                                            <td className="py-2 px-3">
                                                <button
                                                    onClick={() => setSelectedPackage(pkg)}
                                                    className="bg-[#D70026] text-white py-1 px-3 rounded-sm hover:bg-[#b80020] transition-colors text-xs font-semibold"
                                                >
                                                    ĐĂNG KÝ
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="h-10"></div>
                        {/* Promotion Banner */}
                        {note && (
                            <div className="mb-6 bg-[#D70026] text-white rounded-md p-4 shadow-md">
                                <button
                                    className="flex items-center text-base font-bold mb-2 focus:outline-none"
                                    onClick={() => setShowNote(!showNote)}
                                >
                                    <FaInfoCircle className="mr-2" />
                                    KHUYẾN MÃI & LƯU Ý
                                </button>
                                {showNote && (
                                    <div className="text-sm whitespace-pre-line">
                                        {note}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {selectedPackage && (
                    <BuisinessPackageRegisterForm
                        pkg={selectedPackage}
                        onClose={() => setSelectedPackage(null)}
                    />
                )}
            </div>
        </div>
    );
}

export default BuisinessPackage;