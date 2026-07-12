import { useEffect, useState } from "react";
import API from "../services/api";
import SongCard from "../components/SongCard";
import PlaylistCard from "../components/PlaylistCard";
import { usePlayer } from "../context/PlayerContext";


const Library = () => {

  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [history, setHistory] = useState([]);

  const { playSong } = usePlayer();



  const fetchLibrary = async () => {

    try {

      const [
        likedRes,
        playlistRes,
        historyRes
      ] = await Promise.all([

        API.get("/users/liked"),

        API.get("/playlists"),

        API.get("/history")

      ]);



      if(likedRes.data.success){

        setLikedSongs(
          likedRes.data.likedSongs
        );

      }



      if(playlistRes.data.success){

        setPlaylists(
          playlistRes.data.playlists
        );

      }



      if(historyRes.data.success){

        setHistory(
          historyRes.data.history
        );

      }


    } catch(error){

      console.log(error);

    }

  };




  useEffect(()=>{

    fetchLibrary();

  },[]);





  const playAll = ()=>{

    if(likedSongs.length){

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
      p-6
      space-y-12
    ">


      <h1 className="
        text-4xl
        font-bold
      ">
        Your Library 🎧
      </h1>





      {/* LIKED SONGS */}

      <section>


        <div className="
          flex
          justify-between
          items-center
          mb-5
        ">


          <h2 className="text-2xl font-bold">
            ❤️ Liked Songs
          </h2>



          {
            likedSongs.length > 0 && (

              <button

                onClick={playAll}

                className="
                  bg-green-500
                  text-black
                  px-5
                  py-2
                  rounded-full
                  font-bold
                "

              >

                ▶ Play All

              </button>

            )
          }


        </div>



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


      </section>







      {/* PLAYLISTS */}


      <section>


        <h2 className="
          text-2xl
          font-bold
          mb-5
        ">

          📂 Your Playlists

        </h2>



        <div className="
          grid
          grid-cols-2
          md:grid-cols-4
          lg:grid-cols-6
          gap-5
        ">


        {
          playlists.map(playlist=>(

            <PlaylistCard

              key={playlist._id}

              playlist={playlist}

            />

          ))
        }


        </div>



      </section>







      {/* HISTORY */}



      <section>


        <h2 className="
          text-2xl
          font-bold
          mb-5
        ">

          🕒 Recently Played

        </h2>




        {
          history.length === 0 ? (

            <p className="text-gray-400">
              No recently played songs
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
              history.map((item)=>(

                item.song && (

                  <SongCard

                    key={item._id}

                    song={item.song}

                    songs={
                      history
                      .filter(h=>h.song)
                      .map(h=>h.song)
                    }

                  />

                )

              ))
            }


            </div>


          )

        }



      </section>



    </div>

  );

};


export default Library;