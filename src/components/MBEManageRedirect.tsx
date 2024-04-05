import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import JsonView from "./JSONView";
import { InstallInfo } from "../types/MBEConfig";
import "../styles/redirectstyles.css";

const MBEManageRedirect: React.FC = () => {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [externalBizID, setExternalBizID] = useState("");
  const [installInfo, setInstallInfo] = useState<InstallInfo>();
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const [isTokenExpanded, setIsTokenExpanded] = useState(false);
  const [grantedScopes, setGrantedScopes] = useState<string[]>([]);
  const [testCAPIEventCode, setTestCAPIEventCode] = useState<string>();
  const [scopes, setScopes] = useState<string[]>([]);

  const getMBEInstalls = useCallback(
    async (external_business_id: string, token: string, mbeVersion: string) => {
      const response = await fetch(
        `/mbe/install_info?fbe_external_business_id=${external_business_id}&access_token=${token}`
      );
      if (!response.ok) {
        // const error = await response.json();
        // TODO: Show error message of failed requests
        return;
      }
      const data = await response.json();
      const { installed_features, ...rest } = data;
      setInstallInfo(mbeVersion === "v3" ? data : rest);
    },
    [setInstallInfo]
  );

  const sendTestCAPIEvent = async (pixelId: string, token: string) => {
    setTestCAPIEventCode(null);
    const response = await fetch("/mbe/send_test_capi_event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pixelId,
        token,
      }),
    });

    const data = await response.json();
    if (data.test_event_code) {
      setTestCAPIEventCode(data.test_event_code);
    }
  };

  const handleDebugToken = () => {
    const DEBUG_BASE_URL =
      "https://developers.facebook.com/tools/debug/accesstoken/";
    window.open(`${DEBUG_BASE_URL}?access_token=${token}`, "_blank");
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const accessToken = params.get("access_token");
    const state = params.get("state");
    if (state) {
      const decodedState = JSON.parse(decodeURIComponent(state));

      const { external_business_id, version, scope } = decodedState;
      if (external_business_id) {
        setExternalBizID(external_business_id);
      }
      if (accessToken) {
        // Remove the token and state from the URL
        // window.location.hash = "";

        setToken(accessToken);

        // Get MBE installs
        getMBEInstalls(external_business_id, accessToken, version);
      }
      if (scope) {
        const permissions = scope.split(",");
        setScopes(permissions);
      }
    } else {
      // TODO: Error message
      return;
    }

    const expiresIn = Number(params.get("expires_in"));
    if (expiresIn) {
      setExpiresIn(expiresIn);
    }

    const grantedScopes = params.get("granted_scopes")?.split(",") || [];
    setGrantedScopes(grantedScopes);
  }, [location]);

  // Run timer for access token expiry
  useEffect(() => {
    const intervalId = setInterval(() => {
      setExpiresIn((expiresIn) => (expiresIn !== null ? expiresIn - 1 : null));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="manage-view">
      <div>
        <p>Token: {isTokenExpanded ? token : `${token.slice(0, 10)}...`}</p>
        <button onClick={() => setIsTokenExpanded(!isTokenExpanded)}>
          {isTokenExpanded ? "Hide" : "Show"} Token
        </button>
        <p>Expires in: {expiresIn} seconds</p>
        <button disabled={!token} onClick={handleDebugToken}>
          Debug Token
        </button>
      </div>
      <div className="badge-container">
        <div className="badge-container-column">
          <div>Requested Scopes</div>
          {scopes.map((scope) => (
            <span
              key={scope}
              className={`badge ${
                grantedScopes.includes(scope) ? "badge-green" : "badge-red"
              }`}
            >
              {scope}
            </span>
          ))}
        </div>
        <div className="badge-container-column">
          <div>Granted Scopes</div>
          {grantedScopes.map((scope, index) => (
            <span key={index} className="badge badge-grey">
              {scope}
            </span>
          ))}
        </div>
      </div>
      <p>External Business ID: {externalBizID}</p>
      <div>{installInfo && <JsonView data={installInfo} />}</div>
      <div>
        CAPI
        <button onClick={() => sendTestCAPIEvent(installInfo.pixel_id, token)}>
          Test CAPI Event
        </button>
        {testCAPIEventCode && (
          <div>CAPI Event with test event code {testCAPIEventCode} sent</div>
        )}
      </div>
    </div>
  );
};

export default MBEManageRedirect;
