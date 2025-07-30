const serviceCards = [
  {
    icon: "/didong.png",
    title: "Di động",
    desc: "Gói cước di động, dịch vụ SIM số, dịch vụ GTGT, dịch vụ quốc tế.",
  },
  {
    icon: "/internettruyenhinh.png",
    title: "Internet - Truyền hình",
    desc: "Internet tốc độ cao cho cá nhân/doanh nghiệp, gói truyền hình,...",
  },
  {
    icon: "/thietbidienthoai.png",
    title: "Điện thoại - Thiết bị",
    desc: "Thiết bị smart home, camera giám sát, TV Box, điện thoại 4G,...",
  },
  {
    icon: "/khachhangdoanhnghiep.png",
    title: "Khách hàng doanh nghiệp",
    desc: "Giải pháp CNTT, giải pháp viễn thông, giải pháp IoT.",
  },
];function ServiceCategory() {
  return (
    <section className="px-4 py-10 lg:px-16 md:px-8 ">
      <h2 >Sản phẩm dịch vụ đa dạng</h2>
        <div className="h-4"></div>
      <div className="max-w-screen-xl mx-auto grid grid-cols-4  gap-2 md:gap-4 md:px-6">
        {serviceCards.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-2 md:p-6 shadow-lg hover:shadow-xl transition text-base md:text-lg flex flex-col items-center min-h-[180px] md:min-h-[340px]"
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-full aspect-[5/4] rounded-xl object-cover mb-3"
            />
            <h3 className="font-semibold text-center">{item.title}</h3>
            <p className="text-gray-600 hidden md:block text-center text-sm md:text-base">
              {item.desc}
            </p>
            <a
              href="#"
              className="hidden md:block text-red-600 text-sm md:text-base font-medium hover:underline mt-3"
            >
              Xem chi tiết →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}


export default ServiceCategory;
