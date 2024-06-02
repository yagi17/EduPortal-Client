import { FaHome, FaList, FaSearch, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FiLogOut } from "react-icons/fi";
import useAdmin from "../Hooks/useAdmin";
import useTeacher from "../Hooks/useTeacher";
import { ImProfile } from "react-icons/im";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  console.log(user);
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();

  return (
    <div className="flex p-0">
      <div
        className={
          isAdmin
            ? "min-h-screen bg-green-500  w-52 h-screen py-10"
            : "min-h-screen bg-orange-400"
        }
      >
        {/* user avatar */}
        <div className="avatar mx-auto w-full text-center flex-col">
          <div className="w-24 mx-auto rounded-full">
            <img src={user?.photoURL || "User.svg"} />
          </div>
          <h2 className="text-black p-2 text-xs uppercase">
            Welcome Back {user.displayName.split(" ").slice(0, 1).join(" ")}
          </h2>
        </div>
        <ul className="flex flex-col justify-between gap-4 px-10 text-sm">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  className={`flex font-semibold items-center gap-2`}
                  to={"admin-home"}
                >
                  <FaHome />
                  Teacher Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`flex font-semibold items-center gap-2`}
                  to={"admin-home"}
                >
                  <FaUsers />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`flex font-semibold items-center gap-2`}
                  to={"admin-home"}
                >
                  <FaList />
                  All classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`flex font-semibold items-center gap-2`}
                  to={"admin-home"}
                >
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
            </>
          ) : isTeacher ? (
            <>this is teacher</>
          ) : (
            <>this is user</>
          )}

          <li>
            <NavLink
              className={`flex font-semibold items-center gap-2`}
              to={"admin-home"}
            >
              <ImProfile />
              My Profile
            </NavLink>
          </li>

          {/* shared nav links */}
          <div className="divider"></div>

          <li>
            <NavLink
              className={`flex font-semibold items-center gap-2`}
              to={"/"}
            >
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`flex font-semibold items-center gap-2`}
              to={"/all-classes"}
            >
              <FaSearch /> All Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`flex font-semibold items-center gap-2`}
              onClick={handleLogout}
              to={"/login"}
            >
              <FiLogOut />
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 px-16">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
