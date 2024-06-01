import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Main = () => {
  const location = useLocation();

  const removeNavFooter =
    location.pathname.includes("login") || location.pathname.includes("sign-up");

  return (
    <div>
      {removeNavFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {removeNavFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
