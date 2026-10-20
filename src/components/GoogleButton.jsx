import { FcGoogle } from "react-icons/fc";
import { authClient } from "../lib/auth-client";

const GoogleButton = ({ redirectTo = "/" }) => {
  const handleClick = () => {
    authClient.signIn.social({
      provider: "google",
      callbackURL: window.location.origin + redirectTo,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gray-50"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
};

export default GoogleButton;