"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-[#003366] text-white rounded-full shadow-2xl transition-all duration-300 hover:bg-[#002855] hover:scale-110 active:scale-95 border border-white/10 animate-in fade-in zoom-in"
          aria-label="Вверх">
          <ArrowUp size={24} strokeWidth={2.5} />
        </button>
      )}
    </>
  );
}
