import { useState } from "react";
import API from "../services/api";
import SongCard from "../components/SongCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);

  const handleSearch = async (value) => {
    setQuery(value);

    if (value.length < 2) {
      setSongs([]);
      return;
    }

    try {
      const res = await API.get(`/search?q=${value}`);

      if (res.data.success) {
        setSongs(res.data.songs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-white mb-6">
        🔍 Search Music
      </h1>

      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search songs, artists..."
        className="w-full p-3 rounded-full bg-[#181818] text-white outline-none"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>

    </div>
  );
};

export default Search;