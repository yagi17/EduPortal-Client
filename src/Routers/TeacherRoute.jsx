import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useTeacher from "../Hooks/useTeacher";
import useAdmin from "../Hooks/useAdmin";

const TeacherRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isTeacher, isTeacherLoading] = useTeacher();

  if (loading || isTeacherLoading || isAdminLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center ">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  if (user && isTeacher || isAdmin) {
    return children;
  }
  return <Navigate to={"/dashboard"} />;
};

export default TeacherRoute;