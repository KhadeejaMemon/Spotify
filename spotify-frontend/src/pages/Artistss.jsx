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
const [loading, setLoading] = useState(true);

setLoading(true);

const res = await getSongs();

setSongs(res.data.songs);

setLoading(false);
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


if (loading) {
  return (
    <p className="text-white">
      Loading...
    </p>
  );
}


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