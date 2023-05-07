import React from "react";

import "./Listing.scss";
import { Link } from "react-router-dom";

const Listing: React.FC = () => {
  return (
    <div className={"listing-div"}>
      Listing...
      <br />
      <Link to={"/profile"}>to profile</Link>
    </div>
  );
};

export default Listing;
