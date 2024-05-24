import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { useState } from "react";
import { server } from '../localtunel';
import "./attendance.css";
function attendance(props){
  // let [new_data , setnew_data] = 
  let [newdata, setnewdata] = useState([]);
  const student = props.data.userData;
  useEffect(() => {
    console.log("yes my name is vishal");
    const fetchData =  () => {
        fetch(`${server}/studentattendance`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({student})
          })
            .then(response => {
              if (response.ok) {
                return response.json();
                // setteacher_subject(response.data);
              } else {
                throw new Error('Something wrong happened');
              }
            })
            .then(data =>{
              console.log("yessssssss");
              setnewdata(data);
                console.log(data);
            })
            .catch(error => {
                alert('Failed to fetch data. Please try again.');
                console.error('Error fetching data:', error);
            });

        
    };

    fetchData();
}, []);
console.log(newdata);
    const columns = [
      {
        name : "Subject code",
        selector: row=>row.subcode
      },
      {
        name : "Subject Name",
        selector: row=>row.subjectname
      },
      {
        name : "Attended classes",
        selector: row=>row.attclasses
      },
      {
        name : "Total classes",
        selector: row=>row.totclasses
      }
      
      
    ]
    const data = []
    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#4CAF50',
                color: 'white',
            },
        },
        rows: {
            style: {
                innerWidth:'10vw'
            },
        },
    };
    for(let i = 0 ; i<newdata.length ; i++)
      {
        let attendance_details = {
          subcode: newdata[i].subject_id,
          subjectname: newdata[i].Subject_name,
          attclasses: newdata[i].mark_attendance,
          totclasses: newdata[i].tot_attendace,
          
      }
      data.push(attendance_details);
      }
return (<>
<div className="datatble">
 <DataTable 
            columns={columns}
            data={data}
            className="custom-table"
        />
        </div>
</>);
}
export default attendance;