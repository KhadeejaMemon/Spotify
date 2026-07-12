import { useNavigate } from "react-router-dom";
const SongTable = ({ songs, onDelete }) => {
    const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">

      <table className="w-full text-white">

        <thead className="bg-[#202020]">

          <tr>

            <th className="p-3 text-left">Image</th>

            <th className="p-3 text-left">Title</th>

            <th className="p-3 text-left">Artist</th>

            <th className="p-3 text-left">Album</th>

            <th className="p-3 text-left">Actions</th>

          </tr>

        </thead>

        <tbody>

          {songs.map((song) => (

            <tr
              key={song._id}
              className="border-b border-gray-700"
            >

              <td className="p-3">
               <img
  src={`https://spotify-backend-gilt.vercel.app${song.thumbnail}`}
  alt={song.title}
  className="w-16 h-16 object-cover rounded"
/>
              </td>

              <td className="p-3">
                {song.title}
              </td>

              <td className="p-3">
                {song.artist?.name}
              </td>

              <td className="p-3">
                {song.album?.title}
              </td>

              <td className="p-3">

                <button
  onClick={() =>
    navigate(`/admin/songs/edit/${song._id}`)
  }
  className="
    text-green-500
    hover:text-green-700
    mr-4
  "
>
  Edit
</button>

              <button
  onClick={() =>
    onDelete(song._id)
  }
  className="
     text-red-500
     hover:text-red-700
  "
>
  Delete
</button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default SongTable;