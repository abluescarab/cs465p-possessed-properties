import "@css/App.scss";
import { Route, Routes } from "react-router";
import Home from "@/pages/Home/Home.tsx";
import Search from "@/pages/Search/Search.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import Listings from "@/pages/Listings/Listings.tsx";

function App() {
  return (
    <div className={"app"}>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/listing"} element={<Listings />} />
        <Route path={"/search"} element={<Search />} />
        <Route path={"/profile"} element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
