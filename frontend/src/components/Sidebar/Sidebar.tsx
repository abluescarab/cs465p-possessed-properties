import "./Sidebar.scss";
import { useEffect, useState } from "react";
import { listingsLoader } from "@/Loaders.tsx";
import { Link } from "react-router-dom";

const Sidebar = ({ id = "", className = "" }) => {
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);

  // TODO: get all listings and map once?
  const getListings = async () => {
    const allListings = await listingsLoader();

    setRegions([...new Set(allListings.result.map((l) => l.region))]);
    setCountries([...new Set(allListings.result.map((l) => l.country))]);
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <>
      <aside id={id} className={`sidebar ${className}`}>
        <section className={"sidebar-section sidebar-region"}>
          <h3>Region</h3>
          {regions && (
            <ul>
              {regions.sort().map((region) => (
                <li key={region}>
                  <Link to={`/listings/region/${region}`}>{region}</Link>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className={"sidebar-section sidebar-country"}>
          <h3>Country</h3>
          {countries && (
            <ul>
              {countries.sort().map((country) => (
                <li key={country}>
                  <Link to={`/listings/region/${country}`}>{country}</Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </aside>
    </>
  );
};

export default Sidebar;
