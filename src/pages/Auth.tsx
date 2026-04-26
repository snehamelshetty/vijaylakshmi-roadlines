import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Lock, Mail, User, Phone, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotMethod, setForgotMethod] = useState<"email" | "sms">("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(t("auth_login_success"));
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", signInData.user.id)
          .eq("role", "admin")
          .maybeSingle();
        navigate(roleData ? "/admin" : "/dashboard");
      } else {
        if (!phone) {
          toast.error("Please enter your phone number");
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, phone },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success(t("auth_signup_success"));
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    try {
      if (forgotMethod === "email") {
        if (!forgotEmail) throw new Error("Please enter your email");
        const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Password reset link sent! Check your email.");
        setForgotOpen(false);
        setForgotEmail("");
      } else {
        if (!forgotPhone) throw new Error("Please enter your phone number");
        const { error } = await supabase.auth.signInWithOtp({ phone: forgotPhone });
        if (error) throw error;
        setOtpSent(true);
        toast.success("OTP sent to your phone");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setForgotLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || newPassword.length < 6) {
      toast.error("Enter the OTP and a new password (min 6 chars)");
      return;
    }
    setForgotLoading(true);
    try {
      const { error: vErr } = await supabase.auth.verifyOtp({
        phone: forgotPhone,
        token: otpCode,
        type: "sms",
      });
      if (vErr) throw vErr;
      const { error: uErr } = await supabase.auth.updateUser({ password: newPassword });
      if (uErr) throw uErr;
      toast.success("Password updated! You're signed in.");
      setForgotOpen(false);
      setOtpSent(false);
      setOtpCode("");
      setNewPassword("");
      setForgotPhone("");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setForgotLoading(false);
    }
  };


  return (
    <Layout>
      <section className="gradient-secondary section-padding">
        <div className="container mx-auto text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4"
          >
            {isLogin ? t("auth_login") : t("auth_signup")}
          </motion.h1>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto text-lg">
            {t("auth_subtitle")}
          </p>
        </div>
      </section>

      <section className="section-padding container mx-auto max-w-md">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-xl p-8 card-shadow border border-border"
        >
          <div className="space-y-5">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    <User className="w-4 h-4 inline mr-1" />
                    {t("full_name")}
                  </Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("full_name")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="w-4 h-4 inline mr-1" />
                    {t("phone")}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="w-4 h-4 inline mr-1" />
                {t("email")}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                <Lock className="w-4 h-4 inline mr-1" />
                {t("auth_password")}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setForgotOpen(true);
                    }}
                    className="text-xs text-secondary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </div>
            <Button type="submit" variant="blue" className="w-full" disabled={loading}>
              {loading ? t("auth_loading") : isLogin ? t("auth_login") : t("auth_signup")}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-secondary hover:underline"
            >
              {isLogin ? t("auth_no_account") : t("auth_have_account")}
            </button>
          </div>
        </motion.form>
      </section>

      <Dialog open={forgotOpen} onOpenChange={(o) => { setForgotOpen(o); if (!o) { setOtpSent(false); setOtpCode(""); setNewPassword(""); } }}>
        <DialogContent>
          {!otpSent ? (
            <form onSubmit={handleForgot}>
              <DialogHeader>
                <DialogTitle>Reset your password</DialogTitle>
                <DialogDescription>
                  Choose how you'd like to receive your reset code.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex gap-2">
                  <Button type="button" variant={forgotMethod === "email" ? "blue" : "outline"} size="sm" onClick={() => setForgotMethod("email")} className="flex-1">
                    <Mail className="w-4 h-4 mr-1" /> Email link
                  </Button>
                  <Button type="button" variant={forgotMethod === "sms" ? "blue" : "outline"} size="sm" onClick={() => setForgotMethod("sms")} className="flex-1">
                    <Phone className="w-4 h-4 mr-1" /> SMS OTP
                  </Button>
                </div>
                {forgotMethod === "email" ? (
                  <div className="space-y-2">
                    <Label htmlFor="forgotEmail"><Mail className="w-4 h-4 inline mr-1" />Email</Label>
                    <Input id="forgotEmail" type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="you@example.com" required />
                    <p className="text-xs text-muted-foreground">We'll email a secure reset link to your account.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="forgotPhone"><Phone className="w-4 h-4 inline mr-1" />Phone</Label>
                    <Input id="forgotPhone" type="tel" value={forgotPhone} onChange={(e) => setForgotPhone(e.target.value)} placeholder="+91 98765 43210" required />
                    <p className="text-xs text-muted-foreground">We'll text a 6-digit OTP to your verified phone number.</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setForgotOpen(false)}>Cancel</Button>
                <Button type="submit" variant="blue" disabled={forgotLoading}>
                  {forgotLoading ? "Sending..." : forgotMethod === "email" ? "Send reset link" : "Send OTP"}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <DialogHeader>
                <DialogTitle>Enter OTP & new password</DialogTitle>
                <DialogDescription>Enter the 6-digit code sent to {forgotPhone} and choose a new password.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP code</Label>
                  <Input id="otp" inputMode="numeric" maxLength={6} value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="123456" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPwd">New password</Label>
                  <Input id="newPwd" type="password" minLength={6} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" required />
                </div>
                <button type="button" onClick={handleForgot as any} className="text-xs text-secondary hover:underline">
                  Didn't get it? Resend OTP
                </button>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => { setOtpSent(false); setOtpCode(""); setNewPassword(""); }}>Back</Button>
                <Button type="submit" variant="blue" disabled={forgotLoading}>
                  {forgotLoading ? "Verifying..." : "Verify & update password"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Auth;
