import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import API from "../services/api";

const EditSong = () => {

  const { id } = useParams();
  const navigate = useNavigate();


  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);


  const [form, setForm] = useState({
    title: "",
    genre: "",
    duration: "",
    artist: "",
    album: "",
  });


  const [audio, setAudio] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);



  useEffect(() => {

    fetchData();

  }, []);



  const fetchData = async () => {

    try {

      const songRes = await API.get(`/songs/${id}`);

      const song = songRes.data.song;


      setForm({

        title: song.title || "",
        genre: song.genre || "",
        duration: song.duration || "",
        artist: song.artist?._id || "",
        album: song.album?._id || "",

      });



      const artistRes = await API.get("/artists");
      const albumRes = await API.get("/albums");


      setArtists(
        artistRes.data.artists || []
      );


      setAlbums(
        albumRes.data.albums || []
      );


    } catch(error){

      console.log(error);

    }

  };



  const handleChange = (e)=>{

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };




  const handleSubmit = async(e)=>{

    e.preventDefault();


    const data = new FormData();



    Object.keys(form).forEach((key)=>{

      data.append(
        key,
        form[key]
      );

    });



    if(audio){

      data.append(
        "audio",
        audio
      );

    }



    if(thumbnail){

      data.append(
        "thumbnail",
        thumbnail
      );

    }



    try{


      const res = await API.put(
        `/songs/${id}`,
        data
      );


      if(res.data.success){

        alert(
          "Song Updated Successfully"
        );


        navigate("/admin/songs");

      }


    }catch(error){

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );

    }


  };





  return (

    <div className="p-6 text-white">


      <h1 className="text-3xl font-bold mb-6">
        Edit Song
      </h1>



      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl"
      >



        <input

          type="text"

          name="title"

          value={form.title}

          onChange={handleChange}

          className="w-full p-3 rounded bg-zinc-800"

          placeholder="Song Title"

        />



        <input

          type="text"

          name="genre"

          value={form.genre}

          onChange={handleChange}

          className="w-full p-3 rounded bg-zinc-800"

          placeholder="Genre"

        />



        <input

          type="text"

          name="duration"

          value={form.duration}

          onChange={handleChange}

          className="w-full p-3 rounded bg-zinc-800"

          placeholder="Duration"

        />



        <select

          name="artist"

          value={form.artist}

          onChange={handleChange}

          className="w-full p-3 rounded bg-zinc-800"

        >

          <option value="">
            Select Artist
          </option>


          {artists.map((artist)=>(

            <option
              key={artist._id}
              value={artist._id}
            >

              {artist.name}

            </option>

          ))}


        </select>





        <select

          name="album"

          value={form.album}

          onChange={handleChange}

          className="w-full p-3 rounded bg-zinc-800"

        >

          <option value="">
            Select Album
          </option>



          {albums.map((album)=>(

            <option

              key={album._id}

              value={album._id}

            >

              {album.title}

            </option>

          ))}



        </select>




        <div>

          <label>
            Change Audio (optional)
          </label>


          <input

            type="file"

            accept="audio/*"

            onChange={(e)=>
              setAudio(e.target.files[0])
            }

          />

        </div>





        <div>

          <label>
            Change Thumbnail (optional)
          </label>


          <input

            type="file"

            accept="image/*"

            onChange={(e)=>
              setThumbnail(e.target.files[0])
            }

          />

        </div>




        <button

          className="bg-green-600 px-6 py-3 rounded"

        >

          Update Song

        </button>




      </form>


    </div>

  );

};


export default EditSong;