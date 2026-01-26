import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft } from "lucide-react";

const Services = () => {
  const { t, language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const services = [
    {
      title: t.services.plasticSurgery.title,
      description: t.services.plasticSurgery.description,
      href: "/services/plastic-surgery",
      image: "/images/service1.png",
      procedures: language === "en" 
        ? ["Rhinoplasty", "Facelift", "Liposuction", "Breast Surgery", "Tummy Tuck"]
        : ["تجميل الأنف", "شد الوجه", "شفط الدهون", "جراحة الثدي", "شد البطن"],
    },
    {
      title: t.services.dermatology.title,
      description: t.services.dermatology.description,
      href: "/services/dermatology",
      image: "/images/service2.png",
      procedures: language === "en" 
        ? ["Botox & Fillers", "Chemical Peels", "Laser Treatments", "Acne Treatment", "Skin Rejuvenation"]
        : ["البوتوكس والفيلر", "التقشير الكيميائي", "علاجات الليزر", "علاج حب الشباب", "تجديد البشرة"],
    },
    {
      title: t.services.dental.title,
      description: t.services.dental.description,
      href: "/services/dental",
      image: "/images/service3.png",
      procedures: language === "en" 
        ? ["Dental Implants", "Veneers", "Teeth Whitening", "Orthodontics", "Root Canal"]
        : ["زراعة الأسنان", "القشور", "تبييض الأسنان", "تقويم الأسنان", "علاج الجذور"],
    },
    {
      title: t.services.nutrition.title,
      description: t.services.nutrition.description,
      href: "/services/nutrition",
      image: "/images/service4.png",
      procedures: language === "en"
        ? ["Weight Management", "DNA-based Diets", "Body Composition", "Chronic Disease Nutrition"]
        : ["إدارة الوزن", "حميات الحمض النووي", "تحليل تكوين الجسم", "تغذية الأمراض المزمنة"],
    },
    {
      title: t.services.cosmeticGynecology.title,
      description: t.services.cosmeticGynecology.description,
      href: "/services/cosmetic-gynecology",
      image: "/images/service5.png",
      procedures: language === "en" 
        ? ["Laser Rejuvenation", "Aesthetic Reconstruction", "Post-natal Wellness"]
        : ["التجديد بالليزر", "الترميم التجميلي", "العناية بعد الولادة"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              <span className="gold-text">{t.services.title}</span>
            </h1>
            <p className="text-xl text-foreground/60">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - 5 cards with balanced layout */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          {/* First row: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <ServiceCard service={service} ArrowIcon={ArrowIcon} learnMore={t.services.learnMore} />
              </motion.div>
            ))}
          </div>
          
          {/* Second row: 2 centered cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {services.slice(3, 5).map((service, index) => (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index + 3) * 0.15 }}
              >
                <ServiceCard service={service} ArrowIcon={ArrowIcon} learnMore={t.services.learnMore} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    href: string;
    image: string;
    procedures: string[];
  };
  ArrowIcon: React.ComponentType<{ className?: string }>;
  learnMore: string;
}

const ServiceCard = ({ service, ArrowIcon, learnMore }: ServiceCardProps) => (
  <Link
    to={service.href}
    className="group relative block aspect-[3/4] rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/40 transition-all duration-500"
  >
    {/* Background Image */}
    <div className="absolute inset-0">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/50" />

    {/* Content */}
    <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
      {/* Title */}
      <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-3 transition-transform duration-500 group-hover:-translate-y-2">
        {service.title}
      </h2>

      {/* Description */}
      <p className="text-white/80 text-sm lg:text-base mb-4 line-clamp-2">
        {service.description}
      </p>

      {/* Procedure Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {service.procedures.slice(0, 3).map((procedure, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full text-white/70 border border-white/10"
          >
            {procedure}
          </span>
        ))}
        {service.procedures.length > 3 && (
          <span className="px-3 py-1 text-xs bg-primary/20 backdrop-blur-sm rounded-full text-primary border border-primary/20">
            +{service.procedures.length - 3}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2 text-primary opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <span className="text-sm font-medium tracking-wide uppercase">
          {learnMore}
        </span>
        <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </div>
    </div>

    {/* Hover Glow Effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(212,175,55,0.15)]" />
    </div>
  </Link>
);

export default Services;
