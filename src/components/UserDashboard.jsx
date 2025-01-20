const UserDashboard = ({ campaigns, userEmail }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Campaigns</h2>
      <div className="bg-white shadow rounded-lg p-6">
        {campaigns.some(campaign => campaign.targetUsers.includes(userEmail)) ? (
          <div className="space-y-4">
            {campaigns
              .filter(campaign => campaign.targetUsers.includes(userEmail))
              .map(campaign => (
                <div key={campaign.id} className="border rounded p-4">
                  <h4 className="font-medium">{campaign.name}</h4>
                  <p className="text-gray-600">{campaign.description}</p>
                  <span className="mt-2 inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {campaign.status}
                  </span>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No campaigns assigned to you yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;