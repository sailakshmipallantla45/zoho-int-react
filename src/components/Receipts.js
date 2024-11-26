import React, { useState } from "react";
import apiClient from "../apis/axios"; // Ensure this is correctly configured in your app

function Receipts() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  // Function to sync receipts with Zoho
  const syncReceipts = async () => {
    setSyncing(true);
    setError(null);
    try {
      const response = await apiClient.post("/sync-receipts");
      console.log("Sync successful:", response.data.message);
      fetchReceipts(); // Fetch the receipts after syncing
    } catch (error) {
      console.error("Error syncing receipts:", error);
      setError("Failed to sync receipts. Please try again.");
    } finally {
      setSyncing(false);
    }
  };

  // Function to fetch synced receipts
  const fetchReceipts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/receipts");
      setReceipts(response.data.receipts || []);
    } catch (error) {
      console.error("Error fetching receipts:", error);
      setError("Failed to fetch receipts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Receipts</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Sync Button */}
      <button
        onClick={syncReceipts}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
        disabled={syncing}
      >
        {syncing ? "Syncing..." : "Sync Receipts"}
      </button>

      {/* Fetch Button */}
      <button
        onClick={fetchReceipts}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
        disabled={loading || syncing}
      >
        {loading ? "Fetching..." : "Fetch Receipts"}
      </button>

      {/* Loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Display receipts in table */}
      {receipts.length > 0 ? (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", textAlign: "left" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt) => (
              <tr key={receipt.zoho_receipt_id}>
                <td>{receipt.zoho_receipt_id}</td>
                <td>{receipt.date}</td>
                <td>{receipt.amount}</td>
                <td>{receipt.status}</td>
                <td>{receipt.payment_method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No receipts found. Please sync first.</p>
      )}
    </div>
  );
}

export default Receipts;
