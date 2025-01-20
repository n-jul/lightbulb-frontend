
const SuperAdminDashboard = ({ campaigns }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create New Campaign
        </button>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Existing Campaigns</h3>
        <div className="space-y-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="border rounded p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{campaign.name}</h4>
                  <p className="text-gray-600">{campaign.description}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {campaign.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;