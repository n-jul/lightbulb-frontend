const AdminDashboard = ({ campaigns }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Campaigns</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="border rounded p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{campaign.name}</h4>
                  <p className="text-gray-600">{campaign.description}</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Send Campaign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;