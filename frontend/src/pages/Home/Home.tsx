import "./Home.scss";
import ListingCard from "@/components/ListingCard/ListingCard.tsx";
import SearchBar from "@/components/SearchBar/SearchBar.tsx";
import Carousel from "@/components/Carousel/Carousel.tsx";
import { useEffect } from "react";
import { resetTitle } from "@/utils.tsx";

const Home = () => {
  useEffect(() => {
    resetTitle();
  }, []);

  return (
    <>
      <section id={"intro"} className={"home"}>
        <h2>
          <span className={"text-shadow-dark"}>
            Find your haunted dream home today.
          </span>
        </h2>
        <SearchBar />
      </section>
      <section id={"trending"} className={"home"}>
        <h2>Trending Properties</h2>
        <Carousel>
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
        </Carousel>
      </section>
    </>
  );
};

export default Home;
