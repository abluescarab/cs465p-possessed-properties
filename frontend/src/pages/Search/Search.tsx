import "./Search.scss";
import { Link } from "react-router-dom";

const Search = () => {
  return (
    <div className={"search-div"}>
      Search...
      <br />
      <Link to={"/"}>to home</Link>
    </div>
  );
};

export default Search;
