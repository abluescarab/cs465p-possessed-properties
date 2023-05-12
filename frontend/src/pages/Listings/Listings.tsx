import "./Listings.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";

const Listings = () => {
  useEffect(() => {
    setTitle("Listings");
  }, []);

  return (
    <div className={"listing-div"}>
      Listing...
      <br />
      <Link to={"/profile"}>to profile</Link>
    </div>
  );
};

export default Listings;
