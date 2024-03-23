import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MBEManageRedirect: React.FC = () => {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [externalBizID, setExternalBizID] = useState("");

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    const state = params.get("state");

    if (token && state) {
      setToken(token);
      setExternalBizID(state);

      // Remove the token and state from the URL
      window.location.hash = "";
    }
  }, [location]);

  return (
    <div className="manage-view">
      <p>Token: {token}</p>
      <p>External Business ID: {externalBizID}</p>
    </div>
  );
};

export default MBEManageRedirect;
