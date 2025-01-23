import { useState } from "react";
import Cookies from "js-cookie";
const SuperAdminDashboard = ({ campaigns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transform `title` to `text` before sending
    const payload = {
      ...formData,
      text: formData.title, // Map `title` to `text`
    };
    delete payload.title; // Remove `title` key from payload

    console.log("Payload:", payload);

    try {
      // Retrieve the token from cookies
      const token = Cookies.get("access_token");
      if (!token) {
        console.error("Token not found in cookies");
        
        return;
      }
      console.log(token);
      const response = await fetch(
        "http://127.0.0.1:8000/campaign/api/campaigns/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the Bearer token
          },
          body: JSON.stringify(payload), 
        }
      );

      if (response.ok) {
        console.log("Campaign created successfully!");
        setIsModalOpen(false); // Close modal
        setFormData({ type: "", title: "", description: "" }); // Reset form
      } else {
        console.error("Error creating campaign:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Campaign Management
        </h2>
        <button
          onClick={() => setIsModalOpen(true)} // Open modal
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h3 className="text-lg font-medium mb-4">Create New Campaign</h3>
            <form onSubmit={handleSubmit}>
              {/* Type Field */}
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              {/* Title Field */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)} // Close modal
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
