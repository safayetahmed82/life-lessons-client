import { Navigate, useLocation } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ children }) => {
  const { data: session, isPending } = authClient.useSession();
  const location = useLocation();

  if (isPending) {
    return <Spinner />;
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;