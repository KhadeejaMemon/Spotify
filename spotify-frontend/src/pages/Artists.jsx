import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";
import API from "../services/api";

const Artist = () => {

  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchArtists = async () => {

    try {

      const res = await API.get("/artists");


      if(res.data.success){

        setArtists(res.data.artists);

      }


    } catch(error){

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  useEffect(()=>{

    fetchArtists();

  },[]);



  if(loading){

    return (

      <div className="text-white p-6">
        Loading Artists...
      </div>

    );

  }



  return (

    <div className="
      min-h-screen 
      bg-[#121212]
      text-white
      p-8
    ">


      {/* Header */}

      <div className="mb-10">

        <h1 className="
          text-5xl
          font-bold
        ">
          Artists
        </h1>


        <p className="
          text-gray-400
          mt-2
        ">
          Explore your favourite artists.
        </p>


      </div>



      {/* Artists Grid */}


      <div className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-6
        gap-6
      ">


        {
          artists.map((artist)=>(

            <ArtistCard

              key={artist._id}

              artist={artist}

            />

          ))
        }


      </div>



      {
        artists.length === 0 && (

          <p className="text-gray-400 mt-10">
            No artists found.
          </p>

        )
      }



    </div>

  );

};


export default Artist;