import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Play,
  Sparkles,
  Users,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

import SectionHeading from "../../components/SectionHeading";
import CourseCard from "../../components/CourseCard";
import { useCourses } from "../../hooks/useCourses";

export default function Home() {
  const { courses, loading, error } = useCourses();

  return (
    <main className="overflow-hidden">
      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="page-section relative overflow-hidden bg-white grid-pattern">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="container-main relative">
          <div className="flex flex-col justify-center">
            {/* HERO CONTENT */}

            <div className="hero-content text-center">
              {/* Badge */}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-2 text-sm font-semibold text-[#1761dc]"
              >
                <Sparkles size={15} />
                Education built for the real world
              </motion.div>

              {/* Main heading */}

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-5xl font-extrabold leading-[0.95] tracking-tighter text-[#0b1b3a] md:text-7xl lg:text-[82px]"
              >
                Understand.
                <br />
                <span className="gradient-text">Build.</span> Grow.
              </motion.h1>

              {/* Arabic */}

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-7 text-xl font-semibold text-[#0b1b3a] md:text-2xl"
                dir="rtl"
              >
                افهم البرمجة.. وابني مستقبلك
              </motion.p>

              {/* Description */}

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="hero-description mt-5 text-base leading-8 text-slate-500 md:text-lg"
              >
                Practical programming and technology sessions designed to help
                you learn concepts, build real projects and move forward with
                confidence.
              </motion.p>

              {/* Buttons */}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Link
                  to="/courses"
                  className="button-primary sm:w-auto"
                >
                  Explore Sessions
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/about"
                  className="button-secondary sm:w-auto"
                >
                  <Play size={17} />
                  How it works
                </Link>
              </motion.div>
            </div>

            {/* ================================================= */}
            {/* CODE WINDOW */}
            {/* ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="hero-preview mx-auto mt-14 md:mt-16"
            >
              <div className="rounded-3xl bg-[#081630] p-2 shadow-2xl shadow-blue-900/20">
                <div className="overflow-hidden rounded-[22px] border border-white/10">
                  {/* Window header */}

                  <div className="flex items-center justify-between border-b border-white/10 bg-[#0d1d3b] px-5 py-4">
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-white/20" />
                      <span className="h-3 w-3 rounded-full bg-white/20" />
                      <span className="h-3 w-3 rounded-full bg-white/20" />
                    </div>

                    <span className="text-xs text-white/30">
                      community-code
                    </span>

                    <Code2 size={17} className="text-blue-400" />
                  </div>

                  {/* Code */}

                  <div className="overflow-hidden p-6 text-left font-mono text-sm leading-8 md:p-9 md:text-base">
                    <div className="text-white/30">
                      01&nbsp;&nbsp;
                      <span className="text-blue-400">const</span>{" "}
                      student ={" "}
                      <span className="text-purple-400">
                        CommunityCode
                      </span>
                      ;
                    </div>

                    <div className="text-white/30">
                      02&nbsp;&nbsp; student.
                      <span className="text-blue-400">learn</span>(
                      <span className="text-white">
                        "JavaScript"
                      </span>
                      );
                    </div>

                    <div className="text-white/30">
                      03&nbsp;&nbsp; student.
                      <span className="text-blue-400">build</span>(
                      <span className="text-white">
                        "real projects"
                      </span>
                      );
                    </div>

                    <div className="text-white/30">
                      04&nbsp;&nbsp; student.
                      <span className="text-blue-400">grow</span>
                      ();
                    </div>

                    <div className="mt-5 text-white/70">
                      <span className="text-green-400">✓</span>{" "}
                      Your journey starts here.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* STATS */}
      {/* ===================================================== */}

      <section className="page-section relative border-y border-[#e3ebf7] bg-[#f4f8ff]">
        <div className="container-main">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1761dc]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1761dc]" />
              Community Code in numbers
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              ["25+", "Sessions"],
              ["1,000+", "Students"],
              ["15+", "Topics"],
              ["AR / EN", "Languages"],
            ].map(([value, label]) => (
              <motion.div
                key={label}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-slate-200/80 bg-white px-4 py-6 text-center shadow-sm transition-all hover:border-blue-200 hover:shadow-lg md:px-6 md:py-7"
              >
                <div className="text-2xl font-extrabold tracking-tight text-[#0b1b3a] md:text-4xl">
                  {value}
                </div>

                <div className="mt-2 text-xs font-medium text-slate-400 md:text-sm">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* COURSES */}
      {/* ===================================================== */}

      <section className="page-section relative bg-white">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[650px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[110px]" />

        <div className="container-main relative">
          <SectionHeading
            eyebrow="01 — Start Learning"
            title="Knowledge that turns into action."
            description="Choose a session, learn at your own pace and start building."
          />

          {loading ? (
            <div className="py-10 text-center text-slate-500">
              Loading sessions...
            </div>
          ) : error ? (
            <div className="py-10 text-center text-red-500">
              {error}
            </div>
          ) : (
            <div className="section-content grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                />
              ))}
            </div>
          )}

          <div className="section-action flex justify-center">
            <Link
              to="/courses"
              className="button-secondary group text-[#1761dc]"
            >
              Explore all sessions

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* WHY COMMUNITY CODE */}
      {/* ===================================================== */}

      <section className="page-section relative overflow-hidden border-y border-slate-200/70 bg-[#f5f8fc]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px]" />

        <div className="container-main relative">
          <SectionHeading
            eyebrow="02 — Why Community Code"
            title="Learning shouldn't stop at watching."
            description="Every session is designed around understanding, practice and actually building something."
          />

          <div className="section-content grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                icon: BookOpen,
                title: "Learn",
                text: "Clear sessions that break complicated concepts into understandable pieces.",
              },
              {
                number: "02",
                icon: Code2,
                title: "Build",
                text: "Turn what you learn into practical projects and real experience.",
              },
              {
                number: "03",
                icon: Users,
                title: "Grow",
                text: "Develop the skills and confidence you need for your next step.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -7 }}
                  transition={{ duration: 0.25 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
                >
                  {/* Number */}

                  <div className="absolute right-7 top-5 text-5xl font-extrabold text-slate-100 transition-colors group-hover:text-blue-50">
                    {item.number}
                  </div>

                  {/* Icon */}

                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#1761dc] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={24} />
                  </div>

                  {/* Title */}

                  <h3 className="relative mt-7 text-2xl font-bold text-[#0b1b3a]">
                    {item.title}
                  </h3>

                  {/* Text */}

                  <p className="relative mt-3 text-sm leading-7 text-slate-500">
                    {item.text}
                  </p>

                  {/* Bottom */}

                  <div className="mt-auto pt-8">
                    <div className="h-px w-full bg-slate-100" />

                    <div className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                      Community Code
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FINAL CTA */}
      {/* ===================================================== */}

      <section className="cta-section bg-white">
        <div className="container-main">
          <div className="relative overflow-hidden rounded-[32px] bg-[#0b1b3a] px-6 py-14 text-center shadow-2xl shadow-blue-900/10 sm:px-10 md:px-16 md:py-20">
            {/* Glows */}

            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.04] grid-pattern" />

            <div className="cta-content">
              <div className="cta-eyebrow text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                03 — Your next step
              </div>

              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Ready to start building?
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-white/60">
                Choose your first session and start learning with Community
                Code.
              </p>

              <Link
                to="/courses"
                className="button-primary mt-8 bg-white text-[#0b1b3a] hover:bg-blue-50"
              >
                Explore Sessions

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}