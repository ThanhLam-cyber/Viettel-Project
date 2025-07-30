function ViettelSimExplorer() {
  return (
    <div className="p-4 md:px-8 lg:px-4 ">
      <h2>
        Sim đẹp phủ sóng toàn quốc
      </h2>
      <div className="h-7"></div>

      {/* Giới hạn chiều cao toàn bộ grid trên md */}
      <div className="grid grid-cols-3 md:grid-cols-2 gap-2 md:grid-rows-2 md:h-[350px] overflow-hidden rounded-xl lg:px-20 md:px-6">
        {/* Ảnh 1 – chiếm 2 cột và 2 hàng bên trái */}
        <div className="md:col-span-1 md:row-span-2">
          {/* Mobile */}
          <img
            className="block md:hidden w-full"
            src="/sim_image_small(3).png"
            alt="sim"
          />
          {/* Desktop */}
          <img
            className="hidden md:block w-full h-full object-cover rounded-xl"
            src="/sim_image1.png"
            alt="sim"
          />
        </div>

        {/* Ảnh 2 – top right */}
        <div>
          <img
            className="block md:hidden object-center w-full"
            src="/sim_image_small(2).png"
            alt="sim"
          />
          <img
            className="hidden md:block w-full  h-full object-left-bottom "
            src="/sim_image2.jpg"
            alt="sim"
          />
        </div>

        {/* Ảnh 3 – bottom right */}
        <div>
          <img
            className="block md:hidden w-full"
            src="/sim_image_small(1).png"
            alt="sim"
          />
          <img
            className="hidden md:block w-full  h-full object-left-bottom"
            src="/sim_image3.png"
            alt="sim"
          />
        </div>
      </div>
    </div>
  );
}

export default ViettelSimExplorer;
