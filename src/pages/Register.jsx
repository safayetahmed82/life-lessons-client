import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { authClient } from "../lib/auth-client";

const Register = () => {
  useTitle("LifeLessons – Register");

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must have an uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must have a lowercase letter");
      return;
    }
    setPasswordError("");

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL,
    });

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    toast.success("Registration successful! Welcome to LifeLessons.");
    navigate("/");
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-night focus:outline-none";

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-xl border border-indigo-100 bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-semibold text-ink">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Photo URL</label>
            <input
              type="text"
              required
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>

          <button type="submit" className="btn w-full py-3">
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-night">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;