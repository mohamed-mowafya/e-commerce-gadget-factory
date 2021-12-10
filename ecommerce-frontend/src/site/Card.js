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
  montrerBoutonAjouterPanier = true,
  showViewProductButton = true,
  PanierUpdate = false,
  MontrerSupprimerProduitBouton = false,
  setRun = f => f,
  run = undefined
}) => {


  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  /**
   * Méthode qui permets d'afficher le bouton
   * d'ajout au panier sur le card.
   * Si le card est dans le panier, alors on n'affiche
   * plus ce bouton.
   * @param {*} montrerBoutonAjouterPanier 
   */
  const AjouterAuPanierBoutton = (montrerBoutonAjouterPanier) => {
    return (
      montrerBoutonAjouterPanier && (
        <button onClick={AjouterAuPanier} type="button" className="btn bg-cart"><i className="fa fa-cart-plus mr-2"></i> Ajouter au Panier</button>
      )
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

  const handleChange = IDproduit => event => {
    setRun(!run); // run le useEffect dans Cart
    // valeur par default 1 (on peux pas avoir 0 ou -1)
    setCount(event.target.value < 1 ? 1 : event.target.value)
    // Ne laisse pas rajouter plus que la quantité disponible
    if (event.target.value > product.quantity) {
      setCount(product.quantity)
    }

    if (event.target.value >= 1) {
      MisAjourItem(IDproduit, event.target.value)
    }
  }

  /**
   * Cette méthode permets à l'utilisateur de modifier 
   * la quantité du produit qu'il veut, s'il est dans la page panier.
   * @param {*} PanierUpdate Si la variable est vrai, 
   * cela veut dire qu'on est dans la page Panier et 
   * le div de Quantité pourra s'afficher. 
   * @returns Retourne l'affichage de la Quantité.
   */
  const AffichageUpdatesOptionsPanier = PanierUpdate => {

    return PanierUpdate &&
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text me-2 mt-2 bg-light"> Quantité </span>
          </div><input type="number" className="form-control"
            value={count} onChange={handleChange(product._id)}></input>
        </div>

      </div>
  }

  /**
   * Cette méthode permets à l'utilisateur de supprimer le produit qu'il a choisi,
   * s'il est dans la page panier.
   * @param {*} MontrerSupprimerProduitBouton Permet de verifier si l'utilisateur est dans la page Panier.
   * @returns Retourne l'affichage du bouton Supprimer. 
   */
  const supprimerProduitBoutton = (MontrerSupprimerProduitBouton) => {
    return (MontrerSupprimerProduitBouton && (
      <button onClick={() => supprimerProduit(product._id, setRun(!run))}
        className="btn btn-outline-danger mt-2 mb-2">
        Supprimer
      </button>
    )
    );
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

  const montrerAnimation = () =>{
    if(!montrerBoutonAjouterPanier){
      return(
        <ShowImage className="card-img mb-auto" item={product} url="product" />
      )
    }
    else{
    return(
      <div class="new-collections-grid1" data-wow-delay=".5s">			
        <div class="new-collections-grid1-image-pos">
			  <a href={`/productdetails/${product._id}`}>Voir</a>
			  </div>
        <ShowImage className="card-img mb-auto" item={product} url="product" />
        </div>
    )
  }
  }

  return (

    <div className="col-md-4 mb-3 d-flex align-items-stretch row ">
      <div className="card bg-light ">
        {DoitRediriger(redirect)}
        {montrerAnimation()}
        
        <div className="card-body d-flex flex-column ">
          <div className="mt-auto ">
            <h6 className="font-weight-semibold">
              <a href={`/productdetails/${product._id}`} className="text-center" data-abc="true">{product.name}</a> </h6>
            <a href="#" class="text-muted" data-abc="true">{product.category.name}</a>
            <h3 className="font-weight-semibold">${product.price}</h3>
            <div className="">{showStock(product.quantity)} </div>

            {AjouterAuPanierBoutton(montrerBoutonAjouterPanier)}
            {supprimerProduitBoutton(MontrerSupprimerProduitBouton)}
            {AffichageUpdatesOptionsPanier(PanierUpdate)}
          </div>
        </div>
      </div>
    </div>

  );

};

export default Card;
