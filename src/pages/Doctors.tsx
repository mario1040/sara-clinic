import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const Doctors = () => {
  const { t, language } = useLanguage();

  const doctors = [
    {
      name: language === "en" ? "Dr. Nahla Tarek" : "د. نهله طارق",
      specialty: language === "en" ? "Dermatology & Aesthetics" : "جلدية وتجميل",
      credentials: language === "en" ? "MD, Board Certified Specialist" : "دكتوراه في الطب، أخصائية معتمدة",
      bio: language === "en" 
        ? "An expert in medical and aesthetic dermatology, focusing on advanced skin rejuvenation and laser technology."
        : "خبيرة في طب الجلدية والتجميل، تركز على تجديد البشرة المتقدم وأحدث تقنيات الليزر.",
      image: "/images/doctor1.png",
    },
    {
      name: language === "en" ? "Dr. Dalia Ismail" : "د. داليا إسماعيل",
      specialty: language === "en" ? "Dermatology Specialist" : "أخصائية جلدية",
      credentials: language === "en" ? "MSc, Dermatology & Venereology" : "ماجستير الأمراض الجلدية والتناسلية",
      bio: language === "en" 
        ? "Dedicated to treating complex skin conditions and promoting long-term skin health and vitality."
        : "متخصصة في علاج الحالات الجلدية المعقدة وتعزيز صحة البشرة وحيويتها على المدى الطويل.",
      image: "/images/doctor2.png",
    },
    {
      name: language === "en" ? "Dr. Reham Essam" : "د. ريهام عصام",
      specialty: language === "en" ? "Aesthetic Medicine Specialist" : "أخصائية تجميل",
      credentials: language === "en" ? "MD, Aesthetic Procedures" : "أخصائية في الإجراءات التجميلية",
      bio: language === "en" 
        ? "Highly skilled in non-surgical aesthetics, providing artistic precision for facial enhancements."
        : "مهارة عالية في التجميل غير الجراحي، وتقديم دقة فنية لتعزيز جمال الوجه.",
      image: "/images/doctor3.png",
    },
    {
      name: language === "en" ? "Dr. Eman El-Sayed" : "د. إيمان السعيد",
      specialty: language === "en" ? "Dermatology & Aesthetics" : "جلدية وتجميل",
      credentials: language === "en" ? "MD, Dermatology & Laser" : "دكتوراه في الجلدية والليزر",
      bio: language === "en" 
        ? "Combining clinical expertise with cosmetic artistry for natural and effective transformations."
        : "تجمع بين الخبرة الإكلينيكية واللمسة الفنية التجميلية لتحقيق تحولات طبيعية وفعالة.",
      image: "/images/doctor4.png",
    },
    {
      name: language === "en" ? "Dr. Sara Abdullah" : "د. سارة عبد الله",
      specialty: language === "en" ? "Aesthetic Specialist" : "أخصائية تجميل",
      credentials: language === "en" ? "MSc, Medical Aesthetics" : "ماجستير التجميل الطبي",
      bio: language === "en" 
        ? "Specializes in the latest facial rejuvenation techniques and bespoke anti-aging treatments."
        : "متخصصة في أحدث تقنيات تجديد الوجه وعلاجات مكافحة الشيخوخة المصممة خصيصاً.",
      image: "/images/doctor5.png",
    },
    {
      name: language === "en" ? "Dr. Ibrahim Dohina" : "د. إبراهيم دهينة",
      specialty: language === "en" ? "Cosmetic Dentistry" : "طب الأسنان التجميلي",
      credentials: language === "en" ? "DDS, Restorative Dentistry Specialist" : "أخصائي طب الأسنان الترميمي والتجميلي",
      bio: language === "en" 
        ? "Crafting perfect smiles through advanced digital dentistry and high-end restorative techniques."
        : "تصميم ابتسامات مثالية من خلال طب الأسنان الرقمي المتقدم وتقنيات الترميم الفاخرة.",
      image: "/images/doctor8.png",
    },
    {
      name: language === "en" ? "Dr. Mariam Al-Shiway" : "د. مريم الشيوي",
      specialty: language === "en" ? "Cosmetic Dentistry" : "طب الأسنان التجميلي",
      credentials: language === "en" ? "DDS, Restorative Dentistry Specialist" : "أخصائي طب الأسنان الترميمي والتجميلي",
      bio: language === "en" 
        ? "Crafting perfect smiles through advanced digital dentistry and high-end restorative techniques."
        : "تصميم ابتسامات مثالية من خلال طب الأسنان الرقمي المتقدم وتقنيات الترميم الفاخرة.",
      image: "/images/doctor7.png",
    },
    {
      name: language === "en" ? "Dr. Yassmen Nabile" : "د. ياسمين نابيل",
      specialty: language === "en" ? "Cosmetic Dentistry" : "طب الأسنان التجميلي",
      credentials: language === "en" ? "DDS, Restorative Dentistry Specialist" : "أخصائي طب الأسنان الترميمي والتجميلي",
      bio: language === "en" 
        ? "Crafting perfect smiles through advanced digital dentistry and high-end restorative techniques."
        : "تصميم ابتسامات مثالية من خلال طب الأسنان الرقمي المتقدم وتقنيات الترميم الفاخرة.",
      image: "/images/doctor9.png",
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
              <span className="gold-text">{t.doctors.title}</span>
            </h1>
            <p className="text-xl text-foreground/60">
              {t.doctors.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="luxury-card overflow-hidden h-full">
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-1">
                      {doctor.specialty}
                    </p>
                    <p className="text-foreground/50 text-xs mb-3">
                      {doctor.credentials}
                    </p>
                    <p className="text-foreground/60 text-sm leading-relaxed">
                      {doctor.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Doctors;
