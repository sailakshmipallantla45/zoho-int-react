import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ChartOfAccounts from "./components/ChartOfAccounts";
import Contacts from "./components/Contacts";
import Receipts from "./components/Receipts";

const Dashboard = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Check for the access token in localStorage
    const token = localStorage.getItem("zoho_access_token");
    setAccessToken(token);
  }, []);

  const handleLogout = () => {
    // Clear stored tokens
    localStorage.removeItem("zoho_access_token");
    localStorage.removeItem("zoho_refresh_token");

    // Redirect to home page
    alert("You have logged out successfully.");
    window.location.href = "/"; // Redirect to home page
  };


  return (
    <div style={{ padding: "20px" }}>
      {accessToken ? (
        <div>
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #ccc",
              marginBottom: "20px",
            }}
          >
            <nav style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Link
                  to="/dashboard"
                  style={{ textDecoration: "none", marginRight: "20px" }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/chartofaccounts"
                  style={{ textDecoration: "none", marginRight: "20px" }}
                >
                  Chart of Accounts
                </Link>
                <Link to="/contacts" style={{ textDecoration: "none", marginRight: "20px" }}>
                  Contacts
                </Link>
                <Link to="/receipts" style={{ textDecoration: "none" }}>
                  Receipts
                </Link>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("zoho_access_token");
                  localStorage.removeItem("zoho_refresh_token");
                  alert("You have logged out successfully.");
                  window.location.href = "/";
                }}
                style={{
                  padding: "8px 15px",
                  fontSize: "14px",
                  backgroundColor: "#d9534f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/dashboard" element={<h1>Welcome to your Dashboard!</h1>} />
              <Route path="/chartofaccounts" element={<ChartOfAccounts />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/receipts" element={<Receipts />} />
            </Routes>
          </div>
        </div>
      ) : (
        <h1>Please log in to access the dashboard.</h1> // Show login message if no access token
      )}
    </div>
  );
};

export default Dashboard;
