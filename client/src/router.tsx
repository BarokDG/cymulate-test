import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./components/auth/AuthGuard";

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
        <Dashboard />
      </AuthGuard>
    ),
  },
]);
