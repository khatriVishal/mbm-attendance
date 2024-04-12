import Navbar from '../Home/navbar.jsx'
import Profileicon from '../assets/profile-icon.png'
// import { useNavigate } from "react-router-dom";
import Dashboardicon from '../assets/dashboard-logo.png';
import Attendanceicon from '../assets/attendence-logo.png';
import Subjecticon from '../assets/subjecticon.png';
import Logouticon from '../assets/logout.png'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Teacher_dash from "./teacher_dashboard.jsx";
import SubjectForm from './subject_form.jsx';
import {server} from '../localtunel.jsx';
import axios from 'axios';
import Teach_att from './teachet_attendance.jsx';
// import Attendance from './attendance.jsx';
import "./teacher_int.css";
// import SideNav from './sidenav.jsx';
function student() {
  const navigate = useNavigate();
  let [state,setstate] = useState(1);
  // let [profile , setprofile] = useState(0);
  // let [attendance , setattendance] = usestate(0);
  const location = useLocation();
  const { data } = location.state;
  console.log(location.state);
  let teacher_subjects;

  // console.log(state);
  function handle1(){
  setstate(1);
  }
 function handle2(){
  setstate(2);
    
  }
  function handle3(){
    setstate(3);
   
    navigate("/");
    // console.log("3")
  }
 
  
  return (
    <>
      <Navbar></Navbar>
      <div className="bodyy">
        <div className="Teacherdashboard">
          <div className="sidenavbar">
            <div className="nav-items" onClick={handle1}>
              <img src={Dashboardicon} alt="" />
              <h3>Dashboard</h3>
            </div>
            <div className="nav-items" onClick={handle2}>
              <img src={Attendanceicon} alt="" />
              <h3>Attendance</h3>
            </div>
            
            <div className="nav-items"  >
              <img src={Subjecticon} alt="" />
              <h3>Subjects</h3>
            </div>
            <div className="nav-items" onClick={handle3} >
              <img src={Logouticon} alt="" />
              <h3>Logout</h3>
            </div>
          </div>
          <div className="Teacherbodycontainer">
            <div  className={state==1? "clicked" : "unclicked"} >
              <Teacher_dash data = {data}></Teacher_dash>
            </div>
            <div className={state==2? "clicked" : "unclicked"}>
             
            <Teach_att data = {data.userData}></Teach_att>
            </div>
           
                   {/*  */}
          </div>
        </div>
      </div>
    </>
  )
}
export default student;


