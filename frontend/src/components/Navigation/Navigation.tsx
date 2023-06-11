import "./Navigation.scss";
import banner from "/banner.png";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { UserContext } from "@/App.tsx";
import { Routes } from "@/AppRouter.tsx";

const Navigation = () => {
  const { user } = useContext(UserContext);
  const mobileMenu = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div id={"navigation-container"}>
      <nav className={"desktop"}>
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
      <nav className={`mobile ${menuOpen && "open"}`} ref={mobileMenu}>
        <div className={"nav-column"}>
          <Link to={Routes.home.path} className={"flex"}>
            <img src={banner} alt={"Possessed Properties banner"} />
          </Link>
        </div>
        <div className={"nav-column"}>
          <button
            className={"material-symbols-rounded xxl-text"}
            id={"menu-icon"}
            onClick={toggleMenu}
          >
            menu
          </button>
        </div>
        <div className={"nav-column"} id={"link-column"} onClick={toggleMenu}>
          <Link to={Routes.search.path}>Buy</Link>
          <Link to={Routes.sell.path}>Sell</Link>
          <Link to={Routes.guide.path}>Guide</Link>
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
    </div>
  );
};

export default Navigation;
