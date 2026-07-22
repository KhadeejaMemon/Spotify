import { useEffect, useState } from "react";
import API from "../services/api";
import SongCard from "../components/SongCard";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";
import { useSearch } from "../context/SearchContext";
import { getRecommendations } from "../services/aiService";
import { useAuth } from "../context/AuthContext";
const Home = () => {

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
const { user } = useAuth();

const [recommendations, setRecommendations] = useState([]);
  const { selectedSong } = useSearch();
const fetchRecommendations = async () => {
  if (!user) return;

  try {
    const res = await getRecommendations();

    if (res.success) {
      setRecommendations(res.recommendations);
    }
  } catch (err) {
    console.log(err);
  }
};
  const fetchData = async () => {
    try {

      const [songRes, albumRes, artistRes] = await Promise.all([
        API.get("/songs"),
        API.get("/albums"),
        API.get("/artists"),
      ]);

      if (songRes.data.success) {
        setSongs(songRes.data.songs);
      }

      if (albumRes.data.success) {
        setAlbums(albumRes.data.albums);
      }

      if (artistRes.data.success) {
        setArtists(artistRes.data.artists);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };
useEffect(() => {
  fetchData();

  if (user) {
    fetchRecommendations();
  }
}, [user]);

  const displaySongs = selectedSong ? [selectedSong] : songs;

  if (loading) {

    return (

      <div className="px-4 py-6">

        <div className="h-10 w-64 bg-gray-800 rounded animate-pulse mb-8"></div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

          {Array.from({ length: 12 }).map((_, index) => (

            <div
              key={index}
              className="bg-[#181818] rounded-xl p-3 animate-pulse"
            >

              <div className="aspect-square bg-gray-700 rounded-lg mb-3"></div>

              <div className="h-4 bg-gray-700 rounded mb-2"></div>

              <div className="h-3 bg-gray-800 rounded w-2/3"></div>

            </div>

          ))}

        </div>

      </div>

    );

  }
  return (

<div
className="
px-4
py-6
md:px-6
space-y-12
bg-gradient-to-b
from-[#1DB95422]
via-black
to-black
min-h-screen
animate-fadeIn
"
>

<div>

<h1
className="
text-3xl
md:text-5xl
font-extrabold
text-white
tracking-tight
"
>
Good Evening 👋
</h1>

<p
className="
text-gray-400
mt-2
text-sm
md:text-base
"
>
Discover new music, artists and albums.
</p>

</div>{/* Trending Songs */}




<section className="space-y-5">

<div className="flex justify-between items-center">

<h2 className="text-2xl font-bold text-white">
Trending Songs
</h2>


</div>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

{displaySongs.map((song)=>(

<SongCard
key={song._id}
song={song}
songs={displaySongs}
/>

))}

</div>

</section>



{/* Albums */}

<section className="space-y-5">

<div className="flex justify-between items-center">

<h2 className="text-2xl font-bold text-white">
Popular Albums
</h2>



</div>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

{albums.map((album)=>(

<AlbumCard
key={album._id}
album={album}
/>

))}

</div>

</section>



{/* Artists */}

<section className="space-y-5">

<div className="flex justify-between items-center">

<h2 className="text-2xl font-bold text-white">
Popular Artists
</h2>


</div>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

{artists.map((artist)=>(

<ArtistCard
key={artist._id}
artist={artist}
/>

))}

</div>

</section>

</div>

);

};

export default Home;