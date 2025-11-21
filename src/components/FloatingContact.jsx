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
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:gap-4">
      {contactOptions.map((option, index) => (
        <a
          key={option.label}
          href={option.href}
          className="group relative flex items-center justify-center md:justify-start gap-0 md:gap-3 rounded-full bg-white px-3 py-3 md:px-5 md:py-3 shadow-2xl border-2 border-brand/20 hover:border-brand transition-all transform hover:scale-110 hover:-translate-y-1 animate-slide-in-right"
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
  );
};

export default FloatingContact;
