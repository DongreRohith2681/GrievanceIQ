import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import AuthLayout from "../layouts/AuthLayout";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "citizen",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }

    if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[^A-Za-z0-9\s]/.test(formData.password)
    ) {
      newErrors.password =
        "Use at least 8 characters, including one uppercase letter and one special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "Please accept the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Registration data:", {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
    });

    alert("Registration form validated successfully!");
  };

  const inputClass =
    "w-full bg-transparent px-3 py-3.5 text-sm outline-none";

  const iconClass = "shrink-0 text-slate-400";

  return (
    <AuthLayout>
      <div className="mb-7">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <ShieldCheck size={15} />
          Join the CivicFix Community
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Create Account
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Join us in building cleaner, safer and smarter communities.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name
          </label>

          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 focus-within:border-emerald-600">
            <User size={18} className={iconClass} />

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={inputClass}
            />
          </div>

          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 focus-within:border-emerald-600">
            <Mail size={18} className={iconClass} />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Mobile Number
          </label>

          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 focus-within:border-emerald-600">
            <Phone size={18} className={iconClass} />

            <span className="border-r border-slate-200 pr-3 text-sm text-slate-500">
              +91
            </span>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength={10}
              className={inputClass}
            />
          </div>

          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Role Selection */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Account Type
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-emerald-600 bg-emerald-50 p-3">
              <input
                type="radio"
                name="role"
                value="citizen"
                checked={formData.role === "citizen"}
                onChange={handleChange}
                className="accent-emerald-700"
              />

              <span className="text-sm font-semibold text-emerald-800">
                Citizen
              </span>
            </label>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-slate-500" />

                <span className="text-sm font-semibold text-slate-700">
                  Officer
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Admin approval required
              </p>
            </div>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>

          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 focus-within:border-emerald-600">
            <Lock size={18} className={iconClass} />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className={inputClass}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-slate-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password}
            </p>
          )}
          <p className="mt-1 text-xs text-slate-500">
            At least 8 characters, one uppercase letter, and one special character.
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Confirm Password
          </label>

          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 focus-within:border-emerald-600">
            <Lock size={18} className={iconClass} />

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className={inputClass}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="text-slate-400"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms */}
        <div>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mt-1 accent-emerald-700"
            />

            <span>
              I agree to the Terms of Service and Privacy Policy.
            </span>
          </label>

          {errors.termsAccepted && (
            <p className="mt-1 text-xs text-red-600">
              {errors.termsAccepted}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-4 font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800 cursor-pointer"
        >
          <CheckCircle2 size={19} />
          Create Account
        </button>

      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?

        <Link
          to="/login"
          className="ml-1 font-semibold text-emerald-700 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
