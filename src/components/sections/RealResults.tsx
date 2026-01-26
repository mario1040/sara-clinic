"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight, Sparkles, User, Smile, Syringe, Eraser, Scissors, Activity } from "lucide-react";

// --- 1. تعريف البيانات ---
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
  iconPath?: string; // أضفنا هذا السطر لمسار الصور
  icon: React.ReactNode; // يبقى كاحتياطي (Fallback)
  services: Service[];
}

const specialties: Specialty[] = [
  {
    id: "hair-transplant",
    labelEn: "Hair Transplant",
    labelAr: "زراعة شعر",
    iconPath: "/public/images/icons/hair-transplant (1).png", // اكتب هنا مسار الأيقونة الخاصة بك
    icon: <User className="w-5 h-5" />,
    services: [
      { id: "hair1", labelEn: "Frontal Area", labelAr: "مقدمة الرأس", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } },
      { id: "hair2", labelEn: "Crown Area", labelAr: "منطقة التاج", case: { before: "/images/image (37).png", after: "/images/imageca3.png" } },
      { id: "hair3", labelEn: "Density", labelAr: "تكثيف", case: { before: "/images/image (38).png", after: "/images/imageca4.png" } }
    ]
  },
  {
    id: "lip-filler",
    labelEn: "Lip Filler",
    labelAr: "فيلر الشفايف",
    iconPath: "/public/images/icons/lips.png", // مثال لمسار أيقونة الفيلر
    icon: <Smile className="w-5 h-5" />,
    services: [
      { id: "lip1", labelEn: "Russian Lips", labelAr: "الشفاه الروسية", case: { before: "/images/imagecb5.png", after: "/images/imageca5.png" } },
      { id: "lip2", labelEn: "Natural Volume", labelAr: "فوليوم طبيعي", case: { before: "/images/imagecb6.png", after: "/images/imageca6.png" } },
      { id: "lip3", labelEn: "Contour", labelAr: "تحديد كونتور", case: { before: "/images/imagecb8.png", after: "/images/imageca8.png" } },
      { id: "lip4", labelEn: "Correction", labelAr: "تذويب وتصحيح", case: { before: "/images/imagecb1.png", after: "/images/imageca1.png" } }
    ]
  },
  {
    id: "peeling",
    labelEn: "Peeling",
    labelAr: "تقشير",
    iconPath: "/public/images/icons/facial-treatment.png",
    icon: <Eraser className="w-5 h-5" />,
    services: [
      { id: "peel1", labelEn: "Cold Peel", labelAr: "تقشير بارد", case: { before: "/images/imagecb1.png", after: "/images/imageca1.png" } },
      { id: "peel2", labelEn: "Chemical", labelAr: "كيميائي", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } }
    ]
  },
  {
    id: "rhinoplasty",
    labelEn: "Rhinoplasty",
    labelAr: "تجميل الأنف",
    iconPath: "/public/images/icons/rhinoplasty.png",
    icon: <Scissors className="w-5 h-5" />,
    services: [
      { id: "rhino1", labelEn: "Surgical", labelAr: "جراحي", case: { before: "/images/imagecb10.png", after: "/images/imageca10.png" } },
      { id: "rhino2", labelEn: "Non-Surgical", labelAr: "خيوط", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } }
    ]
  },
  {
    id: "marionette",
    labelEn: "Marionette",
    labelAr: "خطوط الحزن",
    iconPath: "/public/images/icons/face.png",
    icon: <Syringe className="w-5 h-5" />,
    services: [
      { id: "mar1", labelEn: "Filler", labelAr: "فيلر", case: { before: "/images/imagecb9.png", after: "/images/imageca9.png" } },
      { id: "mar2", labelEn: "Threads", labelAr: "خيوط", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } }
    ]
  },
  {
    id: "baldness",
    labelEn: "Baldness",
    labelAr: "صلع وراثي",
    iconPath: "/public/images/icons/head.png",
    icon: <Sparkles className="w-5 h-5" />,
    services: [
      { id: "bald1", labelEn: "Regenera", labelAr: "ريجينيرا", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } },
      { id: "bald2", labelEn: "Plasma", labelAr: "بلازما", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } }
    ]
  },
  {
    id: "dermatology",
    labelEn: "Dermatology",
    labelAr: "الجلدية",
    iconPath: "/public/images/icons/acne.png",
    icon: <Activity className="w-5 h-5" />,
    services: [
      { id: "derm1", labelEn: "Acne", labelAr: "حب الشباب", case: { before: "/images/imagecb7.png", after: "/images/imageca7.png" } },
      { id: "derm2", labelEn: "Scars", labelAr: "ندبات", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } }
    ]
  },
  
];

