import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import HamburgerIcon from "../assets/images/hamburger-menu-svgrepo-com.svg";
import LogoViettel from "../assets/logos/LogoViettel.png";
import SearchBar from "../component/SearchBar";
import HeaderNavItem from "../component/HeaderNavItem";
import MobileSidebar from "../component/MobileSideBar";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [internetData, setInternetData] = useState([]);
    const [businessPackages, setBusinessPackages] = useState([]);
    const [simData, setSimData] = useState({});
    const [loadingInternet, setLoadingInternet] = useState(false);
    const [loadingBusiness, setLoadingBusiness] = useState(false);
    const [loadingSim, setLoadingSim] = useState(false);
    const [errorInternet, setErrorInternet] = useState(null);
    const [errorBusiness, setErrorBusiness] = useState(null);
    const [errorSim, setErrorSim] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch Internet data
        const fetchInternetData = async () => {
            try {
                setLoadingInternet(true);
                const response = await fetch("http://localhost:3000/internet-data");
                if (!response.ok) {
                    throw new Error("Không thể tải dữ liệu internet");
                }
                const data = await response.json();
                if (process.env.NODE_ENV === "development") {
                    console.log("👉 Internet data nhận từ API:", data);
                }
                setInternetData(data.viettelInternet || []);
            } catch (err) {
                console.error("Lỗi fetch internet data:", err);
                setErrorInternet(err.message);
            } finally {
                setLoadingInternet(false);
            }
        };

        // Fetch Business packages
        const fetchBusinessPackages = async () => {
            try {
                setLoadingBusiness(true);
                const response = await fetch("http://localhost:3000/business-package");
                if (!response.ok) {
                    throw new Error("Không thể tải dữ liệu gói doanh nghiệp");
                }
                const data = await response.json();
                if (process.env.NODE_ENV === "development") {
                    console.log("👉 Business packages nhận từ API:", data);
                }
                setBusinessPackages(data.buissiness_package || []);
            } catch (err) {
                console.error("Lỗi fetch business packages:", err);
                setErrorBusiness(err.message);
            } finally {
                setLoadingBusiness(false);
            }
        };

        // Fetch SIM data
        const fetchSimData = async () => {
            try {
                setLoadingSim(true);
                const response = await fetch("http://localhost:3000/sim-data");
                if (!response.ok) {
                    throw new Error("Không thể tải dữ liệu SIM");
                }
                const data = await response.json();
                if (process.env.NODE_ENV === "development") {
                    console.log("👉 SIM data nhận từ API:", data);
                }
                setSimData(data);
            } catch (err) {
                console.error("Lỗi fetch SIM data:", err);
                setErrorSim(err.message);
            } finally {
                setLoadingSim(false);
            }
        };

        fetchInternetData();
        fetchBusinessPackages();
        fetchSimData();
    }, []);

    // Navigation handler for Internet packages
    const handleInternetItemClick = (id) => {
        navigate(`/goi-internet/${id}`);
        setMenuOpen(false);
    };

    // Navigation handler for Business packages
    const handleBusinessItemClick = (id) => {
        navigate(`/goi-doanh-nghiep/${id}`);
        setMenuOpen(false);
    };

    // Navigation handler for SIM packages
    const handleSimItemClick = (id) => {
        navigate(`/goi-di-dong/${id}`);
        setMenuOpen(false);
    };

    return (
        <>
            {/* Overlay when menu is open */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}

            {/* Mobile sidebar */}
            <MobileSidebar
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                internetData={internetData}
                businessPackages={businessPackages}
                simData={simData}
                loadingInternet={loadingInternet}
                loadingBusiness={loadingBusiness}
                loadingSim={loadingSim}
                errorInternet={errorInternet}
                errorBusiness={errorBusiness}
                errorSim={errorSim}
                onInternetItemClick={handleInternetItemClick}
                onBusinessItemClick={handleBusinessItemClick}
                onSimItemClick={handleSimItemClick}
            />

            {/* Main header */}
            <div className="h-14 relative flex justify-between items-center p-3 space-x-5 md:p-6 bg-white shadow-sm">
                <img
                    src={HamburgerIcon}
                    alt="menu"
                    className="h-6 md:hidden cursor-pointer"
                    onClick={() => setMenuOpen(true)}
                />
                <Link to="/">
                    <img src={LogoViettel} className="h-12" alt="Logo Viettel" />
                </Link>
                <HeaderNavItem
                    text="Internet-Truyền hình"
                    internetData={internetData}
                    loading={loadingInternet}
                    error={errorInternet}
                    onItemClick={handleInternetItemClick}
                />
                <HeaderNavItem text="Camera" />
                <HeaderNavItem
                    text="Doanh Nghiệp"
                    businessPackages={businessPackages}
                    loading={loadingBusiness}
                    error={errorBusiness}
                    onItemClick={handleBusinessItemClick}
                />
                <HeaderNavItem
                    text="Di động"
                    simData={simData}
                    loading={loadingSim}
                    error={errorSim}
                    onItemClick={handleSimItemClick}
                />
                <h1 className="text-[#D70026] font-bold hidden md:block text-sm">
                    Hotline: 0327555666
                </h1>
                <SearchBar />
            </div>
        </>
    );
}

export default Header;