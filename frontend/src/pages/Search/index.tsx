import React from "react";

import "./index.scss";
import { Link } from "react-router-dom";

const Search: React.FC = () => {
  return (
    <div className={"search-div"}>
      Search...
      <br />
      <Link to={"/"}>to home</Link>
    </div>
  );
};

export default Search;
