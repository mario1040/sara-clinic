import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Home, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    // Log successful payment
    console.log('Payment successful:', { orderId });
  }, [orderId]);

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
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <CheckCircle className="w-14 h-14 text-green-500" />
            </motion.div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="gold-text">
                {language === 'ar' ? 'تم الدفع بنجاح!' : 'Payment Successful!'}
              </span>
            </h1>

            {/* Description */}
            <p className="text-foreground/70 mb-8">
              {language === 'ar' 
                ? 'شكراً لك! تم استلام دفعتك بنجاح. سنتواصل معك قريباً لتأكيد موعدك.'
                : 'Thank you! Your payment has been received successfully. We will contact you shortly to confirm your appointment.'}
            </p>

            {/* Order ID */}
            {orderId && (
              <div className="bg-secondary/50 rounded-lg p-4 mb-8">
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'رقم الطلب' : 'Order ID'}
                </p>
                <p className="font-mono text-lg text-primary font-semibold">
                  {orderId}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="luxury-button">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                </Link>
              </Button>
              <Button asChild variant="outline" className="luxury-button-outline">
                <Link to="/services">
                  <FileText className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'خدماتنا' : 'Our Services'}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
