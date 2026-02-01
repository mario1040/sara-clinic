"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Star, Sparkles, Instagram, Facebook, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const DoctorsSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef(null);

  // حركات التمرير (Parallax)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const doctorData = {
    name: language === "en" ? "Dr. Sara Abd Allah" : "د. سارة عبد الله",
    role: language === "en" ? "Founder & Chief Dermatologist" : "المؤسسة وأخصائية الجلدية",
    specialty: language === "en" ? "Aesthetic Medicine & Laser Specialist" : "أخصائية التجميل الطبي والليزر",
    credentials: language === "en" ? "MSc, International Board Certified Master" : "ماجستير، معتمدة من البورد الدولي",
    quote: language === "en" 
      ? "Beauty is the natural result of scientific precision and artistic vision." 
      : "الجمال هو النتيجة الطبيعية للدقة العلمية والرؤية الفنية."
  };

  return (
    <section ref={sectionRef} className="py-32 bg-[#F5EEE6] overflow-hidden relative">
      {/* عناصر زخرفية في الخلفية */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E91E63]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* --- الجانب الأيسر: الصورة (Creative Frame) --- */}
          <div className="lg:col-span-6 relative">
            <motion.div 
              style={{ y: imgY }}
              className="relative z-10 rounded-[4rem] overflow-hidden border-[15px] border-white shadow-2xl"
            >
              <img 
                src="/images/doctorsara.png" 
                alt="Dr. Sara" 
                className="w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E2E]/40 to-transparent" />
            </motion.div>

            {/* أيقونة Sparkle عائمة */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-32 h-32 border border-dashed border-[#E91E63]/30 rounded-full flex items-center justify-center"
            >
              <Sparkles className="text-[#E91E63] w-8 h-8 opacity-40" />
            </motion.div>
          </div>

          {/* --- الجانب الأيمن: النص (Premium Content) --- */}
          <div className="lg:col-span-6 relative z-20">
            <motion.div style={{ y: textY }}>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-[#E91E63] text-3xl mb-4 block">
                    The Face of Excellence
                  </span>
                  <h2 className="text-6xl md:text-8xl font-serif font-black tracking-tighter leading-[0.8] mb-6">
                    {language === 'en' ? 'MEET THE' : 'لقاء'} <br />
                    <span className="text-[#E91E63] italic">{language === 'en' ? 'MASTER' : 'الخبيرة'}</span>
                  </h2>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-serif font-bold">{doctorData.name}</h3>
                  <p className="text-[#E91E63] font-bold uppercase tracking-widest text-xs">{doctorData.role}</p>
                </div>

                {/* كروت المعلومات الزجاجية */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-6 bg-white/40 backdrop-blur-xl border border-white rounded-3xl shadow-sm">
                    <Award className="text-[#E91E63] w-6 h-6 mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest text-black/40 mb-2">{language === 'en' ? 'Specialty' : 'التخصص'}</p>
                    <p className="font-bold text-sm leading-relaxed">{doctorData.specialty}</p>
                  </div>
                  <div className="p-6 bg-white/40 backdrop-blur-xl border border-white rounded-3xl shadow-sm">
                    <Star className="text-[#E91E63] w-6 h-6 mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest text-black/40 mb-2">{language === 'en' ? 'Education' : 'التعليم'}</p>
                    <p className="font-bold text-sm leading-relaxed">{doctorData.credentials}</p>
                  </div>
                </div>

                {/* اقتباس فني */}
                <div className="relative pt-10 border-t border-black/5">
                  <Quote className="absolute top-8 left-0 w-12 h-12 text-[#E91E63]/10" />
                  <p className="text-2xl font-serif italic text-black/60 leading-relaxed pl-6">
                    "{doctorData.quote}"
                  </p>
                </div>

                {/* روابط التواصل الفاخرة */}
                <div className="flex gap-4 pt-4">
                  {[Instagram, Facebook].map((Icon, i) => (
                    <motion.a 
                      key={i}
                      href="#" 
                      whileHover={{ scale: 1.1, backgroundColor: "#E91E63", color: "#fff" }}
                      className="w-12 h-12 rounded-full border border-black/5 bg-white flex items-center justify-center transition-all duration-500 shadow-sm"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;