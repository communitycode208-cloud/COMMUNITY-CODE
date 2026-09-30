import mongoose from "mongoose";

import { MONGO_URI } from "./src/config/config.service.js";

import { Course } from "./src/DB/models/course.model.js";
import { Lesson } from "./src/DB/models/lesson.model.js";


const coursesData = [
  {
    title: "JavaScript Fundamentals",
    slug: "javascript-fundamentals",
    description: "Learn the fundamentals of JavaScript from scratch.",
    longDescription:
      "A beginner-friendly course that covers the core concepts of JavaScript.",
    category: "Programming",
    language: "en",
    level: "Beginner",
    duration: "2h 30m",
    lessons: 8,
    price: 300,
    thumbnail:
  "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1200&auto=format&fit=crop",
    instructor: "Community Code / Technology Education",
    learningPoints: [
      "Understand JavaScript fundamentals",
      "Work with variables and data types",
      "Use conditions and loops",
      "Write functions",
      "Understand arrays and objects"
    ]
  },

  {
    title: "React JS From Zero",
    slug: "react-js-from-zero",
    description: "Learn React JS from the beginning.",
    longDescription:
      "Build a strong foundation in React and learn how to create modern user interfaces.",
    category: "Web Development",
    language: "en",
    level: "Intermediate",
    duration: "3h 15m",
    lessons: 10,
    price: 350,
    thumbnail:
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    instructor: "Community Code / Technology Education",
    learningPoints: [
      "Understand React fundamentals",
      "Build reusable components",
      "Work with props and state",
      "Handle events",
      "Build modern React interfaces"
    ]
  },

  {
    title: "أساسيات البرمجة",
    slug: "programming-basics-ar",
    description: "تعلم أساسيات البرمجة من البداية.",
    longDescription:
      "كورس مناسب للمبتدئين لفهم المفاهيم الأساسية في البرمجة.",
    category: "Programming",
    language: "ar",
    level: "Beginner",
    duration: "7 lessons",
    lessons: 7,
    price: 200,
    thumbnail:
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    instructor: "Community Code / Technology Education",
    learningPoints: [
      "فهم أساسيات البرمجة",
      "التعامل مع المتغيرات",
      "فهم الشروط والحلقات",
      "كتابة الدوال",
      "حل المشكلات البرمجية"
    ]
  },

  {
    title: "Web Development Roadmap",
    slug: "web-development-roadmap",
    description: "A roadmap to start your web development journey.",
    longDescription:
      "Understand the essential steps and technologies needed to become a web developer.",
    category: "Web Development",
    language: "en",
    level: "Beginner",
    duration: "6 lessons",
    lessons: 6,
    price: 150,
    thumbnail:
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    instructor: "Community Code / Technology Education",
    learningPoints: [
      "Understand web development",
      "Learn the frontend roadmap",
      "Learn the backend roadmap",
      "Understand databases",
      "Build real projects"
    ]
  }
];

