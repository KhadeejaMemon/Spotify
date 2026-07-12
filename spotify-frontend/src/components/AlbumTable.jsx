import { useNavigate } from "react-router-dom";

const AlbumTable = ({ albums, onDelete }) => {

  const navigate = useNavigate();


  return (
    <div className="overflow-x-auto bg-[#181818] rounded-lg">

      <table className="w-full text-left text-white">

        <thead className="bg-[#282828]">

          <tr>
            <th className="p-4">Cover</th>
            <th className="p-4">Album</th>
            <th className="p-4">Artist</th>
            <th className="p-4">Year</th>
            <th className="p-4">Actions</th>
          </tr>

        </thead>


        <tbody>

          {
            albums.length > 0 ? (

              albums.map((album) => (

                <tr
                  key={album._id}
                  className="border-b border-gray-700 hover:bg-[#242424]"
                >


                  {/* Cover */}

                  <td className="p-4">

                    <img
                      src={
                        album.coverImage
                          ? album.coverImage
                          : "/default-album.png"
                      }
                      alt={album.title}
                      className="w-16 h-16 rounded object-cover"
                    />

                  </td>



                  {/* Album Name */}

                  <td className="p-4 font-semibold">

                    {album.title}

                  </td>



                  {/* Artist */}

                  <td className="p-4">

                    {album.artist?.name || "Unknown"}

                  </td>



                  {/* Year */}

                  <td className="p-4">

                    {
                      album.releaseDate
                      ? new Date(album.releaseDate).getFullYear()
                      : "-"
                    }

                  </td>



                  {/* Actions */}

                  <td className="p-4 space-x-2">


                    {/* Edit Button */}

                    <button

                      onClick={() =>
                        navigate(
                          `/admin/albums/edit/${album._id}`
                        )
                      }

                      className="
                        bg-yellow-500
                        hover:bg-yellow-600
                        text-black
                        px-3
                        py-1
                        rounded
                      "

                    >

                      Edit

                    </button>



                    {/* Delete Button */}

                    <button

                      onClick={() =>
                        onDelete(album._id)
                      }

                      className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-3
                        py-1
                        rounded
                      "

                    >

                      Delete

                    </button>


                  </td>


                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="
                    text-center
                    py-8
                    text-gray-400
                  "
                >

                  No Albums Found

                </td>

              </tr>

            )
          }


        </tbody>


      </table>


    </div>
  );

};


export default AlbumTable;