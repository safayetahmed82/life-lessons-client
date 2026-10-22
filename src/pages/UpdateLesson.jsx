import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { authClient } from "../lib/auth-client";
import Spinner from "../components/Spinner";
import LessonForm from "../components/LessonForm";

const API = import.meta.env.VITE_API_URL;

const UpdateLesson = () => {
  useTitle("LifeLessons – Update Lesson");

  const { id } = useParams();
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const isPremium = session?.user?.isPremium === true;

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/lessons/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setLesson(data.title ? data : null);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (form) => {
    try {
      const res = await fetch(`${API}/api/lessons/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Lesson updated successfully");
        navigate("/dashboard/my-lessons");
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

  if (!lesson) {
    return (
      <p className="py-24 text-center text-gray-600">Lesson not found.</p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-xl border border-indigo-100 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-ink">Update Lesson</h1>

        <LessonForm
          initialValues={{
            title: lesson.title,
            description: lesson.description,
            category: lesson.category,
            emotionalTone: lesson.emotionalTone,
            image: lesson.image || "",
            visibility: lesson.visibility,
            accessLevel: lesson.accessLevel,
          }}
          onSubmit={handleSubmit}
          buttonText="Update Lesson"
          isPremium={isPremium}
        />
      </div>
    </div>
  );
};

export default UpdateLesson;