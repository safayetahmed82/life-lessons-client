import { Navigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import Spinner from "../components/Spinner";

const AdminRoute = ({ children }) => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Spinner />;
  }

  if (session?.user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;