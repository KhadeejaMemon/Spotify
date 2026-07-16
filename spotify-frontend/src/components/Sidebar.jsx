import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaSearch,
  FaHeart,
  FaList,
  FaUser,
} from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

import { History } from "lucide-react";


const Sidebar = () => {

  const location = useLocation();
const { user } = useAuth();


  return (

 <div
className="
w-20
md:w-64
flex-shrink-0
bg-[#0d0d0d]
border-r
border-gray-800
min-h-screen
p-3
md:p-5
transition-all
duration-300
shadow-2xl
"
>

<h1
className="
hidden
md:flex
items-center
gap-3
mb-8
text-3xl
font-bold
tracking-wide
text-white
select-none
"
>

<span
className="
text-green-500
text-4xl
"
>
🎵
</span>

<span
className="
hover:text-green-500
transition-all
duration-300
"
>
Spotify
</span>

</h1>




      <nav className="
        flex
        flex-col
        gap-2
        text-gray-400
      ">


        {/* Home */}

        <Link

          to="/"

          className={`
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-lg
           transition-all
duration-300
cursor-pointer
hover:translate-x-1

            ${
              location.pathname === "/"
              ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
              : "hover:text-white hover:bg-[#1d1d1d] hover:shadow-md"
            }

          `}

        >

          <FaHome />

          <span className="hidden md:inline">
    Home
</span>

        </Link>





        {/* Search */}

        <Link

          to="/search"

          className={`
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-lg
            transition-all
duration-300
cursor-pointer
hover:translate-x-1

            ${
              location.pathname === "/search"
              ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
              : "hover:text-white hover:bg-[#1d1d1d] hover:shadow-md"
            }

          `}

        >

          <FaSearch />

          <span className="hidden md:inline">
            Search
          </span>

        </Link>







        {/* Library */}

        <Link

          to="/library"

          className={`
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-lg
          transition-all
duration-300
cursor-pointer
hover:translate-x-1

            ${
              location.pathname === "/library"
            ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
              : "hover:text-white hover:bg-[#1d1d1d] hover:shadow-md"
            }

          `}

        >

          <FaList />

          <span className="hidden md:inline">
            Your Library
          </span>

        </Link>







        {/* Liked Songs */}

        <Link

          to="/liked"

          className={`
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-lg
          transition-all
duration-300
cursor-pointer
hover:translate-x-1

            ${
              location.pathname === "/liked"
              ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
              : "hover:text-white hover:bg-[#1d1d1d] hover:shadow-md"
            }

          `}

        >

          <FaHeart />

          <span className="hidden md:inline">
            Liked Songs
          </span>

        </Link>







        {/* Playlists */}

        <Link

          to="/playlists"

          className={`
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-lg
           transition-all
duration-300
cursor-pointer
hover:translate-x-1

            ${
              location.pathname === "/playlists"
              ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
              : "hover:text-white hover:bg-[#1d1d1d] hover:shadow-md"
            }

          `}

        >

          <FaList />

          <span className="hidden md:inline">
            Playlists
          </span>

        </Link>







        {/* History */}

        <Link

          to="/history"

          className={`
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-lg
            transition-all
duration-300
cursor-pointer
hover:translate-x-1

            ${
              location.pathname === "/history"
             ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
              : "hover:text-white hover:bg-[#1d1d1d] hover:shadow-md"
            }

          `}

        >

          <History size={18}/>

          <span className="hidden md:inline">
            History
          </span>

        </Link>







        {/* Profile */}

        <Link

          to="/profile"

          className={`
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-lg
            transition-all
duration-300
cursor-pointer
hover:translate-x-1

            ${
              location.pathname === "/profile"
              ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
              : "hover:text-white hover:bg-[#1d1d1d] hover:shadow-md"
            }

          `}

        >

          <FaUser />

          <span className="hidden md:inline">
            Profile
          </span>

        </Link>


{user?.role === "admin" && (
  <Link
    to="/admin"
    className={`
      flex
      items-center
      gap-3
      px-4
      py-3
      rounded-lg
      transition-all
duration-300
cursor-pointer
hover:translate-x-1
      ${
        location.pathname.startsWith("/admin")
          ? "bg-green-600 text-white"
          : "hover:text-white hover:bg-[#1f1f1f]"
      }
    `}
  >
    <FaTools />
    <span className="hidden md:inline">Admin Panel</span>
  </Link>
)}

      </nav>


    </div>

  );

};


export default Sidebar;