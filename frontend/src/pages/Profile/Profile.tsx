import "./Profile.scss";
import { useContext, useEffect, useState } from "react";
import { capitalize, setTitle } from "@/utils.tsx";
import { UserContext } from "@/App.tsx";
import ListingCard from "@/components/ListingCard/ListingCard.tsx";
import { Link } from "react-router-dom";
import { httpClient } from "@/http_client.ts";
import OfferTable from "@/components/OfferTable/OfferTable.tsx";

const Profile = () => {
  const { user } = useContext(UserContext);

  const [dbUser, setDbUser] = useState(null);
  const [doFetch, setDoFetch] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await httpClient
        .request({
          method: "SEARCH",
          url: "/users",
          data: {
            email: user.email,
            filterDeleted: false,
            populate: ["listings", "offers.listing"],
          },
        })
        .then((request) => {
          setDbUser(request.data);
          setTitle(`${request.data.name}'s Profile`);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (user && doFetch) {
      fetchUser();
      setDoFetch(false);
    }
  }, [doFetch, user, dbUser]);

  // TODO: let user reopen listing?
  return (
    <article id={"profile-page"} className={"page"}>
      {dbUser ? (
        <>
          <h2 className={"profile-name"}>{dbUser.name}</h2>
          <section className={"profile-section"}>
            <h3>Listings</h3>
            {dbUser.listings.length > 0 ? (
              dbUser.listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listingId={listing.id}
                  name={listing.name}
                  price={listing.price}
                  bedrooms={listing.bedrooms}
                  bathrooms={listing.bathrooms}
                  area={listing.area}
                  image={listing.imageUri}
                  cancelled={listing.deletedAt}
                />
              ))
            ) : (
              <p>No created listings.</p>
            )}
          </section>
          <section className={"profile-section"}>
            <h3>Offers</h3>
            <OfferTable
              offers={dbUser.offers}
              columns={["date", "listing", "price", "offer", "status"]}
            />
          </section>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </article>
  );
};

export default Profile;
