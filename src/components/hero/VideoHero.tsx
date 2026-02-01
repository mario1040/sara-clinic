"use client";

import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft, Sparkles, MousePointer2 } from "lucide-react";

const VideoHero = () => {
  const { t, isRTL, language } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // --- أنيميشن الظهور الفخم ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section className="relative h-[100svh] flex items-center justify-center overflow-hidden bg-black">
      
      {/* 1. الفيديو الخلفي (YouTube) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[177.77vh] h-[56.25vw] min-w-full min-h-full scale-110 brightness-[0.6]"
          src="https://www.youtube.com/embed/UXLG0gJMx8k?autoplay=1&mute=1&loop=1&playlist=UXLG0gJMx8k&controls=0&rel=0&modestbranding=1&playsinline=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>

      {/* 2. طبقات الإضاءة والظلال - لضمان وضوح الزراير */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-navy-dark z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[2]" />

      {/* 3. المحتوى الرئيسي */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center"
      >
        
        {/* Badge علوي جذاب */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-primary animate-pulse" />
            <span className="text-primary text-[10px] tracking-[0.3em] uppercase font-bold">
              Citrine Royal Experience
            </span>
          </div>
        </motion.div>

        {/* العناوين */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-tight mb-6"
        >
          {t.hero.title} <br />
          <span className="gold-text italic">{t.hero.titleHighlight}</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-white/70 text-sm md:text-lg max-w-2xl mb-12 font-light leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* --- قسم الزراير "الجذابة" --- */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md sm:max-w-none"
        >
          {/* الزرار الأول: الـ "Magnetic Golden" */}
          <Link to="/contact-us" className="relative group w-full sm:w-auto">
            {/* توهج خلف الزرار */}
            <div className="absolute -inset-1 bg-primary rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center gap-3 px-10 py-5 bg-primary rounded-full text-navy-dark font-bold text-sm tracking-widest uppercase overflow-hidden shadow-[0_10px_30px_rgba(234,179,8,0.3)]"
            >
              {/* لمعة متحركة داخل الزرار */}
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-[100%] transition-all duration-1000" />
              
              {t.hero.cta}
              <ArrowIcon className="w-5 h-5 transition-transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2" />
            </motion.div>
          </Link>

          {/* الزرار الثاني: الـ "Glass Outline" */}
          <Link to="/services" className="w-full sm:w-auto">
            <motion.div 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full border border-white/30 backdrop-blur-md text-white font-bold text-sm tracking-widest uppercase flex items-center justify-center transition-all"
            >
              {t.hero.ctaSecondary}
            </motion.div>
          </Link>
        </motion.div>

      </motion.div>

      {/* 4. مؤشر الماوس / السكرول بصيغة إبداعية */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center p-1.5">
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-1 bg-primary rounded-full"
          />
        </div>
        <span className="text-[8px] text-primary tracking-[0.5em] uppercase">Scroll</span>
      </motion.div>

    </section>
  );
};

export default VideoHero;