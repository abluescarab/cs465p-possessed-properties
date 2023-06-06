import "./Navigation.scss";
import banner from "/banner.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/App.tsx";
import { Routes } from "@/AppRouter.tsx";

const Navigation = () => {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <div className={"nav-column"}>
        <Link to={Routes.search.path}>Buy</Link>
        <Link to={Routes.sell.path}>Sell</Link>
        <Link to={Routes.guide.path}>Guide</Link>
      </div>
      <div className={"nav-column"}>
        <Link to={Routes.home.path} className={"flex"}>
          <img src={banner} alt={"Possessed Properties banner"} />
        </Link>
      </div>
      <div className={"nav-column"}>
        {user ? (
          <>
            <Link to={Routes.profileRedirect.path}>My Profile</Link>
            <Link to={Routes.signOut.path}>Sign out</Link>
          </>
        ) : (
          <>
            <Link to={Routes.signIn.path}>Sign in</Link>
            <Link to={Routes.signUp.path}>Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
