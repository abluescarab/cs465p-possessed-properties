import "./ProtectedRoute.scss";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/App.tsx";
import { navigateNext } from "@/utils.tsx";

const ProtectedRoute = ({ children, ifSignedIn = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { initialized, user } = useContext(UserContext);
  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    if (initialized) {
      if (ifSignedIn && user) {
        navigate("/");
      } else if (!ifSignedIn && !user) {
        navigateNext(navigate, location, "/signin");
      } else {
        setCanShow(true);
      }
    }
  }, [ifSignedIn, initialized, user, navigate, location]);

  return canShow ? children : <></>;
};

export default ProtectedRoute;
