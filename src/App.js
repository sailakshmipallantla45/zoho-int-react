import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ZohoAuth from "./components/ZohoAuth"; // Import ZohoAuth component
import Dashboard from "./Dashboard"; // Import Dashboard component

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Check for the access token in localStorage
    const token = localStorage.getItem("zoho_access_token");
    setAccessToken(token);
  }, []);
  console.log("info");
  console.log(accessToken);
  
  return (
    <Router>
      <div>
        {accessToken ? (
          <div>
            {/* Main Content */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        ) : (
          <ZohoAuth /> // Show ZohoAuth component for login
        )}
      </div>
    </Router>
  );
};

export default App;
