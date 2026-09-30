const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const getCourses = async () => {
  const data = await apiRequest("/courses");

  return data.courses;
};

export const getCourseById = async (courseId) => {
  const data = await apiRequest(
    `/courses/${courseId}`
  );

  return data.course;
};

export const getCourseLessons = async (courseId) => {
  const data = await apiRequest(
    `/courses/${courseId}/lessons`
  );

  return data.lessons;
};