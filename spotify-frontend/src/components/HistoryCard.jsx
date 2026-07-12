import { usePlayer } from "../context/PlayerContext";
import { Play } from "lucide-react";

const HistoryCard = ({ item, history }) => {
  const { playSong } = usePlayer();

  const songs = history.map((h) => h.song);

  return (
    <div
      onClick={() => playSong(item.song, songs)}
      className="
        group
        cursor-pointer
        rounded-xl
        p-3
        hover:bg-[#181818]
        transition-all
        duration-300
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl aspect-square">

        <img
          src={`http://localhost:5000${item.song.thumbnail}`}
          alt={item.song.title}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-105
            transition
            duration-300
          "
        />

        {/* Play Button */}
        <button
          className="
            absolute
            bottom-3
            right-3
            w-12
            h-12
            rounded-full
            bg-green-500
            flex
            items-center
            justify-center
            opacity-0
            translate-y-3
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-300
            shadow-xl
          "
        >
          <Play
            size={18}
            fill="black"
            color="black"
          />
        </button>

      </div>

      {/* Song */}
      <h2 className="text-white font-semibold mt-4 truncate">
        {item.song.title}
      </h2>

      {/* Artist */}
      <p className="text-gray-400 text-sm truncate">
        {item.song.artist?.name}
      </p>

      {/* Played Date */}
      <p className="text-gray-500 text-xs mt-2">
        Played on{" "}
        {new Date(item.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default HistoryCard;