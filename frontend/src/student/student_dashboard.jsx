import Profileicon from '../assets/profile-icon.png';
import { server } from '../localtunel';
import './student_dashboard.css';
import Image from "/uploads/image-1712607204659-560846925.jpg"
import { useState } from 'react';
function student_dash(props){
    let image = "";
const student = props.data.userData;
console.log("student");
console.log(student.photo);
console.log(student);
if(student.photo!=null)
 {
    // console.log("yes");
    image = `${server}/uploads/${student.photo}`;
    console.log(image);
    console.log(image);
        // setimage("../uploads/");
 }
return (<div className='outer-container'>
    
<div className="proimg">
<img src = {image} alt="" />
</div>
<div className='prodetails'>
<div>Name : {student.userName}</div>
<div>Roll No : {student.userId}</div>
<div>Year : {student.year}</div>
<div>Branch : {student.branch}</div>
<div>Semester : {student.semester}</div>
</div>
</div>)

};
export default student_dash;