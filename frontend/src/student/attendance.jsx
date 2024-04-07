import DataTable from "react-data-table-component";
import "./attendance.css";
function attendance(){


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
    const data = [
      {
        subcode:"CSE231A",
        subjectname:"AI/ML",
        attclasses:"13",
        totclasses:"20"
      },
      {
        subcode:"CSE232A",
        subjectname:"JAVA",
        attclasses:"9",
        totclasses:"13"
      },
      {
        subcode:"CSE233A",
        subjectname:"MAD",
        attclasses:"6",
        totclasses:"9"
      },
      {
        subcode:"CSE234A",
        subjectname:"Compiler design",
        attclasses:"0",
        totclasses:"3"
      },
      {
        subcode:"CSE235A",
        subjectname:"Visual Computing",
        attclasses:"1",
        totclasses:"4"
      }



    ]
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