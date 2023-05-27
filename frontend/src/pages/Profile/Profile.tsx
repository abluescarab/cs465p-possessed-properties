import "./Profile.scss";
import { useContext, useEffect, useState } from "react";
import { capitalize, setTitle } from "@/utils.tsx";
import { UserContext } from "@/App.tsx";
import axios from "axios";
import ListingCard from "@/components/ListingCard/ListingCard.tsx";
import { Link } from "react-router-dom";

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
          filterDeleted: false,
          populate: ["listings", "offers.listing"],
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
            {dbUser.offers.length > 0 ? (
              <table className={"offer-table"}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Listing</th>
                    <th>Price</th>
                    <th>Offer</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dbUser.offers
                    .sort(
                      (o1, o2) =>
                        new Date(o1.createdAt) < new Date(o2.createdAt)
                    )
                    .map((offer) => {
                      return (
                        <tr key={offer.id}>
                          <td>
                            {new Date(offer.createdAt).toLocaleString("en-US", {
                              dateStyle: "short",
                              timeStyle: "short",
                            })}
                          </td>
                          <td>
                            {offer.listing.deletedAt == null ? (
                              <Link to={`/listings/${offer.listing.id}`}>
                                {offer.listing.name}
                              </Link>
                            ) : (
                              offer.listing.name
                            )}
                          </td>
                          <td>${offer.listing.price.toLocaleString()}</td>
                          <td>${offer.price.toLocaleString()}</td>
                          <td>{capitalize(offer.status)}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <p>No offers made.</p>
            )}
          </section>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </article>
  );
};

export default Profile;
