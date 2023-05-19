import "./SearchBar.scss";
import Card, { CardContent } from "@/components/Card/Card.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBar = ({ small = false }) => {
  const [allListings, setAllListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const resultsDiv = useRef(null);

  const fetch = async () => {
    const { data } = await axios.get("http://localhost:8080/listings");
    const listings = data.map((listing) => ({
      id: listing.id,
      name: listing.name,
    }));

    setAllListings(listings);
  };

  const filter = (searchTerm: string) => {
    const listingItems = [];

    if (searchTerm.length > 0) {
      allListings.forEach((listing) => {
        if (listing.name.toLowerCase().startsWith(searchTerm)) {
          listingItems.push({ id: listing.id, name: listing.name });
        }
      });

      listingItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFiltered(listingItems);
  };

  const search = async (e) => {
    filter(e.currentTarget.value);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (resultsDiv.current) {
      if (filtered.length > 0) {
        resultsDiv.current.classList.add("open");
      } else {
        resultsDiv.current.classList.remove("open");
      }
    }
  }, [filtered]);

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
            />
            <Button type={"submit"} className={"search-submit"}>
              <span className={"material-symbols-rounded light"}>search</span>
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className={"search-results"} ref={resultsDiv}>
        <ul className={"listings-view"}>
          {filtered.map((listing) => {
            return (
              <li key={listing.id} className={"listings-view-item"}>
                <Link to={`/listings/${listing.id}`}>{listing.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
