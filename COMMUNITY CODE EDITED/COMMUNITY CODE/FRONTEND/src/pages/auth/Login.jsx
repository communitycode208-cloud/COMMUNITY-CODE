import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(identifier.trim(), password);

      const params = new URLSearchParams(location.search);

      const redirectFromQuery = params.get("redirect");

      const destination =
        redirectFromQuery ||
        location.state?.from ||
        "/dashboard";

      navigate(destination, {
        replace: true,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex">
      {/* Left */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#081630] relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 opacity-20 grid-pattern" />

        <div className="absolute w-125 h-125 bg-blue-600/20 rounded-full blur-[120px]" />

        <div className="relative max-w-lg text-white">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 font-bold text-xl mb-8">
            {"</>"}
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            Your learning
            <br />
            journey starts
            <span className="text-blue-400"> here.</span>
          </h1>

          <p className="mt-6 text-white/50 leading-8">
            Access your sessions, track your progress and keep building your
            future with Community Code.
          </p>

          <div className="mt-12 font-mono text-sm text-white/30">
            <span className="text-blue-400">const</span> future ={" "}
            <span className="text-purple-400">build</span>
            ();
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[#0b1b3a] flex items-center justify-center text-white font-bold">
              {"</>"}
            </div>

            <span className="font-extrabold text-[#0b1b3a]">
              Community <span className="text-[#1761dc]">Code</span>
            </span>
          </div>

          <div className="mb-9">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1761dc]">
              Welcome back
            </p>

            <h2 className="text-4xl font-extrabold text-[#0b1b3a] mt-3">
              Login to your account.
            </h2>

            <p className="text-slate-500 mt-3">
              Continue your learning journey.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#0b1b3a] mb-2">
                Email or Username
              </label>

              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full h-14 px-4 rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-[#0b1b3a]">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-[#1761dc]"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-14 px-4 pr-12 rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
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

            <button
              type="submit"
              disabled={loading}
              className="button-primary w-full disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Login"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#1761dc]"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}