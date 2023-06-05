import "./Listing.scss";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { navigateNext, setTitle } from "@/utils.ts";
import Button from "@/components/Button/Button.tsx";
import Crumbs from "@/components/Crumbs/Crumbs.tsx";
import SearchBar from "@/components/SearchBar/SearchBar.tsx";
import Card, {
  CardContent,
  CardSubtitle,
  CardTitle,
} from "@/components/Card/Card.tsx";
import { UserContext } from "@/App.tsx";
import Popup from "@/components/Popup/Popup.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import { httpClient } from "@/http_client.ts";

const Listing = () => {
  const { initialized, user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const listing = (useLoaderData() as any).result;

  const offerInput = useRef<HTMLInputElement>(null);

  const [signInRequired, setSignInRequired] = useState(false);
  const [userIsOwner, setUserIsOwner] = useState(false);
  const [popup, setPopup] = useState(null);

  const sendOffer = async (price) => {
    await httpClient
      .request({
        method: "POST",
        url: "/offers",
        data: {
          token: user.accessToken,
          uid: user.uid,
          listingId: listing.id,
          price,
        },
      })
      .then(() => {
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
    await httpClient
      .request({
        method: "DELETE",
        url: "/listings",
        data: {
          token: user.accessToken,
          uid: user.uid,
          id: listing.id,
        },
      })
      .then(() => {
        navigate(-1);
      });
  };

  const buyPopup = (
    <Popup
      title={"Confirm Buy"}
      primaryButton={"Yes"}
      secondaryButton={"No"}
      onPrimaryClick={() => sendOffer(listing.price)}
      onSecondaryClick={() => setPopup(null)}
    >
      This action will send an offer for the full price of the listing. Are you
      sure you want to continue?
    </Popup>
  );

  const offerPopup = (
    <Popup
      title={"Confirm Offer"}
      primaryButton={"Send"}
      secondaryButton={"Cancel"}
      onPrimaryClick={() => validateAndSend()}
      onSecondaryClick={() => setPopup(null)}
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
      onSecondaryClick={() => setPopup(null)}
    >
      This action will close the listing and cancel all current offers. Are you
      sure you want to continue?
    </Popup>
  );

  const successPopup = (price: number) => (
    <Popup
      title={"Offer Sent"}
      primaryButton={"OK"}
      onPrimaryClick={() => setPopup(null)}
    >
      You have successfully sent an offer of ${price.toLocaleString()}.
    </Popup>
  );

  useEffect(() => {
    setTitle(listing.name);
  }, [listing]);

  useEffect(() => {
    if (initialized) {
      setSignInRequired(user == null);
    }
  }, [initialized, user]);

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
                      onClick={() => navigate(`/listings/${listing.id}/offers`)}
                    >
                      See Offers
                    </Button>
                    <Button
                      type={"button"}
                      color={"secondary"}
                      className={"action-button"}
                      onClick={() => {
                        setPopup(cancelPopup);
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
                        if (signInRequired) {
                          navigateNext(navigate, location, "/signin");
                        }

                        setPopup(buyPopup);
                      }}
                    >
                      Buy
                    </Button>
                    <Button
                      type={"button"}
                      color={"secondary"}
                      className={"action-button"}
                      onClick={() => {
                        if (signInRequired) {
                          navigateNext(navigate, location, "/signin");
                        }

                        setPopup(offerPopup);
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
      {popup}
    </>
  );
};

export default Listing;
