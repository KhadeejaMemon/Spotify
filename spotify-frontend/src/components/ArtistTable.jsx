import { useNavigate } from "react-router-dom";


const ArtistTable = ({ artists, onDelete }) => {


  const navigate = useNavigate();



  return (

    <div className="overflow-x-auto bg-[#181818] rounded-lg">


      <table className="w-full text-left text-white">


        <thead className="bg-[#282828]">

          <tr>

            <th className="p-4">
              Image
            </th>

            <th className="p-4">
              Name
            </th>

            <th className="p-4">
              Bio
            </th>

            <th className="p-4">
              Actions
            </th>


          </tr>

        </thead>



        <tbody>


          {
            artists.length > 0 ? (

              artists.map((artist)=>(


                <tr
                  key={artist._id}
                  className="
                  border-b
                  border-gray-700
                  hover:bg-[#242424]
                  "
                >



                  <td className="p-4">


                    <img

                      src={
                        artist.image
                        ? `http://localhost:5000${artist.image}`
                        : "/default-user.png"
                      }

                      alt={artist.name}

                      className="
                      w-16
                      h-16
                      rounded-full
                      object-cover
                      "

                    />


                  </td>




                  <td className="p-4 font-semibold">

                    {artist.name}

                  </td>





                  <td className="p-4">

                    {artist.bio || "-"}

                  </td>





                  <td className="p-4 space-x-2">



                    <button

                      onClick={() =>
                        navigate(
                          `/admin/artists/edit/${artist._id}`
                        )
                      }

                      className="
                      bg-yellow-500
                      px-3
                      py-1
                      rounded
                      text-black
                      "

                    >

                      Edit

                    </button>





                    <button

                      onClick={() =>
                        onDelete(artist._id)
                      }

                      className="
                      bg-red-500
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
                  colSpan="4"
                  className="
                  text-center
                  py-8
                  text-gray-400
                  "
                >

                  No Artists Found


                </td>


              </tr>


            )
          }


        </tbody>



      </table>


    </div>

  );

};


export default ArtistTable;