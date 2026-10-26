import { useState } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const reasons = [
  "Inappropriate Content",
  "Hate Speech or Harassment",
  "Misleading or False Information",
  "Spam or Promotional Content",
  "Sensitive or Disturbing Content",
  "Other",
];

const ReportModal = ({ lessonId, onClose }) => {
  const [reason, setReason] = useState(reasons[0]);

  const handleReport = async () => {
    try {
      const res = await fetch(`${API}/api/lessons/${lessonId}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Thank you. The lesson has been reported.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-ink">Report this lesson?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Tell us why this lesson should be reviewed.
        </p>

        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-night focus:outline-none"
        >
          {reasons.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleReport}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;