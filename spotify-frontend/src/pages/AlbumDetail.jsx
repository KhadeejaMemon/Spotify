import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbum } from "../services/albumService";
import { Play } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
const AlbumDetail = () => {
  const { id } = useParams();

  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
const { playSong } = usePlayer();
  useEffect(() => {
    fetchAlbum();
  }, [id]);

  const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};


  const fetchAlbum = async () => {
    try {
      const res = await getAlbum(id);

      if (res.success) {
        setAlbum(res.album);
        setSongs(res.songs);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#121212] text-white text-xl">
        Loading Album...
      </div>
    );
  }

  if (!album) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#121212] text-red-500 text-xl">
        Album Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">

      {/* Header */}

      <div className="bg-gradient-to-b from-[#4d2d8b] via-[#2b1748] to-[#121212]">

        <div className="flex flex-col md:flex-row items-center md:items-end gap-8 p-10">

          {/* Album Image */}

          <img
            src={`https://spotify-backend-2989kfwwg-khadeeja-memon.vercel.app/${album.coverImage}`}
            alt={album.title}
            className="w-64 h-64 rounded-lg shadow-2xl object-cover"
          />

          {/* Album Info */}

          <div>

            <p className="uppercase text-sm font-semibold tracking-widest text-gray-300">
              Album
            </p>

            <h1 className="text-5xl md:text-7xl font-black mt-3">
              {album.title}
            </h1>

            <p className="text-lg text-gray-300 mt-5">
              {album.artist?.name}
            </p>

            <p className="text-gray-400 mt-2">
              {album.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-5 text-sm text-gray-300">
<button
  onClick={() => playSong(songs[0], songs)}
  className="mt-6 bg-green-500 text-black w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition"
>
  <Play fill="black" />
</button>
              <span>
                📅{" "}
                {album.releaseDate
                  ? new Date(album.releaseDate).getFullYear()
                  : "Unknown"}
              </span>

              <span>•</span>

              <span>{songs.length} Songs</span>

            </div>

          </div>

        </div>

      </div>

      {/* Songs Section */}

      <div className="px-10 py-8">

        <h2 className="text-2xl font-bold mb-6">
          Songs
        </h2>

        {songs.length === 0 ? (
          <p className="text-gray-400">
            No songs available in this album.
          </p>
        ) : (
          <div className="space-y-2">

            {songs.map((song, index) => (
              <div
                key={song._id}
                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#1d1d1d] transition"
              >
                <div className="flex items-center gap-4">

                  <span className="text-gray-400 w-6">
                    {index + 1}
                  </span>

                  <img
                    src={`https://spotify-backend-2989kfwwg-khadeeja-memon.vercel.app/${song.thumbnail}`}
                    alt={song.title}
                    className="w-12 h-12 rounded object-cover"
                  />

                  <div>

                    <h3 className="font-medium">
                      {song.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {song.artist?.name}
                    </p>

                  </div>

                </div>

                <span className="text-gray-400">
                  {song.duration}s
                </span>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default AlbumDetail;