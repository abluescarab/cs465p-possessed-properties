import "./Navigation.scss";
import banner from "/banner.png";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import firebaseApp from "@/firebase.ts";
import { useContext } from "react";
import { UserContext } from "@/App.tsx";
import { Routes } from "@/AppRouter.tsx";

const Navigation = () => {
  const auth = getAuth(firebaseApp);
  const context = useContext(UserContext);

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
        {context.user ? (
          <Link to={Routes.signOut.path}>Sign out</Link>
        ) : (
          <Link to={"/signin"}>Sign in</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
