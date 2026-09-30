import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useEnrollments } from "../../context/EnrollmentContext";
import { useCourses } from "../../hooks/useCourses";

export default function Dashboard() {
  const { user } = useAuth();

  const {
    enrollments,
    loading: enrollmentsLoading,
  } = useEnrollments();

  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
  } = useCourses();

  const firstName =
    user?.name?.split(" ")[0] || "Student";

  /*
   * Courses that the current user is enrolled in.
   * courseId is populated from the backend.
   */
  const enrolledCourses = enrollments
    .map((enrollment) => {
      const course =
        typeof enrollment.courseId === "object"
          ? enrollment.courseId
          : null;

      if (!course) return null;

      return {
        course,
        enrollment,
      };
    })
    .filter(Boolean);

  /*
   * Average progress across enrolled sessions.
   */
  const averageProgress =
    enrollments.length === 0
      ? 0
      : Math.round(
          enrollments.reduce(
            (total, enrollment) =>
              total + (enrollment.progress || 0),
            0,
          ) / enrollments.length,
        );

  /*
   * Continue learning:
   * show enrolled sessions that are not completed yet.
   */
  const continueLearning = enrolledCourses.filter(
    ({ enrollment }) => enrollment.progress < 100,
  );

  /*
   * Recommended sessions from the backend.
   */
  const recommendedCourses = courses
    .filter((course) => {
      return !enrollments.some((enrollment) => {
        const enrolledCourseId =
          typeof enrollment.courseId === "object"
            ? enrollment.courseId._id
            : enrollment.courseId;

        return enrolledCourseId === course._id;
      });
    })
    .slice(0, 2);

  const isLoading =
    enrollmentsLoading || coursesLoading;

  return (
    <div className="container-main max-w-6xl">
      {/* Greeting */}
      <section className="dashboard-section">
        <div className="relative overflow-hidden rounded-3xl bg-[#0b1b3a] px-6 py-8 text-white shadow-xl shadow-blue-900/10 md:px-10 md:py-10">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
                Student dashboard
              </p>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                Good evening, {firstName} 👋
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/65 md:text-base">
                Ready to continue learning? Pick up a
                session or unlock something new today.
              </p>
            </div>

            <Link
              to="/courses"
              className="button-primary bg-white text-[#0b1b3a] hover:bg-blue-50"
            >
              Explore Sessions
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="dashboard-section grid gap-4 sm:grid-cols-3">
        {/* Enrolled */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#1761dc]">
            <BookOpen size={19} />
          </div>

          <p className="mt-6 text-3xl font-extrabold text-[#0b1b3a]">
            {isLoading ? "..." : enrollments.length}
          </p>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Sessions enrolled
          </p>
        </div>

        {/* Progress */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <PlayCircle size={19} />
          </div>

          <p className="mt-6 text-3xl font-extrabold text-[#0b1b3a]">
            {isLoading ? "..." : `${averageProgress}%`}
          </p>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Learning progress
          </p>
        </div>

        {/* Learning time */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Clock size={19} />
          </div>

          <p className="mt-6 text-3xl font-extrabold text-[#0b1b3a]">
            —
          </p>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Learning time
          </p>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="dashboard-section">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#0b1b3a]">
              Continue Learning
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Pick up where you left off.
            </p>
          </div>

          <Link
            to="/dashboard/sessions"
            className="text-sm font-semibold text-[#1761dc]"
          >
            View all
          </Link>
        </div>

        {enrollmentsLoading ? (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading your sessions...
            </p>
          </div>
        ) : continueLearning.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {continueLearning
              .slice(0, 2)
              .map(({ course, enrollment }) => (
                <Link
                  key={course._id}
                  to={`/dashboard/sessions/${course._id}`}
                  className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/30"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-24 w-32 rounded-xl object-cover"
                  />

                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1761dc]">
                      {course.category}
                    </span>

                    <h3 className="mt-1 truncate font-bold text-[#0b1b3a]">
                      {course.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-500">
                      {enrollment.progress}% complete
                    </p>

                    <div className="mt-2 h-1.5 w-full max-w-40 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#1761dc]"
                        style={{
                          width: `${enrollment.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <ArrowUpRight
                    className="ml-auto shrink-0 text-slate-300 transition group-hover:text-[#1761dc]"
                    size={18}
                  />
                </Link>
              ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1761dc]">
              <Sparkles size={23} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-[#0b1b3a]">
              Your learning journey starts here.
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              You haven't activated a session yet.
              Explore our sessions and find something
              worth building.
            </p>

            <Link
              to="/courses"
              className="button-primary mt-7"
            >
              Explore Sessions
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>

      {/* Recommended */}
      <section className="dashboard-section">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#0b1b3a]">
              Recommended for you
            </h2>
          </div>
        </div>

        {coursesLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">
              Loading recommendations...
            </p>
          </div>
        ) : coursesError ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
            <p className="text-sm text-red-500">
              {coursesError}
            </p>
          </div>
        ) : recommendedCourses.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {recommendedCourses.map((course) => (
              <Link
                key={course._id}
                to={`/courses/${course._id}`}
                className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/30"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-24 w-32 rounded-xl object-cover"
                />

                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1761dc]">
                    {course.category}
                  </span>

                  <h3 className="mt-1 truncate font-bold text-[#0b1b3a]">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500">
                    {course.duration} · {course.level}
                  </p>
                </div>

                <ArrowUpRight
                  className="ml-auto shrink-0 text-slate-300 transition group-hover:text-[#1761dc]"
                  size={18}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">
              No recommended sessions available.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}