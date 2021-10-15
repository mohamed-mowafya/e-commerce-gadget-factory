import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";



const Card = ({produit}) => {

return(
        <div className="col-4 mb-3">
            <div className="card">
            <div className="card-body">{produit.name}</div>
            <div className="car-body">
                <p>{produit.description}</p>
                <p>{produit.price}</p>
                <Link to="/">
                    <button className="btn btn-outline-primary mt-2 mb-2">Voir produit</button>
                </Link>
                <Link to="/">
                    <button className="btn btn-outline-warning mt-2 mb-2">+ panier</button>
                </Link>

            </div>
            </div>
        </div>

);

};

export default Card;
