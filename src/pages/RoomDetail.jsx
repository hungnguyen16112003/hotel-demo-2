import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import rooms from "../data/rooms";

const RoomDetail = () => {
  const { id } = useParams();
  const room = rooms.find((item) => item.id === id);

  // Tự động scroll lên đầu trang khi vào trang chi tiết
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!room) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white px-4">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl border-2 border-amber-200">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy phòng bạn yêu cầu
          </p>
          <Link
            to="/rooms"
            className="inline-flex px-8 py-4 rounded-full bg-gradient-to-r from-brand to-brand-dark text-white font-bold hover:shadow-xl transition-all transform hover:scale-105"
          >
            ← Quay lại danh sách phòng
          </Link>
        </div>
      </section>
    );
  }

  const gallery = room.gallery?.length ? room.gallery : [room.image];
  const [selectedImage, setSelectedImage] = useState(gallery[0]);

  return (
    <section className="bg-gradient-to-b from-amber-50 via-white to-amber-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 text-brand font-bold hover:text-brand-dark mb-6 group"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Quay lại danh sách phòng
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Gallery */}
          <div className="space-y-4 animate-slide-in-left">
            {/* Ảnh lớn phía trên */}
            <div className="rounded-3xl overflow-hidden shadow-2xl animate-zoom-in">
              <img
                src={selectedImage}
                alt={room.name}
                className="w-full h-96 object-cover transition-opacity duration-300"
              />
            </div>
            {/* Danh sách thumbnail phía dưới */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {gallery.map((imgUrl, index) => (
                  <button
                    key={imgUrl}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 animate-scale-in ${
                      selectedImage === imgUrl
                        ? 'ring-4 ring-brand scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                  >
                    <img
                      src={imgUrl}
                      alt={`${room.name} ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-amber-100 animate-slide-in-right">
            <div className="mb-6 animate-fade-up">
              <span className="inline-block px-4 py-2 bg-brand/10 text-brand font-bold uppercase tracking-wider rounded-full text-xs mb-4 animate-bounce-in">
                {room.name}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                {room.name}
              </h1>
              <div className="flex items-center gap-3 mb-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <span className="text-3xl font-bold bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                  {room.price}
                </span>
                <span className="text-gray-500">/ đêm</span>
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              {room.description}
            </p>

            <div className="mb-8 animate-fade-up" style={{ animationDelay: '0.8s' }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-brand rounded-full animate-slide-in-left"></span>
                Tiện nghi bao gồm
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {room.amenities.map((amenity, index) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200 animate-scale-in hover:scale-105 transition-transform"
                    style={{ animationDelay: `${(index * 0.1) + 1}s` }}
                  >
                    <svg
                      className="w-5 h-5 text-brand animate-rotate-in"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-brand to-brand-dark text-white font-bold rounded-full hover:shadow-2xl transition-all transform hover:scale-105 text-lg animate-bounce-in" style={{ animationDelay: '1.2s' }}>
              Liên hệ đặt phòng ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetail;
