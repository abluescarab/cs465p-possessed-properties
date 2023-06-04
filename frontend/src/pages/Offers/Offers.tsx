import "./Offers.scss";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "@/App.tsx";
import OfferTable from "@/components/OfferTable/OfferTable.tsx";

const Offers = () => {
  const { user } = useContext(UserContext);
  const listing = (useLoaderData() as any).result;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(listing);
  }, [listing]);

  return (
    <div id={"offers-page"} className={"page"}>
      <h2>Offers for {listing.name}</h2>
      <OfferTable
        offers={listing.offers}
        columns={["date", "buyer", "offer", "status", "actions"]}
      />
    </div>
  );
};

export default Offers;
