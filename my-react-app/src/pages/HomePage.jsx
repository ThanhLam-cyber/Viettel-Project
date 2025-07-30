import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ImageSlide from "../layout/ImageSlide";
import ServiceOptionsForDesktop from "../layout/ServiceOptionForDesktop";
import PromotionHighlights from "../layout/PromotionHighlights";
import ServiceCategory from "../layout/ServiceCategory";
import InternetService from "../layout/InternetService";
import ViettelSimExplorer from "../layout/ViettelSimExplorer";
import PackageList from "../layout/PackageList";
import CameraService from "../layout/CameraService";
import DigitalUtilitiesSection from "../layout/DigitalUtilitiesSection";
import BuisinessPackage from "../layout/BuisinessPackage";// Sửa chính tả

function HomePage() {
  const { setRefs } = useOutletContext();
  const internetRef = useRef(null);
  const data5gRef = useRef(null);
  const cameraRef = useRef(null);
  const businessPackageRef = useRef(null);

  const [internetData, setInternetData] = useState([]);
  const [simData, setSimData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/internet-data")
      .then((res) => {
        if (!res.ok) throw new Error(`Lỗi HTTP: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("👉 Internet data nhận từ API:", data);
        setInternetData(data);
      })
      .catch((err) => {
        console.error("Lỗi fetch internet data:", err);
        setError("Không thể tải dữ liệu internet. Vui lòng thử lại sau.");
      });

    fetch("http://localhost:3000/sim-data")
      .then((res) => {
        if (!res.ok) throw new Error(`Lỗi HTTP: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const cleanData = data.default ?? data;
        if (!cleanData || typeof cleanData !== "object") {
          throw new Error("Dữ liệu sim không hợp lệ");
        }
        console.log("👉 Sim data nhận từ API (clean):", cleanData);
        setSimData(cleanData);
      })
      .catch((err) => {
        console.error("Lỗi fetch sim data:", err);
        setError("Không thể tải dữ liệu sim. Vui lòng thử lại sau.");
      });
  }, []);

  useEffect(() => {
    if (setRefs) {
      setRefs({
        scrollToInternet: internetRef,
        scrollTo5g: data5gRef,
        scrollToCamera: cameraRef,
        scrollToBusinessPackage: businessPackageRef,
      });
      console.log("Refs sent to DefaultLayout:", {
        scrollToInternet: internetRef,
        scrollTo5g: data5gRef,
        scrollToCamera: cameraRef,
        scrollToBusinessPackage: businessPackageRef,
      });
    } else {
      console.warn("setRefs is undefined in HomePage");
    }
  }, [setRefs]);

  return (
    <>
      {error && <div className="text-center text-red-500">{error}</div>}
      <ImageSlide />
      <ServiceOptionsForDesktop
        scrollToInternet={internetRef}
        scrollTo5g={data5gRef}
        scrollToCamera={cameraRef}
        scrollToBusinessPackage={businessPackageRef}
      />
      <PromotionHighlights />
      <ServiceCategory />
      <div ref={internetRef}>
        <InternetService data={internetData} />
      </div>
      <div ref={businessPackageRef}>
        <BuisinessPackage />
      </div>
      <ViettelSimExplorer />
      <div ref={data5gRef}>
        <PackageList data={simData} />
      </div>
      <div ref={cameraRef}>
        <CameraService />
      </div>
      <DigitalUtilitiesSection />
    </>
  );
}

export default HomePage;