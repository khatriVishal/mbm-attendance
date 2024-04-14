import DataTable from "react-data-table-component";
import { server } from '../localtunel.jsx';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function markattt(props){
    const navigate = useNavigate();
    const Tid = props.data.userId;
    let [teacher_subject, setteacher_subject] = useState([]);
    console.log("yesfeeee");
    useEffect(() => { 
        fetch(`${server}/attendance`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({Tid})
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
                console.log(data , "markatttttt");
                setteacher_subject(data);
                
            })
            .catch(error => {
                alert('Failed to fetch data. Please try again.');
                console.error('Error fetching data:', error);
            });
    }, []);
            console.log("ueeee");
    const columns = [
        {
            name: "Subject code",
            selector: row => row.subcode
        },
        {
            name: "Subject Name",
            selector: row => row.subjectname
        },
        {
            name: "Degree",
            selector: row => row.degree
        },
        {
            name: "Branch",
            selector: row => row.branch
        },
        {
            name: "semester",
            selector: row => row.semester
        },
        {
            name: "mark",
            cell: (row) => (
                <>
                    <button onClick={() => handlemarkClick(row)}>mark Attendance</button>
                  
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        },
        {
            name: "view",
            cell: (row) => (
                <>
                    <button onClick={() => handleviewClick(row)}>view Attendance</button>
                  
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ]
    function handlemarkClick(row){
        console.log(row);
        console.log(props);
       let subject_details = row;
       let teach_data = props.data;
        let markatt_req_data = [];
        markatt_req_data.push(subject_details);
        markatt_req_data.push(teach_data);
        navigate("markattendance", { state: { markatt_req_data } });
           
    }
    function  handleviewClick(row){
        let subject_details = row;
        let teach_data = props.data;
         let markatt_req_data = [];
         markatt_req_data.push(subject_details);
         markatt_req_data.push(teach_data);
         navigate("viewattendance", { state: { markatt_req_data } });
    }
    let data = [];
    console.log(teacher_subject.length);
    for (let i = 0; i < teacher_subject.length; i++) {
        console.log("yesssss");
        let subject_details = {
            subcode: teacher_subject[i].subject_id,
            subjectname: teacher_subject[i].Subject_name,
            branch: teacher_subject[i].branch,
            degree: teacher_subject[i].Degree,
            semester: teacher_subject[i].semester,
            id: teacher_subject[i].id
        }
        data.push(subject_details);
    }

    return (<>
     <div >
            <DataTable
                columns={columns}
                data={data}
                className="custom-table"
            />
        </div>
    
    
    </>);
}
export default markattt;