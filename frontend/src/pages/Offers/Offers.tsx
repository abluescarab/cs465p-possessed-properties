import "./Offers.scss";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import BackToTop from "@/components/BackToTop/BackToTop.tsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/App.tsx";
import SortedTable from "@/components/SortedTable/SortedTable.tsx";
import { compare, formatCurrencyString, formatDateString } from "@/utils.ts";
import { confirmPopup, errorPopup, okPopup } from "@/static_components.tsx";
import { Routes } from "@/AppRouter.tsx";
import { httpClient } from "@/http_client.ts";

const Offers = () => {
  const { initialized, user } = useContext(UserContext);
  const listing = (useLoaderData() as any).result;
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const [canView, setCanView] = useState(false);
  const [popup, setPopup] = useState(null);

  const modifyOffer = async (offer, status, onClick) => {
    await httpClient
      .request({
        method: "PUT",
        url: "/offers",
        data: {
          token: user.accessToken,
          uid: user.uid,
          id: offer.id,
          status,
        },
      })
      .then(() => {
        setPopup(
          okPopup(
            `Offer ${status}`,
            `You have ${status} the offer from ${
              offer.buyer.name
            } for ${formatCurrencyString(offer.price)} on ${listing.name}.`,
            () => {
              onClick();
              revalidator.revalidate();
            }
          )
        );
      })
      .catch((err) => {
        console.log(err);
        setPopup(errorPopup(() => setPopup(null)));
      });
  };

  const acceptOffer = async (offer) => {
    await modifyOffer(offer, "accepted", () =>
      navigate(Routes.profileRedirect.path)
    );
  };

  const rejectOffer = async (offer) => {
    await modifyOffer(offer, "rejected", () => setPopup(null));
  };

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
              onClick: (item) =>
                setPopup(
                  confirmPopup(
                    "Reject Offer",
                    `Are you sure you want to reject the offer from ${
                      item.buyer.name
                    } for ${formatCurrencyString(item.price)} on ${
                      listing.name
                    }?`,
                    () => rejectOffer(item),
                    () => setPopup(null)
                  )
                ),
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
