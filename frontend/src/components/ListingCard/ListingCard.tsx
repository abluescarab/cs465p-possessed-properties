import "./ListingCard.scss";
import propertyImage from "@images/property.png";
import Card from "@/components/Card/Card.tsx";
import CardContent from "@/components/Card/CardContent.tsx";
import CardImage from "@/components/Card/CardImage.tsx";

const ListingCard = () => {
  return (
    <Card className={"listing-card"} shadow={"hover"}>
      <CardImage src={propertyImage} alt={"Dracula's Castle"} />
      <CardContent>
        <p className={"bold font-lg"}>$000,000,000</p>
        <div className={"listing-card-info"}>
          <div className={"listing-card-info-item"}>
            <span className={"bold"}>00</span> bds
          </div>
          <div className={"listing-card-info-item"}>
            <span className={"bold"}>00</span> ba
          </div>
          <div className={"listing-card-info-item"}>
            <span className={"bold"}>0,000</span> sqft
          </div>
        </div>
        <p>Listing Name</p>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
