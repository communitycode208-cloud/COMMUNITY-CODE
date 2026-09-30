import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Play,
  Menu,
  X,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getCourseById,
  getCourseLessons,
} from "../../api/api";

import { useEnrollments } from "../../context/EnrollmentContext";

export default function CoursePlayer() {
  const { courseId } = useParams();

  const {
    getEnrollment,
    completeLesson,
    loadEnrollments,
  } = useEnrollments();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLessonId, setCurrentLessonId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completeLoading, setCompleteLoading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const enrollment = getEnrollment(courseId);

  useEffect(() => {
    const loadCoursePlayer = async () => {
      try {
        setLoading(true);
        setError("");

        const [courseData, lessonsData] = await Promise.all([
          getCourseById(courseId),
          getCourseLessons(courseId),
        ]);

        setCourse(courseData);
        setLessons(lessonsData);

        const currentEnrollment = getEnrollment(courseId);

        let initialLessonId = null;

        if (currentEnrollment?.currentLessonId) {
          if (
            typeof currentEnrollment.currentLessonId === "object"
          ) {
            initialLessonId =
              currentEnrollment.currentLessonId._id;
          } else {
            initialLessonId =
              currentEnrollment.currentLessonId;
          }
        }

        if (!initialLessonId && lessonsData.length > 0) {
          initialLessonId = lessonsData[0]._id;
        }

        setCurrentLessonId(initialLessonId);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCoursePlayer();
  }, [courseId]);

  useEffect(() => {
    if (!enrollment?.currentLessonId) return;

    const enrollmentLessonId =
      typeof enrollment.currentLessonId === "object"
        ? enrollment.currentLessonId._id
        : enrollment.currentLessonId;

    setCurrentLessonId(enrollmentLessonId);
  }, [enrollment?.currentLessonId]);

  const currentLesson = lessons.find(
    (lesson) => lesson._id === currentLessonId
  );

  /*
   * Converts different YouTube formats into an embed URL.
   *
   * Supported:
   * 1. dQw4w9WgXcQ
   * 2. https://www.youtube.com/watch?v=dQw4w9WgXcQ
   * 3. https://youtu.be/dQw4w9WgXcQ
   * 4. https://www.youtube.com/embed/dQw4w9WgXcQ
   */
  function getYouTubeEmbedUrl(value) {
    if (!value) return null;

    const cleanValue = value.trim();

    if (!cleanValue) return null;

    // Already a YouTube ID
    if (
      !cleanValue.includes("youtube.com") &&
      !cleanValue.includes("youtu.be")
    ) {
      return `https://www.youtube.com/embed/${cleanValue}?rel=0`;
    }

    try {
      const url = new URL(cleanValue);

      // youtube.com/watch?v=VIDEO_ID
      if (url.hostname.includes("youtube.com")) {
        const videoId = url.searchParams.get("v");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}?rel=0`;
        }

        // youtube.com/embed/VIDEO_ID
        if (url.pathname.startsWith("/embed/")) {
          const videoId = url.pathname.split("/embed/")[1];

          if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?rel=0`;
          }
        }

        // youtube.com/shorts/VIDEO_ID
        if (url.pathname.startsWith("/shorts/")) {
          const videoId = url.pathname.split("/shorts/")[1];

          if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?rel=0`;
          }
        }
      }

      // youtu.be/VIDEO_ID
      if (url.hostname === "youtu.be") {
        const videoId = url.pathname.replace("/", "");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}?rel=0`;
        }
      }
    } catch {
      return null;
    }

    return null;
  }

  function getCompletedLessonId(lesson) {
    if (!lesson) return null;

    if (typeof lesson === "object") {
      return lesson._id;
    }

    return lesson;
  }

  function isLessonCompleted(lessonId) {
    if (!enrollment?.completedLessons) {
      return false;
    }

    return enrollment.completedLessons.some(
      (lesson) =>
        getCompletedLessonId(lesson) === lessonId
    );
  }

  function selectLesson(lesson) {
    setCurrentLessonId(lesson._id);
    setSidebarOpen(false);
    setError("");
  }

  async function markComplete() {
    if (!currentLesson) return;

    try {
      setCompleteLoading(true);
      setError("");

      await completeLesson(
        courseId,
        currentLesson._id
      );

      await loadEnrollments();
    } catch (error) {
      setError(error.message);
    } finally {
      setCompleteLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-slate-500">
          Loading session...
        </p>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0b1b3a]">
            Session could not be loaded
          </h1>

          <p className="text-red-500 mt-2">
            {error}
          </p>

          <Link
            to="/dashboard/sessions"
            className="inline-block mt-5 text-blue-600 font-semibold"
          >
            Back to sessions
          </Link>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-10">
        Course not found.
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0b1b3a]">
            Session locked
          </h1>

          <p className="text-slate-500 mt-2">
            You don't have access to this session.
          </p>

          <Link
            to="/dashboard/access-code"
            className="inline-block mt-5 px-5 py-3 bg-[#0b1b3a] text-white rounded-xl font-bold"
          >
            Enter Access Code
          </Link>
        </div>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0b1b3a]">
            No lessons available
          </h1>

          <p className="text-slate-500 mt-2">
            This session doesn't have any lessons yet.
          </p>
        </div>
      </div>
    );
  }

  const completed = isLessonCompleted(
    currentLesson._id
  );

  const currentLessonIndex = lessons.findIndex(
    (lesson) => lesson._id === currentLesson._id
  );

  const nextLesson =
    lessons[currentLessonIndex + 1];

  const youtubeEmbedUrl = getYouTubeEmbedUrl(
    currentLesson.youtubeId
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#071225] text-white flex flex-col">
      {/* TOP BAR */}
      <header className="h-16 shrink-0 border-b border-white/10 bg-[#081630] flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            to="/dashboard/sessions"
            className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10"
          >
            <ArrowLeft size={18} />
          </Link>

          <div className="hidden md:block min-w-0">
            <p className="text-xs text-white/35">
              Community Code
            </p>

            <h1 className="text-sm font-bold truncate">
              {course.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/dashboard/files/${courseId}`}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold transition"
          >
            Resources
          </Link>

          <div className="hidden sm:block text-xs text-white/40">
            {enrollment.progress}% complete
          </div>

          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="lg:hidden w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center"
          >
            {sidebarOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* SIDEBAR */}
        <aside
          className={`
            fixed lg:relative
            z-40 lg:z-auto
            top-16 lg:top-0
            bottom-0 lg:bottom-auto
            left-0
            w-80
            bg-[#0b1b3a]
            border-r border-white/10
            flex flex-col
            transition-transform
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <div className="p-5 border-b border-white/10">
            <p className="text-xs uppercase tracking-widest text-blue-400 font-bold">
              Course Content
            </p>

            <h2 className="font-bold mt-2">
              {lessons.length} Lessons
            </h2>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/40 mb-2">
                <span>Your progress</span>

                <span>
                  {enrollment.progress}%
                </span>
              </div>

              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${enrollment.progress}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {lessons.map((lesson, index) => {
              const isCurrent =
                lesson._id === currentLesson._id;

              const isCompleted =
                isLessonCompleted(lesson._id);

              return (
                <button
                  key={lesson._id}
                  onClick={() =>
                    selectLesson(lesson)
                  }
                  className={`
                    w-full text-left
                    p-4 rounded-xl
                    mb-1
                    transition
                    ${
                      isCurrent
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }
                  `}
                >
                  <div className="flex gap-3">
                    <div
                      className={`
                        shrink-0
                        w-8 h-8
                        rounded-lg
                        flex items-center justify-center
                        text-xs font-bold
                        ${
                          isCompleted
                            ? "bg-green-500/15 text-green-400"
                            : isCurrent
                              ? "bg-blue-500 text-white"
                              : "bg-white/5 text-white/35"
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check size={15} />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`
                          text-sm font-semibold
                          ${
                            isCurrent
                              ? "text-white"
                              : "text-white/60"
                          }
                        `}
                      >
                        {lesson.title}
                      </p>

                      <div className="flex items-center gap-1 mt-2 text-[11px] text-white/30">
                        <Clock size={11} />
                        {lesson.duration}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* MAIN PLAYER */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* VIDEO */}
            <div className="aspect-video bg-black">
              {youtubeEmbedUrl ? (
                <iframe
                  className="w-full h-full"
                  src={youtubeEmbedUrl}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="h-full flex items-center justify-center text-center p-8">
                  <div>
                    <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center">
                      <Play size={24} />
                    </div>

                    <p className="mt-5 font-bold">
                      Video not available
                    </p>

                    <p className="text-sm text-white/35 mt-2">
                      Add a YouTube video ID or YouTube URL
                      to this lesson.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* LESSON INFO */}
            <div className="p-6 md:p-10">
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-blue-400 font-bold uppercase tracking-wider">
                    <span>
                      Lesson{" "}
                      {currentLessonIndex + 1}
                    </span>

                    <span className="text-white/20">
                      /
                    </span>

                    <span>
                      {lessons.length}
                    </span>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-extrabold mt-3">
                    {currentLesson.title}
                  </h1>

                  <p className="text-white/45 leading-7 mt-4 max-w-3xl">
                    {currentLesson.description}
                  </p>
                </div>

                <button
                  onClick={markComplete}
                  disabled={
                    completed || completeLoading
                  }
                  className={`
                    shrink-0
                    px-5 py-3
                    rounded-xl
                    font-bold
                    text-sm
                    flex items-center
                    justify-center gap-2
                    ${
                      completed
                        ? "bg-green-500/10 text-green-400"
                        : "bg-white text-[#081630] hover:bg-blue-400 hover:text-white"
                    }
                    disabled:cursor-not-allowed
                  `}
                >
                  {completeLoading ? (
                    "Saving..."
                  ) : completed ? (
                    <>
                      <CheckCircle2 size={17} />
                      Completed
                    </>
                  ) : (
                    <>
                      Mark Complete
                      <ChevronRight size={17} />
                    </>
                  )}
                </button>
              </div>

              {/* NEXT LESSON */}
              <div className="mt-10 pt-8 border-t border-white/10 flex justify-between items-center">
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider">
                    Next lesson
                  </p>

                  <p className="font-bold mt-1">
                    {nextLesson?.title ||
                      "Course completed 🎉"}
                  </p>
                </div>

                {nextLesson && (
                  <button
                    onClick={() =>
                      selectLesson(nextLesson)
                    }
                    className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center"
                  >
                    <ChevronRight size={19} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}