import axios from "axios";

async function searchListings(data: {}) {
  let result = null;

  await axios({
    method: "SEARCH",
    url: `http://localhost:8080/listings`,
    data: data,
  }).then((response) => {
    result = response.data;
    return { data, result };
  });

  return { data, result };
}

export async function listingsLoader() {
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

export async function hauntingTypeLoader({ params }) {
  return searchListings({
    haunting_type: params.listingType.toLowerCase(),
  });
}
