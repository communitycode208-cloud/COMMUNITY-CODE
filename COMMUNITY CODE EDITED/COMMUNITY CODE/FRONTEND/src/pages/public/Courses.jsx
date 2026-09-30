import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

import SectionHeading from "../../components/SectionHeading";
import CourseCard from "../../components/CourseCard";
import { useCourses } from "../../hooks/useCourses";

export default function Courses() {
  const { courses, loading, error } = useCourses();

  const [language, setLanguage] = useState("All");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesLanguage =
        language === "All" ||
        course.language ===
          (language === "Arabic" ? "ar" : "en");

      const matchesCategory =
        category === "All" || course.category === category;

      const title = course.title?.toLowerCase() || "";
      const description = course.description?.toLowerCase() || "";
      const searchValue = search.toLowerCase();

      const matchesSearch =
        title.includes(searchValue) ||
        description.includes(searchValue);

      return (
        matchesLanguage &&
        matchesCategory &&
        matchesSearch
      );
    });
  }, [courses, language, category, search]);

  if (loading) {
    return (
      <main>
        <section className="page-section-large">
          <div className="container-main">
            <div className="py-20 text-center">
              <p className="text-slate-500">
                Loading sessions...
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <section className="page-section-large">
          <div className="container-main">
            <div className="py-20 text-center">
              <p className="text-red-500">
                {error}
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* HEADER */}
      <section className="page-section-large">
        <div className="container-main">
          <SectionHeading
            eyebrow="Explore"
            title="Find your next session."
            description="Choose what you want to learn and start building your skills one session at a time."
          />

          <div className="section-content">
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search sessions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-14 rounded-2xl border border-slate-200 pl-12 pr-5 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mt-10">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {["All", "Arabic", "English"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setLanguage(item)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                      language === item
                        ? "bg-[#0b1b3a] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <SlidersHorizontal
                  size={17}
                  className="text-slate-400"
                />

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium outline-none"
                >
                  <option value="All">
                    All Categories
                  </option>

                  <option value="Programming">
                    Programming
                  </option>

                  <option value="Web Development">
                    Web Development
                  </option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="section-action">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-[#0b1b3a]">
                    {filteredCourses.length}
                  </span>{" "}
                  sessions
                </p>
              </div>

              {filteredCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.05,
                      }}
                    >
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-slate-400">
                    No sessions found.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}