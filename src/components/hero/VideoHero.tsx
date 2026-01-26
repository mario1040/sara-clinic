"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft } from "lucide-react";

const VideoHero = () => {
  const { t, isRTL, language } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* --- YouTube Background Container --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 lg:w-[110%] lg:h-[110%]"
          src="https://www.youtube.com/embed/UXLG0gJMx8k?autoplay=1&mute=1&loop=1&playlist=UXLG0gJMx8k&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1"
          title="Citrine Clinic Hero Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ objectFit: 'cover' }}
        ></iframe>
      </div>

      {/* --- Overlays --- */}
      {/* 1. Dark Overlay (لتحسين قراءة النصوص) */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />
      
      {/* 2. Gradient Vignette (تدرج ذهبي وكحلي خفيف) */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-black/20 z-[2]" />

      {/* --- Main Content --- */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow / Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="inline-block px-5 py-2 rounded-full border border-primary/30 text-primary text-xs md:text-sm tracking-[0.2em] uppercase backdrop-blur-md bg-white/5">
              {language === 'en' ? 'Welcome to Excellence' : 'مرحباً بك في عالم التميز'}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] mb-8"
          >
            <span className="text-white block mb-2">{t.hero.title}</span>
            <span className="gold-text italic block">{t.hero.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link
              to="/contact-us"
              className="luxury-button min-w-[200px] flex items-center justify-center gap-3 group"
            >
              {t.hero.cta}
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
            
            <Link
              to="/services"
              className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-md min-w-[200px]"
            >
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* --- Animated Scroll Indicator --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] text-primary/60 uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default VideoHero;