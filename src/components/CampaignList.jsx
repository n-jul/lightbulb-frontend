import CampaignItem from "./CampaignItem";

const CampaignList = ({ campaigns, openEditForm, openSendModal }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Existing Campaigns</h3>
      <div className="space-y-4">
        {campaigns.map((campaign) => (
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
