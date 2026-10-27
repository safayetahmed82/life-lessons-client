import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useTitle from "../../hooks/useTitle";
import { apiRequest } from "../../lib/api";
import Spinner from "../../components/Spinner";
import ConfirmModal from "../../components/ConfirmModal";

const ReportedLessons = () => {
  useTitle("LifeLessons – Reported Lessons");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    apiRequest("/api/admin/reports").then(({ ok, data }) => {
      setItems(ok && Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  const handleIgnore = async (lessonId) => {
    const { ok, data } = await apiRequest(`/api/admin/reports/${lessonId}`, "DELETE");

    if (ok) {
      setItems(items.filter((item) => item._id !== lessonId));
      toast.success("Reports cleared. The lesson stays live.");
    } else {
      toast.error(data.message);
    }
  };

  const handleDelete = async () => {
    const { ok, data } = await apiRequest(`/api/lessons/${deleteId}`, "DELETE");

    if (ok) {
      setItems(items.filter((item) => item._id !== deleteId));
      toast.success("Lesson deleted successfully");
    } else {
      toast.error(data.message);
    }
    setDeleteId(null);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-ink">Reported Lessons</h1>
      <p className="mt-2 text-gray-600">Lessons that people have flagged for review.</p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-indigo-100 bg-white p-10 text-center text-gray-600">
          No lessons have been reported.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-indigo-100 bg-white">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-night text-white">
              <tr>
                <th className="px-4 py-3">Lesson</th>
                <th className="px-4 py-3">Reports</th>
                <th className="px-4 py-3">Reasons</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-indigo-50">
                  <td className="max-w-[240px] truncate px-4 py-3 font-medium text-ink">
                    {item.lessonTitle}
                  </td>
                  <td className="px-4 py-3">{item.count}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setViewing(item)}
                      className="rounded-lg border border-night px-3 py-1 text-xs font-semibold text-night hover:bg-indigo-50"
                    >
                      View reasons
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDeleteId(item._id)}
                        className="rounded-lg border border-red-600 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete lesson
                      </button>
                      <button
                        onClick={() => handleIgnore(item._id)}
                        className="rounded-lg border border-night px-3 py-1 text-xs font-semibold text-night hover:bg-indigo-50"
                      >
                        Ignore
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-ink">{viewing.lessonTitle}</h2>
            <p className="text-sm text-gray-600">{viewing.count} reports</p>

            <ul className="mt-4 space-y-3">
              {viewing.reports.map((report, index) => (
                <li key={index} className="rounded-lg border border-indigo-100 p-3 text-sm">
                  <p className="font-semibold text-ink">{report.reason}</p>
                  <p className="text-gray-600">
                    {report.reporterName} ({report.reporterEmail})
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(report.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right">
              <button
                onClick={() => setViewing(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <ConfirmModal
          title="Delete this lesson?"
          message="This permanently removes the lesson from the platform."
          confirmText="Yes, delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ReportedLessons;