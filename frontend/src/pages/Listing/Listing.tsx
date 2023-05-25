import "./Listing.scss";
import { useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { setTitle } from "@/utils.tsx";
import propertyImage from "@images/property.png";
import Button from "@/components/Button/Button.tsx";
import Crumbs from "@/components/Crumbs/Crumbs.tsx";
import SearchBar from "@/components/SearchBar/SearchBar.tsx";
import Card, {
  CardContent,
  CardSubtitle,
  CardTitle,
} from "@/components/Card/Card.tsx";
import Popup from "@/components/Popup/Popup.tsx";
import axios from "axios";
import { UserContext } from "@/App.tsx";

const Listing = () => {
  const { user } = useContext(UserContext);
  const loaderData: any = useLoaderData();
  const listing = loaderData.result;

  const [showPopup, setShowPopup] = useState(false);

  const showConfirmation = () => {
    setShowPopup(true);
  };

  const confirmPurchase = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:8080/offers",
      data: {
        token: user.accessToken,
        uid: user.uid,
        listing_id: listing.id,
        price: listing.price,
      },
    });
  };

  const cancelPurchase = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    setTitle(listing.name);
  }, [listing]);

  return (
    <>
      <div id={"listing-page"} className={"page"}>
        <SearchBar small />
        <Crumbs
          listing={listing.name}
          region={listing.region}
          country={listing.country}
        />
        <article className={"listing-article"}>
          <div className={"listing-image"}>
            <img src={propertyImage} alt={`Image of ${listing.name}`} />
          </div>
          <Card>
            <CardTitle>{listing.name}</CardTitle>
            <CardSubtitle>
              {listing.address ? `${listing.address}, ` : ""}
              {listing.region}, {listing.country}
            </CardSubtitle>
            <CardContent>
              <p className={"listing-description"}>{listing.description}</p>
              <div className={"listing-actions"}>
                {/* TODO: add link to see offers on listing if owner */}
                <p className={"font-lg"}>
                  <span className={"bold"}>List Price:&nbsp;</span>
                  <span className={"listing-price"}>
                    ${listing.price.toLocaleString()}
                  </span>
                </p>
                <Button
                  type={"button"}
                  color={"primary"}
                  className={"action-button"}
                  onClick={showConfirmation}
                >
                  Buy
                </Button>
                <Button
                  type={"button"}
                  color={"secondary"}
                  className={"action-button"}
                >
                  Make Offer
                </Button>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
      {showPopup && (
        <Popup
          title={"Confirm Purchase"}
          primaryButton={"Yes"}
          secondaryButton={"No"}
          primaryButtonOnClick={confirmPurchase}
          secondaryButtonOnClick={cancelPurchase}
        >
          This action will send a purchase offer for the full price of the
          listing. Are you sure you want to continue?
        </Popup>
      )}
    </>
  );
};

export default Listing;
