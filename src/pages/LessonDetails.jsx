import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiBookmark, FiFlag, FiHeart, FiLock } from "react-icons/fi";
import useTitle from "../hooks/useTitle";
import Spinner from "../components/Spinner";
import CommentSection from "../components/CommentSection";
import ReportModal from "../components/ReportModal";

const API = import.meta.env.VITE_API_URL;

const LessonDetails = () => {
  useTitle("LifeLessons – Lesson Details");

  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [locked, setLocked] = useState(null);
  const [loading, setLoading] = useState(true);
  const [views] = useState(() => Math.floor(Math.random() * 10000));
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/api/lessons/${id}`, { credentials: "include" })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setLesson(data);
          setLocked(null);
        } else if (data.locked) {
          setLocked(data);
          setLesson(null);
        } else {
          setLesson(null);
          setLocked(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await fetch(`${API}/api/lessons/${id}/like`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setLesson({
          ...lesson,
          liked: data.liked,
          likesCount: data.likesCount,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleFavorite = async () => {
    try {
      const res = await fetch(`${API}/api/lessons/${id}/favorite`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setLesson({
          ...lesson,
          favorited: data.favorited,
          favoritesCount: data.favoritesCount,
        });
        toast.success(
          data.favorited ? "Saved to favorites" : "Removed from favorites",
        );
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

  if (locked) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="relative overflow-hidden rounded-xl border border-indigo-100 bg-white p-8 text-center shadow-sm">
          <div className="blur-sm">
            <h1 className="text-3xl font-semibold text-ink">{locked.title}</h1>
            <p className="mt-3 text-gray-600">
              {locked.category} · {locked.emotionalTone}
            </p>
            <p className="mt-6 text-gray-600">
              This story is hidden for free members. Upgrade to read the full
              lesson and every other premium lesson on the platform.
            </p>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/75 px-4">
            <FiLock className="text-4xl text-night" />
            <p className="text-lg font-semibold text-ink">
              Premium Lesson – Upgrade to view
            </p>
            <Link to="/pricing" className="btn">
              Upgrade to Premium
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="py-24 text-center">
        <p className="text-xl font-semibold text-ink">Lesson not found</p>
        <Link to="/public-lessons" className="btn mt-4">
          Browse Lessons
        </Link>
      </div>
    );
  }

  const words = lesson.description.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-3">
      <article className="lg:col-span-2">
        {lesson.image && (
          <img
            src={lesson.image}
            alt={lesson.title}
            className="h-72 w-full rounded-xl object-cover"
          />
        )}

        <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-night">
            {lesson.category}
          </span>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-night">
            {lesson.emotionalTone}
          </span>
          <span
            className={`rounded-full px-3 py-1 ${
              lesson.accessLevel === "Premium"
                ? "bg-gold text-night"
                : "bg-indigo-50 text-night"
            }`}
          >
            {lesson.accessLevel}
          </span>
        </div>

        <h1 className="mt-4 text-4xl font-semibold text-ink">{lesson.title}</h1>

        <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-gray-700">
          {lesson.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold ${
              lesson.liked
                ? "border-red-500 bg-red-50 text-red-600"
                : "border-gray-300 text-ink hover:bg-gray-50"
            }`}
          >
            <FiHeart className={lesson.liked ? "fill-current" : ""} />
            {lesson.liked ? "Liked" : "Like"}
          </button>

          <button
            onClick={handleFavorite}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold ${
              lesson.favorited
                ? "border-night bg-indigo-50 text-night"
                : "border-gray-300 text-ink hover:bg-gray-50"
            }`}
          >
            <FiBookmark className={lesson.favorited ? "fill-current" : ""} />
            {lesson.favorited ? "Saved" : "Save to Favorites"}
          </button>
          <button
            onClick={() => setShowReport(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-ink hover:bg-gray-50"
          >
            <FiFlag />
            Report
          </button>
        </div>
        <CommentSection lessonId={id} />

        {showReport && (
          <ReportModal lessonId={id} onClose={() => setShowReport(false)} />
        )}
      </article>

      <aside className="space-y-6">
        <div className="rounded-xl border border-indigo-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Engagement</h2>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xl font-semibold text-night">
                {lesson.likesCount}
              </p>
              <p className="text-xs text-gray-600">Likes</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-night">
                {lesson.favoritesCount}
              </p>
              <p className="text-xs text-gray-600">Favorites</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-night">{views}</p>
              <p className="text-xs text-gray-600">Views</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-indigo-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">About this lesson</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>Created: {new Date(lesson.createdAt).toLocaleDateString()}</li>
            <li>
              Last updated: {new Date(lesson.updatedAt).toLocaleDateString()}
            </li>
            <li>Visibility: {lesson.visibility}</li>
            <li>Reading time: {readingTime} min</li>
          </ul>
        </div>

        <div className="rounded-xl border border-indigo-100 bg-white p-5 text-center shadow-sm">
          <img
            src={lesson.creatorPhoto}
            alt={lesson.creatorName}
            className="mx-auto h-20 w-20 rounded-full border-2 border-gold object-cover"
          />
          <p className="mt-3 text-lg font-semibold text-ink">
            {lesson.creatorName}
          </p>
          <p className="text-sm text-gray-600">
            {lesson.authorLessonCount} lessons created
          </p>
          <Link to={`/author/${lesson.creatorId}`} className="btn mt-4 w-full">
            View all lessons by this author
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default LessonDetails;
