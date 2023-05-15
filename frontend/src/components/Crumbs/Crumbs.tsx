import "./Crumbs.scss";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";
import { Link } from "react-router-dom";

interface CrumbsProps extends ComponentBaseProps {
  region: string;
  country: string;
  listing: string;
}

const Crumbs: ComponentBase<CrumbsProps> = ({
  id = "",
  className = "",
  region,
  country,
  listing,
}) => {
  return (
    <div className={`crumbs ${className}`} id={id}>
      <Link to={"/listings"}>Listings</Link>&nbsp;&gt;&nbsp;
      <Link to={`/listings/country/${country}`}>{country}</Link>&nbsp;&gt;&nbsp;
      <Link to={`/listings/region/${region}`}>{region}</Link>&nbsp;&gt;&nbsp;
      <span>{listing}</span>
    </div>
  );
};

export default Crumbs;
