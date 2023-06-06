import "./Footer.scss";
import { Routes } from "@/AppRouter.tsx";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Link to={Routes.search.path}>Buy</Link>
      <Link to={Routes.sell.path}>Sell</Link>
      <Link to={Routes.guide.path}>Guide</Link>
      <Link to={Routes.profileRedirect.path}>My Profile</Link>
      <div className={"full-width"}>&copy; Possessed Properties, Inc.</div>
    </footer>
  );
};

export default Footer;
