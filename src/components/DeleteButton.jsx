import { useState } from "react";
import {useDispatch} from "react-redux"
import {removeCampaign} from "../store/campaignSlice"
import Cookies from "js-cookie"
const DeleteButton = ({ campaignId, onDeleteSuccess}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) {
      return;
    }

    setLoading(true);

    try { 
    const token = Cookies.get("access_token")
    if(!token){
        console.error("Access token not found")
        return
    }
      const response = await fetch(`http://127.0.0.1:8000/campaign/api/campaigns/${campaignId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        alert("Campaign deleted successfully!");
        if(onDeleteSuccess){
          onDeleteSuccess(campaignId)
        }else{
          dispatch(removeCampaign(campaignId))
        }
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete campaign.");
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
      alert("An error occurred while deleting the campaign.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
    >
      {loading ? "Deleting..." : `Delete`}
    </button>
  );
};

export default DeleteButton;
