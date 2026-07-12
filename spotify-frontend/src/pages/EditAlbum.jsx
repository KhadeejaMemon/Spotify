import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";


const EditAlbum = () => {

  const { id } = useParams();
  const navigate = useNavigate();


  const [artists, setArtists] = useState([]);

  const [form, setForm] = useState({
    title: "",
    artist: "",
    description: "",
    releaseDate: "",
  });


  const [coverImage, setCoverImage] = useState(null);



  useEffect(() => {

    fetchData();

  }, []);



  const fetchData = async () => {

    try {

      const albumRes = await API.get(`/albums/${id}`);

      const album = albumRes.data.album;


      setForm({

        title: album.title || "",

        artist: album.artist?._id || "",

        description: album.description || "",

        releaseDate: album.releaseDate
          ? album.releaseDate.substring(0,10)
          : "",

      });



      const artistRes = await API.get("/artists");


      setArtists(
        artistRes.data.artists || []
      );


    } catch(error) {

      console.log(error);

    }

  };




  const handleChange = (e) => {

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



    if(coverImage){

      data.append(
        "coverImage",
        coverImage
      );

    }




    try {


      const res = await API.put(
        `/albums/${id}`,
        data
      );



      if(res.data.success){


        alert(
          "Album Updated Successfully"
        );


        navigate("/admin/albums");

      }



    } catch(error){


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
        Edit Album
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

          placeholder="Album Title"

          className="w-full p-3 rounded bg-zinc-800"

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



          {
            artists.map((artist)=>(

              <option

                key={artist._id}

                value={artist._id}

              >

                {artist.name}

              </option>


            ))
          }


        </select>





        <input

          type="date"

          name="releaseDate"

          value={form.releaseDate}

          onChange={handleChange}

          className="w-full p-3 rounded bg-zinc-800"

        />





        <textarea

          name="description"

          value={form.description}

          onChange={handleChange}

          placeholder="Description"

          className="w-full p-3 rounded bg-zinc-800"

        />





        <div>

          <label>
            Change Cover Image (optional)
          </label>


          <input

            type="file"

            accept="image/*"

            onChange={(e)=>
              setCoverImage(e.target.files[0])
            }

          />


        </div>





        <button

          className="
          bg-green-600
          px-6
          py-3
          rounded
          "

        >

          Update Album

        </button>



      </form>


    </div>

  );

};


export default EditAlbum;