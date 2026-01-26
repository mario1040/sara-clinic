import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft } from "lucide-react";

const ServicesSection = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const services = [
    {
      title: t.services.plasticSurgery.title,
      description: t.services.plasticSurgery.description,
      href: "/services/plastic-surgery",
      image: "/images/service1.png",
    },
    {
      title: t.services.dermatology.title,
      description: t.services.dermatology.description,
      href: "/services/dermatology",
      image: "/images/service2.png",
    },
    {
      title: t.services.dental.title,
      description: t.services.dental.description,
      href: "/services/dental",
      image: "/images/service3.png",
    },
    {
      title: t.services.nutrition.title,
      description: t.services.nutrition.description,
      href: "/services/nutrition",
      image: "/images/service4.png",
    },
    {
      title: t.services.cosmeticGynecology.title,
      description: t.services.cosmeticGynecology.description,
      href: "/services/cosmetic-gynecology",
      image: "/images/service5.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-24 relative bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            <span className="gold-text">{t.services.title}</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid - First row: 3 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8"
        >
          {services.slice(0, 3).map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                to={service.href}
                className="group relative block h-[480px] md:h-[520px] lg:h-[580px] rounded-2xl overflow-hidden border border-transparent hover:border-primary/50 transition-colors duration-500"
              >
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Gradient Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to top, hsl(var(--navy-900)) 0%, hsl(var(--navy-900) / 0.7) 40%, transparent 100%)'
                  }}
                />

                {/* Gold Border Glow Effect */}
                <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/40 transition-all duration-500 group-hover:shadow-[inset_0_0_30px_rgba(212,175,55,0.1)]" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-3 transform transition-transform duration-500 group-hover:-translate-y-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm lg:text-base leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  {/* CTA Button */}
                  <div className="flex items-center gap-2 text-primary/80 group-hover:text-primary transition-colors duration-300">
                    <span className="text-sm font-medium tracking-wide uppercase">
                      {t.services.learnMore}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-primary/30 group-hover:border-primary/60 group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300">
                      <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Second row: 2 centered cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          {services.slice(3, 5).map((service, index) => (
            <motion.div key={index + 3} variants={itemVariants}>
              <Link
                to={service.href}
                className="group relative block h-[480px] md:h-[520px] lg:h-[580px] rounded-2xl overflow-hidden border border-transparent hover:border-primary/50 transition-colors duration-500"
              >
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Gradient Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to top, hsl(var(--navy-900)) 0%, hsl(var(--navy-900) / 0.7) 40%, transparent 100%)'
                  }}
                />

                {/* Gold Border Glow Effect */}
                <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/40 transition-all duration-500 group-hover:shadow-[inset_0_0_30px_rgba(212,175,55,0.1)]" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-3 transform transition-transform duration-500 group-hover:-translate-y-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm lg:text-base leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  {/* CTA Button */}
                  <div className="flex items-center gap-2 text-primary/80 group-hover:text-primary transition-colors duration-300">
                    <span className="text-sm font-medium tracking-wide uppercase">
                      {t.services.learnMore}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-primary/30 group-hover:border-primary/60 group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300">
                      <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
