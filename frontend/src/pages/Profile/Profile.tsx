import "./Profile.scss";
import { useContext, useEffect, useState } from "react";
import { formatCurrencyString, formatDateString, setTitle } from "@/utils.ts";
import { UserContext } from "@/App.tsx";
import ListingCard from "@/components/ListingCard/ListingCard.tsx";
import { httpClient } from "@/http_client.ts";
import SortedTable from "@/components/SortedTable/SortedTable.tsx";

const Profile = () => {
  const { user } = useContext(UserContext);

  const [dbUser, setDbUser] = useState(null);
  const [doFetch, setDoFetch] = useState(true);

  // TODO: close offer
  const closeOffer = (offer) => {};

  // TODO: reopen offer
  const reopenOffer = (offer) => {};

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
            <SortedTable
              data={dbUser.offers}
              buttons={[
                {
                  label: "Close",
                  onClick: closeOffer,
                  color: "primary",
                  visible: (item) => !item.deletedAt,
                },
                {
                  label: "Reopen",
                  onClick: reopenOffer,
                  color: "primary",
                  visible: (item) => item.deletedAt,
                },
              ]}
              columns={[
                {
                  name: "date",
                  label: "Date",
                  display: (item) => formatDateString(item.createdAt),
                  descendByDefault: true,
                },
                {
                  name: "listing",
                  label: "Listing",
                  display: (item) => item.listing.name,
                },
                {
                  name: "price",
                  label: "Price",
                  display: (item) => formatCurrencyString(item.listing.price),
                },
                {
                  name: "offer",
                  label: "Offer",
                  display: (item) => formatCurrencyString(item.price),
                },
                {
                  name: "status",
                  label: "Status",
                  display: (item) => (
                    <span className={"capitalize"}>{item.status}</span>
                  ),
                },
              ]}
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
