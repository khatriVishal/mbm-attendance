import { useLocation } from 'react-router-dom';
import Navbar from '../Home/navbar.jsx';
import { useState,useEffect } from 'react';
import DataTable from "react-data-table-component";
import './final_att.css'
function finalatt(props){
    const location = useLocation();
    console.log(location.state);
    console.log(props);
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
            console.log(studentatt[i].name);
            studentatt[i].present = !studentatt[i].present;
            props.data.att[i].present = ! props.data.att[i].present;
        }
      }
      changeattendance();
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
    <div className="navbar">
      </div>
      <div className="datatblesss">
      <DataTable columns={columns} data={data} className="custom-tables"  conditionalRowStyles={conditionalRowStyles}></DataTable>
        </div>
    </>);
}

export default finalatt;