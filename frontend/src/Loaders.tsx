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

export async function searchLoader() {
  return searchListings({});
}

export async function listingLoader({ params }) {
  return searchListings({
    id: params.listingId,
    populate_owner: true,
  });
}

export async function searchRegionLoader({ params }) {
  return searchListings({
    region: params.listingRegion,
  });
}

export async function searchCountryLoader({ params }) {
  return searchListings({
    country: params.listingCountry,
  });
}

export async function searchTypeLoader({ params }) {
  return searchListings({
    haunting_type: params.listingType.toLowerCase(),
  });
}
