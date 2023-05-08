import "./index.scss";
import propertyImage from "@images/property.png";
import Card from "@/components/Card";
import CardContent from "@/components/Card/CardContent.tsx";
import CardImage from "@/components/Card/CardImage.tsx";

const Listing = () => {
  return (
    <Card className={"listing"}>
      <CardImage src={propertyImage} alt={"Dracula's Castle"} />
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
