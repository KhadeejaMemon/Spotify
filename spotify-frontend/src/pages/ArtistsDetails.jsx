import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Play } from "lucide-react";

import API from "../services/api";
import { usePlayer } from "../context/PlayerContext";
import AlbumCard from "../components/AlbumCard";


const ArtistDetail = () => {

  const { id } = useParams();

  const { playSong } = usePlayer();


  const [artist,setArtist] = useState(null);
  const [songs,setSongs] = useState([]);
  const [albums,setAlbums] = useState([]);

  const [loading,setLoading] = useState(true);



  const fetchArtist = async()=>{

    try{

      const res = await API.get(`/artists/${id}`);


      if(res.data.success){

        setArtist(res.data.artist);

        setSongs(res.data.songs);

        setAlbums(res.data.albums);

      }


    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchArtist();

  },[id]);




  const formatTime = (seconds)=>{

    const min = Math.floor(seconds / 60);

    const sec = Math.floor(seconds % 60);


    return `${min}:${sec < 10 ? "0":""}${sec}`;

  };




  if(loading){

    return(

      <div className="bg-[#121212] min-h-screen text-white p-6">

        Loading Artist...

      </div>

    );

  }




  if(!artist){

    return(

      <div className="bg-[#121212] min-h-screen text-red-500 p-6">

        Artist Not Found

      </div>

    );

  }





  return (

    <div className="bg-[#121212] min-h-screen text-white">


      {/* Artist Header */}


      <div className="
        bg-gradient-to-b
        from-[#3b3b3b]
        to-[#121212]
        p-10
      ">


        <div className="
          flex
          flex-col
          md:flex-row
          items-center
          md:items-end
          gap-8
        ">


          <img

            src={`http://localhost:5000${artist.image}`}

            alt={artist.name}

            className="
              w-64
              h-64
              rounded-full
              object-cover
              shadow-2xl
            "

          />



          <div>


            <p className="
              uppercase
              text-sm
              text-gray-300
              font-semibold
            ">

              Artist

            </p>



            <h1 className="
              text-5xl
              md:text-7xl
              font-black
              mt-3
            ">

              {artist.name}

            </h1>



            <p className="
              text-gray-400
              mt-4
            ">

              {artist.bio}

            </p>



            <p className="
              text-gray-400
              mt-2
            ">

              🌎 {artist.country}

            </p>



            <button

              onClick={()=>playSong(songs[0],songs)}

              className="
                mt-6
                bg-green-500
                text-black
                w-14
                h-14
                rounded-full
                flex
                items-center
                justify-center
                hover:scale-105
                transition
              "

            >

              <Play fill="black"/>

            </button>



          </div>


        </div>


      </div>





      {/* Popular Songs */}



      <div className="p-10">


        <h2 className="
          text-3xl
          font-bold
          mb-6
        ">

          Popular Songs

        </h2>




        <div className="space-y-2">


          {
            songs.map((song,index)=>(


              <div

                key={song._id}

                onClick={()=>playSong(song,songs)}

                className="
                  flex
                  items-center
                  justify-between
                  p-4
                  rounded-lg
                  hover:bg-[#1f1f1f]
                  cursor-pointer
                  group
                "

              >


                <div className="
                  flex
                  items-center
                  gap-4
                ">


                  <span className="text-gray-400">

                    {index+1}

                  </span>



                  <img

                    src={`http://localhost:5000${song.thumbnail}`}

                    className="
                      w-12
                      h-12
                      rounded
                      object-cover
                    "

                  />



                  <div>


                    <h3 className="font-semibold">

                      {song.title}

                    </h3>


                    <p className="text-gray-400 text-sm">

                      {song.album?.title || "Single"}

                    </p>


                  </div>



                </div>




                <div className="flex gap-4 items-center">


                  <Play

                    size={18}

                    fill="white"

                    className="
                      opacity-0
                      group-hover:opacity-100
                    "

                  />



                  <span className="text-gray-400">

                    {formatTime(song.duration)}

                  </span>


                </div>



              </div>


            ))
          }


        </div>


      </div>






      {/* Albums */}



      <div className="px-10 pb-10">


        <h2 className="
          text-3xl
          font-bold
          mb-6
        ">

          Albums

        </h2>



        <div className="
          grid
          grid-cols-2
          md:grid-cols-4
          lg:grid-cols-6
          gap-5
        ">


          {
            albums.map(album=>(

              <AlbumCard

                key={album._id}

                album={album}

              />

            ))
          }


        </div>



      </div>




    </div>

  );

};


export default ArtistDetail;