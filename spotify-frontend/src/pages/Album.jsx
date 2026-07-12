import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlbumCard from "../components/AlbumCard";
import { getAlbums } from "../services/albumService";

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const res = await getAlbums();

      if (res.success) {
        setAlbums(res.albums);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading Albums...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Albums
        </h1>

        <p className="text-gray-400 mt-2">
          Browse your favourite albums.
        </p>

      </div>

      {/* Albums */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">

        {albums.map((album) => (

          <AlbumCard
            key={album._id}
            album={album}
          />

        ))}

      </div>

      {!loading && albums.length === 0 && (

        <div className="text-center text-gray-400 mt-20">

          No Albums Found

          <div className="mt-5">

            <Link
              to="/"
              className="text-green-500"
            >
              Back Home
            </Link>

          </div>

        </div>

      )}

    </div>
  );
};

export default Album;