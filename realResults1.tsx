import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight, Sparkles, User, Smile, Syringe, Eraser, Scissors, Activity, ChevronDown } from "lucide-react";

// 1. تعريف شكل البيانات الجديد
interface Case {
  before: string;
  after: string;
}

interface Service {
  id: string;
  labelEn: string;
  labelAr: string;
  case: Case;
}

interface Specialty {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: React.ReactNode;
  services: Service[]; // هنا التغيير: قائمة خدمات بدل مصفوفة صور بس
}

// 2. إدخال البيانات (تم تقسيم الحالات كخدمات فرعية)
const specialties: Specialty[] = [
  {
    id: "hair-transplant",
    labelEn: "Hair Transplant",
    labelAr: "زراعة شعر",
    icon: <User className="w-5 h-5" />,
    services: [
      { id: "hair1", labelEn: "Frontal Area", labelAr: "مقدمة الرأس", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } },
      { id: "hair2", labelEn: "Crown Area", labelAr: "منطقة التاج", case: { before: "/images/image (37).png", after: "/images/imageca3.png" } },
      { id: "hair3", labelEn: "Density", labelAr: "تكثيف الشعر", case: { before: "/images/image (38).png", after: "/images/imageca4.png" } }
    ]
  },
  {
    id: "lip-filler",
    labelEn: "Lip Filler",
    labelAr: "فيلر الشفايف",
    icon: <Smile className="w-5 h-5" />,
    services: [
      { id: "lip1", labelEn: "Russian Lips", labelAr: "الشفاه الروسية", case: { before: "/images/imagecb5.png", after: "/images/imageca5.png" } },
      { id: "lip2", labelEn: "Natural Volume", labelAr: "فوليوم طبيعي", case: { before: "/images/imagecb6.png", after: "/images/imageca6.png" } },
      { id: "lip3", labelEn: "Contour", labelAr: "كونتور الشفاه", case: { before: "/images/imagecb8.png", after: "/images/imageca8.png" } },
      { id: "lip4", labelEn: "Hydration", labelAr: "ترطيب وتوريد", case: { before: "/images/imagecb1.png", after: "/images/imageca1.png" } }, // صور افتراضية
      { id: "lip5", labelEn: "Correction", labelAr: "تصحيح الفيلر", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } }  // صور افتراضية
    ]
  },
  {
    id: "peeling",
    labelEn: "Peeling",
    labelAr: "تقشير",
    icon: <Eraser className="w-5 h-5" />,
    services: [
      { id: "peel1", labelEn: "Cold Peel", labelAr: "التقشير البارد", case: { before: "/images/imagecb1.png", after: "/images/imageca1.png" } },
      { id: "peel2", labelEn: "Chemical Peel", labelAr: "التقشير الكيميائي", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } }
    ]
  },
  {
    id: "rhinoplasty",
    labelEn: "Surgical Rhinoplasty",
    labelAr: "تجميل الأنف الجراحي",
    icon: <Scissors className="w-5 h-5" />,
    services: [
      { id: "rhino1", labelEn: "Case 1", labelAr: "حالة ١", case: { before: "/images/imagecb10.png", after: "/images/imageca10.png" } },
      { id: "rhino2", labelEn: "Case 2", labelAr: "حالة ٢", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } }
    ]
  },
  {
    id: "marionette",
    labelEn: "Marionette Lines",
    labelAr: "فيلر خطوط الحزن",
    icon: <Syringe className="w-5 h-5" />,
    services: [
      { id: "mar1", labelEn: "Deep Lines", labelAr: "خطوط عميقة", case: { before: "/images/imagecb9.png", after: "/images/imageca9.png" } },
      { id: "mar2", labelEn: "Moderate", labelAr: "خطوط متوسطة", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } }
    ]
  },
  {
    id: "baldness",
    labelEn: "Hereditary Baldness",
    labelAr: "صلع وراثي",
    icon: <Sparkles className="w-5 h-5" />,
    services: [
      { id: "bald1", labelEn: "Case 1", labelAr: "حالة ١", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } },
      { id: "bald2", labelEn: "Case 2", labelAr: "حالة ٢", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } }
    ]
  },
  {
    id: "dermatology",
    labelEn: "Dermatology",
    labelAr: "الجلدية",
    icon: <Activity className="w-5 h-5" />,
    services: [
      { id: "derm1", labelEn: "Acne Scars", labelAr: "ندبات حب الشباب", case: { before: "/images/imagecb7.png", after: "/images/imageca7.png" } },
      { id: "derm2", labelEn: "Pigmentation", labelAr: "تصبغات", case: { before: "/images/imagecb2.png", after: "/images/imageca2.png" } }
    ]
  },
];

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  language: string;
}

