import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { setStorePractices } from "../store/authSlice"; // Adjust path if needed

const SendCampaignModal = ({ selectedCampaign, setIsModalOpen }) => {
  const practices = useSelector((state) => state.auth.practices); // Access practices from Redux
  const [selectedPractices, setSelectedPractices] = useState([]);

  const handleSelectPractice = (practice) => {
    if (selectedPractices.includes(practice)) {
      setSelectedPractices(selectedPractices.filter((p) => p !== practice));
    } else {
      setSelectedPractices([...selectedPractices, practice]);
    }
  };

  const handleSend = async () => {
    try {
      // Prepare the data to send (assuming selectedCampaign has an `id` field)
      const campaignData = {
        campaign_id: selectedCampaign.id, // Campaign ID
        practice_ids: selectedPractices,  // Array of selected practice IDs
      };
  
      const response = await fetch("http://127.0.0.1:8000/campaign/api/sa_campaigns/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Set the content type to JSON
        },
        body: JSON.stringify(campaignData),  // Convert data to JSON
      });
  
      if (!response.ok) {
        throw new Error("Failed to send campaigns..");
      }
  
      const data = await response.json();
      console.log("Campaign sent successfully:", data);
      setIsModalOpen(false); // Close modal after success
    } catch (error) {
      console.error("Error sending campaign:", error);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h3 className="text-lg font-bold mb-4">Send Campaign</h3>
        <p className="mb-2">Select practices to send "{selectedCampaign.text}" campaign:</p>

        <div className="space-y-2 mb-4">
          {practices.length > 0 ? (
            practices.map((practice) => (
              <label key={practice.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedPractices.includes(practice.id)}
                  onChange={() => handleSelectPractice(practice.id)}
                />
                <span>{practice.name}</span>
              </label>
            ))
          ) : (
            <p>No practices available</p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendCampaignModal;
