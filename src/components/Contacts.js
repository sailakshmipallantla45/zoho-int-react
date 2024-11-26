import React, { useState } from "react";
import apiClient from "../apis/axios"; // Ensure this is correctly configured in your app

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  // Function to sync contacts with Zoho
  const syncContacts = async () => {
    setSyncing(true);
    setError(null);
    try {
      const response = await apiClient.post("/sync-contacts");
      console.log("Sync successful:", response.data.message);
      fetchContacts(); // Fetch the contacts after syncing
    } catch (error) {
      console.error("Error syncing contacts:", error);
      setError("Failed to sync contacts. Please try again.");
    } finally {
      setSyncing(false);
    }
  };

  // Function to fetch synced contacts
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/contacts");
      setContacts(response.data.contacts || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to fetch contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contacts</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Sync Button */}
      <button
        onClick={syncContacts}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
        disabled={syncing}
      >
        {syncing ? "Syncing..." : "Sync Contacts"}
      </button>

      {/* Fetch Button */}
      <button
        onClick={fetchContacts}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
        disabled={loading || syncing}
      >
        {loading ? "Fetching..." : "Fetch Contacts"}
      </button>

      {/* Loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Display contacts in table */}
      {contacts.length > 0 ? (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", textAlign: "left" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.zoho_contact_id}>
                <td>{contact.zoho_contact_id}</td>
                <td>{contact.first_name}</td>
                <td>{contact.last_name}</td>
                <td>{contact.email}</td>
                <td>{contact.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No contacts found. Please sync first.</p>
      )}
    </div>
  );
}

export default Contacts;
