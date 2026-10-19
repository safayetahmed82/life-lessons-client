import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const NotFound = () => {
  useTitle("LifeLessons – Page Not Found");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-night px-4 text-center">
      <p className="font-serif text-8xl font-semibold text-gold">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">Page not found</h1>
      <p className="mt-2 max-w-md text-indigo-200">
        Some lessons take a wrong turn. This page doesn't exist, but the rest
        of the site does.
      </p>
      <Link to="/" className="btn mt-8">Back to Home</Link>
    </div>
  );
};

export default NotFound;