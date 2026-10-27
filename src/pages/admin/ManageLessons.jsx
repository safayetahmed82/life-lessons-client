import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../../hooks/useTitle";
import { apiRequest } from "../../lib/api";
import Spinner from "../../components/Spinner";
import ConfirmModal from "../../components/ConfirmModal";

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const ManageLessons = () => {
  useTitle("LifeLessons – Manage Lessons");

  const [lessons, setLessons] = useState([]);
  const [counts, setCounts] = useState({ public: 0, private: 0, flagged: 0 });
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("");
  const [flagged, setFlagged] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const load = async () => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (visibility) params.set("visibility", visibility);
    if (flagged) params.set("flagged", "true");

    const { ok, data } = await apiRequest(`/api/admin/lessons?${params.toString()}`);
    if (ok) {
      setLessons(data.lessons);
      setCounts(data.counts);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [category, visibility, flagged]);

  const toggleFeatured = async (lesson) => {
    const next = !lesson.isFeatured;
    const { ok, data } = await apiRequest(
      `/api/admin/lessons/${lesson._id}/featured`,
      "PATCH",
      { isFeatured: next }
    );

    if (ok) {
      setLessons(lessons.map((item) => (item._id === lesson._id ? { ...item, isFeatured: next } : item)));
      toast.success(next ? "Marked as featured" : "Removed from featured");
    } else {
      toast.error(data.message);
    }
  };

  const markReviewed = async (lesson) => {
    const { ok, data } = await apiRequest(`/api/admin/lessons/${lesson._id}/reviewed`, "PATCH");

    if (ok) {
      setLessons(lessons.map((item) => (item._id === lesson._id ? { ...item, isReviewed: true } : item)));
      toast.success("Marked as reviewed");
    } else {
      toast.error(data.message);
    }
  };

  const handleDelete = async () => {
    const { ok, data } = await apiRequest(`/api/lessons/${deleteId}`, "DELETE");

    if (ok) {
      setLessons(lessons.filter((item) => item._id !== deleteId));
      toast.success("Lesson deleted successfully");
    } else {
      toast.error(data.message);
    }
    setDeleteId(null);
  };

  const selectClass =
    "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-night focus:outline-none";

  return (
    <div>
      <h1 className="text-3xl font-semibold text-ink">Manage Lessons</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-indigo-100 bg-white p-4">
          <p className="text-sm text-gray-600">Public lessons</p>
          <p className="font-serif text-3xl font-semibold text-night">{counts.public}</p>
        </div>
        <div className="rounded-xl border border-indigo-100 bg-white p-4">
          <p className="text-sm text-gray-600">Private lessons</p>
          <p className="font-serif text-3xl font-semibold text-night">{counts.private}</p>
        </div>
        <div className="rounded-xl border border-indigo-100 bg-white p-4">
          <p className="text-sm text-gray-600">Flagged lessons</p>
          <p className="font-serif text-3xl font-semibold text-night">{counts.flagged}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className={selectClass}>
          <option value="">Public and private</option>
          <option value="Public">Public only</option>
          <option value="Private">Private only</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={flagged} onChange={(e) => setFlagged(e.target.checked)} />
          Flagged only
        </label>
      </div>

      {loading ? (
        <Spinner />
      ) : lessons.length === 0 ? (
        <p className="py-12 text-center text-gray-600">No lessons match these filters.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-indigo-100 bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-night text-white">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Creator</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Visibility</th>
                <th className="px-4 py-3">Reports</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id} className="border-t border-indigo-50">
                  <td className="max-w-[200px] truncate px-4 py-3 font-medium text-ink">{lesson.title}</td>
                  <td className="px-4 py-3">{lesson.creatorName}</td>
                  <td className="px-4 py-3">{lesson.category}</td>
                  <td className="px-4 py-3">{lesson.visibility}</td>
                  <td className="px-4 py-3">{lesson.reportCount}</td>
                  <td className="px-4 py-3">
                    {lesson.isFeatured && (
                      <span className="mr-1 rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-night">
                        Featured
                      </span>
                    )}
                    {lesson.isReviewed && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        Reviewed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/lessons/${lesson._id}`}
                        className="rounded-lg border border-night px-3 py-1 text-xs font-semibold text-night hover:bg-indigo-50"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => toggleFeatured(lesson)}
                        className="rounded-lg border border-night px-3 py-1 text-xs font-semibold text-night hover:bg-indigo-50"
                      >
                        {lesson.isFeatured ? "Unfeature" : "Feature"}
                      </button>
                      {!lesson.isReviewed && (
                        <button
                          onClick={() => markReviewed(lesson)}
                          className="rounded-lg border border-night px-3 py-1 text-xs font-semibold text-night hover:bg-indigo-50"
                        >
                          Mark reviewed
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteId(lesson._id)}
                        className="rounded-lg border border-red-600 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteId && (
        <ConfirmModal
          title="Delete this lesson?"
          message="This permanently removes the lesson, along with its comments, saves and reports."
          confirmText="Yes, delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ManageLessons;