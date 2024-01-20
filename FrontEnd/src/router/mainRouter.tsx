import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import Register from "../pages/auth/Register";
import SignIn from "../pages/auth/SignIn";
import RegisterCard from "../pages/auth/RegisterCard";
// import Layout from "../components/layout/Layout";
import HomeScreen from "../pages/home/HomeScreen";
import Layout from "../components/layout/Layout";
import PrivateRoute from "./PrivateRoute";
// import MixRoute from "./mixRoute";

export const mainRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
      {
        index: true,
        path: "login",
        element: <SignIn />,
      },
      {
        index: true,
        path: "api/verify-user/:token",
        element: <SignIn />,
      },
      {
        index: true,
        path: "register-message",
        element: <RegisterCard />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
         <Layout/>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeScreen/>
      }
    ]
  },
]);




// {
//   element: (
//     <PrivateRoute>
//       <Layout />
//     </PrivateRoute>
//   ),
//   children: [
//     {
//       index: true,
//       element: <HomeScreen />,
//     },
//   ],
// },