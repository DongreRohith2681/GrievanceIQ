import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import AuthLayout from "../layouts/AuthLayout";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    console.log("Login form submitted:", {
      email: formData.email,
    });

    alert("Frontend validation successful!");
  };

  return (
    <AuthLayout>

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-slate-900">
          Welcome Back
        </h2>

        <p className="mt-3 text-slate-500">
          Sign in to continue to your CivicFix account.
        </p>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 focus-within:border-emerald-600">

            <Mail size={19} className="text-slate-400" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-transparent px-3 py-4 text-sm outline-none"
            />

          </div>
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex justify-between">
            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>

            <a
              href="#forgot-password"
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 focus-within:border-emerald-600">

            <Lock size={19} className="text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-transparent px-3 py-4 text-sm outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>

          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">

          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 accent-emerald-700"
          />

          <label
            htmlFor="remember"
            className="text-sm text-slate-600"
          >
            Remember me
          </label>

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-700 py-4 font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800"
        >
          Sign In
        </button>

      </form>

      <p className="mt-8 text-center text-sm text-slate-600">

        Don't have an account?

        <Link
          to="/register"
          className="ml-1 font-semibold text-emerald-700 hover:underline"
        >
          Create Account
        </Link>

      </p>

    </AuthLayout>
  );
}

export default Login;