const BeforeAfterSlider = ({ beforeImage, afterImage, language }: BeforeAfterSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const sliderX = useMotionValue(0);
  
  const clipWidth = useTransform(sliderX, (x) => {
    if (containerWidth === 0) return 50;
    return ((x + containerWidth / 2) / containerWidth) * 100;
  });

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    sliderX.set(0);
  }, [containerWidth, sliderX, beforeImage]); 

  const dragConstraints = containerWidth > 0 
    ? { left: -containerWidth / 2, right: containerWidth / 2 }
    : { left: 0, right: 0 };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[4/3] overflow-hidden cursor-ew-resize select-none"
    >
      <div className="absolute inset-0">
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
        <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-widest shadow-lg z-10">
          {language === "en" ? "Before" : "قبل"}
        </span>
      </div>

      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ 
          clipPath: useTransform(clipWidth, (w) => `inset(0 0 0 ${w}%)`)
        }}
      >
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
        <span className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-widest shadow-lg z-10">
          {language === "en" ? "After" : "بعد"}
        </span>
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0}
        dragMomentum={false}
        style={{ x: sliderX }}
        className="absolute top-0 bottom-0 left-1/2 z-20 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
      >
        <div className="absolute inset-y-0 w-0.5 bg-primary shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
        <div className="relative w-12 h-12 rounded-full bg-white shadow-xl border-2 border-primary flex items-center justify-center">
          <div className="flex items-center gap-0.5">
            <ChevronLeft className="w-4 h-4 text-primary" />
            <ChevronRight className="w-4 h-4 text-primary" />
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white/80 text-xs px-3 py-1.5 rounded-full pointer-events-none">
        {language === "en" ? "Drag to compare" : "اسحب للمقارنة"}
      </div>
    </div>
  );
};

const RealResults = () => {
  const { language, isRTL } = useLanguage();
  
  // State for selected Specialty (Expand/Collapse logic)
  const [expandedSpecialtyId, setExpandedSpecialtyId] = useState<string>(specialties[0].id);
  
  // State for active Service (The case being displayed)
  const [activeService, setActiveService] = useState<Service>(specialties[0].services[0]);

  const handleSpecialtyClick = (specialty: Specialty) => {
    // If clicking same specialty, keep open. If different, open new one.
    if (expandedSpecialtyId !== specialty.id) {
        setExpandedSpecialtyId(specialty.id);
        // Automatically select the first service when opening a specialty
        setActiveService(specialty.services[0]);
    }
  };

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            {language === "en" ? "Real Results" : "نتائج حقيقية"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "See the transformations our specialists have achieved for our patients"
              : "شاهد التحولات التي حققها متخصصونا لمرضانا"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Slider Display (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl border border-border/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <BeforeAfterSlider
                    beforeImage={activeService.case.before}
                    afterImage={activeService.case.after}
                    language={language}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Title Under Slider */}
            <div className="text-center mt-4">
                 <h3 className="text-xl font-serif text-primary font-bold">
                    {language === "en" ? activeService.labelEn : activeService.labelAr}
                 </h3>
            </div>
          </motion.div>

          {/* Right: Specialties Accordion List (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-3"
          >
            {specialties.map((specialty) => {
                const isExpanded = expandedSpecialtyId === specialty.id;
                
                return (
                    <div key={specialty.id} className="bg-background rounded-lg border border-border overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                        {/* Main Category Button */}
                        <button
                            onClick={() => handleSpecialtyClick(specialty)}
                            className={`w-full flex items-center justify-between p-4 transition-colors ${
                                isExpanded 
                                ? "bg-navy-dark text-primary" 
                                : "hover:bg-muted"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-md ${isExpanded ? "bg-primary/20" : "bg-muted"}`}>
                                    {specialty.icon}
                                </div>
                                <span className="font-semibold text-lg">
                                    {language === "en" ? specialty.labelEn : specialty.labelAr}
                                </span>
                            </div>
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                        </button>

                        {/* Sub Services List (Accordion Content) */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden bg-muted/30"
                                >
                                    <div className="p-2 flex flex-col gap-1">
                                        {specialty.services.map((service) => (
                                            <button
                                                key={service.id}
                                                onClick={() => setActiveService(service)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base w-full text-start ${
                                                    activeService.id === service.id
                                                    ? "bg-primary text-primary-foreground font-medium shadow-sm"
                                                    : "hover:bg-background text-foreground/80"
                                                }`}
                                            >
                                                <span className={`w-2 h-2 rounded-full ${activeService.id === service.id ? "bg-white" : "bg-primary"}`} />
                                                {language === "en" ? service.labelEn : service.labelAr}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default RealResults;