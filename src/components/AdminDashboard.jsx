import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle the modal

  // Fetch campaigns
  const fetchCampaigns = async () => {
    const token = Cookies.get("access_token");
    if (!token) {
      console.error("Access token not found");
      return;
    }
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/campaign/api/send_email/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  // Open modal and set the selected campaign
  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedCampaign(null);
    setIsModalOpen(false);
  };

  // Handle send options
  const handleSendEmail = (campaignId) => {
    console.log(`Send Email for Campaign ID: ${campaignId}`);
  };

  const handleSendMessage = (campaignId) => {
    console.log(`Send Message for Campaign ID: ${campaignId}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaigns</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="border rounded p-4 flex justify-between items-center"
            >
              {/* Campaign details */}
              <div
                onClick={() => openModal(campaign)}
                className="cursor-pointer"
              >
                <h4 className="font-medium">Type: {campaign.type}</h4>
                <p className="text-gray-600">Text: {campaign.text}</p>
              </div>

              {/* Buttons aligned to the right */}
              <div className="flex space-x-4">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => handleSendEmail(campaign.id)}
                >
                  Send in Email
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => handleSendMessage(campaign.id)}
                >
                  Send in Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedCampaign && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Campaign Details</h3>
            <p className="text-gray-600 mb-2">
              <strong>Type:</strong> {selectedCampaign.type}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Text:</strong> {selectedCampaign.text}
            </p>
            <p className="text-gray-600 mb-6">
              <strong>Description:</strong> {selectedCampaign.description}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => handleSendEmail(selectedCampaign.id)}
              >
                Send in Email
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => handleSendMessage(selectedCampaign.id)}
              >
                Send in Message
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
