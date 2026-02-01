"use client";
// السطر المعدل - شيلنا useMouseMoveUpdate
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft, Star, Sparkles } from "lucide-react";
import { useEffect } from "react";

const Hero = () => {
  const { t, isRTL, language } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // --- Parallax Effect Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / 25;
      const moveY = (clientY - window.innerHeight / 2) / 25;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-dark pt-20">
      
      {/* 1. Background Layers (The "Aura") */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ x: useTransform(springX, (v) => -v), y: useTransform(springY, (v) => -v) }}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" 
        />
      </div>

      {/* 2. Content Grid */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Typography */}
          <div className={`${isRTL ? 'text-right' : 'text-left'} max-w-2xl`}>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-primary text-xs md:text-sm tracking-[0.4em] uppercase font-medium">
                Established Excellence
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] mb-8">
                <span className="text-white block overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }} 
                    animate={{ y: 0 }} 
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="block"
                  >
                    {t.hero.title}
                  </motion.span>
                </span>
                <span className="gold-text italic block overflow-hidden">
                   <motion.span 
                    initial={{ y: "100%" }} 
                    animate={{ y: 0 }} 
                    transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
                    className="block"
                  >
                    {t.hero.titleHighlight}
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/60 text-lg md:text-xl max-w-lg mb-12 leading-relaxed font-light"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link to="/contact-us" className="luxury-button px-10 py-5 flex items-center gap-4 group">
                {t.hero.cta}
                <ArrowIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
              
              <Link to="/services" className="group flex items-center gap-3 text-white hover:text-primary transition-colors py-4">
                <span className="text-sm tracking-widest uppercase border-b border-white/20 group-hover:border-primary pb-1">
                  {t.hero.ctaSecondary}
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Creative Visual */}
          <div className="relative hidden lg:block h-[600px]">
             {/* Main Image "Floating Card" */}
             <motion.div 
               style={{ y: springY, x: springX }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[550px] rounded-[100px] overflow-hidden border border-white/10 shadow-2xl z-20"
             >
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent z-10" />
                <img 
                  src="/images/hero-visual.png" // حط صورة فخمة هنا للعيادة
                  className="w-full h-full object-cover scale-110"
                  alt="Citrine Luxury"
                />
             </motion.div>

             {/* Floating Info Badge */}
             <motion.div
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-[20%] right-0 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl z-30 shadow-xl"
             >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-navy-dark">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl">15K+</div>
                    <div className="text-white/50 text-xs tracking-wider uppercase">Happy Clients</div>
                  </div>
                </div>
             </motion.div>

             {/* Abstract Geometric Elements */}
             <div className="absolute inset-0 z-0">
                <svg className="w-full h-full opacity-20" viewBox="0 0 400 400">
                  <motion.circle 
                    cx="200" cy="200" r="180" 
                    fill="none" stroke="url(#goldGradient)" strokeWidth="0.5" strokeDasharray="10 20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  />
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="#EAB308" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
             </div>
          </div>

        </div>
      </div>

      {/* Decorative Text Watermark */}
      <div className="absolute bottom-0 right-0 opacity-[0.03] select-none pointer-events-none hidden xl:block">
        <h2 className="text-[250px] font-serif font-bold leading-none -mb-20 text-white">
          CITRINE
        </h2>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;