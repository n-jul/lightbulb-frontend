import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CampaignList from "./CampaignList";
import EditCampaignForm from "./EditCampaignForm";
import SendCampaignModal from "./SendCampaignModal";

const SuperAdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
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
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setCampaigns(data);
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

  // Open Create Campaign Form
  const openCreateForm = () => {
    setSelectedCampaign(null);
    setIsEditModalOpen(true);
  };

  // Open Edit Form
  const openEditForm = (campaign) => {
    setSelectedCampaign(campaign);
    setIsEditModalOpen(true);
  };

  // Open Send Modal
  const openSendModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsSendModalOpen(true);
  };

  return (
    <div>
      {/* Header with Create Campaign Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
        <button
          onClick={openCreateForm} // Opens modal for creating a new campaign
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Campaign
        </button>
      </div>

      {/* Campaign List */}
      <CampaignList campaigns={campaigns} openEditForm={openEditForm} openSendModal={openSendModal} />

      {/* Edit/Create Campaign Modal */}
      {isEditModalOpen && (
        <EditCampaignForm
          selectedCampaign={selectedCampaign}
          setIsModalOpen={setIsEditModalOpen}
          refreshCampaigns={fetchCampaigns}
        />
      )}

      {/* Send Campaign Modal */}
      {isSendModalOpen && (
        <SendCampaignModal
          selectedCampaign={selectedCampaign}
          setIsModalOpen={setIsSendModalOpen}
        />
      )}
    </div>
  );
};

export default SuperAdminDashboard;
