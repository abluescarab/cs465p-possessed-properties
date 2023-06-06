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
import {
  Link,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import { Routes } from "@/AppRouter.tsx";

const Profile = () => {
  const { user } = useContext(UserContext);
  const loaderData = (useLoaderData() as any).result;
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  const [dbUser, setDbUser] = useState(null);
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
              revalidator.revalidate();
            }
          )
        );
      })
      .catch(() => {
        setPopup(errorPopup(() => setPopup(null)));
      });
  };

  useEffect(() => {
    if (user.email === loaderData.email) {
      setDbUser(loaderData);
      setTitle(`${loaderData.name}'s Profile`);
    } else {
      navigate(Routes.profileRedirect.path);
    }
  }, [loaderData, navigate, user.email]);

  return (
    <>
      <article id={"profile-page"} className={"page"}>
        {dbUser ? (
          <>
            <h1 className={"profile-name"}>{dbUser.name}</h1>
            <section className={"profile-section"}>
              <h2>Listings</h2>
              {dbUser.listings && dbUser.listings.length > 0 ? (
                dbUser.listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))
              ) : (
                <p>No created listings.</p>
              )}
            </section>
            <section className={"profile-section"}>
              <h2>Offers</h2>
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
                      !item.listing.deletedAt && !item.listing.purchasedBy ? (
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
