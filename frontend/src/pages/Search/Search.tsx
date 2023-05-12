import "./Search.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";

const Search = () => {
  useEffect(() => {
    setTitle("Search");
  }, []);

  return (
    <div className={"search-div"}>
      Search...
      <br />
      <Link to={"/"}>to home</Link>
    </div>
  );
};

export default Search;
