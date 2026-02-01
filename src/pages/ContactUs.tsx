"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactUs = () => {
  const { t, language } = useLanguage();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    toast.success(language === "en" ? "Message sent to Dr. Sara's team!" : "تم إرسال رسالتك لفريق دكتورة سارة!");
    reset();
  };

  // بيانات الاتصال المترجمة برمجياً
  const contactDetails = [
    {
      icon: MapPin,
      title: language === "en" ? "Our Sanctuaries" : "مراكزنا",
      content: (
        <div className="space-y-4">
          <div className="group/loc">
            <span className="text-[#E91E63] font-bold text-xs uppercase tracking-widest block mb-1">
              {language === "en" ? "Mansoura" : "المنصورة"}
            </span>
            <p className="text-sm opacity-70 group-hover/loc:opacity-100 transition-opacity">
              {language === "en" 
                ? "University District, Toshka Gate, 2nd Floor." 
                : "حي الجامعة، أمام بوابة توشكا، الدور الثاني."}
            </p>
          </div>
          <div className="group/loc">
            <span className="text-[#E91E63] font-bold text-xs uppercase tracking-widest block mb-1">
              {language === "en" ? "Cairo" : "القاهرة"}
            </span>
            <p className="text-sm opacity-70 group-hover/loc:opacity-100 transition-opacity">
              {language === "en"
                ? "88 Joseph Tito, El Nozha."
                : "٨٨ جوزيف تيتو، النزهة."}
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: Phone,
      title: language === "en" ? "Direct Line" : "الخط المباشر",
      content: (
        <div className="space-y-3" dir="ltr">
          <a href="tel:01019761776" className="flex items-center gap-3 hover:text-[#E91E63] transition-colors group">
            <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#E91E63] group-hover:text-white transition-all">
              <Phone className="w-3 h-3" />
            </div>
            <span className="font-mono font-bold">01019761776</span>
          </a>
          <a href="https://wa.me/201150883939" target="_blank" className="flex items-center gap-3 text-green-600 hover:scale-105 transition-transform origin-left">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
              <MessageCircle className="w-3 h-3" />
            </div>
            <span className="font-mono font-bold">WhatsApp Us</span>
          </a>
        </div>
      ),
    },
    {
      icon: Mail,
      title: language === "en" ? "Digital Correspondence" : "المراسلة الرقمية",
      content: (
        <a href="mailto:info@citrineclinic.com" className="text-sm hover:text-[#E91E63] transition-colors break-all italic">
          info@citrineclinic.com
        </a>
      ),
    },
  ];

  return (
    <div className={cn("min-h-screen bg-[#F5EEE6] text-black overflow-hidden", language === 'ar' && "font-arabic")}>
      <Navbar />
      
      {/* 1. الخلفية الفنية (Animated Mesh) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-[#E91E63]/5 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ x: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-[5%] left-[5%] w-[600px] h-[600px] bg-[#E91E63]/10 rounded-full blur-[120px]" 
        />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-[#E91E63] text-3xl mb-4 block">
              Contact Dr. Sara
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter mb-6">
              LET'S <span className="italic text-white drop-shadow-sm shadow-[#E91E63]">CONNECT</span>
            </h1>
            <p className="text-black/40 max-w-xl mx-auto uppercase text-[10px] font-bold tracking-[0.4em]">
              {language === 'en' ? "Professional Consultation • Exceptional Care" : "استشارة مهنية • رعاية استثنائية"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Contact Form (Glass Card) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white/40 backdrop-blur-2xl border border-white rounded-[3.5rem] p-10 md:p-16 shadow-2xl shadow-[#E91E63]/5"
            >
              <div className="flex items-center gap-3 mb-10">
                <Sparkles className="text-[#E91E63] w-5 h-5" />
                <h2 className="text-2xl font-serif font-bold italic">{language === 'en' ? "Send a Message" : "أرسلي رسالة"}</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Input
                      {...register("name", { required: true })}
                      placeholder={language === 'en' ? "Your Full Name" : "الاسم الكامل"}
                      className="h-14 bg-transparent border-0 border-b border-black/10 focus-visible:ring-0 focus-visible:border-[#E91E63] transition-all rounded-none px-0 text-lg placeholder:text-black/20"
                    />
                    {errors.name && <span className="text-[#E91E63] text-[10px] uppercase font-bold tracking-widest">Required</span>}
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      {...register("email", { required: true })}
                      placeholder={language === 'en' ? "Email Address" : "البريد الإلكتروني"}
                      className="h-14 bg-transparent border-0 border-b border-black/10 focus-visible:ring-0 focus-visible:border-[#E91E63] transition-all rounded-none px-0 text-lg placeholder:text-black/20"
                    />
                  </div>
                </div>

                <Input
                  {...register("phone")}
                  placeholder={language === 'en' ? "Phone Number" : "رقم الهاتف"}
                  className="h-14 bg-transparent border-0 border-b border-black/10 focus-visible:ring-0 focus-visible:border-[#E91E63] transition-all rounded-none px-0 text-lg placeholder:text-black/20"
                />

                <Textarea
                  {...register("message", { required: true })}
                  placeholder={language === 'en' ? "How can we help you blossom?" : "كيف يمكننا مساعدتكِ على التفتح؟"}
                  className="min-h-[150px] bg-transparent border-0 border-b border-black/10 focus-visible:ring-0 focus-visible:border-[#E91E63] transition-all rounded-none px-0 text-lg placeholder:text-black/20 resize-none"
                />

                <Button type="submit" className="w-full h-16 rounded-full bg-black text-white hover:bg-[#E91E63] transition-all duration-500 group overflow-hidden relative shadow-xl active:scale-95">
                  <span className="relative z-10 flex items-center gap-3 uppercase font-bold tracking-[0.3em] text-xs">
                    {language === 'en' ? "Send Correspondence" : "إرسال الرسالة"}
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </form>
            </motion.div>

            {/* Info & Map Column */}
            <div className="lg:col-span-5 space-y-10">
              <div className="grid gap-6">
                {contactDetails.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: language === 'en' ? 10 : -10 }}
                    className="p-8 rounded-[2.5rem] bg-white/60 border border-white shadow-sm flex items-start gap-6 group transition-all"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#E91E63] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#E91E63]/20 group-hover:rotate-12 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-black/40 mb-3">
                        {item.title}
                      </h3>
                      <div className="text-black leading-relaxed">
                        {item.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Showcase */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="rounded-[3.5rem] h-[350px] overflow-hidden relative shadow-2xl border-4 border-white group"
              >
                <div className="absolute inset-0 bg-[#E91E63]/10 z-10 pointer-events-none group-hover:opacity-0 transition-opacity" />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13681.56477817028!2d31.3533!3d31.0409!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDAyJzI3LjIiTiAzMcKwMjEnMTEuOSJF!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="grayscale brightness-110 contrast-75 group-hover:grayscale-0 transition-all duration-1000 scale-110"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="bg-black text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-[#E91E63]" />
                    {language === 'en' ? "Explore Location" : "استكشفي الموقع"}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;