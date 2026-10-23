import { Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";

const toneDots = {
  Motivational: "bg-amber-400",
  Sad: "bg-blue-500",
  Realization: "bg-violet-500",
  Gratitude: "bg-emerald-500",
};

const LessonCard = ({ lesson, canView }) => {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className={canView ? "" : "blur-sm"}>
        {lesson.image ? (
          <img
            src={lesson.image}
            alt={lesson.title}
            className="h-40 w-full object-cover"
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center bg-night-light">
            <span className="font-serif text-6xl text-gold">&ldquo;</span>
          </div>
        )}

        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${toneDots[lesson.emotionalTone] || "bg-gray-400"}`}
              ></span>
              {lesson.emotionalTone}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 font-semibold ${
                lesson.accessLevel === "Premium"
                  ? "bg-gold text-night"
                  : "bg-indigo-50 text-night"
              }`}
            >
              {lesson.accessLevel}
            </span>
          </div>

          <h3 className="line-clamp-2 text-lg font-semibold text-ink">
            {lesson.title}
          </h3>
          <p className="line-clamp-3 text-sm text-gray-600">
            {lesson.description}
          </p>
          <p className="text-xs font-medium text-night">{lesson.category}</p>

          <div className="mt-2 flex items-center gap-2">
            <img
              src={lesson.creatorPhoto}
              alt={lesson.creatorName}
              className="h-7 w-7 rounded-full object-cover"
            />
            <div className="text-xs text-gray-600">
              <p className="font-medium text-ink">{lesson.creatorName}</p>
              <p>{new Date(lesson.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 pt-0">
        {canView ? (
          <Link to={`/lessons/${lesson._id}`} className="btn w-full">
            See Details
          </Link>
        ) : null}
      </div>

      {!canView && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/70 px-4 text-center">
          <FiLock className="text-3xl text-night" />
          <p className="font-semibold text-ink">Premium Lesson – Upgrade to view</p>
          <Link to="/pricing" className="btn">
            Upgrade
          </Link>
        </div>
      )}
    </div>
  );
};

export default LessonCard;