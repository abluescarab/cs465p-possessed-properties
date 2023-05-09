import React from "react";

import "./Home.scss";
import Listing from "@/components/Listing/Listing.tsx";
import SearchBar from "@/components/SearchBar/SearchBar.tsx";
import Carousel from "@/components/Carousel/Carousel.tsx";

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
      <section id={"trending"}>
        <h2>Trending Properties</h2>
        <Carousel>
          <Listing />
          <Listing />
          <Listing />
          <Listing />
        </Carousel>
      </section>
    </>
  );
};

export default Home;