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
    const priceString = formatCurrencyString(price);

    if (purchasedBy) return `Sold for ${priceString}`;
    if (deletedAt) return "Cancelled";

    return priceString;
  };

  const goToPage = () => {
    if (!deletedAt && !purchasedBy) {
      navigate(Routes.listing.replace(listing.id));
    }
  };

  return (
    <Card
      id={id}
      className={`listing-card ${
        (deletedAt || purchasedBy) && "cancelled"
      } ${className}`}
      shadow={"hover"}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          goToPage();
        }
      }}
      onClick={goToPage}
    >
      <CardImage
        src={`http://localhost:9000/possessedprops/${imageUri}`}
        alt={`Listing card for ${name}`}
      />
      <CardContent>
        <h3>{statusText()}</h3>
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
