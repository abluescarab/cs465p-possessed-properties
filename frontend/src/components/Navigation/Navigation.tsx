import "./Navigation.scss";
import banner from "/banner.png";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <div className={"nav-column"}>
        <Link to={"/listings"}>Buy</Link>
        <Link to={"/sell"}>Sell</Link>
      </div>
      <div className={"nav-column"}>
        <Link to={"/"} className={"flex"}>
          <img src={banner} alt={"Possessed Properties banner"} />
        </Link>
      </div>
      <div className={"nav-column"}>
        <Link to={"/guide"}>Guide</Link>
        <Link to={"/signin"}>Sign in</Link>
      </div>
    </nav>
  );
};

export default Navigation;
