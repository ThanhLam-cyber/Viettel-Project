import React from "react";
import { Wifi, ArrowRight, MapPin, Gift, Copy } from "lucide-react";

function PackageCard({ pkg }) {
  const smsSyntax = `${pkg.code} gửi 191`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(smsSyntax);
    alert("Đã sao chép cú pháp đăng ký!");
  };

  return (
    <div className="min-w-[80%] md:min-w-[35%] max-w-[80%] rounded-2xl overflow-hidden shadow-lg border bg-white transform transition duration-300 hover:scale-[1.02] snap-start">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ed1b2f] to-[#ed1b2f] text-white px-4 py-2 sm:px-5 sm:py-3">
        <h3 className="text-base sm:text-lg font-bold tracking-wide">
          {pkg.name} {pkg.duration && `- ${pkg.duration}`}
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 space-y-3 text-sm text-gray-800">
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-gray-600" />
          <span>
            <span className="text-base md:text-lg">Data:</span>{" "}
            <span className="font-bold">{pkg.data}</span>
          </span>
        </div>

        {pkg.zoneData && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span>
              <span className="text-base md:text-lg">Zone:</span>{" "}
              <span>{pkg.zoneData}</span>
            </span>
          </div>
        )}

        {pkg.extra && (
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-gray-600" />
            <span>
              <span className="text-base md:text-lg">Ưu đãi:</span>{" "}
              <span className="font-bold">{pkg.extra}</span>
            </span>
          </div>
        )}

        <p className="text-xl sm:text-2xl font-bold text-[#ff3d3d] mt-3">
          {pkg.price?.toLocaleString()}đ
        </p>

        {/* SMS đăng ký */}
        <div className="mt-3 border-t pt-3">
          <div className="text-gray-800 text-sm">Soạn tin nhắn để đăng ký:</div>
          <div className="flex items-center justify-between mt-1 bg-gray-100 px-3 py-2 rounded-xl text-sm sm:text-base font-medium">
            <span>{smsSyntax}</span>
            <button
              onClick={copyToClipboard}
              className="text-[#ff3d3d] hover:underline flex items-center"
            >
              <Copy className="w-4 h-4 mr-1" />
              Sao chép
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;
