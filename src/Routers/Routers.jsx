import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AllClasses from "../Pages/AllClasses/AllClasses";
import ClassDetails from "../Pages/AllClasses/ClassDetails";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-classes",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/all-classes",
        element: <AllClasses></AllClasses>,
      },
      {
        path: `/all-classes/:id`,
        element: (
          <PrivateRoute>
            <ClassDetails></ClassDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/classes/${params.id}`),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
