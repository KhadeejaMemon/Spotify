import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";


const EditArtist = () => {


  const { id } = useParams();

  const navigate = useNavigate();


  const [form,setForm] = useState({

    name:"",
    bio:""

  });


  const [image,setImage] = useState(null);



  useEffect(()=>{

    fetchArtist();

  },[]);




  const fetchArtist = async()=>{


    try{


      const res = await API.get(
        `/artists/${id}`
      );


      const artist = res.data.artist;


      setForm({

        name: artist.name || "",

        bio: artist.bio || ""

      });



    }catch(error){

      console.log(error);

    }


  };





  const handleChange=(e)=>{


    setForm({

      ...form,

      [e.target.name]: e.target.value

    });


  };






  const handleSubmit=async(e)=>{


    e.preventDefault();



    const data = new FormData();



    data.append(
      "name",
      form.name
    );


    data.append(
      "bio",
      form.bio
    );



    if(image){

      data.append(
        "image",
        image
      );

    }




    try{


      const res = await API.put(

        `/artists/${id}`,

        data

      );




      if(res.data.success){


        alert(
          "Artist Updated Successfully"
        );


        navigate(
          "/admin/artists"
        );


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

        Edit Artist

      </h1>




      <form

        onSubmit={handleSubmit}

        className="space-y-4 max-w-xl"

      >



        <input

          type="text"

          name="name"

          value={form.name}

          onChange={handleChange}

          placeholder="Artist Name"

          className="
          w-full
          p-3
          rounded
          bg-zinc-800
          "

        />





        <textarea

          name="bio"

          value={form.bio}

          onChange={handleChange}

          placeholder="Artist Bio"

          className="
          w-full
          p-3
          rounded
          bg-zinc-800
          "

        />





        <div>


          <label>
            Change Artist Image (optional)
          </label>


          <input

            type="file"

            accept="image/*"

            onChange={(e)=>
              setImage(e.target.files[0])
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

          Update Artist

        </button>



      </form>


    </div>

  );

};


export default EditArtist;