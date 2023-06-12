import { useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/App.tsx";
import { navigateNext } from "@/utils.ts";
import { Routes } from "@/AppRouter.tsx";

const ProtectedRoute = ({ children, ifSignedIn = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { initialized, user } = useContext(UserContext);
  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    if (initialized) {
      if (ifSignedIn && user) {
        navigate(Routes.home.path);
      } else if (!ifSignedIn && !user) {
        navigateNext(navigate, location, Routes.signIn.path);
      } else {
        setCanShow(true);
      }
    }
  }, [ifSignedIn, initialized, user, navigate, location]);

  return canShow ? children : <></>;
};

export default ProtectedRoute;
