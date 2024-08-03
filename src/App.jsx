import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import DashBoard from "./pages/DashBoard";
import Auth from "./pages/Auth";
import Link from "./pages/Link";
import Redirect from "./pages/Redirect";
import UrlProvider from "./context";
import RequireAuth from "./components/RequireAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },

      {
        path: "/auth" || "/login",
        element: <Auth />,
      },

      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <DashBoard />
          </RequireAuth>
        ),
      },

      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },

      {
        path: "/:id",
        element: <Redirect />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </UrlProvider>
  );
}

export default App;
