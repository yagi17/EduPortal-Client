import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user.photoURL);

  const handleLogout = () => {
    logOut()
      .then(() => {})

  };

  const links = (
    <>
      <li className="group transition-all duration-100 ease-in-out">
        <NavLink
          className={`bg-left-bottom ml-1 bg-gradient-to-r from-[#1DA678] to-[#1DA678] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out`}
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li className="group transition-all duration-100 ease-in-out">
        <NavLink
          className={`bg-left-bottom ml-1 bg-gradient-to-r from-[#1DA678] to-[#1DA678] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out`}
          to={"/all-classes"}
        >
          All Classes
        </NavLink>
      </li>
      <li className="group transition-all duration-100 ease-in-out">
        <NavLink
          className={`bg-left-bottom ml-1 bg-gradient-to-r from-[#1DA678] to-[#1DA678] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out`}
          to={"/join-as-teacher"}
        >
          Teach on EduPortal
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar p-0 mx-auto bg-white">
      <div className="navbar p-0 max-w-4xl mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className=" flex flex-col justify-between space-y-4  text-sm font-bold dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"} className="text-xl cursor-pointer font-bold">
            EduPortal
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex justify-between space-x-10 px-1 text-sm font-bold">
            {links}
          </ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL || "User.svg"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-32"
              >
                <p className="text-[#1DA678] pl-3 font-semibold">
                  Hi,{" "}
                  <span className="uppercase">
                    {user.displayName.split(" ").slice(0, 1).join(" ")}
                  </span>
                </p>
                <li>
                  <Link to={"/dashboard"}>
                    <MdDashboard />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout} to={"/login"}>
                    <IoLogOutOutline /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn bg-[#1DA678] hover:bg-[#1DA678] text-white "
            >
              <IoLogInOutline /> Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
