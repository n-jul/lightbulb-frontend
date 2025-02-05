import Cookies from "js-cookie";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Don't forget to import the CSS for the date picker

const AdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle the modal
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false); // To toggle the schedule modal
  const [selectedDate, setSelectedDate] = useState(null); // Store the selected date

  const [activeTab, setActiveTab] = useState("superadmins"); // Track which tab is active

  // Fetch campaigns
  const fetchCampaigns = async () => {
    const token = Cookies.get("access_token");
    if (!token) {
      console.error("Access token not found");
      return;
    }
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/campaign/api/campaigns/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
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
  const handleSendEmail = async (campaignId) => {
    const payload = {
      campaign_id: campaignId,
      on_email: true,
    };
    const token = Cookies.get("access_token");
    if (!token) {
      console.error("Access token not found.");
      return;
    }
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/campaign/api/send_email/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        console.log("Campaign sent to users.");
      } else {
        console.error(
          "Error sending campaign to users in email.",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleSendMessage = async (campaignId) => {
    const payload = {
      campaign_id: campaignId,
      on_email: false,
    };
    const token = Cookies.get("access_token");
    if (!token) {
      console.error("Access token not found.");
      return;
    }
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/campaign/api/send_email/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        console.log("Campaign sent to users.");
      } else {
        console.error(
          "Error sending campaign to users in email.",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // Handle schedule campaign
  const handleScheduleCampaign = async () => {
    if (!selectedDate) {
      console.error("Please select a date and time.");
      return;
    }
    const formattedDate = DateTime.fromJSDate(selectedDate).toISO();
    const payload = {
      campaign_id: selectedCampaign.id,
      scheduled_date: formattedDate, // Convert to ISO string for the backend
    };
    const token = Cookies.get("access_token");
    if (!token) {
      console.error("Access token not found.");
      return;
    }
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/campaign/api/schedule_campaign/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        console.log("Campaign scheduled successfully.");
        setIsScheduleModalOpen(false); // Close the modal after scheduling
      } else {
        console.error("Error scheduling campaign:", response.statusText);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // Filter campaigns based on the active tab
  const filteredCampaigns =
    activeTab === "superadmins"
      ? campaigns.filter((campaign) => campaign.admin_id === null)
      : campaigns.filter((campaign) => campaign.admin_id !== null);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaigns</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${activeTab === "superadmins" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
          onClick={() => setActiveTab("superadmins")}
        >
          Created by Superadmins
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "you" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
          onClick={() => setActiveTab("you")}
        >
          Created by You
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          {filteredCampaigns.map((campaign) => (
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
                <button
                  className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                  onClick={() => {
                    setSelectedCampaign(campaign);
                    setIsScheduleModalOpen(true);
                  }}
                >
                  Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for scheduling */}
      {isScheduleModalOpen && selectedCampaign && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Schedule Campaign</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Date and Time</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                dateFormat="Pp"
                minDate={new Date()}
                className="px-4 py-2 border rounded-md w-full"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleScheduleCampaign}
              >
                Schedule
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => setIsScheduleModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for campaign details */}
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
