import { createBrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import ErrorPage from "@/pages/ErrorPage/ErrorPage.tsx";
import Home from "@/pages/Home/Home.tsx";
import Listings from "@/pages/Listings/Listings.tsx";
import Search from "@/pages/Search/Search.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import React from "react";
import SignIn from "@/pages/SignIn/SignIn.tsx";
import SignUp from "@/pages/SignUp/SignUp.tsx";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword.tsx";
import { listingLoader } from "@/Loaders.tsx";

const AppRouter = createBrowserRouter([
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
        path: "/listings/:listingId",
        element: <Listings />,
        loader: listingLoader,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default AppRouter;
