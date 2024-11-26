import React, { useState } from "react";
import apiClient from "../apis/axios"; // Ensure this is correctly configured in your app

function ChartOfAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  // Function to sync accounts with Zoho
  const syncChartOfAccounts = async () => {
    setSyncing(true);
    setError(null);
    try {
      const response = await apiClient.post("/zoho/sync-accounts");
      console.log("Sync successful:", response.data.message);
      fetchChartOfAccounts(); // Fetch the accounts after syncing
    } catch (error) {
      console.error("Error syncing Chart of Accounts:", error);
      setError("Failed to sync accounts. Please try again.");
    } finally {
      setSyncing(false);
    }
  };

  // Function to fetch synced Chart of Accounts
  const fetchChartOfAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/zoho/chart-of-accounts");
      setAccounts(response.data.accounts || []);
    } catch (error) {
      console.error("Error fetching Chart of Accounts:", error);
      setError("Failed to fetch accounts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chart of Accounts</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Sync Button */}
      <button
        onClick={syncChartOfAccounts}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
        disabled={syncing}
      >
        {syncing ? "Syncing..." : "Sync Chart of Accounts"}
      </button>

      {/* Fetch Button */}
      <button
        onClick={fetchChartOfAccounts}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
        disabled={loading || syncing}
      >
        {loading ? "Fetching..." : "Fetch Chart of Accounts"}
      </button>

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Display Accounts in Table */}
      {accounts.length > 0 ? (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", textAlign: "left" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.zoho_account_id}>
                <td>{account.zoho_account_id}</td>
                <td>{account.name}</td>
                <td>{account.type}</td>
                <td>{account.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No accounts found. Please sync first.</p>
      )}
    </div>
  );
}

export default ChartOfAccounts;
