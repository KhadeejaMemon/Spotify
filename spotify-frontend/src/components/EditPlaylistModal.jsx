import { useState } from "react";
import { updatePlaylist } from "../services/playlistService";

const EditPlaylistModal = ({
  playlist,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState(playlist.name);
  const [description, setDescription] = useState(
    playlist.description || ""
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updatePlaylist(playlist._id, {
        name,
        description,
      });

      alert("Playlist updated successfully");

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-[#181818] rounded-xl p-6 w-[420px]">

        <h2 className="text-white text-2xl font-bold mb-5">
          Edit Playlist
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Playlist Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-[#282828] text-white p-3 rounded-lg outline-none"
            required
          />

          <textarea
            rows="4"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full bg-[#282828] text-white p-3 rounded-lg outline-none resize-none"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-black font-semibold"
            >
              {loading ? "Saving..." : "Save"}
            </button>

          </div>
        </form>

      </div>
    </div>
  );
};

export default EditPlaylistModal;