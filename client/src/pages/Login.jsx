import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  LoaderCircle,
  Mail,
} from "lucide-react";

import AuthLayout from "../layouts/AuthLayout";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const email = formData.email.trim();

    if (!email) {
      nextErrors.email = "Enter your email address.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password = "Enter your password.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const loginEndpoint = import.meta.env.VITE_LOGIN_ENDPOINT;
    if (!loginEndpoint) {
      toast.error("Email sign-in is not connected to an authentication service yet.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || "Unable to sign in. Check your details and try again.");
      }

      toast.success("Signed in successfully.");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Could not reach the sign-in service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;
    if (!googleAuthUrl) {
      toast.error("Google sign-in needs to be configured with VITE_GOOGLE_AUTH_URL.");
      return;
    }

    window.location.assign(googleAuthUrl);
  };

  const handleForgotPassword = () => {
    toast("Password reset is not configured yet.", { icon: "i" });
  };

  return (
    <AuthLayout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { borderRadius: "12px", fontFamily: "Inter, sans-serif" },
        }}
      />

      <section className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_24px_70px_-32px_rgba(16,44,70,0.35)] backdrop-blur-xl sm:p-9">
        <header className="mb-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#176B4D]">
            CivicFix Citizen Portal
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#102C46]">
            Welcome back
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Sign in to report issues and follow their progress.
          </p>
        </header>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#172B3A] shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D] focus-visible:ring-offset-2 cursor-pointer"
        >
          <svg aria-hidden="true" viewBox="0 0 48 48" className="size-5">
            <path fill="#FFC107" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15Z" />
            <path fill="#4CAF50" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.7-5.1c-1.9 1.3-4.2 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2H5.9v5.2A20 20 0 0 0 24 44Z" />
            <path fill="#1976D2" d="M12.8 27.9a12 12 0 0 1 0-7.8v-5.2H5.9a20 20 0 0 0 0 18.2l6.9-5.2Z" />
            <path fill="#E53935" d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.9 14.9l6.9 5.2c1.6-4.7 6-8.2 11.2-8.2Z" />
          </svg>
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">or sign in with email</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#172B3A]">
              Email address
            </label>
            <div className={`flex min-h-12 items-center rounded-xl border bg-white px-3.5 transition focus-within:ring-2 focus-within:ring-[#176B4D]/15 ${errors.email ? "border-red-400 focus-within:border-red-500" : "border-slate-200 focus-within:border-[#176B4D]"}`}>
              <Mail aria-hidden="true" size={18} className="shrink-0 text-slate-400" />
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="you@example.com"
                className="w-full bg-transparent px-3 py-3 text-sm text-[#172B3A] outline-none placeholder:text-slate-400"
              />
            </div>
            {errors.email && <p id="email-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="password" className="text-sm font-semibold text-[#172B3A]">
                Password
              </label>
              <button type="button" onClick={handleForgotPassword} className="text-xs font-semibold text-[#176B4D] transition-colors hover:text-[#102C46] hover:underline cursor-pointer">
                Forgot password?
              </button>
            </div>
            <div className={`flex min-h-12 items-center rounded-xl border bg-white px-3.5 transition focus-within:ring-2 focus-within:ring-[#176B4D]/15 ${errors.password ? "border-red-400 focus-within:border-red-500" : "border-slate-200 focus-within:border-[#176B4D]"}`}>
              <LockKeyhole aria-hidden="true" size={18} className="shrink-0 text-slate-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
                placeholder="Enter your password"
                className="w-full bg-transparent px-3 py-3 text-sm text-[#172B3A] outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="rounded-md p-1 text-slate-400 transition-colors hover:text-[#102C46] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D]"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p id="password-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">{errors.password}</p>}
          </div>

          <label htmlFor="remember" className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-slate-600">
            <input
              id="remember"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="size-4 rounded border-slate-300 accent-[#176B4D] focus-visible:ring-2 focus-visible:ring-[#176B4D]"
            />
            Keep me signed in
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#176B4D] px-4 py-3 font-semibold text-white shadow-lg shadow-[#176B4D]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#13543d] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
          >
            {isSubmitting ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : <>Sign in <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></>}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          New to CivicFix?
          <Link to="/register" className="ml-1 font-semibold text-[#176B4D] transition-colors hover:text-[#102C46] hover:underline">
            Create an account
          </Link>
        </p>
      </section>
    </AuthLayout>
  );
}

export default Login;
