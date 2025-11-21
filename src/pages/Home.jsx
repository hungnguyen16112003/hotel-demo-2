import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import rooms from "../data/rooms";
import RoomCard from "../components/RoomCard";

const carouselImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1920&q=80",
];

const Home = () => {
  const featuredRooms = rooms.slice(0, 3);

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Carousel Section */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active !bg-brand",
          }}
          loop={true}
          className="h-full w-full"
        >
          {carouselImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <img
                  src={image}
                  alt={`Hotel view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 flex items-end">
          <div className="container mx-auto px-4 pb-20 text-white">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-2 bg-brand/90 backdrop-blur-sm rounded-full text-sm font-bold uppercase tracking-wider mb-4 animate-slide-in-left">
                Demo Hotel Experience
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-up" style={{ animationDelay: '0.2s' }}>
                Kỳ nghỉ đáng nhớ
                <br />
                <span className="text-brand-light">tại Đà Nẵng</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                Khách sạn 5 sao với view biển tuyệt đẹp, dịch vụ đẳng cấp thế giới
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.6s' }}>
                <Link
                  to="/rooms"
                  className="px-8 py-4 bg-brand hover:bg-brand-dark rounded-full font-bold text-lg text-white hover:text-white transition-all transform hover:scale-105 shadow-2xl"
                >
                  Khám phá phòng nghỉ
                </Link>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full font-bold text-lg border-2 border-white transition-all"
                >
                  Liên hệ ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 animate-zoom-in hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">120+ Phòng</h3>
              <p className="text-gray-600">Từ phòng tiêu chuẩn đến suite cao cấp</p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/20 border-2 border-accent/30 animate-zoom-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center animate-rotate-in">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Dịch vụ 24/7</h3>
              <p className="text-gray-600">Hỗ trợ khách hàng mọi lúc mọi nơi</p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 animate-zoom-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Gần biển</h3>
              <p className="text-gray-600">5 phút đi bộ đến bãi biển Mỹ Khê</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <span className="inline-block px-4 py-2 bg-brand/10 text-brand font-bold uppercase tracking-wider rounded-full mb-4 animate-bounce-in">
              Phòng nghỉ nổi bật
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              Không gian sang trọng
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
              Mỗi phòng được thiết kế tinh tế với nội thất cao cấp và view tuyệt đẹp
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredRooms.map((room, index) => (
              <div key={room.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <RoomCard room={room} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/rooms"
              className="inline-block px-8 py-4 bg-brand hover:bg-brand-dark text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              Xem tất cả phòng →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-brand to-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">Sẵn sàng đặt phòng?</h2>
            <p className="text-xl mb-8 text-amber-100 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Liên hệ với chúng tôi ngay để nhận ưu đãi đặc biệt
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <a
                href="#"
                className="px-8 py-4 bg-white text-brand font-bold rounded-full hover:bg-amber-50 transition-all transform hover:scale-105 shadow-xl"
              >
                Liên hệ Zalo
              </a>
              <a
                href="#"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white font-bold rounded-full hover:bg-white/30 transition-all"
              >
                Gọi Hotline
              </a>
              <a
                href="#"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white font-bold rounded-full hover:bg-white/30 transition-all"
              >
                Facebook Fanpage
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
