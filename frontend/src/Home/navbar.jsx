import Logo_icon from "../assets/logo.png";
import user_icon from "../assets/user.png"
import "./navbar.css"
function nav(){
return (
    <div className="nav">
       <div className="logo" >
        <img src={Logo_icon} alt="" />
       </div>
        <div className="profile">
            <img src={user_icon} alt="" />
        </div>
    </div>


)


}
export default nav;