import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
        <p>You're almost there! </p>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location?.pathname || "/"} to="/login"></Navigate>;
};

export default PrivateRoute;