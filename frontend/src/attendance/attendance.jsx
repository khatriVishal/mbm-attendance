import Navbar from '../Home/navbar.jsx';
import Profileicon from '../assets/profile-icon.png';
import './attendance.css';
import { useLocation } from 'react-router-dom';
import {server} from '../localtunel.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Finalatt from './final_att.jsx';
function markatt(props){
    const location = useLocation();
//   const { data } = location.state;
const navigate = useNavigate();
  console.log(location.state.markatt_req_data[0].id);
  let subjectid = location.state.markatt_req_data[0].id;
  let teacherdeatils = location.state;
  console.log(teacherdeatils);
  let [studentdata , setstudentdata] = useState([]);
  let [counter , setcounter] = useState(0);
  let [ datatodisplay ,  setdatatodisplay] = useState([]);
  let [search , setsearch] = useState('');
  let[state , setstate] = useState(0);
  let [Clicked , setClicked] = useState(true);
  useEffect(()=>{
   function fetchstudent(){
    console.log("asyn")
     fetch(`${server}/takeattendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({subjectid})
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something wrong happened');
        }
      })
      .then(data =>{
          setstudentdata(data);
      })
      .catch(error => {
          alert('unable to find student details pls try again');
          console.error('Error fetching details:', error);
      });
  }
   fetchstudent();
}, []);
console.log(studentdata , "stude");
if(datatodisplay.length == 0){
for(let i = 0 ; i<studentdata.length ; i++)
{
    let newdata = {
        name : studentdata[i].student_name,
        rollno : studentdata[i].Rollno,
        image : `/uploads/${studentdata[i].photo}`,
        id : studentdata[i].Rollno,
        present: false
    }
    datatodisplay.push(newdata);
}}
let n = datatodisplay.length;

function handlepresent(){
    datatodisplay[counter].present = true; 
    console.log(datatodisplay[counter].present);
    counter = (counter+1);
    if(counter >=n)
    {
        let confirmateion = confirm("Are you sure to update attendance");
        if(confirmateion)
        {
            let newarr = datatodisplay;
            setdatatodisplay(newarr);
            console.log(location.state.mar);
            setClicked(!Clicked);
//             // navigate("submitatt" , {state: {subjectdet:location.state.markatt_req_data
// [0], teachetdet:location.state.markatt_req_data
// [1]                , att :datatodisplay}});

        }
        else {
            let newarr = datatodisplay;
            setdatatodisplay(newarr);
            setstate(!state);
        }
    }
    else{

    let newarr = datatodisplay;
    setdatatodisplay(newarr);
    setcounter(counter);}
   
}
function handleabsent(){
    datatodisplay[counter].present = false; 
    console.log(datatodisplay[counter].present);
    counter = (counter+1);
    if(counter >=n)
    {
        let confirmateion = confirm("Are you sure to update attendance");
        if(confirmateion)
        {
            let newarr = datatodisplay;
            setdatatodisplay(newarr);
            setClicked(!Clicked);
            // navigate("submitatt" , {state: {subjectdet:location.state.markatt_req_data
            //     [0], teachetdet:location.state.markatt_req_data
            //     [1]                , att :datatodisplay}});
            // navigate("loginn",{ state: { data } });
        }
        else 
        {
            let newarr = datatodisplay;
            setdatatodisplay(newarr);
            setstate(!state);
        }
    }
    else{

    let newarr = datatodisplay;
    setdatatodisplay(newarr);
    setcounter(counter);}

}
function handlesearch(e){
    e.preventDefault();
    console.log("yes");
    for(let i = 0 ; i<datatodisplay.length ; i++)
    {
        if(datatodisplay[i].rollno == search )
        {
            setcounter(i);
            return;
        }
    }
    alert("No rollno found")
}

function handleprevious(){
    if(counter>0)
    {
        counter = counter-1;
        setcounter(counter);
    }
}
function handlenext(){
    counter = counter+1;
    
    if(counter>=n)
    {
        let confirmateion = confirm("Are you sure to update attendance");
        if(confirmateion == true)
        {
           setClicked(!Clicked);
            // navigate("submitatt" , {state: {subjectdet:location.state.markatt_req_data
            //     [0], teachetdet:location.state.markatt_req_data
            //     [1]                , att :datatodisplay}});
        }
        else 
        {
            setstate(!state);
        }
        
    }
    else 
    setcounter(counter);
}
function handleback(){
  setClicked(!Clicked);
}

function Changeattendance(){
    
}
if(datatodisplay.length>0){
console.log(datatodisplay[counter].image);}
if(datatodisplay.length>0){
    return <div className='outercontainer'>
    <Navbar></Navbar>
   <div className={Clicked==true? "clicked" : "unclicked"}>
    <div className="searchbox">
    
        <input type="text" placeholder='Search by roll no'onChange={(e) => setsearch(e.target.value)} />
        <br />
        <button onClick={handlesearch}>Search</button>
       
    </div>
    <div className="maincontainer"  >
    <div className="s-details" style={{ backgroundColor: datatodisplay[counter].present=== true? "#87eb87" : "" }}>
     <div className="phot">
     <img src={ datatodisplay[counter].image}  />
     </div> 
     <div className="rollno-details">
     <h3>{datatodisplay[counter].rollno}</h3>
     </div>
     <div className="name-details">
      <h3>{datatodisplay[counter].name}</h3>
     </div>
     <div className="attendance">
        <button className='absent' onClick={handleabsent}>Absent</button>
        <button className='present' onClick={handlepresent}>Present</button>
     </div>
    </div>
    </div>
    <div className="nextprevious">
        <button className='previous' onClick={handleprevious}>Previous</button>
      <button className='next' onClick={handlenext}>Next</button>

    </div>
    </div>
    <div className={Clicked==false? "clicked" : "unclicked"}>
        <div className="finalatt">
            
    <a className='back' onClick={handleback}>&laquo; previous </a>
   
    </div>
      <Finalatt changeattendance  = {Changeattendance} data = {{subjectdet:location.state.markatt_req_data
                [0], teachetdet:location.state.markatt_req_data
                [1]                , att :datatodisplay }}>

      </Finalatt>

    </div>
    </div>}
}
export default markatt;