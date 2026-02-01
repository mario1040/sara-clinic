"use client";

import { useState, useRef } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowUpRight, 
  GraduationCap, 
  Users, 
  Building2, 
  Sparkles, 
  Microscope, 
  Star, 
  LucideIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. تعريف الواجهات ---
interface AcademyTier {
  id: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  icon: LucideIcon;
  image: string;
  tag: string;
}

const academyTiers: AcademyTier[] = [
  {
    id: "solo",
    titleEn: "INDIVIDUAL TRAINING",
    titleAr: "تدريب الأفراد",
    subtitleEn: "Private Mentorship",
    subtitleAr: "إرشاد خاص ومكثف",
    descEn: "One-on-one clinical immersion designed for doctors seeking elite precision.",
    descAr: "تدريب إكلينيكي مكثف (واحد لواحد) مصمم للأطباء الباحثين عن الدقة الاحترافية.",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200",
    tag: "One-on-One"
  },
  {
    id: "group",
    titleEn: "GROUP WORKSHOPS",
    titleAr: "ورش عمل المجموعات",
    subtitleEn: "Collaborative Learning",
    subtitleAr: "تعلم جماعي تفاعلي",
    descEn: "Exchange energy and advanced techniques in a high-octane group environment.",
    descAr: "تبادل الخبرات والتقنيات المتقدمة في بيئة جماعية مليئة بالحماس.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
    tag: "Interactive"
  },
  {
    id: "b2b",
    titleEn: "CORPORATE SOLUTIONS",
    titleAr: "حلول الشركات",
    subtitleEn: "Institutional Growth",
    subtitleAr: "تطوير المؤسسات",
    descEn: "Elevating entire medical teams to the global gold standard of aesthetics.",
    descAr: "الارتقاء بالطواقم الطبية في العيادات والمستشفيات إلى المعايير العالمية.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200",
    tag: "B2B Professional"
  }
];

