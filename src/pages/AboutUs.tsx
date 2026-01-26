import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Users, Heart, Globe } from "lucide-react";

const AboutUs = () => {
  const { t, language } = useLanguage();

  const stats = [
    { number: "15+", label: language === "en" ? "Years of Excellence" : "سنوات من التميز" },
    { number: "50+", label: language === "en" ? "Expert Specialists" : "متخصصون خبراء" },
    { number: "10K+", label: language === "en" ? "Happy Patients" : "مريض سعيد" },
    { number: "98%", label: language === "en" ? "Satisfaction Rate" : "معدل الرضا" },
  ];

  const values = [
    {
      icon: Award,
      title: language === "en" ? "Excellence" : "التميز",
      description: language === "en" 
        ? "We pursue the highest standards in medical aesthetics and patient care."
        : "نسعى لأعلى المعايير في التجميل الطبي ورعاية المرضى.",
    },
    {
      icon: Users,
      title: language === "en" ? "Personalization" : "التخصيص",
      description: language === "en" 
        ? "Every treatment plan is tailored to your unique goals and anatomy."
        : "كل خطة علاج مصممة خصيصاً لأهدافك وتشريحك الفريد.",
    },
    {
      icon: Heart,
      title: language === "en" ? "Compassion" : "الرحمة",
      description: language === "en" 
        ? "Your comfort and confidence are at the heart of everything we do."
        : "راحتك وثقتك في قلب كل ما نفعله.",
    },
    {
      icon: Globe,
      title: language === "en" ? "Innovation" : "الابتكار",
      description: language === "en" 
        ? "We embrace cutting-edge technology and techniques from around the world."
        : "نتبنى أحدث التقنيات والتقنيات من جميع أنحاء العالم.",
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
              <span className="gold-text">{t.about.title}</span>
            </h1>
            <p className="text-xl text-foreground/60">
              {t.about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=800&fit=crop"
                alt="Citrine Clinic Interior"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                {language === "en" ? "Our Story" : "قصتنا"}
              </h2>
              <div className="space-y-4 text-foreground/70">
                <p>
                  {language === "en" 
                    ? "Citrine Clinic is a specialized medical center for plastic surgery, dermatology, and dentistry. With branches in Cairo and Mansoura, we aim to provide world-class aesthetic care to the Egyptian community. We combine medical precision with an artistic touch, offering comprehensive solutions for skin, hair, and dental concerns. We believe every case begins with a thorough medical assessment and a personalized treatment plan designed to achieve the best possible results safely."
                    : "عيادة سيترين هي مركز طبي متخصص في جراحات التجميل، الجلدية، وطب الأسنان. من خلال فروعنا في القاهرة والمنصورة، نسعى لتوفير رعاية تجميلية بمواصفات عالمية للمجتمع المصري. نحن نجمع بين الدقة الطبية واللمسة الفنية، ونقدم حلولاً شاملة لمشاكل البشرة والشعر و"
                  }
                </p>
                <p>
                  {language === "en" 
                    ? "Our founders, a team of internationally trained specialists, envisioned a clinic that would set new standards in aesthetic medicine while maintaining the warmth and personalized attention of a boutique practice."
                    : "تصور مؤسسونا، فريق من المتخصصين المدربين دولياً، عيادة تضع معايير جديدة في الطب التجميلي مع الحفاظ على الدفء والاهتمام الشخصي لممارسة فريدة."
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="gold-text">
                {language === "en" ? "Our Values" : "قيمنا"}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="luxury-card p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-serif font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-foreground/60">{value.description}</p>
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
