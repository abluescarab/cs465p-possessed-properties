import "./Offers.scss";
import { useLoaderData } from "react-router-dom";
import BackToTop from "@/components/BackToTop/BackToTop.tsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/App.tsx";
import SortedTable from "@/components/SortedTable/SortedTable.tsx";
import { formatCurrencyString, formatDateString } from "@/utils.ts";

const Offers = () => {
  const { initialized, user } = useContext(UserContext);
  const listing = (useLoaderData() as any).result;

  const [canView, setCanView] = useState(false);

  // TODO: accept offer
  const acceptOffer = (offer) => {};

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
          buttons={[
            {
              label: "Accept",
              onClick: acceptOffer,
              color: "primary",
            },
            {
              label: "Reject",
              onClick: rejectOffer,
              color: "secondary",
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
              name: "buyer",
              label: "Buyer",
              display: (item) => item.buyer.name,
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
      </div>
      <BackToTop />
    </>
  );
};

export default Offers;
