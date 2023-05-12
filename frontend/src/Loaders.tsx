import axios from "axios";

export async function listingLoader({ params }) {
  let data = null;

  await axios({
    method: "SEARCH",
    url: "http://localhost:8080/listings",
    data: {
      id: params.listingId,
    },
  }).then((response) => {
    console.log(response.data[0]);
    data = response.data[0];
    return data;
  });

  return data;
}
