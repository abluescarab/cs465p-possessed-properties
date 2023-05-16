import "./Search.scss";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";
import ListingCard from "@/components/ListingCard/ListingCard.tsx";

const Search = () => {
  const loaderData: any = useLoaderData();
  const listings = loaderData.result;
  const terms = Object.values(loaderData.data).join(", ");

  useEffect(() => {
    setTitle("Search");
  }, []);

  return (
    <>
      <section className={"listing-search"}>
        <h2>{terms ? `Search for ${terms}` : "Browse all listings"}</h2>
        {listings.map((listing: any) => {
          return (
            <ListingCard
              key={listing.id}
              listingId={listing.id}
              name={listing.name}
              price={listing.price}
              bedrooms={listing.bedrooms}
              bathrooms={listing.bathrooms}
              area={listing.area}
            />
          );
        })}
      </section>
    </>
  );
};

export default Search;
