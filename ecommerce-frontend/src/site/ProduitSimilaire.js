import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from './ShowImage';

/**
 * Cette classe englobe l'entièreté d'une carte d'un produit similaire.
 * @returns Retourne l'affichage d'un produit similaire.
 */
const ProduitSimilaire = ({
    product,
    montrerBoutonAjouterPanier = true,
    showViewProductButton = true,
    PanierUpdate = false,
    MontrerSupprimerProduitBouton = false,
    setRun = f => f,
    run = undefined
}) => {

    return (
        <div class="col-md-6 col-lg-3 mb-5">

            <div class="view zoom overlay z-depth-2 rounded">
            <ShowImage className="card-img" item={product} url="product" />
            </div>

            <div class="d-flex flex-column pt-4 justify-content-center">

                <h5><a href={`/productdetails/${product._id}`} className="" data-abc="true">{product.name}</a></h5>
                <h6>${product.price}</h6>
            </div>
        </div>

    );

};

export default ProduitSimilaire;