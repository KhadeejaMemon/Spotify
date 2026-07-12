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

      <div className="
        group
        cursor-pointer
        rounded-lg
        p-3
        hover:bg-[#1a1a1a]
        transition-all
        duration-300
      ">


        {/* IMAGE */}

        <div className="relative">


          <img
            src={`https://spotify-backend-gilt.vercel.app${song.thumbnail}`}
            alt={song.title}

            className="
              w-full
              aspect-square
              object-cover
              rounded-md
            "

          />



          {/* PLAY BUTTON */}

          <button

            onClick={() => playSong(song, songs)}

            className="
              absolute
              bottom-2
              right-2
              bg-green-500
              text-black
              p-3
              rounded-full
              opacity-0
              group-hover:opacity-100
              transition
            "

          >

            ▶

          </button>


        </div>





        {/* TITLE */}

        <h3 className="
          text-white
          mt-3
          font-semibold
        ">

          {song.title}

        </h3>





        {/* ARTIST */}

        <p className="
          text-gray-400
          text-sm
        ">

          {song.artist?.name}

        </p>





        {/* ACTIONS */}

        <div className="
          flex
          items-center
          justify-between
          mt-4
        ">



          {/* LIKE BUTTON */}


          <button

            onClick={
              liked 
              ? handleUnlike 
              : handleLike
            }

            className={`

              text-sm
              px-3
              py-1
              rounded-full
              transition

              ${
                liked
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-white hover:bg-red-500"
              }

            `}

          >

            {
              liked
              ? "❤️ Liked"
              : "🤍 Like"
            }


          </button>






          {/* ADD PLAYLIST BUTTON */}


          <button

            onClick={() => {


              if(!user){

                alert("Please login first to add songs to playlist");

                return;

              }


              setOpenModal(true);


            }}


            className="
              text-gray-300
              hover:text-green-500
              transition
            "

          >

            <MoreVertical size={22}/>


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