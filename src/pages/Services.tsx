"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight, GraduationCap, Users, Building2, Sparkles, Microscope, Star, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// --- 1. تعريف واجهة بيانات الأكاديمية بنوع بيانات سليم ---
interface AcademyTier {
  id: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  icon: LucideIcon; // استبدلنا any بنوع الأيقونة الصحيح
  image: string;
  tag: string;
}

const academyTiers: AcademyTier[] = [
  {
    id: "solo",
    titleEn: "SOLO MASTERCLASS",
    titleAr: "ماستر كلاس الأفراد",
    subtitleEn: "Private Mentorship",
    subtitleAr: "تدريب خاص ومكثف",
    descEn: "A bespoke one-on-one clinical immersion designed for doctors seeking elite precision.",
    descAr: "انغماس إكلينيكي مخصص لشخص واحد، مصمم للأطباء الباحثين عن الدقة النخبوية.",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200",
    tag: "B2C Private"
  },
  {
    id: "group",
    titleEn: "COLLECTIVE SYMPOSIUM",
    titleAr: "ندوات المجموعات",
    subtitleEn: "Collaborative Learning",
    subtitleAr: "تعلم تعاوني متقدم",
    descEn: "Where medical minds converge to exchange advanced techniques in a high-energy environment.",
    descAr: "حيث تلتقي العقول الطبية لتبادل التقنيات المتقدمة في بيئة مليئة بالأفكار الإبداعية.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
    tag: "B2C Group"
  },
  {
    id: "b2b",
    titleEn: "INSTITUTIONAL SOLUTIONS",
    titleAr: "حلول المؤسسات",
    subtitleEn: "Corporate B2B Excellence",
    subtitleAr: "تميز الشركات والمراكز",
    descEn: "Standardizing luxury aesthetic care for medical entities and private clinics globally.",
    descAr: "توحيد معايير الرعاية التجميلية الفاخرة للمنشآت الطبية والعيادات الخاصة عالمياً.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200",
    tag: "B2B Expert"
  }
];

