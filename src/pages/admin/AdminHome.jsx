import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import { apiRequest } from "../../lib/api";
import Spinner from "../../components/Spinner";
import MiniBarChart from "../../components/MiniBarChart";

const AdminHome = () => {
  useTitle("LifeLessons – Admin Dashboard");

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/api/admin/stats").then(({ ok, data }) => {
      setStats(ok ? data : null);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!stats) {
    return <p className="py-16 text-center text-gray-600">Could not load the admin dashboard.</p>;
  }

  const cards = [
    { label: "Total users", value: stats.totalUsers },
    { label: "Public lessons", value: stats.publicLessons },
    { label: "Reported lessons", value: stats.reportedLessons },
    { label: "New lessons today", value: stats.todayLessons },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-ink">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">A look at the whole platform.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-indigo-100 bg-white p-5">
            <p className="text-sm text-gray-600">{card.label}</p>
            <p className="mt-1 font-serif text-4xl font-semibold text-night">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-indigo-100 bg-white p-5">
          <h2 className="text-xl font-semibold text-ink">Lesson growth (7 days)</h2>
          <MiniBarChart data={stats.lessonGrowth} />
        </div>
        <div className="rounded-xl border border-indigo-100 bg-white p-5">
          <h2 className="text-xl font-semibold text-ink">User growth (7 days)</h2>
          <MiniBarChart data={stats.userGrowth} />
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-indigo-100 bg-white p-5">
        <h2 className="text-xl font-semibold text-ink">Most active contributors this week</h2>
        {stats.contributors.length === 0 ? (
          <p className="mt-3 text-gray-600">No lessons were written this week.</p>
        ) : (
          <ul className="mt-3 divide-y divide-indigo-50">
            {stats.contributors.map((person) => (
              <li key={person._id} className="flex items-center justify-between py-3">
                <span className="flex items-center gap-3">
                  <img src={person.photo} alt={person.name} className="h-9 w-9 rounded-full object-cover" />
                  <span className="font-medium text-ink">{person.name}</span>
                </span>
                <span className="text-sm text-gray-600">{person.count} lessons</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminHome;