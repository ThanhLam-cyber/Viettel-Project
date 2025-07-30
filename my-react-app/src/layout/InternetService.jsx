import InternetServiceCard from "../component/InternetService_Card";
import { useState } from "react";
import DanhSachKenhImage from "/danh_sach_kenh.png"
function InternetService({ data }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Categorize plans based on wifiDevices
  const categorizePlans = () => {
    const categories = {
      "nha-cap-4": data?.viettelInternet?.filter((pkg) => pkg.wifiDevices === 1) || [],
      "nha-cap-2": data?.viettelInternet?.filter((pkg) => pkg.wifiDevices === 2) || [],
      "nha-cap-2-tro-len": data?.viettelInternet?.filter((pkg) => pkg.wifiDevices >= 3) || [],
      all: data?.viettelInternet || [],
    };
    return categories[selectedCategory] || categories.all;
  };

  const filteredPlans = categorizePlans();

  return (
    <div className="px-4 sm:px-6 lg:px-24 md:px-10">
      <h2>Internet</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        <button
          className={`px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${
            selectedCategory === null
              ? "bg-[#ED1C24] text-white shadow-md"
              : "bg-gray-100 text-gray-800 hover:bg-[#ED1C24]/90 hover:text-white hover:shadow-md"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          TẤT CẢ GÓI CƯỚC
        </button>
        <button
          className={`px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${
            selectedCategory === "nha-cap-4"
              ? "bg-[#ED1C24] text-white shadow-md"
              : "bg-gray-100 text-gray-800 hover:bg-[#ED1C24]/90 hover:text-white hover:shadow-md"
          }`}
          onClick={() => setSelectedCategory("nha-cap-4")}
        >
          NHÀ CẤP 4
        </button>
        <button
          className={`px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${
            selectedCategory === "nha-cap-2"
              ? "bg-[#ED1C24] text-white shadow-md"
              : "bg-gray-100 text-gray-800 hover:bg-[#ED1C24]/90 hover:text-white hover:shadow-md"
          }`}
          onClick={() => setSelectedCategory("nha-cap-2")}
        >
          NHÀ 2 TẦNG
        </button>
        <button
          className={`px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${
            selectedCategory === "nha-cap-2-tro-len"
              ? "bg-[#ED1C24] text-white shadow-md"
              : "bg-gray-100 text-gray-800 hover:bg-[#ED1C24]/90 hover:text-white hover:shadow-md"
          }`}
          onClick={() => setSelectedCategory("nha-cap-2-tro-len")}
        >
          Nhà 2 TẦNG TRỞ LÊN 
        </button>
      </div>

      {/* Scrollable Cards Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:gap-6 bg-[#f9f9f9]">
        {filteredPlans.map((pkg) => (
          <InternetServiceCard key={pkg.name} pkg={pkg} />
        ))}
      </div> 
      <div className="h-10"></div>

      {/* Prepaid Fees Section */}
      {data?.prepaidFees && (
        <div className="mt-2 sm:mt-3 md:mt-4 bg-gradient-to-br from-white to-gray-50 p-2 sm:p-3 rounded-lg border-l-2 border-[#ED1C24] shadow-sm hover:shadow-md transition-shadow duration-200">
          <h3 className="text-sm sm:text-base font-semibold text-[#ED1C24] mb-1 sm:mb-2 bg-gradient-to-r from-[#ED1C24]/80 to-red-600/80 bg-clip-text text-transparent">
            Tùy chọn thanh toán
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 italic font-light">
            {data.prepaidFees.note}
          </p>
          <ul className="list-none space-y-1 sm:space-y-2 pl-2 sm:pl-3">
            {data.prepaidFees.prepaidOptions.map((option, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-1 sm:p-2 bg-white/90 rounded-sm hover:bg-white transition-colors duration-200"
              >
                <span className="text-xs sm:text-sm font-medium text-gray-800">{option.duration}:</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-900">{option.fee.toLocaleString()}đ</span>
                <span className="text-green-600 text-xs sm:text-sm px-1 bg-green-50 rounded">
                  {option.discount}
                </span>
              </li>
            ))}
          </ul>
         
        </div>
        
      )}
       <img className="mt-8 w-full md:w-[50%]" src={DanhSachKenhImage} alt="" />
    </div>
  );
}

export default InternetService;