const ServicesSection = () => {
  const { language, isRTL } = useLanguage();
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  const dermatologyServices = [
    {
      title: language === 'en' ? "Surgical Aesthetics" : "التجميل الجراحي",
      desc: language === 'en' ? "Advanced treatment for all skin conditions with clinical precision." : "دقة إكلينيكية فائقة في العمليات الجراحية التجميلية.",
      image: "/images/servicec2.png",
      link: "/services/dermatology",
      petalClass: "rounded-[60% 40% 30% 70% / 60% 30% 70% 40%]"
    },
    {
      title: language === 'en' ? "Non-Surgical Art" : "التجميل غير الجراحي",
      desc: language === 'en' ? "The gold standard in skin rejuvenation and non-invasive mastery." : "المعيار الذهبي في تجديد البشرة والبراعة غير الجراحية.",
      image: "/images/servicec1.png",
      link: "/services/plastic-surgery",
      petalClass: "rounded-[30% 70% 60% 40% / 70% 60% 40% 30%]"
    }
  ];

  return (
    <section className="py-40 bg-[#F5EEE6] overflow-hidden relative select-none">
      
      {/* 1. الخلفية المتحركة (Text Marquee) */}
      <div className="absolute top-1/2 left-0 w-full overflow-hidden opacity-[0.03] select-none pointer-events-none z-0">
        <motion.h2 
          animate={{ x: isRTL ? [0, 200, 0] : [0, -200, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="text-[20rem] font-serif font-black whitespace-nowrap leading-none"
        >
          {language === 'en' ? 'PRECISION ARTISTRY ACADEMY' : 'دقة إبداع أكاديمية'}
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- SECTION 1: DERMATOLOGY --- */}
        <div className="mb-48">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10"
          >
            <div>
              <span className="text-[#E91E63] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                {language === 'en' ? "Clinical Masterpieces" : "روائع إكلينيكية"}
              </span>
              <h2 className="text-7xl md:text-9xl font-serif font-black tracking-tighter leading-none text-black">
                DERMA <br /> <span className="text-[#E91E63] italic">CORE</span>
              </h2>
            </div>
            <p className="text-black/40 text-sm max-w-xs leading-loose italic">
              {language === 'en' 
                ? "Breaking boundaries between medical science and high-end aesthetic art." 
                : "كسر الحدود بين العلوم الطبية وفن التجميل الراقي."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
            {dermatologyServices.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="group relative">
                <Link to={service.link} className="block relative">
                  <motion.div whileHover={{ scale: 0.97, rotate: i === 0 ? -2 : 2 }} className={cn("relative aspect-[4/5] overflow-hidden shadow-2xl transition-all duration-1000 border-[10px] border-white", service.petalClass)}>
                    <img src={service.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  </motion.div>
                  <div className={cn("absolute z-20 bottom-10 flex flex-col gap-2 transition-all duration-500", isRTL ? "right-10 text-right" : "left-10 text-left")}>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white italic">{service.title}</h3>
                    <p className="text-white/60 text-xs max-w-[200px] leading-relaxed italic">{service.desc}</p>
                    <div className="mt-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#E91E63] group-hover:text-white transition-all">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- SECTION 2: ACADEMY (Kinetic Blades) --- */}
        <div className="relative pt-20 border-t border-black/5">
          <div className="flex flex-col md:flex-row md:items-baseline gap-6 mb-20">
            <span className="text-7xl md:text-9xl font-serif font-bold italic text-[#E91E63] leading-none">02</span>
            <div>
              <h3 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter text-black">
                {language === 'en' ? 'EDUCATIONAL' : 'الأكاديمية'} <br /> 
                <span className="text-black/20 italic uppercase">{language === 'en' ? 'Mastery' : 'التعليمية'}</span>
              </h3>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row h-[900px] lg:h-[750px] gap-4 lg:gap-2">
            {academyTiers.map((tier) => {
              const isHovered = hoveredTier === tier.id;
              const isNoneHovered = hoveredTier === null;
              const Icon = tier.icon;

              return (
                <motion.div
                  key={tier.id}
                  onMouseEnter={() => setHoveredTier(tier.id)}
                  onMouseLeave={() => setHoveredTier(null)}
                  animate={{ 
                    flex: isHovered ? 3 : 1,
                    filter: !isHovered && !isNoneHovered ? "grayscale(1) blur(4px)" : "grayscale(0) blur(0px)"
                  }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className={cn("relative group overflow-hidden rounded-[3.5rem] cursor-pointer border border-white/20 transition-all", isHovered ? "shadow-2xl" : "shadow-md")}
                >
                  <motion.div className="absolute inset-0 z-0">
                    <motion.img animate={{ scale: isHovered ? 1.05 : 1.25 }} src={tier.image} className="w-full h-full object-cover" alt="" />
                    <div className={cn("absolute inset-0 transition-opacity duration-1000", isHovered ? "bg-black/70" : "bg-black/40")} />
                  </motion.div>

                  <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <motion.div animate={{ opacity: isHovered ? 1 : 0.4, y: isHovered ? 0 : 20 }} className="px-6 py-2 rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md">
                        {tier.tag}
                      </motion.div>
                      <Icon className={cn("w-10 h-10 transition-all duration-700", isHovered ? "text-[#E91E63] scale-125 rotate-12" : "text-white/20")} />
                    </div>

                    <div className="space-y-6">
                      <motion.div animate={{ x: isHovered ? 0 : (isRTL ? 30 : -30) }} transition={{ duration: 0.6 }}>
                        <p className="text-[#E91E63] text-xs font-black uppercase tracking-[0.4em] mb-3">{language === 'en' ? tier.subtitleEn : tier.subtitleAr}</p>
                        <h4 className="text-4xl md:text-6xl font-serif font-bold text-white leading-none tracking-tighter">{language === 'en' ? tier.titleEn : tier.titleAr}</h4>
                      </motion.div>
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="space-y-10">
                            <p className="text-white/50 text-xl leading-relaxed max-w-md italic">{language === 'en' ? tier.descEn : tier.descAr}</p>
                            <motion.button whileHover={{ scale: 1.05, x: isRTL ? -10 : 10 }} className="bg-white text-black px-12 py-6 rounded-full flex items-center gap-6 group/btn shadow-2xl">
                               <span className="text-[10px] font-black uppercase tracking-[0.3em]">{language === 'en' ? 'Request Admission' : 'طلب الالتحاق'}</span>
                               <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover/btn:bg-[#E91E63] transition-colors"><ArrowUpRight size={20} /></div>
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- DECORATIVE FOOTER --- */}
        <div className="mt-32 flex flex-col items-center gap-6">
           <div className="flex items-center gap-6">
              <Star size={20} className="text-[#E91E63] fill-[#E91E63]" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-black/20 text-center">The Gold Standard in Aesthetic Evolution</span>
              <Star size={20} className="text-[#E91E63] fill-[#E91E63]" />
           </div>
           <div className="w-px h-24 bg-gradient-to-b from-[#E91E63] to-transparent opacity-30" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;