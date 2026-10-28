import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const PaymentCancel = () => {
  useTitle("LifeLessons – Payment Cancelled");

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-ink">Payment cancelled</h1>
      <p className="mt-3 text-gray-600">
        No money was taken. You can upgrade whenever you are ready.
      </p>
      <Link to="/pricing" className="btn mt-8">
        Back to Pricing
      </Link>
    </div>
  );
};

export default PaymentCancel;