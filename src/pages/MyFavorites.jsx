import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import Spinner from "../components/Spinner";

const API = import.meta.env.VITE_API_URL;

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];
const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

const MyFavorites = () => {
  useTitle("LifeLessons – My Favorites");

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");

  useEffect(() => {
    fetch(`${API}/api/lessons/favorites/mine`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setLessons(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Could not load your favorites");
        setLoading(false);
      });
  }, []);

  const handleRemove = async (id) => {
    try {
      const res = await fetch(`${API}/api/lessons/${id}/favorite`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setLessons(lessons.filter((lesson) => lesson._id !== id));
        toast.success("Removed from favorites");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const shown = lessons.filter(
    (lesson) =>
      (!category || lesson.category === category) &&
      (!tone || lesson.emotionalTone === tone)
  );

  const selectClass =
    "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-night focus:outline-none";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink">My Favorites</h1>
      <p className="mt-2 text-gray-600">Lessons you saved to read again.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectClass}
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className={selectClass}
        >
          <option value="">All emotional tones</option>
          {tones.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {shown.length === 0 ? (
        <div className="mt-10 rounded-xl border border-indigo-100 bg-white p-10 text-center">
          <p className="text-gray-600">
            {lessons.length === 0
              ? "You have not saved any lessons yet."
              : "No saved lessons match these filters."}
          </p>
          <Link to="/public-lessons" className="btn mt-4">
            Browse Lessons
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-indigo-100 bg-white">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-night text-white">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Tone</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((lesson) => (
                <tr key={lesson._id} className="border-t border-indigo-50">
                  <td className="max-w-[240px] truncate px-4 py-3 font-medium text-ink">
                    {lesson.title}
                  </td>
                  <td className="px-4 py-3">{lesson.category}</td>
                  <td className="px-4 py-3">{lesson.emotionalTone}</td>
                  <td className="px-4 py-3">{lesson.creatorName}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/lessons/${lesson._id}`}
                        className="rounded-lg border border-night px-3 py-1 text-xs font-semibold text-night hover:bg-indigo-50"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleRemove(lesson._id)}
                        className="rounded-lg border border-red-600 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFavorites;