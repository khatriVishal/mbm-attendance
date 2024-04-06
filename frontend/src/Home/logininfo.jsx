import "./logininfo.css"
import Logo_icon from "../assets/logo.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
// import { useEffect, useState } from 'react'
import {server} from '../localtunel.jsx';
import Student from '../student/student_int.jsx'
import axios from "axios";
import { useState, useEffect } from "react";
const btn_clicked = {
  backgroundColor: 'rgb(28, 46, 80)',
  color: 'white'
};

const btn_unclicked = {
  backgroundColor: 'white',
  color: 'black'
};
function logininfo() {
  const navigate = useNavigate();
  let [rollno, setrollno] = useState('');
  let [password, setpassword] = useState('');
  let [name, setname] = useState('');
  const [state, setsstate] = useState(1);
  let [login, setlogin] = useState(0);
  //console.log(rollno);
  console.log(server);
  function student_state() {
    setsstate(1);
  }
  function teacher_state() {

    setsstate(0);
  }
  const handlesubmit = (e) => {
    if(state == 1){
    e.preventDefault();
    fetch(`${server}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rollno, password })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then(data => {
        console.log(data);
        // navigate.push({
        //   pathname: '/loginn',
        //   state: { someData: 'Hello' } // Your data object
        // });
        navigate("loginn", { state: { data } });
        // if (data.redirectUrl) {
        //   // window.location.href = data.redirectUrl;
        // }
      })
      .catch(error => {
        alert('Login failed. Please check your credentials.');
      });}
      else 
      {
        e.preventDefault();
        fetch(`${server}/loginn`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ rollno, password })
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Login failed');
            }
          })
          .then(data => {
            console.log(data);
            // navigate.push({
            //   pathname: '/loginn',
            //   state: { someData: 'Hello' } // Your data object
            // });
            navigate("loginn", { state: { data } });
            // if (data.redirectUrl) {
            //   // window.location.href = data.redirectUrl;
            // }
          })
          .catch(error => {
            alert('Login failed. Please check your credentials.');
          });

      }
  };
  //  function handlesubmit(event){
  //   event.preventDefault();
  //   console.log("yes");
  //   console.log(rollno);
  //   console.log(password);
  //   axios.post("http://localhost:8000/login", { rollno, password })
  //     .then((res) => {
  //       if (res.data.length > 0) {
  //         console.log(res.data[0]);
  //         setname(res.data[0].name);
  //         setpassword(res.data[0].password);
  //         setrollno(res.data[0].rollno);
  //         // window.location.href = data.redirectUrl;

  //         // setlogin(1);
  //       }
  //       else {
  //         setname("incorrect rollno and password");
  //         // setlogin(0);
  //       }
  //     })
  //     .catch(error => console.log("Error occurred:", error));

  //  }

  return (

    <div className="log_cred">
      <div className="image">
        <img src={Logo_icon} alt="" />
      </div>
      <div id="login-info">
        <h2>Welcome to MBM University</h2>
        <br />
        <div>Enter login information</div>
        <br />
        <div id="stu-tea-btn">
          <button id="stu" onClick={student_state} style={state ? btn_clicked : btn_unclicked}>Student</button>
          <button id="teac" onClick={teacher_state} style={state ? btn_unclicked : btn_clicked}>Teacher</button>
        </div>

        <div className="login-form">


        </div>
        <br />
        <form action="" onSubmit={handlesubmit}>
          <div className="std-info">
            <input type="text" placeholder={state ? "Roll No" : "Username"} onChange={(e) => setrollno(e.target.value)} />
            <br /><br />
            <input type="text" placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
            <br /><br />
            <button id="log" >Login</button>
          </div>

        </form>
      </div>

    </div>
  )


}
export default logininfo;