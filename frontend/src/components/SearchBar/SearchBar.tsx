import "./SearchBar.scss";
import Card from "@/components/Card/Card.tsx";
import CardContent from "@/components/Card/CardContent.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [listings, setListings] = useState([]);
  const resultsDiv = useRef(null);

  async function fetchListings(searchTerm: string) {
    const { data } = await axios.get("http://localhost:8080/listings");
    const listingItems = [];

    if (searchTerm.length > 0) {
      data.forEach((listing) => {
        if (listing.name.toLowerCase().startsWith(searchTerm)) {
          listingItems.push({ id: listing.id, name: listing.name });
        }
      });

      listingItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    return listingItems;
  }

  useEffect(() => {
    if (resultsDiv.current) {
      if (listings.length > 0) {
        resultsDiv.current.classList.add("open");
      } else {
        resultsDiv.current.classList.remove("open");
      }
    }
  }, [listings]);

  async function search(e) {
    await fetchListings(e.currentTarget.value).then(setListings);
  }

  return (
    <div className={"search"}>
      <Card shadow={"hover"}>
        <CardContent>
          <form>
            <TextInput
              name={"search"}
              placeholder={"Search for listings..."}
              className={"font-lg"}
              onChange={search}
              autoComplete={"off"}
            />
            <Button type={"submit"}>
              <span className={"material-symbols-rounded dark"}>search</span>
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className={"search-results"} ref={resultsDiv}>
        <ul id={"listings-view"}>
          {listings.map((listing) => {
            return (
              <li key={listing}>
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
