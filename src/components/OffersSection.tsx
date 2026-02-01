"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ArrowUpRight, Star, TicketPercent } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. تعريف شكل بيانات العرض
interface Offer {
  number: string;
  title: string;
  description: string;
  image: string;
}

// 2. تعريف أنواع الـ Props
interface PerspectiveCardProps {
  offer: Offer;
  index: number;
  language: string;
}

// --- مكون الكرت ثلاثي الأبعاد (كما هو) ---
const PerspectiveCard = ({ offer, index, language }: PerspectiveCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative h-[500px] w-full cursor-pointer group"
    >
      <div 
        style={{ transform: "translateZ(-50px)" }}
        className="absolute inset-0 rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl"
      >
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E2E]/90 via-black/20 to-transparent" />
      </div>

      <motion.span
        style={{ transform: "translateZ(80px)" }}
        className="absolute -top-6 -left-6 text-9xl font-serif font-black text-white/10 select-none"
      >
        {offer.number}
      </motion.span>

      <div
        style={{ transform: "translateZ(50px)" }}
        className="absolute bottom-8 left-8 right-8 p-8 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-[#E91E63] flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <ArrowUpRight className="w-6 h-6 text-white/40 group-hover:text-[#E91E63] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>

        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 italic">
          {offer.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed max-w-[80%]">
          {offer.description}
        </p>

        <div className="mt-6 flex items-center gap-2">
           <span className="h-[1px] w-8 bg-[#E91E63]" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E91E63]">
              {language === 'en' ? 'Limited Time' : 'لفترة محدودة'}
           </span>
        </div>
      </div>

      <div className="absolute inset-0 rounded-[3rem] group-hover:shadow-[0_0_50px_rgba(233,30,99,0.2)] transition-shadow duration-500 pointer-events-none" />
    </motion.div>
  );
};

// --- المكون الرئيسي ---
const OffersSection = () => {
  const { t, language, isRTL } = useLanguage();

  const offers: Offer[] = [
    {
      number: "01",
      title: language === "en" ? "Summer Glow Package" : "باقة توهج الصيف",
      description: language === "en" 
        ? "Complete skin rejuvenation with HydraFacial + LED therapy" 
        : "تجديد البشرة الكامل مع هيدرا فيشل + العلاج بالضوء",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    },
    {
      number: "02",
      title: language === "en" ? "Smile Makeover" : "تجميل الابتسامة",
      description: language === "en" 
        ? "Premium veneers with complimentary whitening treatment" 
        : "قشور الأسنان الفاخرة مع تبييض مجاني",
      image: "/images/offer2.png",
    },
  ];

  // إعداد نصوص الشريط المتحرك
  const marqueeText = language === 'en' 
    ? ["BOOK NOW", "LIMITED SLOTS", "SPECIAL OFFER", "RADIANCE"] 
    : ["احجزي الآن", "أماكن محدودة", "عرض خاص", "إشراقة"];

  return (
    <section className="py-32 bg-[#F5EEE6] overflow-hidden relative">
      <div className="container mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-[#E91E63] text-3xl mb-4 block">
              Exclusive Rituals
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter leading-none">
              CURATED <br />
              <span className="text-[#E91E63] italic">EXPERIENCES</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-black/40 text-sm uppercase tracking-[0.3em] font-bold max-w-xs leading-loose"
          >
            {language === 'en' 
              ? "Discover our seasonal masterclasses in beauty and wellness."
              : "اكتشفي باقاتنا الموسمية المختارة بعناية للجمال والصحة."}
          </motion.p>
        </div>

        {/* شبكة الكروت */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 perspective-1000 relative z-10">
          {offers.map((offer, index) => (
            <PerspectiveCard 
              key={index} 
              offer={offer} 
              index={index} 
              language={language} 
            />
          ))}
        </div>
      </div>

      {/* --- ANIMATED ANNOUNCEMENT BAR (الشريط المتحرك) --- */}
      <div className="relative w-full py-8 border-y border-[#E91E63]/10 bg-white/30 backdrop-blur-md overflow-hidden flex items-center">
         {/* Gradient Masks to fade edges */}
         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5EEE6] to-transparent z-10" />
         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5EEE6] to-transparent z-10" />

         <motion.div 
           // التحرك لليمين في العربي ولليسار في الإنجليزي
           animate={{ x: isRTL ? ["-50%", "0%"] : ["0%", "-50%"] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="flex items-center gap-16 whitespace-nowrap min-w-full"
         >
            {/* نكرر النص عدة مرات لضمان عدم وجود فراغات */}
            {[...Array(6)].map((_, i) => (
               <div key={i} className="flex items-center gap-16">
                  {marqueeText.map((text, j) => (
                    <div key={j} className="flex items-center gap-6 group cursor-default">
                       {/* أيقونة تفاعلية */}
                       <TicketPercent className="w-8 h-8 text-[#E91E63] group-hover:rotate-12 transition-transform" />
                       
                       {/* النص بتأثير الـ Outline */}
                       <span 
                         className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-black/80 to-black/80 group-hover:from-[#E91E63] group-hover:to-[#E91E63] transition-colors duration-500"
                         style={{ WebkitTextStroke: j % 2 === 0 ? "0px" : "1px rgba(0,0,0,0.3)" }} // تبديل بين النص الممتلئ والمفرغ
                       >
                         {text}
                       </span>
                       
                       <Star className="w-4 h-4 text-black/20 fill-black/20" />
                    </div>
                  ))}
               </div>
            ))}
         </motion.div>
      </div>

    </section>
  );   
};

export default OffersSection;