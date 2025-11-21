import { useState, useEffect } from "react";

const contactOptions = [
  {
    label: "Chat Zalo",
    href: "#",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg",
  },
  {
    label: "Gọi Hotline",
    href: "tel:0901234567",
    icon: "https://img.icons8.com/fluency/96/ringer-volume.png",
  },
];

const FloatingContact = () => {
  const [showOnTop, setShowOnTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowOnTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 2 nút liên hệ bên trái */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 md:gap-4">
        {contactOptions.map((option, index) => (
          <a
            key={option.label}
            href={option.href}
            className="group relative flex items-center justify-center md:justify-start gap-0 md:gap-3 rounded-full bg-white px-3 py-3 md:px-5 md:py-3 shadow-2xl border-2 border-brand/20 hover:border-brand transition-all transform hover:scale-110 hover:-translate-y-1 animate-slide-in-left"
            style={{ animationDelay: `${index * 150}ms` }}
            title={option.label}
          >
            <div className="relative">
              <img
                src={option.icon}
                alt={option.label}
                className="h-12 w-12 md:h-12 md:w-12 rounded-full object-contain transition-all"
              />
            </div>
            <span className="hidden md:inline text-sm font-bold text-gray-900 group-hover:text-brand transition-colors">
              {option.label}
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
      ))}
    </div>

    {/* Nút onTop bên phải */}
    {showOnTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-brand to-brand-dark text-white shadow-2xl border-2 border-white/20 hover:border-white transition-all transform hover:scale-110 hover:-translate-y-1 animate-bounce-in"
        title="Lên đầu trang"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    )}
    </>
  );
};

export default FloatingContact;
