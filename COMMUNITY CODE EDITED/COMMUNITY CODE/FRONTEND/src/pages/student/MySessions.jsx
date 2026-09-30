import { ArrowRight, BookOpen, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { useEnrollments } from "../../context/EnrollmentContext";

export default function MySessions() {
  const { enrollments, loading } = useEnrollments();

  const myCourses = enrollments
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="py-20 text-center">
          <p className="text-slate-500">
            Loading your sessions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <p className="text-sm text-slate-400">
          Student Space
        </p>

        <h1 className="text-3xl font-extrabold text-[#0b1b3a] mt-2">
          My Sessions
        </h1>

        <p className="text-slate-500 mt-2">
          Your unlocked learning sessions.
        </p>
      </div>

      {myCourses.length === 0 ? (
        <div className="mt-8 bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-[#1761dc] flex items-center justify-center">
            <BookOpen size={24} />
          </div>

          <h2 className="font-bold text-[#0b1b3a] mt-5">
            No sessions yet
          </h2>

          <p className="text-sm text-slate-400 mt-2">
            Use an access code to unlock your first session.
          </p>

          <Link
            to="/dashboard/access-code"
            className="button-primary mt-6"
          >
            Enter Access Code
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {myCourses.map(({ course, enrollment }) => (
            <Link
              key={course._id}
              to={`/dashboard/sessions/${course._id}`}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:shadow-xl hover:shadow-slate-200/40 transition"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-4 left-5 text-white">
                  <span className="text-xs font-semibold opacity-70">
                    {course.lessons} Lessons
                  </span>

                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <PlayCircle size={15} />
                    {course.duration}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-extrabold text-[#0b1b3a]">
                  {course.title}
                </h2>

                <p className="text-sm text-slate-500 mt-2 leading-6 line-clamp-2">
                  {course.description}
                </p>

                <div className="mt-6">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-400">
                      Progress
                    </span>

                    <span className="text-[#1761dc]">
                      {enrollment.progress}%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[#1761dc] rounded-full transition-all"
                      style={{
                        width: `${enrollment.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1761dc]">
                    Continue learning
                  </span>

                  <ArrowRight
                    size={17}
                    className="text-[#1761dc]"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}