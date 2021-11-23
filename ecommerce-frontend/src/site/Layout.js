import React from "react";
import Navbar from './Navbar';
import '../CSS/Layout.css'

/**
 * Méthode Layout qui va nous permettre d'afficher le navbar 
 * sur chaque page.
 * (Elle est appelé à chaque component.)
 */
const Layout = ({
    title = 'title',
    description = 'Description',
    className,
    children }) => (
    <div>
        <Navbar />
        <div className={className}>{children}</div>
    </div>
);

export default Layout;