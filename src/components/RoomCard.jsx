import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <article className="group bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-brand/30 animate-fade-up">
      <div className="relative h-64 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 px-4 py-2 bg-brand text-white font-bold rounded-full shadow-lg">
          {room.price}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{room.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="px-3 py-1 bg-amber-50 text-brand text-xs font-semibold rounded-full border border-amber-200"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
              +{room.amenities.length - 3} khác
            </span>
          )}
        </div>
        <Link
          to={`/rooms/${room.id}`}
          className="mt-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-brand to-brand-dark text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
        >
          Xem chi tiết →
        </Link>
      </div>
    </article>
  );
};

export default RoomCard;
