"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Sparkles, Star, Quote, MoveRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils"; // تأكد من وجود هذا الملف كما شرحنا سابقاً

const DoctorProfile = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollVelocity = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // حركات البارالاكس والعناصر العائمة
  const yImage = useTransform(scrollVelocity, [0, 1], [0, -150]);
  const rotateImg = useTransform(scrollVelocity, [0, 1], [0, 5]);
  const marqueeX = useTransform(scrollVelocity, [0, 1], [0, -1000]);

  // كائن البيانات المترجمة (لحل مشكلة عدم ترجمة بعض النصوص)
  const drSara = {
    firstName: language === "en" ? "SARA" : "سارة",
    lastName: language === "en" ? "ABDALLAH" : "عبد الله",
    tagline: language === "en" ? "Simply Blossom" : "تفتحي ببساطة",
    marquee: language === "en" ? "AESTHETIC EXCELLENCE • " : "تميز تجميلي • ",
    bio: language === "en" 
      ? "Mastering the fine line between science and art to help you blossom into your best self."
      : "إتقان الخط الرفيع بين العلم والفن لمساعدتكِ على التفتح لتكوني النسخة الأجمل من نفسكِ.",
    philosophy: language === "en"
      ? "True beauty isn't created in a lab; it's revealed through the delicate balance of medical mastery and artistic vision."
      : "الجمال الحقيقي لا يُصنع في المختبر؛ بل يتم الكشف عنه من خلال التوازن الدقيق بين الإتقان الطبي والرؤية الفنية.",
    badge: language === "en" ? "International Board Certified Master" : "ماجستير معتمد من البورد الدولي",
    ctaTitle: language === "en" ? "Start Your" : "ابدئي رحلة",
    ctaSub: language === "en" ? "Blossom." : "تفتحكِ.",
    ctaDesc: language === "en" 
      ? "Reserve your private consultation with Dr. Sara and experience the pinnacle of luxury care."
      : "احجزي استشارتكِ الخاصة مع دكتورة سارة واختبري قمة الرعاية الفاخرة.",
    ctaBtn: language === "en" ? "Book Your Session" : "احجزي جلستكِ الآن",
    image: "/images/doctor5.png",
  };

  const expertise = [
    { 
      icon: Sparkles, 
      title: language === "en" ? "Artistic Contouring" : "نحت فني", 
      desc: language === "en" ? "Non-surgical procedures that feel like a masterpiece." : "إجراءات غير جراحية تبدو وكأنها لوحة فنية." 
    },
    { 
      icon: Award, 
      title: language === "en" ? "Clinical Mastery" : "إتقان إكلينيكي", 
      desc: language === "en" ? "15+ Years of experience in high-end medical aesthetics." : "أكثر من 15 عاماً من الخبرة في التجميل الطبي الراقي." 
    },
    { 
      icon: Star, 
      title: language === "en" ? "Bespoke Journey" : "رحلة مخصصة", 
      desc: language === "en" ? "Every face has a story. We help you write its best chapter." : "لكل وجه قصة، نحن نساعدكِ على كتابة أفضل فصولها." 
    }
  ];

  return (
    <div className={cn("min-h-screen bg-[#F5EEE6] text-black overflow-hidden", language === 'ar' ? "font-arabic" : "font-sans")} ref={containerRef} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />

      {/* 1. الخلفية السائلة (Blobs) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div animate={{ x: [0, 50, 0], y: [0, 100, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#E91E63]/10 rounded-full blur-[120px]" />
        <motion.div animate={{ x: [0, -50, 0], y: [0, -100, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#E91E63]/5 rounded-full blur-[100px]" />
      </div>

      {/* --- SECTION 1: HERO --- */}
      <section className="relative min-h-screen flex items-center pt-24 z-10">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[2px] bg-[#E91E63]" />
                <span style={{ fontFamily: language === 'en' ? "'Dancing Script', cursive" : "inherit" }} className="text-3xl text-[#E91E63]">
                  {drSara.tagline}
                </span>
              </div>
              <h1 className="text-7xl md:text-[10rem] font-serif font-black leading-[0.75] mb-10 tracking-tighter">
                {drSara.firstName} <br />
                <span className="text-white drop-shadow-[0_2px_2px_rgba(233,30,99,0.5)] italic">{drSara.lastName}</span>
              </h1>
              <p className={cn("text-xl text-black/60 max-w-lg leading-relaxed italic border-[#E91E63]", language === 'ar' ? "border-r-4 pr-6" : "border-l-4 pl-6")}>
                {drSara.bio}
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div style={{ y: yImage, rotate: rotateImg }} className="relative z-10 rounded-[4rem] overflow-hidden border-[20px] border-white shadow-2xl">
              <img src={drSara.image} alt={drSara.firstName} className="w-full h-full object-cover scale-110" />
            </motion.div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -top-10 -left-10 w-full h-full border border-dashed border-[#E91E63]/40 rounded-full -z-10" />
          </div>
        </div>

        {/* Marquee المتحرك */}
        <div className="absolute bottom-10 left-0 w-full overflow-hidden opacity-10 pointer-events-none">
          <motion.div style={{ x: marqueeX }} className="text-[10rem] font-serif font-black whitespace-nowrap flex gap-10">
            {Array(10).fill(drSara.marquee).map((text, i) => <span key={i}>{text}</span>)}
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: PHILOSOPHY --- */}
      <section className="py-40 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="bg-white/40 backdrop-blur-3xl p-16 md:p-32 rounded-[5rem] border border-white/60 shadow-2xl">
            <Heart className="w-16 h-16 text-[#E91E63] mx-auto mb-10 animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight mb-12">
               "{drSara.philosophy}"
            </h2>
            <div className="inline-block px-10 py-4 bg-white rounded-full shadow-sm text-xs font-black uppercase tracking-[0.4em]">
              {drSara.badge}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 3: EXPERTISE --- */}
      <section className="py-32 relative z-10 bg-white/10">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
          {expertise.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -20, rotateY: 10 }} className="p-12 rounded-[3.5rem] bg-white/60 border border-white shadow-xl hover:shadow-[#E91E63]/10 transition-all duration-500 group">
              <div className="w-20 h-20 rounded-3xl bg-[#E91E63] text-white flex items-center justify-center mb-10 shadow-lg shadow-[#E91E63]/20 group-hover:rotate-[15deg] transition-transform">
                <item.icon className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-6 italic">{item.title}</h3>
              <p className="text-black/50 leading-relaxed text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SECTION 4: CTA (Deep Burgundy) --- */}
      <section className="py-40 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="bg-gradient-to-br from-[#E91E63] to-[#4A0E2E] text-white rounded-[5rem] p-16 md:p-32 relative overflow-hidden group">
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
               <div className={cn(language === 'ar' ? "text-right" : "text-left")}>
                  <h2 className="text-6xl md:text-8xl font-serif font-bold italic mb-8 leading-none">
                    {drSara.ctaTitle} <br /> 
                    <span className="text-[#F5EEE6]">{drSara.ctaSub}</span>
                  </h2>
                  <p className="text-[#F5EEE6]/60 text-xl mb-12 max-w-sm italic">
                    {drSara.ctaDesc}
                  </p>
                  <motion.button whileHover={{ scale: 1.05, x: language === 'en' ? 20 : -20 }} className="flex items-center gap-6 bg-white text-[#E91E63] px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] shadow-2xl">
                    {drSara.ctaBtn}
                    <MoveRight className={cn("w-6 h-6", language === 'ar' && "rotate-180")} />
                  </motion.button>
               </div>
               <div className="relative flex justify-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-white/20 rounded-full" />
                  <img src="/images/logo.png" className="h-48 md:h-72 w-auto object-contain brightness-0 invert opacity-80" alt="Logo" />
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoctorProfile;