import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AddSong = () => {
  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

  const [form, setForm] = useState({
    title: "",
    genre: "",
    duration: "",
    artist: "",
    album: "",
  });

  const [audio, setAudio] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const artistRes = await API.get("/artists");
    const albumRes = await API.get("/albums");

    setArtists(artistRes.data.artists || []);
    setAlbums(albumRes.data.albums || []);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    data.append("audio", audio);
    data.append("thumbnail", thumbnail);

    try {
      await API.post("/songs", data);

      alert("Song Added Successfully");

      navigate("/admin/songs");
    } catch (err) {
  console.log("Error:", err.response?.data);
  console.log("Status:", err.response?.status);

  alert(err.response?.data?.message || "Failed");
}
  };

  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Add Song
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl"
      >

        <input
          type="text"
          name="title"
          placeholder="Song Title"
          className="w-full p-3 rounded bg-zinc-800"
          onChange={handleChange}
        />

        <input
          type="text"
          name="genre"
          placeholder="Genre"
          className="w-full p-3 rounded bg-zinc-800"
          onChange={handleChange}
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          className="w-full p-3 rounded bg-zinc-800"
          onChange={handleChange}
        />

        <select
          name="artist"
          className="w-full p-3 rounded bg-zinc-800"
          onChange={handleChange}
        >
          <option>Select Artist</option>

          {artists.map((artist) => (
            <option
              key={artist._id}
              value={artist._id}
            >
              {artist.name}
            </option>
          ))}
        </select>

        <select
          name="album"
          className="w-full p-3 rounded bg-zinc-800"
          onChange={handleChange}
        >
          <option>Select Album</option>

          {albums.map((album) => (
            <option
              key={album._id}
              value={album._id}
            >
              {album.title}
            </option>
          ))}
        </select>
<div>
  <label className="block mb-2 font-semibold">
    Audio File
  </label>

  <input
    type="file"
    accept="audio/*"
    onChange={(e) => setAudio(e.target.files[0])}
    className="w-full"
  />
</div>

<div>
  <label className="block mb-2 font-semibold">
    Thumbnail Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setThumbnail(e.target.files[0])}
    className="w-full"
  />
</div>

        <button
          className="bg-green-600 px-6 py-3 rounded"
        >
          Save Song
        </button>

      </form>

    </div>
  );
};

export default AddSong;