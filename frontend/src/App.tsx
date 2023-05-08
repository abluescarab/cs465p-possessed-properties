import "@css/App.scss";
import { Route, Routes } from "react-router";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Profile from "@/pages/Profile";
import Listings from "@/pages/Listings";
import Navigation from "@/components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <div id={"container"}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/listings"} element={<Listings />} />
          <Route path={"/search"} element={<Search />} />
          <Route path={"/profile"} element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
