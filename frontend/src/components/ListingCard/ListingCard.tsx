import "./ListingCard.scss";
import propertyImage from "@images/property.png";
import Card, { CardContent, CardImage } from "@/components/Card/Card.tsx";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";
import { useNavigate } from "react-router-dom";

interface ListingProps extends ComponentBaseProps {
  listingId: number;
  name: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

const ListingCard: ComponentBase<ListingProps> = ({
  listingId,
  name,
  price,
  bedrooms,
  bathrooms,
  area,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      className={"listing-card"}
      shadow={"hover"}
      onClick={() => navigate(`/listings/${listingId}`)}
    >
      <CardImage src={propertyImage} alt={`Image of ${name}`} />
      <CardContent>
        <p className={"bold font-lg"}>${price.toLocaleString()}</p>
        <div className={"listing-card-content"}>
          <div className={"listing-card-content-item"}>
            <span className={"bold"}>{bedrooms}</span> bds
          </div>
          <div className={"listing-card-content-item"}>
            <span className={"bold"}>{bathrooms}</span> ba
          </div>
          <div className={"listing-card-content-item"}>
            <span className={"bold"}>{area.toLocaleString()}</span> sqft
          </div>
        </div>
        <p>{name}</p>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
