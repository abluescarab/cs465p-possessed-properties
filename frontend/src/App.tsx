import "@css/App.scss";
import { Route, Routes } from "react-router";
import Home from "@/pages/Home/Home.tsx";
import Search from "@/pages/Search/Search.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import Listings from "@/pages/Listings/Listings.tsx";
import Navigation from "@/components/Navigation/Navigation.tsx";

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
