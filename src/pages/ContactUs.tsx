import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
    toast.success(language === "en" ? "Message sent successfully!" : "تم إرسال الرسالة بنجاح!");
    reset();
  };

  // بيانات الاتصال الحقيقية مع الترجمة
  const contactInfo = [
    {
      icon: MapPin,
      title: language === "en" ? "Visit Us" : "زورونا",
      content: (
        <div className="flex flex-col gap-3">
          <div>
            <span className="font-bold text-primary block mb-1">
              {language === "en" ? "Mansoura Branch:" : "فرع المنصورة:"}
            </span>
            <span>
              {language === "en" 
                ? "University District, in front of Toshka Gate, 2nd floor above Sbertaya Cafe" 
                : "حي الجامعة، أمام بوابة توشكا، الدور الثاني علوي فوق كافيه سبرتايه"}
            </span>
          </div>
          <div>
            <span className="font-bold text-primary block mb-1">
              {language === "en" ? "Cairo Branch:" : "فرع القاهرة:"}
            </span>
            <span>
              {language === "en"
                ? "88 Joseph Tito, El Haikstep, El Nozha"
                : "٨٨ جوزيف تيتو، الهايكستب، النزهة"}
            </span>
          </div>
        </div>
      ),
    },
    {
      icon: Phone,
      title: language === "en" ? "Call Us" : "اتصل بنا",
      content: (
        <div className="flex flex-col gap-1" dir="ltr">
          <div className={`flex items-center gap-2 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
            {/* خليت أرقام التليفون العادية تفتح الاتصال برضه */}
            <a href="tel:01019761776" className="hover:text-primary transition-colors">01019761776</a>
            <span>-</span>
            <a href="tel:01150883939" className="hover:text-primary transition-colors">01150883939</a>
          </div>
          
          {/* 👇 هنا التعديل: خليت الواتساب لينك */}
          <a 
            href="https://wa.me/201150883939"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors ${language === 'ar' ? 'justify-end' : 'justify-start'}`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp: 01150883939</span>
          </a>
        </div>
      ),
    },
    {
      icon: Mail,
      title: language === "en" ? "Email Us" : "راسلنا",
      content: "info@citrineclinic.com",
    },
    {
      icon: Clock,
      title: language === "en" ? "Working Hours" : "ساعات العمل",
      content: language === "en" ? "Sun - Thu: 9AM - 8PM" : "الأحد - الخميس: 9 ص - 8 م",
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
              <span className="gold-text">{t.contact.title}</span>
            </h1>
            <p className="text-xl text-foreground/60">
              {t.contact.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="luxury-card p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.form.name}
                    </label>
                    <Input
                      {...register("name", { required: true })}
                      className="bg-input border-border focus:border-primary"
                      placeholder={t.contact.form.name}
                    />
                    {errors.name && (
                      <span className="text-destructive text-sm mt-1">
                        {language === "en" ? "Required" : "مطلوب"}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.form.email}
                    </label>
                    <Input
                      type="email"
                      {...register("email", { required: true })}
                      className="bg-input border-border focus:border-primary"
                      placeholder={t.contact.form.email}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.form.phone}
                    </label>
                    <Input
                      {...register("phone")}
                      className="bg-input border-border focus:border-primary"
                      placeholder={t.contact.form.phone}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.form.message}
                    </label>
                    <Textarea
                      {...register("message", { required: true })}
                      rows={5}
                      className="bg-input border-border focus:border-primary resize-none"
                      placeholder={t.contact.form.message}
                    />
                  </div>

                  <Button type="submit" className="w-full luxury-button">
                    {t.contact.form.submit}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="luxury-card p-6 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <div className="text-foreground/60 text-sm leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}

              {/* Map Placeholder */}
              <div className="luxury-card h-64 overflow-hidden relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d854.648208092353!2d31.355781841912716!3d31.037591934035294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79dbb7fc9f771%3A0x935974bfada068f9!2sCitrine%20Clinic%20-%20Mansoura%20Branch!5e0!3m2!1sen!2seg!4v1768313146397!5m2!1sen!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;