const Services = () => {
  const { language, isRTL } = useLanguage();
  const [activeService, setActiveService] = useState<number | null>(null);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const servicesData = [
    {
      id: 1,
      title: language === 'en' ? "SURGICAL" : "الجراحي",
      subtitle: language === 'en' ? "Plastic Surgery" : "جراحات التجميل",
      desc: language === 'en' 
        ? "Rhinoplasty, Facelift, Liposuction, and Body Contouring." 
        : "تجميل الأنف، شد الوجه، شفط الدهون، ونحت القوام.",
      image: "/images/service1.png",
      link: "/services/plastic-surgery",
      icon: Microscope
    },
    {
      id: 2,
      title: language === 'en' ? "NON-SURGICAL" : "اللا جراحي",
      subtitle: language === 'en' ? "Dermatology & Laser" : "الجلدية والليزر",
      desc: language === 'en' 
        ? "Botox, Fillers, Laser Treatments, and Skin Rejuvenation." 
        : "البوتوكس، الفيلر، علاجات الليزر، وتجديد البشرة.",
      image: "/images/service2.png",
      link: "/services/dermatology",
      icon: Sparkles
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5EEE6]">
      <Navbar />

      <main className="relative z-0 pt-28 pb-20">
        
        {/* --- PART 1: THE SPLIT SHUTTERS (Responsive Fix) --- */}
        <div className="container mx-auto px-4 mb-32">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 md:mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
              <span className="text-black">{language === 'en' ? 'Our' : 'خدماتنا'} </span>
              <span className="text-[#E91E63]">{language === 'en' ? 'Expertise' : 'المتميزة'}</span>
            </h1>
            <p className="text-black/60 max-w-2xl mx-auto text-sm md:text-lg">
              {language === 'en' 
                ? "Choose your path to perfection through our specialized departments."
                : "اختاري طريقك نحو الكمال من خلال أقسامنا المتخصصة."}
            </p>
          </motion.div>

          {/* التغيير الجوهري هنا:
            1. flex-col للموبايل و md:flex-row للديسكتوب.
            2. ارتفاع ثابت كبير للموبايل (h-[120vh]) ليسمح بعرض المحتوى، و (h-[75vh]) للديسكتوب.
          */}
          <div className="flex flex-col md:flex-row h-[120vh] md:h-[75vh] overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/20 shadow-2xl relative bg-white">
            
            {servicesData.map((service) => {
              const isActive = activeService === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  // للموبايل: نستخدم النقر (onClick) للتفعيل
                  onClick={() => setActiveService(isActive ? null : service.id)}
                  // للديسكتوب: نستخدم الماوس (Hover)
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                  // نستخدم flex بدلاً من width للتحكم في الحجم في الاتجاهين
                  animate={{ 
                    flex: isActive ? 2 : 1, // العنصر النشط يأخذ مساحة ضعف العنصر غير النشط
                  }}
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                  className="relative w-full md:w-auto h-auto md:h-full overflow-hidden cursor-pointer group border-b md:border-b-0 md:border-r last:border-0 border-white/10"
                >
                  {/* الخلفية */}
                  <motion.div 
                    className="absolute inset-0"
                    animate={{ scale: isActive ? 1.05 : 1.15 }}
                    transition={{ duration: 1.5 }}
                  >
                    <img src={service.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={service.title} />
                    <div className={cn(
                      "absolute inset-0 bg-black/40 transition-opacity duration-500",
                      isActive ? "opacity-30" : "opacity-60"
                    )} />
                  </motion.div>

                  {/* المحتوى */}
                  <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                       <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                          <service.icon className="text-white w-5 h-5 md:w-7 md:h-7" />
                       </div>
                       <div className={cn(
                         "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-white/30 transition-all duration-500",
                         isActive ? "bg-[#E91E63] border-[#E91E63] rotate-45" : "bg-transparent"
                       )}>
                          <ArrowUpRight className="text-white w-5 h-5 md:w-6 md:h-6" />
                       </div>
                    </div>

                    <div>
                       <motion.h2 
                         className="text-4xl md:text-7xl font-serif font-black text-white leading-none tracking-tighter mb-2 md:mb-4"
                         animate={{ y: isActive ? 0 : 20 }}
                       >
                          {service.title}
                       </motion.h2>
                       
                       <motion.div
                         initial={false}
                         animate={{ 
                           height: isActive ? "auto" : 0, 
                           opacity: isActive ? 1 : 0 
                         }}
                         className="overflow-hidden"
                       >
                          <p className="text-[#E91E63] text-lg md:text-xl font-bold uppercase tracking-widest mb-2">{service.subtitle}</p>
                          <p className="text-white/80 max-w-sm text-sm md:text-lg leading-relaxed">{service.desc}</p>
                          
                          <Link to={service.link} className="inline-block mt-6 md:mt-8 pointer-events-auto">
                             <span className="text-white border-b border-white/50 pb-1 text-xs font-bold uppercase tracking-[0.3em] hover:text-[#E91E63] hover:border-[#E91E63] transition-all">
                               {language === 'en' ? 'Explore Department' : 'استكشفي القسم'}
                             </span>
                          </Link>
                       </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* النص التوجيهي (يختفي عند التفاعل) */}
            <AnimatePresence>
              {activeService === null && (
                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center gap-4 mix-blend-overlay"
                 >
                    {/* تعديل الفاصل ليكون أفقي في الموبايل ورأسي في الديسكتوب */}
                    <div className="w-16 h-px md:w-px md:h-16 bg-white/70" />
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap bg-black/20 md:bg-transparent px-2 md:px-0 rounded-full md:rounded-none backdrop-blur-md md:backdrop-blur-none py-1 md:py-0">
                      {language === 'en' ? 'Tap or Hover' : 'اضغط أو مرر'}
                    </span>
                    <div className="w-16 h-px md:w-px md:h-16 bg-white/70" />
                 </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- PART 2: THE ACADEMY --- */}
        <div ref={targetRef} className="relative px-4 md:px-6 border-t border-black/5 pt-20">
          
          <div className="text-center mb-20 md:mb-32 relative z-10">
            <motion.div style={{ opacity: scrollYProgress }}>
               <Star className="w-10 h-10 md:w-12 md:h-12 text-[#E91E63] mx-auto mb-4 md:mb-6 animate-spin-slow" />
               <h2 className="text-[15vw] font-serif font-black leading-[0.8] text-black/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none hidden md:block">
                  ACADEMY
               </h2>
               <h3 className="text-4xl md:text-7xl font-serif font-bold relative z-10 text-black">
                  {language === 'en' ? 'EDUCATIONAL' : 'المسار'} <br />
                  <span className="italic text-[#E91E63]">{language === 'en' ? 'ELEVATION' : 'التعليمي'}</span>
               </h3>
               <p className="mt-4 md:mt-6 text-black/60 max-w-lg mx-auto text-sm md:text-base px-4">
                 {language === 'en' 
                   ? "Comprehensive training programs tailored for every level of medical expertise." 
                   : "برامج تدريبية شاملة مصممة لتناسب جميع مستويات الخبرة الطبية."}
               </p>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto relative pb-20">
            {academyTiers.map((tier, i) => (
              <StickyCard 
                key={tier.id} 
                tier={tier} 
                index={i} 
                language={language}
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// --- Sticky Card (Responsive Adjustments) ---
const StickyCard = ({ tier, index, language, isRTL }: { tier: AcademyTier, index: number, language: string, isRTL: boolean }) => {
  return (
    <motion.div
      className="sticky top-28 md:top-32 mb-6 md:mb-10 last:mb-0 pt-4 md:pt-10"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div 
        className={cn(
          "relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] shadow-xl transition-all duration-500 group border border-white/50",
          index === 0 ? "bg-[#1A1A1A] text-white" : 
          index === 1 ? "bg-[#E91E63] text-white" : "bg-white text-black border-black/10"
        )}
        // ارتفاع متغير للموبايل وثابت للديسكتوب
        style={{ minHeight: '400px', height: 'auto' }} 
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* الصورة: ارتفاع صغير في الموبايل */}
          <div className="w-full md:w-5/12 h-[200px] md:h-auto relative overflow-hidden">
             <img 
               src={tier.image} 
               alt="" 
               className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
             />
             <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/30 to-transparent" />
             
             <div className={cn(
               "absolute top-4 md:top-8 px-4 md:px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-xl border border-white/30 text-white",
               isRTL ? "right-4 md:right-8" : "left-4 md:left-8"
             )}>
                {tier.tag}
             </div>
          </div>

          <div className="w-full md:w-7/12 p-6 md:p-14 flex flex-col justify-between relative min-h-[300px] md:min-h-[550px]">
             <span className={cn(
               "absolute top-4 text-[6rem] md:text-[12rem] font-serif font-black opacity-5 pointer-events-none leading-none select-none",
               isRTL ? "left-6 md:left-8" : "right-6 md:right-8"
             )}>
                0{index + 1}
             </span>

             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <tier.icon className={cn("w-6 h-6 md:w-8 md:h-8", index === 2 ? "text-[#E91E63]" : "text-white/80")} />
                  <div className={cn("h-px w-8 md:w-12", index === 2 ? "bg-black/20" : "bg-white/20")} />
                </div>
                
                <h4 className="text-2xl md:text-5xl font-serif font-bold mb-2 md:mb-3 tracking-tight">
                  {language === 'en' ? tier.titleEn : tier.titleAr}
                </h4>
                <p className={cn("text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-4 md:mb-8 opacity-70", index === 2 ? "text-[#E91E63]" : "text-white")}>
                  {language === 'en' ? tier.subtitleEn : tier.subtitleAr}
                </p>
                <p className={cn("text-sm md:text-lg leading-relaxed max-w-md", index === 2 ? "text-black/60" : "text-white/80")}>
                  {language === 'en' ? tier.descEn : tier.descAr}
                </p>
             </div>

             <div className="flex items-center justify-between mt-6 md:mt-8 relative z-10 border-t pt-6 md:pt-8 border-current border-opacity-10">
                <button className="flex items-center gap-4 group/btn transition-all">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                      {language === 'en' ? 'View Curriculum' : 'عرض المنهج'}
                   </span>
                   <div className={cn(
                     "w-8 h-8 rounded-full flex items-center justify-center border transition-all",
                     index === 2 ? "border-black/20 group-hover/btn:bg-black group-hover/btn:text-white" : "border-white/30 group-hover/btn:bg-white group-hover/btn:text-black"
                   )}>
                      <ArrowUpRight className="w-4 h-4" />
                   </div>
                </button>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;