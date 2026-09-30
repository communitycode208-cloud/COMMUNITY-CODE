import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Lock,
  PlayCircle,
  BookOpen,
  FileText,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { getCourseById, getCourseLessons } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useEnrollments } from "../../context/EnrollmentContext";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { isEnrolled } = useEnrollments();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [actionError, setActionError] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const courseData = await getCourseById(id);
        const lessonsData = await getCourseLessons(id);

        setCourse(courseData);
        setLessons(lessonsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const handleGetSession = () => {
    setActionError("");

    // Not logged in
    if (!user) {
      navigate(`/login?redirect=/courses/${id}`);
      return;
    }

    // Already enrolled
    if (isEnrolled(id)) {
      navigate(`/dashboard/sessions/${id}`);
      return;
    }

    // Not enrolled
    // Go to Access Code page first
    navigate(`/dashboard/access-code?courseId=${id}`);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500">
            Loading session...
          </p>
        </div>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0b1b3a]">
            Session not found
          </h1>

          <p className="mt-3 text-slate-500">
            {error || "This session does not exist."}
          </p>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 mt-5 text-[#1761dc] font-semibold"
          >
            <ArrowLeft size={17} />
            Back to sessions
          </Link>
        </div>
      </main>
    );
  }

  const isArabic = course.language === "ar";
  const language = isArabic ? "Arabic" : "English";

  return (
    <main>
      {/* HERO */}
      <section className="page-section-large">
        <div className="container-main">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#1761dc] transition"
          >
            <ArrowLeft size={16} />
            All Sessions
          </Link>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 mt-8 items-center">
            {/* LEFT */}
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-3 py-1.5 rounded-full bg-blue-50 text-[#1761dc] text-xs font-bold">
                  {course.category}
                </span>

                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                  {language}
                </span>

                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                  {course.level}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#0b1b3a] leading-tight">
                {course.title}
              </h1>

              <p
                className="mt-6 text-lg text-slate-500 leading-8"
                dir={isArabic ? "rtl" : "ltr"}
              >
                {course.longDescription}
              </p>

              <div className="flex flex-wrap gap-6 mt-8 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Clock size={17} />
                  {course.duration}
                </div>

                <div className="flex items-center gap-2">
                  <PlayCircle size={17} />
                  {course.lessons} lessons
                </div>

                <div className="flex items-center gap-2">
                  <BookOpen size={17} />
                  {course.level}
                </div>
              </div>
            </div>

            {/* VIDEO PREVIEW */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40">
                <div className="aspect-video relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-[#07142e]/65" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
                      <Lock size={23} />
                    </div>

                    <p className="mt-4 font-semibold">
                      Session Preview
                    </p>

                    <p className="text-sm text-white/60 mt-1">
                      Activate this session to watch
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="page-section">
        <div className="container-main">
          <div className="grid lg:grid-cols-[1fr_360px] gap-14">
            {/* MAIN */}
            <div>
              <h2 className="text-3xl font-extrabold text-[#0b1b3a]">
                What you'll learn
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {course.learningPoints?.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50"
                  >
                    <div className="w-6 h-6 shrink-0 rounded-full bg-blue-100 text-[#1761dc] flex items-center justify-center">
                      <Check size={14} />
                    </div>

                    <span className="text-sm text-slate-600 leading-6">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* CURRICULUM */}
              <div className="mt-16">
                <h2 className="text-3xl font-extrabold text-[#0b1b3a]">
                  Session content
                </h2>

                <div className="mt-7 border border-slate-200 rounded-3xl overflow-hidden">
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson._id}
                      className="flex items-center gap-4 px-5 py-4 border-b last:border-b-0 border-slate-100"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <span className="flex-1 text-sm font-medium text-slate-700">
                        {lesson.title}
                      </span>

                      <Lock
                        size={15}
                        className="text-slate-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PURCHASE CARD */}
            <aside>
              <div className="sticky top-28 p-7 rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
                <div className="text-xs font-semibold text-slate-400">
                  SESSION PRICE
                </div>

                <div className="flex items-end gap-2 mt-2">
                  <span className="text-4xl font-extrabold text-[#0b1b3a]">
                    {course.price}
                  </span>

                  <span className="text-slate-400 mb-1">
                    EGP
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-4 leading-6">
                  Get access to this session and start learning immediately.
                </p>

                {actionError && (
                  <div className="mt-5 p-3 rounded-xl bg-red-50 text-red-600 text-sm">
                    {actionError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleGetSession}
                  className="button-primary mt-7 w-full"
                >
                  {isEnrolled(id)
                    ? "Continue Session"
                    : "Enter Access Code"}

                  <ArrowRight size={17} />
                </button>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <PlayCircle size={17} />
                    Full session video
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-4">
                    <FileText size={17} />
                    Learning resources
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-4">
                    <BookOpen size={17} />
                    Lifetime access
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}