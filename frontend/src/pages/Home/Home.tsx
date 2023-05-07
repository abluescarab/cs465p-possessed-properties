import React from "react";

import "./Home.scss";
import { Link } from "react-router-dom";
import Listing from "@/components/Listing/Listing.tsx";

const Home: React.FC = () => {
  return (
    <>
      <section>
        <p>Hello world</p>
      </section>
      <section>
        <Link to={"/listing"}>to listing</Link>
      </section>
      <section>
        <Listing />
        <Listing />
        <Listing />
        <Listing />
      </section>
    </>
  );
};

export default Home;