const lessonsData = [
  {
    courseSlug: "javascript-fundamentals",
    lessons: [
      {
        title: "Introduction to JavaScript",
        description: "Introduction to JavaScript and its basic concepts.",
        duration: "20 min",
        youtubeId: "dQw4w9WgXcQ",
        order: 1
      },
      {
        title: "Variables and Data Types",
        description: "Learn variables and the main JavaScript data types.",
        duration: "20 min",
        youtubeId: "",
        order: 2
      },
      {
        title: "Operators",
        description: "Learn arithmetic, comparison and logical operators.",
        duration: "20 min",
        youtubeId: "",
        order: 3
      },
      {
        title: "Conditions",
        description: "Learn how to use if, else and switch.",
        duration: "20 min",
        youtubeId: "",
        order: 4
      },
      {
        title: "Loops",
        description: "Learn for, while and do while loops.",
        duration: "20 min",
        youtubeId: "",
        order: 5
      },
      {
        title: "Functions",
        description: "Learn how to create and use JavaScript functions.",
        duration: "20 min",
        youtubeId: "",
        order: 6
      },
      {
        title: "Arrays",
        description: "Learn how to work with JavaScript arrays.",
        duration: "20 min",
        youtubeId: "",
        order: 7
      },
      {
        title: "Objects",
        description: "Learn the basics of JavaScript objects.",
        duration: "20 min",
        youtubeId: "",
        order: 8
      }
    ]
  },

  {
    courseSlug: "react-js-from-zero",
    lessons: [
      {
        title: "Introduction to React",
        description: "Understand what React is and why it is used.",
        duration: "20 min",
        youtubeId: "",
        order: 1
      },
      {
        title: "Components",
        description: "Learn how to create reusable React components.",
        duration: "20 min",
        youtubeId: "",
        order: 2
      },
      {
        title: "JSX",
        description: "Learn the basics of JSX syntax.",
        duration: "20 min",
        youtubeId: "",
        order: 3
      },
      {
        title: "Props",
        description: "Learn how to pass data between components.",
        duration: "20 min",
        youtubeId: "",
        order: 4
      },
      {
        title: "State",
        description: "Understand state and how it works in React.",
        duration: "20 min",
        youtubeId: "",
        order: 5
      },
      {
        title: "Events",
        description: "Handle user events in React applications.",
        duration: "20 min",
        youtubeId: "",
        order: 6
      },
      {
        title: "Forms",
        description: "Build and handle forms in React.",
        duration: "20 min",
        youtubeId: "",
        order: 7
      },
      {
        title: "Lists",
        description: "Render lists and use keys correctly.",
        duration: "20 min",
        youtubeId: "",
        order: 8
      },
      {
        title: "React Hooks",
        description: "Understand the basics of React Hooks.",
        duration: "20 min",
        youtubeId: "",
        order: 9
      },
      {
        title: "Building a React Project",
        description: "Put the React concepts together in a small project.",
        duration: "20 min",
        youtubeId: "",
        order: 10
      }
    ]
  },

  {
    courseSlug: "programming-basics-ar",
    lessons: [
      {
        title: "مقدمة في البرمجة",
        description: "مقدمة عن البرمجة والمفاهيم الأساسية.",
        duration: "20 min",
        youtubeId: "",
        order: 1
      },
      {
        title: "المتغيرات وأنواع البيانات",
        description: "التعرف على المتغيرات وأنواع البيانات.",
        duration: "20 min",
        youtubeId: "",
        order: 2
      },
      {
        title: "الشروط",
        description: "شرح الشروط واستخدامها.",
        duration: "20 min",
        youtubeId: "",
        order: 3
      },
      {
        title: "الحلقات",
        description: "التعرف على الحلقات واستخدامها.",
        duration: "20 min",
        youtubeId: "",
        order: 4
      },
      {
        title: "الدوال",
        description: "شرح الدوال وكيفية استخدامها.",
        duration: "20 min",
        youtubeId: "",
        order: 5
      },
      {
        title: "Arrays",
        description: "التعامل مع المصفوفات.",
        duration: "20 min",
        youtubeId: "",
        order: 6
      },
      {
        title: "حل المشكلات",
        description: "تطبيق المفاهيم الأساسية في حل المشكلات.",
        duration: "20 min",
        youtubeId: "",
        order: 7
      }
    ]
  },

  {
    courseSlug: "web-development-roadmap",
    lessons: [
      {
        title: "Introduction to Web Development",
        description: "Understand the basics of web development.",
        duration: "20 min",
        youtubeId: "",
        order: 1
      },
      {
        title: "HTML",
        description: "Learn the basics of HTML.",
        duration: "20 min",
        youtubeId: "",
        order: 2
      },
      {
        title: "CSS",
        description: "Learn the basics of CSS.",
        duration: "20 min",
        youtubeId: "",
        order: 3
      },
      {
        title: "JavaScript",
        description: "Understand the role of JavaScript in web development.",
        duration: "20 min",
        youtubeId: "",
        order: 4
      },
      {
        title: "Backend",
        description: "Understand the backend development path.",
        duration: "20 min",
        youtubeId: "",
        order: 5
      },
      {
        title: "Projects and Next Steps",
        description: "Learn how to continue your web development journey.",
        duration: "20 min",
        youtubeId: "",
        order: 6
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected for seeding");

    const createdCourses = {};

    for (const courseData of coursesData) {
      const course = await Course.findOneAndUpdate(
        { slug: courseData.slug },
        courseData,
        {
          new: true,
          upsert: true,
          runValidators: true
        }
      );

      createdCourses[course.slug] = course;

      console.log(`Course ready: ${course.title}`);
    }

    for (const courseData of lessonsData) {
      const course = createdCourses[courseData.courseSlug];

      if (!course) {
        console.log(
          `Course not found: ${courseData.courseSlug}`
        );
        continue;
      }

      for (const lessonData of courseData.lessons) {
        await Lesson.findOneAndUpdate(
          {
            courseId: course._id,
            order: lessonData.order
          },
          {
            courseId: course._id,
            ...lessonData
          },
          {
            new: true,
            upsert: true,
            runValidators: true
          }
        );
      }

      console.log(
        `Lessons ready for: ${course.title}`
      );
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Seed failed:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

seedDatabase();
