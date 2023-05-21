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
  searchCountryLoader,
  searchTypeLoader,
  listingLoader,
  searchLoader,
  searchRegionLoader,
} from "@/Loaders.tsx";
import Sell from "@/pages/Sell/Sell.tsx";
import Guide from "@/pages/Guide/Guide.tsx";

export const Routes = {
  home: { path: "/", element: <Home /> },
  guide: { path: "/guide", element: <Guide /> },
  search: { path: "/listings", element: <Search />, loader: searchLoader },
  listing: {
    path: "/listings/:listingId",
    element: <Listing />,
    loader: listingLoader,
  },
  searchRegion: {
    path: "/listings/region/:listingRegion",
    element: <Search />,
    loader: searchRegionLoader,
  },
  searchCountry: {
    path: "/listings/country/:listingCountry",
    element: <Search />,
    loader: searchCountryLoader,
  },
  searchType: {
    path: "/listings/type/:listingType",
    element: <Search />,
    loader: searchTypeLoader,
  },
  profile: { path: "/profile", element: <Profile /> },
  signIn: { path: "/signin", element: <SignIn /> },
  signUp: { path: "/signup", element: <SignUp /> },
  forgotPassword: { path: "/forgotpassword", element: <ForgotPassword /> },
  sell: { path: "/sell", element: <Sell /> },
};

const AppRouter = createBrowserRouter([
  {
    path: Routes.home.path,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      Routes.home,
      Routes.guide,
      Routes.listing,
      Routes.search,
      Routes.searchRegion,
      Routes.searchCountry,
      Routes.searchType,
      Routes.sell,
      Routes.signUp,
      Routes.signIn,
      Routes.forgotPassword,
      Routes.profile,
    ],
  },
]);

export default AppRouter;
