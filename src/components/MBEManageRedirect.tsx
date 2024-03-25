import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import JsonView from "./JSONView";

const MBEManageRedirect: React.FC = () => {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [externalBizID, setExternalBizID] = useState("");
  const [installInfo, setInstallInfo] = useState();

  const getMBEInstalls = useCallback(
    async (external_business_id: string, token: string) => {
      const response = await fetch(
        `/mbe/install_info?fbe_external_business_id=${external_business_id}&access_token=${token}`
      );
      const data = await response.json();
      setInstallInfo(data);
      console.log(data);
    },
    []
  );

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    const state = params.get("state");

    if (token && state) {
      // Remove the token and state from the URL
      // window.location.hash = "";

      setToken(token);
      setExternalBizID(state);

      // Get FBE installs
      getMBEInstalls(state, token);
    }
  }, [location, getMBEInstalls]);

  return (
    <div className="manage-view">
      <p>Token: {token}</p>
      <p>External Business ID: {externalBizID}</p>
      {installInfo && <JsonView data={installInfo} />}
    </div>
  );
};

export default MBEManageRedirect;
