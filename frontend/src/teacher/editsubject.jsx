import { useState, useEffect } from "react";
import "./subject_form.css"
import {server} from '../localtunel.jsx';
function subjectform(props){
    console.log(props.data);
    
    // let tid = props.data.userData.userId;
    let [subjectname, setsubjectname] = useState('');
    let [subjectcode, setsubjectcode] = useState('');
    let [degree , setdegree] = useState('');
    let [Semester , setsemester] = useState('');
    let [branch , setbranch] = useState('');
    // props.data.seteditdata([]);
    function createsubject(e){
        e.preventDefault();
        console.log(branch);
        console.log(subjectname);
        console.log(subjectcode);
        console.log(degree);
        console.log(Semester);
        
        console.log("yes");
        fetch(`${server}/editsubject`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id ,subjectname,subjectcode,degree,Semester,branch,tid })
          })
            .then(response => {
              if (response.ok) {
                alert("successfully created subject");
                return response.json();
              } else {
                throw new Error('Login failed');
              }
            })
            .catch(error => {
              alert('Login failed. Please check your credentials.');
            });
    }
return <>
<div className="createbubject">
<h1>Create Subject</h1>
</div>
<form  onSubmit={createsubject}>
<div className="input-box">
<div className="details">Subject Name:</div>
<div className="inputs">
<input type="text" name="" id="" placeholder="Enter Subject Name" onChange={(e) => setsubjectname(e.target.value)}  defaultValue="Default Value"/>
</div>
</div>
<div className="input-box">
<div className="details">Subject Code:</div>
<div className="inputs">
<input type="text" name="" id="" placeholder="Enter Subject Name"  onChange={(e) => setsubjectcode(e.target.value)}  defaultValue="Default Value"/>
</div>
</div>
<div className="input-box">
<div className="details">Degree type:</div>
<div className="inputs">
<select  onChange={(e) => setdegree(e.target.value)}>
<option value="">Choose an degree</option>
        <option value="BE">BE</option>
        <option value="ME">ME</option>
        {/* Add more options as needed */}
      </select>
</div>
</div>
<div className="input-box">
<div className="details">Branch:</div>
<div className="inputs">
<select  onChange={(e) => setbranch(e.target.value)}>
     <option value="">Choose an branch</option>
        <option value="CSE">CSE</option>
        <option value="AIDS">AIDS</option>
        <option value="IT">IT</option>
        <option value="mechanical">mechanical</option>
        {/* Add more options as needed */}
      </select>
</div>
</div>
<div className="input-box">
<div className="details">Semester:</div>
<div className="inputs">
<select  onChange={(e) => setsemester(e.target.value)}>
<option value="">Choose an Semester</option>
        <option value="1">1st</option>
        <option value="2">2nd</option>
        <option value="3">3rd</option>
        <option value="4">4th</option>
        <option value="5">5th</option>
        <option value="6">6th</option>
        <option value="7">7th</option>
        <option value="8">8th</option>
        {/* Add more options as needed */}
      </select>
</div>
</div>
<div className="submit">
    <button type="submit">Edit subject</button>
</div>
</form>




</>



}
export default subjectform;
