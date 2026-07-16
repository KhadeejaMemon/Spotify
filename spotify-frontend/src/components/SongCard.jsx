import { useState, useEffect } from "react";
import API from "../services/api";
import { usePlayer } from "../context/PlayerContext";
import { MoreVertical } from "lucide-react";
import AddToPlaylistModal from "./AddToPlaylistModal";
import { useAuth } from "../context/AuthContext";


const SongCard = ({ song, songs }) => {

  const { playSong } = usePlayer();

  const { user } = useAuth();


  const [liked, setLiked] = useState(false);
  const [openModal, setOpenModal] = useState(false);



  // Check liked song only if user is logged in
  const checkLiked = async () => {

    if (!user) return;


    try {

      const res = await API.get("/users/liked");


      if (res.data.success) {

        const isLiked = res.data.likedSongs.some(
          (s) => s._id === song._id
        );


        setLiked(isLiked);

      }


    } catch (err) {

      console.log(err);

    }

  };



  useEffect(() => {

    if(user){

      checkLiked();

    } else {

      setLiked(false);

    }

  }, [user]);





  // Like Song

  const handleLike = async () => {


    if(!user){

      alert("Please login first to like songs");

      return;

    }


    try {


      await API.post(`/users/liked/${song._id}`);

      setLiked(true);


    } catch(err){

      console.log(err);

    }

  };





  // Unlike Song

  const handleUnlike = async () => {


    try {


      await API.delete(`/users/liked/${song._id}`);

      setLiked(false);


    } catch(err){

      console.log(err);

    }


  };





  return (

    <>

     <div
className="
group
relative
cursor-pointer
rounded-2xl
bg-[#181818]
p-4
hover:bg-[#232323]
hover:-translate-y-1
shadow-md
hover:shadow-2xl
transition-all
duration-300
overflow-hidden
will-change-transform
"
>


        {/* IMAGE */}

       <div className="relative overflow-hidden rounded-xl">

<img
src={`https://spotify-backend-gilt.vercel.app${song.thumbnail}`}
alt={song.title}
className="
w-full
aspect-square
object-cover
rounded-xl
transition-all
duration-500
group-hover:scale-105
"
/>

<button
onClick={() => playSong(song, songs)}
className="
absolute
bottom-4
right-4
w-10
h-10
rounded-full
bg-green-500
text-black
font-bold
flex
items-center
justify-center
opacity-0
translate-y-4
group-hover:opacity-100
group-hover:translate-y-0
transition-all
duration-300
shadow-xl
hover:scale-110
active:scale-95
"
>
▶
</button>

</div>




        {/* TITLE */}

       <h3
className="
mt-4
text-white
font-bold
text-base
truncate
group-hover:text-green-400
transition-all
duration-300
"
>
{song.title}
</h3>

<p
className="
mt-1
text-sm
text-gray-400
truncate
"
>
{song.artist?.name}
</p>




        {/* ACTIONS */}

     <div
className="
flex
items-center
justify-between
mt-5
"
>

<button

onClick={
liked
? handleUnlike
: handleLike
}

className={`
px-4
py-2
rounded-full
text-sm
font-medium
transition-all
duration-300
hover:scale-105
active:scale-95

${
liked
? "bg-red-500 text-white shadow-lg"
: "bg-[#2c2c2c] text-white hover:bg-red-500"
}
`}
>

{liked ? "❤️ Liked" : "🤍 Like"}

</button>

<button

onClick={() => {

if (!user) {

alert("Please login first to add songs to playlist");

return;

}

setOpenModal(true);

}}

className="
w-10
h-10
rounded-full
flex
items-center
justify-center
text-gray-300
hover:text-green-500
hover:bg-[#2d2d2d]
transition-all
duration-300
hover:rotate-90
"
>

<MoreVertical size={20}/>

</button>

</div>


      </div>





      {/* PLAYLIST MODAL */}

      {
        user && (

          <AddToPlaylistModal

            open={openModal}

            onClose={() => setOpenModal(false)}

            song={song}

          />

        )
      }



    </>

  );

};



export default SongCard;