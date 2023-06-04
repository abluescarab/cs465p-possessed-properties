import "./OfferTable.scss";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";
import { capitalize } from "@/utils.tsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/Button/Button.tsx";

type ColumnType =
  | "date"
  | "listing"
  | "buyer"
  | "price"
  | "offer"
  | "status"
  | "actions";

interface OfferTableProps extends ComponentBaseProps {
  offers: any;
  columns: ColumnType[];
}

const OfferTable: ComponentBase<OfferTableProps> = ({
  id = "",
  className = "",
  offers,
  columns,
}) => {
  const getOfferRow = (offer) => {
    return (
      <tr key={offer.id}>{columns.map((col) => getColumn(col, offer))}</tr>
    );
  };

  const getColumn = (column: ColumnType, offer) => {
    switch (column) {
      case "date":
        return (
          <td key={`offer-${offer.id}-date`}>
            {new Date(offer.createdAt).toLocaleString("en-US", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </td>
        );
      case "listing":
        return (
          <td key={`listing-${offer.listing.id}-name`}>
            {offer.listing.deletedAt == null ? (
              <Link to={`/listings/${offer.listing.id}`}>
                {offer.listing.name}
              </Link>
            ) : (
              offer.listing.name
            )}
          </td>
        );
      case "buyer":
        return <td key={`offer-${offer.id}-buyer`}>{offer.buyer.name}</td>;
      case "price":
        return (
          <td key={`listing-${offer.listing.id}-price`}>
            ${offer.listing.price.toLocaleString()}
          </td>
        );
      case "offer":
        return (
          <td key={`offer-${offer.id}-price`}>
            ${offer.price.toLocaleString()}
          </td>
        );
      case "status":
        return (
          <td key={`offer-${offer.id}-status`}>{capitalize(offer.status)}</td>
        );
      case "actions":
        return (
          <td key={`offer-${offer.id}-actions`}>
            <div className={"offer-actions"}>
              <Button type={"button"} color={"primary"} onClick={null}>
                Accept
              </Button>
              <Button type={"button"} color={"secondary"} onClick={null}>
                Reject
              </Button>
            </div>
          </td>
        );
    }

    return <></>;
  };

  return (
    <table className={"offer-table"}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{capitalize(col)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {offers.length > 0 ? (
          offers
            .sort((o1, o2) => new Date(o1.createdAt) < new Date(o2.createdAt))
            .map((offer) => getOfferRow(offer))
        ) : (
          <tr>
            <td className={"center-text"} colSpan={columns.length}>
              No offers made.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OfferTable;
