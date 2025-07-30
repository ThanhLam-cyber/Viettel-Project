import React from "react";

const helpOptions = [
    { icon: "/gioithieu.png", label: "Giới thiệu Viettel", link: "https://www.vietteltelecom.vn/vx/gioi-thieu-viettel", },
    { icon: "/chat_luong_dich_vu.png", label: "Chất lượng dịch vụ", link: "https://www.vietteltelecom.vn/chat-luong-dich-vu/quan-ly-chat-luong-dich-vu", },
    { icon: "/cau_hoi_thuong_gap.png", label: "Câu hỏi thường gặp", link: "https://www.vietteltelecom.vn/vx/ho-tro/cau-hoi-thuong-gap", },
    { icon: "/video_huong_dan.png", label: "Video hướng dẫn", link: "https://www.vietteltelecom.vn/video-huong-dan-cskh", },
    { icon: "/timkiemcuahang.png", label: "Tìm kiếm cửa hàng", link: "https://www.vietteltelecom.vn/vx/cua-hang", },
    {
        icon: "/phan_anh_gop_y.png", label: "Phản ánh góp ý", link: "https://www.vietteltelecom.vn/vx/dang-nhap",
    },
    { icon: "/chat_voi_CSKH.png", label: "Chat với CSKH", link: "https://www.facebook.com/messages/t/Vietteltelecom", },
];

export default function HelpCenter() {
    return (
        <div className="bg-[#f9f9f9] px-4 py-12 sm:px-6 lg:px-20">

            {/* Title */}
            <h2>
                Bạn cần trợ giúp?
            </h2>
            <div className="h-5"></div>

            {/* Help options */}
            <div className=" bg-white  md:bg-transparent rounded-xl  grid grid-row-2 grid-cols-5 md:grid-cols-7 gap-6 md:gap-4 md:w-8/4">
                {helpOptions.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" md:bg-none rounded-2xl   transition p-4 flex flex-col items-center text-center hover:bg-gray-50"
                    >
                        <div
                            key={idx}
                            className="md:bg-white bg-none md:shadow-md  rounded-2xl  md:hover:shadow-md transition p-4 flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 rounded-xl bg-[#f7f2f3] flex items-center justify-center mb-3">
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="w-8 h-8 object-contain"
                                />
                            </div>
                            <p className="text-sm font-medium text-gray-800 leading-tight">
                                {item.label}
                            </p>

                        </div>
                    </a>
                ))}
            </div>
        </div>

    );
}
