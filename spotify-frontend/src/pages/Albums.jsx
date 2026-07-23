import { useEffect, useState } from "react";
import { getAlbums } from "../services/albumService";
import AlbumTable from "../components/AlbumTable";
import { useNavigate } from "react-router-dom";
import { deleteAlbum } from "../services/albumService";
const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);


const handleDelete = async(id)=>{

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this album?"
  );


  if(!confirmDelete) return;


  try{

    const res = await deleteAlbum(id);


    if(res.data.success){

      setAlbums(
        albums.filter(
          (album)=>album._id !== id
        )
      );


      alert(
        "Album Deleted Successfully"
      );

    }


  }catch(error){

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Delete Failed"
    );

  }

};
  useEffect(() => {
    fetchAlbums();
  }, []);


  const fetchAlbums = async () => {
  try {
    setLoading(true);

    const res = await getAlbums();

    if (res.data.success) {
      setAlbums(res.data.albums);
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
          Albums Management
        </h1>

        <button
  onClick={() => navigate("/admin/albums/add")}
  className="
    bg-green-600
    hover:bg-green-700
    px-4
    py-2
    rounded
  "
>
  Add Album
</button>
      </div>
<AlbumTable
  albums={albums}
  onDelete={handleDelete}
/>
    </div>
  );
};

export default Albums;