import "@css/App.scss";
import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation/Navigation.tsx";

function App() {
  return (
    <>
      <Navigation />
      <div id={"container"}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
