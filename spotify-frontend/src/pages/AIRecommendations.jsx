import { useEffect, useState } from "react";
import { Sparkles, Play, Loader2 } from "lucide-react";

import { getRecommendations } from "../services/aiService";
import { usePlayer } from "../context/PlayerContext";

const AIRecommendations = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { playSong } = usePlayer();

  const fetchRecommendations = async () => {
    try {
      setLoading(true);

      const res = await getRecommendations();

      if (res.success) {
        setSongs(res.songs);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);
    return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div>

          <div className="flex items-center gap-3">

            <Sparkles className="text-green-500" size={34} />

            <h1 className="text-4xl md:text-5xl font-black">
              AI For You
            </h1>

          </div>

          <p className="text-gray-400 mt-3">
            Personalized recommendations based on your listening history.
          </p>

        </div>

        <button
          onClick={fetchRecommendations}
          disabled={loading}
          className="
          bg-green-500
          hover:bg-green-600
          disabled:opacity-50
          px-6
          py-3
          rounded-full
          font-semibold
          transition
          "
        >

          {loading ? (

            <span className="flex items-center gap-2">

              <Loader2
                className="animate-spin"
                size={18}
              />

              Generating...

            </span>

          ) : (

            "Generate Again"

          )}

        </button>

      </div>

      {loading && (

        <div className="flex justify-center py-20">

          <Loader2
            className="animate-spin text-green-500"
            size={55}
          />

        </div>

      )}

      {!loading && songs.length === 0 && (

        <div className="text-center py-20">

          <Sparkles
            size={60}
            className="mx-auto text-gray-500 mb-5"
          />

          <h2 className="text-2xl font-bold">
            No Recommendations
          </h2>

          <p className="text-gray-400 mt-3">
            Listen  some songs first.
          </p>

        </div>

      )}


            {!loading && songs.length > 0 && (

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">

          {songs.map((song) => (

            <div
              key={song._id}
              className="
              bg-[#181818]
              rounded-2xl
              p-4
              hover:bg-[#242424]
              transition
              group
              "
            >

              <div className="relative">

                <img
                  src={`https://spotify-backend-gilt.vercel.app${song.thumbnail}`}
                  alt={song.title}
                  className="
                  w-full
                  aspect-square
                  rounded-xl
                  object-cover
                  "
                />

                <button
                  onClick={() => playSong(song, songs)}
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
                  translate-y-4
                  group-hover:opacity-100
                  group-hover:translate-y-0
                  transition-all
                  "
                >

                  <Play
                    fill="black"
                    size={20}
                    color="black"
                  />

                </button>

              </div>

              <h2 className="mt-4 font-bold truncate">
                {song.title}
              </h2>

              <p className="text-gray-400 text-sm truncate mt-1">
                {song.artist?.name}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default AIRecommendations;