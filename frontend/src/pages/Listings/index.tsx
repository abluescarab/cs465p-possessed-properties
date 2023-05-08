import React from "react";

import "./index.scss";
import { Link } from "react-router-dom";

const Listings: React.FC = () => {
  return (
    <div className={"listing-div"}>
      Listing...
      <br />
      <Link to={"/profile"}>to profile</Link>
    </div>
  );
};

export default Listings;
