import "./Profile.scss";
import { useContext, useEffect, useState } from "react";
import { setTitle } from "@/utils.tsx";
import { UserContext } from "@/App.tsx";
import axios from "axios";
import ListingCard from "@/components/ListingCard/ListingCard.tsx";

const Profile = () => {
  const { user } = useContext(UserContext);

  const [dbUser, setDbUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [offers, setOffers] = useState([]);
  const [doContextFetch, setDoContextFetch] = useState(true);
  const [doDbFetch, setDoDbFetch] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await axios({
        method: "SEARCH",
        url: "http://localhost:8080/users",
        data: { email: user.email },
      }).then((request) => {
        setDbUser(request.data);
        setTitle(`${request.data.name}'s Profile`);
      });
    };

    const fetchListings = async () => {
      await axios({
        method: "SEARCH",
        url: "http://localhost:8080/listings",
        data: {
          owner_email: dbUser.email,
        },
      }).then((response) => {
        setListings(response.data);
      });
    };

    const fetchOffers = async () => {
      await axios({
        method: "SEARCH",
        url: "http://localhost:8080/offers",
        data: {
          buyer_email: dbUser.email,
        },
      }).then((response) => {
        setOffers(response.data);
      });
    };

    if (user && doContextFetch) {
      fetchUser();
      setDoContextFetch(false);
    }

    if (dbUser && doDbFetch) {
      fetchListings();
      fetchOffers();
      setDoDbFetch(false);
    }
  }, [doDbFetch, doContextFetch, user, dbUser]);

  return (
    <article id={"profile-page"} className={"page"}>
      {dbUser ? (
        <>
          <h2 className={"profile-name"}>{dbUser && dbUser.name}</h2>
          <div className={"profile-col"}>
            <h3>Offers</h3>
            {/* TODO: load created offers */}
          </div>
          <div className={"profile-col"}>
            <h3>Listings</h3>
            {dbUser &&
              listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listingId={listing.id}
                  name={listing.name}
                  price={listing.price}
                  bedrooms={listing.bedrooms}
                  bathrooms={listing.bathrooms}
                  area={listing.area}
                />
              ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </article>
  );
};

export default Profile;
