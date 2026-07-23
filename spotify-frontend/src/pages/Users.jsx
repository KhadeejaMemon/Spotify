import { useEffect, useState } from "react";

import UsersTable from "../components/UsersTable";

import {
  getUsers,
  deleteUser
} from "../services/userService";



const Users = () => {


const [users,setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(()=>{

 fetchUsers();

},[]);



const fetchUsers = async () => {
  try {
    setLoading(true);

    const res = await getUsers();

    if (res.data.success) {
      setUsers(res.data.users);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};




const handleDelete = async(id)=>{


const confirmDelete = window.confirm(
 "Delete this user?"
);



if(!confirmDelete) return;



try{


const res = await deleteUser(id);



if(res.data.success){


setUsers(

 users.filter(
  user => user._id !== id
 )

);


alert(
 "User Deleted Successfully"
);


}



}catch(error){


console.log(error);


alert(
 "Delete Failed"
);


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


<h1 className="text-4xl text-white font-bold mb-6">

Users Management

</h1>



<UsersTable

users={users}

onDelete={handleDelete}

/>



</div>

);


};


export default Users;