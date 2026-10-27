import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-night text-gold"
      : "text-ink hover:bg-indigo-50"
  }`;

const DashboardLayout = () => {
  return (
    <div className="mx-auto grid w-full max-w-[1400px] gap-6 px-4 py-8 lg:grid-cols-[230px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
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
        </nav>
      </aside>

      <section className="min-w-0">
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;