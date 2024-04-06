import "./login.css"
import Logininfo from "./logininfo.jsx"
import Univinfo from "./universityinfo.jsx"
import { BrowserRouter, Routes } from "react-router-dom"
import { useState } from "react"
function login(){
return (
<div className="login-back">
    <div className="container">
    <Univinfo id="uniinfo"></Univinfo>
   <Logininfo></Logininfo>
   
</div>
</div>


)


}
export default login;