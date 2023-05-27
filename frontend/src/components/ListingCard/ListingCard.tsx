import "./ListingCard.scss";
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
  image: string;
  cancelled?: boolean;
}

const ListingCard: ComponentBase<ListingProps> = ({
  listingId,
  name,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
  cancelled = false,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      className={"listing-card"}
      shadow={"hover"}
      onClick={() => {
        if (!cancelled) {
          navigate(`/listings/${listingId}`);
        }
      }}
    >
      <CardImage
        src={`http://localhost:9000/possessedprops/${image}`}
        alt={`Image of ${name}`}
      />
      <CardContent>
        <p className={"bold font-lg"}>
          {cancelled ? "Not for sale" : `$${price.toLocaleString()}`}
        </p>
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
