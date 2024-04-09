import { useState } from 'react'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Homepage from './Home/Homepage.jsx'
import Student from './student/student_int.jsx'
import Teacher from './teacher/teacher_int.jsx'
import User from './student/userinfo.jsx'
import Attendance from './student/attendance.jsx'
import Upload from './Home/imageupload.jsx';
function App() {
  return (

    <div className='home'>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Homepage></Homepage>}> </Route>
      <Route path='/loginn' element={<Student></Student>}></Route>
      <Route path='/login' element={<Teacher></Teacher>}></Route>
      <Route path='/loginn/user' element = {<User></User>}></Route>
      <Route path='/loginn/attendance' element = {<Attendance></Attendance>}></Route>
      <Route path='/login/upload' element = {<Upload></Upload>}></Route>
      </Routes>
      </BrowserRouter>
    {/* <Homepage></Homepage> */}
    </div>
    
  )
}

export default App
