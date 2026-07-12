const UsersTable = ({ users, onDelete }) => {


  return (

    <div className="overflow-x-auto bg-[#181818] rounded-lg">


      <table className="w-full text-left text-white">


        <thead className="bg-[#282828]">

          <tr>

            <th className="p-4">
              Name
            </th>

            <th className="p-4">
              Email
            </th>

            <th className="p-4">
              Role
            </th>

            <th className="p-4">
              Actions
            </th>

          </tr>

        </thead>



        <tbody>


        {
          users.length > 0 ? (

            users.map((user)=>(


              <tr

                key={user._id}

                className="
                border-b
                border-gray-700
                hover:bg-[#242424]
                "

              >



                <td className="p-4">

                  {user.name}

                </td>




                <td className="p-4">

                  {user.email}

                </td>




                <td className="p-4">

                  {user.role}

                </td>




                <td className="p-4">


                  <button

                    onClick={() =>
                      onDelete(user._id)
                    }

                    className="
                    bg-red-500
                    hover:bg-red-600
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

                No Users Found

              </td>


            </tr>


          )

        }



        </tbody>


      </table>


    </div>

  );

};


export default UsersTable;