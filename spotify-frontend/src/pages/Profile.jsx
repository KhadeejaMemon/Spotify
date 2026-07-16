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
    <div
      className="
      min-h-screen
      bg-[#121212]
      flex
      flex-col
      items-center
      justify-center
      gap-5
      text-white
      "
    >
      <div
        className="
        w-14
        h-14
        border-4
        border-green-500
        border-t-transparent
        rounded-full
        animate-spin
        "
      />

      <p className="text-gray-400 text-lg">
        Loading Profile...
      </p>
    </div>
  );
}



  return (

    <div
className="
min-h-screen
bg-gradient-to-b
from-[#181818]
via-[#121212]
to-black
text-white
animate-fadeIn
"
>


      {/* Profile Header */}

      <div className="
        bg-gradient-to-b
        from-[#3b3b3b]
        to-[#121212]
      ">

        <div
className="
flex
flex-col
md:flex-row
items-center
md:items-end
gap-10
px-6
md:px-12
py-10
"
>


          {/* Avatar */}

          <div
className="
w-40
h-40
md:w-52
md:h-52
rounded-full
bg-[#242424]
flex
items-center
justify-center
shadow-2xl
ring-4
ring-green-500/20
hover:scale-105
transition-all
duration-300
"
>

            <User
size={90}
className="
text-gray-300
"
/>

          </div>



          {/* User Info */}

          <div>

           <p
className="
uppercase
tracking-[4px]
text-xs
text-green-400
font-semibold
"
>
Profile
</p>

          <h1
className="
text-4xl
md:text-7xl
font-black
mt-3
leading-none
"
>
{profileUser?.name}
</h1>

          <p
className="
mt-4
text-gray-300
text-base
md:text-lg
"
>
{profileUser?.email}
</p>


          </div>


        </div>


      </div>





      {/* Activity */}

  <div
className="
px-6
md:px-12
py-10
"
>


       <h2
className="
text-3xl
md:text-4xl
font-bold
mb-8
tracking-tight
"
>
Your Activity
</h2>

<div
className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
"
>



          {/* Liked Songs */}

         <div
className="
group
bg-[#181818]
rounded-2xl
p-7
border
border-transparent
hover:border-green-500/30
hover:bg-[#222222]
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
"
>

            <Heart
size={42}
className="
text-green-500
mb-5
group-hover:scale-110
transition-all
duration-300
"
/>

            <h3
className="
text-5xl
font-black
"
>
              {stats?.likedSongs || 0}
            </h3>


            <p
className="
mt-2
text-gray-400
text-sm
uppercase
tracking-wide
"
>
              Liked Songs
            </p>


          </div>





          {/* Playlist */}

          <div
className="
group
bg-[#181818]
rounded-2xl
p-7
border
border-transparent
hover:border-green-500/30
hover:bg-[#222222]
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
"
>

            <ListMusic
size={42}
className="
text-green-500
mb-5
group-hover:scale-110
transition-all
duration-300
"
/>


           <h3
className="
text-5xl
font-black
"
>
              {stats?.playlists || 0}
            </h3>


             <p
className="
mt-2
text-gray-400
text-sm
uppercase
tracking-wide
"
>
              Playlists
            </p>


          </div>





          {/* History */}

        <div
className="
group
bg-[#181818]
rounded-2xl
p-7
border
border-transparent
hover:border-green-500/30
hover:bg-[#222222]
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
"
>


           <History
size={42}
className="
text-green-500
mb-5
group-hover:scale-110
transition-all
duration-300
"
/>


           <h3
className="
text-5xl
font-black
"
>
              {stats?.history || 0}
            </h3>

<p
className="
mt-2
text-gray-400
text-sm
uppercase
tracking-wide
"
>
              Recently Played
            </p>


          </div>



        </div>





        {/* Logout Only For Logged User */}

        {user && (

          <div
className="
flex
justify-center
mt-14
"
>

            <button

              onClick={handleLogout}

              className="
bg-red-500
hover:bg-red-600
hover:shadow-red-500/30
shadow-xl
px-10
py-3
rounded-full
text-white
font-semibold
tracking-wide
hover:scale-105
active:scale-95
transition-all
duration-300
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