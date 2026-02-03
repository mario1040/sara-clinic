"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight, Star, Scissors, Sparkles, Syringe, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. تعريف الأنواع ---
interface Case {
  before: string;
  after: string;
}

interface Service {
  id: string;
  labelEn: string;
  labelAr: string;
  case: Case;
}

interface Specialty {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: React.ReactNode;
  services: Service[];
}

// --- 2. البيانات (الهيكلة الجديدة حسب طلبك) ---
const specialties: Specialty[] = [
  {
    id: "surgical",
    labelEn: "Surgical Aesthetics",
    labelAr: "التجميل الجراحي",
    icon: <Scissors className="w-5 h-5" />, // أيقونة المقص للجراحة
    services: [
      { 
        id: "breast-aug", 
        labelEn: "Breast Augmentation", 
        labelAr: "تكبير الثدي", 
        case: { before: "/images/cases/breast-aug-before.jpg", after: "/images/cases/breast-aug-after.jpg" } 
      },
      { 
        id: "breast-red", 
        labelEn: "Breast Reduction", 
        labelAr: "تصغير الثدي", 
        case: { before: "/images/cases/breast-red-before.jpg", after: "/images/cases/breast-red-after.jpg" } 
      },
      { 
        id: "lipo-transfer", 
        labelEn: "Lipo & Fat Transfer", 
        labelAr: "شفط وحقن الدهون", 
        case: { before: "/images/cases/lipo-before.jpg", after: "/images/cases/lipo-after.jpg" } 
      },
      { 
        id: "body-contour", 
        labelEn: "Body Contouring", 
        labelAr: "نحت الجسم", 
        case: { before: "/images/cases/contour-before.jpg", after: "/images/cases/contour-after.jpg" } 
      },
      { 
        id: "buttock", 
        labelEn: "Gluteal Augmentation", 
        labelAr: "تكبير المؤخرة", 
        case: { before: "/images/cases/bbl-before.jpg", after: "/images/cases/bbl-after.jpg" } 
      },
    ]
  },
  {
    id: "non-surgical",
    labelEn: "Non-Surgical Art",
    labelAr: "التجميل اللاجراحي",
    icon: <Sparkles className="w-5 h-5" />, // أيقونة اللمعان لللا جراحي
    services: [
      { 
        id: "fillers", 
        labelEn: "Dermal Fillers", 
        labelAr: "الفيلر", 
        case: { before: "/images/cases/filler-before.jpg", after: "/images/cases/filler-after.jpg" } 
      },
      { 
        id: "botox", 
        labelEn: "Botox", 
        labelAr: "البوتوكس", 
        case: { before: "/images/cases/botox-before.jpg", after: "/images/cases/botox-after.jpg" } 
      },
      { 
        id: "skin-booster", 
        labelEn: "Skin Booster", 
        labelAr: "إسكين بوستر", 
        case: { before: "/images/cases/booster-before.jpg", after: "/images/cases/booster-after.jpg" } 
      },
    ]
  },
];

