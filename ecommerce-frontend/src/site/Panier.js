import React, { useEffect, useState } from "react";
import Layout from "../site/Layout";
import { Link } from "react-router-dom";
import { getPanier } from "../site/panierHelper";
import Card from "../site/Card";
import Paiement from "./Paiement";
import {MisAjourItem, supprimerProduit } from "./panierHelper";
import ShowImage from './ShowImage';
import "../CSS/panier.css"


/**
 * classe qui s'occupera du panier
 * c'est grâce à celle-ci qu'il est possible de voir 
 * les produits disponibles dans le panier
 * 
 * @returns l'affichage de la page du panier
 */

const Panier = () => {

    /**on prend les item du localStorage et on vas populer dans state */
    const [items, setItems] = useState([])
    const [itemsCount,setItemsCount] = useState([])
    const [run, setRun] = useState(false); // utilisé pour empêcher une boucle infini


    useEffect(() => { // assure qu'il y a des item dans le state, si item existe pas = retourne empty array
        setItems(getPanier());
    }, [run]); /** -> Permet d'avoir un panier mis à jour (lors de la supression) */

    
    /** Méthode qui affiche tous les items dans le panier
     * @param {*} items 
     * Variable items contient tous les items dans le panier
     * @returns les produit, ainsi que les données de ceux-ci
    */
    const AffichageItems = items => {
        return (
            <div className="column d-flex">
            <div className="container h-100 py-5 mt-auto mb-auto">
    <div className="row d-flex justify-content-start align-items-center h-100">
      <div className="col-10">

        <div className="d-flex justify-content-start align-items-center mb-4">
          <h3 className="fw-normal mb-0 text-black font-chariot">Votre chariot</h3>
        </div>
        {items.map((product, i) => (
        <div className="card rounded-3 mb-4">
          <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-md-2 col-lg-2 col-xl-2">
              <ShowImage className="card-img mb-auto" item={product} url="product" />
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3">
                <p className="lead fw-normal mb-2">
                    <a href={`/productdetails/${product._id}`} className="text-center" data-abc="true">{product.name}</a></p>
              </div>
              <div className="col-md-1 d-flex">

                <input id="form1" min="0" name="quantity" value={product.quantity} type="number"
                  className="form-control form-control-sm" onChange={handleChange(product._id,product)} />

              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 className="mb-0">${product.price}</h5>
              </div>
              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" onClick={() => supprimerProduit(product._id, setRun(!run))} class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
              </div>
            </div>
          </div>
        </div>
             ))}
        </div>
        
      </div>
    </div>
    <div className="me-2 ms-auto margin-paiement mb-auto">
    <Paiement product={items} />
    </div>
    </div>
        )
    }
    /**Affiche un message lorsque le panier s'est vidé */
    const PanierVideMessage = () => (
    <div class="row margin-cart-vide">
        <div class="col-md-12">
                    <div class="col-sm-12 empty-cart-cls text-center"> <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" class="img-fluid mb-4 mr-3"/>
                        <h3><strong>Votre chariot est vide!</strong></h3>
                        <h4><Link to="/shop">Continuez à magasiner !</Link></h4>
                    </div>
        </div>
    </div>)

    
  const handleChange = IDproduit => product => event => {
    setRun(!run); /**  run le useEffect dans Cart*/
    /**  Ne laisse pas rajouter plus que la quantité disponible */
    if (event.target.value > product.quantity) {
         event.target.value = 0
    }
    if (event.target.value >= 1) {
      MisAjourItem(IDproduit, event.target.value)
    }
  }


    return (
        <Layout
            title="Panier"
            descritpion="">
            {items.length > 0 ? AffichageItems(items)  : PanierVideMessage()}

        </Layout>
    );
};

export default Panier;