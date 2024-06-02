import { FaHome, FaSearch } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex">
      <div className="border w-52 h-screen py-10">
        <div className="avatar mx-auto w-full text-center flex-col">
          <div className="w-24 mx-auto rounded-full">
            <img src={user?.photoURL} />
          </div>
          <h2 className="text-black p-2 uppercase border">{user.displayName}</h2>
        </div>
        <ul className="flex flex-col justify-between gap-4 px-10 text-sm">
          {/* shared nav links */}
          <div className="divider"></div>

          <li className="group transition-all duration-100 ease-in-out">
            <NavLink
              className={`bg-left-bottom ml-1 bg-gradient-to-r from-[#1DA678] to-[#1DA678] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out flex items-center gap-2`}
              to={"/"}
            >
              <FaHome /> Home
            </NavLink>
          </li>
          <li className="group transition-all duration-100 ease-in-out">
            <NavLink
              className={`bg-left-bottom ml-1 bg-gradient-to-r from-[#1DA678] to-[#1DA678] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out flex items-center gap-2`}
              to={"/all-classes"}
            >
              <FaSearch /> All Classes
            </NavLink>
          </li>
          <li className="group transition-all duration-100 ease-in-out">
            <NavLink
              className={`bg-left-bottom ml-1 bg-gradient-to-r from-[#1DA678] to-[#1DA678] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out flex items-center gap-2`}
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
