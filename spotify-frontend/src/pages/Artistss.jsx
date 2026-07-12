import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ArtistTable from "../components/ArtistTable";

import {
  getArtists,
  deleteArtist
} from "../services/artistService";
const Artistss = () => {

  const navigate = useNavigate();

  const [artists,setArtists] = useState([]);



useEffect(()=>{

 fetchArtists();

},[]);



const fetchArtists = async()=>{

 try{

 const res = await getArtists();

 setArtists(
   res.data.artists || []
 );

 }catch(error){

 console.log(error);

 }

};




const handleDelete = async(id)=>{


const confirmDelete = window.confirm(
 "Delete this artist?"
);


if(!confirmDelete) return;



try{


const res = await deleteArtist(id);



if(res.data.success){


setArtists(
 artists.filter(
  artist=>artist._id !== id
 )
);


alert(
"Artist Deleted Successfully"
);


}



}catch(error){

console.log(error);

}



};





return (

<div className="p-8">


<div className="flex justify-between items-center mb-6">


<h1 className="text-4xl text-white font-bold">

Artists Management

</h1>



<button

onClick={() =>
 navigate("/admin/artists/add")
}

className="
bg-green-600
px-4
py-2
rounded
"

>

Add Artist

</button>


</div>



<ArtistTable

artists={artists}

onDelete={handleDelete}

/>



</div>


);


};


export default Artistss;