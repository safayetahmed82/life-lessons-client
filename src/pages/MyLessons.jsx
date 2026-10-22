import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { authClient } from "../lib/auth-client";
import Spinner from "../components/Spinner";
import ConfirmModal from "../components/ConfirmModal";

const API = import.meta.env.VITE_API_URL;

const MyLessons = () => {
  useTitle("LifeLessons – My Lessons");

  const { data: session } = authClient.useSession();
  const isPremium = session?.user?.isPremium === true;

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/lessons/mine`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setLessons(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Could not load your lessons");
        setLoading(false);
      });
  }, []);

  const updateField = async (id, changes) => {
    try {
      const res = await fetch(`${API}/api/lessons/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(changes),
      });
      const data = await res.json();

      if (res.ok) {
        setLessons(
          lessons.map((l) => (l._id === id ? { ...l, ...changes } : l))
        );
        toast.success("Lesson updated");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API}/api/lessons/${deleteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setLessons(lessons.filter((l) => l._id !== deleteId));
        toast.success("Lesson deleted successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
    setDeleteId(null);
  };

  if (loading) {
    return <Spinner />;
  }

  const selectClass =
    "rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm disabled:cursor-not-allowed disabled:bg-gray-100";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-ink">My Lessons</h1>
          <p className="mt-2 text-gray-600">Every lesson you have written.</p>
        </div>
        <Link to="/dashboard/add-lesson" className="btn">
          Add Lesson
        </Link>
      </div>

      {lessons.length === 0 ? (
        <div className="mt-10 rounded-xl border border-indigo-100 bg-white p-10 text-center">
          <p className="text-gray-600">You have not written any lessons yet.</p>
          <Link to="/dashboard/add-lesson" className="btn mt-4">
            Write Your First Lesson
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-indigo-100 bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-night text-white">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Visibility</th>
                <th className="px-4 py-3">Access</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Likes</th>
                <th className="px-4 py-3">Saves</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id} className="border-t border-indigo-50">
                  <td className="max-w-[220px] truncate px-4 py-3 font-medium text-ink">
                    {lesson.title}
                  </td>
                  <td className="px-4 py-3">{lesson.category}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lesson.visibility}
                      onChange={(e) =>
                        updateField(lesson._id, { visibility: e.target.value })
                      }
                      className={selectClass}
                    >
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={lesson.accessLevel}
                      disabled={!isPremium}
                      title={isPremium ? "" : "Upgrade to Premium to change this"}
                      onChange={(e) =>
                        updateField(lesson._id, { accessLevel: e.target.value })
                      }
                      className={selectClass}
                    >
                      <option value="Free">Free</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{lesson.likesCount}</td>
                  <td className="px-4 py-3">{lesson.favoritesCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/lessons/${lesson._id}`}
                        className="rounded-lg border border-night px-3 py-1 text-xs font-semibold text-night hover:bg-indigo-50"
                      >
                        Details
                      </Link>
                      <Link
                        to={`/dashboard/update-lesson/${lesson._id}`}
                        className="rounded-lg border border-night px-3 py-1 text-xs font-semibold text-night hover:bg-indigo-50"
                      >
                        Update
                      </Link>
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
          message="This will permanently remove the lesson. This cannot be undone."
          confirmText="Yes, delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default MyLessons;