import { Gift, CalendarDays, BadgeDollarSign, CheckCircle } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import giftIcon from "../assets/images/gift-svgrepo-com.svg";
import InternetServiceCard from "../component/InternetService_Card";
import RegisterFormModal from "../component/InternetRegisterFormModal";
import DanhSachKenhImage from "/danh_sach_kenh.png"
function InternetPlanDetail() {
  const { planCode } = useParams();
  const [internetData, setInternetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const API_URL = import.meta.env.VITE_API_URL;
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/internet-data`);
        if (!response.ok) {
          throw new Error("Failed to fetch internet data");
        }
        const data = await response.json();
        if (process.env.NODE_ENV === "development") {
          console.log("👉 Internet data nhận từ API:", data);
        }
        setInternetData(data);
      } catch (err) {
        console.error("Lỗi fetch internet data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div className="text-center text-gray-600 text-lg sm:text-xl font-semibold py-4 sm:py-6">
        Đang tải dữ liệu...
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center text-[#ED1C24] text-lg sm:text-xl font-semibold py-4 sm:py-6">
        ❌ Lỗi: {error}.{" "}
        <Link to="/" className="underline hover:text-[#C9101F]">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  // Access viettelInternet array from the API response object
  const plans = internetData?.viettelInternet || [];

  // Case-insensitive search to handle URL variations
  const plan = plans.find((p) => p.name.toLowerCase() === planCode?.toLowerCase());

  if (!plan) {
    if (process.env.NODE_ENV === "development") {
      console.log("Plan not found - planCode:", planCode, "plans:", plans);
    }
    return (
      <div className="text-center text-[#ED1C24] text-lg sm:text-xl font-semibold py-4 sm:py-6">
        ❌ Không tìm thấy gói cước.{" "}
        <Link to="/" className="underline hover:text-[#C9101F]">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  // Filter plans for "Các gói khác" based on selected category
  const filterOtherPlans = () => {
    const filtered = plans.filter((p) => p.name !== plan.name);
    if (!selectedCategory) return filtered.slice(0, 4);
    const categories = {
      "nha-cap-4": filtered.filter((p) => p.wifiDevices === 1),
      "nha-cap-2": filtered.filter((p) => p.wifiDevices === 2),
      "nha-cap-2-tro-len": filtered.filter((p) => p.wifiDevices >= 3),
    };
    return (categories[selectedCategory] || filtered).slice(0, 4);
  };

  const otherPlans = filterOtherPlans();

  // Handle modal toggle
  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 bg-white shadow-lg rounded-xl">
      {/* Thông tin tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <InfoBox
          icon={<Gift className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 text-[#ED1C24]" />}
          label="Tên gói cước"
          value={plan.name}
        />
        <InfoBox
          icon={<BadgeDollarSign className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 text-[#ED1C24]" />}
          label="Giá gói cước"
          value={plan.ftth?.toLocaleString() + "đ" || "N/A"}
        />
        <InfoBox
          icon={<CalendarDays className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 text-[#ED1C24]" />}
          label="Thời gian"
          value="1 tháng"
        />
      </div>

      {/* Ưu đãi */}
      <div className="bg-gradient-to-br from-[#f1f5f9] to-white rounded-xl border-l-4 border-[#ED1C24] p-2 sm:p-3 md:p-4 text-gray-800 mb-4 sm:mb-6 md:mb-8 relative">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#ED1C24] mb-1 sm:mb-2">
          Ưu đãi đặc biệt
        </h3>
        <ul className="list-disc pl-3 sm:pl-4 md:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm">
          <li className="flex items-center gap-1 sm:gap-2">
            <CheckCircle className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-[#4CAF50]" />
            Băng thông: <strong>{plan.bandwidth || "N/A"}</strong>
          </li>
          <li className="flex items-center gap-1 sm:gap-2">
            <CheckCircle className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-[#4CAF50]" />
            Thiết bị WiFi: <strong>{plan.wifiDevices || "N/A"}</strong> thiết bị
          </li>
          <li className="flex items-center gap-1 sm:gap-2">
            <CheckCircle className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-[#4CAF50]" />
            Combo Truyền hình:
            <ul className="list-none pl-3 sm:pl-4 md:pl-5 mt-1 space-y-1 sm:space-y-1">
              <li className="flex items-center gap-1 sm:gap-2">
                <CheckCircle className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-[#4CAF50]" />
                Gói Giải Trí: App: <strong>{plan.comboGiaiTri?.app?.toLocaleString() || "N/A"}đ</strong>, Box: <strong>{plan.comboGiaiTri?.box?.toLocaleString() || "N/A"}đ</strong>
              </li>
              <li className="flex items-center gap-1 sm:gap-2">
                <CheckCircle className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-[#4CAF50]" />
                Gói Đẳng Cấp: App: <strong>{plan.comboDangCap?.app?.toLocaleString() || "N/A"}đ</strong>, Box: <strong>{plan.comboDangCap?.box?.toLocaleString() || "N/A"}đ</strong>
              </li>
              <li className="flex items-center gap-1 sm:gap-2">
                <CheckCircle className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-[#4CAF50]" />
                Gói K+: App: <strong>{plan.comboKPlus?.app?.toLocaleString() || "N/A"}đ</strong>, Box: <strong>{plan.comboKPlus?.box?.toLocaleString() || "N/A"}đ</strong>
              </li>
            </ul>
          </li>
        </ul>
        {/* Hộp quà */}
        <div className="absolute bottom-[-10px] sm:bottom-[-12px] md:bottom-[-15px] right-1 sm:right-2 md:right-3 w-8 sm:w-10 md:w-12">
          <img src={giftIcon} alt="Gift icon" className="w-full h-auto" />
        </div>
      </div>
       <img className="mt-10 w-80 mb-10 md:w-[50%]" src={DanhSachKenhImage} alt="" />
      {/* CTA */}
      <div className="text-center mb-4 sm:mb-6 md:mb-8">
        <button
          onClick={handleRegisterClick}
          className="bg-[#ED1C24] hover:bg-[#C9101F] text-white font-bold px-7 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 rounded-full text-sm sm:text-base md:text-lg shadow-md hover:shadow-lg transition-all duration-200"
          aria-label="Đăng ký gói cước"
        >
          ĐĂNG KÝ NGAY
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && <RegisterFormModal onClose={handleCloseModal} pkg={plan} />}

      {/* Các gói khác with Filter Buttons */}
      <div className="mt-4 sm:mt-6 md:mt-8">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#ED1C24] mb-2 sm:mb-4">CÁC GÓI KHÁC</h3>
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-2 sm:mb-3">
          <button
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${
              selectedCategory === null
                ? "bg-[#ED1C24] text-white shadow-md"
                : "bg-gray-100 text-gray-800 hover:bg-[#ED1C24]/90 hover:text-white hover:shadow-md"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            TẤT CẢ GÓI CƯỚC
          </button>
          <button
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${
              selectedCategory === "nha-cap-4"
                ? "bg-[#ED1C24] text-white shadow-md"
                : "bg-gray-100 text-gray-800 hover:bg-[#ED1C24]/90 hover:text-white hover:shadow-md"
            }`}
            onClick={() => setSelectedCategory("nha-cap-4")}
          >
            NHÀ CẤP 4
          </button>
          <button
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${
              selectedCategory === "nha-cap-2"
                ? "bg-[#ED1C24] text-white shadow-md"
                : "bg-gray-100 text-gray-800 hover:bg-[#ED1C24]/90 hover:text-white hover:shadow-md"
            }`}
            onClick={() => setSelectedCategory("nha-cap-2")}
          >
            NHÀ CẤP 2
          </button>
          <button
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${
              selectedCategory === "nha-cap-2-tro-len"
                ? "bg-[#ED1C24] text-white shadow-md"
                : "bg-gray-100 text-gray-800 hover:bg-[#ED1C24]/90 hover:text-white hover:shadow-md"
            }`}
            onClick={() => setSelectedCategory("nha-cap-2-tro-len")}
          >
            NHÀ CẤP 2 TRỞ LÊN
          </button>
        </div>
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-3 md:pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-4 md:overflow-visible">
          {otherPlans.map((pkg) => (
            <div
              key={pkg.name}
              className="min-w-[75%] sm:min-w-[55%] md:min-w-0 snap-start"
            >
              <InternetServiceCard pkg={pkg} />
            </div>
          ))}
        </div>
      </div>

      <div className="h-12 sm:h-16 md:h-24"></div>
    </div>
  );
}

function InfoBox({ icon, label, value }) {
  return (
    <div className="bg-gray-100 py-2 sm:py-3 md:py-4 rounded-lg shadow-sm flex flex-col items-center hover:bg-gray-200 transition-colors duration-200">
      <div className="text-[#ED1C24] mb-1 sm:mb-1.5">{icon}</div>
      <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700">{label}</p>
      <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default InternetPlanDetail;