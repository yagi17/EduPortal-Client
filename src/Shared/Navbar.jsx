import { CgProfile } from "react-icons/cg";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const links = (
    <>

      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/all-classes'}>All Classes</NavLink>
      </li>
      <li>
        <NavLink to={'/join-as-teacher'}>Teach on EduPortal</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 max-w-4xl mx-auto ">
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
        <a className="text-xl cursor-pointer">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-32"
          >
            <p className="text-center">Name</p>

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
              <Link>
                <IoLogOutOutline /> Logout
              </Link>
            </li>
          </ul>
        </div>
        <a className="btn bg-gradient-to-r from-[#FF0844] to-[#FF8565] text-white "><IoLogInOutline /> Login</a>
      </div>
    </div>
  );
};

export default Navbar;
