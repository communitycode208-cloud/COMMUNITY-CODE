import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  Ticket,
  User,
  Settings,
  LogOut,
  Code2,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";

import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function StudentLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { user, logout } = useAuth();

  const navigation = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Sessions",
      path: "/dashboard/sessions",
      icon: BookOpen,
    },
    {
      label: "Files",
      path: "/dashboard/files",
      icon: FolderOpen,
    },
    {
      label: "Access Code",
      path: "/dashboard/access-code",
      icon: Ticket,
    },
  ];

  const accountNavigation = [
    {
      label: "Profile",
      path: "/dashboard/profile",
      icon: User,
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

  function handleLogout() {
    logout();
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-200 px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#0b1b3a] flex items-center justify-center text-white text-xs font-bold">
            {"</>"}
          </div>

          <span className="font-extrabold text-[#0b1b3a]">
            Community <span className="text-[#1761dc]">Code</span>
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-40
          student-sidebar bg-[#081630] text-white
          flex flex-col
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarCollapsed ? "student-sidebar-collapsed" : ""}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="student-sidebar-header h-20 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400 font-bold">
            {"</>"}
          </div>

          <div className="student-sidebar-copy ml-3">
            <div className="font-extrabold">
              Community <span className="text-blue-400">Code</span>
            </div>

            <div className="text-[9px] text-white/30 tracking-widest mt-1">
              STUDENT SPACE
            </div>
          </div>

          <button
            type="button"
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            aria-expanded={!sidebarCollapsed}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
            className="student-sidebar-toggle"
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>

        {/* User */}
        <div className="student-sidebar-user px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div className="student-sidebar-copy min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name}</p>

              <p className="text-xs text-white/40 truncate">
                @{user?.username}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <p className="student-sidebar-label px-3 text-[10px] uppercase tracking-[0.18em] text-white/35">
            Learning
          </p>

          <div className="mt-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  onClick={() => setMobileOpen(false)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    px-3.5 py-3.5 rounded-xl
                    text-sm font-medium
                    transition
                    ${
                      isActive
                        ? "border-l-2 border-blue-400 bg-blue-500/15 text-white"
                        : "text-white/45 hover:bg-white/5 hover:text-white"
                    }
                    `
                  }
                >
                  <Icon size={18} />
                  <span className="student-sidebar-copy">{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <p className="student-sidebar-label mt-10 px-3 text-[10px] uppercase tracking-[0.18em] text-white/35">
            Account
          </p>

          <div className="mt-4 space-y-2">
            {accountNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    px-3.5 py-3.5 rounded-xl
                    text-sm font-medium
                    transition
                    ${
                      isActive
                        ? "border-l-2 border-blue-400 bg-blue-500/15 text-white"
                        : "text-white/45 hover:bg-white/5 hover:text-white"
                    }
                    `
                  }
                >
                  <Icon size={18} />
                  <span className="student-sidebar-copy">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="student-sidebar-logout border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-white/45 hover:text-white hover:bg-white/5 transition"
          >
            <LogOut size={18} />
            <span className="student-sidebar-copy">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Main */}
      <div
        className={`student-content min-h-screen ${
          sidebarCollapsed ? "student-content-collapsed" : ""
        }`}
      >
        {/* Top bar */}
        <header className="hidden lg:flex h-20 bg-white border-b border-slate-200 px-8 items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Student Space</p>

            <p className="text-sm font-semibold text-[#0b1b3a]">
              Keep learning. Keep building.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-[#0b1b3a]">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
