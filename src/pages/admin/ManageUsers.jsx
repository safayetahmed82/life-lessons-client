import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useTitle from "../../hooks/useTitle";
import { authClient } from "../../lib/auth-client";
import { apiRequest } from "../../lib/api";
import Spinner from "../../components/Spinner";

const ManageUsers = () => {
  useTitle("LifeLessons – Manage Users");

  const { data: session } = authClient.useSession();
  const myId = session?.user?.id;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/api/admin/users").then(({ ok, data }) => {
      setUsers(ok && Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  const changeRole = async (user, role) => {
    const { ok, data } = await apiRequest(`/api/admin/users/${user._id}/role`, "PATCH", { role });

    if (ok) {
      setUsers(users.map((item) => (item._id === user._id ? { ...item, role } : item)));
      toast.success("Role updated");
    } else {
      toast.error(data.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-ink">Manage Users</h1>
      <p className="mt-2 text-gray-600">{users.length} registered users.</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-indigo-100 bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-night text-white">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Lessons</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-indigo-50">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-3">
                    <img src={user.image} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                    <span className="font-medium text-ink">{user.name}</span>
                  </span>
                </td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === "admin" ? "bg-night text-white" : "bg-indigo-50 text-night"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">{user.isPremium ? "Premium ⭐" : "Free"}</td>
                <td className="px-4 py-3">{user.totalLessons}</td>
                <td className="px-4 py-3">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => changeRole(user, "user")}
                      disabled={user._id === myId}
                      className="rounded-lg border border-night px-3 py-1 text-xs font-semibold text-night hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Make user
                    </button>
                  ) : (
                    <button
                      onClick={() => changeRole(user, "admin")}
                      className="rounded-lg border border-night px-3 py-1 text-xs font-semibold text-night hover:bg-indigo-50"
                    >
                      Make admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;