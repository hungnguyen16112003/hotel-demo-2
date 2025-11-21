import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import initialRooms from "../data/rooms";

const statusOptions = ["Hiển thị", "Ẩn"];

const defaultForm = {
  name: "",
  price: "",
  description: "",
  image: "",
  amenities: "",
  gallery: "",
  status: statusOptions[0],
};

const parseCommaList = (value = "") => {
  if (!value || typeof value !== "string") return [];
  const list = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  // Loại bỏ duplicate
  return Array.from(new Set(list));
};

// Helper để validate và chuẩn hóa URL ảnh
const normalizeImageUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // Nếu là base64 data URL, dùng trực tiếp
  if (trimmed.startsWith("data:image/")) {
    return trimmed;
  }

  // Nếu là URL thông thường (http/https), dùng trực tiếp
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Nếu là blob URL, dùng trực tiếp
  if (trimmed.startsWith("blob:")) {
    return trimmed;
  }

  // Nếu không khớp format nào, thử thêm https://
  if (trimmed.includes(".") && !trimmed.includes(" ")) {
    return `https://${trimmed}`;
  }

  return null;
};

// Component để hiển thị ảnh
const ImagePreview = ({ src, alt, onRemove, index }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Tính toán URL ngay khi render
  const imageUrl = normalizeImageUrl(src);
  const isValidUrl = !!imageUrl;

  const handleError = () => {
    console.error("Lỗi tải ảnh:", src);
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Reset khi src thay đổi
  useEffect(() => {
    setHasError(!isValidUrl);
    setIsLoading(isValidUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  if (hasError || !imageUrl) {
    return (
      <div className="relative group rounded-xl overflow-hidden border-2 border-red-200 hover:border-red-300 transition-all duration-300">
        <div className="relative aspect-square bg-slate-100 flex items-center justify-center">
          <div className="text-center p-4">
            <svg
              className="w-8 h-8 text-red-400 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-xs text-red-600 font-semibold">Lỗi tải ảnh</p>
            <p className="text-xs text-slate-400 mt-1 break-all px-2">
              {src?.substring(0, 30)}...
            </p>
          </div>
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(src)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-100 hover:bg-red-600 transition-all duration-300 transform hover:scale-110 z-10"
              title="Xóa ảnh"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative group rounded-xl overflow-hidden border-2 border-slate-200 hover:border-brand/50 transition-all duration-300 motion-safe:animate-scale-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-square bg-slate-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
            <div className="w-8 h-8 border-4 border-brand/30 border-t-brand rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={imageUrl}
          alt={alt || `Preview ${index + 1}`}
          className={`h-full w-full object-cover ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
          loading="lazy"
          crossOrigin="anonymous"
        />
        {!hasError && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(src)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all duration-300 transform hover:scale-110 z-10"
                title="Xóa ảnh"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-x-0 bottom-0 bg-slate-900/80 text-white text-xs text-center py-2 font-semibold hover:bg-slate-900 transition-colors z-10"
            >
              Xem ảnh
            </a>
          </>
        )}
      </div>
    </div>
  );
};

const Admin = () => {
  const [roomList, setRoomList] = useState(initialRooms);
  const [formValues, setFormValues] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [blobUrls, setBlobUrls] = useState(new Map()); // Lưu blob URLs để cleanup
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const formRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    // Cleanup tất cả blob URLs trước khi reset
    blobUrls.forEach((_, url) => {
      if (url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });
    setBlobUrls(new Map());
    setFormValues(defaultForm);
    setEditingId(null);
  };

  // Cleanup blob URLs khi component unmount
  useEffect(() => {
    return () => {
      blobUrls.forEach((_, url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [blobUrls]);

  // Cleanup scroll khi component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Đóng modal khi nhấn ESC và disable scroll khi modal mở
  useEffect(() => {
    if (isDeleteModalOpen) {
      // Disable scroll khi modal mở
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e) => {
        if (e.key === "Escape") {
          setIsDeleteModalOpen(false);
          setRoomToDelete(null);
        }
      };
      document.addEventListener("keydown", handleEscape);
      
      return () => {
        // Enable scroll khi modal đóng
        document.body.style.overflow = '';
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      // Đảm bảo enable scroll khi modal đóng
      document.body.style.overflow = '';
    }
  }, [isDeleteModalOpen]);

  const handleEdit = (room) => {
    setFormValues({
      name: room.name || "",
      price: room.price || "",
      description: room.description || "",
      image: room.image || "",
      amenities: room.amenities?.join(", ") || "",
      gallery: room.gallery?.join(", ") || "",
      status: room.status || statusOptions[0],
    });
    setEditingId(room.id);
    
    // Scroll đến form trên mobile
    if (window.innerWidth < 768 && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }, 100);
    }
  };

  const handleDeleteClick = (room) => {
    setRoomToDelete(room);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!roomToDelete) return;

    const roomId = roomToDelete.id;
    setRoomList((prev) => prev.filter((room) => room.id !== roomId));
    if (editingId === roomId) {
      resetForm();
    }
    setIsDeleteModalOpen(false);
    setRoomToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setRoomToDelete(null);
  };

  const createNewId = (name) => {
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return slug ? `${slug}-${Date.now()}` : `room-${Date.now()}`;
  };

  const handleFeaturedImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File không phải là ảnh. Vui lòng chọn file ảnh (PNG, JPG, WEBP).");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File quá lớn (>10MB). Vui lòng chọn file nhỏ hơn.");
      event.target.value = "";
      return;
    }

    try {
      // Cleanup blob URL cũ nếu có
      if (formValues.image && formValues.image.startsWith("blob:")) {
        URL.revokeObjectURL(formValues.image);
        setBlobUrls((prev) => {
          const updated = new Map(prev);
          updated.delete(formValues.image);
          return updated;
        });
      }

      const blobUrl = URL.createObjectURL(file);

      // Lưu blob URL để cleanup sau
      setBlobUrls((prev) => {
        const updated = new Map(prev);
        updated.set(blobUrl, true);
        return updated;
      });

      // Set vào formValues.image
      setFormValues((prev) => ({ ...prev, image: blobUrl }));
      console.log("✅ Đã tải ảnh đại diện thành công");
    } catch (error) {
      console.error("Lỗi tạo blob URL:", error);
      alert("Có lỗi xảy ra khi tải ảnh. Vui lòng thử lại.");
    } finally {
      event.target.value = "";
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const newBlobUrls = [];
    const validFiles = [];

    // Tạo blob URL cho mỗi file hợp lệ
    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        console.warn(`File ${file.name} không phải là ảnh, bỏ qua`);
        return;
      }

      // Kiểm tra kích thước (tối đa 10MB)
      if (file.size > 10 * 1024 * 1024) {
        console.warn(`File ${file.name} quá lớn (>10MB), bỏ qua`);
        return;
      }

      try {
        const blobUrl = URL.createObjectURL(file);
        newBlobUrls.push(blobUrl);
        validFiles.push(file);
      } catch (error) {
        console.error(`Lỗi tạo blob URL cho ${file.name}:`, error);
      }
    });

    if (newBlobUrls.length === 0) {
      alert(
        "Không có ảnh hợp lệ nào. Vui lòng chọn file ảnh (PNG, JPG, WEBP) dưới 10MB."
      );
      event.target.value = "";
      return;
    }

    // Lưu blob URLs để cleanup sau
    setBlobUrls((prev) => {
      const updated = new Map(prev);
      newBlobUrls.forEach((url) => {
        updated.set(url, true);
      });
      return updated;
    });

    // Thêm vào gallery (loại bỏ duplicate)
    setFormValues((prev) => {
      const existing = parseCommaList(prev.gallery || "");
      // Chỉ thêm những URL chưa có
      const uniqueNewUrls = newBlobUrls.filter(
        (url) => !existing.includes(url)
      );
      const merged = [...existing, ...uniqueNewUrls];
      return { ...prev, gallery: merged.join(", ") };
    });

    console.log(`✅ Đã thêm ${newBlobUrls.length} ảnh vào gallery`);
    event.target.value = "";
  };

  const removeImageFromGallery = (imgUrlToRemove) => {
    // Cleanup blob URL nếu là blob URL
    if (imgUrlToRemove.startsWith("blob:")) {
      URL.revokeObjectURL(imgUrlToRemove);
      setBlobUrls((prev) => {
        const updated = new Map(prev);
        updated.delete(imgUrlToRemove);
        return updated;
      });
    }

    setFormValues((prev) => {
      const existing = parseCommaList(prev.gallery);
      const filtered = existing.filter((url) => url !== imgUrlToRemove);
      return { ...prev, gallery: filtered.join(", ") };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const sanitizedValues = {
      name: formValues.name.trim(),
      price: formValues.price.trim(),
      description: formValues.description.trim(),
      image: formValues.image.trim(),
      status: formValues.status,
      amenities: parseCommaList(formValues.amenities),
      gallery: parseCommaList(formValues.gallery),
    };

    if (!sanitizedValues.gallery.length && sanitizedValues.image) {
      sanitizedValues.gallery = [sanitizedValues.image];
    }

    if (!sanitizedValues.amenities.length) {
      sanitizedValues.amenities = ["Wifi", "Máy lạnh", "Smart TV"];
    }

    if (editingId) {
      setRoomList((prev) =>
        prev.map((room) =>
          room.id === editingId
            ? {
                ...room,
                ...sanitizedValues,
              }
            : room
        )
      );
      console.log("Cập nhật phòng:", { id: editingId, ...sanitizedValues });
    } else {
      const newRoom = {
        id: createNewId(sanitizedValues.name || "room"),
        ...sanitizedValues,
      };
      setRoomList((prev) => [newRoom, ...prev]);
      console.log("Thêm phòng mới:", newRoom);
    }

    resetForm();
  };

  return (
    <section className="min-h-screen bg-slate-50 py-8 md:py-16 motion-safe:animate-fade-up">
      <div className="container mx-auto px-4 grid gap-6 md:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 overflow-x-auto motion-safe:animate-fade-in lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand">
                Phòng
              </p>
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                Danh sách quản trị
              </h1>
            </div>
            <span className="text-sm text-slate-500">(demo UI)</span>
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500 uppercase text-xs border-b border-slate-100">
                  <th className="py-3">Tên phòng</th>
                  <th className="py-3">Giá</th>
                  <th className="py-3">Trạng thái</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {roomList.map((room) => (
                  <tr
                    key={room.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-4 font-semibold text-slate-800">
                      {room.name}
                    </td>
                    <td className="py-4 text-slate-600">{room.price}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          room.status === "Hiển thị"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {room.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(room)}
                          className="px-3 py-1.5 rounded-full border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors whitespace-nowrap"
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(room)}
                          className="px-3 py-1.5 rounded-full border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors whitespace-nowrap"
                        >
                          Xoá
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3 max-h-[50vh] overflow-y-auto pr-2">
            {roomList.map((room) => (
              <div
                key={room.id}
                className="border border-slate-200 rounded-xl p-4 bg-slate-50/50"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 text-sm mb-1 truncate">
                      {room.name}
                    </h3>
                    <p className="text-xs text-slate-600">{room.price}</p>
                  </div>
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 ${
                      room.status === "Hiển thị"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleEdit(room)}
                    className="flex-1 px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(room)}
                    className="flex-1 px-4 py-2 rounded-full border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={formRef}
          className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 motion-safe:animate-fade-up lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
          style={{ animationDelay: "150ms" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Thêm / chỉnh sửa phòng
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                {editingId
                  ? "Đang chỉnh sửa (demo)"
                  : "Form minh hoạ (console.log khi lưu)"}
              </p>
            </div>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs font-semibold text-brand hover:text-brand-light"
              >
                Huỷ chỉnh sửa
              </button>
            )}
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-semibold text-slate-700 mb-1"
                htmlFor="name"
              >
                Tên phòng
              </label>
              <input
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="Ví dụ: Phòng Premier"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-slate-700 mb-1"
                htmlFor="price"
              >
                Giá phòng
              </label>
              <input
                id="price"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="Ví dụ: 1.500.000đ / đêm"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-slate-700 mb-1"
                htmlFor="status"
              >
                Trạng thái hiển thị
              </label>
              <select
                id="status"
                name="status"
                value={formValues.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-slate-700 mb-1"
                htmlFor="description"
              >
                Mô tả ngắn
              </label>
              <textarea
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="Điểm nổi bật của phòng"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-slate-700 mb-1"
                htmlFor="amenities"
              >
                Tiện nghi (phân cách bằng dấu phẩy)
              </label>
              <textarea
                id="amenities"
                name="amenities"
                value={formValues.amenities}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="Wifi tốc độ cao, Máy lạnh, Smart TV..."
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-slate-700 mb-1"
                htmlFor="gallery"
              >
                Gallery URL (phân cách bằng dấu phẩy)
              </label>
              <div className="relative">
                <textarea
                  id="gallery"
                  name="gallery"
                  value={formValues.gallery}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-colors"
                  placeholder="https://images.unsplash.com/photo-1, https://images.unsplash.com/photo-2"
                />
                {formValues.gallery && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormValues((prev) => ({ ...prev, gallery: "" }))
                    }
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                    title="Xóa tất cả URL"
                  >
                    <svg
                      className="w-3 h-3 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Dán nhiều URL ảnh, phân cách bằng dấu phẩy. Hoặc tải ảnh lên ở
                bên dưới.
              </p>
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-slate-700 mb-2"
                htmlFor="image"
              >
                Ảnh đại diện
              </label>

              {/* Input URL */}
              <input
                id="image"
                name="image"
                value={formValues.image}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 mb-2"
                placeholder="https:// hoặc tải ảnh lên bên dưới"
              />

              {/* Upload button */}
              <label
                htmlFor="featuredImageUpload"
                className="relative flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-brand/30 bg-gradient-to-br from-brand/5 to-brand/10 cursor-pointer hover:border-brand/50 hover:bg-gradient-to-br hover:from-brand/10 hover:to-brand/15 transition-all duration-300 group"
              >
                <input
                  id="featuredImageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center group-hover:bg-brand/30 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-brand"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-brand group-hover:text-brand-light transition-colors">
                    Tải ảnh đại diện
                  </p>
                  <p className="text-xs text-slate-500">
                    PNG, JPG, WEBP (max 10MB)
                  </p>
                </div>
              </label>

              {/* Preview ảnh đại diện */}
              {formValues.image && (
                <div className="mt-3 relative rounded-xl overflow-hidden border-2 border-slate-200">
                  <div className="relative aspect-video bg-slate-100">
                    <img
                      src={
                        normalizeImageUrl(formValues.image) || formValues.image
                      }
                      alt="Ảnh đại diện"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e2e8f0' width='400' height='300'/%3E%3Ctext fill='%2394a3b8' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='14'%3ELỗi tải ảnh%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        // Cleanup blob URL nếu là blob URL
                        if (
                          formValues.image &&
                          formValues.image.startsWith("blob:")
                        ) {
                          URL.revokeObjectURL(formValues.image);
                          setBlobUrls((prev) => {
                            const updated = new Map(prev);
                            updated.delete(formValues.image);
                            return updated;
                          });
                        }
                        setFormValues((prev) => ({ ...prev, image: "" }));
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
                      title="Xóa ảnh đại diện"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <div className="absolute inset-x-0 bottom-0 bg-slate-900/70 text-white text-xs text-center py-2 font-semibold">
                      Ảnh đại diện
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Tải ảnh lên (hỗ trợ nhiều ảnh)
              </label>
              <label
                htmlFor="galleryUpload"
                className="relative flex flex-col items-center justify-center w-full h-40 rounded-2xl border-2 border-dashed border-brand/30 bg-gradient-to-br from-brand/5 to-brand/10 cursor-pointer hover:border-brand/50 hover:bg-gradient-to-br hover:from-brand/10 hover:to-brand/15 transition-all duration-300 group"
              >
                <input
                  id="galleryUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center group-hover:bg-brand/30 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-brand"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-brand group-hover:text-brand-light transition-colors">
                      Nhấn để chọn ảnh
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      PNG, JPG, WEBP (tối đa 10MB/ảnh)
                    </p>
                  </div>
                </div>
              </label>
              <p className="text-xs text-slate-500 mt-2">
                Ảnh sẽ được tạo blob URL local để hiển thị ngay lập tức.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">
                Danh sách hình ảnh ({parseCommaList(formValues.gallery).length})
              </p>
              {parseCommaList(formValues.gallery).length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {parseCommaList(formValues.gallery).map((imgUrl, index) => {
                    // Tạo key unique từ URL (hash đơn giản)
                    const urlHash =
                      imgUrl.length +
                      (imgUrl.substring(0, 20) || "").replace(/\s/g, "");
                    const uniqueKey = `img-${index}-${urlHash}`;
                    return (
                      <ImagePreview
                        key={uniqueKey}
                        src={imgUrl}
                        alt={`Preview ${index + 1}`}
                        index={index}
                        onRemove={removeImageFromGallery}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <svg
                    className="w-12 h-12 text-slate-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm text-slate-500">
                    Chưa có ảnh nào trong gallery.
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Thêm URL hoặc tải ảnh lên để bắt đầu
                  </p>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-brand text-white py-3 text-sm font-semibold hover:bg-brand-light transition"
            >
              {editingId ? "Cập nhật phòng" : "Lưu"}
            </button>
          </form>
        </div>
      </div>

      {/* Delete Confirmation Modal - Render via Portal */}
      {isDeleteModalOpen &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              onClick={handleDeleteCancel}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                margin: 0,
                padding: 0,
              }}
            />

            {/* Modal - Fixed ở giữa viewport */}
            <div
              className="fixed z-[9999]"
              style={{
                position: "fixed",
                top: "50vh",
                left: "50vw",
                width: "90%",
                maxWidth: "28rem",
                margin: 0,
                padding: 0,
                transform: "translate(-50%, -50%)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="animate-modal-in">
                <div className="bg-white rounded-2xl shadow-2xl w-full p-6">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center animate-scale-in">
                      <svg
                        className="w-8 h-8 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      Xác nhận xóa phòng
                    </h3>
                    <p className="text-sm text-slate-600 mb-1">
                      Bạn có chắc muốn xóa phòng
                    </p>
                    <p className="text-base font-semibold text-slate-800 mb-2">
                      "{roomToDelete?.name}"
                    </p>
                    <p className="text-xs text-red-600 font-medium">
                      Hành động này không thể hoàn tác!
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleDeleteCancel}
                      className="flex-1 px-4 py-2.5 rounded-full border-2 border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all duration-200"
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteConfirm}
                      className="flex-1 px-4 py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Xóa phòng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </section>
  );
};

export default Admin;
