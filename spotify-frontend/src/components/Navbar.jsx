import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Navbar = () => {

  const navigate = useNavigate();

  const { user, logout } = useAuth();


  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    setSelectedSong,
  } = useSearch();



  const handleSearch = async (e) => {

    const value = e.target.value;

    setSearchQuery(value);


    if (value.trim() === "") {

      setSearchResults([]);

      return;

    }


    try {

      const res = await API.get(`/search?q=${value}`);


      if (res.data.success) {

        setSearchResults(res.data.songs);

      }


    } catch (error) {

      console.log(error);

    }

  };




  const handleLogout = () => {

    logout();

    navigate("/");

  };




  return (

    <div className="
sticky
top-0
z-50
flex
items-center
justify-between
bg-[#121212]/95
backdrop-blur-md
px-4 md:px-6
py-4
border-b
border-gray-800
">



      {/* LEFT */}

      <div className="flex items-center gap-3">


       <button
  onClick={() => navigate(-1)}
  className="
    w-10
    h-10
    flex
    items-center
    justify-center
    rounded-full
    bg-[#0f0f0f]
    hover:bg-[#2a2a2a]
    transition
    cursor-pointer
    hover:scale-105
active:scale-95
duration-300
  "
>
  <FaChevronLeft size={17} />
</button>

<button
  onClick={() => navigate(1)}
  className="
    w-10
    h-10
    flex
    items-center
    justify-center
    rounded-full
    bg-[#0f0f0f]
    hover:bg-[#2a2a2a]
    transition
    cursor-pointer
    hover:scale-105
active:scale-95
duration-300
  "
>
  <FaChevronRight size={17} />
</button>

      </div>





      {/* SEARCH */}

  <div className="relative w-44 sm:w-64 md:w-[360px]">

        <input

          type="text"

          value={searchQuery}

          onChange={handleSearch}

          placeholder="Search songs..."

   className="
w-full
rounded-full
bg-[#242424]
px-5
py-2.5
text-white
outline-none
border
border-transparent
focus:border-green-500
hover:bg-[#2c2c2c]
shadow-md
transition-all
duration-300
placeholder:text-gray-400
"
        />





      {searchResults.length > 0 && (

  <div
 className="
absolute
top-full
left-0
right-0
mt-2
bg-[#181818]
rounded-xl
shadow-2xl
border
border-gray-700
overflow-hidden
z-50
animate-in
fade-in
zoom-in-95
duration-200
"
  >

              {
                searchResults.map((song)=>(


                 <div
  key={song._id}
  onClick={() => {
    setSelectedSong(song);
    setSearchQuery(song.title);
    setSearchResults([]);
  }}
  className="
    cursor-pointer
    px-4
    py-3
   hover:bg-[#282828]
hover:pl-6
transition-all
duration-300
   
  "
>
  <p className="text-white font-medium">
    {song.title}
  </p>

  <p className="text-sm text-gray-400">
    {song.artist?.name}
  </p>
</div>


                ))

              }


            </div>


          )
        }



      </div>







      {/* RIGHT */}

   <div className="flex items-center gap-3 shrink-0">


        {
          user ? (

            <>


              <button

                onClick={() => navigate("/profile")}

               className="
px-5
font-medium
py-2
rounded-full
text-gray-300
hover:text-white
hover:bg-[#2a2a2a]
transition-all
duration-300
cursor-pointer
"

              >

                Profile

              </button>




              <button

                onClick={handleLogout}

                className="
bg-red-500
hover:bg-red-600
hover:scale-105
active:scale-95
hover:shadow-red-500/30
transition-all
duration-300
text-white
px-5
py-2
rounded-full
font-semibold
cursor-pointer
shadow-lg
"

              >

                Logout

              </button>



            </>


          ) : (


            <>


              <button

                onClick={() => navigate("/login")}

                className="
px-5
font-medium
  py-2
  rounded-full
  text-gray-300
  hover:text-white
  hover:bg-[#2a2a2a]
  transition-all
  duration-300
  cursor-pointer
"

              >

                Login

              </button>




              <button

                onClick={() => navigate("/register")}
className="
bg-white
text-black
px-6
py-2
rounded-full
font-semibold
shadow-lg
hover:shadow-white/20
hover:scale-105
active:scale-95
transition-all
duration-300
cursor-pointer


"

              >

                Sign up

              </button>



            </>


          )
        }



      </div>




    </div>

  );

};


export default Navbar;