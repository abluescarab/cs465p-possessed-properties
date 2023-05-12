import "./Listings.scss";
import { Link } from "react-router-dom";

const Listings = () => {
  return (
    <div className={"listing-div"}>
      Listing...
      <br />
      <Link to={"/profile"}>to profile</Link>
    </div>
  );
};

export default Listings;
