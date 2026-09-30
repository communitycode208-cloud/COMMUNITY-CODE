import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { apiRequest } from "../../api/api";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [sent, setSent] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [resetToken, setResetToken] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      setResetToken(data.resetToken);
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleResetPassword() {
    navigate(`/reset-password?token=${encodeURIComponent(resetToken)}`);
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
          {!sent ? (
            <>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1761dc] flex items-center justify-center mb-7">
                ?
              </div>

              <h1 className="text-3xl font-extrabold text-[#0b1b3a]">
                Forgot your password?
              </h1>

              <p className="mt-3 text-slate-500 leading-7">
                Enter your email and we'll help you reset your password.
              </p>

              {error && (
                <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8">
                <label className="block text-sm font-semibold text-[#0b1b3a] mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="form-input disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="button-primary mt-5 w-full disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Continue"}

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
                Reset link ready
              </h1>

              <p className="mt-4 text-slate-500 leading-7">
                A password reset token was generated for{" "}
                <strong>{email}</strong>.
              </p>

              <button
                type="button"
                onClick={handleResetPassword}
                className="button-primary mt-8 w-full"
              >
                Reset Password
                <ArrowRight size={17} />
              </button>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 mt-7 font-bold text-[#1761dc]"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}