import { useEffect, useState } from "react";
import API from "../services/api";
import SongCard from "../components/SongCard";
import { usePlayer } from "../context/PlayerContext";


const LikedSongs = () => {

  const [likedSongs, setLikedSongs] = useState([]);

  const { playSong } = usePlayer();



  const fetchLikedSongs = async () => {

    try {

      const res = await API.get("/users/liked");


      if(res.data.success){

        setLikedSongs(res.data.likedSongs);

      }


    } catch(error){

      console.log(error);

    }

  };




  useEffect(()=>{

    fetchLikedSongs();

  },[]);





  const playAll = () => {

    if(likedSongs.length > 0){

      playSong(
        likedSongs[0],
        likedSongs
      );

    }

  };





  return (

    <div className="
      min-h-screen
      bg-[#121212]
      text-white
      p-8
    ">


      <div className="
        flex
        justify-between
        items-center
        mb-8
      ">


        <h1 className="
          text-4xl
          font-bold
        ">

          ❤️ Liked Songs

        </h1>



        {
          likedSongs.length > 0 && (

            <button

              onClick={playAll}

              className="
                bg-green-500
                text-black
                px-6
                py-3
                rounded-full
                font-bold
              "

            >

              ▶ Play All

            </button>

          )
        }


      </div>





      {
        likedSongs.length === 0 ? (

          <p className="text-gray-400">

            No liked songs yet

          </p>

        ) : (


          <div className="
            grid
            grid-cols-2
            md:grid-cols-4
            lg:grid-cols-6
            gap-5
          ">


            {
              likedSongs.map(song=>(

                <SongCard

                  key={song._id}

                  song={song}

                  songs={likedSongs}

                />

              ))
            }


          </div>


        )
      }





    </div>

  );

};


export default LikedSongs;