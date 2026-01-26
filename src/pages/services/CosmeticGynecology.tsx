import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft } from "lucide-react";
import ServiceCard from "@/components/services/ServiceCard";

const CosmeticGynecology = () => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const procedures = [
    {
      name: language === "en" ? "Cosmetic Gynecology Consultation" : "استشارة التجميل النسائي",
      description: language === "en" 
        ? "Non-invasive laser treatments for intimate wellness, promoting tissue regeneration and restoring natural vitality with minimal downtime."
        : "علاجات ليزر غير جراحية للعناية الحميمة، تعزز تجديد الأنسجة واستعادة الحيوية الطبيعية مع فترة تعافي قصيرة.",
      image: "/images/Cosmetic Gynecology Consultation.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      name: language === "en" ? "Plasma Bikini " : "بكيني البلازما",
      description: language === "en" 
        ? "Advanced reconstructive procedures performed by specialized surgeons, combining medical expertise with aesthetic precision for optimal results."
        : "إجراءات ترميمية متقدمة يجريها جراحون متخصصون، تجمع بين الخبرة الطبية والدقة الجمالية لنتائج مثالية.",
      image: "/images/bikini.gif",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      name: language === "en" ? "Cutting blades" : " قص الشفرات ",
      description: language === "en" 
        ? "Comprehensive post-pregnancy restoration programs designed to help new mothers regain confidence and comfort in their bodies."
        : "برامج استعادة شاملة بعد الحمل مصممة لمساعدة الأمهات الجدد على استعادة الثقة والراحة في أجسادهن.",
      image: "/images/protect.gif",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      name: language === "en" ? "Vaginal cleaning " : " تنظيف المهبل ",
      description: language === "en" 
        ? "Comprehensive post-pregnancy restoration programs designed to help new mothers regain confidence and comfort in their bodies."
        : "برامج استعادة شاملة بعد الحمل مصممة لمساعدة الأمهات الجدد على استعادة الثقة والراحة في أجسادهن.",
      image: "/images/Vaginal cleaning.gif",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
                {language === "en" ? "Cosmetic Gynecology" : "التجميل النسائي"}
              </span>
            </h1>
            <p className="text-xl text-foreground/60 leading-relaxed">
              {language === "en" 
                ? "Experience discreet, world-class feminine wellness treatments in a private, luxurious environment. Our specialized team delivers personalized care with the utmost professionalism and compassion."
                : "اختبري علاجات العناية النسائية العالمية في بيئة خاصة وفاخرة. يقدم فريقنا المتخصص رعاية شخصية بأقصى درجات الاحترافية والتعاطف."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                {language === "en" ? "Private Consultation" : "استشارة خاصة"}
              </span>
            </h2>
            <p className="text-foreground/60 mb-8">
              {language === "en" 
                ? "Schedule a confidential consultation with our female specialists in a comfortable, private setting."
                : "حددي موعداً لاستشارة سرية مع أخصائياتنا في بيئة مريحة وخاصة."}
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

export default CosmeticGynecology;
