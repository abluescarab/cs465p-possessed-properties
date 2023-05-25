import "./Listing.scss";
import { useLoaderData, useNavigate } from "react-router-dom";
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
import axios from "axios";
import { UserContext } from "@/App.tsx";
import Popup from "@/components/Popup/Popup.tsx";

const Listing = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const loaderData: any = useLoaderData();
  const listing = loaderData.result;

  const [showPopup, setShowPopup] = useState(false);
  const [userIsOwner, setUserIsOwner] = useState(false);
  const [popup, setPopup] = useState(null);

  const confirmBuyPopup = (
    <Popup
      title={"Confirm Offer"}
      primaryButton={"Yes"}
      secondaryButton={"No"}
      onPrimaryClick={async () => {
        await axios({
          method: "POST",
          url: "http://localhost:8080/offers",
          data: {
            token: user.accessToken,
            uid: user.uid,
            listing_id: listing.id,
            price: listing.price,
          },
        }).then(() => {
          setPopup(offerConfirmedPopup);
        });
      }}
      onSecondaryClick={() => setShowPopup(false)}
    >
      This action will send an offer for the full price of the listing. Are you
      sure you want to continue?
    </Popup>
  );

  const confirmClosePopup = (
    <Popup
      title={"Confirm Listing Close"}
      primaryButton={"Yes"}
      secondaryButton={"No"}
      onPrimaryClick={async () => {
        await axios({
          method: "DELETE",
          url: "http://localhost:8080/listings",
          data: {
            token: user.accessToken,
            uid: user.uid,
            id: listing.id,
          },
        }).then(() => {
          navigate(-1);
        });
      }}
      onSecondaryClick={() => setShowPopup(false)}
    >
      This action will close the listing and cancel all current offers. Are you
      sure you want to continue?
    </Popup>
  );

  const offerConfirmedPopup = (
    <Popup
      title={"Offer Sent"}
      primaryButton={"OK"}
      onPrimaryClick={() => setShowPopup(false)}
    >
      You have successfully sent an offer for this listing.
    </Popup>
  );

  const seeOffers = () => {
    // TODO
  };

  useEffect(() => {
    setTitle(listing.name);
  }, [listing]);

  useEffect(() => {
    if (user && listing && listing.owner.email === user.email) {
      setUserIsOwner(true);
    } else {
      setUserIsOwner(false);
    }
  }, [listing, user]);

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
                <p className={"font-lg"}>
                  <span className={"bold"}>List Price:&nbsp;</span>
                  <span className={"listing-price"}>
                    ${listing.price.toLocaleString()}
                  </span>
                </p>
                {userIsOwner ? (
                  <>
                    <Button
                      type={"button"}
                      color={"primary"}
                      className={"action-button"}
                      onClick={seeOffers}
                    >
                      See Offers
                    </Button>
                    <Button
                      type={"button"}
                      color={"secondary"}
                      className={"action-button"}
                      onClick={() => {
                        setPopup(confirmClosePopup);
                        setShowPopup(true);
                      }}
                    >
                      Close Listing
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type={"button"}
                      color={"primary"}
                      className={"action-button"}
                      onClick={() => {
                        setPopup(confirmBuyPopup);
                        setShowPopup(true);
                      }}
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
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
      {showPopup && popup}
    </>
  );
};

export default Listing;
