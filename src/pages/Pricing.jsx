import { useState } from "react";
import toast from "react-hot-toast";
import { FiCheck, FiX } from "react-icons/fi";
import useTitle from "../hooks/useTitle";
import { authClient } from "../lib/auth-client";

const API = import.meta.env.VITE_API_URL;

const rows = [
  { feature: "Read free lessons", free: true, premium: true },
  { feature: "Like, save and comment", free: true, premium: true },
  { feature: "Create free lessons", free: true, premium: true },
  { feature: "Create Premium lessons", free: false, premium: true },
  { feature: "Read Premium lessons from other people", free: false, premium: true },
  { feature: "Premium ⭐ badge on your profile", free: false, premium: true },
  { feature: "Price", free: "Free", premium: "৳1500, one time" },
];

const Cell = ({ value }) => {
  if (value === true) return <FiCheck className="mx-auto text-xl text-emerald-600" />;
  if (value === false) return <FiX className="mx-auto text-xl text-gray-400" />;
  return <span className="font-semibold text-ink">{value}</span>;
};

const Pricing = () => {
  useTitle("LifeLessons – Upgrade to Premium");

  const { data: session } = authClient.useSession();
  const isPremium = session?.user?.isPremium === true;
  const [busy, setBusy] = useState(false);

  const handleUpgrade = async () => {
    setBusy(true);
    try {
      const res = await fetch(`${API}/create-checkout-session`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
        setBusy(false);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-center text-4xl font-semibold text-ink">
        Choose your plan
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-gray-600">
        Pay once and read every Premium lesson for life.
      </p>

      <div className="mt-10 overflow-x-auto rounded-xl border border-indigo-100 bg-white">
        <table className="w-full min-w-[480px] text-sm">
          <thead className="bg-night text-white">
            <tr>
              <th className="px-4 py-3 text-left">Feature</th>
              <th className="px-4 py-3 text-center">Free</th>
              <th className="px-4 py-3 text-center">Premium ⭐</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-t border-indigo-50">
                <td className="px-4 py-3 text-ink">{row.feature}</td>
                <td className="px-4 py-3 text-center">
                  <Cell value={row.free} />
                </td>
                <td className="px-4 py-3 text-center">
                  <Cell value={row.premium} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        {isPremium ? (
          <p className="inline-block rounded-full bg-gold px-5 py-2 font-semibold text-night">
            You are a Premium ⭐ member
          </p>
        ) : (
          <button onClick={handleUpgrade} disabled={busy} className="btn px-8 py-3 disabled:opacity-60">
            {busy ? "Opening payment..." : "Upgrade to Premium"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Pricing;