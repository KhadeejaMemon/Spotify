import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


const AddArtist = () => {


  const navigate = useNavigate();


  const [form,setForm] = useState({

    name:"",
    bio:""

  });



  const [image,setImage] = useState(null);




  const handleChange=(e)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

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


      const res = await API.post(
        "/artists",
        data
      );



      if(res.data.success){


        alert(
          "Artist Added Successfully"
        );


        navigate("/admin/artists");


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
        Add Artist
      </h1>



      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl"
      >



        <input

          type="text"

          name="name"

          placeholder="Artist Name"

          onChange={handleChange}

          className="w-full p-3 rounded bg-zinc-800"

          required

        />




        <textarea

          name="bio"

          placeholder="Artist Bio"

          onChange={handleChange}

          className="w-full p-3 rounded bg-zinc-800"

        />





        <div>


          <label>
            Artist Image
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

          Save Artist

        </button>



      </form>


    </div>

  );

};


export default AddArtist;