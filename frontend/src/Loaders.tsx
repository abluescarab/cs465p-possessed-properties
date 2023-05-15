import axios from "axios";

async function searchListings(data: {}) {
  let result = null;

  await axios({
    method: "SEARCH",
    url: `http://localhost:8080/listings`,
    data: data,
  }).then((response) => {
    console.log(response.data);
    result = response.data;
    return { data, result };
  });

  return { data, result };
}

export async function listingsLoader({ params }) {
  return searchListings({});
}

export async function listingLoader({ params }) {
  return searchListings({
    id: params.listingId,
  });
}

export async function regionLoader({ params }) {
  return searchListings({
    region: params.listingRegion,
  });
}

export async function countryLoader({ params }) {
  return searchListings({
    country: params.listingCountry,
  });
}
