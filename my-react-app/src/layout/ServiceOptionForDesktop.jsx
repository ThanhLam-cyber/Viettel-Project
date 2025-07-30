import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NapTienIcon from "/naptien.png";
import ChuyenMangIcon from "/chuyenmang.png";
import Dk5gIcon from "/5g.png";
import QuanLyIcon from "/quanly.png";
import InternetIcon from "/internet.png";
import CameraIcon from "/camera_icon.png";
import BusinessPackageIcon from "/goi_cuoc_doanh_nghiep.png";

const services = [
  { icon: NapTienIcon, label: "Nạp tiền/Thanh toán", path: "/payment" },
  { icon: CameraIcon, label: "Camera" },
  { icon: Dk5gIcon, label: "Đăng ký 5G" },
  { icon: BusinessPackageIcon, label: "Doanh Nghiệp" },
  { icon: InternetIcon, label: "Internet/TV" },
];

function ServiceOptionsForDesktop({ scrollToInternet, scrollTo5g, scrollToCamera, scrollToBusinessPackage }) {
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
    <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 rounded-xl hidden md:grid md:px-16 lg:px-24">
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      {services.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-sm transition-transform hover:shadow-md hover:scale-105 min-h-32"
          onClick={() => handleClick(item.label, item.path)}
        >
          <img
            src={item.icon}
            alt={item.label}
            className="h-[clamp(2.5rem,5vw,4rem)] mb-3"
            onError={() => setError(`Lỗi tải hình ảnh: ${item.label}`)}
          />
          <span className="text-[clamp(0.9rem,2vw,1.2rem)] font-semibold text-center text-gray-900">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ServiceOptionsForDesktop;