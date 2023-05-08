import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@css/index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home/Home.tsx";
import Listings from "@/pages/Listings/Listings.tsx";
import Search from "@/pages/Search/Search.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import ErrorPage from "@/pages/Error/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/listings",
        element: <Listings />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
