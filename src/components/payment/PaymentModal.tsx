import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet, Lock, Loader2, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { initiatePayment, calculateInstallmentAmount, installmentPlans } from "@/lib/payment";
import { toast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    name: string;
    nameAr?: string;
    price: number;
  };
}

type PaymentTab = 'full' | 'installment';

export function PaymentModal({ isOpen, onClose, service }: PaymentModalProps) {
  const { language, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<PaymentTab>('full');
  const [selectedPlan, setSelectedPlan] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const serviceName = language === 'ar' && service.nameAr ? service.nameAr : service.name;
  const monthlyAmount = calculateInstallmentAmount(service.price, selectedPlan);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const response = await initiatePayment({
        serviceId: service.id,
        serviceName: service.name,
        amount: service.price,
        paymentType: activeTab,
        customerEmail,
        customerPhone,
      });

      if (response.success && response.paymentUrl) {
        toast({
          title: language === 'ar' ? 'جاري التحويل...' : 'Redirecting...',
          description: language === 'ar' 
            ? 'جاري تحويلك لبوابة الدفع الآمنة' 
            : 'Redirecting to secure payment gateway',
        });
        
        // Redirect to payment gateway
        window.location.href = response.paymentUrl;
      } else {
        toast({
          title: language === 'ar' ? 'خطأ' : 'Error',
          description: response.error || (language === 'ar' ? 'فشل بدء عملية الدفع' : 'Failed to initiate payment'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'حدث خطأ. حاول مرة أخرى' : 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b border-border">
            <DialogTitle className="text-2xl font-serif gold-text">
              {language === 'ar' ? 'إتمام الحجز' : 'Complete Booking'}
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 space-y-6">
            {/* Service Summary */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'الخدمة' : 'Service'}
                  </p>
                  <p className="font-semibold text-foreground">{serviceName}</p>
                </div>
                <div className={`text-${isRTL ? 'left' : 'right'}`}>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'الإجمالي' : 'Total'}
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {service.price.toLocaleString()} {language === 'ar' ? 'ج.م' : 'EGP'}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Tabs */}
            <div className="flex gap-2 p-1 bg-secondary/30 rounded-lg">
              <button
                onClick={() => setActiveTab('full')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all ${
                  activeTab === 'full'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="font-medium">
                  {language === 'ar' ? 'دفع كامل' : 'Pay Full'}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('installment')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all ${
                  activeTab === 'installment'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span className="font-medium">
                  {language === 'ar' ? 'تقسيط' : 'Installments'}
                </span>
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'full' ? (
                <motion.div
                  key="full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="text-center py-4">
                    <CreditCard className="w-12 h-12 mx-auto text-primary mb-3" />
                    <p className="text-foreground/70">
                      {language === 'ar' 
                        ? 'ادفع المبلغ كاملاً عبر البطاقة الائتمانية'
                        : 'Pay the full amount via Credit/Debit Card'}
                    </p>
                    <p className="text-3xl font-bold text-primary mt-2">
                      {service.price.toLocaleString()} {language === 'ar' ? 'ج.م' : 'EGP'}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="installment"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Wallet className="w-5 h-5 text-primary" />
                    <p className="text-foreground/70 text-sm">
                      {language === 'ar' 
                        ? 'اختر خطة التقسيط عبر أمان'
                        : 'Choose your AMAN installment plan'}
                    </p>
                  </div>

                  {/* Installment Plans */}
                  <div className="grid grid-cols-3 gap-2">
                    {installmentPlans.map((plan) => (
                      <button
                        key={plan.months}
                        onClick={() => setSelectedPlan(plan.months)}
                        className={`relative p-3 rounded-lg border-2 transition-all ${
                          selectedPlan === plan.months
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {selectedPlan === plan.months && (
                          <Check className="absolute top-1 right-1 w-4 h-4 text-primary" />
                        )}
                        <p className="font-bold text-foreground">
                          {language === 'ar' ? plan.labelAr : plan.label}
                        </p>
                        <p className="text-sm text-primary font-semibold">
                          {calculateInstallmentAmount(service.price, plan.months).toLocaleString()}
                          <span className="text-xs text-muted-foreground">
                            {language === 'ar' ? '/شهر' : '/mo'}
                          </span>
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <p className="text-sm text-foreground/70">
                      {language === 'ar' ? 'القسط الشهري' : 'Monthly Payment'}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {monthlyAmount.toLocaleString()} {language === 'ar' ? 'ج.م/شهر' : 'EGP/month'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === 'ar' 
                        ? `لمدة ${selectedPlan} شهور`
                        : `for ${selectedPlan} months`}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Customer Info */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="email" className="text-foreground/70">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={language === 'ar' ? 'example@email.com' : 'your@email.com'}
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-foreground/70">
                  {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={language === 'ar' ? '01xxxxxxxxx' : '+20 1xx xxx xxxx'}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="bg-secondary/50 border-border"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full luxury-button h-12 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  {language === 'ar' ? 'جاري المعالجة...' : 'Processing...'}
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  {language === 'ar' ? 'المتابعة للدفع الآمن' : 'Proceed to Secure Payment'}
                </>
              )}
            </Button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>
                {language === 'ar' 
                  ? 'مدفوعات آمنة ومشفرة بالكامل'
                  : 'Secure & encrypted payments'}
              </span>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentModal;
