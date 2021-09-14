import React from "react";
import Navbar from './Navbar';
const Layout = ({title ='title',description ='Description',className,children}) => (
    <div>
    <Navbar/>
    <div>
        <h2>{title}</h2>
        <p className="lead">{description}</p>
    </div> 
    <div className={className}>{children}</div>
    </div>
)
export default Layout;