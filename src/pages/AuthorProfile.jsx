import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { authClient } from "../lib/auth-client";
import Spinner from "../components/Spinner";
import LessonCard from "../components/LessonCard";

const API = import.meta.env.VITE_API_URL;

const AuthorProfile = () => {
  useTitle("LifeLessons – Author");

  const { id } = useParams();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isPremium = user?.isPremium === true;

  const [author, setAuthor] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/api/lessons/author/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data.author || null);
        setLessons(Array.isArray(data.lessons) ? data.lessons : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!author) {
    return (
      <div className="py-24 text-center">
        <p className="text-xl font-semibold text-ink">Author not found</p>
        <Link to="/public-lessons" className="btn mt-4">
          Browse Lessons
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-night px-6 py-10 text-center">
        <img
          src={author.image}
          alt={author.name}
          className="h-24 w-24 rounded-full border-4 border-gold object-cover"
        />
        <h1 className="text-3xl font-semibold text-white">{author.name}</h1>
        {author.isPremium && (
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-night">
            Premium ⭐
          </span>
        )}
        <p className="text-indigo-200">{lessons.length} public lessons</p>
      </div>

      {lessons.length === 0 ? (
        <p className="py-16 text-center text-gray-600">
          This author has not shared any public lessons yet.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              canView={
                lesson.accessLevel !== "Premium" ||
                isPremium ||
                lesson.creatorId === user?.id
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorProfile;