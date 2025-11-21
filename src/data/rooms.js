const rooms = [
  {
    id: 'standard',
    name: 'Phòng Standard',
    price: '800.000đ / đêm',
    description:
      'Không gian ấm cúng cho các cặp đôi hoặc khách công tác, nội thất tối giản nhưng đầy đủ tiện nghi.',
    amenities: ['Wifi tốc độ cao', 'Máy lạnh', 'Smart TV 43"', 'Mini bar', 'Bàn làm việc nhỏ'],
    image:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80',
    ],
    status: 'Hiển thị',
  },
  {
    id: 'deluxe',
    name: 'Phòng Deluxe',
    price: '1.200.000đ / đêm',
    description:
      'Diện tích lớn hơn, cửa sổ hướng biển với ánh sáng tự nhiên, thích hợp cho kỳ nghỉ thư giãn.',
    amenities: ['Giường king size', 'Bồn tắm đứng', 'Máy pha cà phê', 'Két an toàn', 'Bluetooth speaker'],
    image:
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=900&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=80',
    ],
    status: 'Hiển thị',
  },
  {
    id: 'suite',
    name: 'Phòng Suite',
    price: '2.200.000đ / đêm',
    description:
      'Không gian riêng biệt phòng khách + phòng ngủ, ban công rộng mở, dịch vụ phòng 24/7.',
    amenities: ['Ban công riêng', 'Phòng khách riêng', 'Bồn tắm nằm', 'Dịch vụ phòng 24/7', 'Máy lọc không khí'],
    image:
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=80',
    ],
    status: 'Ẩn',
  },
  {
    id: 'family',
    name: 'Phòng Family Triple',
    price: '1.600.000đ / đêm',
    description:
      'Hai giường queen và sofa bed, phù hợp cho gia đình nhỏ với khu chơi trẻ em trong phòng.',
    amenities: ['Hai giường queen', 'Góc đọc sách', 'Tủ lạnh mini', 'Máy lọc nước', 'Combo đồ chơi trẻ em'],
    image:
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=900&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80',
    ],
    status: 'Hiển thị',
  },
  {
    id: 'penthouse',
    name: 'Penthouse Sky View',
    price: '3.800.000đ / đêm',
    description:
      'Toàn bộ tầng thượng với hồ jacuzzi riêng, bếp mini và view 270° hướng biển.',
    amenities: ['Jacuzzi ngoài trời', 'Bếp mini', 'Loa cao cấp', 'Dịch vụ quản gia', 'Bộ trà chiều riêng'],
    image:
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80',
    ],
    status: 'Hiển thị',
  },
  {
    id: 'wellness',
    name: 'Wellness Spa Room',
    price: '1.900.000đ / đêm',
    description:
      'Thiết kế tối giản với góc spa riêng, tinh dầu thư giãn và phòng tắm đá cẩm thạch.',
    amenities: ['Máy khuếch tán tinh dầu', 'Bồn tắm đá', 'Gương thông minh', 'Loa surround', 'Set trà detox'],
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80',
    ],
    status: 'Hiển thị',
  },
  {
    id: 'cityview',
    name: 'City View Executive',
    price: '1.450.000đ / đêm',
    description:
      'View thành phố từ tầng 15, có bàn làm việc lớn và ghế lounge dành cho khách công tác.',
    amenities: ['Bàn làm việc 1m4', 'Đèn đọc sách', 'Máy pha cà phê capsule', 'Loa Bluetooth', 'Két cá nhân'],
    image:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=900&q=80',
    ],
    status: 'Hiển thị',
  },
  {
    id: 'business',
    name: 'Business Corner Suite',
    price: '2.500.000đ / đêm',
    description:
      'Phòng góc kính toàn cảnh, phòng họp mini với màn hình 65" và dịch vụ in ấn theo yêu cầu.',
    amenities: ['Phòng họp mini', 'Màn hình 65"', 'Máy in di động', 'Sofa dài', 'Coffee break miễn phí'],
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=80',
    ],
    status: 'Hiển thị',
  },
]

export default rooms
