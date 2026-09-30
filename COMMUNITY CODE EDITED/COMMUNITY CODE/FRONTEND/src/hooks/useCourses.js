import { useEffect, useState } from "react";
import { getCourses } from "../api/api.js";

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);

        const data = await getCourses();

        setCourses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return {
    courses,
    loading,
    error
  };
}