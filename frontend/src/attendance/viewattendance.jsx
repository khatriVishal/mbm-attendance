import { useLocation } from 'react-router-dom';
import {server} from '../localtunel.jsx';
import { useState , useEffect} from 'react';
import Navbar from '../Home/navbar.jsx';
import DataTable from "react-data-table-component";
import './viewattendance.css';
function viewattendance(){
    const location = useLocation();
    console.log(location.state);
    const [options, setOptions] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    let [studentdetails , setstudentdetails] = useState([]);
  const handleSelectChange = (event) => {
    setSelectedDate(event.target.value);
  };
   let newdata = location.state.markatt_req_data;
    useEffect(()=>{
        function fetchsdates(){
         console.log("asyn")
          fetch(`${server}/getdate`, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({newdata})
           })
           .then(response => {
             if (response.ok) {
                console.log("yyeyeeye");
               return response.json();
             } else {
               throw new Error('Something wrong happened');
             }
           })
           .then(data =>{
            setOptions(data);
            console.log(data);
            //    setstudentdata(data);
           })
           
       }
        fetchsdates();
        fetch(`${server}/viewattendance`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({selectedDate , id:location.state.markatt_req_data[0].id            })
          })
          .then(response => {
            if (response.ok) {
               console.log("yyeyeeye");
              return response.json();
            } else {
              throw new Error('Something wrong happened');
            }
          })
          .then(data =>{
            setstudentdetails(data);
           console.log(data);
           //    setstudentdata(data);
          })
     }, [selectedDate]);
     const columns = [
        {
            name: "Student Rollno",
            selector: row => row.sturoll
        },
        {
            name: "student Name",
            selector: row => row.stuname
        }
       
    ]
    let data = [];
    for (let i = 0; i < studentdetails.length; i++) {
        
        let student_details = {
            sturoll : studentdetails[i].Rollno,
            stuname : studentdetails[i].student_name
            
        }
        console.log(student_details);
        data.push(student_details);
    }
    // console.log(data);
     let dateArray = [];
     dateArray = options;
    
   
    //   console.log(studentdetails);
      const conditionalRowStyles = [
        {
            when: (row) => {
                console.log(row);
            
              for(let i = 0 ; i<studentdetails.length ; i++)
              {
                if(studentdetails[i].Rollno == row.sturoll)
                {
                    console.log("yes");
                    if(studentdetails[i].attendance == 'absent') 
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
               for(let i = 0 ; i<studentdetails.length ; i++)
               {
                 if(studentdetails[i].Rollno == row.sturoll)
                 {
                     console.log("yes");
                     if(studentdetails[i].attendance == 'present') 
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
  
    return (<>
 
    <div>
    <Navbar></Navbar>
    <div className="selectdate">
    <select value={selectedDate} onChange={handleSelectChange}>
      
        <option value="">Select a date</option>
        {dateArray.map((dateString, index) => (
          <option key={index} value={dateString}>{dateString}</option>
        ))}
      </select>
      </div>
      </div>
      <div className="shows-details">
      <DataTable columns={columns} data={data} className="custom-tables"  conditionalRowStyles={conditionalRowStyles} ></DataTable>

      </div>
    </>);
}
export default viewattendance;