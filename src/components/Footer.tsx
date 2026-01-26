import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";

// 1. مكون أيقونة تيك توك المخصص
const TiktokIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// 2. مكون أيقونة سناب شات المخصص
const SnapchatIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16.94 11.23a.85.85 0 0 0-.27 1.18c.08.14.22.3.4.45l.03.03c.53.42 1.57 1.05 1.57 2.18 0 .84-.46 1.4-1.22 1.88l-.13.08c-.73.47-1.68 1.08-1.68 2.6v.05c0 .76-.6 1.37-1.38 1.37-.3 0-.6-.08-.85-.24l-.1-.06c-.4-.25-.86-.39-1.31-.39-.45 0-.91.14-1.31.39l-.1.06c-.25.16-.55.24-.85.24-.78 0-1.38-.61-1.38-1.37v-.05c0-1.52-.95-2.13-1.68-2.6l-.13-.08c-.76-.48-1.22-1.04-1.22-1.88 0-1.13 1.04-1.76 1.57-2.18l.03-.03c.18-.15.32-.31.4-.45a.85.85 0 0 0-.27-1.18A4.9 4.9 0 0 1 7.22 6.6c0-2.8 2.05-4.6 4.78-4.6 2.73 0 4.78 1.8 4.78 4.6a4.9 4.9 0 0 1-1.84 4.63Z" />
  </svg>
);

const Footer = () => {
  const { t, language } = useLanguage(); 

  const quickLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about-us", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/doctors", label: t.nav.doctors },
    { href: "/contact-us", label: t.nav.contact },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/citrine_clinic/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/citrineclinic/", label: "Facebook" },
    { icon: TiktokIcon, href: "https://www.tiktok.com/@citrine.clinic7", label: "TikTok" },
    { icon: SnapchatIcon, href: "https://www.snapchat.com/add/citrine_clinic", label: "Snapchat" },
    { icon: Youtube, href: "https://www.youtube.com/@citrineclinic", label: "YouTube" },
  ];

  return (
    <footer className="bg-navy-dark border-t border-border/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-3xl font-serif font-bold text-primary">
                Citrine
              </span>
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">
              {t.footer.contact}
            </h4>
            <ul className="space-y-4">
              {/* العناوين */}
              <li className="flex items-start gap-3 text-foreground/70">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="text-sm space-y-3">
                  {/* فرع المنصورة */}
                  <div>
                    <span className="font-bold text-primary block text-xs mb-1">
                      {language === "en" ? "Mansoura Branch:" : "فرع المنصورة:"}
                    </span>
                    <span className="leading-relaxed">
                      {language === "en" 
                        ? "University District, in front of Toshka Gate, 2nd floor above Sbertaya Cafe" 
                        : "حي الجامعة، أمام بوابة توشكا، الدور الثاني علوي فوق كافيه سبرتايه"}
                    </span>
                  </div>
                  {/* فرع القاهرة */}
                  <div>
                    <span className="font-bold text-primary block text-xs mb-1">
                      {language === "en" ? "Cairo Branch:" : "فرع القاهرة:"}
                    </span>
                    <span className="leading-relaxed">
                      {language === "en"
                        ? "88 Joseph Tito, El Haikstep, El Nozha"
                        : "٨٨ جوزيف تيتو، الهايكستب، النزهة"}
                    </span>
                  </div>
                </div>
              </li>

              {/* أرقام الهاتف */}
              <li className="flex items-start gap-3 text-foreground/70">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="text-sm flex flex-col" dir="ltr">
                  {/* الرقم الأول: اتصال عادي */}
                  <a href="tel:01019761776" className={`${language === 'ar' ? 'text-right' : 'text-left'} hover:text-primary transition-colors`}>
                    01019761776
                  </a>

                  {/* الرقم الثاني: رابط واتساب */}
                  <a 
                    href="https://wa.me/201150883939" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${language === 'ar' ? 'text-right' : 'text-left'} hover:text-green-500 transition-colors font-medium`}
                    title="WhatsApp"
                  >
                    01150883939
                  </a>
                </div>
              </li>

              {/* الإيميل */}
              <li className="flex items-center gap-3 text-foreground/70">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">info@citrineclinic.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">
              {t.footer.social}
            </h4>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/50">
            
            <a 
              href="https://www.facebook.com/tungstenmedianet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-300"
            >
              {t.footer.copyright}
            </a>

            <div className="flex items-center gap-6">
              <Link to="#" className="hover:text-primary transition-colors">
                {t.footer.privacy}
              </Link>
              <Link to="#" className="hover:text-primary transition-colors">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;