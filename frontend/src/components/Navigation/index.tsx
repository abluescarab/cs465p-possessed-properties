import "./index.scss";
import banner from "/banner.png";
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
          <img src={banner} alt={""} height={75} />
        </Link>
      </div>
      <div className={"nav-col"}>
        <Link to={"/profile"}>Profile</Link>
      </div>
    </nav>
  );
};

export default Navigation;
