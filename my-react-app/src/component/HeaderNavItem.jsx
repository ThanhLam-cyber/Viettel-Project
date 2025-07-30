import { Link } from "react-router-dom";
import ChevronDownIcon from "../assets/images/chevron-down-svgrepo-com.svg";

function HeaderNavItem({ text, internetData = [], businessPackages = [], simData = {}, loading = false, error = null, onItemClick }) {
    // Group packages by wifiDevices for Internet
    const groupedPackages = {
        "1 Wi-Fi Device (Nhà cấp 4)": internetData.filter((item) => item.wifiDevices === 1),
        "2 Wi-Fi Devices (Nhà 2 tầng)": internetData.filter((item) => item.wifiDevices === 2),
        "3+ Wi-Fi Devices (Nhà 2 tầng trở lên)": internetData.filter((item) => item.wifiDevices >= 3),
    };

    // Get up to 6 business packages for dropdown
    const displayedBusinessPackages = businessPackages.slice(0, 6);

    // Process SIM data for dropdown
    const displayedSimPackages = [
        ...(simData.goi5GData || []).slice(0, 3), // Limit to 3 items from goi5GData
        ...(simData.goi5GCombo || []).slice(0, 3), // Limit to 3 items from goi5GCombo
    ].slice(0, 6); // Ensure total of 6 items max

    // Calculate total number of Internet packages
    const totalInternetPackages = Object.values(groupedPackages).reduce(
        (total, packages) => total + packages.length,
        0
    );

    // Calculate total number of SIM packages
    const totalSimPackages = (simData.goi5GData?.length || 0) + (simData.goi5GCombo?.length || 0) + (simData.goi5GDacBiet?.length || 0);

    // Determine view more link based on text
    const viewMoreLink = text === "Internet-Truyền hình" ? "/internet-truyen-hinh" : text === "Doanh Nghiệp" ? "/doanh-nghiep" : "/goi-cuoc";

    return (
        <div className="relative group hidden md:block">
            <div
                className="flex items-center space-x-1 font-bold text-sm text-[#333333] cursor-pointer hover:text-[#D70026] after:absolute after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#D70026] after:transition-all after:duration-300 after:bottom-[-6px]"
            >
                <span>{text}</span>
                <img src={ChevronDownIcon} className="h-4 w-4" alt="down" />
            </div>

            {/* Dropdown content */}
            <div
                className="absolute left-0 top-full mt-2 w-80 max-h-[400px] overflow-hidden bg-white border border-[#D70026] shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
            >
                <ul className="p-4 text-sm text-[#333333]">
                    {loading ? (
                        <li className="px-4 py-2 flex justify-center">
                            <div className="h-5 w-5 animate-spin rounded-full border-4 border-[#D70026] border-t-transparent"></div>
                        </li>
                    ) : error ? (
                        <li className="px-4 py-2 text-[#D70026]">{error}</li>
                    ) : text === "Internet-Truyền hình" && internetData.length > 0 ? (
                        <>
                            {Object.entries(groupedPackages).map(([category, packages], index) =>
                                packages.length > 0 && (
                                    <div key={index} className="mb-2 last:mb-0">
                                        <h3 className="px-4 py-2 font-semibold text-[#333333] bg-gray-50 border-b border-gray-200">
                                            {category}
                                        </h3>
                                        {packages.slice(0, 6).map((item, idx) => (
                                            <li
                                                key={idx}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between border-b border-gray-200 last:border-b-0"
                                                onClick={() => onItemClick && onItemClick(item.name)}
                                            >
                                                <span className="text-sm">{item.name} - {item.bandwidth}</span>
                                                <span className="text-[#D70026] font-semibold text-sm">
                                                    {item.ftth.toLocaleString()} VNĐ
                                                </span>
                                            </li>
                                        ))}
                                    </div>
                                )
                            )}
                            {totalInternetPackages > 6 && (
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#D70026] font-semibold text-sm border-t border-gray-200">
                                    <Link to={viewMoreLink}>Xem thêm</Link>
                                </li>
                            )}
                        </>
                    ) : text === "Doanh Nghiệp" && displayedBusinessPackages.length > 0 ? (
                        <>
                            {displayedBusinessPackages.map((item, idx) => (
                                <Link to="/doanh-nghiep">
                                    <li
                                        key={idx}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between border-b border-gray-200 last:border-b-0"
                                    >
                                        <span className="text-sm">{item.name} - {item.domesticBandwidth}</span>
                                        <span className="text-[#D70026] font-semibold text-sm">
                                            {item.price.toLocaleString()} VNĐ
                                        </span>
                                    </li></Link>
                            ))}
                            {businessPackages.length > 6 && (
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#D70026] font-semibold text-sm border-t border-gray-200">
                                    <Link to={viewMoreLink}>Xem thêm</Link>
                                </li>
                            )}
                        </>
                    ) : text === "Di động" && displayedSimPackages.length > 0 ? (
                        <>
                            {displayedSimPackages.map((item, idx) => (
                               <Link to={`/goi-cuoc/${item.name}`} key={idx}>
                                    <li
                                        key={idx}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between border-b border-gray-200 last:border-b-0"

                                    >
                                        <span className="text-sm">{item.name} - {item.data}</span>
                                        <span className="text-[#D70026] font-semibold text-sm">
                                            {item.price.toLocaleString()} VNĐ
                                        </span>
                                    </li>
                                </Link>
                            ))}
                            {totalSimPackages > 6 && (
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#D70026] font-semibold text-sm border-t border-gray-200">
                                    <Link to={viewMoreLink}>Xem thêm</Link>
                                </li>
                            )}
                        </>
                    ) : (
                        <li className="px-4 py-2 text-[#333333]">Không có dữ liệu</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default HeaderNavItem;