"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Sparkles, Heart, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Custom Icons ---
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SnapchatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16.94 11.23a.85.85 0 0 0-.27 1.18c.08.14.22.3.4.45l.03.03c.53.42 1.57 1.05 1.57 2.18 0 .84-.46 1.4-1.22 1.88l-.13.08c-.73.47-1.68 1.08-1.68 2.6v.05c0 .76-.6 1.37-1.38 1.37-.3 0-.6-.08-.85-.24l-.1-.06c-.4-.25-.86-.39-1.31-.39-.45 0-.91.14-1.31.39l-.1.06c-.25.16-.55.24-.85.24-.78 0-1.38-.61-1.38-1.37v-.05c0-1.52-.95-2.13-1.68-2.6l-.13-.08c-.76-.48-1.22-1.04-1.22-1.88 0-1.13 1.04-1.76 1.57-2.18l.03-.03c.18-.15.32-.31.4-.45a.85.85 0 0 0-.27-1.18A4.9 4.9 0 0 1 7.22 6.6c0-2.8 2.05-4.6 4.78-4.6 2.73 0 4.78 1.8 4.78 4.6a4.9 4.9 0 0 1-1.84 4.63Z" />
  </svg>
);

const Footer = () => {
  const { t, language } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: "#", color: "hover:bg-[#E91E63]" },
    { icon: Facebook, href: "#", color: "hover:bg-[#1877F2]" },
    { icon: TiktokIcon, href: "#", color: "hover:bg-black" },
    { icon: SnapchatIcon, href: "#", color: "hover:bg-[#FFFC00] hover:text-black" },
    { icon: Youtube, href: "#", color: "hover:bg-[#FF0000]" },
  ];

  return (
    <footer className="relative bg-[#F5EEE6] pt-20 pb-10 overflow-hidden">
      {/* 1. Infinite Moving Text (Marquee Background) */}
      <div className="absolute top-10 whitespace-nowrap opacity-[0.03] select-none pointer-events-none">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="text-[15rem] font-serif font-black flex gap-20"
        >
          <span>SIMPLY BLOSSOM</span>
          <span>SIMPLY BLOSSOM</span>
        </motion.div>
      </div>

      {/* 2. Background Blobs with Animation */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#E91E63]/5 rounded-full blur-[120px]" 
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- BRANDING & LOGO SECTION --- */}
        <div className="flex flex-col items-center mb-24">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="relative group cursor-pointer"
          >
            {/* Spinning Decoration */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-40px] border border-dashed border-[#E91E63]/20 rounded-full"
            />
            
            {/* Logo with Glow */}
            <div className="relative z-10 p-4 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-2xl transition-transform duration-700 group-hover:scale-110">
              <img src="/images/logo.png" alt="Logo" className="h-24 md:h-32 w-auto object-contain" />
            </div>

            {/* Sparkles around logo */}
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 text-[#E91E63]"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </motion.div>

          {/* <div className="mt-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black tracking-tight leading-none">
               Dr. Sara <span className="text-[#E91E63]">Abd Allah</span>
            </h2>
            <p style={{ fontFamily: "'Dancing Script', cursive" }} className="text-[#E91E63] text-2xl mt-2 italic">
               The Art of Aesthetic Blossom
            </p>
          </div> */}
        </div>

        {/* --- INFO CARDS (Interactive Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          
          {/* Mansoura Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="group relative p-8 rounded-[3rem] bg-white/40 backdrop-blur-2xl border border-white/80 overflow-hidden shadow-xl shadow-black/[0.02]"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="w-12 h-12 rounded-2xl bg-[#E91E63] text-white flex items-center justify-center shadow-lg shadow-[#E91E63]/20">
                <MapPin className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-black/20 group-hover:text-[#E91E63] transition-colors" />
            </div>
            <h4 className="text-xl font-bold mb-3 uppercase tracking-widest">{language === 'ar' ? 'فرع المنصورة' : 'Mansoura'}</h4>
            <p className="text-black/50 text-sm leading-relaxed font-medium">
              {language === 'ar' 
                ? 'حي الجامعة، أمام بوابة توشكا، الدور الثاني علوي' 
                : 'University District, Toshka Gate, 2nd Floor'}
            </p>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#E91E63]/5 rounded-full blur-2xl group-hover:bg-[#E91E63]/10 transition-colors" />
          </motion.div>

          {/* Contact Card (Premium Black) */}
          <motion.div 
            whileHover={{ y: -10, scale: 1.02 }}
            className="p-8 rounded-[3rem] bg-black text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Phone className="w-20 h-20" />
            </div>
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-[#E91E63]">{t.footer.contact}</h4>
            <div className="space-y-4 relative z-10">
              <a href="tel:01019761776" className="block text-3xl font-serif hover:scale-105 transition-transform">01019761776</a>
              <a href="https://wa.me/201150883939" className="inline-flex items-center gap-2 px-6 py-2 bg-[#E91E63] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                 Chat via WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Cairo Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="group relative p-8 rounded-[3rem] bg-white/40 backdrop-blur-2xl border border-white/80 shadow-xl shadow-black/[0.02]"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#E91E63] border border-[#E91E63]/10 flex items-center justify-center shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-black/20 group-hover:text-[#E91E63] transition-colors" />
            </div>
            <h4 className="text-xl font-bold mb-3 uppercase tracking-widest">{language === 'ar' ? 'فرع القاهرة' : 'Cairo Branch'}</h4>
            <p className="text-black/50 text-sm leading-relaxed font-medium">
               {language === 'ar' ? '٨٨ جوزيف تيتو، الهايكستب، النزهة' : '88 Joseph Tito, El Haikstep, El Nozha'}
            </p>
          </motion.div>

        </div>

        {/* --- SOCIALS & LINKS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 py-10 border-t border-black/5">
          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ y: -5, rotate: 8 }}
                className={cn(
                  "w-12 h-12 rounded-full bg-white flex items-center justify-center text-black/40 shadow-sm transition-all duration-300",
                  social.color, "hover:text-white"
                )}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
             <Link to="/" className="hover:text-[#E91E63] transition-colors">{t.nav.home}</Link>
             <Link to="/services" className="hover:text-[#E91E63] transition-colors">{t.nav.services}</Link>
             <Link to="/contact-us" className="hover:text-[#E91E63] transition-colors">{t.nav.contact}</Link>
          </div>
        </div>

        {/* --- COPYRIGHT --- */}
        <motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1.5 }}
  className="mt-16 flex flex-col items-center gap-8 border-t border-black/[0.03] pt-12"
>
  {/* Heart Icon with Pulse Effect */}
  <div className="relative">
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className="absolute inset-0 bg-[#E91E63] blur-lg rounded-full"
    />
    <Heart className="w-5 h-5 text-[#E91E63] relative z-10 fill-[#E91E63]/10" />
  </div>

  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
    {/* Copyright Text */}
    <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">
      © {new Date().getFullYear()} <span className="text-black/60">Dr. Sara Abd Allah</span>
    </div>

    {/* Elegant Vertical Divider (Visible on Desktop) */}
    <div className="hidden md:block h-4 w-[1px] bg-black/10 rotate-12" />

    {/* Designer Credit with Signature Style */}
    <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-black/20">
      <span>Handcrafted by</span>
      <motion.a 
        href="https://www.facebook.com/tungstenmedianet" 
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ letterSpacing: "0.5em", color: "#E91E63" }}
        className="text-black/50 transition-all duration-500 hover:font-black relative group"
      >
        TUNGSTEN MEDIA
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#E91E63] transition-all duration-500 group-hover:w-full" />
      </motion.a>
    </div>
  </div>

  {/* Bottom Thin Line Decorative */}
  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
</motion.div>
      </div>
    </footer>
  );
};

export default Footer;