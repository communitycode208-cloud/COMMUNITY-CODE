import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        username: form.username.trim(),
        phone: form.phone.trim(),
        password: form.password,
        language: "en",
      });

      navigate("/login", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.message || "Failed to create account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="w-11 h-11 rounded-xl bg-[#0b1b3a] flex items-center justify-center text-white font-bold">
            {"</>"}
          </div>

          <span className="font-extrabold text-[#0b1b3a] text-lg">
            Community{" "}
            <span className="text-[#1761dc]">
              Code
            </span>
          </span>
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 p-7 md:p-10 shadow-xl shadow-slate-200/30">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1761dc]">
              Join Community Code
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b1b3a] mt-3">
              Create your account.
            </h1>

            <p className="text-slate-500 mt-3">
              Start building your learning journey.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#0b1b3a]">
                Full Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ahmed Mohamed"
                required
                disabled={loading}
                className="form-input disabled:opacity-50"
              />
            </div>

            {/* Email + Username */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#0b1b3a]">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="form-input disabled:opacity-50"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#0b1b3a]">
                  Username
                </label>

                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="ahmed123"
                  required
                  disabled={loading}
                  className="form-input disabled:opacity-50"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#0b1b3a]">
                Phone
              </label>

              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+201000000000"
                required
                disabled={loading}
                className="form-input disabled:opacity-50"
              />

              <p className="text-xs text-slate-400 mt-2">
                Enter your phone number with country code.
              </p>
            </div>

            {/* Password + Confirm Password */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#0b1b3a]">
                  Password
                </label>

                <div className="relative">
                  <input
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    disabled={loading}
                    className="form-input pr-12 disabled:opacity-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#0b1b3a]">
                  Confirm Password
                </label>

                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  className="form-input disabled:opacity-50"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="button-primary w-full disabled:opacity-50"
            >
              {loading
                ? "Creating account..."
                : "Create Account"}

              {!loading && (
                <ArrowRight size={17} />
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-500 mt-7">
            Already have an account?{" "}

            <Link
              to="/login"
              className="font-bold text-[#1761dc]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}