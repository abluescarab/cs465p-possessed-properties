import "./Offers.scss";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "@/App.tsx";

const Offers = () => {
  const { user } = useContext(UserContext);
  const listings = (useLoaderData() as any).result;
  const navigate = useNavigate();
  const location = useLocation();

  return <></>;
};

export default Offers;
