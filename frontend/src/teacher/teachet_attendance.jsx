import DataTable from "react-data-table-component";
import "./teacher_attendance.css";
import axios from 'axios';
import { server } from '../localtunel.jsx';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editsubject from "./editsubject.jsx"
function attendance(props) {
    let [subjectname, setsubjectname] = useState('');
    let [subjectcode, setsubjectcode] = useState('');
    let [degree , setdegree] = useState('');
    let [Semester , setsemester] = useState('');
    let [branch , setbranch] = useState('');
    console.log(props.data.userId);
    const Tid = props.data.userId;
    console.log(Tid);
    const navigate = useNavigate();
    let [teacher_subject, setteacher_subject] = useState([]);
    let [editdata, seteditdata] = useState([]);
    let [deletedata, setdeletedata] = useState([]);
    let [state, setstate] = useState(0);
    let [createsubjects , setcreatesuubjects] = useState(0);
    console.log(createsubjects , "createsubjects");
    // let edit_data;
    console.log(editdata, "editt");
    // console.log("uessss" , teacher_subject[0]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${server}/attendance`, { Tid });
                setteacher_subject(response.data);
            } catch (error) {
                alert('Failed to fetch data. Please try again.');
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [state , editdata , createsubjects]);
    async function deltesubject() {
        console.log("yesssssssssssssssssssssssssssssssss");
        try {
            const response = await axios.post(`${server}/deletesubject`, {id:deletedata[0].id});
            alert("succesfully deleted subject");
            setdeletedata([]);
        } catch (error) {
            alert('Failed to fetch data. Please try again.');
            console.error('Error fetching data:', error);
        }
    }
    function handlebackbutton(){
        seteditdata([]);
    }
    function createsubject(e){
        e.preventDefault();
        console.log("yes");
        console.log(branch);
        console.log(subjectname);
        console.log(subjectcode);
        console.log(degree);
        console.log(Semester);
        
        console.log("yes");
        fetch(`${server}/createsubject`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subjectname,subjectcode,degree,Semester,branch,tid:Tid })
          })
            .then(response => {
              if (response.ok) {
               
                alert("successfully created subject");
                
                //
              } else {
                throw new Error('Login failed');
              }
            })
            .catch(error => {
              alert('Same subect code is not allowed');
            });
            setcreatesuubjects(0);
            
    }
    function editsubject(e){
        console.log("editsubject");
        e.preventDefault();
        console.log(branch);
        console.log(subjectname);
        console.log(subjectcode);
        console.log(degree);
        console.log(Semester);
        
        console.log("yes");
        fetch(`${server}/editsubject`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:editdata[0].id ,subjectname,subjectcode,degree,Semester,branch })
          })
            .then(response => {
              if (response.ok) {
                alert("successfully edit subject");
                let newstate = state+1;
                setstate(newstate);
                seteditdata([]);
                
              } else {
                throw new Error('Something wrong happened');
              }
            })
            .catch(error => {
              alert('unable to create');
            });
          
    }
    console.log(teacher_subject, "yessssssss");
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
            name: "Actions",
            cell: (row) => (
                <>
                    <button onClick={() => handleEditClick(row)}>Edit</button>
                    <button onClick={() => handleDeleteClick(row)}>Delete</button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ]
    let data = [];
    // console.log(teacher_subject.length);
    for (let i = 0; i < teacher_subject.length; i++) {
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
    function handleEditClick(row) {
        let editdetails = [];
        editdetails.push(row);
        seteditdata(editdetails);


    }
    if(editdata.length>0){
    console.log(editdata[0].id
        , "eddddddddddddiiiiiiiii");}
    function handleDeleteClick(row) {
        console.log(row);
        
       const confrimation =  confirm("Are You Sure!");
       if(confrimation)
       {
        let deletedetails = [];
        deletedetails.push(row);
        console.log(deletedetails);
        fetch(`${server}/deletesubject`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:deletedetails[0].id  })
          })
            .then(response => {
              if (response.ok) {
                alert("successfully delete subject");
                let new_state = state+1;
                setstate(new_state);
              } else {
                throw new Error('Something wrong happened');
              }
            })
            .catch(error => {
              alert('unable to delete');
            });

       }
        
    }
    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#4CAF50',
                color: 'white',
            },
        },
        rows: {
            style: {
                innerWidth: '10vw'
            },
        },
    };
    function handleaddsubject(){
        setcreatesuubjects(1);
    }
    return (<>
    <div className="createnew_subject">
     <button onClick={handleaddsubject}>Add subject </button>
    </div>
        <div className={(editdata.length == 0 && createsubjects == 0)? "clicked datatble" : "unclicked datatble"} >
            <DataTable
                columns={columns}
                data={data}
                className="custom-table"
            />
        </div>
        <div className={editdata.length == 0 ?  "unclicked" : "clicked"} >
            <div>
                <button onClick={handlebackbutton}>back</button>
            </div>
        <div className={"createbubject" }>
            <h1>Edit Subject</h1>
        </div>
        <form onSubmit={editsubject}>
            <div className="input-box">
                <div className="details">Subject Name:</div>
                <div className="inputs">
                    <input type="text" name="" id="" placeholder="Enter Subject Name" onChange={(e) => setsubjectname(e.target.value)}   />
                </div>
            </div>
            <div className="input-box">
                <div className="details">Subject Code:</div>
                <div className="inputs">
                    <input type="text" name="" id="" placeholder="Enter Subject Code" onChange={(e) => setsubjectcode(e.target.value)} />
                </div>
            </div>
            <div className="input-box">
                <div className="details">Degree type:</div>
                <div className="inputs">
                    <select onChange={(e) => setdegree(e.target.value)}>
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
                    <select onChange={(e) => setbranch(e.target.value)}>
                        <option value="">Choose an branch</option>
                        <option value="CSE">CSE</option>
                        <option value="AIDS">AIDS</option>
                        <option value="IT">IT</option>
                        <option value="mechanical">mechanical</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
            </div>
            <div className="input-box">
                <div className="details">Semester:</div>
                <div className="inputs">
                    <select onChange={(e) => setsemester(e.target.value)}>
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
                <button type="submit">Edit subject</button>
            </div>
        </form>
        </div>
         <div className= {(createsubjects == 1) ? "clicked" : "unclicked"}>
         <div className="createbubject">
<h1>Create Subject</h1>
</div>
<form  onSubmit={createsubject}>
<div className="input-box">
<div className="details">Subject Name:</div>
<div className="inputs">
<input type="text" name="" id="" placeholder="Enter Subject Name" onChange={(e) => setsubjectname(e.target.value)}/>
</div>
</div>
<div className="input-box">
<div className="details">Subject Code:</div>
<div className="inputs">
<input type="text" name="" id="" placeholder="Enter Subject code"  onChange={(e) => setsubjectcode(e.target.value)}/>
</div>
</div>
<div className="input-box">
<div className="details">Degree type:</div>
<div className="inputs">
<select  onChange={(e) => setdegree(e.target.value)}>
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
<select  onChange={(e) => setbranch(e.target.value)}>
        <option value="">Choose an branch</option>
        <option value="CSE">CSE</option>
        <option value="AIDS">AIDS</option>
        <option value="IT">IT</option>
        <option value="mechanical">mechanical</option>
        {/* Add more options as needed */}
      </select>
</div>
</div>
<div className="input-box">
<div className="details">Semester:</div>
<div className="inputs">
<select  onChange={(e) => setsemester(e.target.value)}>
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



         </div>
    </>);

}
export default attendance;