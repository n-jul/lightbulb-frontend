import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const UserDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchCampaigns = async () => {
    const token = Cookies.get("access_token");
    if (!token) {
      console.error("Access token not found");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/campaign/api/message/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch campaigns");
      }
      const data = await response.json();
      setCampaigns(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle campaign deletion
  const handleDelete = async (campaignId) => {
    const token = Cookies.get("access_token");
    if (!token) {
      console.error("Access token not found");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/campaign/api/message/${campaignId}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the campaign");
      }

      // Remove the deleted campaign from the state
      setCampaigns((prevCampaigns) =>
        prevCampaigns.filter((campaign) => campaign.id !== campaignId)
      );
    } catch (err) {
      console.error("Error deleting campaign:", err.message);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) {
    return <p className="text-gray-600 text-center">Loading campaigns...</p>;
  }

  if (error) {
    return <p className="text-red-600 text-center">Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaigns</h2>
      <div className="bg-white shadow rounded-lg p-6">
        {campaigns.length > 0 ? (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded p-4">
                <h4 className="font-medium text-lg">Type: {campaign.type}</h4>
                <p className="text-gray-800 font-semibold">
                  Text: {campaign.text}
                </p>
                <p className="text-gray-600">
                  Description: {campaign.description}
                </p>
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(campaign.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No campaigns available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
