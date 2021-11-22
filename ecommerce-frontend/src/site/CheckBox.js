import React, { useState } from "react";

const Checkbox = ({ categories , handleFilters }) => {

    const [checked, setCheked] = useState([]);

       /**
        * Méthode qui est appellé à chaque fois
        * qu'un CheckBox (catégorie) est coché, à chaque
        * catégorie coché, il est ajouté dans la variable
        * newCheckedCategoryId.
        * @param {*} category 
        * Variable category qui va contenir la catégorie qui a été
        * checked.
        */
       const handleToggle = category => () => { 

        // retourne le premier index ou -1
        const currentCategoryId = checked.indexOf(category); 
        const newCheckedCategoryId = [...checked]; 
        
        
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(category);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }

        setCheked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);


       } 
return categories.map((category, index )=>(
   
    <li key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category">
        <label className="form-check-label">{category.name}</label>
        <input  
            onChange={handleToggle(category._id)} 
            value={checked.indexOf(category._id === -1)} 
            type="checkbox"/>
        <span className="badge badge-primary badge-pill"></span>
    </li>

)) }


export default Checkbox;