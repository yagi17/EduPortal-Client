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
import Profile from "../Pages/Dashboard/Profile";
import TeacherReq from "../Pages/Dashboard/Admin/TeacherReq";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AdminRoute from "./AdminRoute";
import TeacherRoute from "./TeacherRoute";
import AddClass from "../Pages/Dashboard/Teacher/AddClass";
import MyClass from "../Pages/Dashboard/Teacher/MyClass";
import AllClass from "../Pages/Dashboard/Admin/AllClass";
import ClassStats from "../Pages/Dashboard/Admin/ClassStats";
import UpdateClass from "../Pages/Dashboard/Teacher/UpdateClass";
import MyEnrollClass from "../Pages/Dashboard/User/MyEnrollClass";
import Payment from "../Pages/Dashboard/User/Payment/Payment";
import MyEnrollClassDetails from "../Pages/Dashboard/User/MyEnrollClassDetails ";
import ErrorPage from "../Shared/ErrorPage";
import MyClassDetails from "../Pages/Dashboard/Teacher/MyClassDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
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
          fetch(`https://edu-portal-server.vercel.app/classes/${params.id}`),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/:id/payment",
        element:<PrivateRoute><Payment></Payment></PrivateRoute>,
        
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
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <Profile></Profile>,
      },

      // ---------- User Dashboard ---------- //

      {
        path: "my-enrolled-class",
        element:<MyEnrollClass></MyEnrollClass>,
      },
      {
        path: `/dashboard/myEnroll-class/:id`,
        element:<MyEnrollClassDetails></MyEnrollClassDetails>,
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
      {
        path: `/dashboard/my-class/details/:id`,
        element: <TeacherRoute><MyClassDetails></MyClassDetails></TeacherRoute> ,
      },
      {
        path: `/dashboard/my-classes/:id`,
        element: <TeacherRoute><UpdateClass></UpdateClass> </TeacherRoute> ,
        loader: ({ params }) =>
          fetch(`https://edu-portal-server.vercel.app/classes/${params.id}`),
      },

      // ---------- Admin Dashboard ---------- //

      {
        path: "teacher-requests",
        element: <AdminRoute><TeacherReq></TeacherReq></AdminRoute> ,
      },
      {
        path: "classes",
        element: <AdminRoute><AllClass></AllClass></AdminRoute> ,
      },
      {
        path: "all-users",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute> ,
      },
      {
        path: `/dashboard/classes/stats/:id`,
        element: <AdminRoute><ClassStats></ClassStats></AdminRoute> ,
        loader: ({ params }) =>fetch(`/classes/${params.id}`),
      },
    ],
  },
]);