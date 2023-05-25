import axios from "axios";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../status_codes.js";

const getTokens = async () => {
  const api = await axios.get(
    "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
  );

  if (api.status === HttpStatus.OK) {
    return api.data;
  }

  return {};
};

const secureTokens = await getTokens();

const verifyToken = (token, uid) => {
  const header64 = token.split(".")[0];
  const header = JSON.parse(Buffer.from(header64, "base64").toString("ascii"));

  try {
    return jwt.verify(token, secureTokens[header.kid], {
      algorithms: ["RS256"],
      audience: "possessed-props",
      issuer: "https://securetoken.google.com/possessed-props",
      subject: uid,
    });
  } catch (error) {
    return null;
  }
};

export default verifyToken;
