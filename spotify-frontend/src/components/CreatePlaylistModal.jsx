import { useState } from "react";
import API from "../services/api";

const CreatePlaylistModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    isPublic: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Playlist name is required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/playlists", form);

      if (res.data.success) {
        alert("Playlist created successfully!");

        onSuccess(); // Refresh playlists
        onClose(); // Close modal
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Failed to create playlist"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-[#181818] w-full max-w-md rounded-xl p-6">

        <h2 className="text-2xl text-white font-bold mb-5">
          Create Playlist
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-gray-300 text-sm">
              Playlist Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 bg-[#282828] text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
              placeholder="My Playlist"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300 text-sm">
              Description
            </label>

            <textarea
              rows="3"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-1 bg-[#282828] text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Write something..."
            />
          </div>

          {/* Public */}
          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
            />

            <span className="text-white">
              Public Playlist
            </span>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-600"
            >
              {loading ? "Creating..." : "Create"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreatePlaylistModal;