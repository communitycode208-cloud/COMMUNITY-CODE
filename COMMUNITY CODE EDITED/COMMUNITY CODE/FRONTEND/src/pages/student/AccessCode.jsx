import { useState } from "react";
import { CheckCircle2, Ticket, ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { apiRequest, getCourseById } from "../../api/api";
import { useEnrollments } from "../../context/EnrollmentContext";

export default function AccessCode() {
  const navigate = useNavigate();
  const { loadEnrollments } = useEnrollments();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess(null);

    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      setError("Please enter an access code.");
      return;
    }

    const token = localStorage.getItem("community_code_token");

    if (!token) {
      navigate(`/login?redirect=/dashboard/access-code`);
      return;
    }

    try {
      setLoading(true);

      const data = await apiRequest("/access-codes/redeem", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: normalizedCode,
        }),
      });

      const enrollment = data.enrollment;

      const courseId =
        typeof enrollment.courseId === "object"
          ? enrollment.courseId._id
          : enrollment.courseId;

      const course = await getCourseById(courseId);

      await loadEnrollments();
      navigate("/dashboard/sessions");
      setSuccess(course);
      setCode("");
    } catch (error) {
      setError(error.message || "Failed to redeem access code.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-[#1761dc] flex items-center justify-center">
          <Ticket size={28} />
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-[#1761dc] mt-7">
          Unlock a session
        </p>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b1b3a] mt-3">
          Have an access code?
        </h1>

        <p className="text-slate-500 mt-3 max-w-lg mx-auto leading-7">
          Enter the code you received after purchasing your session to unlock
          your learning content.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 mt-10">
        {!success ? (
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-bold text-[#0b1b3a] mb-3">
              Access Code
            </label>

            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="CC-XXXX-2026"
              disabled={loading}
              className="w-full h-16 rounded-2xl border border-slate-200 bg-slate-50 px-5 text-lg font-mono font-bold tracking-widest uppercase outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:opacity-60"
            />

            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="button-primary mt-6 w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Unlocking..." : "Unlock Session"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle2 size={30} />
            </div>

            <p className="text-xs uppercase tracking-widest font-bold text-green-600 mt-6">
              Session unlocked
            </p>

            <h2 className="text-2xl font-extrabold text-[#0b1b3a] mt-2">
              {success.title}
            </h2>

            <p className="text-slate-500 mt-3">
              Your session has been added to your account.
            </p>

            <button
              onClick={() => navigate(`/dashboard/sessions/${success._id}`)}
              className="button-primary mt-7"
            >
              Start Learning
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-xs text-slate-400">
        Example code for development:
        <span className="font-mono font-bold text-slate-500 ml-2">
          CC-REACT-2026
        </span>
      </div>
    </div>
  );
}
