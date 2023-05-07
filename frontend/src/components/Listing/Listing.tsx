import "./Listing.scss";

const Listing = () => {
  return (
    <article className={"listing"}>
      <img src={""} className={"listing-image"} alt={"Blank image"} />
      <div className={"listing-body"}>
        <p className={"listing-price bold large"}>$000,000,000</p>
        <div className={"listing-info"}>
          <div className={"listing-info-item"}>
            <span className={"bold"}>00</span> bds
          </div>
          <div className={"listing-info-item"}>
            <span className={"bold"}>00</span> ba
          </div>
          <div className={"listing-info-item"}>
            <span className={"bold"}>0,000</span> sqft
          </div>
        </div>
        <p className={"listing-name"}>Listing Name</p>
      </div>
    </article>
  );
};

export default Listing;
