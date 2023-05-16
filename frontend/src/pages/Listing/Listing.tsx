import "./Listing.scss";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";
import propertyImage from "@images/property.png";
import Button from "@/components/Button/Button.tsx";
import Crumbs from "@/components/Crumbs/Crumbs.tsx";

const Listing = () => {
  const loaderData: any = useLoaderData();
  const listing = loaderData.result;

  useEffect(() => {
    setTitle(listing.name);
  }, [listing]);

  return (
    <>
      <Crumbs
        listing={listing.name}
        region={listing.region}
        country={listing.country}
      />
      <article className={"listing-page"}>
        <div className={"listing-image"}>
          <img src={propertyImage} alt={`Image of ${listing.name}`} />
        </div>
        <div className={"listing-info"}>
          <h2 className={"listing-name"}>{listing.name}</h2>
        </div>
        <div className={"listing-description"}>{listing.description}</div>
        <div className={"listing-actions"}>
          <p className={"font-lg"}>
            <span className={"bold"}>List Price:&nbsp;</span>
            <span className={"listing-price"}>
              ${listing.price.toLocaleString()}
            </span>
          </p>
          <Button type={"button"} color={"primary"} className={"action-button"}>
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
      </article>
    </>
  );
};

export default Listing;
