"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Users, Heart, Sparkles, MoveRight, Star } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// --- 1. مكون الأرقام المتحركة (Elegant Counter) ---
const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const totalTicks = 60;
      const increment = end / totalTicks;
      const intervalTime = (duration * 1000) / totalTicks;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, intervalTime);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue, duration]);

  return <span ref={ref} className="tabular-nums">{displayValue}{suffix}</span>;
};

const AboutUs = () => {
  const { t, language } = useLanguage();
  const parallaxRef = useRef(null);

  // Parallax للمحتوى
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const stats = [
    { number: "12+", label: language === "en" ? "Years of Beauty" : "عاماً من الجمال" },
    { number: "15K+", label: language === "en" ? "Happy Faces" : "وجه سعيد" },
    { number: "100%", label: language === "en" ? "Precision" : "دقة متناهية" },
    { number: "25+", label: language === "en" ? "Expert Services" : "خدمة خبيرة" },
  ];

  return (
    <div className="min-h-screen bg-[#F5EEE6] text-black overflow-hidden font-sans">
      <Navbar />

      {/* --- HERO SECTION: The Artistic Reveal --- */}
      <section className="relative min-h-[90vh] flex items-center pt-24">
        {/* العناصر الزخرفية */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E91E63]/5 rounded-l-[10rem] -z-0" />
        
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.span 
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-[#E91E63] text-3xl mb-4 block"
            >
              Simply Blossom...
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-8 tracking-tighter">
              Defining <br />
              <span className="text-[#E91E63] italic">Aesthetic</span> <br />
              Mastery
            </h1>
            <p className="text-lg text-black/60 max-w-md leading-relaxed mb-10">
              {language === 'en' 
                ? "Dr. Sara Abd Allah Clinic is where medical science meets the delicacy of art to reveal your natural radiance."
                : "عيادة دكتورة سارة عبد الله حيث يلتقي العلم الطبي برقة الفن للكشف عن إشراقك الطبيعي."}
            </p>
          </motion.div>

          <div className="relative">
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1.5 }}
               className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white"
             >
               <img 
                 src="/images/doctorsara2.png" 
                 className="w-full aspect-[4/5] object-cover" 
                 alt="Luxury Clinic" 
               />
             </motion.div>
             {/* Floating Badge */}
             <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute -bottom-10 -left-10 bg-black text-white p-8 rounded-full z-20 hidden md:block"
             >
                <Star className="text-[#E91E63] mb-2 fill-[#E91E63]" />
                <div className="text-xs font-bold tracking-widest uppercase italic">The Gold <br/> Standard</div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION: The Glass Marquee --- */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="bg-white/40 backdrop-blur-xl border border-white rounded-[3rem] p-12 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-xl shadow-[#E91E63]/5">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl md:text-6xl font-serif font-bold text-[#E91E63] mb-2">
                  <Counter value={stat.number} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-black/40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STORY SECTION: Parallax & Floating Elements --- */}
      <section ref={parallaxRef} className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            
            <div className="lg:col-span-6 relative">
              <motion.div style={{ y: y1 }} className="relative z-10 rounded-t-full overflow-hidden border-8 border-white">
                <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000" alt="Detail" />
              </motion.div>
              <motion.div 
                style={{ y: y2 }}
                className="absolute -bottom-20 -right-10 w-2/3 rounded-3xl overflow-hidden border-8 border-[#F5EEE6] shadow-2xl z-20"
              >
                <img src="/images/doctorsara3.png" alt="Doctor" />
              </motion.div>
            </div>

            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10">
                  Crafting <span className="text-[#E91E63] italic">Confidence</span>
                </h2>
                <div className="space-y-6 text-black/60 text-xl font-light leading-relaxed italic">
                  <p className="first-letter:text-7xl first-letter:text-[#E91E63] first-letter:font-serif first-letter:float-left first-letter:mr-4">
                    {language === 'en' 
                      ? "At our clinic, we believe that beauty is not about changing who you are, but about blossoming into your most radiant self. Dr. Sara combines surgical precision with a deep understanding of natural aesthetics."
                      : "في عيادتنا، نؤمن أن الجمال لا يتعلق بتغيير هويتك، بل بالتفتح لتصبحي النسخة الأكثر إشراقاً من نفسك. تجمع دكتورة سارة بين الدقة الجراحية والفهم العميق للجمال الطبيعي."}
                  </p>
                </div>

                <motion.button 
                  whileHover={{ gap: "2rem" }}
                  className="mt-12 flex items-center gap-6 text-black font-black uppercase tracking-[0.3em] text-xs transition-all"
                >
                  {language === 'en' ? "Explore Our Vision" : "اكتشفي رؤيتنا"}
                  <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center">
                    <MoveRight className="w-5 h-5" />
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUES: The Organic Cards --- */}
      <section className="py-32 bg-white/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
             <h3 className="text-4xl font-serif font-bold mb-4 italic">Our Core Philosophy</h3>
             <div className="w-24 h-1 bg-[#E91E63] mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Care", text: "Compassionate approach to every patient's needs." },
              { icon: Sparkles, title: "Artistry", text: "Medical results that look and feel completely natural." },
              { icon: Award, title: "Safety", text: "Highest medical standards and sterilized environment." }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -20 }}
                className="p-12 rounded-[4rem] bg-[#F5EEE6] border border-white shadow-sm flex flex-col items-center text-center group transition-all duration-500 hover:shadow-2xl hover:shadow-[#E91E63]/10"
              >
                <div className="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center mb-8 shadow-inner group-hover:rotate-[15deg] transition-transform">
                  <item.icon className="w-10 h-10 text-[#E91E63]" />
                </div>
                <h4 className="text-2xl font-serif font-bold mb-4">{item.title}</h4>
                <p className="text-black/40 leading-relaxed text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;