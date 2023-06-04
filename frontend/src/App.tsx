import "@css/App.scss";
import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation/Navigation.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "@/firebase.ts";
import { createContext, useState } from "react";

export const UserContext = createContext(null);

function App() {
  const auth = getAuth(firebaseApp);
  const [currentUser, setCurrentUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  onAuthStateChanged(auth, async (user) => {
    if (!initialized) {
      setInitialized(true);
    }

    if (currentUser !== user) {
      setCurrentUser(user);
    }
  });

  return (
    <>
      <UserContext.Provider value={{ initialized, user: currentUser }}>
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
