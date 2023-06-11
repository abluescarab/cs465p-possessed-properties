import "./SearchBar.scss";
import Card, { CardContent } from "@/components/Card/Card.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { httpClient } from "@/http_client.ts";

const SearchBar = ({ small = false }) => {
  const [allListings, setAllListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const searchBar = useRef<HTMLInputElement>(null);

  const fetch = async () => {
    let listings = [];

    await httpClient
      .request({
        method: "SEARCH",
        url: "/listings",
        data: {},
      })
      .then((reply) => {
        listings = reply.data.map((listing) => ({
          id: listing.id,
          name: listing.name,
        }));
      });

    listings.sort((l1, l2) => l1.name.localeCompare(l2.name));
    return listings;
  };

  const filter = (searchTerm: string) => {
    const listingItems = [];

    if (searchTerm.length > 0) {
      allListings.forEach((listing) => {
        if (listing.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
          listingItems.push({ id: listing.id, name: listing.name });
        }
      });
    }

    setFiltered(listingItems);
  };

  const search = (e) => {
    const term = e.currentTarget.value;

    setShowResults(term !== "");
    filter(term);
  };

  const reset = () => {
    if (searchBar.current) {
      searchBar.current.value = "";
      setFiltered([]);
      setShowResults(false);
    }
  };

  useEffect(() => {
    fetch().then(setAllListings);
  }, []);

  return (
    <div className={small ? "small-search-bar" : "search-bar"}>
      <Card shadow={"hover"}>
        <CardContent>
          <form className={"search-form"}>
            <TextInput
              className={`search-input ${small ? "" : "font-lg"}`}
              name={"search"}
              placeholder={"Search for listings..."}
              onChange={search}
              autoComplete={"off"}
              style={"none"}
              ref={searchBar}
            />
            <Button type={"submit"} className={"search-submit"}>
              <span className={"material-symbols-rounded light"}>search</span>
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className={`search-results ${showResults && "open"}`}>
        <ul className={"listings-view"}>
          {filtered.length > 0 ? (
            filtered.map((listing) => {
              return (
                <li key={listing.id} className={"listings-view-item"}>
                  <Link to={`/listings/${listing.id}`} onClick={reset}>
                    {listing.name}
                  </Link>
                </li>
              );
            })
          ) : (
            <li className={"listings-view-item no-hover"}>
              <span>No listings found.</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
