import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ServiceCard from "@/components/services/ServiceCard";

const PlasticSurgery = () => {
  const { language, isRTL, t } = useLanguage();
  const ArrowBack = isRTL ? ArrowRight : ArrowLeft;

 const procedures = [
    {
      name: language === "en" ? "Skin Care" : "العناية بالبشرة",
      description: language === "en" 
        ? "Advanced facial treatments to restore glow, elasticity, and youthful radiance."
        : "علاجات متقدمة للوجه لاستعادة النضارة، المرونة، والإشراق الشبابي.",
      image: "/public/images/plastic-skin.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      name: language === "en" ? "Hair Restoration" : "علاجات الشعر",
      description: language === "en" 
        ? "Innovative solutions for hair loss and scalp health using modern regeneration techniques."
        : "حلول مبتكرة لتساقط الشعر وصحة فروة الرأس باستخدام تقنيات التجديد الحديثة.",
      image: "/public/images/plastic-hair.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      name: language === "en" ? "Dermatological Conditions" : "الحالات الجلدية",
      description: language === "en" 
        ? "Expert medical care for chronic skin conditions, acne scars, and pigmentation."
        : "رعاية طبية خبيرة للحالات الجلدية المزمنة، آثار حب الشباب، والتصبغات.",
      image: "/public/images/plastic-Dermatological-Conditions.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      name: language === "en" ? "Laser Treatments" : "العلاجات بالليزر",
      description: language === "en" 
        ? "State-of-the-art laser technology for skin resurfacing, hair removal, and vessel treatment."
        : "أحدث تقنيات الليزر لتجديد سطح الجلد، إزالة الشعر، وعلاج الأوعية الدموية.",
      image: "/public/images/plastic-Laser.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowBack className="w-4 h-4" />
            <span>{language === "en" ? "Back to Services" : "العودة للخدمات"}</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              <span className="gold-text">{t.services.plasticSurgery.title}</span>
            </h1>
            <p className="text-xl text-foreground/60">
              {t.services.plasticSurgery.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Cards Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
            {language === "en" ? "Our Procedures" : "إجراءاتنا"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="luxury-card p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              {language === "en" ? "Ready to Transform?" : "مستعد للتحول؟"}
            </h2>
            <p className="text-foreground/60 mb-6 max-w-xl mx-auto">
              {language === "en" 
                ? "Schedule a consultation with our expert surgeons to discuss your goals."
                : "حدد موعداً للاستشارة مع جراحينا الخبراء لمناقشة أهدافك."
              }
            </p>
            <Link to="/contact-us" className="luxury-button inline-block">
              {language === "en" ? "Book Consultation" : "احجز استشارة"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlasticSurgery;
