import CampaignItem from "./CampaignItem";
import { useState } from "react";
const CampaignList = ({ campaigns, openEditForm, openSendModal }) => {
  const [activeTab, setActiveTab] = useState("superadmins");
  const filteredCampaigns =
    activeTab === "superadmins"
      ? campaigns.filter((campaign) => campaign.admin_id === null)
      : campaigns.filter((campaign) => campaign.admin_id !== null);
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Existing Campaigns</h3>
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "superadmins"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => setActiveTab("superadmins")}
        >
          Created by Superadmins
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "you"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => setActiveTab("you")}
        >
          Created by Admins
        </button>
      </div>
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <CampaignItem
            key={campaign.id}
            campaign={campaign}
            openEditForm={openEditForm}
            openSendModal={openSendModal}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
