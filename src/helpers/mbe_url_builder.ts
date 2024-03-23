import { MBEExtrasConfig } from "../types/MBEConfig.ts";

export const buildUrl = (extras: MBEExtrasConfig) => {
  const baseUrl = "https://facebook.com/dialog/oauth";
  const redirectUri =
    process.env.NODE_ENV === "production"
      ? "https://mbe-playground.onrender.com/"
      : window.location.origin; // Local host redirect on local build
  const appID = process.env.REACT_APP_APP_ID;
  if (appID === undefined) {
    return "";
  }
  const params = {
    client_id: appID,
    display: "page",
    redirect_uri: redirectUri,
    response_type: "token",
    scope: "manage_business_extension",
    extras: JSON.stringify(extras),
  };
  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return `${baseUrl}?${queryString}`;
};
