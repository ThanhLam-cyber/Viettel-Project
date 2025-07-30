import React, { useState } from "react";
import PackageCard from "../component/PackageCard";

const categories = [
  { key: "goi5GData", label: "Gói 5G Data" },
  { key: "goi5GDataZone", label: "Gói 5G Data Zone" },
  { key: "goi5GCombo", label: "Gói 5G Combo" },
  { key: "goi5GDacBiet", label: "Gói 5G Đặc Biệt" },
];

function PackageList({ data }) {
  const [activeCategory, setActiveCategory] = useState("goi5GData");

  const getPackages = () => {
    if (!data) return [];

    if (activeCategory === "goi5GDataZone") {
      return data.goi5GDataZone?.monthlyPlans || [];
    }

    return data[activeCategory] || [];
  };

  return (
    <div className="p-3 sm:p-4 max-w-7xl mx-auto lg:px-24 md:px-14">
      <h2>Danh sách gói cước theo nhu cầu</h2>
      <div className="h-7"></div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full border font-medium text-sm sm:text-base transition duration-300 shadow-sm
              ${activeCategory === cat.key
                ? "bg-[#ff3d3d] text-white border-[#ff3d3d] scale-105"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
        {getPackages().map((pkg) => (
          <PackageCard key={pkg.name} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}

export default PackageList;
