import axios from "axios";

const serverIp = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIp}:${serverPort}`;

export const httpClient = axios.create({
  baseURL: serverUrl,
  headers: {
    "content-type": "application/json",
  },
});
