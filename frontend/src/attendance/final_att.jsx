import { useLocation } from 'react-router-dom';
import Navbar from '../Home/navbar.jsx';
import { useState,useEffect } from 'react';
import DataTable from "react-data-table-component";
import './final_att.css';
import {server} from '../localtunel.jsx';
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
function finalatt(props){
    const navigate = useNavigate();
    
    const location = useLocation();
    console.log(location.state);
    console.log(props);
    let newdatatodisplay = props.data.att;
    let {changeattendance} = props.changeattendance;
    console.log(changeattendance , "changeattendance");
    let [state , setstate] = useState(true);
    let [studentatt , setstudentatt] = useState([]);
     useEffect(()=>{
       setstudentatt(props.data.att);
     },[]);
    //  console.log(studentatt , "loatta " , location.state.att);
    const columns = [
        {
            name: "Student Rollno",
            selector: row => row.sturoll
        },
        {
            name: "student Name",
            selector: row => row.stuname
        },
        {
            name: "Actions",
            cell: (row) => (
                <>
                    <button  className='markbtn' onClick={() => handlechangeClick(row)}>Change attendance</button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ]
    function handlechangeClick(row){
        console.log("yes");
        console.log(row.sturoll);
      for(let i = 0 ; i<studentatt.length ; i++)
      {
        if(row.sturoll == studentatt[i].rollno)
        {
            console.log(studentatt[i].name , "yessssssssssssssssssssssss");
            console.log(newdatatodisplay[i].present);
            if(newdatatodisplay[i].present === true) newdatatodisplay[i].present = false;
            else newdatatodisplay[i].present = true;
           console.log(newdatatodisplay[i].present);
          break;
            
        }
      }
    //   console.log(props.data.att);
      props.changeattendance(newdatatodisplay);
      setstate(!state);
    }
    function handlesubmit(){
        fetch(`${server}/updateattendance`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({newdatatodisplay})
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('attendance doesnt marked pls try again');
            }
          })
          .catch(error => {
            //   alert('attendance doesnt marked pls try again');
            //   console.error('Error fetching details:', error);
          });
          alert("successfully marked attendance");
        //   let data = location.state.markatt_req_data[1];
          navigate(-1);

    }
    let data = [];
    let style = [];
    // console.log(teacher_subject.length);
    for (let i = 0; i < studentatt.length; i++) {
        let student_details = {
            sturoll : studentatt[i].rollno,
            stuname : studentatt[i].name
            
        }
        if(studentatt.present == false)
        {
            let newstyle = {backgroundColor:'red' ,color : 'white'}
            style.push(newstyle);
        }
        else 
        {
            let newstyle = {backgroundColor:'green' ,color : 'white'}
            style.push(newstyle);
        }
        console.log(student_details);
        data.push(student_details);
    }
    const conditionalRowStyles = [
        {
            when: (row) => {
                console.log(row);
               let flag = false;
              for(let i = 0 ; i<studentatt.length ; i++)
              {
                if(studentatt[i].rollno == row.sturoll)
                {
                    console.log("yes");
                    if(!studentatt[i].present) 
                    {
                        return true;
                    }
                }
              }
            //    console.log(student);
            },
            style: {
                backgroundColor: '#e0474c',
                // color: 'white'
            }
        },
        {
            when: (row) => {
                console.log(row);
               let flag = false;
              for(let i = 0 ; i<studentatt.length ; i++)
              {
                if(studentatt[i].rollno == row.sturoll)
                {
                    console.log("yes");
                    if(studentatt[i].present) 
                    {
                        return true;
                    }
                }
              }
            //    console.log(student);
            },
            style: {
                backgroundColor: '#A2D9A1',
                // color: 'white'
            }
        },
        // Add more conditional styles as needed
    ];
   
    // console.log(customStyles);
    return (<>
      <div className="datatblesss">
      <DataTable columns={columns} data={data} className="custom-tables"  conditionalRowStyles={conditionalRowStyles}></DataTable>
      <div className="finalsubmitbtn">
            <button onClick={handlesubmit}>Submit</button>
        </div>
        </div>
      
    </>);
}

export default finalatt;