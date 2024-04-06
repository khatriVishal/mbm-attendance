import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../Home/navbar.jsx'
import Profileicon from '../assets/profile-icon.png'
function user(){
    const location = useLocation();
   const {data} = location.state;console.log(location.state);
   console.log(data.userData);
    return <>
    <Navbar></Navbar>


    <div className="cont">
     <div className="user">
        <img src={Profileicon} alt="" />
        <div>Name : {data.userData.userName}</div>
        <div>Roll No : {data.userData.userId}</div>
        <div>Year :{data.userData.year} </div>
        <div>Branch : {data.userData.branch}</div>
        <div>Semester : {data.userData.semester}</div>

     </div>



    </div>
    Hello world</>;
}
export default user;