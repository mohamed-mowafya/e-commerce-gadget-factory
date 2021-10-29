import React, { useState} from "react";

const RadioBox = ({ prices , handleFilters }) => {
   
    const [value, setValue] = useState(0);

    const handleChange = event => {
     // -> a chaque changement dans input, sera envoyer au parent (Shop)
        handleFilters(event.target.value); //-> tous ce qu'on get sur le handelFilters qui vient de Shop(perent subcomponent)
        setValue(event.target.value); //-> update
    };


    return prices.map((p, i) => (
        <div key={i}>
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="mr-2 ml-4"
            />
            <label className="form-check-label">{p.name}</label>
        </div>
    ));
};

    
export default RadioBox;