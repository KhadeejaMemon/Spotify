import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


const AddAlbum = () => {

  const navigate = useNavigate();


  const [artists, setArtists] = useState([]);


  const [form, setForm] = useState({
    title:"",
    artist:"",
    description:"",
    releaseDate:""
  });


  const [coverImage,setCoverImage] = useState(null);



  useEffect(()=>{

    fetchArtists();

  },[]);



  const fetchArtists = async()=>{

    try{

      const res = await API.get("/artists");

      setArtists(
        res.data.artists || []
      );

    }catch(error){

      console.log(error);

    }

  };



  const handleChange=(e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };



  const handleSubmit=async(e)=>{

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



    try{


      const res = await API.post(
        "/albums",
        data
      );



      if(res.data.success){

        alert(
          "Album Added Successfully"
        );


        navigate("/admin/albums");

      }



    }catch(error){

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed"
      );

    }


  };





  return (

    <div className="p-6 text-white">


      <h1 className="text-3xl font-bold mb-6">
        Add Album
      </h1>



      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl"
      >


        <input

          type="text"

          name="title"

          placeholder="Album Title"

          onChange={handleChange}

          className="w-full p-3 rounded bg-zinc-800"

        />



        <select

          name="artist"

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

          onChange={handleChange}

          className="w-full p-3 rounded bg-zinc-800"

        />




        <textarea

          name="description"

          placeholder="Description"

          onChange={handleChange}

          className="w-full p-3 rounded bg-zinc-800"

        />




        <div>

          <label>
            Album Cover Image
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

          className="bg-green-600 px-6 py-3 rounded"

        >

          Save Album

        </button>



      </form>


    </div>

  );

};


export default AddAlbum;