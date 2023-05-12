import "@css/App.scss";
import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation/Navigation.tsx";
import Footer from "@/components/Footer/Footer.tsx";

function App() {
  return (
    <>
      <Navigation />
      <main id={"container"}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
