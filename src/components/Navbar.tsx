"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Sparkles, LogIn } from "lucide-react"; // أضفت LogIn للأيقونات
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about-us", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/doctors", label: t.nav.doctors },
    { href: "/contact-us", label: t.nav.contact },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "flex items-center justify-between px-6 py-2 rounded-[2.5rem] transition-all duration-700 pointer-events-auto border",
            "container mx-auto max-w-7xl",
            scrolled 
              ? "bg-white/70 backdrop-blur-[20px] border-white/40 shadow-[0_10px_30px_rgba(233,30,99,0.1)] py-2 scale-[0.96]" 
              : "bg-white/20 backdrop-blur-[12px] border-white/30 py-4 scale-100 shadow-none"
          )}
        >
          {/* --- LOGO SECTION --- */}
          <Link to="/" className="relative z-10 flex items-center gap-3 group">
            <motion.div 
              className="relative flex items-center justify-center"
              whileHover={{ rotate: -12, scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 bg-[#E91E63]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="h-10 md:h-12 w-auto object-contain relative z-10" 
              />
            </motion.div>
          </Link>

          {/* --- DESKTOP NAV LINKS --- */}
          <div className="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-500",
                    active ? "text-white" : "text-black/70 hover:text-[#E91E63]"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {active && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-[#E91E63] rounded-full shadow-[0_5px_15px_rgba(233,30,99,0.3)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* --- ACTION BUTTONS (Desktop Only) --- */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* أزرار اللغة وتسجيل الدخول تظهر فقط في الديسكتوب هنا */}
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all border border-transparent hover:border-white/20"
            >
              <Globe className="w-4 h-4 text-[#E91E63]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/80">
                {language === "en" ? "AR" : "EN"}
              </span>
            </button>

            <Link 
              to="/login" 
              className="hidden md:flex group relative items-center gap-3 bg-black/90 text-white px-8 py-3 rounded-full overflow-hidden transition-all"
            >
              <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em]">{t.nav.login}</span>
              <Sparkles className="w-3.5 h-3.5 relative z-10 text-primary" />
              <div className="absolute inset-0 bg-[#E91E63] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>

            {/* Mobile Burger */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-3 rounded-full bg-[#E91E63] text-white shadow-lg shadow-[#E91E63]/20"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(25px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[200] bg-white/90 flex flex-col items-center justify-center p-8 overflow-y-auto"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-10 right-10 p-4 rounded-full bg-black text-white hover:bg-[#E91E63] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* روابط التنقل للموبايل */}
            <nav className="flex flex-col gap-6 text-center mb-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-4xl md:text-5xl font-serif font-bold transition-all block py-2",
                      isActive(link.href) ? "text-[#E91E63]" : "text-black/30 hover:text-black"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* --- إضافة: أزرار اللغة والدخول للموبايل --- */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="w-full max-w-xs flex flex-col gap-4 border-t border-black/10 pt-8"
            >
               {/* زر تغيير اللغة */}
               <button 
                 onClick={() => { setLanguage(language === "en" ? "ar" : "en"); setIsOpen(false); }}
                 className="flex items-center justify-between w-full px-6 py-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
               >
                 <span className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black/60">
                    <Globe className="w-5 h-5 text-[#E91E63]" />
                    {language === "en" ? "Switch Language" : "تغيير اللغة"}
                 </span>
                 <span className="text-[#E91E63] font-black font-serif">
                    {language === "en" ? "العربية" : "English"}
                 </span>
               </button>

               {/* زر تسجيل الدخول */}
               <Link 
                 to="/login"
                 onClick={() => setIsOpen(false)}
                 className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-black text-white hover:bg-[#E91E63] transition-colors shadow-xl"
               >
                  <span className="text-xs font-black uppercase tracking-[0.2em]">{t.nav.login}</span>
                  <LogIn className="w-4 h-4" />
               </Link>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;