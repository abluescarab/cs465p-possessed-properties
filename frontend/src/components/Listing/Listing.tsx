import "./Listing.scss";
import Card from "@/components/Card/Card.tsx";
import CardContent from "@/components/Card/CardContent.tsx";

const Listing = () => {
  // TODO: add className "listing"
  // TODO: add ".listing-body"
  return (
    <Card>
      <img src={""} className={"listing-image"} alt={"Blank image"} />
      <CardContent>
        <p className={"listing-price bold large"}>$000,000,000</p>
        <div className={"listing-info"}>
          <div className={"listing-info-item"}>
            <span className={"bold"}>00</span> bds
          </div>
          <div className={"listing-info-item"}>
            <span className={"bold"}>00</span> ba
          </div>
          <div className={"listing-info-item"}>
            <span className={"bold"}>0,000</span> sqft
          </div>
        </div>
        <p className={"listing-name"}>Listing Name</p>
      </CardContent>
    </Card>
  );
};

export default Listing;
