import React from "react";

import "./Home.scss";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className={"home-div"}>
      Hello world
      <br />
      <Link to={"/listing"}>to listing</Link>
    </div>
  );
};

export default Home;
