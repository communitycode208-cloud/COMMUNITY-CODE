import { ArrowUpRight, Clock, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CourseCard({ course }) {
  const language =
    course.language === "ar"
      ? "Arabic"
      : course.language === "en"
        ? "English"
        : course.language;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-xl hover:shadow-slate-200/50"
    >
      {/* Image */}
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#07142e]/70 via-transparent to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-[#0b1b3a]">
            {language}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5 text-xs">
            <Clock size={14} />
            {course.duration}
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <PlayCircle size={14} />
            {course.lessons} lessons
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 text-xs font-semibold text-[#1761dc]">
          {course.category}
        </div>

        <h3 className="text-xl font-bold text-[#0b1b3a]">
          {course.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-500 line-clamp-2">
          {course.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Session price
            </span>

            <span className="mt-1 block text-xl font-extrabold tracking-tight text-[#0b1b3a]">
              {course.price}{" "}
              <span className="text-sm font-bold text-slate-400">
                EGP
              </span>
            </span>
          </div>

          <Link
            to={`/courses/${course._id}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#0b1b3a] transition-colors group-hover:bg-[#1761dc] group-hover:text-white"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}