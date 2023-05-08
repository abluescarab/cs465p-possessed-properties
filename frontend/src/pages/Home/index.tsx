import React from "react";

import "./index.scss";
import Listing from "@/components/Listing";
import SearchBar from "@/components/SearchBar";

const Home: React.FC = () => {
  return (
    <>
      <section id={"intro"}>
        <h2>
          <span className={"text-shadow-dark"}>
            Find your haunted dream home today.
          </span>
        </h2>
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
