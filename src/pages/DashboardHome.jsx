import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import Spinner from "../components/Spinner";

const API = import.meta.env.VITE_API_URL;

const DashboardHome = () => {
  useTitle("LifeLessons – Dashboard");

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/dashboard/stats`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setStats(data.week ? data : null);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Could not load your dashboard");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!stats) {
    return <p className="py-16 text-center text-gray-600">Could not load your dashboard.</p>;
  }

  const maxCount = Math.max(...stats.week.map((day) => day.count), 1);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-2 text-gray-600">A look at your lessons and activity.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-indigo-100 bg-white p-5">
          <p className="text-sm text-gray-600">Lessons created</p>
          <p className="mt-1 font-serif text-4xl font-semibold text-night">
            {stats.totalLessons}
          </p>
        </div>
        <div className="rounded-xl border border-indigo-100 bg-white p-5">
          <p className="text-sm text-gray-600">Lessons saved</p>
          <p className="mt-1 font-serif text-4xl font-semibold text-night">
            {stats.totalFavorites}
          </p>
        </div>
        <div className="rounded-xl border border-indigo-100 bg-white p-5">
          <p className="text-sm text-gray-600">Likes received</p>
          <p className="mt-1 font-serif text-4xl font-semibold text-night">
            {stats.totalLikes}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/dashboard/add-lesson" className="btn">
          Add a Lesson
        </Link>
        <Link
          to="/public-lessons"
          className="rounded-lg border border-night px-5 py-2.5 text-sm font-semibold text-night hover:bg-indigo-50"
        >
          Browse Public Lessons
        </Link>
        <Link
          to="/dashboard/my-favorites"
          className="rounded-lg border border-night px-5 py-2.5 text-sm font-semibold text-night hover:bg-indigo-50"
        >
          My Favorites
        </Link>
      </div>

      <div className="mt-8 rounded-xl border border-indigo-100 bg-white p-5">
        <h2 className="text-xl font-semibold text-ink">Lessons added this week</h2>
        <div className="mt-6 flex h-44 items-end gap-3">
          {stats.week.map((day) => (
            <div key={day.date} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <span className="text-xs font-semibold text-night">{day.count}</span>
              <div
                className="w-full max-w-[44px] rounded-t-md bg-night"
                style={{ height: `${Math.max((day.count / maxCount) * 100, 3)}%` }}
              ></div>
              <span className="text-xs text-gray-600">{day.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-indigo-100 bg-white p-5">
        <h2 className="text-xl font-semibold text-ink">Recently added</h2>
        {stats.recent.length === 0 ? (
          <p className="mt-3 text-gray-600">You have not written any lessons yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-indigo-50">
            {stats.recent.map((lesson) => (
              <li key={lesson._id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="font-medium text-ink">{lesson.title}</p>
                  <p className="text-xs text-gray-600">
                    {lesson.category} · {lesson.visibility} · {lesson.accessLevel} ·{" "}
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to={`/lessons/${lesson._id}`}
                  className="rounded-lg border border-night px-3 py-1 text-xs font-semibold text-night hover:bg-indigo-50"
                >
                  Details
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;