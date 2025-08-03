import { useState } from "react";
import { Link } from "react-router-dom";
import { Wifi, Briefcase, Smartphone, Camera, Hotel } from "lucide-react";
import ChevronDownIcon from "../assets/images/chevron-down-svgrepo-com.svg";

function MobileSidebar({
  isOpen,
  onClose,
  internetData = [],
  businessPackages = [],
  simData = {},
  loadingInternet,
  loadingBusiness,
  loadingSim,
  errorInternet,
  errorBusiness,
  errorSim,
  onInternetItemClick,
  onBusinessItemClick,
  onSimItemClick,
}) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const groupedPackages = {
    "1 Wi-Fi Device (Nhà cấp 4)": internetData.filter((item) => item.wifiDevices === 1),
    "2 Wi-Fi Devices (Nhà 2 tầng)": internetData.filter((item) => item.wifiDevices === 2),
    "3+ Wi-Fi Devices (Nhà 2 tầng trở lên)": internetData.filter((item) => item.wifiDevices >= 3),
  };

  const displayedBusinessPackages = businessPackages.slice(0, 6);
  const displayedSimPackages = [
    ...(simData.goi5GData || []).slice(0, 3),
    ...(simData.goi5GCombo || []).slice(0, 3),
  ].slice(0, 6);

  const totalInternetPackages = Object.values(groupedPackages).reduce(
    (total, packages) => total + packages.length,
    0
  );
  const totalSimPackages = (simData.goi5GData?.length || 0) + (simData.goi5GCombo?.length || 0) + (simData.goi5GDacBiet?.length || 0);

  const menuItems = [
    {
      label: "Internet - Truyền hình",
      to: "/internet-truyen-hinh",
      icon: <Wifi className="w-6 h-6 text-[#D70026]" />,
      hasDropdown: true,
      dropdownContent: loadingInternet ? (
        <li className="px-4 py-2 flex justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-4 border-[#D70026] border-t-transparent"></div>
        </li>
      ) : errorInternet ? (
        <li className="px-4 py-2 text-[#D70026] text-sm">Lỗi: {errorInternet}</li>
      ) : internetData.length > 0 ? (
        <>
          {Object.entries(groupedPackages).map(([category, packages], index) =>
            packages.length > 0 && (
              <div key={index} className="mb-2 last:mb-0">
                <h3 className="px-4 py-2 font-semibold text-[#333333] bg-gray-50 border-b border-gray-200 text-sm">
                  {category}
                </h3>
                {packages.slice(0, 6).map((item, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between border-b border-gray-200 last:border-b-0 text-sm"
                    onClick={() => {
                      onInternetItemClick(item.name);
                      onClose();
                    }}
                  >
                    <span>{item.name} - {item.bandwidth}</span>
                    <span className="text-[#D70026] font-semibold">
                      {item.ftth.toLocaleString()} VNĐ
                    </span>
                  </li>
                ))}
              </div>
            )
          )}
          {totalInternetPackages > 6 && (
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#D70026] font-semibold text-sm border-t border-gray-200">
              <Link to="/internet-truyen-hinh" onClick={onClose}>
                Xem thêm
              </Link>
            </li>
          )}
        </>
      ) : (
        <li className="px-4 py-2 text-[#333333] text-sm">Không có dữ liệu</li>
      ),
    },
    {
      label: "Camera",
      to: "/camera",
      icon: <Camera className="w-6 h-6 text-[#D70026]" />,
      hasDropdown: false,
    },
    {
      label: "Doanh Nghiệp",
      to: "/doanh-nghiep",
      icon: <Briefcase className="w-6 h-6 text-[#D70026]" />,
      hasDropdown: true,
      dropdownContent: loadingBusiness ? (
        <li className="px-4 py-2 flex justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-4 border-[#D70026] border-t-transparent"></div>
        </li>
      ) : errorBusiness ? (
        <li className="px-4 py-2 text-[#D70026] text-sm">Lỗi: {errorBusiness}</li>
      ) : displayedBusinessPackages.length > 0 ? (
        <>
          {displayedBusinessPackages.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between border-b border-gray-200 last:border-b-0 text-sm"
              onClick={() => {
                onBusinessItemClick(item.name);
                onClose();
              }}
            >
              <span>{item.name} - {item.domesticBandwidth}</span>
              <span className="text-[#D70026] font-semibold">
                {item.price.toLocaleString()} VNĐ
              </span>
            </li>
          ))}
          {businessPackages.length > 6 && (
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#D70026] font-semibold text-sm border-t border-gray-200">
              <Link to="/doanh-nghiep" onClick={onClose}>
                Xem thêm
              </Link>
            </li>
          )}
        </>
      ) : (
        <li className="px-4 py-2 text-[#333333] text-sm">Không có dữ liệu</li>
      ),
    },
    {
      label: "Khách Sạn",
      to: "/khach-san",
      icon: <Hotel className="w-6 h-6 text-[#D70026]" />,
      hasDropdown: false,
    },
    {
      label: "Di động",
      to: "/di-dong",
      icon: <Smartphone className="w-6 h-6 text-[#D70026]" />,
      hasDropdown: true,
      dropdownContent: loadingSim ? (
        <li className="px-4 py-2 flex justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-4 border-[#D70026] border-t-transparent"></div>
        </li>
      ) : errorSim ? (
        <li className="px-4 py-2 text-[#D70026] text-sm">Lỗi: {errorSim}</li>
      ) : displayedSimPackages.length > 0 ? (
        <>
          {displayedSimPackages.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between border-b border-gray-200 last:border-b-0 text-sm"
              onClick={() => {
                onSimItemClick(item.name);
                onClose();
              }}
            >
              <span>{item.name} - {item.data}</span>
              <span className="text-[#D70026] font-semibold">
                {item.price.toLocaleString()} VNĐ
              </span>
            </li>
          ))}
          {totalSimPackages > 6 && (
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#D70026] font-semibold text-sm border-t border-gray-200">
              <Link to="/di-dong" onClick={onClose}>
                Xem thêm
              </Link>
            </li>
          )}
        </>
      ) : (
        <li className="px-4 py-2 text-[#333333] text-sm">Không có dữ liệu</li>
      ),
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:hidden`}
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-[#D70026]">Menu Dịch Vụ</h2>
      </div>
      <nav className="p-6 flex flex-col gap-2 overflow-y-auto h-full">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2">
            <div
              className="flex items-center justify-between py-3 px-4 text-lg font-medium text-gray-800 hover:bg-gray-100 hover:text-[#D70026] rounded-lg transition-colors duration-200 cursor-pointer"
              onClick={() => (item.hasDropdown ? toggleMenu(item.label) : onClose())}
            >
              <Link
                to={item.to}
                className="flex items-center gap-3 flex-grow"
                onClick={(e) => item.hasDropdown && e.preventDefault()}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
              {item.hasDropdown && (
                <img
                  src={ChevronDownIcon}
                  alt="toggle"
                  className={`h-5 w-5 transition-transform duration-200 ${
                    openMenu === item.label ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>
            {item.hasDropdown && openMenu === item.label && (
              <ul className="pl-8 pt-2 pb-3 bg-gray-50 rounded-lg">
                {item.dropdownContent}
              </ul>
            )}
          </div>
        ))}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-lg font-semibold text-[#D70026]">
            📞 Hotline: <span className="font-bold">0327555666</span>
          </p>
        </div>
      </nav>
    </div>
  );
}

export default MobileSidebar;