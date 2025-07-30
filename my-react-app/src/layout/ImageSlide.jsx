import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

function ImageSlide() {
  return (
    <Swiper
      className="h-[430px] rounded-2xl"
      modules={[Autoplay, FreeMode]}
      spaceBetween={0}
      autoplay={{ delay: 3000 }}
      loop={true}
      slidesPerView={1}
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="h-[430px] flex justify-center items-center">
          <img
            className="w-full h-full  block md:hidden rounded-2xl"
            src="/0b896203d6172ebd1de28e0bd439df2dced6d54f.jpg"
            alt=""
          />
          <img
            className="hidden md:block w-[85vw] h-[90%]  rounded-2xl"
            src="/78364f37240173bd9fdd2b7992c4b9734f4f8bca.jpg"
            alt=""
          />
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="h-[430px] flex justify-center items-center">
          <img
            className="w-full h-full  block md:hidden rounded-2xl"
            src="/6f4f20791fd99dbf264365e57340e08c99b2f120.jpg"
            alt=""
          />
          <img
            className="hidden md:block w-[85vw] h-[90%]  rounded-2xl"
            src="/93e218e5d004067fb4534de5b29ae260a9e8162f.jpg"
            alt=""
          />
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <div className="h-[430px] flex justify-center items-center">
          <img
            className="w-full h-full  block md:hidden rounded-2xl"
            src="/camera_image(3).jpg"
            alt=""
          />
          <img
            className="hidden md:block w-[85vw] h-[90%] rounded-2xl"
            src="/viettel_camera_image.png"
            alt=""
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default ImageSlide;
