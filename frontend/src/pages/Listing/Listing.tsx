import "./Listing.scss";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";
import propertyImage from "@images/property.png";

const Listing = () => {
  const listing: any = useLoaderData();

  useEffect(() => {
    setTitle("Listing");
  }, []);

  return (
    <article className={"listing"}>
      <div className={"listing-image"}>
        <img src={propertyImage} alt={`Image of ${listing.name}`} />
      </div>
      <h2 className={"listing-name"}>{listing.name}</h2>
      <div className={"listing-info"}>&nbsp;</div>
    </article>
  );
};

export default Listing;
