import "@css/App.scss";
import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation/Navigation.tsx";
import Footer from "@/components/Footer/Footer.tsx";

function App() {
  return (
    <>
      <Navigation />
      <div id={"container"}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
