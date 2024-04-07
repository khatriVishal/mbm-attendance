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
<div>Name : {student.userName}</div>
<div>Roll No : {student.userId}</div>
<div>Year : {student.year}</div>
<div>Branch : {student.branch}</div>
<div>Semester : {student.semester}</div>
</div>
</div>)

};
export default student_dash;