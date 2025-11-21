import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import Admin from "./pages/Admin";
import FloatingContact from "./components/FloatingContact";

const navLinkClasses = ({ isActive }) =>
  `text-sm font-bold tracking-wide px-5 py-2.5 rounded-full transition-all ${
    isActive
      ? "bg-brand text-white shadow-lg"
      : "text-gray-700 hover:bg-amber-50 hover:text-brand"
  }`;

const footerLinks = [
  {
    title: "Khám phá",
    items: [
      { label: "Danh sách phòng", href: "/rooms" },
      { label: "Ưu đãi cuối tuần", href: "#" },
      { label: "Combo tour Đà Nẵng", href: "#" },
    ],
  },
  {
    title: "Dịch vụ nổi bật",
    items: [
      { label: "Đón sân bay miễn phí", href: "#" },
      { label: "Thuê xe riêng", href: "#" },
      { label: "Ẩm thực tại phòng", href: "#" },
    ],
  },
];

const contactDetails = [
  "123 Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng",
  "Hotline: 0901 234 567",
  "Email: booking@demohotel.vn",
  "Zalo CSKH: 0901 888 000",
];

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDesktopMenuOpen && !event.target.closest(".menu-container")) {
        setIsDesktopMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDesktopMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDesktopMenu = () => {
    setIsDesktopMenuOpen(!isDesktopMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeDesktopMenu = () => {
    setIsDesktopMenuOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white">
        <header className="bg-white/80 backdrop-blur-lg border-b-2 border-amber-200 sticky top-0 z-50 shadow-md animate-fade-down">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <NavLink
              to="/"
              className="text-3xl font-bold bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent hover:scale-105 transition-transform animate-slide-in-left"
              onClick={closeMobileMenu}
            >
              Demo Hotel
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-3 animate-slide-in-right">
              <NavLink to="/" className={navLinkClasses} end>
                Trang chủ
              </NavLink>
              <NavLink to="/rooms" className={navLinkClasses}>
                Danh sách phòng
              </NavLink>
              <NavLink to="/admin" className={navLinkClasses}>
                Admin
              </NavLink>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-brand hover:bg-amber-50 transition-all duration-300 animate-slide-in-right"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t-2 border-amber-200 bg-white/95 backdrop-blur-lg animate-slide-down">
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
                <NavLink
                  to="/"
                  className={navLinkClasses}
                  end
                  onClick={closeMobileMenu}
                >
                  Trang chủ
                </NavLink>
                <NavLink
                  to="/rooms"
                  className={navLinkClasses}
                  onClick={closeMobileMenu}
                >
                  Danh sách phòng
                </NavLink>
                <NavLink
                  to="/admin"
                  className={navLinkClasses}
                  onClick={closeMobileMenu}
                >
                  Admin
                </NavLink>
              </nav>
            </div>
          )}
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 mt-12 animate-fade-up">
          <div className="container mx-auto px-4 grid gap-10 md:grid-cols-3">
            <div className="animate-slide-in-left">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                Demo Hotel
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Khách sạn 5 sao với view biển tuyệt đẹp, dịch vụ đẳng cấp thế giới và
                trải nghiệm nghỉ dưỡng không thể quên tại Đà Nẵng.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                {contactDetails.map((item) => (
                  <p key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand rounded-full"></span>
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {footerLinks.map((column, index) => (
              <div key={column.title} className="animate-fade-up" style={{ animationDelay: `${(index + 1) * 0.2}s` }}>
                <h4 className="text-lg font-bold mb-4 text-brand-light uppercase tracking-wider">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-gray-300 hover:text-brand-light transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-brand transition-all"></span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Demo Hotel · Made for demo purposes
            </p>
          </div>
        </footer>
        <FloatingContact />
      </div>
    </BrowserRouter>
  );
};

export default App;
