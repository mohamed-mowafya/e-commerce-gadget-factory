import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from './ShowImage';
import { ajoutItem, MisAjourItem, supprimerProduit } from "./panierHelper";
import moment from "moment";
import "../CSS/Card.css";
import "../CSS/cardanimation.css"
/**
 * Cette classe englobe l'entièreté d'une carte d'un produit.
 * @returns Retourne l'affichage de la carte d'un produit.
 */
const Card = ({
  product,
  setRun = f => f,
  run = undefined
}) => {


  const [redirect, setRedirect] = useState(false);
 

  /**
   * Méthode qui permets d'afficher le bouton
   * d'ajout au panier sur le card.
   */
  const AjouterAuPanierBoutton = () => {
    return (
        <button onClick={AjouterAuPanier} type="button" className="btn bg-cart"><i className="fa fa-cart-plus mr-2"></i> Ajouter au Panier</button>
    );
  };

  /**
   * Méthode qui permets d'ajouter le produit en question au panier et 
   * ensuite il redirige l'utilisateur à la page panier.
   */
  const AjouterAuPanier = () => {
    ajoutItem(product, () => { // prend en params le produit et la fonction callback
      setRedirect(true)
    });
  };

  /**
   * Cette méthode permet de rediriger l'utilisateur à une certaine page.
   * @param {*} redirect 
   * @returns Retourne le redirect à une certaine page.
   */
  const DoitRediriger = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />
    };
  };


  /**
   * Cette méthode permet d'informer l'utilisateur si le produit est en stock ou non.
   * @param {*} quantity Cette variable contient la quantité du produit en question.
   * @returns Retourne l'affichage du Stock ou non du produit.
   */
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill" style={{ backgroundColor: "#ed6436" }}> En Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill" style={{ backgroundColor: "#ed6436" }}> En Rupture de Stock</span>
    );
  }

  return (

    <div className="col-md-4 mb-3 d-flex align-items-stretch row ">
      <div className="card bg-light ">
        {DoitRediriger(redirect)}
        <div class="new-collections-grid1  " data-wow-delay=".5s">			
        <div class="new-collections-grid1-image-pos">
			<a href={`/productdetails/${product._id}`}>Voir</a>
			</div>
        <ShowImage className="card-img mb-auto" item={product} url="product" />
        </div>
        <div className="card-body d-flex flex-column ">
          <div className="mt-auto ">
            <h6 className="font-weight-semibold">
              <a href={`/productdetails/${product._id}`} className="text-center" data-abc="true">{product.name}</a> </h6>
            <a href="#" class="text-muted" data-abc="true">{product.category.name}</a>
            <h3 className="font-weight-semibold">${product.price}</h3>
            <div className="">{showStock(product.quantity)} </div>
            {AjouterAuPanierBoutton()}

          
        </div>
        </div>
      </div>
    </div>

  );

};

export default Card;

