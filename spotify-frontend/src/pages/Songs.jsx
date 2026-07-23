import { useEffect, useState } from "react";

import SongTable from "../components/SongTable";

import {
  getSongs,
  deleteSong,
} from "../services/songService";

import { useNavigate } from "react-router-dom";

const Songs = () => {
 const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);



 const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this song?"
  );

  if (!confirmDelete) return;

  try {

    const res = await deleteSong(id);

    if (res.data.success) {

      setSongs(
        songs.filter((song) => song._id !== id)
      );

      alert("Song Deleted Successfully");

    }

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message
    );

  }

};
  useEffect(() => {

    fetchSongs();

  }, []);

  const fetchSongs = async () => {
  try {
    setLoading(true);

    const res = await getSongs();

    if (res.data.success) {
      setSongs(res.data.songs);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
if (loading) {
  return (
    <p className="text-white">
      Loading...
    </p>
  );
}
  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl text-white font-bold">

          Songs Management

        </h1>

       
<button
  onClick={() => navigate("/admin/songs/add")}
  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
>
  Add Song
</button>

      </div>

      <SongTable
   songs={songs}
   onDelete={handleDelete}
/>
    </div>

  );

};

export default Songs;