import { useNavigate } from "react-router-dom";

const AlbumCard = ({ album }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/albums/${album._id}`)}
      className="group cursor-pointer rounded-lg p-3 hover:bg-[#1a1a1a] transition-all duration-300"
    >
      <div className="overflow-hidden rounded-lg">

        <img
          src={`http://localhost:5000${album.coverImage}`}
          alt={album.title}
          className="w-full aspect-square object-cover group-hover:scale-105 transition duration-300"
        />

      </div>

      <h2 className="text-white font-semibold mt-3 truncate">
        {album.title}
      </h2>

      <p className="text-gray-400 text-sm truncate">
        Album • {album.artist?.name}
      </p>
    </div>
  );
};

export default AlbumCard;