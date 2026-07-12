const UserTable = ({ users }) => {
  return (
    <div className="overflow-x-auto bg-[#181818] rounded-lg">

      <table className="w-full text-white">

        <thead className="bg-[#282828]">

          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Joined</th>
            <th className="p-4">Actions</th>
          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user._id}
              className="border-b border-gray-700 hover:bg-[#242424]"
            >

              <td className="p-4">
                {user.name}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.role === "admin"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {user.role}
                </span>

              </td>

              <td className="p-4">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

              <td className="p-4">

                <button
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
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

export default UserTable;