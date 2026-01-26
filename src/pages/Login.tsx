import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { t, language } = useLanguage();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    toast.success(language === "en" ? "Login successful!" : "تم تسجيل الدخول بنجاح!");
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
              {t.auth.loginTitle}
            </h1>
            <p className="text-foreground/60 text-sm">
              {t.auth.loginSubtitle}
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
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">
                  {t.auth.password}
                </label>
                <Link to="#" className="text-sm text-primary hover:underline">
                  {t.auth.forgotPassword}
                </Link>
              </div>
              <Input
                type="password"
                {...register("password", { required: true })}
                className="bg-input border-border focus:border-primary"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full luxury-button">
              {t.nav.login}
            </Button>
          </form>

          <p className="text-center text-sm text-foreground/60 mt-6">
            {t.auth.noAccount}{" "}
            <Link to="/signup" className="text-primary hover:underline">
              {t.auth.signupLink}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
