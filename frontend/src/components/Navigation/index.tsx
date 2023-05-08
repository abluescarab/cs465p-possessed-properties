import "./index.scss";
import reactLogo from "@images/react.svg";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <img src={reactLogo} alt={""} />
      <Link to={"/"}>Home</Link>
      <Link to={"/listings"}>Listings</Link>
      <Link to={"/profile"}>Profile</Link>
    </nav>
  );
};

export default Navigation;
