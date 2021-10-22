import React, { useState } from "react";

const Checkbox = ({ categories , handleFilters }) => {

    const [checked, setCheked] = useState([]);


       // la fonction applé à chaque checbox coché
       const handleToggle = category => () => { 

        // retourne le premier index ou -1
        const currentCategoryId = checked.indexOf(category); 
        const newCheckedCategoryId = [...checked]; 
        
        
        // si le checked courant n'était pas en checked state, il push
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(category);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }

        //console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);


       } 
       return categories.map((category, index )=>(
           <div key={index} className="list-unstyle">
               <hr/>
           <label className="check"> <input type="checkbox"/>
           <span>  {category.name} </span></label>
            </div>
        
     )) 
}


   export default Checkbox;