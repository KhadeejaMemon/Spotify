import { useState } from "react";
import { deletePlaylist } from "../services/playlistService";

const DeletePlaylistModal = ({
  playlist,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deletePlaylist(playlist._id);

      alert("Playlist deleted successfully");

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Failed to delete playlist"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#181818] rounded-xl p-6 w-[400px]">

        <h2 className="text-white text-2xl font-bold">
          Delete Playlist
        </h2>

        <p className="text-gray-400 mt-4">
          Are you sure you want to delete
          <span className="text-white font-semibold">
            {" "}
            {playlist.name}
          </span>
          ?
        </p>

        <p className="text-red-400 text-sm mt-2">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeletePlaylistModal;