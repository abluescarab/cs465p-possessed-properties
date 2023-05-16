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
      <section id={"intro"} className={"home-section"}>
        <h2 className={"section-header"}>
          <span className={"text-shadow-dark"}>
            Find your haunted dream home today.
          </span>
        </h2>
        <SearchBar />
      </section>
      <section id={"trending"} className={"home-section"}>
        <h2 className={"section-header"}>Trending Properties</h2>
        <Carousel>
          <ListingCard
            listingId={1}
            name={"Dracula's Castle"}
            bedrooms={20}
            bathrooms={15.5}
            area={15000}
            price={250000000}
          />
          <ListingCard
            listingId={1}
            name={"Dracula's Castle"}
            bedrooms={20}
            bathrooms={15.5}
            area={15000}
            price={250000000}
          />
          <ListingCard
            listingId={1}
            name={"Dracula's Castle"}
            bedrooms={20}
            bathrooms={15.5}
            area={15000}
            price={250000000}
          />
          <ListingCard
            listingId={1}
            name={"Dracula's Castle"}
            bedrooms={20}
            bathrooms={15.5}
            area={15000}
            price={250000000}
          />
          <ListingCard
            listingId={1}
            name={"Dracula's Castle"}
            bedrooms={20}
            bathrooms={15.5}
            area={15000}
            price={250000000}
          />
          <ListingCard
            listingId={1}
            name={"Dracula's Castle"}
            bedrooms={20}
            bathrooms={15.5}
            area={15000}
            price={250000000}
          />
        </Carousel>
      </section>
    </>
  );
};

export default Home;
