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
        <div>
        <div className=" d-flex justify-content-center align-items-center mb-4">
        <h3 className="fw-normal mb-0 text-black font-chariot mt-1">Votre panier</h3>
          </div>
        <div className="d-flex mb-auto mt-auto">
                <div className="ms-4 me-auto col-md-5 mt-4 panier-div">
                <div className="panier-grid d-flex row">
                    {items.map((product, i) =>
                    
                    (<Card
                        key={i} product={product}
                        montrerBoutonAjouterPanier={false}
                        PanierUpdate={true}
                        MontrerSupprimerProduitBouton={true}
                        setRun={setRun}
                        run={run}
                    />
                  
                    )
                    )}
                    </div>
                </div>
            <div className="me-2 ms-auto mt-2">
            <Paiement product={items} />
            </div>
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