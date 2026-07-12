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

    <div className="
      w-60
      bg-black
      p-5
      hidden
      md:block
      border-r
      border-gray-800
      min-h-screen
    ">


      <h1 className="
        text-2xl
        font-bold
        mb-6
        text-white
      ">
        🎵 Spotify
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
            transition

            ${
              location.pathname === "/"
              ? "bg-[#282828] text-white"
              : "hover:text-white hover:bg-[#1f1f1f]"
            }

          `}

        >

          <FaHome />

          <span>
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
            transition

            ${
              location.pathname === "/search"
              ? "bg-[#282828] text-white"
              : "hover:text-white hover:bg-[#1f1f1f]"
            }

          `}

        >

          <FaSearch />

          <span>
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
            transition

            ${
              location.pathname === "/library"
              ? "bg-[#282828] text-white"
              : "hover:text-white hover:bg-[#1f1f1f]"
            }

          `}

        >

          <FaList />

          <span>
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
            transition

            ${
              location.pathname === "/liked"
              ? "bg-[#282828] text-white"
              : "hover:text-white hover:bg-[#1f1f1f]"
            }

          `}

        >

          <FaHeart />

          <span>
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
            transition

            ${
              location.pathname === "/playlists"
              ? "bg-[#282828] text-white"
              : "hover:text-white hover:bg-[#1f1f1f]"
            }

          `}

        >

          <FaList />

          <span>
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
            transition

            ${
              location.pathname === "/history"
              ? "bg-[#282828] text-white"
              : "hover:text-white hover:bg-[#1f1f1f]"
            }

          `}

        >

          <History size={18}/>

          <span>
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
            transition

            ${
              location.pathname === "/profile"
              ? "bg-[#282828] text-white"
              : "hover:text-white hover:bg-[#1f1f1f]"
            }

          `}

        >

          <FaUser />

          <span>
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
      transition
      ${
        location.pathname.startsWith("/admin")
          ? "bg-green-600 text-white"
          : "hover:text-white hover:bg-[#1f1f1f]"
      }
    `}
  >
    <FaTools />
    <span>Admin Panel</span>
  </Link>
)}

      </nav>


    </div>

  );

};


export default Sidebar;