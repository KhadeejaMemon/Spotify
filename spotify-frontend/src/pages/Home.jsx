import { useEffect, useState } from "react";
import API from "../services/api";
import SongCard from "../components/SongCard";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";
import { useSearch } from "../context/SearchContext";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  const { selectedSong } = useSearch();

  const fetchData = async () => {
    try {
      const [songRes, albumRes, artistRes] = await Promise.all([
        API.get("/songs"),
        API.get("/albums"),
        API.get("/artists"),
      ]);

      if (songRes.data.success) {
        setSongs(songRes.data.songs);
      }

      if (albumRes.data.success) {
        setAlbums(albumRes.data.albums);
      }

      if (artistRes.data.success) {
        setArtists(artistRes.data.artists);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displaySongs = selectedSong ? [selectedSong] : songs;

  if (loading) {
    return (
      <div className="text-white p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-12">

      {/* Header */}
      <h1 className="text-4xl font-bold text-white">
        Good Evening 🎧
      </h1>

      {/* Trending Songs */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-5">
          Trending Songs
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displaySongs.map((song) => (
            <SongCard
              key={song._id}
              song={song}
              songs={displaySongs}
            />
          ))}
        </div>
      </section>

      {/* Popular Albums */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-5">
          Popular Albums
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {albums.map((album) => (
            <AlbumCard
              key={album._id}
              album={album}
            />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-5">
          Popular Artists
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.map((artist) => (
            <ArtistCard
              key={artist._id}
              artist={artist}
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;