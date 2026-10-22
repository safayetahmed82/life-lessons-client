import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { authClient } from "../lib/auth-client";
import LessonForm from "../components/LessonForm";

const AddLesson = () => {
  useTitle("LifeLessons – Add Lesson");

  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const isPremium = session?.user?.isPremium === true;

  const handleSubmit = async (form) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Lesson added successfully");
        navigate("/dashboard/my-lessons");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-xl border border-indigo-100 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-ink">Add a Life Lesson</h1>
        <p className="mt-2 text-gray-600">Write down something life taught you.</p>

        <LessonForm
          initialValues={{
            title: "",
            description: "",
            category: "Personal Growth",
            emotionalTone: "Motivational",
            image: "",
            visibility: "Public",
            accessLevel: "Free",
          }}
          onSubmit={handleSubmit}
          buttonText="Add Lesson"
          isPremium={isPremium}
        />
      </div>
    </div>
  );
};

export default AddLesson;