import { createBrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import ErrorPage from "@/pages/ErrorPage/ErrorPage.tsx";
import Home from "@/pages/Home/Home.tsx";
import Listing from "@/pages/Listing/Listing.tsx";
import Search from "@/pages/Search/Search.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import React from "react";
import SignIn from "@/pages/SignIn/SignIn.tsx";
import SignUp from "@/pages/SignUp/SignUp.tsx";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword.tsx";
import {
  countryLoader,
  listingLoader,
  listingsLoader,
  regionLoader,
} from "@/Loaders.tsx";
import Sell from "@/pages/Sell/Sell.tsx";

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
        path: "/listings",
        element: <Search />,
        loader: listingsLoader,
      },
      {
        path: "/listings/:listingId",
        element: <Listing />,
        loader: listingLoader,
      },
      {
        path: "/listings/region/:listingRegion",
        element: <Search />,
        loader: regionLoader,
      },
      {
        path: "/listings/country/:listingCountry",
        element: <Search />,
        loader: countryLoader,
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
      {
        path: "/sell",
        element: <Sell />,
      },
    ],
  },
]);

export default AppRouter;
