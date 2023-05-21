import "@css/App.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation/Navigation.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "@/firebase.ts";
import { Routes } from "@/AppRouter.tsx";
import { createContext, useState } from "react";

export const UserContext = createContext(null);

function App() {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (
        location.pathname == Routes.signUp.path ||
        location.pathname == Routes.signIn.path ||
        location.pathname == Routes.forgotPassword.path
      ) {
        navigate(Routes.home.path);
      }

      if (!currentUser) {
        setCurrentUser(user);
      }
    } else {
      if (location.pathname == Routes.sell.path) {
        navigate(Routes.signIn.path);
      }

      if (currentUser) {
        setCurrentUser(user);
      }
    }
  });

  return (
    <>
      <UserContext.Provider value={{ user: currentUser }}>
        <Navigation />
        <main id={"container"}>
          <Outlet />
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
