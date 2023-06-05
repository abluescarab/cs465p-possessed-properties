import "./Profile.scss";
import { useContext, useEffect, useState } from "react";
import {
  compare,
  formatCurrencyString,
  formatDateString,
  setTitle,
} from "@/utils.ts";
import { UserContext } from "@/App.tsx";
import ListingCard from "@/components/ListingCard/ListingCard.tsx";
import { httpClient } from "@/http_client.ts";
import SortedTable from "@/components/SortedTable/SortedTable.tsx";
import { confirmPopup, errorPopup, okPopup } from "@/static_components.tsx";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "@/AppRouter.tsx";

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dbUser, setDbUser] = useState(null);
  const [doFetch, setDoFetch] = useState(true);
  const [popup, setPopup] = useState(null);

  const closeOffer = async (offer) => {
    await httpClient
      .request({
        method: "DELETE",
        url: "/offers",
        data: {
          token: user.accessToken,
          uid: user.uid,
          id: offer.id,
          status: "closed",
        },
      })
      .then((response) => {
        setPopup(
          okPopup(
            "Offer Closed",
            `Your offer on ${response.data.listing.name} has been closed.`,
            () => {
              setPopup(null);
              setDoFetch(true);
            }
          )
        );
      })
      .catch(() => {
        setPopup(errorPopup(() => setPopup(null)));
      });
  };

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
          setPopup(errorPopup(() => navigate(Routes.home.path)));
        });
    };

    if (user && doFetch) {
      fetchUser();
      setDoFetch(false);
    }
  }, [doFetch, user, dbUser, navigate]);

  return (
    <>
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
                    onClick: (item) =>
                      setPopup(
                        confirmPopup(
                          "Close Offer",
                          `Are you sure you want to close your offer on ${
                            item.listing.name
                          } for ${formatCurrencyString(item.price)}?`,
                          () => closeOffer(item),
                          () => setPopup(null)
                        )
                      ),
                    color: "primary",
                    visible: (item) => !item.deletedAt,
                  },
                ]}
                columns={[
                  {
                    name: "date",
                    label: "Date",
                    display: (item) => formatDateString(item.createdAt),
                    descendByDefault: true,
                    sortFunction: (item1, item2, descending) =>
                      compare(item1.createdAt, item2.createdAt, descending),
                  },
                  {
                    name: "listing",
                    label: "Listing",
                    display: (item) =>
                      item.listing.deletedAt === null ? (
                        <Link to={Routes.listing.replace(item.listing.id)}>
                          {item.listing.name}
                        </Link>
                      ) : (
                        item.listing.name
                      ),
                  },
                  {
                    name: "price",
                    label: "Price",
                    display: (item) => formatCurrencyString(item.listing.price),
                    sortFunction: (item1, item2, descending) =>
                      compare(
                        item1.listing.price,
                        item2.listing.price,
                        descending
                      ),
                  },
                  {
                    name: "offer",
                    label: "Offer",
                    display: (item) => formatCurrencyString(item.price),
                    sortFunction: (item1, item2, descending) =>
                      compare(item1.price, item2.price, descending),
                  },
                  {
                    name: "status",
                    label: "Status",
                    display: (item) => (
                      <span className={"capitalize"}>{item.status}</span>
                    ),
                    sortFunction: (item1, item2, descending) =>
                      compare(item1.status, item2.status, descending),
                  },
                ]}
              />
            </section>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </article>
      {popup}
    </>
  );
};

export default Profile;
