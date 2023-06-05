import "./ListingCard.scss";
import Card, { CardContent, CardImage } from "@/components/Card/Card.tsx";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";
import { useNavigate } from "react-router-dom";
import { formatCurrencyString } from "@/utils.ts";
import { Routes } from "@/AppRouter.tsx";

interface ListingProps extends ComponentBaseProps {
  listingId: number;
  name: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  closed?: boolean;
}

const ListingCard: ComponentBase<ListingProps> = ({
  listingId,
  name,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
  closed = false,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      className={`listing-card ${closed && "closed"}`}
      shadow={"hover"}
      onClick={() => {
        if (!closed) {
          navigate(Routes.listing.replace(listingId));
        }
      }}
    >
      <CardImage
        src={`http://localhost:9000/possessedprops/${image}`}
        alt={`Image of ${name}`}
      />
      <CardContent>
        <p className={"bold font-lg"}>
          {closed ? "Not for sale" : formatCurrencyString(price)}
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
