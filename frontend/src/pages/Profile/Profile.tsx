import "./Profile.scss";
import { useContext, useEffect, useState } from "react";
import { setTitle } from "@/utils.tsx";
import { UserContext } from "@/App.tsx";
import axios from "axios";
import ListingCard from "@/components/ListingCard/ListingCard.tsx";

const Profile = () => {
  const { user } = useContext(UserContext);

  const [dbUser, setDbUser] = useState(null);
  const [doFetch, setDoFetch] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await axios({
        method: "SEARCH",
        url: "http://localhost:8080/users",
        data: {
          email: user.email,
          populate_listings: true,
          populate_offers: true,
        },
      })
        .then((request) => {
          setDbUser(request.data);
          setTitle(`${request.data.name}'s Profile`);
        })
        .catch(() => {
          // ignore
        });
    };

    if (user && doFetch) {
      fetchUser();
      setDoFetch(false);
    }
  }, [doFetch, user, dbUser]);

  return (
    <article id={"profile-page"} className={"page"}>
      {dbUser ? (
        <>
          <h2 className={"profile-name"}>{dbUser.name}</h2>
          <div className={"profile-col"}>
            <h3>Offers</h3>
            {dbUser.created_offers.length > 0 ? (
              <table className={"offer-table"}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Listing</th>
                    <th>Price</th>
                    <th>Offer</th>
                  </tr>
                </thead>
                <tbody>
                  {dbUser.created_offers.map((offer) => {
                    return (
                      <tr key={offer.id}>
                        <td>
                          {new Date(offer.created_at).toLocaleString("en-US", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </td>
                        <td>{offer.listing.name}</td>
                        <td>${offer.listing.price.toLocaleString()}</td>
                        <td>${offer.price.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No offers made.</p>
            )}
          </div>
          <div className={"profile-col"}>
            <h3>Listings</h3>
            {dbUser.created_listings.length > 0 ? (
              dbUser.created_listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listingId={listing.id}
                  name={listing.name}
                  price={listing.price}
                  bedrooms={listing.bedrooms}
                  bathrooms={listing.bathrooms}
                  area={listing.area}
                />
              ))
            ) : (
              <p>No created listings.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </article>
  );
};

export default Profile;
