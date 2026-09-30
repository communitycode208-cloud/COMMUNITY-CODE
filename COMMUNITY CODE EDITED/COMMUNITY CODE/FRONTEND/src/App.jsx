import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PublicLayout from "./layouts/PublicLayout";
import StudentLayout from "./layouts/StudentLayout";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/public/Home";
import Courses from "./pages/public/Courses";
import CourseDetails from "./pages/public/CourseDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/student/Dashboard";
import StudentPlaceholder from "./pages/student/StudentPlaceholder";
import AccessCode from "./pages/student/AccessCode";
import MySessions from "./pages/student/MySessions";
import CoursePlayer from "./pages/student/CoursePlayer";
import Settings from "./pages/student/Settings";
import Profile from "./pages/student/Profile";
import Files from "./pages/student/Files";
function Placeholder({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <h1 className="text-4xl font-bold text-[#0b1b3a]">
        {title}
      </h1>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* ========================= */}
      {/* PUBLIC */}
      {/* ========================= */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={<Placeholder title="About Community Code" />}
        />

        <Route path="/courses" element={<Courses />} />

        <Route
          path="/courses/:id"
          element={<CourseDetails />}
        />

        <Route
          path="/pricing"
          element={<Placeholder title="Pricing" />}
        />

        <Route
          path="/contact"
          element={<Placeholder title="Contact" />}
        />
      </Route>

      {/* ========================= */}
      {/* AUTH */}
      {/* ========================= */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      {/* ========================= */}
      {/* ADMIN */}
      {/* ========================= */}

      <Route element={<AdminRoute />}>
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
      </Route>

      {/* ========================= */}
      {/* STUDENT */}
      {/* ========================= */}

      <Route element={<ProtectedRoute />}>
        <Route element={<StudentLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/dashboard/sessions"
            element={<MySessions />}
          />

          <Route
            path="/dashboard/sessions/:courseId"
            element={<CoursePlayer />}
          />

          <Route path="/dashboard/files" element={<Files />} />
<Route path="/dashboard/files/:courseId" element={<Files />} />

          <Route
            path="/dashboard/access-code"
            element={<AccessCode />}
          />

          <Route
            path="/dashboard/profile"
            element={<Profile />}
          />

          <Route
            path="/dashboard/settings"
            element={<Settings />}
          />
        </Route>
      </Route>
    </Routes>
  );
}