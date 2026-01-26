import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { XCircle, Home, RefreshCw, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PaymentFailed = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto text-center"
          >
            {/* Failed Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-destructive/20 flex items-center justify-center"
            >
              <XCircle className="w-14 h-14 text-destructive" />
            </motion.div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-destructive">
              {language === 'ar' ? 'فشل الدفع' : 'Payment Failed'}
            </h1>

            {/* Description */}
            <p className="text-foreground/70 mb-8">
              {language === 'ar' 
                ? 'عذراً، لم نتمكن من إتمام عملية الدفع. يرجى المحاولة مرة أخرى أو التواصل معنا للمساعدة.'
                : 'Sorry, we could not complete your payment. Please try again or contact us for assistance.'}
            </p>

            {/* Error Details */}
            {(orderId || error) && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-8 text-left">
                {orderId && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'رقم الطلب: ' : 'Order ID: '}
                    </span>
                    <span className="font-mono text-foreground">{orderId}</span>
                  </p>
                )}
                {error && (
                  <p className="text-sm mt-1">
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'السبب: ' : 'Reason: '}
                    </span>
                    <span className="text-destructive">{error}</span>
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="luxury-button">
                <Link to="/services">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'حاول مرة أخرى' : 'Try Again'}
                </Link>
              </Button>
              <Button asChild variant="outline" className="luxury-button-outline">
                <Link to="/contact-us">
                  <Phone className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </Button>
            </div>

            {/* Home Link */}
            <div className="mt-6">
              <Link 
                to="/" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <Home className="w-3 h-3" />
                {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentFailed;
