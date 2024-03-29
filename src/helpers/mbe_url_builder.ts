import { MBEExtrasConfig } from "../types/MBEConfig.ts";

export const buildUrl = (extras: MBEExtrasConfig) => {
  const baseUrl = "https://facebook.com/dialog/oauth";
  const redirectUri =
    (process.env.NODE_ENV === "production"
      ? "https://mbe-playground-app.onrender.com"
      : window.location.origin) + // Local host redirect on local build
    "/manage";
  const appID = process.env.REACT_APP_APP_ID;
  if (appID === undefined) {
    return "";
  }
  const {
    setup: { external_business_id },
  } = extras;
  const state = encodeURIComponent(
    JSON.stringify({
      external_business_id,
      version: "v3",
    })
  );
  const params = {
    client_id: appID,
    display: "page",
    redirect_uri: redirectUri,
    response_type: "token,granted_scopes",
    scope: "manage_business_extension",
    extras: JSON.stringify(extras),
    state,
  };
  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return `${baseUrl}?${queryString}`;
};
