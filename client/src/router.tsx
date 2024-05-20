import { Outlet, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./layout/Dashboard";
import AuthGuard from "./components/auth/AuthGuard";
import Phishes from "./pages/Phishes";
import Phish from "./pages/Phish";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <Dashboard>
          <Outlet />
        </Dashboard>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Phishes />,
      },
      {
        path: "phish/:id",
        element: <Phish />,
      },
    ],
  },
]);
