import { useEffect, useRef, useState } from "react";

import {
  Ticket,
  Plus,
  BookOpen,
  Trash2,
  Users,
  FileText,
} from "lucide-react";

import {
  apiRequest,
  getCourses,
} from "../../api/api";

const TOKEN_KEY = "community_code_token";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [accessCodes, setAccessCodes] = useState([]);
  const [users, setUsers] = useState([]);

  const [files, setFiles] = useState([]);

  const [code, setCode] = useState("");
  const [courseId, setCourseId] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const [fileCourseId, setFileCourseId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingRoleId, setUpdatingRoleId] = useState(null);
  const [creatingFile, setCreatingFile] = useState(false);
  const [deletingFileId, setDeletingFileId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setError("You are not authenticated.");
        return;
      }

      const [
        coursesData,
        accessCodesData,
        usersData,
      ] = await Promise.all([
        getCourses(),

        apiRequest("/access-codes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        apiRequest("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const loadedCourses = coursesData || [];

      setCourses(loadedCourses);

      setAccessCodes(
        accessCodesData.accessCodes || []
      );

      setUsers(usersData.users || []);

      if (loadedCourses.length > 0) {
        setFileCourseId(loadedCourses[0]._id);

        const filesData = await apiRequest(
          `/courses/${loadedCourses[0]._id}/files`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFiles(filesData.files || []);
      }
    } catch (error) {
      setError(
        error.message ||
          "Failed to load admin dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateAccessCode(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const normalizedCode =
      code.trim().toUpperCase();

    if (!normalizedCode) {
      setError("Please enter an access code.");
      return;
    }

    if (!courseId) {
      setError("Please select a course.");
      return;
    }

    try {
      setCreating(true);

      const token =
        localStorage.getItem(TOKEN_KEY);

      const data = await apiRequest(
        "/access-codes",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            code: normalizedCode,
            courseId,
            expiresAt: expiresAt || null,
          }),
        }
      );

      setAccessCodes((current) => [
        data.accessCode,
        ...current,
      ]);

      setCode("");
      setCourseId("");
      setExpiresAt("");

      setSuccess(
        "Access code created successfully."
      );
    } catch (error) {
      setError(
        error.message ||
          "Failed to create access code."
      );
    } finally {
      setCreating(false);
    }
  }

  async function handleDeleteAccessCode(
    accessCodeId
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this access code?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");
      setDeletingId(accessCodeId);

      const token =
        localStorage.getItem(TOKEN_KEY);

      await apiRequest(
        `/access-codes/${accessCodeId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAccessCodes((current) =>
        current.filter(
          (item) =>
            item._id !== accessCodeId
        )
      );

      setSuccess(
        "Access code deleted successfully."
      );
    } catch (error) {
      setError(
        error.message ||
          "Failed to delete access code."
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function handleUpdateRole(
    userId,
    currentRole
  ) {
    const newRole =
      currentRole === "admin"
        ? "student"
        : "admin";

    const confirmed = window.confirm(
      `Change this user role to ${newRole}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");
      setUpdatingRoleId(userId);

      const token =
        localStorage.getItem(TOKEN_KEY);

      const data = await apiRequest(
        `/users/${userId}/role`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            role: newRole,
          }),
        }
      );

      setUsers((current) =>
        current.map((user) =>
          user._id === userId
            ? data.user
            : user
        )
      );

      setSuccess(
        "User role updated successfully."
      );
    } catch (error) {
      setError(
        error.message ||
          "Failed to update user role."
      );
    } finally {
      setUpdatingRoleId(null);
    }
  }

  async function loadCourseFiles(selectedCourseId) {
    if (!selectedCourseId) {
      setFiles([]);
      return;
    }

    try {
      setError("");

      const token =
        localStorage.getItem(TOKEN_KEY);

      const data = await apiRequest(
        `/courses/${selectedCourseId}/files`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFiles(data.files || []);
    } catch (error) {
      setError(
        error.message ||
          "Failed to load course resources."
      );
      setFiles([]);
    }
  }

  async function handleCreateFile(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!fileCourseId) {
      setError("Please select a course.");
      return;
    }

    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    try {
      setCreatingFile(true);

      const token =
        localStorage.getItem(TOKEN_KEY);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1"}/courses/${fileCourseId}/files`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to upload resource."
        );
      }

      setFiles((current) => [
        data.file,
        ...current,
      ]);

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setSuccess(
        "Resource uploaded successfully."
      );
    } catch (error) {
      setError(
        error.message ||
          "Failed to upload resource."
      );
    } finally {
      setCreatingFile(false);
    }
  }

  async function handleDeleteFile(fileId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resource?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");
      setDeletingFileId(fileId);

      const token =
        localStorage.getItem(TOKEN_KEY);

      await apiRequest(
        `/courses/${fileCourseId}/files/${fileId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFiles((current) =>
        current.filter(
          (file) => file._id !== fileId
        )
      );

      setSuccess(
        "Resource deleted successfully."
      );
    } catch (error) {
      setError(
        error.message ||
          "Failed to delete resource."
      );
    } finally {
      setDeletingFileId(null);
    }
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#1761dc]">
          Administration
        </p>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b1b3a] mt-2">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Manage access codes, courses, users and resources.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">

        {/* Access Codes */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1761dc] flex items-center justify-center">
            <Ticket size={24} />
          </div>

          <p className="text-sm text-slate-500 mt-5">
            Access Codes
          </p>

          <h2 className="text-3xl font-extrabold text-[#0b1b3a] mt-1">
            {loading
              ? "..."
              : accessCodes.length}
          </h2>
        </div>

        {/* Courses */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1761dc] flex items-center justify-center">
            <BookOpen size={24} />
          </div>

          <p className="text-sm text-slate-500 mt-5">
            Courses
          </p>

          <h2 className="text-3xl font-extrabold text-[#0b1b3a] mt-1">
            {loading
              ? "..."
              : courses.length}
          </h2>
        </div>

        {/* Users */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1761dc] flex items-center justify-center">
            <Users size={24} />
          </div>

          <p className="text-sm text-slate-500 mt-5">
            Users
          </p>

          <h2 className="text-3xl font-extrabold text-[#0b1b3a] mt-1">
            {loading
              ? "..."
              : users.length}
          </h2>
        </div>
      </div>

      {/* Create Access Code */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 mt-6">

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#1761dc] flex items-center justify-center">
            <Plus size={21} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-[#0b1b3a]">
              Create Access Code
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Create a code that students can
              use to unlock a session.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleCreateAccessCode}
          className="mt-7 space-y-5"
        >

          {/* Code */}
          <div>
            <label className="block text-sm font-bold text-[#0b1b3a] mb-2">
              Access Code
            </label>

            <input
              value={code}
              onChange={(e) =>
                setCode(
                  e.target.value.toUpperCase()
                )
              }
              placeholder="CC-JS-2026"
              disabled={creating}
              className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 font-mono font-bold tracking-widest uppercase outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:opacity-60"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-bold text-[#0b1b3a] mb-2">
              Course
            </label>

            <select
              value={courseId}
              onChange={(e) =>
                setCourseId(e.target.value)
              }
              disabled={
                creating || loading
              }
              className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:opacity-60"
            >
              <option value="">
                Select a course
              </option>

              {courses.map((course) => (
                <option
                  key={course._id}
                  value={course._id}
                >
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Expiration */}
          <div>
            <label className="block text-sm font-bold text-[#0b1b3a] mb-2">
              Expiration Date
            </label>

            <input
              type="datetime-local"
              value={expiresAt}
              onChange={(e) =>
                setExpiresAt(e.target.value)
              }
              disabled={creating}
              className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:opacity-60"
            />

            <p className="text-xs text-slate-400 mt-2">
              Leave empty if the code should
              never expire.
            </p>
          </div>

          <button
            type="submit"
            disabled={creating}
            className="button-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Plus size={17} />

            {creating
              ? "Creating..."
              : "Create Access Code"}
          </button>
        </form>
      </div>

      {/* Access Codes */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 mt-6">

        <h2 className="text-xl font-extrabold text-[#0b1b3a]">
          Access Codes
        </h2>

        <p className="text-slate-500 mt-2">
          Your access codes will appear here.
        </p>

        {loading ? (
          <p className="text-sm text-slate-400 mt-6">
            Loading access codes...
          </p>
        ) : accessCodes.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">
              No access codes yet.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {accessCodes.map((item) => (
              <div
                key={item._id}
                className="border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <p className="font-mono font-bold text-[#0b1b3a] tracking-wider">
                    {item.code}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {item.courseId?.title ||
                      "Unknown course"}
                  </p>

                  {item.expiresAt && (
                    <p className="text-xs text-slate-400 mt-1">
                      Expires:{" "}
                      {new Date(
                        item.expiresAt
                      ).toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {item.used ? (
                    <span className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">
                      Used
                    </span>
                  ) : (
                    <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-[#1761dc] text-xs font-bold">
                      Available
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteAccessCode(
                        item._id
                      )
                    }
                    disabled={
                      deletingId === item._id
                    }
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={16} />

                    {deletingId === item._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resources */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 mt-6">

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#1761dc] flex items-center justify-center">
            <FileText size={21} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-[#0b1b3a]">
              Course Resources
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Upload files and resources for students.
            </p>
          </div>
        </div>

        {/* Course selector */}
        <div className="mt-7">
          <label className="block text-sm font-bold text-[#0b1b3a] mb-2">
            Course
          </label>

          <select
            value={fileCourseId}
            onChange={async (e) => {
              const selectedId =
                e.target.value;

              setFileCourseId(selectedId);

              await loadCourseFiles(
                selectedId
              );
            }}
            disabled={loading}
            className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:opacity-60"
          >
            <option value="">
              Select a course
            </option>

            {courses.map((course) => (
              <option
                key={course._id}
                value={course._id}
              >
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Resource */}
        <form
          onSubmit={handleCreateFile}
          className="mt-6 space-y-5"
        >
          <div>
            <label className="block text-sm font-bold text-[#0b1b3a] mb-2">
              Select File
            </label>

            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) =>
                setSelectedFile(e.target.files?.[0] || null)
              }
              disabled={creatingFile || !fileCourseId}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:opacity-60"
            />

            {selectedFile && (
              <p className="text-sm text-slate-500 mt-2">
                Selected:{" "}
                <span className="font-semibold">
                  {selectedFile.name}
                </span>
                {" • "}
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            )}

            <p className="text-xs text-slate-400 mt-2">
              Maximum file size: 10 MB.
            </p>
          </div>

          <button
            type="submit"
            disabled={
              creatingFile ||
              !fileCourseId ||
              !selectedFile
            }
            className="button-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Plus size={17} />

            {creatingFile
              ? "Uploading..."
              : "Upload Resource"}
          </button>
        </form>

        {/* Resources List */}
        <div className="mt-8">

          <h3 className="font-extrabold text-[#0b1b3a]">
            Resources
          </h3>

          {!fileCourseId ? (
            <div className="mt-4 rounded-2xl bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-500">
                Select a course to view its resources.
              </p>
            </div>
          ) : files.length === 0 ? (
            <div className="mt-4 rounded-2xl bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-500">
                No resources for this course yet.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {files.map((file) => (
                <div
                  key={file._id}
                  className="border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-[#0b1b3a]">
                      {file.name}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      {file.type}
                      {file.size
                        ? ` • ${file.size} KB`
                        : ""}
                    </p>

                    <a
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-600 hover:underline mt-2 inline-block break-all"
                    >
                      Open Resource
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteFile(
                        file._id
                      )
                    }
                    disabled={
                      deletingFileId ===
                      file._id
                    }
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={16} />

                    {deletingFileId ===
                    file._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      {(error || success) && (
        <div className="mt-6">
          {error && (
            <div className="rounded-2xl bg-red-50 border border-red-100 px-5 py-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-2xl bg-green-50 border border-green-100 px-5 py-4 text-sm text-green-600 mt-3">
              {success}
            </div>
          )}
        </div>
      )}

      {/* Users */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 mt-6">

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#1761dc] flex items-center justify-center">
            <Users size={21} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-[#0b1b3a]">
              Users
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              All registered users.
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400 mt-6">
            Loading users...
          </p>
        ) : users.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">
              No users found.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Name
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Username
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Language
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Role
                  </th>

                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-4 py-5 font-bold text-[#0b1b3a]">
                      {user.name}
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-500">
                      @{user.username}
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-500">
                      {user.email}
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-500 uppercase">
                      {user.language}
                    </td>

                    <td className="px-4 py-5">
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateRole(
                            user._id,
                            user.role
                          )
                        }
                        disabled={
                          updatingRoleId ===
                          user._id
                        }
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {user.role === "admin" ? (
                          <span className="inline-flex px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold hover:bg-purple-100">
                            {updatingRoleId ===
                            user._id
                              ? "Updating..."
                              : "Admin"}
                          </span>
                        ) : (
                          <span className="inline-flex px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200">
                            {updatingRoleId ===
                            user._id
                              ? "Updating..."
                              : "Student"}
                          </span>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}