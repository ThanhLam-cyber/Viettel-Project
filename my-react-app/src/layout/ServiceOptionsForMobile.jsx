import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NapTienIcon from "/naptien.png";
import ChuyenMangIcon from "/chuyenmang.png";
import Dk5gIcon from "/5g.png";
import QuanLyIcon from "/quanly.png";
import InternetIcon from "/internet.png";
import CameraIcon from "/camera_icon.png";
import DoanhNghiepIcon from "/goi_cuoc_doanh_nghiep.png";

const services = [
  { icon: NapTienIcon, label: "Nạp tiền/Thanh toán", path: "/payment" }, // Thêm path
  { icon: CameraIcon, label: "Camera" },
  { icon: Dk5gIcon, label: "Đăng ký 5G" },
  { icon: DoanhNghiepIcon, label: "Doanh Nghiệp" },
  { icon: InternetIcon, label: "Internet/TV" }, // Không cần path
];

function ServiceOptionsForMobile({ scrollToInternet, scrollTo5g, scrollToCamera, scrollToBusinessPackage }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleClick = (label, path) => {
    try {
      if (label === "Internet/TV" && scrollToInternet?.current) {
        scrollToInternet.current.scrollIntoView({ behavior: "smooth" });
      } else if (label === "Đăng ký 5G" && scrollTo5g?.current) {
        scrollTo5g.current.scrollIntoView({ behavior: "smooth" });
      } else if (label === "Nạp tiền/Thanh toán" && path) {
        navigate(path);
      } else if (label === "Camera" && scrollToCamera?.current) {
        scrollToCamera.current.scrollIntoView({ behavior: "smooth" });
      } else if (label === "Doanh Nghiệp" && scrollToBusinessPackage?.current) {
        scrollToBusinessPackage.current.scrollIntoView({ behavior: "smooth" });
      } else {
        setError(`Không thể cuộn đến ${label}`);
      }
    } catch (err) {
      setError(`Lỗi khi xử lý ${label}: ${err.message}`);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden w-full bg-white border-t shadow-md py-2 px-1 flex justify-between z-50">
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      {services.map((item, index) => (
        <div
          key={index}
          className="w-1/5 flex flex-col items-center justify-center text-center px-1"
          onClick={() => handleClick(item.label, item.path)}
        >
          <img
            src={item.icon}
            alt={item.label}
            className="h-[clamp(24px,5vw,48px)] mb-1"
            onError={() => setError(`Lỗi tải hình ảnh: ${item.label}`)}
          />
          <span className="text-[clamp(9px,2.5vw,12px)] font-medium text-gray-800 leading-tight">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ServiceOptionsForMobile;