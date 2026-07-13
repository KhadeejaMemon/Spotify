import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";


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
      flex
      items-center
      justify-between
      bg-[#121212]
      px-6
      py-4
      border-b
      border-gray-800
    ">



      {/* LEFT */}

      <div className="flex items-center gap-3">


        <button

          onClick={() => navigate(-1)}

          className="
            w-8
            h-8
            rounded-full
            bg-black
            text-white
          "

        >
          ←
        </button>



        <button

          onClick={() => navigate(1)}

          className="
            w-8
            h-8
            rounded-full
            bg-black
            text-white
          "

        >
          →
        </button>


      </div>





      {/* SEARCH */}

    <div className="relative w-32 sm:w-48 md:w-[350px]">


        <input

          type="text"

          value={searchQuery}

          onChange={handleSearch}

          placeholder="Search songs..."

          className="
            w-full
            rounded-full
            bg-[#242424]
            px-4
            py-2
            text-white
            outline-none
          "

        />





        {
          searchResults.length > 0 && (

            <div className="
              absolute
              left-0
              right-0
              mt-2
              rounded-lg
              bg-[#181818]
              shadow-lg
              z-50
            ">


              {
                searchResults.map((song)=>(


                  <div

                    key={song._id}

                    className="
                      cursor-pointer
                      p-3
                      hover:bg-[#282828]
                    "


                    onClick={() => {

                      setSelectedSong(song);

                      setSearchQuery(song.title);

                      setSearchResults([song]);

                    }}

                  >


                    <p className="
                      text-white
                      font-semibold
                    ">

                      {song.title}

                    </p>



                    <p className="
                      text-sm
                      text-gray-400
                    ">

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

    <div className="flex gap-2 md:gap-3 items-center">


        {
          user ? (

            <>


              <button

                onClick={() => navigate("/profile")}

                className="
                  text-gray-300
                  hover:text-white
                "

              >

                Profile

              </button>




              <button

                onClick={handleLogout}

                className="
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-3 
                  md:px-5 py-2 text-sm md:text-base
                  rounded-full
                  font-semibold
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
                  text-gray-300
                  hover:text-white
                  hidden sm:block 
                "

              >

                Login

              </button>




              <button

                onClick={() => navigate("/register")}

                className="
                  bg-white
                  text-black
                 px-3 md:px-4 py-2 text-sm md:text-base
                  rounded-full
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