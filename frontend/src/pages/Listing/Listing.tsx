import "./Listing.scss";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { navigateNext, setTitle } from "@/utils.tsx";
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
import TextInput from "@/components/TextInput/TextInput.tsx";

const Listing = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const listing = (useLoaderData() as any).result;

  const offerInput = useRef<HTMLInputElement>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [userIsOwner, setUserIsOwner] = useState(false);
  const [popup, setPopup] = useState(null);

  const sendOffer = async (price) => {
    await axios({
      method: "POST",
      url: "http://localhost:8080/offers",
      data: {
        token: user.accessToken,
        uid: user.uid,
        listingId: listing.id,
        price,
      },
    }).then(() => {
      setPopup(successPopup(price));
    });
  };

  const validateAndSend = async () => {
    const amount = offerInput.current;

    amount.checkValidity();

    if (!amount.reportValidity()) {
      return;
    }

    await sendOffer(amount.value);
  };

  const cancelListing = async () => {
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
  };

  const buyPopup = (
    <Popup
      title={"Confirm Buy"}
      primaryButton={"Yes"}
      secondaryButton={"No"}
      onPrimaryClick={() => sendOffer(listing.price)}
      onSecondaryClick={() => setShowPopup(false)}
    >
      This action will send an offer for the full price of the listing. Are you
      sure you want to continue?
    </Popup>
  );

  const offerPopup = (
    <Popup
      title={"Confirm Offer"}
      primaryButton={"Yes"}
      secondaryButton={"No"}
      onPrimaryClick={() => validateAndSend()}
      onSecondaryClick={() => setShowPopup(false)}
    >
      <TextInput
        id={"offer-amount"}
        name={"offer-amount"}
        leftText={"$"}
        autoComplete={"off"}
        placeholder={"0"}
        required
        label={"Offer amount"}
        type={"number"}
        ref={offerInput}
        min={0}
      />
    </Popup>
  );

  const cancelPopup = (
    <Popup
      title={"Confirm Cancel"}
      primaryButton={"Yes"}
      secondaryButton={"No"}
      onPrimaryClick={() => cancelListing()}
      onSecondaryClick={() => setShowPopup(false)}
    >
      This action will close the listing and cancel all current offers. Are you
      sure you want to continue?
    </Popup>
  );

  const successPopup = (price: number) => (
    <Popup
      title={"Offer Sent"}
      primaryButton={"OK"}
      onPrimaryClick={() => setShowPopup(false)}
    >
      You have successfully sent an offer of ${price.toLocaleString()}.
    </Popup>
  );

  const seeOffers = () => {
    // TODO: make new route in approuter?
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

  // TODO: let user edit listing
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
            <img
              src={`http://localhost:9000/possessedprops/${listing.imageUri}`}
              alt={`Image of ${listing.name}`}
            />
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
                        setPopup(cancelPopup);
                        setShowPopup(true);
                      }}
                    >
                      Cancel Listing
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type={"button"}
                      color={"primary"}
                      className={"action-button"}
                      onClick={() => {
                        if (!user) {
                          navigateNext(navigate, location, "/signin");
                        }

                        setPopup(buyPopup);
                        setShowPopup(true);
                      }}
                    >
                      Buy
                    </Button>
                    <Button
                      type={"button"}
                      color={"secondary"}
                      className={"action-button"}
                      onClick={() => {
                        if (!user) {
                          navigateNext(navigate, location, "/signin");
                        }

                        setPopup(offerPopup);
                        setShowPopup(true);
                      }}
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
