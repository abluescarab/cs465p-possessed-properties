import { httpClient } from "@/http_client.ts";

async function search(url, data: {}) {
  let result = null;

  await httpClient
    .request({
      method: "SEARCH",
      url,
      data,
    })
    .then((response) => {
      result = response.data;
      return { data, result };
    });

  return { data, result };
}

async function searchListings(data: {}) {
  return search("/listings", data);
}

export async function userLoader({ params }) {
  return search("/users", {
    id: params.userId,
    populate: ["listings", "offers.listing"],
    filterDeleted: false,
  });
}

export async function searchLoader() {
  return searchListings({});
}

export async function listingLoader({ params }) {
  return searchListings({
    id: params.listingId,
    populate: ["owner"],
  });
}

export async function offersLoader({ params }) {
  return searchListings({
    id: params.listingId,
    populate: ["owner", "offers.buyer"],
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
    hauntingType: params.listingType.toLowerCase(),
  });
}
