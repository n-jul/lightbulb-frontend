
import Cookies from "js-cookie"
const fetchCampaigns = async () => {
    const token = Cookies.get("access_token");
    if (!token) {
      console.error("Access token not found");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/campaign/api/campaigns/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        return data
      } else {
        console.error("Error fetching campaigns:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
export default fetchCampaigns