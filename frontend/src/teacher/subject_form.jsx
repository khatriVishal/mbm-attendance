
import "./subject_form.css"
function subjectform(){

return <>
<div className="createbubject">
<h1>Create Subject</h1>
</div>
<form action="">
<div className="input-box">
<div className="details">Subject Name:</div>
<div className="inputs">
<input type="text" name="" id="" placeholder="Enter Subject Name"/>
</div>
</div>
<div className="input-box">
<div className="details">Subject Code:</div>
<div className="inputs">
<input type="text" name="" id="" placeholder="Enter Subject Name"/>
</div>
</div>
<div className="input-box">
<div className="details">Degree type:</div>
<div className="inputs">
<select >
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
<select >
        <option value="">Choose an branch</option>
        <option value="1">CSE</option>
        <option value="2">AIDS</option>
        <option value="3">IT</option>
        <option value="4">mechanical</option>
        {/* Add more options as needed */}
      </select>
</div>
</div>
<div className="input-box">
<div className="details">Semester:</div>
<div className="inputs">
<select >
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
    <button type="submit">Create Subject</button>
</div>
</form>




</>



}
export default subjectform;
