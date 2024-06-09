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

  const dashboardLinks = (
    <>
      <div
        className={
          isAdmin
            ? " bg-green-500 sticky w-52 min-h-screen py-10"
            : isTeacher
            ? " bg-[#FFF1E7] w-52 min-h-screen py-10"
            : "bg-[#DFE1FB] w-52 min-h-screen py-10"
        }
      >
        {/* user avatar */}
        <div className="avatar mx-auto w-full text-center  flex-col">
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
            <>
              <li>
                <NavLink
                  className={`flex font-semibold items-center gap-2`}
                  to={"my-enrolled-class"}
                >
                  <FaRegFileAlt />
                  My Enroll Class
                </NavLink>
              </li>
            </>
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
    </>
  );

  return (
    <div className="lg:flex p-0">
      <div className="navbar bg-base-100 lg:hidden flex">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm bg- dropdown-content mt-3 z-[1] shadow bg-base-100 rounded-box"
            >
              {dashboardLinks}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Dashboard</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>

      <div className="dashboard-links-container hidden lg:flex scr top-0 left-0 min-h-screen overflow-y-auto z-50">
        {dashboardLinks}
      </div>
      <div className="flex-1 lg:ml-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
