import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-slate-400">Community Code</p>

          <h1 className="text-3xl font-extrabold text-[#0b1b3a] mt-2">
            Profile
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your personal information.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl min-h-[400px] flex items-center justify-center">
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl min-h-[400px] flex items-center justify-center">
          <p className="text-red-500">Unable to load profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-slate-400">Community Code</p>

        <h1 className="text-3xl font-extrabold text-[#0b1b3a] mt-2">
          Profile
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your personal information.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="bg-white border border-slate-200 rounded-3xl p-7">
          <div className="w-20 h-20 rounded-full bg-[#0b1b3a] text-white flex items-center justify-center text-2xl font-extrabold">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h2 className="text-2xl font-extrabold text-[#0b1b3a] mt-5">
            {user.name}
          </h2>

          <p className="text-slate-500 mt-1">
            @{user.username}
          </p>

          <div className="mt-6 inline-flex px-3 py-1 rounded-full bg-blue-50 text-[#1761dc] text-sm font-bold capitalize">
            {user.role}
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-7">
          <h2 className="text-xl font-extrabold text-[#0b1b3a]">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mt-6">
            <div>
              <p className="text-sm text-slate-400 mb-2">
                Full Name
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-semibold text-[#0b1b3a]">
                  {user.name || "—"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">
                Username
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-semibold text-[#0b1b3a]">
                  {user.username || "—"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">
                Email
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-semibold text-[#0b1b3a] break-all">
                  {user.email || "—"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">
                Language
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-semibold text-[#0b1b3a] uppercase">
                  {user.language || "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-400">
              Account Role
            </p>

            <p className="font-bold text-[#0b1b3a] mt-1 capitalize">
              {user.role || "student"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}