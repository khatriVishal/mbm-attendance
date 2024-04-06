import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../Home/navbar.jsx'
import Profileicon from '../assets/profile-icon.png'
function attendance(){
//     const location = useLocation();
//    const {data} = location.state;console.log(location.state);
//    console.log(data.userData);
    return (<>
    <Navbar></Navbar>
    Hello world
    </>);
}
export default attendance;