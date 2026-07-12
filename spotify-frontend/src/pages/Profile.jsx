import { useEffect, useState } from "react";
import API from "../services/api";
import { User, Heart, ListMusic, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {

  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchProfile = async () => {
    try {

      const res = await API.get("/auth/me");

      if (res.data.success) {

        setProfileUser(res.data.user);
        setStats(res.data.stats);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };


  const handleLogout = () => {

    logout();

    navigate("/");

  };


  useEffect(() => {

    fetchProfile();

  }, []);



  if (loading) {

    return (
      <div className="
        min-h-screen
        bg-[#121212]
        flex
        items-center
        justify-center
        text-white
      ">
        Loading Profile...
      </div>
    );

  }



  return (

    <div className="
      min-h-screen
      bg-[#121212]
      text-white
    ">


      {/* Profile Header */}

      <div className="
        bg-gradient-to-b
        from-[#3b3b3b]
        to-[#121212]
      ">

        <div className="
          flex
          flex-col
          md:flex-row
          items-center
          md:items-end
          gap-8
          p-10
        ">


          {/* Avatar */}

          <div className="
            w-52
            h-52
            rounded-full
            bg-[#282828]
            flex
            items-center
            justify-center
            shadow-2xl
          ">

            <User size={90}/>

          </div>



          {/* User Info */}

          <div>

            <p className="
              uppercase
              text-sm
              text-gray-300
              font-semibold
            ">
              Profile
            </p>


            <h1 className="
              text-5xl
              md:text-7xl
              font-black
              mt-3
            ">
              {profileUser?.name}
            </h1>


            <p className="
              text-gray-300
              text-lg
              mt-4
            ">
              {profileUser?.email}
            </p>


          </div>


        </div>


      </div>





      {/* Activity */}

      <div className="p-10">


        <h2 className="
          text-3xl
          font-bold
          mb-8
        ">
          Your Activity
        </h2>



        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        ">



          {/* Liked Songs */}

          <div className="
            bg-[#181818]
            hover:bg-[#282828]
            rounded-xl
            p-6
            transition
          ">

            <Heart
              size={40}
              className="text-green-500 mb-4"
            />


            <h3 className="
              text-4xl
              font-bold
            ">
              {stats?.likedSongs || 0}
            </h3>


            <p className="text-gray-400 mt-2">
              Liked Songs
            </p>


          </div>





          {/* Playlist */}

          <div className="
            bg-[#181818]
            hover:bg-[#282828]
            rounded-xl
            p-6
            transition
          ">


            <ListMusic
              size={40}
              className="text-green-500 mb-4"
            />


            <h3 className="
              text-4xl
              font-bold
            ">
              {stats?.playlists || 0}
            </h3>


            <p className="text-gray-400 mt-2">
              Playlists
            </p>


          </div>





          {/* History */}

          <div className="
            bg-[#181818]
            hover:bg-[#282828]
            rounded-xl
            p-6
            transition
          ">


            <History
              size={40}
              className="text-green-500 mb-4"
            />


            <h3 className="
              text-4xl
              font-bold
            ">
              {stats?.history || 0}
            </h3>


            <p className="text-gray-400 mt-2">
              Recently Played
            </p>


          </div>



        </div>





        {/* Logout Only For Logged User */}

        {user && (

          <div className="
            flex
            justify-center
            mt-10
          ">


            <button

              onClick={handleLogout}

              className="
                bg-red-500
                hover:bg-red-600
                px-10
                py-3
                rounded-full
                text-white
                font-semibold
                transition
              "

            >

              Logout

            </button>


          </div>

        )}



      </div>


    </div>

  );

};


export default Profile;