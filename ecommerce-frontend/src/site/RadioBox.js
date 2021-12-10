import React, { useState } from "react";


/**
 * Cette classe permet d'avoir un filtre par prix dans la page des produits
 * @returns Retourne l'affichage et le fonctionnement du filtre par prix.
 */

const RadioBox = ({ prices, handleFilters }) => {

    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value); /*-> tous ce qu'on get sur le handelFilters qui vient de Shop(perent subcomponent) */
        setValue(event.target.value); /*-> update */
    };

    /* -> a chaque changement dans input, sera envoyer au parent (Shop)*/
    return prices.map((p, i) => (
        <div key={i} className="form-inline d-flex align-items-center py-1">
            <label className="tick">{p.name}
                <input onChange={handleChange}
                    value={`${p._id}`}
                    name={p}  /* -> Permet de cocher 1 choix parmis les prix */
                    type="radio" />
                <span className="check"></span>
            </label>
        </div>
    ));
};


export default RadioBox;