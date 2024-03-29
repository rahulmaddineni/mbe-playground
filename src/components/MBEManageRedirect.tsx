import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import JsonView from "./JSONView";

const MBEManageRedirect: React.FC = () => {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [externalBizID, setExternalBizID] = useState("");
  const [installInfo, setInstallInfo] = useState();
  const [displayInfo, setDisplayInfo] = useState();
  const [version, setVersion] = useState("v2");
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const [isTokenExpanded, setIsTokenExpanded] = useState(false);

  const versions = ["v2", "v3"];
  const versionOptions = versions.map((version) => ({
    value: version,
    label: version,
  }));
  const handleVersionChange = (selectedOption) => {
    setVersion(selectedOption.value);
    handleDisplayInfo(selectedOption.value);
  };

  const handleDisplayInfo = useCallback(
    (v: string) => {
      switch (v) {
        case "v2":
          if (installInfo) {
            // const { installed_features, ...rest } = installInfo;
            setDisplayInfo(installInfo);
          }
          return;
        case "v3":
          setDisplayInfo(installInfo);
          return;
        default:
          setDisplayInfo(undefined);
      }
    },
    [installInfo]
  );

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
      setInstallInfo(data);
      handleDisplayInfo(mbeVersion);
    },
    [setInstallInfo]
  );

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    console.log(hash);

    const accessToken = params.get("access_token");
    const state = params.get("state");
    if (state) {
      const decodedState = JSON.parse(decodeURIComponent(state));

      const { external_business_id, version: v } = decodedState;
      if (external_business_id) {
        setExternalBizID(external_business_id);
      }
      if (v) {
        setVersion(v);
      }
      if (accessToken) {
        // Remove the token and state from the URL
        window.location.hash = "";

        setToken(accessToken);

        // Get MBE installs
        getMBEInstalls(external_business_id, accessToken, v);
      }
    } else {
      // TODO: Error message
      return;
    }

    const expiresIn = Number(params.get("expires_in"));
    if (expiresIn) {
      setExpiresIn(expiresIn);
    }
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
      </div>
      <p>External Business ID: {externalBizID}</p>
      <div>
        <label htmlFor="version">MBE Version</label>
        <Select
          id="timezone"
          options={versionOptions}
          defaultValue={versionOptions.find(
            (option) => option.value === version
          )}
          onChange={handleVersionChange}
        />
        {displayInfo && <JsonView data={displayInfo} />}
      </div>
    </div>
  );
};

export default MBEManageRedirect;
