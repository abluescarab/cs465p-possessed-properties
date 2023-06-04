import "./Search.scss";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { setTitle } from "@/utils.ts";
import ListingCard from "@/components/ListingCard/ListingCard.tsx";
import Sidebar from "@/components/Sidebar/Sidebar.tsx";
import BackToTop from "@/components/BackToTop/BackToTop.tsx";

const Search = () => {
  const loaderData: any = useLoaderData();
  const listings = loaderData.result.sort(
    (l1, l2) => l1.name.toLowerCase() > l2.name.toLowerCase()
  );
  const terms = Object.values(loaderData.data).join(", ");

  useEffect(() => {
    setTitle(`Search for ${terms}`);
  }, [terms]);

  // TODO: add back to top link
  return (
    <>
      <div id={"search-page"} className={"page"}>
        <h2>{terms ? `Search for ${terms}` : "Browse all listings"}</h2>
        <section className={"listing-search"}>
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
                image={listing.imageUri}
              />
            );
          })}
        </section>
        <Sidebar />
      </div>
      <BackToTop />
    </>
  );
};

export default Search;