// --- 3. مكون السلايدر (Museum-Grade Slider) ---
const BeforeAfterSlider = ({ beforeImage, afterImage, language }: { beforeImage: string, afterImage: string, language: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 25 });
  
  const clipWidth = useTransform(springX, (val) => {
    if (containerWidth === 0) return 50;
    return ((val + containerWidth / 2) / containerWidth) * 100;
  });

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-[4/5] md:aspect-[16/10] rounded-[3rem] overflow-hidden cursor-ew-resize shadow-2xl border-[12px] border-white group">
      {/* Before Layer */}
      <div className="absolute inset-0 bg-gray-100">
        <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
        <div className={cn("absolute top-6 px-4 py-2 rounded-full bg-black/20 backdrop-blur-xl border border-white/10", language === 'ar' ? 'right-6' : 'left-6')}>
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">{language === "en" ? "Before" : "قبل"}</span>
        </div>
      </div>

      {/* After Layer (Clipped) */}
      <motion.div 
        className="absolute inset-0 overflow-hidden bg-gray-100" 
        style={{ clipPath: useTransform(clipWidth, (w) => `inset(0 0 0 ${w}%)`) }}
      >
        <img src={afterImage} alt="After" className="w-full h-full object-cover" />
        <div className={cn("absolute top-6 px-4 py-2 rounded-full bg-[#E91E63] shadow-lg", language === 'ar' ? 'left-6' : 'right-6')}>
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">{language === "en" ? "After" : "بعد"}</span>
        </div>
      </motion.div>

      {/* Drag Handle */}
      <motion.div 
        drag="x" 
        dragConstraints={{ left: -containerWidth / 2, right: containerWidth / 2 }} 
        dragElastic={0} 
        dragMomentum={false} 
        style={{ x, left: "50%", translateX: "-50%" }} 
        className="absolute inset-y-0 z-30 flex items-center justify-center touch-none"
      >
        <div className="w-[1px] h-full bg-white/30 backdrop-blur-md relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="flex gap-0.5 text-[#E91E63]">
                <ChevronLeft className="w-4 h-4" />
                <ChevronRight className="w-4 h-4" />
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- 4. المكون الرئيسي ---
const RealResults = () => {
  const { language } = useLanguage();
  const [activeSpecialty, setActiveSpecialty] = useState(specialties[0]);
  const [activeService, setActiveService] = useState(specialties[0].services[0]);

  const header = {
    subtitle: language === "en" ? "Transformative Journeys" : "رحلات التحول الحقيقية",
    title1: language === "en" ? "REAL" : "نتائج",
    title2: language === "en" ? "RESULTS" : "حقيقية"
  };

  return (
    <section className="py-32 bg-[#F5EEE6] relative overflow-hidden" id="real-results">
      {/* Background Decor */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E91E63]/5 rounded-full blur-[120px] -z-0" 
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
            <span 
              className={cn("text-[#E91E63] text-2xl mb-4 block font-bold font-serif")}
            >
              {header.subtitle}
            </span>
            <h2 className="text-7xl md:text-[9rem] font-serif font-black tracking-tighter leading-[0.8] uppercase">
              {header.title1} <br />
              <span className="text-[#E91E63] italic">{header.title2}</span>
            </h2>
          </motion.div>
          
          <p className={cn("text-black/40 text-sm max-w-xs uppercase font-bold tracking-[0.3em] leading-loose", language === 'ar' && "text-right")}>
            {language === 'en' 
              ? "Witness the biological mastery and artistic precision of Dr. Sara." 
              : "شاهدوا الإتقان الطبي والدقة الفنية في لمسات دكتورة سارة."}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Sidebar: Main Categories (Surgical vs Non-Surgical) */}
          <div className="lg:col-span-4 space-y-4">
            {specialties.map((specialty) => {
              const isActive = activeSpecialty.id === specialty.id;
              return (
                <motion.button
                  key={specialty.id}
                  onClick={() => { setActiveSpecialty(specialty); setActiveService(specialty.services[0]); }}
                  whileHover={{ x: language === 'en' ? 10 : -10 }}
                  className={cn(
                    "w-full p-6 rounded-[2.5rem] flex items-center gap-6 transition-all duration-500 border",
                    isActive 
                      ? "bg-white border-white shadow-2xl shadow-[#E91E63]/5" 
                      : "bg-white/30 border-transparent opacity-50 hover:opacity-100"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                    isActive ? "bg-[#E91E63] text-white shadow-lg" : "bg-white text-black/20"
                  )}>
                    {specialty.icon}
                  </div>
                  <div className="text-start">
                    <span className="text-xl font-serif font-bold tracking-tight block">
                      {language === "en" ? specialty.labelEn : specialty.labelAr}
                    </span>
                    <span className="text-[10px] text-black/40 font-bold uppercase tracking-widest">
                       {specialty.services.length} {language === "en" ? "Procedures" : "إجراءات"}
                    </span>
                  </div>
                  {isActive && <motion.div layoutId="active-dot" className="w-2 h-2 rounded-full bg-[#E91E63] ml-auto" />}
                </motion.button>
              );
            })}
          </div>

          {/* Main Stage: Sub-Services & Slider */}
          <div className="lg:col-span-8">
            
            {/* Filter Pills (Sub-services like Breast, Lipo, Filler...) */}
            <div className="flex gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeSpecialty.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  {activeSpecialty.services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(service)}
                      className={cn(
                        "px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                        activeService.id === service.id 
                          ? "bg-black text-white shadow-xl" 
                          : "bg-white/50 text-black/40 hover:bg-white"
                      )}
                    >
                      {language === "en" ? service.labelEn : service.labelAr}
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Showcase Window */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <BeforeAfterSlider 
                    beforeImage={activeService.case.before} 
                    afterImage={activeService.case.after} 
                    language={language} 
                  />
                </motion.div>
              </AnimatePresence>

              {/* Caption & Booking CTA */}
              <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-8 border-t border-black/5 pt-10">
                <div>
                  <h3 className="text-3xl font-serif font-bold italic mb-3">
                    {language === "en" ? activeService.labelEn : activeService.labelAr}
                  </h3>
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-[#E91E63] fill-[#E91E63]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
                      Dr. Sara Signature Case
                    </span>
                  </div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-[#E91E63] transition-colors"
                >
                   {language === 'en' ? 'Book Similar Result' : 'احجزي نتيجة مماثلة'}
                </motion.button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RealResults;