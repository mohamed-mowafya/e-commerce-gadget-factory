import React from "react";
import Navbar from './Navbar';
import '../CSS/Layout.css'

const Layout = ({
    title ='title',
    description ='Description',
    className,
    children}) => (
    <div>
    <Navbar/>
    <div className="jumbotron">
        <h2 className="">
            {title}
        </h2>

        <p className="lead">
            {description}
        </p>

    </div>
    <div className={className}>
        {children}
        </div>
    </div>
    );

export default Layout;