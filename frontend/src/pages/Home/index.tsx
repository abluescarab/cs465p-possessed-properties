import React from "react";

import "./index.scss";
import Listing from "@/components/Listing";
import SearchBar from "@/components/SearchBar";

const Home: React.FC = () => {
  return (
    <>
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
