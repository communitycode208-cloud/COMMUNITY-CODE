import { useState } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { apiRequest } from "../../api/api";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const resetToken = searchParams.get("token");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

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

    if (!resetToken) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          resetToken,
          newPassword: form.password,
        }),
      });

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#1761dc] mb-8"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-xl shadow-slate-200/30">
          {!success ? (
            <>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1761dc] flex items-center justify-center mb-7">
                🔒
              </div>

              <h1 className="text-3xl font-extrabold text-[#0b1b3a]">
                Reset your password
              </h1>

              <p className="mt-3 text-slate-500 leading-7">
                Enter your new password below.
              </p>

              {error && (
                <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#0b1b3a] mb-2">
                    New Password
                  </label>

                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      disabled={loading}
                      className="form-input pr-12 disabled:opacity-50"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0b1b3a] mb-2">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="button-primary w-full disabled:opacity-50"
                >
                  {loading ? "Resetting..." : "Reset Password"}

                  {!loading && <ArrowRight size={17} />}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                <CheckCircle2 size={30} />
              </div>

              <h1 className="text-3xl font-extrabold text-[#0b1b3a] mt-7">
                Password reset!
              </h1>

              <p className="mt-4 text-slate-500 leading-7">
                Your password has been successfully changed. You can now log
                in with your new password.
              </p>

              <Link
                to="/login"
                className="button-primary w-full mt-8"
              >
                Go to Login
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}