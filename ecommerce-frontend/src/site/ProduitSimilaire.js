import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from './ShowImage';

const Card = ({
    product,
    montrerBoutonAjouterPanier = true,
    showViewProductButton = true,
    PanierUpdate = false,
    MontrerSupprimerProduitBouton = false,
    setRun = f => f,
    run = undefined
}) => {


    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    return (
        <div class="col-md-6 col-lg-3 mb-5">

            <div class="view zoom overlay z-depth-2 rounded">
            <ShowImage className="card-img" item={product} url="product" />
            </div>

            <div class="pt-4">

                <h5><a href={`/productdetails/${product._id}`} className="" data-abc="true">{product.name}</a></h5>
                <h6>${product.price}</h6>
            </div>
        </div>

    );

};

export default Card;