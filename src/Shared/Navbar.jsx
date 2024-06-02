import { CgProfile } from "react-icons/cg";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Routers/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  console.log(user);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-classes"}>All Classes</NavLink>
      </li>
      <li>
        <NavLink to={"/join-as-teacher"}>Teach on EduPortal</NavLink>
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="text-xl cursor-pointer font-bold">EduPortal</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold">{links}</ul>
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
                    src={user?.photoURL || "User.svg"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-32"
              >
                <p className="text-center">{user.displayName}</p>

                <li>
                  <Link>
                    <CgProfile />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link>
                    <MdDashboard />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout} to={'/login'}>
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
