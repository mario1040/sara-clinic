"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, ArrowRight, Play, Sparkles, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const PlasticSurgery = () => {
  const { language, isRTL, t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // حالة الفيديو المختار

  const ArrowBack = isRTL ? ArrowRight : ArrowLeft;
  const Chevron = isRTL ? ArrowLeft : ArrowRight;

  const procedures = [
    {
      name: language === "en" ? "Botox Elite" : "بوتوكس إيليت",
      tag: language === "en" ? "Anti-Aging" : "مكافحة التجاعيد",
      description: language === "en" 
        ? "Advanced neurotoxin treatments to smooth expression lines and redefine facial harmony."
        : "علاجات متطورة لتنعيم خطوط التعبير وإعادة تناغم الوجه بدقة جراحية فائقة.",
      image: "/images/serv1.png",
      videoUrl: "https://www.youtube.com/embed/UXLG0gJMx8k",
    },
    {
      name: language === "en" ? "Dermal Fillers" : "فيلر الوجه",
      tag: language === "en" ? "Contouring" : "تحديد ونحت",
      description: language === "en" 
        ? "Premium hyaluronic acid fillers to restore volume and sculpt jawlines naturally."
        : "فيلر حمض الهيالورونيك الفاخر لاستعادة الحجم، نحت خط الفك، وتحسين جمال الشفاه.",
      image: "/images/serv2.png",
      videoUrl: "https://www.youtube.com/embed/UXLG0gJMx8k",
    },
    {
      name: language === "en" ? "Skin Booster" : "إسكين بوستر",
      tag: language === "en" ? "Hydration" : "ترطيب عميق",
      description: language === "en" 
        ? "Deep cellular hydration treatments that provide an instant glow and improve skin texture."
        : "علاجات ترطيب خلوي عميقة تمنحك توهجاً فورياً وتحسن ملمس الجلد من الداخل.",
      image: "/images/serv3.png",
      videoUrl: "https://www.youtube.com/embed/UXLG0gJMx8k",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF9] selection:bg-[#E91E63] selection:text-white">
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="pt-40 pb-20 relative">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
             <Link to="/services" className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-[#E91E63] transition-colors">
              <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#E91E63] transition-all">
                <ArrowBack className="w-3 h-3" />
              </div>
              {language === "en" ? "Back to Services" : "العودة للخدمات"}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-6xl md:text-8xl font-serif font-black leading-[0.9] tracking-tighter text-black mb-8 uppercase">
                Aesthetic <br />
                <span className="text-[#E91E63] italic">Rituals</span>
              </h1>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg text-black/50 font-medium leading-relaxed max-w-md pb-4 border-l-2 border-[#E91E63] pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pr-6 rtl:pl-0">
              {language === "en" 
                ? "Exclusive injectable treatments curated by Dr. Sara to enhance your natural beauty with surgical precision."
                : "علاجات حصرية بإشراف د. سارة لتعزيز جمالك الطبيعي بدقة جراحية فائقة."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. Procedures Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {procedures.map((proc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative h-[600px] rounded-[3rem] overflow-hidden bg-white shadow-sm border border-black/5"
              >
                <div className="absolute inset-0 z-0">
                  <motion.img src={proc.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent group-hover:from-black/90 group-hover:via-black/30 transition-all duration-700" />
                </div>

                <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="px-5 py-2 rounded-full bg-white/10 group-hover:bg-white/20 backdrop-blur-xl text-[9px] font-black uppercase tracking-widest text-black group-hover:text-white transition-all border border-black/5 group-hover:border-white/30 shadow-sm">
                      {proc.tag}
                    </span>
                    {/* زر التشغيل يقوم الآن بتحديث الـ state لفتح الفيديو */}
                    <button 
                      onClick={() => setSelectedVideo(proc.videoUrl)}
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 hover:bg-[#E91E63] hover:text-white cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current ml-1" />
                    </button>
                  </div>

                  <div className="transform transition-transform duration-700 group-hover:-translate-y-2">
                    <h3 className="text-4xl font-serif font-bold text-black group-hover:text-white mb-5 transition-colors leading-tight">{proc.name}</h3>
                    <p className="text-black/50 group-hover:text-white/60 text-sm leading-relaxed mb-10 transition-colors">{proc.description}</p>
                    <Link to="/contact-us" className="inline-flex items-center gap-4 text-[#E91E63] group-hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-colors border-b border-transparent group-hover:border-white/30 pb-2">
                       {language === "en" ? "Book Ritual" : "احجز الجلسة"}
                       <Chevron className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VIDEO MODAL (نافذة الفيديو المنبثقة) --- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 md:p-10"
            onClick={() => setSelectedVideo(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:text-[#E91E63] transition-colors">
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`${selectedVideo}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default PlasticSurgery;