import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

// Temporary values. We connect these to real login later.
// To preview the logged-in navbar, change null to:
// { name: "Test User", photoURL: "https://i.pravatar.cc/150" }
// const user = null;
// const isPremium = false;

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-gold" : "text-indigo-200 hover:text-white"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium ${
    isActive
      ? "bg-night-light text-gold"
      : "text-indigo-100 hover:bg-night-light"
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const closeAll = () => {
    setOpen(false);
    setMenu(false);
  };
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isPremium = user?.isPremium === true;

  const handleLogout = async () => {
    await authClient.signOut();
    closeAll();
    toast.success("Logged out successfully");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-indigo-300/20 bg-night">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          to="/"
          onClick={closeAll}
          className="font-serif text-2xl font-semibold text-white"
        >
          Life<span className="text-gold">Lessons</span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          <li>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/public-lessons" className={linkClass}>
              Public Lessons
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/dashboard/add-lesson" className={linkClass}>
                  Add Lesson
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-lessons" className={linkClass}>
                  My Lessons
                </NavLink>
              </li>
              {!isPremium && (
                <li>
                  <NavLink to="/pricing" className={linkClass}>
                    Upgrade
                  </NavLink>
                </li>
              )}
              {isPremium && (
                <li className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-night">
                  Premium ⭐
                </li>
              )}
            </>
          )}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <div className="relative">
              <button onClick={() => setMenu(!menu)}>
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-10 w-10 rounded-full border-2 border-gold object-cover"
                />
              </button>
              {menu && (
                <div className="absolute right-0 mt-3 w-52 rounded-xl bg-white p-2 shadow-lg">
                  <p className="px-3 py-2 text-sm font-semibold text-ink">
                    {user.name}
                  </p>
                  <Link
                    to="/dashboard/profile"
                    onClick={closeAll}
                    className="block rounded-lg px-3 py-2 text-sm text-ink hover:bg-paper"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={closeAll}
                    className="block rounded-lg px-3 py-2 text-sm text-ink hover:bg-paper"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-ink hover:bg-paper"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-indigo-200 hover:text-white"
              >
                Login
              </Link>
              <Link to="/register" className="btn">
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-white transition ${open ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          ></span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-night-light px-4 pb-4 pt-2 lg:hidden">
          <NavLink to="/" end onClick={closeAll} className={mobileLinkClass}>
            Home
          </NavLink>
          <NavLink
            to="/public-lessons"
            onClick={closeAll}
            className={mobileLinkClass}
          >
            Public Lessons
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/dashboard/add-lesson"
                onClick={closeAll}
                className={mobileLinkClass}
              >
                Add Lesson
              </NavLink>
              <NavLink
                to="/dashboard/my-lessons"
                onClick={closeAll}
                className={mobileLinkClass}
              >
                My Lessons
              </NavLink>
              {!isPremium && (
                <NavLink
                  to="/pricing"
                  onClick={closeAll}
                  className={mobileLinkClass}
                >
                  Upgrade
                </NavLink>
              )}
              <NavLink
                to="/dashboard/profile"
                onClick={closeAll}
                className={mobileLinkClass}
              >
                Profile
              </NavLink>
              <NavLink
                to="/dashboard"
                end
                onClick={closeAll}
                className={mobileLinkClass}
              >
                Dashboard
              </NavLink>
              <button onClick={handleLogout} className="btn mt-3 w-full">
                Logout
              </button>
            </>
          ) : (
            <div className="mt-3 flex gap-3">
              <Link
                to="/login"
                onClick={closeAll}
                className="flex-1 rounded-lg border border-indigo-300 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Login
              </Link>
              <Link to="/register" onClick={closeAll} className="btn flex-1">
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
