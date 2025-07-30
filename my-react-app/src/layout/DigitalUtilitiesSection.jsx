import React from "react";
import { ChevronRight } from "lucide-react";

const digitalUtilities = [
  {
    icon: "/my_viettel.png",
    title: "My Viettel",
    desc: "Quản lý tài khoản/đăng ký gói/thanh toán cước dễ dàng.",
     url: "https://www.vietteltelecom.vn/vx/myviettel",
  },
  {
    icon: "/tv360.png",
    title: "TV360",
    desc: "Nền tảng truyền hình số đặc sắc số một tại Việt Nam.",
      url: "https://www.vietteltelecom.vn/ung-dung-so/tv360/QXJ0aWNs15e05e4e5d48c1",
  },
  {
    icon: "/iMuzik.png",
    title: "iMuzik",
    desc: "Kho nhạc chờ phong phú các thể loại trong và ngoài nước.",
    url: "https://www.vietteltelecom.vn/ung-dung-so/imuzik/QXJ0aWNs15e070b96a8c35",
  },
];

export default function DigitalUtilities() {
    const handleRedirect = (url) => {
    window.open(url, "_blank"); // mở trong tab mới
  };
  return (
    <div className="bg-[#f9f9f9] py-10 px-4 sm:px-6 lg:px-20">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center justify-between mb-8">
        <span>Tiện ích số được ưa thích</span>
        <ChevronRight className="text-[#ed1b2f] w-5 h-5" />
      </h2>

      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-3  ">
        {digitalUtilities.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-5 max-w-60 flex flex-col "
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-14 h-14 object-contain"
            />
            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
            <p className="text-gray-700 w-40">{item.desc}</p>
            <div className="text-[#ed1b2f] font-semibold text-sm mt-auto flex items-center gap-1 hover:underline cursor-pointer" onClick={() => handleRedirect(item.url)}>
              Xem chi tiết <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile layout */}
      <div className="flex justify-center gap-10 md:hidden">
        {digitalUtilities.map((item, index) => (
          <div
            key={index}
            onClick={() => handleRedirect(item.url)}
            className="flex flex-col items-center justify-center gap-2"
          >
            <div className="w-16 h-16 rounded-lg bg-white shadow flex items-center justify-center">
              <img
                src={item.icon}
                alt={item.title}
                className="w-10 h-10 object-contain"
              />
            </div>
            <p className="text-sm font-medium text-gray-900 text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
