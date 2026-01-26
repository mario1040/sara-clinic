import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft } from "lucide-react";
import ServiceCard from "@/components/services/ServiceCard";

const Nutrition = () => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const procedures = [
    {
      name: language === "en" ? "Clinical Nutrition Consultant" : "استشاري تغذية علاجية",
      description: language === "en" 
        ? "Personalized weight loss and maintenance programs combining nutrition science with behavioral coaching for sustainable results."
        : "برامج مخصصة لفقدان الوزن والحفاظ عليه تجمع بين علم التغذية والتدريب السلوكي لنتائج مستدامة.",
      image: "/images/clinical nutrition consultant.png",
      videoUrl: "https://youtu.be/UXLG0gJMx8k?si=URbXxGsCMumvYVoi",
    },
    {
      name: language === "en" ? "Clinical Nutrition manjaro" : "التغذية السريرية مانجارو",
      description: language === "en" 
        ? "Revolutionary genetic testing to create your perfect diet plan based on your unique DNA profile and metabolic markers."
        : "اختبارات جينية ثورية لإنشاء خطة النظام الغذائي المثالي بناءً على ملفك الوراثي الفريد ومؤشراتك الأيضية.",
      image: "/images/Clinical Nutrition manjaro.png",
      videoUrl: "https://youtu.be/UXLG0gJMx8k?si=URbXxGsCMumvYVoi",
    },
    {
      name: language === "en" ? "Clinical Nutrition Mezotherapy" : "التغذية السريرية الميزوثيرابي",
      description: language === "en" 
        ? "Advanced InBody scanning technology providing detailed insights into muscle mass, body fat percentage, and metabolic health."
        : "تقنية مسح InBody المتقدمة توفر رؤى تفصيلية حول كتلة العضلات ونسبة الدهون والصحة الأيضية.",
      image: "/images/clinical nutrition mezotherapy.png",
      videoUrl: "https://youtu.be/UXLG0gJMx8k?si=URbXxGsCMumvYVoi",
    },
    {
      name: language === "en" ? "Chronic Disease Nutrition" : "تغذية الأمراض المزمنة",
      description: language === "en" 
        ? "Specialized dietary protocols for managing diabetes, heart disease, autoimmune conditions, and other chronic health challenges."
        : "بروتوكولات غذائية متخصصة لإدارة مرض السكري وأمراض القلب والمناعة الذاتية والتحديات الصحية المزمنة الأخرى.",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=800&auto=format&fit=crop",
      videoUrl: "https://youtu.be/UXLG0gJMx8k?si=URbXxGsCMumvYVoi",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8 group"
          >
            <ArrowIcon className="w-4 h-4 rotate-180 rtl:rotate-0 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            <span>{language === "en" ? "Back to Services" : "العودة للخدمات"}</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              <span className="gold-text">
                {language === "en" ? "Clinical Nutrition" : "التغذية العلاجية"}
              </span>
            </h1>
            <p className="text-xl text-foreground/60 leading-relaxed">
              {language === "en" 
                ? "Transform your health with science-driven nutrition programs. Our certified dietitians combine cutting-edge diagnostics with personalized meal planning to help you achieve lasting wellness."
                : "حوّل صحتك مع برامج التغذية القائمة على العلم. يجمع أخصائيو التغذية المعتمدون لدينا بين التشخيصات المتطورة وتخطيط الوجبات المخصص لمساعدتك على تحقيق العافية الدائمة."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {procedures.map((procedure, index) => (
              <ServiceCard
                key={index}
                title={procedure.name}
                description={procedure.description}
                image={procedure.image}
                videoUrl={procedure.videoUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="luxury-card text-center max-w-2xl mx-auto p-8 lg:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              <span className="gold-text">
                {language === "en" ? "Start Your Wellness Journey" : "ابدأ رحلتك نحو العافية"}
              </span>
            </h2>
            <p className="text-foreground/60 mb-8">
              {language === "en" 
                ? "Book a comprehensive nutrition assessment with our expert dietitians today."
                : "احجز تقييماً شاملاً للتغذية مع أخصائيي التغذية الخبراء لدينا اليوم."}
            </p>
            <Link to="/contact-us" className="luxury-button inline-block">
              {language === "en" ? "Book Consultation" : "احجز استشارة"}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Nutrition;
