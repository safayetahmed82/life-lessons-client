import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { authClient } from "../lib/auth-client";
import Spinner from "../components/Spinner";
import LessonCard from "../components/LessonCard";

const API = import.meta.env.VITE_API_URL;

const Profile = () => {
  useTitle("LifeLessons – Profile");

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [stats, setStats] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    Promise.all([
      fetch(`${API}/api/dashboard/stats`, { credentials: "include" }).then((r) => r.json()),
      fetch(`${API}/api/lessons/author/${user.id}`).then((r) => r.json()),
    ])
      .then(([statsData, authorData]) => {
        setStats(statsData);
        setLessons(Array.isArray(authorData.lessons) ? authorData.lessons : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [user?.id]);

  const handleSave = async (e) => {
    e.preventDefault();

    const { error } = await authClient.updateUser({ name, image });

    if (error) {
      toast.error(error.message || "Could not update your profile");
      return;
    }

    await fetch(`${API}/api/dashboard/sync-profile`, {
      method: "POST",
      credentials: "include",
    });
    toast.success("Profile updated");
  };

  if (!user || loading) {
    return <Spinner />;
  }

  const isPremium = user.isPremium === true;
  const isAdmin = user.role === "admin";

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-night focus:outline-none";

  return (
    <div>
      <h1 className="text-3xl font-semibold text-ink">Profile</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-indigo-100 bg-white p-6 text-center">
          <img
            src={user.image}
            alt={user.name}
            className="mx-auto h-28 w-28 rounded-full border-4 border-gold object-cover"
          />
          <p className="mt-3 text-xl font-semibold text-ink">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {isPremium && (
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-night">
                Premium ⭐
              </span>
            )}
            {isAdmin && (
              <span className="rounded-full bg-night px-3 py-1 text-xs font-semibold text-white">
                Admin
              </span>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 text-center">
            <div>
              <p className="text-2xl font-semibold text-night">{stats?.totalLessons ?? 0}</p>
              <p className="text-xs text-gray-600">Lessons created</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-night">{stats?.totalFavorites ?? 0}</p>
              <p className="text-xs text-gray-600">Lessons saved</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-xl border border-indigo-100 bg-white p-6 lg:col-span-2"
        >
          <h2 className="text-xl font-semibold text-ink">Update your details</h2>

          <div>
            <label className="mb-1 block text-sm font-medium">Display name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Photo URL</label>
            <input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className={`${inputClass} cursor-not-allowed bg-gray-100`}
            />
            <p className="mt-1 text-xs text-gray-500">Email cannot be changed.</p>
          </div>

          <button type="submit" className="btn">
            Save Changes
          </button>
        </form>
      </div>

      <h2 className="mt-10 text-2xl font-semibold text-ink">
        Your public lessons
      </h2>
      {lessons.length === 0 ? (
        <p className="mt-4 text-gray-600">You have not shared any public lessons yet.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} canView={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;