import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const EditCampaignForm = ({ selectedCampaign, setIsModalOpen, refreshCampaigns }) => {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (selectedCampaign) {
      setFormData({
        type: selectedCampaign.type,
        title: selectedCampaign.text,
        description: selectedCampaign.description,
      });
    }
  }, [selectedCampaign]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      text: formData.title, // Transform `title` to `text`
    };
    delete payload.title;

    try {
      const token = Cookies.get("access_token");
      if (!token) {
        console.error("Token not found in cookies");
        return;
      }

      // Send the PUT request to update the campaign
      const method = selectedCampaign ? "PUT" : "POST"
      const url = selectedCampaign
      ? `http://127.0.0.1:8000/campaign/api/campaigns/${selectedCampaign.id}/`
      : "http://127.0.0.1:8000/campaign/api/campaigns/"; // Use different URL if editing

      const response = await fetch(
        url,
        {
          method: method, // Use PUT to update
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Campaign updated successfully!");
        setIsModalOpen(false); // Close the modal
        refreshCampaigns(); // Refresh the campaigns list
      } else {
        console.error("Error updating campaign:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h3 className="text-lg font-medium mb-4">Edit Campaign</h3>
        <form onSubmit={handleSubmit}>
          {/* Type Field */}
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
              {selectedCampaign ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCampaignForm;
