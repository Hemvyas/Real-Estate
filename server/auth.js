import { auth } from "express-oauth2-jwt-bearer";

const jwt = auth({
  audience: "https://dev-satxjv8si61r32f1.us.auth0.com/api/v2/",
  issuerBaseURL: "https://dev-satxjv8si61r32f1.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export default jwt;