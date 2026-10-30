import { NavLink, Outlet } from "react-router-dom";
import { authClient } from "../lib/auth-client";

const linkClass = ({ isActive }) =>
  `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-night text-gold" : "text-ink hover:bg-indigo-50"
  }`;

const DashboardLayout = () => {
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-[230px_minmax(0,1fr)]">
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <nav className="flex gap-2 overflow-x-auto rounded-xl border border-indigo-100 bg-white p-3 lg:flex-col">
          <NavLink to="/dashboard" end className={linkClass}>
            Overview
          </NavLink>
          <NavLink to="/dashboard/add-lesson" className={linkClass}>
            Add Lesson
          </NavLink>
          <NavLink to="/dashboard/my-lessons" className={linkClass}>
            My Lessons
          </NavLink>
          <NavLink to="/dashboard/my-favorites" className={linkClass}>
            My Favorites
          </NavLink>
          <NavLink to="/dashboard/profile" className={linkClass}>
            Profile
          </NavLink>

          {isAdmin && (
            <>
              <NavLink to="/dashboard/admin" end className={linkClass}>
                Admin Overview
              </NavLink>
              <NavLink to="/dashboard/admin/manage-users" className={linkClass}>
                Manage Users
              </NavLink>
              <NavLink
                to="/dashboard/admin/manage-lessons"
                className={linkClass}
              >
                Manage Lessons
              </NavLink>
              <NavLink
                to="/dashboard/admin/reported-lessons"
                className={linkClass}
              >
                Reported Lessons
              </NavLink>
              <NavLink to="/dashboard/admin/profile" className={linkClass}>
                Admin Profile
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      <section className="min-w-0">
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;
