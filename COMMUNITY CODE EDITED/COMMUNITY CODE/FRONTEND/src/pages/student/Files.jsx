import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest, getCourseById } from "../../api/api";
import { useEnrollments } from "../../context/EnrollmentContext";

const TOKEN_KEY = "community_code_token";

export default function Files() {
  const { courseId } = useParams();
  const { enrollments, loading: enrollmentsLoading } = useEnrollments();

  const [course, setCourse] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(Boolean(courseId));
  const [error, setError] = useState("");

  const getCourseId = (enrollment) => {
    if (!enrollment?.courseId) return null;

    if (typeof enrollment.courseId === "object") {
      return enrollment.courseId._id;
    }

    return enrollment.courseId;
  };

  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem(TOKEN_KEY);

        if (!token) {
          throw new Error("You must be logged in.");
        }

        const [courseData, filesData] = await Promise.all([
          getCourseById(courseId),
          apiRequest(`/courses/${courseId}/files`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setCourse(courseData);
        setFiles(filesData.files || []);
      } catch (error) {
        setError(error.message || "Failed to load resources.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadFiles();
    }
  }, [courseId]);

  // =========================
  // COURSE LIST
  // =========================

  if (!courseId) {
    if (enrollmentsLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center pt-24">
          <p className="text-slate-500 font-medium">
            Loading your courses...
          </p>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600 mb-2">
              COURSE RESOURCES
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-[#0b1b3a]">
              Your Files
            </h1>

            <p className="mt-2 text-slate-500">
              Choose a course to view its resources and files.
            </p>
          </div>

          {enrollments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <h2 className="text-xl font-bold text-[#0b1b3a]">
                No enrolled courses
              </h2>

              <p className="mt-2 text-slate-500">
                You need to enroll in a course before you can access its
                resources.
              </p>

              <Link
                to="/courses"
                className="inline-flex mt-6 px-5 py-2.5 rounded-xl bg-[#0b1b3a] text-white font-semibold hover:opacity-90 transition"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => {
                const enrolledCourse = enrollment.courseId;
                const enrolledCourseId = getCourseId(enrollment);

                if (!enrolledCourseId) return null;

                return (
                  <Link
                    key={enrollment._id}
                    to={`/dashboard/files/${enrolledCourseId}`}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    <div className="h-40 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 font-bold">
                        FILES
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-semibold text-blue-600 mb-2">
                        COURSE RESOURCES
                      </p>

                      <h2 className="text-xl font-bold text-[#0b1b3a] group-hover:text-blue-600 transition">
                        {enrolledCourse?.title || "Course"}
                      </h2>

                      <p className="mt-2 text-sm text-slate-500">
                        View resources and files for this course.
                      </p>

                      <div className="mt-5 text-sm font-semibold text-blue-600">
                        View Files →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================
  // COURSE FILES
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="text-slate-500 font-medium">
          Loading resources...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Failed to load resources
          </h1>

          <p className="mt-2 text-slate-500">
            {error}
          </p>

          <Link
            to="/dashboard/files"
            className="inline-flex mt-6 px-5 py-2.5 rounded-xl bg-[#0b1b3a] text-white font-semibold hover:opacity-90 transition"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <Link
            to="/dashboard/files"
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-5"
          >
            ← Back to My Files
          </Link>

          <p className="text-sm font-semibold text-blue-600 mb-2">
            COURSE RESOURCES
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-[#0b1b3a]">
            {course?.title || "Course Files"}
          </h1>

          <p className="mt-2 text-slate-500">
            Download the resources and files for this course.
          </p>
        </div>

        {files.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <h2 className="text-xl font-bold text-[#0b1b3a]">
              No resources yet
            </h2>

            <p className="mt-2 text-slate-500">
              There are no files available for this course.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {files.map((file) => (
              <div
                key={file._id}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                    FILE
                  </div>

                  <div>
                    <h2 className="font-bold text-[#0b1b3a]">
                      {file.name}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      {file.type}
                      {file.size
                        ? ` • ${(file.size / 1024).toFixed(1)} KB`
                        : ""}
                    </p>
                  </div>
                </div>

                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#0b1b3a] text-white font-semibold hover:opacity-90 transition"
                >
                  Open File
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}