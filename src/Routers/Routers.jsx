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
import Profile from "../Pages/Dashboard/Profile";
import TeacherReq from "../Pages/Dashboard/Admin/TeacherReq";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AdminRoute from "./AdminRoute";
import TeacherRoute from "./TeacherRoute";
import AddClass from "../Pages/Dashboard/Teacher/AddClass";
import MyClass from "../Pages/Dashboard/Teacher/MyClass";

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

      // ---------- User Dashboard ---------- //

      {
        path: "user-home",
        element: <UserHome></UserHome>,
      },

      // ---------- Teacher Dashboard ---------- //

      {
        path: "add-class",
        element: <TeacherRoute><AddClass></AddClass></TeacherRoute> ,
      },
      {
        path: "my-classes",
        element: <TeacherRoute><MyClass></MyClass></TeacherRoute> ,
      },

      // ---------- Admin Dashboard ---------- //

      {
        path: "teacher-requests",
        element: <AdminRoute><TeacherReq></TeacherReq></AdminRoute> ,
      },
      {
        path: "all-users",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute> ,
      },
    ],
  },
]);
