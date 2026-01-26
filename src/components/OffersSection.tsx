import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const OffersSection = () => {
  const { t, language } = useLanguage();

  const offers = [
    {
      number: "01",
      title: language === "en" ? "Summer Glow Package" : "باقة توهج الصيف",
      description: language === "en" 
        ? "Complete skin rejuvenation with HydraFacial + LED therapy" 
        : "تجديد البشرة الكامل مع هيدرا فيشل + العلاج بالضوء",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop",
    },
    {
      number: "02",
      title: language === "en" ? "Smile Makeover" : "تجميل الابتسامة",
      description: language === "en" 
        ? "Premium veneers with complimentary whitening treatment" 
        : "قشور الأسنان الفاخرة مع تبييض مجاني",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section className="py-24">
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
            <span className="gold-text">{t.offers.title}</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            {t.offers.subtitle}
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Background Image */}
              <div className="relative h-80 md:h-96">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                {/* Number */}
                <span className="inline-block text-6xl font-serif font-bold text-primary/30 mb-2">
                  {offer.number}
                </span>
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                  {offer.title}
                </h3>
                <p className="text-foreground/60 text-sm">
                  {offer.description}
                </p>
              </div>

              {/* Border on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
