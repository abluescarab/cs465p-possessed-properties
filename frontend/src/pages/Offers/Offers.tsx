import "./Offers.scss";
import { useLoaderData, useNavigate } from "react-router-dom";
import BackToTop from "@/components/BackToTop/BackToTop.tsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/App.tsx";
import SortedTable from "@/components/SortedTable/SortedTable.tsx";
import { compare, formatCurrencyString, formatDateString } from "@/utils.ts";
import { confirmPopup, errorPopup, okPopup } from "@/static_components.tsx";
import { httpClient } from "@/http_client.ts";
import { Routes } from "@/AppRouter.tsx";

const Offers = () => {
  const { initialized, user } = useContext(UserContext);
  const listing = (useLoaderData() as any).result;
  const navigate = useNavigate();

  const [canView, setCanView] = useState(false);
  const [popup, setPopup] = useState(null);

  // TODO: accept offer
  const acceptOffer = async (offer) => {
    await httpClient
      .request({
        method: "PUT",
        url: "/offers",
        data: {
          token: user.accessToken,
          uid: user.uid,
          id: offer.id,
          status: "accepted",
        },
      })
      .then((response) => {
        const item = response.data;

        setPopup(
          okPopup(
            "Offer Accepted",
            `You have accepted the offer for ${formatCurrencyString(
              item.price
            )} on ${listing.name}.`,
            () => navigate(Routes.profile.path)
          )
        );
      })
      .catch((err) => {
        console.log(err);
        setPopup(errorPopup(() => setPopup(null)));
      });
  };

  // TODO: reject offer
  const rejectOffer = (offer) => {};

  useEffect(() => {
    if (initialized && user.email === listing.owner.email) {
      setCanView(true);
    }
  }, [initialized, user, listing]);

  if (!canView) {
    return <p>You are not allowed to view the offers for this listing.</p>;
  }

  return (
    <>
      <div id={"offers-page"} className={"page"}>
        <h2>Offers for {listing.name}</h2>
        <SortedTable
          data={listing.offers}
          defaultSortColumn={"offer"}
          buttons={[
            {
              label: "Accept",
              onClick: (item) =>
                setPopup(
                  confirmPopup(
                    "Accept Offer",
                    `Are you sure you want to accept the offer from ${
                      item.buyer.name
                    } for ${formatCurrencyString(item.price)} on ${
                      listing.name
                    }?`,
                    () => acceptOffer(item),
                    () => setPopup(null)
                  )
                ),
              color: "primary",
              visible: (item) =>
                item.deletedAt === null && item.status === "open",
            },
            {
              label: "Reject",
              onClick: rejectOffer,
              color: "secondary",
              visible: (item) =>
                item.deletedAt === null && item.status === "open",
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
              name: "buyer",
              label: "Buyer",
              display: (item) => item.buyer.name,
            },
            {
              name: "offer",
              label: "Offer",
              display: (item) => formatCurrencyString(item.price),
              descendByDefault: true,
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
      </div>
      <BackToTop />
      {popup}
    </>
  );
};

export default Offers;
