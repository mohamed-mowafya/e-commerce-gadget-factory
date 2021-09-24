import React from "react";
import Navbar from './Navbar';
const Layout = ({title ='title',description ='Description',className,children}) => (
    <div>
    <Navbar/>
    <div className={className}>{children}</div>
    </div>
)
export default Layout;