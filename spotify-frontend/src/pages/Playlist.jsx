import { useEffect, useState } from "react";
import { getPlaylists } from "../services/playlistService";
import PlaylistCard from "../components/PlaylistCard";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
const token = localStorage.getItem("token");

const handleCreatePlaylist = () => {
  if (!token) {
    alert("Please login first to create playlist");
    navigate("/login");
    return;
  }

  navigate("/create-playlist");
};
const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
const [showModal, setShowModal] = useState(false);
const [editOpen,setEditOpen] = useState(false);
  const fetchPlaylists = async () => {
    try {
      const data = await getPlaylists();

      if (data.success) {
        setPlaylists(data.playlists);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

 
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold text-white">
    My Playlists
  </h1>

  <button
    onClick={() => setShowModal(true)}
    onClick={handleCreatePlaylist}
    className="bg-green-500 hover:bg-green-600 text-black px-5 py-2 rounded-full font-semibold"
  >
    + Create Playlist
  </button>


</div>
      {loading && (
        <p className="text-gray-400">
          Loading playlists...
        </p>
      )}

      {!loading && playlists.length === 0 && (
        <p className="text-gray-400">
          No playlists found.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist._id}
            playlist={playlist}
          />
        ))}

        {showModal && (
  <CreatePlaylistModal
    onClose={() => setShowModal(false)}
    onSuccess={fetchPlaylists}
  />
)}


      </div>
    </div>
  );
};

export default Playlist;