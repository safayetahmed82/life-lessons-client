import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const CommentSection = ({ lessonId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`${API}/api/lessons/${lessonId}/comments`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch(() => setComments([]));
  }, [lessonId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/lessons/${lessonId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      });
      const data = await res.json();

      if (res.ok) {
        setComments([data, ...comments]);
        setText("");
        toast.success("Comment posted");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-ink">
        Comments ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          rows="3"
          maxLength="500"
          placeholder="Share what this lesson made you think of"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-night focus:outline-none"
        />
        <button type="submit" className="btn mt-3">
          Post Comment
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-600">No comments yet. Be the first to write one.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-3 rounded-xl border border-indigo-100 bg-white p-4"
            >
              <img
                src={comment.userPhoto}
                alt={comment.userName}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-ink">
                  {comment.userName}
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p className="mt-1 whitespace-pre-line text-sm text-gray-700">
                  {comment.text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;