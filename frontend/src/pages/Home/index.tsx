import React from "react";

import "./index.scss";
import Listing from "@/components/Listing";
import SearchBar from "@/components/SearchBar";

const Home: React.FC = () => {
  return (
    <>
      <section>
        <h2>Find your dream haunted home today.</h2>
      </section>
      <section>
        <SearchBar />
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
