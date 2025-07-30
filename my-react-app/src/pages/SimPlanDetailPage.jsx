import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Wifi, MapPin, Gift, PhoneCall, Tv } from "lucide-react";
import PackageCard from "../component/PackageCard";
const API_URL = import.meta.env.VITE_API_URL;
function SimPlanDetailPage() {
  const { planCode } = useParams();
  const [simData, setSimData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/sim-data`) // đổi domain nếu cần
      .then((res) => res.json())
      .then((data) => {
        setSimData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi load dữ liệu:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  }

  if (!simData) {
    return <div className="text-center py-10 text-red-500">Không tải được dữ liệu.</div>;
  }

  // --- Xử lý giống trước, nhưng dùng dữ liệu từ API ---
  const planGroups = {
    goi5GData: simData.goi5GData,
    goi5GCombo: simData.goi5GCombo,
    goi5GDacBiet: simData.goi5GDacBiet,
    goi5GDataZone: [
      ...simData.goi5GDataZone.monthlyPlans,
      simData.goi5GDataZone.dailyPlan,
    ],
  };

  let currentCategory = "";
  let currentList = [];
  let plan = null;

  for (const [key, list] of Object.entries(planGroups)) {
    const found = list.find((p) => p.name.toLowerCase() === planCode.toLowerCase());
    if (found) {
      plan = found;
      currentCategory = key;
      currentList = list;
      break;
    }
  }

  if (!plan) {
    return (
      <div className="text-center py-6 sm:py-8 text-[#ED1C24] text-lg sm:text-xl font-semibold">
        ❌ Không tìm thấy gói cước
      </div>
    );
  }

  const relatedPackages = currentList.filter((p) => p.name !== plan.name).slice(0, 4);

  return (
    <>
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10 bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#ED1C24] mb-2 bg-gradient-to-r from-[#ED1C24]/80 to-red-600/80 bg-clip-text text-transparent">
            Gói {plan.name}
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-gray-700">
            Giá:{" "}
            <span className="text-[#ED1C24] font-bold">
              {plan.price?.toLocaleString()}đ
            </span>{" "}
            {plan.duration && <span className="text-gray-600">/ {plan.duration}</span>}
          </p>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
          <InfoItem icon={<Wifi className="w-6 h-6 text-[#ED1C24]" />} label="Data" value={plan.data} />
          {plan.zoneData && <InfoItem icon={<MapPin className="w-6 h-6 text-[#ED1C24]" />} label="Data vùng" value={plan.zoneData} />}
          {plan.otherCallMinutes && <InfoItem icon={<PhoneCall className="w-6 h-6 text-[#ED1C24]" />} label="Ngoại mạng" value={plan.otherCallMinutes} />}
          {plan.viettelCall && <InfoItem icon={<PhoneCall className="w-6 h-6 text-[#ED1C24]" />} label="Nội mạng" value={plan.viettelCall} />}
          {plan.tv360 && <InfoItem icon={<Tv className="w-6 h-6 text-[#ED1C24]" />} label="TV360" value={plan.tv360} />}
          {plan.mybox && <InfoItem icon={<Gift className="w-6 h-6 text-[#ED1C24]" />} label="MyTV Box" value={plan.mybox} />}
          {plan.extra && <InfoItem icon={<Gift className="w-6 h-6 text-[#ED1C24]" />} label="Ưu đãi" value={plan.extra} />}
          {plan.zone && <InfoItem icon={<MapPin className="w-6 h-6 text-[#ED1C24]" />} label="Áp dụng tại" value={plan.zone.join(", ")} />}
        </div>

        {/* Ghi chú */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg text-sm text-gray-700 mb-6">
          <p>{simData.note}</p>
        </div>

       

        {/* Gói tương tự */}
        {relatedPackages.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Gói cước tương tự
            </h3>
            <div className="flex space-x-5 overflow-x-auto whitespace-nowrap">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.name} pkg={pkg} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="h-24"></div>
    </>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6">{icon}</div>
      <div>
        <p className="font-semibold">{label}:</p>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default SimPlanDetailPage;
