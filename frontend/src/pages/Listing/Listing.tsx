import "./Listing.scss";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";
import propertyImage from "@images/property.png";
import Button from "@/components/Button/Button.tsx";

// TODO: change page name to listing name

const Listing = () => {
  const listing: any = useLoaderData();

  useEffect(() => {
    setTitle("Listing");
  }, []);

  return (
    <article className={"listing"}>
      <div className={"listing-crumbs"}></div>
      <div className={"listing-image"}>
        <img src={propertyImage} alt={`Image of ${listing.name}`} />
      </div>
      <h2 className={"listing-name"}>{listing.name}</h2>
      <div className={"listing-info"}>{listing.description}</div>
      <div className={"listing-actions"}>
        <p className={"font-lg"}>
          <span className={"bold"}>List Price:&nbsp;</span>
          <span className={"listing-price"}>
            ${listing.price.toLocaleString()}
          </span>
        </p>
        <Button type={"button"} color={"primary"}>
          Buy
        </Button>
        <Button type={"button"} color={"secondary"}>
          Make Offer
        </Button>
      </div>
    </article>
  );
};

export default Listing;
