import React from "react";
import {Link,withRouter} from 'react-router-dom';
const pageActive = (history,path) =>{
    // History = current page
    if(history.location.pathname === path){
        return {color:'#ff9900'};
    }
    else{
        return {color:'#FFFFFF'};
    }
}
const Menu = ({history}) =>(
    <div>
    <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
            <Link className="nav-link" style={pageActive(history,'/')} to="/">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style={pageActive(history,'/login')} to="/login">Login</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style={pageActive(history,'/signup')} to="/signup">Signup </Link>
        </li>
    </ul>
    </div>
)
export default withRouter(Menu);