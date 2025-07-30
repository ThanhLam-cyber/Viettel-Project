import { Wifi, ArrowRight, CheckCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RegisterFormModal from "./InternetRegisterFormModal";

function InternetServiceCard({ pkg }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  // Define combos for dynamic rendering
  const combos = [
    { label: "Giải Trí", data: pkg.comboGiaiTri },
    { label: "Đẳng Cấp", data: pkg.comboDangCap },
    { label: "K+", data: pkg.comboKPlus },
  ];

  // Determine highlight tag based on package features
  const highlightTag =
    pkg.wifiDevices >= 3
      ? "Doanh nghiệp"
      : pkg.bandwidth.includes("1Gbps")
      ? "Bán chạy"
      : "Phổ biến";

  // Assign tag colors (Viettel-inspired with brand alignment)
  const tagColor =
    highlightTag === "Doanh nghiệp"
      ? "bg-[#1E90FF]" // Blue for business
      : highlightTag === "Bán chạy"
      ? "bg-[#FFC107]" // Yellow for best-seller
      : "bg-[#4CAF50]"; // Green for popular

  return (
    <>
      <div className="min-w-[85%] sm:min-w-[65%] md:min-w-[50%] lg:min-w-[38%] max-w-full snap-start rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white transform transition duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between min-h-[420px] relative">
        {/* Highlight Tag */}
        <span
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium text-white rounded-full ${tagColor} shadow-sm`}
          aria-label={`Tag: ${highlightTag}`}
        >
          {highlightTag}
        </span>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#ED1C24] to-[#C9101F] text-white px-4 py-3">
          <h3 className="text-lg font-bold leading-tight">{pkg.name}</h3>
          <p className="text-sm leading-snug">{pkg.description}</p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 text-sm text-gray-800 flex-1">
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-gray-600" />
            <span className="font-medium">
              <strong>Băng thông:</strong> {pkg.bandwidth}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="font-medium">
              <strong>Thiết bị WiFi:</strong> {pkg.wifiDevices}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <strong className="text-base">Giá Internet thuần:</strong>
            <span className="text-xl font-bold text-[#ED1C24]">
              {pkg.ftth?.toLocaleString() || "N/A"}đ
            </span>
          </div>

          <div>
            <strong className="text-base">Combo Truyền hình:</strong>
            <ul className="pl-6 mt-2 list-disc space-y-2">
              {combos.map((combo) => (
                <li key={combo.label} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                  <span className="font-semibold">{combo.label}:</span>
                  <span className="ml-1">
                    App: {combo.data?.app?.toLocaleString() || "N/A"}đ, Box:{" "}
                    {combo.data?.box?.toLocaleString() || "N/A"}đ
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50 text-sm">
          <button
            className="px-5 py-2 text-base rounded-xl text-black border border-gray-300 hover:text-white hover:border-transparent hover:bg-[#ED1C24] hover:shadow-md transform hover:scale-105 transition duration-200 font-medium"
            aria-label="Đăng ký gói cước"
            onClick={() => setShowForm(true)}
          >
            Đăng ký
          </button>
          <button
            className="flex items-center text-[#ED1C24] font-semibold hover:underline"
            aria-label={`Xem chi tiết gói ${pkg.name}`}
            onClick={() => navigate(`/goi-internet/${pkg.name}`)}
          >
            Xem chi tiết
            <ArrowRight className="ml-1 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <RegisterFormModal pkg={pkg} onClose={() => setShowForm(false)} />
      )}
    </>
  );
}

export default InternetServiceCard;