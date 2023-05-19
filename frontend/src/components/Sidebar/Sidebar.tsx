import "./Sidebar.scss";
import { useEffect, useState } from "react";
import { listingsLoader } from "@/Loaders.tsx";
import { Link } from "react-router-dom";
import { capitalize } from "@/utils.tsx";

const Sidebar = ({ id = "", className = "" }) => {
  const [regions, setRegions] = useState({});
  const [countries, setCountries] = useState({});
  const [hauntings, setHauntings] = useState({});

  const getListings = async () => {
    const allListings = await listingsLoader();
    const getRegions = {};
    const getCountries = {};
    const getHauntings = {};

    allListings.result.forEach((listing) => {
      const region = listing.region;
      const country = listing.country;
      const haunting = capitalize(listing.haunting_type);

      getRegions[region] = (getRegions[region] || 0) + 1;
      getCountries[country] = (getCountries[country] || 0) + 1;
      getHauntings[haunting] = (getHauntings[haunting] || 0) + 1;
    });

    setRegions(getRegions);
    setCountries(getCountries);
    setHauntings(getHauntings);
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <>
      <aside id={id} className={`sidebar ${className}`}>
        <section className={"sidebar-section sidebar-haunting-type"}>
          <h3 className={"sidebar-header"}>Haunting Type</h3>
          {hauntings && (
            <ul className={"sidebar-list"}>
              {Object.keys(hauntings)
                .sort()
                .map((hauntingType) => (
                  <li key={hauntingType}>
                    <Link to={`/listings/type/${hauntingType}`}>
                      {hauntingType}
                    </Link>{" "}
                    ({hauntings[hauntingType]})
                  </li>
                ))}
            </ul>
          )}
        </section>
        <section className={"sidebar-section sidebar-region"}>
          <h3 className={"sidebar-header"}>Region</h3>
          {regions && (
            <ul className={"sidebar-list"}>
              {Object.keys(regions)
                .sort()
                .map((region) => (
                  <li key={region}>
                    <Link to={`/listings/region/${region}`}>{region}</Link> (
                    {regions[region]})
                  </li>
                ))}
            </ul>
          )}
        </section>
        <section className={"sidebar-section sidebar-country"}>
          <h3 className={"sidebar-header"}>Country</h3>
          {countries && (
            <ul className={"sidebar-list"}>
              {Object.keys(countries)
                .sort()
                .map((country) => (
                  <li key={country}>
                    <Link to={`/listings/country/${country}`}>{country}</Link> (
                    {countries[country]})
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
