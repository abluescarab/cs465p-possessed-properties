import "./ListingCard.scss";
import Card, { CardContent, CardImage } from "@/components/Card/Card.tsx";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";
import { useNavigate } from "react-router-dom";
import { formatCurrencyString } from "@/utils.ts";
import { Routes } from "@/AppRouter.tsx";
import { ListingType } from "@/types.ts";

interface ListingProps extends ComponentBaseProps {
  listing: ListingType;
}

const ListingCard: ComponentBase<ListingProps> = ({
  id = "",
  className = "",
  listing,
}) => {
  const {
    name,
    price,
    bedrooms,
    bathrooms,
    area,
    imageUri,
    deletedAt,
    purchasedBy,
  } = listing;
  const navigate = useNavigate();

  const statusText = () => {
    if (purchasedBy) return "Sold";
    if (deletedAt) return "Closed";

    return formatCurrencyString(price);
  };

  return (
    <Card
      id={id}
      className={`listing-card ${
        (deletedAt || purchasedBy) && "closed"
      } ${className}`}
      shadow={"hover"}
      onClick={() => {
        if (!deletedAt && !purchasedBy) {
          navigate(Routes.listing.replace(listing.id));
        }
      }}
    >
      <CardImage
        src={`http://localhost:9000/possessedprops/${imageUri}`}
        alt={`Image of ${name}`}
      />
      <CardContent>
        <p className={"bold font-lg"}>{statusText()}</p>
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
