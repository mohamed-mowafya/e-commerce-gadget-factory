import React, { useState } from "react";

const Checkbox = ({ categories , handleFilters }) => {
    return categories.map((category, index )=>(
        <li key={index} className="list-unstyle">
             <input type="checkbox" className="form-check-input"></input>
             <label className="form-check-label">{category.name}</label>
        </li>
        
   )) 
}


   export default Checkbox;