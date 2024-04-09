import Profileicon from '../assets/profile-icon.png';
import './teacher_dashboard.css';
function teacher_dash(props){
const teacher = props.data.userData;
console.log(teacher);
return (<div className='outer-container'>
<div className="proimg">
<img src={Profileicon} alt="" />
</div>
<div className='prodetails'>
<div>Name : {teacher.userName}</div>
<div>Tid : {teacher.userId}</div>
<div>Deparatment: {teacher.dept}</div>
{/* <div>Branch : {student.branch}</div>
<div>Semester : {student.semester}</div> */}
</div>
</div>)

};
export default  teacher_dash;