import Navbar from '../Home/navbar.jsx'
import Profileicon from '../assets/profile-icon.png'
// import Attendanceicon from '../assets/attendance.png';
import Dashboardicon from '../assets/dashboard-logo.png';
import Attendanceicon from '../assets/attendence-logo.png';
import Subjecticon from '../assets/subjecticon.png';
import Logouticon from '../assets/logout.png'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Student_dash from "./student_dashboard.jsx"
import Attendance from './attendance.jsx';
import "./student_int.css";
// import SideNav from './sidenav.jsx';
function student() {
  const navigate = useNavigate();
  // let [profile , setprofile] = useState(0);
  // let [attendance , setattendance] = usestate(0);
  const location = useLocation();
  const { data } = location.state;
  console.log(data.userData.userName);
  function handleprofile() {
    navigate("user", { state: { data } });
  }
  function handleattendance() {
    navigate("attendance");
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="bodyy">
        <div className="studentdashboard">
          <div className="sidenavbar">
            <div className="nav-items">
              <div className="nav-i2">
              <img src={Dashboardicon} alt="" />
              </div>
              <h3>Dashboard</h3>
            </div>
            <div className="nav-items">
              <img src={Attendanceicon} alt="" />
              <h3>Attendance</h3>
            </div>
            <div className="nav-items">
              <img src={Subjecticon} alt="" />
              <h3>Subjects</h3>
            </div>
            <div className="nav-items">
              <img src={Logouticon} alt="" />
              <h3>Logout</h3>
            </div>

          </div>
          <div className="studentbodycontainer">
            <Attendance></Attendance>
                   {/* <Student_dash data={data}></Student_dash> */}
          </div>
        </div>
      </div>
    </>
  )
}
export default student;