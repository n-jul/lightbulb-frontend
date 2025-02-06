import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns, setPagination } from "../store/campaignSlice";
import CampaignList from "./CampaignList";
import EditCampaignForm from "./EditCampaignForm";
import SendCampaignModal from "./SendCampaignModal";

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const campaigns = useSelector((state) => state.campaigns.list);
  const status = useSelector((state) => state.campaigns.status);
  const currentPage = useSelector((state) => state.campaigns.currentPage);
  const totalPages = useSelector((state) => state.campaigns.totalPages);
  const pageSize = useSelector((state) => state.campaigns.pageSize);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    dispatch(fetchCampaigns({ page: currentPage, page_size: pageSize }));
  }, [dispatch,currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage > 0  && newPage !== currentPage) {
      dispatch(setPagination({ page: newPage, page_size: pageSize }));
    }
  };
  // Open Create Campaign Form
  const openCreateForm = () => {
    setSelectedCampaign(null);
    setIsEditModalOpen(true);
  };

  // Open Edit Form
  const openEditForm = (campaign) => {
    setSelectedCampaign(campaign);
    setIsEditModalOpen(true);
  };

  // Open Send Modal
  const openSendModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsSendModalOpen(true);
  };

  return (
    <div>
      {/* Header with Create Campaign Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Campaign Management
        </h2>
        <button
          onClick={openCreateForm} // Opens modal for creating a new campaign
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Campaign
        </button>
      </div>
      {/* Show Loading Indicator */}
      {status === "loading" && <p>Loading campaigns...</p>}
      {status === "failed" && <p>Error fetching campaigns.</p>}
      {/* Campaign List */}
      <CampaignList
        campaigns={campaigns}
        openEditForm={openEditForm}
        openSendModal={openSendModal}
      />
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || status === "loading"}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          Next
        </button>
      </div>

      {/* Edit/Create Campaign Modal */}
      {isEditModalOpen && (
        <EditCampaignForm
          selectedCampaign={selectedCampaign}
          setIsModalOpen={setIsEditModalOpen}
          refreshCampaigns={fetchCampaigns}
        />
      )}

      {/* Send Campaign Modal */}
      {isSendModalOpen && (
        <SendCampaignModal
          selectedCampaign={selectedCampaign}
          setIsModalOpen={setIsSendModalOpen}
        />
      )}
    </div>
  );
};

export default SuperAdminDashboard;
