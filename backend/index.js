const express = require("express");
const app = express();
const methodOverride = require("method-override");
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const {v4 : uuidv4} = require('uuid')
let imagename;
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'university',
  password : '1234'
});
const port = 8000;
app.use(cors());
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let users = ['{"name":"John", "age":30, "city":"New York"}'];
app.get("/api/users" , (req , res)=>{
res.send(users);

})

app.get("/" ,(req , res)=>{
res.send("server is running");

})
app.post("/login" , (req , res)=>{
    console.log("yes");
    const sql = `select * from student where Rollno = "${req.body.rollno}" and password = "${req.body.password}"`;
    console.log(req.body.rollno);
   console.log(req.body.password);
    console.log(sql);
    db.query(sql ,  (err , data)=>{
        console.log(sql);
        console.log(data);
        // console.log(res.json(data));
        if(err || data.length<=0) res.status("404").send("user not found");
        else {
        const userData = {
          userId: data[0].Rollno,
          userName: data[0].name,
          photo : data[0].photo,
          year : data[0].year,
          branch : data[0].branch,
          semester : data[0].semester
          // Add other user data as needed
        };
        console.log(err);
        console.log(data.length);
       
        console.log("Login successful");
        res.json({ userData});}
    })
}) 
app.post("/loginn" , (req , res)=>{
  console.log("yes");
  const sql = `select * from teacher where Tid = "${req.body.rollno}" and password = "${req.body.password}"`;
  console.log(req.body.rollno);
 console.log(req.body.password);
  console.log(sql);
  db.query(sql ,  (err , data)=>{
      console.log(sql);
      console.log(data);
      // console.log(res.json(data));
      if(err || data.length<=0) res.status("404").send("user not found");
      else {
      const userData = {
        userId: data[0].Tid,
        userName: data[0].name,
        photo : data[0].photo,
        dept : data[0].department,
        
        // Add other user data as needed
      };
      console.log(err);
      console.log(data.length);
     
      console.log("Login successful");
      res.json({ userData});}
  })
}) 

const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    // const { textData } = req.body;
    // console.log(textData+"u")
    cb(null, '../frontend/src/uploads');
  },
  filename:function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    imagename = "image" + '-' + uniqueSuffix+".jpg";
    cb(null, "image" + '-' + uniqueSuffix+".jpg");
  }
});
const upload = multer({ storage });
app.post('/upload',  upload.single('image' ),(req, res) => {
  console.log(req.body);
  const sql = `UPDATE student SET photo = "${imagename}" where   Rollno= "${req.body.rollno}" and name = "${req.body.name}"`;
  console.log(sql);
  const { textData } = req.body;
  const file = req.file;
 db.query(sql , (err , data)=>{
  if(err) res.send(err);
  else 
  {
    console.log("yes");
    res.json({ message: 'File uploaded succesfully' });
  }
 })  
  

  
});
// create subject 
app.post('/createsubject',  (req, res) => {
  console.log("yes");
  const body = req.body;
  console.log(req.body);
  const newId = uuidv4();
  const sql = `INSERT INTO subjects (subject_id, subject_name,associated_teacher, branch, semester, Degree,id) VALUES ('${body.subjectcode}', '${body.subjectname}', '${body.tid}', '${body.branch}', '${body.Semester}', '${body.degree}','${newId}');`;
  console.log(sql);
  db.query(sql , (err1 , data1)=>{
    if(err1){console.log(err1); res.status("404").send("user not found");}
    else 
    {
      const sql2 = `select * from student where branch = '${body.branch}' and semester = '${body.Semester}'and Degree = '${body.degree}'`;

      db.query(sql2 , (err2 , data2)=>{
        console.log(data2);
       if(err2) console.log(err2);
       else 
       {
        const student_data = data2;
        console.log(student_data.length);
        for(let i = 0 ; i<student_data.length ; i++)
        {
          const sql3 = 
          `INSERT INTO attendance (subject_id, subject_name,student_name , photo, tot_attendace,mark_attendance, branch ,semester, Degree , id) VALUES ('${body.subjectcode}', '${body.subjectname}', '${student_data[i].name}', '${student_data[i].photo}' , '0' ,'0', '${student_data[i].branch}', '${student_data[i].semester}', '${student_data[i].Degree}', '${newId}')`;
          db.query(sql3 , (err3 , data3)=>{
           if(err3) 
           console.log("err3 ", err3);
          
          


          })
        }
        res.json({ message:'succsfully created subject' });
       }


      })
      
    }
   })  

  
});
app.get("/attendance" ,(req , res)=>{
  console.log("yes");
  res.json({ message: 'attendance' });
  });
app.listen(port , ()=>{
    console.log(`working on ${port}`);
})