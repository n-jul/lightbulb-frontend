import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import EditCampaignForm from "./EditCampaignForm"; // Import the new component

const SuperAdminDashboard = () => {
  const [campaigns, setCampaign] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Fetch campaigns
  const fetchCampaigns = async () => {
    const token = Cookies.get("access_token");
    if (!token) {
      console.error("Access token not found");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/campaign/api/campaigns/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCampaign(data);
      } else {
        console.error("Error fetching campaigns:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Function to refresh the campaign list after updating
  const refreshCampaigns = () => {
    fetchCampaigns();
  };

  // Handle opening edit form
  const openEditForm = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true); // Open the modal
  };
  const openCreateForm = () =>{
    setSelectedCampaign(null)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
        <button
          onClick={openCreateForm} // Open modal for creating new campaign
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Campaign
        </button>
      </div>

      {/* Existing Campaigns */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Existing Campaigns</h3>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <button
              key={campaign.id}
              onClick={() => openEditForm(campaign)} // Open edit form for the selected campaign
              className="w-full text-left"
            >
              <div className="border rounded p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{campaign.type}</h4>
                    <h4 className="font-medium">{campaign.text}</h4>
                    <p className="text-gray-600">{campaign.description}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {campaign.status}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Show the EditCampaignForm modal if it's open */}
      {isModalOpen && (
        <EditCampaignForm
          selectedCampaign={selectedCampaign}
          setIsModalOpen={setIsModalOpen}
          refreshCampaigns={refreshCampaigns}
        />
      )}
    </div>
  );
};

export default SuperAdminDashboard;
