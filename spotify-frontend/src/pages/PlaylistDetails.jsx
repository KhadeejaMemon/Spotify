import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPlaylist,
  removeSongFromPlaylist,
} from "../services/playlistService";

import { usePlayer } from "../context/PlayerContext";


const PlaylistDetail = () => {

  const { id } = useParams();

  const { playSong } = usePlayer();


  const [playlist, setPlaylist] = useState(null);

  const [loading, setLoading] = useState(true);



  const fetchPlaylist = async () => {

    try {

      const res = await getPlaylist(id);


      if(res.success){

        setPlaylist(res.playlist);

      }


    }catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchPlaylist();

  },[id]);






  const handleRemove = async(songId)=>{

    try{

      await removeSongFromPlaylist(
        id,
        songId
      );

      fetchPlaylist();


    }catch(error){

      console.log(error);

    }

  };






  const handlePlayAll = ()=>{

    if(
      playlist.songs &&
      playlist.songs.length > 0
    ){

      playSong(
        playlist.songs[0],
        playlist.songs
      );

    }

  };






  if(loading){

    return (

      <p className="text-white p-6">
        Loading...
      </p>

    );

  }





  if(!playlist){

    return (

      <p className="text-white p-6">
        Playlist not found
      </p>

    );

  }







  const image =
    playlist.coverImage
      ? `https://spotify-backend-gilt.vercel.app${playlist.coverImage}`
      :
      playlist.songs?.length
      ?
      `https://spotify-backend-gilt.vercel.app${playlist.songs[0].thumbnail}`
      :
      "https://placehold.co/300x300";






  return (

    <div className="
      min-h-screen
      text-white
      p-6
    ">



      {/* HEADER */}

      <div className="
        flex
        flex-col
        md:flex-row
        gap-8
        items-center
        md:items-end
      ">


        <img

          src={image}

          alt={playlist.name}

          className="
            w-60
            h-60
            object-cover
            rounded-lg
            shadow-xl
          "

        />



        <div>


          <p className="
            text-gray-400
            uppercase
            text-sm
          ">

            Playlist

          </p>



          <h1 className="
            text-5xl
            font-bold
            mt-3
          ">

            {playlist.name}

          </h1>



          <p className="
            text-gray-400
            mt-3
          ">

            {playlist.description}

          </p>



          <p className="
            text-gray-500
            mt-3
          ">

            {playlist.songs.length} songs

          </p>



          <button

            onClick={handlePlayAll}

            className="
              mt-6
              bg-green-500
              text-black
              px-7
              py-3
              rounded-full
              font-bold
              hover:scale-105
              transition
            "

          >

            ▶ Play

          </button>



        </div>


      </div>







      {/* SONG LIST */}


      <div className="
        mt-12
        space-y-2
      ">


        {
          playlist.songs.map((song,index)=>(


            <div

              key={song._id}

              className="
                flex
                items-center
                justify-between
                p-3
                rounded-lg
                hover:bg-[#181818]
                transition
              "

            >



              <div

                onClick={()=>playSong(song,playlist.songs)}

                className="
                  flex
                  items-center
                  gap-5
                  cursor-pointer
                "

              >


                <span className="
                  text-gray-400
                  w-5
                ">

                  {index+1}

                </span>



                <img

                  src={`https://spotify-backend-gilt.vercel.app${song.thumbnail}`}

                  className="
                    w-14
                    h-14
                    rounded
                    object-cover
                  "

                  alt={song.title}

                />



                <div>

                  <h3 className="font-semibold">

                    {song.title}

                  </h3>


                  <p className="
                    text-gray-400
                    text-sm
                  ">

                    {song.artist?.name}

                  </p>


                </div>



              </div>





              <button

                onClick={()=>handleRemove(song._id)}

                className="
                  text-red-400
                  hover:text-red-500
                "

              >

                Remove

              </button>



            </div>


          ))

        }


      </div>



    </div>

  );

};


export default PlaylistDetail;