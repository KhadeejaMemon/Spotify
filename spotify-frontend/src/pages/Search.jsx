import { useState } from "react";
import API from "../services/api";
import SongCard from "../components/SongCard";

const Search = () => {

  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSearch = async (value) => {

    setQuery(value);


    if (value.length < 2) {
      setSongs([]);
      return;
    }


    try {

      setLoading(true);


      const [localRes, spotifyRes] = await Promise.all([

        // Your MongoDB songs
        API.get(`/search?q=${value}`),


        // Spotify songs
        API.get(`/spotify/search?q=${value}`)

      ]);



      let combinedSongs = [];



      // Local songs
      if(localRes.data.success){

        combinedSongs.push(
          ...localRes.data.songs
        );

      }



      // Spotify songs
      if(spotifyRes.data.success){

        combinedSongs.push(
          ...spotifyRes.data.songs.map(song => ({

            ...song,

            isSpotify: true

          }))
        );

      }



      setSongs(combinedSongs);



    } catch(error){

      console.log(error);

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="p-6 min-h-screen bg-[#121212]">


      <h1 className="
      text-3xl
      font-bold
      text-white
      mb-6
      ">
        🔍 Search Music
      </h1>



      <input

        value={query}

        onChange={(e)=>handleSearch(e.target.value)}

        placeholder="Search songs, artists..."

        className="
        w-full
        p-3
        rounded-full
        bg-[#181818]
        text-white
        outline-none
        "

      />



      {
        loading && (

          <p className="text-gray-400 mt-5">
            Searching...
          </p>

        )
      }



      <div className="
      grid
      grid-cols-2
      md:grid-cols-4
      gap-4
      mt-6
      ">


      {
        songs.map((song)=>(

          <SongCard

          key={song._id}

          song={song}

          />

        ))
      }


      </div>


    </div>

  );

};


export default Search;