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
      
      {/* --- 1. Background Video (YouTube Optimized) --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <iframe
          // الحسابات دي بتضمن إن الفيديو يملأ الشاشة تماماً مهما كان مقاسها
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[177.77vh] h-[56.25vw] min-w-full min-h-full scale-110"
          src="https://www.youtube.com/embed/UXLG0gJMx8k?autoplay=1&mute=1&loop=1&playlist=UXLG0gJMx8k&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          title="Citrine Clinic Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>

      {/* --- 2. Advanced Overlays --- */}
      {/* طبقة غامقة شاملة */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />
      
      {/* تدرج سفلي لدمج السيكشن مع اللي تحته */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-black/20 z-[2]" />

      {/* --- 3. Content Container --- */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block px-6 py-2 rounded-full border border-primary/30 text-primary text-xs md:text-sm tracking-[0.3em] uppercase backdrop-blur-md bg-white/5">
              {language === 'en' ? 'Excellence in Care' : 'التميز في الرعاية'}
            </span>
          </motion.div>

          {/* Main Headline (بدون تغيير نوع الخط) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] mb-8"
          >
            <span className="text-white block mb-2">{t.hero.title}</span>
            <span className="gold-text italic block">{t.hero.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle (بدون تغيير نوع الخط) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-light px-4"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link
              to="/contact-us"
              className="luxury-button min-w-[220px] py-4 flex items-center justify-center gap-3 group"
            >
              {t.hero.cta}
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
            
            <Link
              to="/services"
              className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-md min-w-[220px]"
            >
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* --- 4. Scroll Down Indicator --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-5 h-9 rounded-full border border-white/30 flex justify-center p-1"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
};

export default VideoHero;