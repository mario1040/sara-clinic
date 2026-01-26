import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const { t, language } = useLanguage();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();
  const password = watch("password");

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
    toast.success(language === "en" ? "Account created successfully!" : "تم إنشاء الحساب بنجاح!");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="block text-center mb-8">
          <span className="text-4xl font-serif font-bold text-primary">Citrine</span>
        </Link>

        {/* Card */}
        <div className="luxury-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
              {t.auth.signupTitle}
            </h1>
            <p className="text-foreground/60 text-sm">
              {t.auth.signupSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.auth.email}
              </label>
              <Input
                type="email"
                {...register("email", { required: true })}
                className="bg-input border-border focus:border-primary"
                placeholder="email@example.com"
              />
              {errors.email && (
                <span className="text-destructive text-sm mt-1">
                  {language === "en" ? "Required" : "مطلوب"}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.auth.password}
              </label>
              <Input
                type="password"
                {...register("password", { required: true, minLength: 8 })}
                className="bg-input border-border focus:border-primary"
                placeholder="••••••••"
              />
              {errors.password?.type === "minLength" && (
                <span className="text-destructive text-sm mt-1">
                  {language === "en" ? "Minimum 8 characters" : "8 أحرف على الأقل"}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.auth.confirmPassword}
              </label>
              <Input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === password,
                })}
                className="bg-input border-border focus:border-primary"
                placeholder="••••••••"
              />
              {errors.confirmPassword?.type === "validate" && (
                <span className="text-destructive text-sm mt-1">
                  {language === "en" ? "Passwords don't match" : "كلمات المرور غير متطابقة"}
                </span>
              )}
            </div>

            <Button type="submit" className="w-full luxury-button">
              {t.nav.signup}
            </Button>
          </form>

          <p className="text-center text-sm text-foreground/60 mt-6">
            {t.auth.hasAccount}{" "}
            <Link to="/login" className="text-primary hover:underline">
              {t.auth.loginLink}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