// --- مكون السلايدر (بدون تغيير) ---
const BeforeAfterSlider = ({ beforeImage, afterImage, language }: { beforeImage: string, afterImage: string, language: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const sliderX = useMotionValue(0); 
  
  const clipWidth = useTransform(sliderX, (x) => {
    if (containerWidth === 0) return 50;
    const percentage = ((x + containerWidth / 2) / containerWidth) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  });

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        sliderX.set(0);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [sliderX]);

  useEffect(() => {
    sliderX.set(0);
  }, [beforeImage, sliderX]);

  const dragConstraints = containerWidth > 0 
    ? { left: -containerWidth / 2, right: containerWidth / 2 }
    : { left: 0, right: 0 };

  return (
    <div ref={containerRef} className="relative aspect-[3/2] rounded-xl overflow-hidden cursor-ew-resize select-none shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-primary/10 group">
      <div className="absolute inset-0">
        <img src={beforeImage} alt="Before" className="w-full h-full object-cover pointer-events-none" draggable={false} />
        <div className="absolute top-2 left-2 md:top-4 md:left-4 px-2 py-1 md:px-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
            {language === "en" ? "Before" : "قبل"}
          </span>
        </div>
      </div>

      <motion.div 
        className="absolute inset-0 overflow-hidden" 
        style={{ clipPath: useTransform(clipWidth, (w) => `inset(0 0 0 ${w}%)`) }}
      >
        <img src={afterImage} alt="After" className="w-full h-full object-cover pointer-events-none" draggable={false} />
        <div className="absolute top-2 right-2 md:top-4 md:right-4 px-2 py-1 md:px-3 rounded-full bg-primary/80 backdrop-blur-md border border-primary/20">
          <span className="text-[10px] md:text-xs font-bold text-black uppercase tracking-widest">
            {language === "en" ? "After" : "بعد"}
          </span>
        </div>
      </motion.div>

      <motion.div 
        drag="x" 
        dragConstraints={dragConstraints} 
        dragElastic={0} 
        dragMomentum={false} 
        style={{ 
          x: sliderX,
          left: "50%",
          translateX: "-50%"
        }} 
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
      >
        <div className="absolute inset-y-0 w-[1px] md:w-0.5 bg-primary shadow-[0_0_15px_rgba(234,179,8,0.6)]" />
        <motion.div 
           whileTap={{ scale: 1.1 }}
           className="relative w-9 h-9 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-md border-2 border-primary shadow-[0_0_15px_rgba(234,179,8,0.4)] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(234,179,8,0.7)] transition-shadow duration-300"
        >
          <div className="flex items-center gap-0.5 md:gap-1 text-primary">
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- المكون الرئيسي مع تعديل عرض الأيقونة ---
const RealResults = () => {
  const { language, isRTL } = useLanguage();
  const [activeSpecialty, setActiveSpecialty] = useState(specialties[0]);
  const [activeService, setActiveService] = useState(specialties[0].services[0]);

  const handleSpecialtyClick = (specialty: Specialty) => {
    setActiveSpecialty(specialty);
    setActiveService(specialty.services[0]);
  };

  return (
    <section className="py-16 md:py-24 bg-navy-dark relative overflow-hidden" id="real-results">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-4 md:mb-6">
            {language === "en" ? "Real Results" : "نتائج حقيقية"}
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed">
            {language === "en" ? "Witness transformative journeys of our valued clients." : "شاهد رحلات التحول التي حققها عملاؤنا الكرام."}
          </p>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          <motion.div className="lg:col-span-4 order-1 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide w-full lg:sticky lg:top-24 snap-x snap-mandatory">
            {specialties.map((specialty) => {
              const isActive = activeSpecialty.id === specialty.id;
              return (
                <button
                  key={specialty.id}
                  onClick={() => handleSpecialtyClick(specialty)}
                  className={`group relative flex items-center gap-2 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 overflow-hidden shrink-0 snap-center min-w-[140px] lg:min-w-0 lg:w-full ${isActive ? "" : "hover:bg-white/5"}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSpecialtyHighlight"
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent border-b-2 lg:border-b-0 lg:border-l-4 border-primary rounded-xl md:rounded-2xl -z-10"
                    />
                  )}

                  <div
                    className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${isActive ? "bg-primary text-navy-dark shadow-lg shadow-primary/30" : "bg-white/10 text-primary/70 group-hover:text-primary"}`}
                  >
                    {/* التعديل هنا لعرض الصورة */}
                    {specialty.iconPath ? (
                      <img 
                        src={specialty.iconPath} 
                        alt="" 
                        className={`w-5 h-5 md:w-7 md:h-7 object-contain ${isActive ? "brightness-0" : ""}`} 
                      />
                    ) : (
                      specialty.icon
                    )}
                  </div>
                  
                  <span className={`text-sm md:text-lg font-medium transition-colors duration-300 whitespace-nowrap ${isActive ? "text-primary" : "text-white/80 group-hover:text-white"}`}>
                    {language === "en" ? specialty.labelEn : specialty.labelAr}
                  </span>
                </button>
              );
            })}
          </motion.div>

          <motion.div className="lg:col-span-8 order-2 w-full relative">
            <div className="mb-6 md:mb-8 relative z-30 flex justify-center lg:justify-start">
               <AnimatePresence mode="wait">
                 <motion.div key={activeSpecialty.id} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x max-w-full">
                    <div className="flex p-1.5 md:p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shrink-0">
                      {activeSpecialty.services.map((service) => {
                         const isActiveService = activeService.id === service.id;
                         return (
                          <button
                            key={service.id}
                            onClick={() => setActiveService(service)}
                            className={`relative px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap snap-center ${isActiveService ? "text-navy-dark" : "text-white/70 hover:text-white"}`}
                          >
                            {isActiveService && (
                                <motion.div layoutId="activeServicePill" className="absolute inset-0 bg-primary rounded-full -z-10" />
                            )}
                            {language === "en" ? service.labelEn : service.labelAr}
                          </button>
                         )
                      })}
                    </div>
                 </motion.div>
               </AnimatePresence>
            </div>

            <div className="relative max-w-2xl mx-auto lg:ml-0 w-full">
              <AnimatePresence mode="wait">
                <motion.div key={activeService.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <BeforeAfterSlider beforeImage={activeService.case.before} afterImage={activeService.case.after} language={language} />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div key={activeService.id + "-caption"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center lg:text-left mt-6 max-w-2xl mx-auto lg:ml-0">
               <h3 className="text-xl md:text-2xl font-serif text-primary">
                 {language === "en" ? activeService.labelEn : activeService.labelAr}
               </h3>
               <p className="text-muted/60 text-xs md:text-sm mt-1 uppercase tracking-wider">
                  {language === "en" ? activeSpecialty.labelEn : activeSpecialty.labelAr} Procedure
               </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RealResults;