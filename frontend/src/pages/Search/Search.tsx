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

  return (
    <>
      <div id={"search-page"} className={"page"}>
        <h2>{terms ? `Search for ${terms}` : "Browse all listings"}</h2>
        <section className={"listing-search"}>
          {listings.map((listing: any) => {
            return <ListingCard key={listing.id} listing={listing} />;
          })}
        </section>
        <Sidebar />
      </div>
      <BackToTop />
    </>
  );
};

export default Search;
