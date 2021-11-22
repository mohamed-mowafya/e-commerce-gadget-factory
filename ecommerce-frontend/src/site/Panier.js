import React,{useEffect, useState} from "react";
import Layout from "../site/Layout";
import {Link} from "react-router-dom";
import {getPanier} from "../site/panierHelper";
import Card from "../site/Card";
import Paiement from "./Paiement";

const Panier = () =>{

    //on prend les item du localStorage et on vas populer dans state
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false); // utilisé pour empêcher une boucle infini

    useEffect(()=> { // assure qu'il y a des item dans le state, si item existe pas = retourne empty array
        setItems(getPanier());
    }, [run]); // Permert d'avoir un panier mis a jour (lors de la supression)

    const AffichageItems = items => {
        return(
    <div className="container mx-auto">
    <div className="d-flex justify-content-center">
            <h2 className="heading mb-3 titre-panier d-flex justify-content-center">Votre panier</h2>
    </div>
    <div className="d-flex justify-content-center">
            <div className="row d-flex mt-auto justify-content-center col-10">
                {items.map((product,i) =>
                    (<Card 
                        key={i} product={product}  
                        montrerBoutonAjouterPanier={false} 
                        PanierUpdate = {true}
                        MontrerSupprimerProduitBouton = {true}
                        setRun={setRun}
                        run={run}
                        />
                        ))}
                </div>
        </div>
    </div>

        )
    }
    const PanierVideMessage = () =>(

        <h2> Votre panier est vide<br /> <Link to="/shop">Continuez à magasiner :) !</Link></h2>
        

    )



return (
    <Layout 
    title="Panier"
    descritpion="">
            {items.length > 0 ? AffichageItems(items) : PanierVideMessage()}

            <hr />
        <div className="me-auto ms-auto">
            <Paiement product = {items}/>
        </div>

    </Layout>
);
};

export default Panier;