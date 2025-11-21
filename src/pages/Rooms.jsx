import rooms from "../data/rooms";
import RoomCard from "../components/RoomCard";

const Rooms = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-white to-amber-50 py-20 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-3 bg-brand/10 text-brand font-bold uppercase tracking-wider rounded-full mb-6 animate-bounce-in">
            Danh sách phòng
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            Chọn không gian
            <br />
            <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              phù hợp cho bạn
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.4s' }}>
            Mỗi phòng được thiết kế tinh tế với nội thất cao cấp, đầy đủ tiện nghi hiện đại
            và view tuyệt đẹp. Chúng tôi cam kết mang đến trải nghiệm nghỉ dưỡng hoàn hảo.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-amber-100 animate-zoom-in hover:scale-110 transition-transform duration-300">
            <div className="text-4xl font-bold text-brand mb-2">{rooms.length}</div>
            <div className="text-sm text-gray-600 font-semibold">Loại phòng</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-amber-100 animate-zoom-in hover:scale-110 transition-transform duration-300" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl font-bold text-accent mb-2">120+</div>
            <div className="text-sm text-gray-600 font-semibold">Tổng số phòng</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-amber-100 animate-zoom-in hover:scale-110 transition-transform duration-300" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600 font-semibold">Dịch vụ hỗ trợ</div>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <div key={room.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
