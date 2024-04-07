import Profileicon from '../assets/profile-icon.png';
import './student_dashboard.css';
function student_dash(props){
const student = props.data.userData;
console.log(student);
return (<div className='outer-container'>
<div className="proimg">
<img src={Profileicon} alt="" />
</div>
<div className='prodetails'>
<h4>Name : {student.userName}</h4>
<h4>Roll No : {student.userId}</h4>
<h4>Year : {student.year}</h4>
<h4>Branch : {student.branch}</h4>
<h4>Semester : {student.semester}</h4>
</div>
</div>)

};
export default student_dash;