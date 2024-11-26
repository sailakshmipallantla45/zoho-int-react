import React from "react";
import axios from "axios";

function ZohoAuth() {
  const handleZohoLogin = () => {
    axios
      .get("http://127.0.0.1:8000/api/zoho/auth") // Replace with your Laravel endpoint
      .then((response) => {
        window.location.href = response.data.redirect_url; // Redirect to Zoho OAuth
      })
      .catch((error) => {
        console.error("Error during Zoho login:", error);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Zoho Authentication</h1>
      <button onClick={handleZohoLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Connect to Zoho
      </button>
    </div>
  );
}

export default ZohoAuth;
