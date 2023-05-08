import React from "react";

import "./Home.scss";
import Listing from "@/components/Listing/Listing.tsx";
import SearchBar from "@/components/SearchBar/Navigation.tsx";
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
        <Carousel>
          <Listing />
          <Listing />
          <Listing />
          <Listing />
        </Carousel>
      </section>
      <section></section>
    </>
  );
};

export default Home;
