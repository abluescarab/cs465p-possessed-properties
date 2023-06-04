import "./Home.scss";
import ListingCard from "@/components/ListingCard/ListingCard.tsx";
import SearchBar from "@/components/SearchBar/SearchBar.tsx";
import Carousel from "@/components/Carousel/Carousel.tsx";
import { useEffect, useState } from "react";
import { randomElement, resetTitle } from "@/utils.tsx";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const listings: any = (useLoaderData() as any).result;
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    resetTitle();
  }, []);

  useEffect(() => {
    setTrending(randomElement(listings, 6));
  }, [listings]);

  return (
    <div id={"home-page"}>
      <div id={"intro-container"}>
        <section className={"home-section"}>
          <h2 className={"text-shadow-dark home-header"}>
            Find your haunted dream home today.
          </h2>
          <SearchBar />
        </section>
      </div>
      <section className={"home-section"}>
        <h2 className={"home-header"}>Trending Properties</h2>
        <Carousel>
          {trending.map((listing) => (
            <ListingCard
              key={listing.id}
              listingId={listing.id}
              name={listing.name}
              bedrooms={listing.bedrooms}
              bathrooms={listing.bathrooms}
              area={listing.area}
              price={listing.price}
              image={listing.imageUri}
            />
          ))}
        </Carousel>
      </section>
    </div>
  );
};

export default Home;
