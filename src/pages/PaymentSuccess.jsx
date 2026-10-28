import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import Spinner from "../components/Spinner";

const API = import.meta.env.VITE_API_URL;

const PaymentSuccess = () => {
  useTitle("LifeLessons – Payment Successful");

  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch(`${API}/confirm-payment?session_id=${sessionId}`, {
      credentials: "include",
    })
      .then((res) => setStatus(res.ok ? "done" : "error"))
      .catch(() => setStatus("error"));
  }, [sessionId]);

  if (status === "checking") {
    return <Spinner />;
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      {status === "done" ? (
        <>
          <p className="text-6xl">⭐</p>
          <h1 className="mt-4 text-3xl font-semibold text-ink">
            Welcome to Premium
          </h1>
          <p className="mt-3 text-gray-600">
            Your payment went through. Every Premium lesson is now open to you.
          </p>
          <a href="/public-lessons" className="btn mt-8">
            Browse Lessons
          </a>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-semibold text-ink">
            We could not confirm your payment
          </h1>
          <p className="mt-3 text-gray-600">
            If money was taken, your upgrade will appear within a few minutes.
            Otherwise, please try again.
          </p>
          <Link to="/pricing" className="btn mt-8">
            Back to Pricing
          </Link>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;