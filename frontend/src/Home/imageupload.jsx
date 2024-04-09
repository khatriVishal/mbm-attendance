import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {server} from '../localtunel.jsx';
import axios from 'axios';
import './imageupload.css'; // Import your CSS file

function ImgUpload() {
    // Define any state or logic you need
    const location = useLocation();
  const { data } = location.state;
  console.log(data);
  console.log(data.userData.userName);
    let [image, setimage] = useState('');

const handlesubmit = async (e) => {
    console.log("yes");
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image); // Use the file object, not the value of the input field
    formData.append('rollno', data.userData.userId);
    formData.append('name', data.userData.userName);

    try {
        const response = await axios.post(`${server}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

return (
    <div className="form-container">
        <h1>Image Upload Form</h1>
        <br /><br />
        <div className="std-info">
            <form action="" onSubmit={handlesubmit}>
                <input type="file" name="" id="" className='fileinput' onChange={(e) => setimage(e.target.files[0])} /> {/* Use e.target.files[0] */}
                <br /> <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
);
}

export default ImgUpload;