import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
} from "lucide-react";

import { apiRequest } from "../../api/api";

const TOKEN_KEY = "community_code_token";

export default function Settings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("New password must contain at least 6 characters.");
      return;
    }

    if (form.currentPassword === form.newPassword) {
      setError(
        "New password must be different from your current password."
      );
      return;
    }

    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setError("You are not authenticated.");
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest("/users/me/password", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });

      setSuccess(
        data.message || "Password changed successfully."
      );

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(
        err.message || "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-slate-400">
          Community Code
        </p>

        <h1 className="text-3xl font-extrabold text-[#0b1b3a] mt-2">
          Settings
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your account preferences and security.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Security Info */}
        <div className="bg-white border border-slate-200 rounded-3xl p-7">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1761dc] flex items-center justify-center">
            <Lock size={24} />
          </div>

          <h2 className="text-xl font-extrabold text-[#0b1b3a] mt-6">
            Account Security
          </h2>

          <p className="text-slate-500 mt-3 leading-7">
            Keep your account secure by using a strong password
            and changing it regularly.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-sm font-bold text-[#0b1b3a]">
              Password requirements
            </p>

            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>• At least 6 characters</li>
              <li>• Must be different from your current password</li>
              <li>• Confirm your new password</li>
            </ul>
          </div>
        </div>

        {/* Change Password */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-7">
          <div className="mb-7">
            <h2 className="text-xl font-extrabold text-[#0b1b3a]">
              Change Password
            </h2>

            <p className="text-slate-500 mt-2">
              Update your password to keep your account secure.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm flex items-center gap-2">
              <CheckCircle2 size={18} />

              <span>{success}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-[#0b1b3a] mb-2">
                Current Password
              </label>

              <div className="relative">
                <input
                  name="currentPassword"
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  value={form.currentPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  className="form-input pr-12 disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      !showCurrentPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-[#0b1b3a] mb-2">
                New Password
              </label>

              <div className="relative">
                <input
                  name="newPassword"
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  className="form-input pr-12 disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      !showNewPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showNewPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-[#0b1b3a] mb-2">
                Confirm New Password
              </label>

              <div className="relative">
                <input
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  className="form-input pr-12 disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="button-primary disabled:opacity-50"
              >
                <Save size={17} />

                {loading
                  ? "Changing Password..."
                  : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}