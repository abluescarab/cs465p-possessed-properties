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
  offersLoader,
  userLoader,
} from "@/Loaders.tsx";
import Sell from "@/pages/Sell/Sell.tsx";
import Guide from "@/pages/Guide/Guide.tsx";
import SignOut from "@/pages/SignOut/SignOut.tsx";
import Offers from "@/pages/Offers/Offers.tsx";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.tsx";
import ProfileRedirect from "@/pages/Profile/ProfileRedirect.tsx";

export const Routes = {
  home: {
    path: "/",
    element: <Home />,
    loader: searchLoader,
  },
  guide: {
    path: "/guide",
    element: <Guide />,
  },
  search: {
    path: "/listings",
    element: <Search />,
    loader: searchLoader,
  },
  listing: {
    replace: (str) => `/listings/${str}`,
    path: "/listings/:listingId",
    element: <Listing />,
    loader: listingLoader,
  },
  offers: {
    replace: (str) => `/listings/${str}/offers`,
    path: "/listings/:listingId/offers",
    element: (
      <ProtectedRoute>
        <Offers />
      </ProtectedRoute>
    ),
    loader: offersLoader,
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
  profileRedirect: {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfileRedirect />
      </ProtectedRoute>
    ),
  },
  profile: {
    replace: (str) => `/profile/${str}`,
    path: "/profile/:userId",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    loader: userLoader,
  },
  sell: {
    path: "/sell",
    element: (
      <ProtectedRoute>
        <Sell />
      </ProtectedRoute>
    ),
  },
  signIn: {
    path: "/signin",
    element: (
      <ProtectedRoute ifSignedIn>
        <SignIn />
      </ProtectedRoute>
    ),
  },
  signUp: {
    path: "/signup",
    element: (
      <ProtectedRoute ifSignedIn>
        <SignUp />
      </ProtectedRoute>
    ),
  },
  signOut: {
    path: "/signout",
    element: <SignOut />,
  },
  forgotPassword: {
    path: "/forgotpassword",
    element: (
      <ProtectedRoute ifSignedIn>
        <ForgotPassword />
      </ProtectedRoute>
    ),
  },
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
      Routes.offers,
      Routes.search,
      Routes.searchRegion,
      Routes.searchCountry,
      Routes.searchType,
      Routes.profileRedirect,
      Routes.profile,
      Routes.sell,
      Routes.signUp,
      Routes.signIn,
      Routes.signOut,
      Routes.forgotPassword,
    ],
  },
]);

export default AppRouter;
