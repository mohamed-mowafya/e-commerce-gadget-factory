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
            <div>
                <h2>Vous avez {`${items.length}`} item(s) dans votre panier</h2>
                <hr />
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
        )
    }
    const PanierVideMessage = () =>(

        <h2> Votre panier est vide<br /> <Link to="/shop">Continuez à magasiner :) !</Link></h2>
        

    )



return (
    <Layout 
    title="Panier"
    descritpion="">
    <div className="row">
        <div className="col-6">
            {items.length > 0 ? AffichageItems(items) : PanierVideMessage()}
        </div>

        <div className="col-6">
           <h2 className = "mb-4">Sommaire de votre panier:</h2>
            <hr />
            <Paiement product = {items}/>
        </div>
    </div>

    </Layout>
);
};

export default Panier;