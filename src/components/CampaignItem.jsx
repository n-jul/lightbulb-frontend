import DeleteButton from "./DeleteButton";

const CampaignItem = ({ campaign, openEditForm, openSendModal}) => {
    return (
      <div className="border rounded p-4 flex justify-between items-center">
        <div>
          <h4 className="font-medium">{campaign.type}</h4>
          <h4 className="font-medium">{campaign.text}</h4>
          <p className="text-gray-600">{campaign.description}</p>
        </div>
  
        <div className="flex space-x-2">
          <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            {campaign.status}
          </span>
  
          <button
            onClick={() => openEditForm(campaign)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
  
          <button
            onClick={() => openSendModal(campaign)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Send
          </button>
          {/* ✅ Delete Button Component */}
          <DeleteButton
                campaignId={campaign.id}
              />
        </div>
      </div>
    );
  };
  
  export default CampaignItem;
  