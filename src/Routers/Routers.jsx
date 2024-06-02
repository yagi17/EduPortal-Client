import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AllClasses from "../Pages/AllClasses/AllClasses";
import ClassDetails from "../Pages/AllClasses/ClassDetails";
import PrivateRoute from "./PrivateRoute";
import TeachOn from "../Pages/TeachOn/TeachOn";
import Dashboard from "../Layouts/Dashboard";
import UserHome from "../Pages/Dashboard/User/UserHome";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import TeacherHome from "../Pages/Dashboard/Teacher/TeacherHome";
import Profile from "../Pages/Dashboard/Profile";

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
        path: "/join-as-teacher",
        element: (
          <PrivateRoute>
            <TeachOn></TeachOn>
          </PrivateRoute>
        ),
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Profile></Profile>,
      },
      // User Dashboard
      {
        path: "user-home",
        element: <UserHome></UserHome>,
      },
      // Teacher Dashboard
      {
        path: "teacher-home",
        element: <TeacherHome></TeacherHome>,
      },
      // Admin Dashboard
      {
        path: "admin-home",
        element: <AdminHome></AdminHome>,
      },
    ],
  },
]);
