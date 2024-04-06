const express = require("express");
const app = express();
const methodOverride = require("method-override");
const cors = require('cors');
const mysql = require('mysql2');
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

app.listen(port , ()=>{
    console.log(`working on ${port}`);
})