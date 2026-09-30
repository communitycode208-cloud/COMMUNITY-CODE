import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";
import { apiRequest } from "../api/api";

const EnrollmentContext = createContext(null);

const TOKEN_KEY = "community_code_token";

export function EnrollmentProvider({ children }) {
  const { user } = useAuth();

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setEnrollments([]);
      return;
    }

    loadEnrollments();
  }, [user]);

  async function loadEnrollments() {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setEnrollments([]);
      return;
    }

    try {
      setLoading(true);

      const data = await apiRequest("/enrollments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEnrollments(data.enrollments || []);
    } catch (error) {
      console.error("Failed to load enrollments:", error);
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  }

  function getCourseId(enrollment) {
    if (!enrollment?.courseId) return null;

    if (typeof enrollment.courseId === "object") {
      return enrollment.courseId._id;
    }

    return enrollment.courseId;
  }

  function isEnrolled(courseId) {
    return enrollments.some(
      (item) => getCourseId(item) === courseId,
    );
  }

  function getEnrollment(courseId) {
    return enrollments.find(
      (item) => getCourseId(item) === courseId,
    );
  }

  async function enroll(courseId) {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!user || !token) {
      return false;
    }

    if (isEnrolled(courseId)) {
      return true;
    }

    try {
      const data = await apiRequest("/enrollments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId,
        }),
      });

      setEnrollments((current) => [
        ...current,
        data.enrollment,
      ]);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async function updateProgress(courseId, updates) {
    const currentEnrollment = getEnrollment(courseId);

    if (!currentEnrollment) {
      return;
    }

    setEnrollments((current) =>
      current.map((item) =>
        getCourseId(item) === courseId
          ? {
              ...item,
              ...updates,
            }
          : item,
      ),
    );
  }

  async function completeLesson(courseId, lessonId) {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!user || !token) {
      return;
    }

    try {
      const data = await apiRequest(
        `/enrollments/${courseId}/lessons/${lessonId}/complete`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEnrollments((current) =>
        current.map((item) =>
          getCourseId(item) === courseId
            ? data.enrollment
            : item,
        ),
      );

      return data.enrollment;
    } catch (error) {
      throw error;
    }
  }

  return (
    <EnrollmentContext.Provider
      value={{
        enrollments,
        loading,
        enroll,
        isEnrolled,
        getEnrollment,
        updateProgress,
        completeLesson,
        loadEnrollments,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollments() {
  const context = useContext(EnrollmentContext);

  if (!context) {
    throw new Error(
      "useEnrollments must be used inside EnrollmentProvider",
    );
  }

  return context;
}