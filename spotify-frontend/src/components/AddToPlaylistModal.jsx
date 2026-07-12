import { useEffect, useState } from "react";
import {
  getPlaylists,
  addSongToPlaylist
} from "../services/playlistService";


const AddToPlaylistModal = ({
  open,
  onClose,
  song
}) => {


  const [playlists,setPlaylists] = useState([]);

  const [loading,setLoading] = useState(false);



  const fetchPlaylists = async()=>{

    try{

      const res = await getPlaylists();

      if(res.success){

        setPlaylists(res.playlists);

      }


    }catch(error){

      console.log(error);

    }

  };




  useEffect(()=>{

    if(open){

      fetchPlaylists();

    }

  },[open]);





  const handleAdd = async(playlistId)=>{

    try{

      setLoading(true);


      const res = await addSongToPlaylist(
        playlistId,
        song._id
      );


      if(res.success){

        alert(
          "Song added to playlist 🎵"
        );

        onClose();

      }


    }catch(error){

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }
    finally{

      setLoading(false);

    }

  };





  if(!open)
    return null;





  return (

    <div className="
      fixed
      inset-0
      bg-black/70
      flex
      items-center
      justify-center
      z-50
    ">


      <div className="
        bg-[#181818]
        w-96
        rounded-xl
        p-6
      ">



        <h2 className="
          text-white
          text-xl
          font-bold
          mb-5
        ">

          Add to Playlist

        </h2>




        <p className="
          text-gray-400
          mb-4
        ">

          {song.title}

        </p>





        <div className="
          space-y-3
          max-h-60
          overflow-y-auto
        ">


        {
          playlists.length === 0 ? (

            <p className="text-gray-400">
              No playlists found
            </p>

          ) : (

            playlists.map((playlist)=>(


              <button

                key={playlist._id}

                disabled={loading}

                onClick={()=>handleAdd(
                  playlist._id
                )}

                className="
                  w-full
                  text-left
                  bg-[#282828]
                  hover:bg-[#3a3a3a]
                  text-white
                  p-3
                  rounded-lg
                "

              >

                {playlist.name}


              </button>


            ))

          )
        }


        </div>





        <button

          onClick={onClose}

          className="
            mt-5
            text-gray-400
            hover:text-white
          "

        >

          Cancel

        </button>



      </div>


    </div>

  );

};


export default AddToPlaylistModal;