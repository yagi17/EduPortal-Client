import {
  FaHome,
  FaList,
  FaRegAddressCard,
  FaRegFileAlt,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FiLogOut } from "react-icons/fi";
import useAdmin from "../Hooks/useAdmin";
import useTeacher from "../Hooks/useTeacher";
import { MdAddCircleOutline } from "react-icons/md";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  // console.log(user);
  const handleLogout = () => {
    logOut().then(() => {});
  };

  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();
  // #DFE1FB

  return (
    <div className="flex p-0">
      <div
        className={
          isAdmin
            ? " bg-green-500  w-52 min-h-screen py-10"
            : isTeacher
            ? " bg-[#FFF1E7]   w-52 min-h-screen py-10"
            : "bg-[#DFE1FB]   w-52 min-h-screen py-10"
        }
      >
        {/* user avatar */}
        <div className="avatar mx-auto w-full text-center flex-col">
          <div className="w-24 mx-auto rounded-full">
            <img src={user?.photoURL || "User.svg"} />
          </div>
          <h2 className="text-black p-2 text-xs uppercase">
            Welcome{" "}
            {user?.displayName
              ? user.displayName.split(" ").slice(0, 2).join(" ")
              : "Back"}
          </h2>
        </div>
        <ul className="flex flex-col justify-between gap-4 px-10 text-sm">
          {/* Admin Dashboard */}
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  className={`flex font-semibold items-center gap-2`}
                  to={"all-users"}
                >
                  <FaUsers />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`flex font-semibold items-center gap-2`}
                  to={"teacher-requests"}
                >
                  <FaHome />
                  Teacher Request
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={`flex font-semibold items-center gap-2`}
                  to={"classes"}
                >
                  <FaList />
                  All Classes
                </NavLink>
              </li>
            </>
          ) : isTeacher ? (
            <>
              <li>
                <NavLink
                  className={`flex font-semibold items-center gap-2`}
                  to={"add-class"}
                >
                  <MdAddCircleOutline />
                  Add Class
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`flex font-semibold items-center gap-2`}
                  to={"my-classes"}
                >
                  <FaRegFileAlt />
                  My Classes
                </NavLink>
              </li>
            </>
          ) : (
            <>this is user</>
          )}

          <li>
            <NavLink
              className={`flex font-semibold items-center gap-2`}
              to={"/dashboard"}
            >
              <FaRegAddressCard />
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
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
