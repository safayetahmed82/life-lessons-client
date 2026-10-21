import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { authClient } from "../lib/auth-client";

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];
const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

const AddLesson = () => {
  useTitle("LifeLessons – Add Lesson");

  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const isPremium = session?.user?.isPremium === true;

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: categories[0],
    emotionalTone: tones[0],
    image: "",
    visibility: "Public",
    accessLevel: "Free",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-night focus:outline-none";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-xl border border-indigo-100 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-ink">Add a Life Lesson</h1>
        <p className="mt-2 text-gray-600">
          Write down something life taught you.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Lesson Title</label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Full Description / Story / Insight
            </label>
            <textarea
              name="description"
              required
              rows="6"
              value={form.description}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Emotional Tone
              </label>
              <select
                name="emotionalTone"
                value={form.emotionalTone}
                onChange={handleChange}
                className={inputClass}
              >
                {tones.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Image URL (optional)
            </label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Visibility</label>
              <select
                name="visibility"
                value={form.visibility}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Access Level</label>
              <select
                name="accessLevel"
                value={isPremium ? form.accessLevel : "Free"}
                onChange={handleChange}
                disabled={!isPremium}
                title={
                  isPremium ? "" : "Upgrade to Premium to create paid lessons."
                }
                className={`${inputClass} disabled:cursor-not-allowed disabled:bg-gray-100`}
              >
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
              </select>
              {!isPremium && (
                <p className="mt-1 text-xs text-gray-500">
                  Upgrade to Premium to create paid lessons.
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="btn w-full py-3">
            Add Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;