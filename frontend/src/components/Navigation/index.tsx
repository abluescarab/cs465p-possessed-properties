import "./index.scss";
import reactLogo from "@images/react.svg";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <div className={"nav-col"}>
        <Link to={"/buy"}>Buy</Link>
        <Link to={"/sell"}>Sell</Link>
      </div>
      <div className={"nav-col"}>
        <Link to={"/"} className={"flex"}>
          <img src={reactLogo} alt={""} />
        </Link>
      </div>
      <div className={"nav-col"}>
        <Link to={"/profile"}>Profile</Link>
      </div>
    </nav>
  );
};

export default Navigation;
