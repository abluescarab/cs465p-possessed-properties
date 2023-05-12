import "./Listing.scss";
import { Link, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";

const Listing = () => {
  const listing: any = useLoaderData();

  useEffect(() => {
    setTitle("Listing");
  }, []);

  return (
    <div className={"listing-div"}>
      Listing...
      <br />
      <Link to={"/profile"}>to profile</Link>
    </div>
  );
};

export default Listing;
